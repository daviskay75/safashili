// Database connection and utilities for production
// Replaces memory storage with persistent database using Prisma

import { PrismaClient } from '@/generated/prisma'
import { ContactFormData, NewsletterFormData, BookingFormData } from './schemas'

// Global Prisma client instance
declare global {
  var prisma: PrismaClient | undefined
}

// Create singleton Prisma client
export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db
}

// Database connection utility
export async function connectDatabase() {
  try {
    await db.$connect()
    console.log('🗄️ Database connected successfully')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

// Graceful disconnect
export async function disconnectDatabase() {
  await db.$disconnect()
}

// Contact Management with Database
export class DatabaseContactManager {
  
  // Add a new contact
  static async addContact(
    type: 'contact' | 'newsletter' | 'booking',
    data: ContactFormData | NewsletterFormData | BookingFormData,
    source: string = 'website'
  ): Promise<string> {
    
    // Extract common fields
    const email = data.email.toLowerCase()
    const firstName = 'firstName' in data ? data.firstName : ''
    const lastName = 'lastName' in data ? data.lastName : undefined
    const phone = 'phone' in data ? data.phone : undefined
    
    // Generate tags based on type and data
    const tags = this.generateTags(type, data)
    
    try {
      const contact = await db.contact.create({
        data: {
          type,
          email,
          firstName,
          lastName,
          phone,
          source,
          gdprConsent: data.rgpdConsent || false,
          tags: JSON.stringify(tags),
          data: JSON.stringify(data),
        }
      })
      
      console.log(`✅ Contact saved to database: ${email} (${type})`)
      return contact.id
      
    } catch (error) {
      console.error('❌ Error saving contact to database:', error)
      throw error
    }
  }
  
  // Generate tags for contacts
  private static generateTags(
    type: 'contact' | 'newsletter' | 'booking',
    data: ContactFormData | NewsletterFormData | BookingFormData
  ): string[] {
    const tags = [type]
    
    if (type === 'contact' && 'consultationType' in data) {
      tags.push(`consultation_${data.consultationType}` as any)
      if ('urgency' in data && data.urgency) {
        tags.push(`urgency_${data.urgency}` as any)
      }
    }
    
    if (type === 'newsletter' && 'interests' in data && data.interests) {
      data.interests.forEach(interest => {
        tags.push(`interest_${interest}` as any)
      })
    }
    
    if (type === 'booking' && 'consultationType' in data) {
      tags.push(`booking_${data.consultationType}` as any)
      if ('isFirstConsultation' in data && data.isFirstConsultation) {
        tags.push('first_consultation' as any)
      }
    }
    
    return tags
  }
  
  // Search contacts
  static async searchContacts(query: {
    email?: string
    type?: 'contact' | 'newsletter' | 'booking'
    status?: 'active' | 'archived' | 'deleted'
    limit?: number
    offset?: number
  }) {
    try {
      const where: any = {}
      
      if (query.email) {
        where.email = { contains: query.email.toLowerCase() }
      }
      
      if (query.type) {
        where.type = query.type
      }
      
      if (query.status) {
        where.status = query.status
      }
      
      const contacts = await db.contact.findMany({
        where,
        take: query.limit || 50,
        skip: query.offset || 0,
        orderBy: { createdAt: 'desc' }
      })
      
      return contacts.map((contact: any) => ({
        ...contact,
        tags: JSON.parse(contact.tags),
        data: JSON.parse(contact.data)
      }))
      
    } catch (error) {
      console.error('❌ Error searching contacts:', error)
      return []
    }
  }
  
  // Get contact statistics
  static async getStats() {
    try {
      const total = await db.contact.count()
      const byType = await db.contact.groupBy({
        by: ['type'],
        _count: { type: true }
      })
      const byStatus = await db.contact.groupBy({
        by: ['status'],
        _count: { status: true }
      })
      
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      
      const recentContacts = await db.contact.count({
        where: { createdAt: { gte: oneWeekAgo } }
      })
      
      return {
        total,
        byType: Object.fromEntries(byType.map((item: any) => [item.type, item._count.type])),
        byStatus: Object.fromEntries(byStatus.map((item: any) => [item.status, item._count.status])),
        recentContacts
      }
      
    } catch (error) {
      console.error('❌ Error getting contact stats:', error)
      return { total: 0, byType: {}, byStatus: {}, recentContacts: 0 }
    }
  }
  
  // GDPR deletion
  static async processGDPRDeletion(email: string): Promise<{
    success: boolean
    contactsDeleted: number
    error?: string
  }> {
    try {
      // First create the GDPR request record
      await db.gdprRequest.upsert({
        where: { email: email.toLowerCase() },
        update: {
          processed: true,
          processedAt: new Date()
        },
        create: {
          email: email.toLowerCase(),
          reason: 'User request',
          processed: true,
          processedAt: new Date()
        }
      })
      
      // Anonymize contacts
      const result = await db.contact.updateMany({
        where: { email: email.toLowerCase() },
        data: {
          status: 'deleted',
          firstName: 'DELETED',
          lastName: 'DELETED',
          phone: null,
          data: JSON.stringify({ email: 'deleted@gdpr.request' }),
          notes: 'DELETED via GDPR request'
        }
      })
      
      console.log(`🗑️ GDPR deletion processed: ${email} (${result.count} contacts)`)
      
      return { success: true, contactsDeleted: result.count }
      
    } catch (error) {
      console.error('❌ Error processing GDPR deletion:', error)
      return { 
        success: false, 
        contactsDeleted: 0, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  // Lead Magnet Downloads Management
  static async saveLeadMagnetDownload(data: {
    leadMagnetSlug: string
    email: string
    firstName: string
    lastName?: string
    phone?: string
    source: string
    userAgent: string
    ipAddress: string
    gdprConsent: boolean
    emailSequenceSubscribed: boolean
  }): Promise<{ success: boolean; downloadId?: string; error?: string }> {
    try {
      const download = await db.leadMagnetDownload.create({
        data: {
          leadMagnetId: data.leadMagnetSlug, // We'll need to resolve this from the slug
          email: data.email.toLowerCase(),
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          source: data.source,
          userAgent: data.userAgent,
          ipAddress: data.ipAddress,
          gdprConsent: data.gdprConsent,
          emailSequenceSubscribed: data.emailSequenceSubscribed
        }
      })

      // Also create a contact record for unified tracking
      await this.addContact('contact', {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName || '',
        phone: data.phone || '',
        message: `Téléchargement lead magnet: ${data.leadMagnetSlug}`,
        consultationType: 'cabinet',
        rgpdConsent: data.gdprConsent
      }, `lead_magnet_${data.leadMagnetSlug}`)

      console.log(`📥 Lead magnet download saved: ${download.id}`)
      return { success: true, downloadId: download.id }

    } catch (error) {
      console.error('❌ Error saving lead magnet download:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  // Get lead magnet download statistics
  static async getLeadMagnetStats() {
    try {
      const totalDownloads = await db.leadMagnetDownload.count()
      
      const byLeadMagnet = await db.leadMagnetDownload.groupBy({
        by: ['leadMagnetId'],
        _count: { leadMagnetId: true },
        orderBy: { _count: { leadMagnetId: 'desc' } }
      })

      const bySource = await db.leadMagnetDownload.groupBy({
        by: ['source'],
        _count: { source: true },
        orderBy: { _count: { source: 'desc' } }
      })

      const subscriptionRate = await db.leadMagnetDownload.aggregate({
        _count: { emailSequenceSubscribed: true },
        where: { emailSequenceSubscribed: true }
      })

      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      
      const recentDownloads = await db.leadMagnetDownload.count({
        where: { downloadedAt: { gte: oneWeekAgo } }
      })

      return {
        totalDownloads,
        recentDownloads,
        subscriptionRate: totalDownloads > 0 ? Math.round((subscriptionRate._count.emailSequenceSubscribed / totalDownloads) * 100) : 0,
        byLeadMagnet: Object.fromEntries(byLeadMagnet.map((item: any) => [item.leadMagnetId, item._count.leadMagnetId])),
        bySource: Object.fromEntries(bySource.map((item: any) => [item.source, item._count.source]))
      }

    } catch (error) {
      console.error('❌ Error getting lead magnet stats:', error)
      return { totalDownloads: 0, recentDownloads: 0, subscriptionRate: 0, byLeadMagnet: {}, bySource: {} }
    }
  }

  // Get downloads for a specific email
  static async getDownloadsByEmail(email: string) {
    try {
      const downloads = await db.leadMagnetDownload.findMany({
        where: { email: email.toLowerCase() },
        orderBy: { downloadedAt: 'desc' }
      })

      return downloads

    } catch (error) {
      console.error('❌ Error getting downloads by email:', error)
      return []
    }
  }
}

// Appointment Management with Database
export class DatabaseAppointmentManager {
  
  // Create appointment
  static async createAppointment(data: BookingFormData): Promise<{
    success: boolean
    appointmentId?: string
    error?: string
  }> {
    try {
      // Check for conflicts first
      const existingAppointment = await db.appointment.findFirst({
        where: {
          date: data.preferredDate,
          time: data.preferredTime,
          status: { not: 'cancelled' }
        }
      })
      
      if (existingAppointment) {
        return { success: false, error: 'Ce créneau n\'est plus disponible' }
      }
      
      const appointment = await db.appointment.create({
        data: {
          patientEmail: data.email.toLowerCase(),
          patientName: `${data.firstName} ${data.lastName}`,
          date: data.preferredDate || '',
          time: data.preferredTime || '',
          duration: parseInt(data.duration),
          consultationType: data.consultationType,
          isFirstConsultation: data.isFirstConsultation,
          reasonForConsultation: data.reasonForConsultation,
          medicalHistory: data.medicalHistory,
          emergencyContact: data.emergencyContact ? JSON.stringify(data.emergencyContact) : null,
        }
      })
      
      console.log(`📅 Appointment created: ${appointment.id}`)
      return { success: true, appointmentId: appointment.id }
      
    } catch (error) {
      console.error('❌ Error creating appointment:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur création RDV' 
      }
    }
  }
  
  // Update appointment
  static async updateAppointment(
    appointmentId: string,
    updates: Partial<{
      date: string
      time: string
      status: string
      notes: string
      calendarEventId: string
    }>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await db.appointment.update({
        where: { id: appointmentId },
        data: updates
      })
      
      console.log(`📝 Appointment updated: ${appointmentId}`)
      return { success: true }
      
    } catch (error) {
      console.error('❌ Error updating appointment:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur mise à jour RDV' 
      }
    }
  }
  
  // Cancel appointment
  static async cancelAppointment(appointmentId: string): Promise<{ success: boolean; error?: string }> {
    try {
      await db.appointment.update({
        where: { id: appointmentId },
        data: { status: 'cancelled' }
      })
      
      console.log(`❌ Appointment cancelled: ${appointmentId}`)
      return { success: true }
      
    } catch (error) {
      console.error('❌ Error cancelling appointment:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur annulation RDV' 
      }
    }
  }
  
  // Get appointments by date range
  static async getAppointmentsByDateRange(startDate: string, endDate: string) {
    try {
      const appointments = await db.appointment.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate
          }
        },
        orderBy: [
          { date: 'asc' },
          { time: 'asc' }
        ]
      })
      
      return appointments
      
    } catch (error) {
      console.error('❌ Error getting appointments:', error)
      return []
    }
  }
  
  // Get appointment statistics
  static async getStats() {
    try {
      const total = await db.appointment.count()
      const byStatus = await db.appointment.groupBy({
        by: ['status'],
        _count: { status: true }
      })
      const byType = await db.appointment.groupBy({
        by: ['consultationType'],
        _count: { consultationType: true }
      })
      
      return {
        total,
        confirmed: byStatus.find((s: any) => s.status === 'confirmed')?._count.status || 0,
        pending: byStatus.find((s: any) => s.status === 'pending')?._count.status || 0,
        cancelled: byStatus.find((s: any) => s.status === 'cancelled')?._count.status || 0,
        byType: Object.fromEntries(byType.map((item: any) => [item.consultationType, item._count.consultationType]))
      }
      
    } catch (error) {
      console.error('❌ Error getting appointment stats:', error)
      return { total: 0, confirmed: 0, pending: 0, cancelled: 0, byType: {} }
    }
  }
}

// Analytics tracking
export class DatabaseAnalytics {
  static async trackEvent(eventData: {
    eventType: string
    eventData?: any
    page: string
    sessionId: string
    userAgent?: string
    ipAddress?: string
  }) {
    try {
      await db.analyticsEvent.create({
        data: {
          eventType: eventData.eventType,
          eventData: eventData.eventData ? JSON.stringify(eventData.eventData) : null,
          page: eventData.page,
          sessionId: eventData.sessionId,
          userAgent: eventData.userAgent,
          ipAddress: eventData.ipAddress
        }
      })
    } catch (error) {
      console.error('❌ Error tracking analytics event:', error)
    }
  }
}

// Initialize database on module import (for Render deployment)
if (process.env.NODE_ENV === 'production') {
  connectDatabase().catch(console.error)
}