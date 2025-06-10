// Logique métier pour la gestion des rendez-vous
// Gestion des créneaux, horaires, durées, jours fériés, buffer time

import { BookingFormData } from './schemas'

// Configuration des horaires de travail
export const BUSINESS_HOURS = {
  monday: { open: '09:00', close: '18:00', break: { start: '12:00', end: '14:00' } },
  tuesday: { open: '09:00', close: '18:00', break: { start: '12:00', end: '14:00' } },
  wednesday: { open: '09:00', close: '18:00', break: { start: '12:00', end: '14:00' } },
  thursday: { open: '09:00', close: '18:00', break: { start: '12:00', end: '14:00' } },
  friday: { open: '09:00', close: '17:00', break: { start: '12:00', end: '13:00' } },
  saturday: null, // Fermé le samedi
  sunday: null   // Fermé le dimanche
} as const

// Configuration des durées de consultation
export const CONSULTATION_DURATIONS = {
  60: { // Consultation standard 1h
    duration: 60,
    bufferTime: 15, // 15 min entre les RDV
    label: 'Consultation standard (1h)'
  },
  90: { // Consultation longue 1h30
    duration: 90,
    bufferTime: 15,
    label: 'Consultation approfondie (1h30)'
  }
} as const

// Types de consultation et leur durée par défaut
export const CONSULTATION_TYPES = {
  cabinet: { defaultDuration: 60, allowedDurations: [60, 90] },
  domicile: { defaultDuration: 90, allowedDurations: [90] }, // Plus long à domicile
  groupe: { defaultDuration: 90, allowedDurations: [90] },
  distance: { defaultDuration: 60, allowedDurations: [60, 90] }
} as const

// Jours fériés français 2024-2025
export const FRENCH_HOLIDAYS = [
  '2024-12-25', // Noël
  '2025-01-01', // Jour de l'An
  '2025-04-21', // Lundi de Pâques
  '2025-05-01', // Fête du Travail
  '2025-05-08', // Victoire 1945
  '2025-05-29', // Ascension
  '2025-06-09', // Lundi de Pentecôte
  '2025-07-14', // Fête nationale
  '2025-08-15', // Assomption
  '2025-11-01', // Toussaint
  '2025-11-11', // Armistice
  '2025-12-25', // Noël
] as const

// Stockage des rendez-vous (en production, utiliser une vraie DB)
interface Appointment {
  id: string
  patientEmail: string
  patientName: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  duration: number // minutes
  type: string
  status: 'confirmed' | 'pending' | 'cancelled'
  createdAt: string
  notes?: string
}

const appointments = new Map<string, Appointment>()

// Interface pour les créneaux disponibles
export interface TimeSlot {
  time: string // HH:MM
  available: boolean
  reason?: string // Pourquoi indisponible
}

export interface DaySchedule {
  date: string // YYYY-MM-DD
  isWorkingDay: boolean
  slots: TimeSlot[]
  reason?: string // Pourquoi fermé (holiday, weekend, etc.)
}

// Utilitaires de date
export class DateUtils {
  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0]
  }

  static formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5)
  }

  static parseTime(timeStr: string): { hours: number; minutes: number } {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return { hours, minutes }
  }

  static addMinutes(timeStr: string, minutes: number): string {
    const { hours, minutes: mins } = this.parseTime(timeStr)
    const date = new Date()
    date.setHours(hours, mins + minutes, 0, 0)
    return this.formatTime(date)
  }

  static timeToMinutes(timeStr: string): number {
    const { hours, minutes } = this.parseTime(timeStr)
    return hours * 60 + minutes
  }

  static minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  static getWeekdayName(date: Date): keyof typeof BUSINESS_HOURS {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
    return days[date.getDay()]
  }

  static isHoliday(dateStr: string): boolean {
    return FRENCH_HOLIDAYS.includes(dateStr as any)
  }

  static isSameDay(date1: Date, date2: Date): boolean {
    return this.formatDate(date1) === this.formatDate(date2)
  }
}

// Générateur de créneaux
export class SlotGenerator {
  
  // Générer tous les créneaux possibles pour une journée
  static generateDaySlots(date: Date, duration: number = 60): TimeSlot[] {
    const dateStr = DateUtils.formatDate(date)
    const weekday = DateUtils.getWeekdayName(date)
    const businessHours = BUSINESS_HOURS[weekday]
    
    if (!businessHours) {
      return [] // Jour fermé
    }

    const slots: TimeSlot[] = []
    const bufferTime = CONSULTATION_DURATIONS[duration as keyof typeof CONSULTATION_DURATIONS]?.bufferTime || 15
    const slotInterval = 30 // Créneaux toutes les 30 minutes
    
    // Convertir les heures en minutes
    const openTime = DateUtils.timeToMinutes(businessHours.open)
    const closeTime = DateUtils.timeToMinutes(businessHours.close)
    const breakStart = DateUtils.timeToMinutes(businessHours.break.start)
    const breakEnd = DateUtils.timeToMinutes(businessHours.break.end)
    
    // Générer les créneaux
    for (let timeInMinutes = openTime; timeInMinutes < closeTime; timeInMinutes += slotInterval) {
      const endTime = timeInMinutes + duration
      const timeStr = DateUtils.minutesToTime(timeInMinutes)
      
      // Vérifier si le créneau ne dépasse pas l'heure de fermeture
      if (endTime > closeTime) {
        slots.push({
          time: timeStr,
          available: false,
          reason: 'Dépasse l\'heure de fermeture'
        })
        continue
      }
      
      // Vérifier si le créneau chevauche avec la pause déjeuner
      if (
        (timeInMinutes >= breakStart && timeInMinutes < breakEnd) ||
        (endTime > breakStart && endTime <= breakEnd) ||
        (timeInMinutes < breakStart && endTime > breakEnd)
      ) {
        slots.push({
          time: timeStr,
          available: false,
          reason: 'Pause déjeuner'
        })
        continue
      }
      
      // Vérifier les conflits avec les rendez-vous existants
      const hasConflict = this.hasAppointmentConflict(dateStr, timeStr, duration, bufferTime)
      
      slots.push({
        time: timeStr,
        available: !hasConflict,
        reason: hasConflict ? 'Déjà réservé' : undefined
      })
    }
    
    return slots
  }

  // Vérifier les conflits avec les rendez-vous existants
  public static hasAppointmentConflict(
    date: string, 
    time: string, 
    duration: number, 
    bufferTime: number
  ): boolean {
    const requestedStart = DateUtils.timeToMinutes(time)
    const requestedEnd = requestedStart + duration
    
    for (const appointment of appointments.values()) {
      if (appointment.date !== date || appointment.status === 'cancelled') {
        continue
      }
      
      const existingStart = DateUtils.timeToMinutes(appointment.time)
      const existingEnd = existingStart + appointment.duration
      
      // Ajouter le buffer time
      const existingStartWithBuffer = existingStart - bufferTime
      const existingEndWithBuffer = existingEnd + bufferTime
      
      // Vérifier le chevauchement
      if (
        (requestedStart >= existingStartWithBuffer && requestedStart < existingEndWithBuffer) ||
        (requestedEnd > existingStartWithBuffer && requestedEnd <= existingEndWithBuffer) ||
        (requestedStart < existingStartWithBuffer && requestedEnd > existingEndWithBuffer)
      ) {
        return true
      }
    }
    
    return false
  }

  // Obtenir les créneaux disponibles pour une période
  static getAvailableSlots(
    startDate: Date,
    endDate: Date,
    duration: number = 60
  ): DaySchedule[] {
    const schedules: DaySchedule[] = []
    const currentDate = new Date(startDate)
    
    while (currentDate <= endDate) {
      const dateStr = DateUtils.formatDate(currentDate)
      const weekday = DateUtils.getWeekdayName(currentDate)
      const businessHours = BUSINESS_HOURS[weekday]
      
      // Vérifier si c'est un jour férié
      if (DateUtils.isHoliday(dateStr)) {
        schedules.push({
          date: dateStr,
          isWorkingDay: false,
          slots: [],
          reason: 'Jour férié'
        })
      }
      // Vérifier si c'est un jour de travail
      else if (!businessHours) {
        schedules.push({
          date: dateStr,
          isWorkingDay: false,
          slots: [],
          reason: 'Fermé'
        })
      }
      // Générer les créneaux pour les jours de travail
      else {
        const slots = this.generateDaySlots(currentDate, duration)
        schedules.push({
          date: dateStr,
          isWorkingDay: true,
          slots
        })
      }
      
      // Passer au jour suivant
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return schedules
  }
}

// Gestionnaire de rendez-vous
export class AppointmentManager {
  
  // Créer un nouveau rendez-vous (avec support database + fallback memory)
  static async createAppointment(data: BookingFormData): Promise<{ success: boolean; appointmentId?: string; error?: string; calendarEventId?: string }> {
    try {
      // Valider la date et l'heure
      const appointmentDate = new Date(data.preferredDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (appointmentDate < today) {
        return { success: false, error: 'La date ne peut pas être dans le passé' }
      }
      
      // Try database first (production), fallback to memory (development)
      try {
        if (process.env.DATABASE_URL) {
          const { DatabaseAppointmentManager } = await import('./database')
          const result = await DatabaseAppointmentManager.createAppointment(data)
          
          if (result.success && result.appointmentId) {
            // Try Google Calendar integration
            let calendarEventId: string | undefined
            try {
              const { GoogleCalendarService } = await import('./google-calendar')
              const calendarResult = await GoogleCalendarService.createCalendarEvent(data, result.appointmentId)
              
              if (calendarResult.success && calendarResult.eventId) {
                calendarEventId = calendarResult.eventId
                await DatabaseAppointmentManager.updateAppointment(result.appointmentId, {
                  calendarEventId: calendarEventId,
                  notes: `${data.reasonForConsultation}\n\nGoogle Calendar Event ID: ${calendarEventId}`
                })
                console.log('📅 Google Calendar event created:', calendarEventId)
              }
            } catch (error) {
              console.warn('⚠️ Google Calendar integration not available:', error)
            }
            
            return { success: true, appointmentId: result.appointmentId, calendarEventId }
          }
          
          return result
        }
      } catch (error) {
        console.warn('⚠️ Database unavailable, using memory storage:', error)
      }
      
      // Fallback to memory storage
      const dateStr = DateUtils.formatDate(appointmentDate)
      const duration = parseInt(data.duration)
      const bufferTime = CONSULTATION_DURATIONS[duration as keyof typeof CONSULTATION_DURATIONS]?.bufferTime || 15
      
      if (SlotGenerator.hasAppointmentConflict(dateStr, data.preferredTime, duration, bufferTime)) {
        return { success: false, error: 'Ce créneau n\'est plus disponible' }
      }
      
      // Créer le rendez-vous en mémoire
      const appointmentId = `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const appointment: Appointment = {
        id: appointmentId,
        patientEmail: data.email,
        patientName: `${data.firstName} ${data.lastName}`,
        date: dateStr,
        time: data.preferredTime,
        duration,
        type: data.consultationType,
        status: 'pending',
        createdAt: new Date().toISOString(),
        notes: data.reasonForConsultation
      }
      
      appointments.set(appointmentId, appointment)

      // Tenter de créer l'événement Google Calendar
      let calendarEventId: string | undefined
      try {
        const { GoogleCalendarService } = await import('./google-calendar')
        const calendarResult = await GoogleCalendarService.createCalendarEvent(data, appointmentId)
        
        if (calendarResult.success && calendarResult.eventId) {
          calendarEventId = calendarResult.eventId
          appointment.notes = `${appointment.notes}\n\nGoogle Calendar Event ID: ${calendarEventId}`
          appointments.set(appointmentId, appointment)
          console.log('📅 Google Calendar event created:', calendarEventId)
        } else {
          console.warn('⚠️ Failed to create Google Calendar event:', calendarResult.error)
        }
      } catch (error) {
        console.warn('⚠️ Google Calendar integration not available:', error)
      }
      
      console.log('📅 Rendez-vous créé:', {
        id: appointmentId,
        patient: appointment.patientName,
        date: dateStr,
        time: data.preferredTime,
        calendarEventId
      })
      
      return { success: true, appointmentId, calendarEventId }
      
    } catch (error) {
      console.error('Erreur création rendez-vous:', error)
      return { success: false, error: 'Erreur lors de la création du rendez-vous' }
    }
  }

  // Modifier un rendez-vous
  static async updateAppointment(
    appointmentId: string, 
    updates: Partial<Pick<Appointment, 'date' | 'time' | 'status' | 'notes'>>
  ): Promise<{ success: boolean; error?: string }> {
    const appointment = appointments.get(appointmentId)
    
    if (!appointment) {
      return { success: false, error: 'Rendez-vous non trouvé' }
    }
    
    // Vérifier la disponibilité si on change la date/heure
    if (updates.date || updates.time) {
      const newDate = updates.date || appointment.date
      const newTime = updates.time || appointment.time
      const bufferTime = CONSULTATION_DURATIONS[appointment.duration as keyof typeof CONSULTATION_DURATIONS]?.bufferTime || 15
      
      // Temporairement retirer ce RDV pour vérifier les conflits
      appointments.delete(appointmentId)
      
      if (SlotGenerator.hasAppointmentConflict(newDate, newTime, appointment.duration, bufferTime)) {
        // Remettre le RDV
        appointments.set(appointmentId, appointment)
        return { success: false, error: 'Le nouveau créneau n\'est pas disponible' }
      }
      
      // Remettre le RDV avec les mises à jour
      appointments.set(appointmentId, { ...appointment, ...updates })
    } else {
      // Mise à jour simple sans changement de créneau
      appointments.set(appointmentId, { ...appointment, ...updates })
    }

    // Tenter de mettre à jour l'événement Google Calendar
    try {
      // Extraire l'ID de l'événement Google Calendar des notes
      const calendarEventIdMatch = appointment.notes?.match(/Google Calendar Event ID: ([a-zA-Z0-9_-]+)/)
      const calendarEventId = calendarEventIdMatch?.[1]

      if (calendarEventId && (updates.date || updates.time)) {
        const { GoogleCalendarService } = await import('./google-calendar')
        
        // Préparer les données de mise à jour
        const calendarUpdates: any = {}
        if (updates.date) calendarUpdates.preferredDate = updates.date
        if (updates.time) calendarUpdates.preferredTime = updates.time
        
        const calendarResult = await GoogleCalendarService.updateCalendarEvent(
          calendarEventId,
          calendarUpdates
        )
        
        if (calendarResult.success) {
          console.log('📅 Google Calendar event updated:', calendarEventId)
        } else {
          console.warn('⚠️ Failed to update Google Calendar event:', calendarResult.error)
        }
      }
    } catch (error) {
      console.warn('⚠️ Google Calendar update not available:', error)
    }
    
    return { success: true }
  }

  // Annuler un rendez-vous
  static async cancelAppointment(appointmentId: string): Promise<{ success: boolean; error?: string }> {
    const appointment = appointments.get(appointmentId)
    
    if (!appointment) {
      return { success: false, error: 'Rendez-vous non trouvé' }
    }
    
    appointment.status = 'cancelled'
    appointments.set(appointmentId, appointment)

    // Tenter de supprimer l'événement Google Calendar
    try {
      // Extraire l'ID de l'événement Google Calendar des notes
      const calendarEventIdMatch = appointment.notes?.match(/Google Calendar Event ID: ([a-zA-Z0-9_-]+)/)
      const calendarEventId = calendarEventIdMatch?.[1]

      if (calendarEventId) {
        const { GoogleCalendarService } = await import('./google-calendar')
        const calendarResult = await GoogleCalendarService.deleteCalendarEvent(calendarEventId)
        
        if (calendarResult.success) {
          console.log('📅 Google Calendar event deleted:', calendarEventId)
        } else {
          console.warn('⚠️ Failed to delete Google Calendar event:', calendarResult.error)
        }
      }
    } catch (error) {
      console.warn('⚠️ Google Calendar deletion not available:', error)
    }
    
    console.log('❌ Rendez-vous annulé:', appointmentId)
    
    return { success: true }
  }

  // Obtenir un rendez-vous
  static getAppointment(appointmentId: string): Appointment | null {
    return appointments.get(appointmentId) || null
  }

  // Obtenir tous les rendez-vous d'une période
  static getAppointmentsByDateRange(startDate: string, endDate: string): Appointment[] {
    return Array.from(appointments.values())
      .filter(apt => apt.date >= startDate && apt.date <= endDate)
      .sort((a, b) => {
        if (a.date === b.date) {
          return DateUtils.timeToMinutes(a.time) - DateUtils.timeToMinutes(b.time)
        }
        return a.date.localeCompare(b.date)
      })
  }

  // Statistiques des rendez-vous
  static getStats(): {
    total: number
    confirmed: number
    pending: number
    cancelled: number
    byType: Record<string, number>
  } {
    const stats = {
      total: appointments.size,
      confirmed: 0,
      pending: 0,
      cancelled: 0,
      byType: {} as Record<string, number>
    }
    
    for (const appointment of appointments.values()) {
      stats[appointment.status]++
      stats.byType[appointment.type] = (stats.byType[appointment.type] || 0) + 1
    }
    
    return stats
  }
}

// Validation des créneaux de rendez-vous
export class BookingValidator {
  
  static validateBookingRequest(data: BookingFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    // Validation de la date
    const appointmentDate = new Date(data.preferredDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (appointmentDate < today) {
      errors.push('La date ne peut pas être dans le passé')
    }
    
    const maxAdvanceBooking = new Date()
    maxAdvanceBooking.setMonth(maxAdvanceBooking.getMonth() + 3) // 3 mois à l'avance max
    
    if (appointmentDate > maxAdvanceBooking) {
      errors.push('Les rendez-vous ne peuvent être pris que 3 mois à l\'avance')
    }
    
    // Validation du type de consultation et durée
    const consultationType = data.consultationType as keyof typeof CONSULTATION_TYPES
    const allowedDurations = CONSULTATION_TYPES[consultationType]?.allowedDurations || []
    const duration = parseInt(data.duration)
    
    if (!allowedDurations.includes(duration as any)) {
      errors.push(`Durée ${duration}min non autorisée pour ce type de consultation` as any)
    }
    
    // Validation des horaires
    const dateStr = DateUtils.formatDate(appointmentDate)
    const weekday = DateUtils.getWeekdayName(appointmentDate)
    
    if (DateUtils.isHoliday(dateStr)) {
      errors.push('Aucun rendez-vous possible les jours fériés')
    }
    
    if (!BUSINESS_HOURS[weekday]) {
      errors.push('Aucun rendez-vous possible ce jour de la semaine')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
}