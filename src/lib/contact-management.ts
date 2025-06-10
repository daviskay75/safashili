// Système de gestion des contacts avec stockage JSON, export CSV, backup et RGPD
// En production, remplacer par une vraie base de données

import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { ContactFormData, NewsletterFormData, BookingFormData } from './schemas'

// Interfaces pour la gestion des contacts
export interface StoredContact {
  id: string
  type: 'contact' | 'newsletter' | 'booking'
  email: string
  firstName: string
  lastName?: string
  phone?: string
  data: ContactFormData | NewsletterFormData | BookingFormData
  createdAt: string
  updatedAt: string
  source: string // Page d'origine
  status: 'active' | 'archived' | 'deleted'
  gdprConsent: boolean
  gdprConsentDate: string
  lastActivity?: string
  tags: string[]
  notes?: string
}

export interface ContactExportOptions {
  format: 'csv' | 'json'
  dateRange?: {
    start: string
    end: string
  }
  contactTypes?: Array<'contact' | 'newsletter' | 'booking'>
  includeDeleted?: boolean
}

export interface GDPRDeletionRequest {
  email: string
  requestDate: string
  reason: string
  processed: boolean
  processedAt?: string
  contactsDeleted: number
}

// Stockage en mémoire (en production, utiliser une DB)
const contacts = new Map<string, StoredContact>()
const gdprRequests = new Map<string, GDPRDeletionRequest>()

// Configuration des chemins de stockage
const STORAGE_CONFIG = {
  dataDir: join(process.cwd(), 'data'),
  contactsFile: join(process.cwd(), 'data', 'contacts.json'),
  backupDir: join(process.cwd(), 'data', 'backups'),
  gdprFile: join(process.cwd(), 'data', 'gdpr-requests.json')
}

// Classe principale de gestion des contacts
export class ContactManager {

  // Initialiser le système de stockage
  static async initialize(): Promise<void> {
    try {
      // Créer les dossiers s'ils n'existent pas
      if (!existsSync(STORAGE_CONFIG.dataDir)) {
        await mkdir(STORAGE_CONFIG.dataDir, { recursive: true })
      }
      
      if (!existsSync(STORAGE_CONFIG.backupDir)) {
        await mkdir(STORAGE_CONFIG.backupDir, { recursive: true })
      }

      // Charger les contacts existants
      await this.loadContacts()
      await this.loadGDPRRequests()

      console.log('📁 Contact management system initialized')

    } catch (error) {
      console.error('❌ Error initializing contact management:', error)
    }
  }

  // Charger les contacts depuis le fichier
  static async loadContacts(): Promise<void> {
    try {
      if (existsSync(STORAGE_CONFIG.contactsFile)) {
        const data = await readFile(STORAGE_CONFIG.contactsFile, 'utf8')
        const contactArray = JSON.parse(data) as StoredContact[]
        
        contactArray.forEach(contact => {
          contacts.set(contact.id, contact)
        })

        console.log(`📥 Loaded ${contactArray.length} contacts from storage`)
      }
    } catch (error) {
      console.error('Error loading contacts:', error)
    }
  }

  // Sauvegarder les contacts dans le fichier
  static async saveContacts(): Promise<void> {
    try {
      const contactArray = Array.from(contacts.values())
        .filter(contact => contact.status !== 'deleted') // Ne pas sauver les supprimés
      
      await writeFile(
        STORAGE_CONFIG.contactsFile, 
        JSON.stringify(contactArray, null, 2),
        'utf8'
      )

      console.log(`💾 Saved ${contactArray.length} contacts to storage`)

    } catch (error) {
      console.error('Error saving contacts:', error)
    }
  }

  // Ajouter un nouveau contact (avec support database + fallback memory)
  static async addContact(
    type: 'contact' | 'newsletter' | 'booking',
    data: ContactFormData | NewsletterFormData | BookingFormData,
    source: string = 'website'
  ): Promise<string> {
    
    // Try database first (production), fallback to memory (development)
    try {
      if (process.env.DATABASE_URL) {
        const { DatabaseContactManager } = await import('./database')
        return await DatabaseContactManager.addContact(type, data, source)
      }
    } catch (error) {
      console.warn('⚠️ Database unavailable, using memory storage:', error)
    }
    
    // Fallback to memory storage
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()

    // Extraire les informations communes
    const email = data.email
    const firstName = 'firstName' in data ? data.firstName : ''
    const lastName = 'lastName' in data ? data.lastName : undefined
    const phone = 'phone' in data ? data.phone : undefined

    // Déterminer les tags basés sur le type et les données
    const tags = this.generateTags(type, data)

    const contact: StoredContact = {
      id: contactId,
      type,
      email: email.toLowerCase(),
      firstName,
      lastName,
      phone,
      data,
      createdAt: now,
      updatedAt: now,
      source,
      status: 'active',
      gdprConsent: data.rgpdConsent || false,
      gdprConsentDate: now,
      tags,
      lastActivity: now
    }

    contacts.set(contactId, contact)
    
    // Sauvegarder immédiatement
    await this.saveContacts()

    console.log(`✅ Contact added (memory): ${email} (${type})`)
    
    return contactId
  }

  // Générer des tags automatiques
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

  // Mettre à jour un contact
  static async updateContact(contactId: string, updates: Partial<StoredContact>): Promise<boolean> {
    const contact = contacts.get(contactId)
    if (!contact) return false

    const updatedContact = {
      ...contact,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    contacts.set(contactId, updatedContact)
    await this.saveContacts()

    return true
  }

  // Rechercher des contacts
  static searchContacts(query: {
    email?: string
    type?: 'contact' | 'newsletter' | 'booking'
    tags?: string[]
    dateRange?: { start: string; end: string }
    status?: 'active' | 'archived' | 'deleted'
  }): StoredContact[] {
    
    return Array.from(contacts.values()).filter(contact => {
      if (query.email && !contact.email.includes(query.email.toLowerCase())) {
        return false
      }

      if (query.type && contact.type !== query.type) {
        return false
      }

      if (query.status && contact.status !== query.status) {
        return false
      }

      if (query.tags && !query.tags.some(tag => contact.tags.includes(tag))) {
        return false
      }

      if (query.dateRange) {
        const contactDate = new Date(contact.createdAt).getTime()
        const startDate = new Date(query.dateRange.start).getTime()
        const endDate = new Date(query.dateRange.end).getTime()
        
        if (contactDate < startDate || contactDate > endDate) {
          return false
        }
      }

      return true
    })
  }

  // Exporter les contacts
  static async exportContacts(options: ContactExportOptions): Promise<string> {
    // Filtrer les contacts selon les options
    let contactsToExport = Array.from(contacts.values())

    if (options.contactTypes) {
      contactsToExport = contactsToExport.filter(c => 
        options.contactTypes!.includes(c.type)
      )
    }

    if (options.dateRange) {
      contactsToExport = contactsToExport.filter(c => {
        const contactDate = new Date(c.createdAt).getTime()
        const startDate = new Date(options.dateRange!.start).getTime()
        const endDate = new Date(options.dateRange!.end).getTime()
        return contactDate >= startDate && contactDate <= endDate
      })
    }

    if (!options.includeDeleted) {
      contactsToExport = contactsToExport.filter(c => c.status !== 'deleted')
    }

    // Générer le fichier selon le format
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    
    if (options.format === 'csv') {
      return await this.generateCSV(contactsToExport, timestamp)
    } else {
      return await this.generateJSON(contactsToExport, timestamp)
    }
  }

  // Générer un export CSV
  private static async generateCSV(contacts: StoredContact[], timestamp: string): Promise<string> {
    const csvHeader = [
      'ID', 'Type', 'Email', 'Prénom', 'Nom', 'Téléphone', 
      'Statut', 'Consentement RGPD', 'Date création', 'Dernière activité',
      'Source', 'Tags', 'Notes'
    ].join(',')

    const csvRows = contacts.map(contact => {
      return [
        contact.id,
        contact.type,
        contact.email,
        contact.firstName,
        contact.lastName || '',
        contact.phone || '',
        contact.status,
        contact.gdprConsent ? 'Oui' : 'Non',
        contact.createdAt,
        contact.lastActivity || '',
        contact.source,
        contact.tags.join(';'),
        contact.notes || ''
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
    })

    const csvContent = [csvHeader, ...csvRows].join('\n')
    const filename = `contacts_export_${timestamp}.csv`
    const filepath = join(STORAGE_CONFIG.backupDir, filename)

    await writeFile(filepath, csvContent, 'utf8')
    
    console.log(`📊 CSV export generated: ${filename} (${contacts.length} contacts)`)
    
    return filepath
  }

  // Générer un export JSON
  private static async generateJSON(contacts: StoredContact[], timestamp: string): Promise<string> {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalContacts: contacts.length,
      contacts: contacts.map(contact => ({
        ...contact,
        // Masquer les données sensibles si nécessaire
        data: this.sanitizeDataForExport(contact.data)
      }))
    }

    const filename = `contacts_export_${timestamp}.json`
    const filepath = join(STORAGE_CONFIG.backupDir, filename)

    await writeFile(filepath, JSON.stringify(exportData, null, 2), 'utf8')
    
    console.log(`📊 JSON export generated: ${filename} (${contacts.length} contacts)`)
    
    return filepath
  }

  // Nettoyer les données pour l'export
  private static sanitizeDataForExport(data: any): any {
    // Supprimer les informations très sensibles pour les exports
    const sanitized = { ...data }
    
    // Masquer partiellement l'email et le téléphone
    if (sanitized.email) {
      const [local, domain] = sanitized.email.split('@')
      sanitized.email = `${local.substring(0, 2)}***@${domain}`
    }
    
    if (sanitized.phone) {
      sanitized.phone = sanitized.phone.replace(/(\d{2})\d{6}(\d{2})/, '$1******$2')
    }

    return sanitized
  }

  // Backup automatique
  static async createBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `backup_${timestamp}.json`
    const filepath = join(STORAGE_CONFIG.backupDir, filename)

    const backupData = {
      backupDate: new Date().toISOString(),
      contacts: Array.from(contacts.values()),
      gdprRequests: Array.from(gdprRequests.values()),
      metadata: {
        totalContacts: contacts.size,
        activeContacts: Array.from(contacts.values()).filter(c => c.status === 'active').length,
        totalGdprRequests: gdprRequests.size
      }
    }

    await writeFile(filepath, JSON.stringify(backupData, null, 2), 'utf8')
    
    console.log(`💾 Backup created: ${filename}`)
    
    return filepath
  }

  // === GESTION RGPD ===

  // Charger les requêtes RGPD
  static async loadGDPRRequests(): Promise<void> {
    try {
      if (existsSync(STORAGE_CONFIG.gdprFile)) {
        const data = await readFile(STORAGE_CONFIG.gdprFile, 'utf8')
        const requests = JSON.parse(data) as GDPRDeletionRequest[]
        
        requests.forEach(request => {
          gdprRequests.set(request.email, request)
        })

        console.log(`📥 Loaded ${requests.length} GDPR requests`)
      }
    } catch (error) {
      console.error('Error loading GDPR requests:', error)
    }
  }

  // Sauvegarder les requêtes RGPD
  static async saveGDPRRequests(): Promise<void> {
    try {
      const requestArray = Array.from(gdprRequests.values())
      
      await writeFile(
        STORAGE_CONFIG.gdprFile, 
        JSON.stringify(requestArray, null, 2),
        'utf8'
      )

      console.log(`💾 Saved ${requestArray.length} GDPR requests`)

    } catch (error) {
      console.error('Error saving GDPR requests:', error)
    }
  }

  // Demande de suppression RGPD
  static async createGDPRDeletionRequest(
    email: string, 
    reason: string = 'User request'
  ): Promise<string> {
    
    const requestId = `gdpr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const request: GDPRDeletionRequest = {
      email: email.toLowerCase(),
      requestDate: new Date().toISOString(),
      reason,
      processed: false,
      contactsDeleted: 0
    }

    gdprRequests.set(email.toLowerCase(), request)
    await this.saveGDPRRequests()

    console.log(`🔒 GDPR deletion request created for: ${email}`)
    
    return requestId
  }

  // Traiter une demande de suppression RGPD
  static async processGDPRDeletion(email: string): Promise<{
    success: boolean
    contactsDeleted: number
    error?: string
  }> {
    try {
      const request = gdprRequests.get(email.toLowerCase())
      if (!request) {
        return { success: false, contactsDeleted: 0, error: 'Request not found' }
      }

      // Trouver tous les contacts avec cet email
      const contactsToDelete = Array.from(contacts.values())
        .filter(contact => contact.email === email.toLowerCase())

      let deletedCount = 0

      // Marquer les contacts comme supprimés (soft delete)
      for (const contact of contactsToDelete) {
        contact.status = 'deleted'
        contact.updatedAt = new Date().toISOString()
        contact.notes = (contact.notes || '') + ' | DELETED via GDPR request'
        
        // Anonymiser les données sensibles
        contact.firstName = 'DELETED'
        contact.lastName = 'DELETED'
        contact.phone = undefined
        contact.data = { ...contact.data, email: 'deleted@gdpr.request' }
        
        contacts.set(contact.id, contact)
        deletedCount++
      }

      // Marquer la requête comme traitée
      request.processed = true
      request.processedAt = new Date().toISOString()
      request.contactsDeleted = deletedCount
      gdprRequests.set(email.toLowerCase(), request)

      // Sauvegarder
      await this.saveContacts()
      await this.saveGDPRRequests()

      console.log(`🗑️ GDPR deletion processed: ${email} (${deletedCount} contacts)`)

      return { success: true, contactsDeleted: deletedCount }

    } catch (error) {
      console.error('Error processing GDPR deletion:', error)
      return { 
        success: false, 
        contactsDeleted: 0, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  // Obtenir les statistiques des contacts
  static getContactStats(): {
    total: number
    byType: Record<string, number>
    byStatus: Record<string, number>
    recentContacts: number
    gdprRequests: {
      total: number
      pending: number
      processed: number
    }
  } {
    const allContacts = Array.from(contacts.values())
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)

    const byType = allContacts.reduce((acc, contact) => {
      acc[contact.type] = (acc[contact.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const byStatus = allContacts.reduce((acc, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const recentContacts = allContacts.filter(
      contact => new Date(contact.createdAt).getTime() > oneWeekAgo
    ).length

    const allGdprRequests = Array.from(gdprRequests.values())
    const pendingGdprRequests = allGdprRequests.filter(req => !req.processed).length

    return {
      total: allContacts.length,
      byType,
      byStatus,
      recentContacts,
      gdprRequests: {
        total: allGdprRequests.length,
        pending: pendingGdprRequests,
        processed: allGdprRequests.length - pendingGdprRequests
      }
    }
  }
}

// Auto-initialisation
if (typeof window === 'undefined') {
  // Initialiser au démarrage du serveur
  ContactManager.initialize()

  // Backup automatique quotidien
  setInterval(async () => {
    await ContactManager.createBackup()
  }, 24 * 60 * 60 * 1000) // 24h
}