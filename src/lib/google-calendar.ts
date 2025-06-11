// Intégration Google Calendar pour synchronisation des rendez-vous
// OAuth2 + gestion des événements + récupération disponibilités

import { BookingFormData } from './schemas'
import { DateUtils, BUSINESS_HOURS } from './booking'

// Configuration Google Calendar API
const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET || '',
  redirectUri: process.env.GOOGLE_CALENDAR_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback',
  calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
  scopes: [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events'
  ]
}

// Interface pour les événements Google Calendar
export interface GoogleCalendarEvent {
  id: string
  summary: string
  description?: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  attendees?: Array<{
    email: string
    displayName?: string
    responseStatus: 'needsAction' | 'declined' | 'tentative' | 'accepted'
  }>
  status: 'confirmed' | 'tentative' | 'cancelled'
  created: string
  updated: string
}

export interface CalendarTimeSlot {
  start: string // ISO string
  end: string // ISO string
  available: boolean
  eventId?: string
  eventSummary?: string
}

export interface OAuth2Tokens {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
  expires_at: number
}

// Stockage des tokens OAuth2 (en production, utiliser une DB sécurisée)
const oauth2Tokens = new Map<string, OAuth2Tokens>()

// Classe principale pour l'intégration Google Calendar
export class GoogleCalendarService {

  // Générer l'URL d'autorisation OAuth2
  static generateAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: GOOGLE_CONFIG.clientId,
      redirect_uri: GOOGLE_CONFIG.redirectUri,
      scope: GOOGLE_CONFIG.scopes.join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
      ...(state && { state })
    })

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  // Échanger le code d'autorisation contre des tokens
  static async exchangeCodeForTokens(authCode: string): Promise<{
    success: boolean
    tokens?: OAuth2Tokens
    error?: string
  }> {
    try {
      const tokenData = {
        client_id: GOOGLE_CONFIG.clientId,
        client_secret: GOOGLE_CONFIG.clientSecret,
        code: authCode,
        grant_type: 'authorization_code',
        redirect_uri: GOOGLE_CONFIG.redirectUri
      }

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(tokenData)
      })

      if (!response.ok) {
        throw new Error(`OAuth2 error: ${response.statusText}`)
      }

      const tokens = await response.json() as OAuth2Tokens
      tokens.expires_at = Date.now() + (tokens.expires_in * 1000)

      // Stocker les tokens (en production, chiffrer et stocker en DB)
      oauth2Tokens.set('main', tokens)

      console.log('✅ Google Calendar OAuth2 tokens obtained')

      return { success: true, tokens }

    } catch (error) {
      console.error('❌ Google Calendar OAuth2 error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown OAuth2 error' 
      }
    }
  }

  // Rafraîchir le token d'accès
  static async refreshAccessToken(refreshToken: string): Promise<{
    success: boolean
    tokens?: OAuth2Tokens
    error?: string
  }> {
    try {
      const tokenData = {
        client_id: GOOGLE_CONFIG.clientId,
        client_secret: GOOGLE_CONFIG.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      }

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(tokenData)
      })

      if (!response.ok) {
        throw new Error(`Token refresh error: ${response.statusText}`)
      }

      const newTokens = await response.json()
      const updatedTokens: OAuth2Tokens = {
        ...newTokens,
        refresh_token: refreshToken, // Conserver le refresh token
        expires_at: Date.now() + (newTokens.expires_in * 1000)
      }

      oauth2Tokens.set('main', updatedTokens)

      return { success: true, tokens: updatedTokens }

    } catch (error) {
      console.error('❌ Token refresh error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Token refresh failed' 
      }
    }
  }

  // Obtenir un token d'accès valide
  static async getValidAccessToken(): Promise<string | null> {
    const tokens = oauth2Tokens.get('main')
    if (!tokens) {
      console.warn('⚠️ No Google Calendar tokens found')
      return null
    }

    // Vérifier si le token n'a pas expiré
    if (Date.now() < tokens.expires_at - 60000) { // 1 minute de marge
      return tokens.access_token
    }

    // Token expiré, le rafraîchir
    if (tokens.refresh_token) {
      const refreshResult = await this.refreshAccessToken(tokens.refresh_token)
      if (refreshResult.success && refreshResult.tokens) {
        return refreshResult.tokens.access_token
      }
    }

    console.warn('⚠️ Unable to get valid access token')
    return null
  }

  // Récupérer les événements du calendrier
  static async getCalendarEvents(
    startDate: Date,
    endDate: Date
  ): Promise<{
    success: boolean
    events?: GoogleCalendarEvent[]
    error?: string
  }> {
    try {
      const accessToken = await this.getValidAccessToken()
      if (!accessToken) {
        return { success: false, error: 'No valid access token' }
      }

      const params = new URLSearchParams({
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime',
        maxResults: '250'
      })

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CONFIG.calendarId}/events?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Calendar API error: ${response.statusText}`)
      }

      const data = await response.json()
      const events = data.items || []

      console.log(`📅 Retrieved ${events.length} calendar events`)

      return { success: true, events }

    } catch (error) {
      console.error('❌ Error fetching calendar events:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Calendar fetch failed' 
      }
    }
  }

  // Créer un événement dans le calendrier
  static async createCalendarEvent(
    bookingData: BookingFormData,
    appointmentId: string
  ): Promise<{
    success: boolean
    eventId?: string
    error?: string
  }> {
    try {
      const accessToken = await this.getValidAccessToken()
      if (!accessToken) {
        return { success: false, error: 'No valid access token' }
      }

      const startDateTime = new Date(bookingData.preferredDate || new Date())
      const timeStr = bookingData.preferredTime || '14:00'
      const [hours, minutes] = timeStr.includes(':') ? timeStr.split(':').map(Number) : [14, 0]
      startDateTime.setHours(hours, minutes, 0, 0)

      const endDateTime = new Date(startDateTime)
      endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(bookingData.duration))

      const eventData = {
        summary: `Consultation - ${bookingData.firstName} ${bookingData.lastName}`,
        description: this.formatEventDescription(bookingData, appointmentId),
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'Europe/Paris'
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'Europe/Paris'
        },
        attendees: [
          {
            email: bookingData.email,
            displayName: `${bookingData.firstName} ${bookingData.lastName}`
          }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 24h avant
            { method: 'popup', minutes: 15 } // 15min avant
          ]
        }
      }

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CONFIG.calendarId}/events`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(eventData)
        }
      )

      if (!response.ok) {
        throw new Error(`Event creation error: ${response.statusText}`)
      }

      const createdEvent = await response.json()

      console.log('✅ Google Calendar event created:', createdEvent.id)

      return { success: true, eventId: createdEvent.id }

    } catch (error) {
      console.error('❌ Error creating calendar event:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Event creation failed' 
      }
    }
  }

  // Mettre à jour un événement
  static async updateCalendarEvent(
    eventId: string,
    updates: Partial<BookingFormData>
  ): Promise<{
    success: boolean
    error?: string
  }> {
    try {
      const accessToken = await this.getValidAccessToken()
      if (!accessToken) {
        return { success: false, error: 'No valid access token' }
      }

      // Récupérer l'événement existant
      const getResponse = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CONFIG.calendarId}/events/${eventId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      if (!getResponse.ok) {
        throw new Error(`Event fetch error: ${getResponse.statusText}`)
      }

      const existingEvent = await getResponse.json()

      // Appliquer les mises à jour
      const updatedEvent = { ...existingEvent }

      if (updates.preferredDate && updates.preferredTime) {
        const startDateTime = new Date(updates.preferredDate)
        const [hours, minutes] = updates.preferredTime.split(':').map(Number)
        startDateTime.setHours(hours, minutes, 0, 0)

        const endDateTime = new Date(startDateTime)
        endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(updates.duration || '60'))

        updatedEvent.start = {
          dateTime: startDateTime.toISOString(),
          timeZone: 'Europe/Paris'
        }
        updatedEvent.end = {
          dateTime: endDateTime.toISOString(),
          timeZone: 'Europe/Paris'
        }
      }

      if (updates.firstName || updates.lastName) {
        updatedEvent.summary = `Consultation - ${updates.firstName || ''} ${updates.lastName || ''}`.trim()
      }

      // Mettre à jour l'événement
      const updateResponse = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CONFIG.calendarId}/events/${eventId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedEvent)
        }
      )

      if (!updateResponse.ok) {
        throw new Error(`Event update error: ${updateResponse.statusText}`)
      }

      console.log('✅ Google Calendar event updated:', eventId)

      return { success: true }

    } catch (error) {
      console.error('❌ Error updating calendar event:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Event update failed' 
      }
    }
  }

  // Supprimer un événement
  static async deleteCalendarEvent(eventId: string): Promise<{
    success: boolean
    error?: string
  }> {
    try {
      const accessToken = await this.getValidAccessToken()
      if (!accessToken) {
        return { success: false, error: 'No valid access token' }
      }

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CONFIG.calendarId}/events/${eventId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      if (!response.ok && response.status !== 410) { // 410 = Already deleted
        throw new Error(`Event deletion error: ${response.statusText}`)
      }

      console.log('✅ Google Calendar event deleted:', eventId)

      return { success: true }

    } catch (error) {
      console.error('❌ Error deleting calendar event:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Event deletion failed' 
      }
    }
  }

  // Obtenir les créneaux disponibles basés sur le calendrier
  static async getAvailableSlots(
    date: Date,
    duration: number = 60
  ): Promise<CalendarTimeSlot[]> {
    try {
      const startDate = new Date(date)
      startDate.setHours(0, 0, 0, 0)

      const endDate = new Date(date)
      endDate.setHours(23, 59, 59, 999)

      // Récupérer les événements du jour
      const eventsResult = await this.getCalendarEvents(startDate, endDate)
      if (!eventsResult.success) {
        console.warn('⚠️ Failed to fetch calendar events, using local logic only')
        return this.generateLocalSlots(date, duration)
      }

      const events = eventsResult.events || []
      const weekday = DateUtils.getWeekdayName(date)
      const businessHours = BUSINESS_HOURS[weekday]

      if (!businessHours) {
        return [] // Jour fermé
      }

      const slots: CalendarTimeSlot[] = []
      const slotInterval = 30 // Créneaux toutes les 30 minutes

      // Convertir les heures d'ouverture en minutes
      const openTime = DateUtils.timeToMinutes(businessHours.open)
      const closeTime = DateUtils.timeToMinutes(businessHours.close)
      const breakStart = DateUtils.timeToMinutes(businessHours.break.start)
      const breakEnd = DateUtils.timeToMinutes(businessHours.break.end)

      // Générer tous les créneaux possibles
      for (let timeInMinutes = openTime; timeInMinutes < closeTime; timeInMinutes += slotInterval) {
        const slotStart = new Date(date)
        slotStart.setHours(Math.floor(timeInMinutes / 60), timeInMinutes % 60, 0, 0)

        const slotEnd = new Date(slotStart)
        slotEnd.setMinutes(slotEnd.getMinutes() + duration)

        // Vérifier si le créneau ne dépasse pas l'heure de fermeture
        if (DateUtils.timeToMinutes(DateUtils.formatTime(slotEnd)) > closeTime) {
          continue
        }

        // Vérifier la pause déjeuner
        if (this.overlapsWithBreak(timeInMinutes, duration, breakStart, breakEnd)) {
          slots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            available: false
          })
          continue
        }

        // Vérifier les conflits avec les événements existants
        const hasConflict = events.some(event => {
          if (!event.start?.dateTime || !event.end?.dateTime) return false
          if (event.status === 'cancelled') return false

          const eventStart = new Date(event.start.dateTime)
          const eventEnd = new Date(event.end.dateTime)

          return this.slotsOverlap(slotStart, slotEnd, eventStart, eventEnd)
        })

        if (hasConflict) {
          const conflictingEvent = events.find(event => {
            if (!event.start?.dateTime || !event.end?.dateTime) return false
            const eventStart = new Date(event.start.dateTime)
            const eventEnd = new Date(event.end.dateTime)
            return this.slotsOverlap(slotStart, slotEnd, eventStart, eventEnd)
          })

          slots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            available: false,
            eventId: conflictingEvent?.id,
            eventSummary: conflictingEvent?.summary
          })
        } else {
          slots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            available: true
          })
        }
      }

      return slots

    } catch (error) {
      console.error('❌ Error getting available slots:', error)
      return this.generateLocalSlots(date, duration)
    }
  }

  // Générer des créneaux basés uniquement sur la logique locale (fallback)
  private static generateLocalSlots(date: Date, duration: number): CalendarTimeSlot[] {
    // Utiliser la logique de booking.ts comme fallback
    const { SlotGenerator } = require('./booking')
    const localSlots = SlotGenerator.generateDaySlots(date, duration)

    return localSlots.map((slot: any) => {
      const slotStart = new Date(date)
      const [hours, minutes] = slot.time.split(':').map(Number)
      slotStart.setHours(hours, minutes, 0, 0)

      const slotEnd = new Date(slotStart)
      slotEnd.setMinutes(slotEnd.getMinutes() + duration)

      return {
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        available: slot.available
      }
    })
  }

  // Vérifier si un créneau chevauche avec la pause
  private static overlapsWithBreak(
    startMinutes: number, 
    duration: number, 
    breakStart: number, 
    breakEnd: number
  ): boolean {
    const endMinutes = startMinutes + duration
    return (
      (startMinutes >= breakStart && startMinutes < breakEnd) ||
      (endMinutes > breakStart && endMinutes <= breakEnd) ||
      (startMinutes < breakStart && endMinutes > breakEnd)
    )
  }

  // Vérifier si deux créneaux se chevauchent
  private static slotsOverlap(
    start1: Date, 
    end1: Date, 
    start2: Date, 
    end2: Date
  ): boolean {
    return start1 < end2 && end1 > start2
  }

  // Formater la description de l'événement
  private static formatEventDescription(
    bookingData: BookingFormData, 
    appointmentId: string
  ): string {
    return `
Type de consultation: ${bookingData.consultationType}
Durée: ${bookingData.duration} minutes
Première consultation: ${bookingData.isFirstConsultation ? 'Oui' : 'Non'}

Motif de consultation:
${bookingData.reasonForConsultation}

Contact patient:
Email: ${bookingData.email}
Téléphone: ${bookingData.phone}

ID Rendez-vous: ${appointmentId}

Créé automatiquement via le site web.
    `.trim()
  }

  // Vérifier la validité de la configuration
  static validateConfiguration(): {
    isValid: boolean
    missing: string[]
  } {
    const missing: string[] = []

    if (!GOOGLE_CONFIG.clientId) missing.push('GOOGLE_CALENDAR_CLIENT_ID')
    if (!GOOGLE_CONFIG.clientSecret) missing.push('GOOGLE_CALENDAR_CLIENT_SECRET')
    if (!GOOGLE_CONFIG.redirectUri) missing.push('GOOGLE_CALENDAR_REDIRECT_URI')

    return {
      isValid: missing.length === 0,
      missing
    }
  }

  // Obtenir les statistiques d'intégration
  static getIntegrationStats(): {
    hasTokens: boolean
    tokensExpiry?: Date
    lastSync?: Date
    configValid: boolean
  } {
    const tokens = oauth2Tokens.get('main')
    const config = this.validateConfiguration()

    return {
      hasTokens: !!tokens,
      tokensExpiry: tokens ? new Date(tokens.expires_at) : undefined,
      configValid: config.isValid
    }
  }
}

// Export des utilitaires
export { GOOGLE_CONFIG, oauth2Tokens }