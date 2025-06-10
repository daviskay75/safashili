import { NextRequest, NextResponse } from 'next/server'
import { GoogleCalendarService } from '@/lib/google-calendar'
import { 
  createErrorResponse, 
  createSuccessResponse,
  logAPIError,
  getQueryParams
} from '@/lib/api-helpers'

// GET - Initier l'authentification OAuth2 ou gérer le callback
export async function GET(request: NextRequest) {
  try {
    const params = getQueryParams(request)
    const action = params.action
    const code = params.code
    const error = params.error

    // Gérer les erreurs OAuth2
    if (error) {
      console.error('❌ Google OAuth2 error:', error)
      return createErrorResponse(
        'Erreur d\'authentification Google Calendar',
        400,
        { error }
      )
    }

    // Callback OAuth2 - échanger le code contre des tokens
    if (code) {
      const tokenResult = await GoogleCalendarService.exchangeCodeForTokens(code)
      
      if (!tokenResult.success) {
        return createErrorResponse(
          'Échec de l\'authentification Google Calendar',
          400,
          { error: tokenResult.error }
        )
      }

      // Redirection vers une page de succès (ou JSON pour API)
      if (params.format === 'json') {
        return createSuccessResponse({
          authenticated: true,
          tokens: {
            hasAccessToken: !!tokenResult.tokens?.access_token,
            hasRefreshToken: !!tokenResult.tokens?.refresh_token,
            expiresAt: tokenResult.tokens?.expires_at
          }
        }, 'Google Calendar connecté avec succès')
      }

      // Redirection HTML (pour les navigateurs)
      return NextResponse.redirect(
        new URL('/admin/calendar?success=true', request.url)
      )
    }

    // Actions administratives
    switch (action) {
      case 'authorize':
        // Générer l'URL d'autorisation
        const authUrl = GoogleCalendarService.generateAuthUrl('calendar_setup')
        
        return createSuccessResponse({
          authUrl,
          message: 'Visitez cette URL pour autoriser l\'accès au calendrier'
        })

      case 'status':
        // Vérifier le statut de l\'intégration
        const stats = GoogleCalendarService.getIntegrationStats()
        const config = GoogleCalendarService.validateConfiguration()
        
        return createSuccessResponse({
          integration: stats,
          configuration: config
        })

      case 'test':
        // Tester la connexion
        const testDate = new Date()
        const slots = await GoogleCalendarService.getAvailableSlots(testDate, 60)
        
        return createSuccessResponse({
          tested: true,
          testDate: testDate.toISOString(),
          slotsFound: slots.length,
          sampleSlots: slots.slice(0, 3)
        }, 'Test de connexion Google Calendar')

      default:
        return createErrorResponse('Action non reconnue', 400)
    }

  } catch (error) {
    logAPIError('google-auth', error as Error, request)
    return createErrorResponse('Erreur d\'authentification Google Calendar', 500)
  }
}

// POST - Actions administratives
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, eventId, bookingData, appointmentId } = body

    switch (action) {
      case 'create_event':
        if (!bookingData || !appointmentId) {
          return createErrorResponse('bookingData et appointmentId requis', 400)
        }

        const createResult = await GoogleCalendarService.createCalendarEvent(
          bookingData, 
          appointmentId
        )

        if (!createResult.success) {
          return createErrorResponse(
            createResult.error || 'Erreur création événement',
            500
          )
        }

        return createSuccessResponse({
          eventCreated: true,
          eventId: createResult.eventId,
          appointmentId
        }, 'Événement Google Calendar créé')

      case 'update_event':
        if (!eventId || !bookingData) {
          return createErrorResponse('eventId et bookingData requis', 400)
        }

        const updateResult = await GoogleCalendarService.updateCalendarEvent(
          eventId,
          bookingData
        )

        if (!updateResult.success) {
          return createErrorResponse(
            updateResult.error || 'Erreur mise à jour événement',
            500
          )
        }

        return createSuccessResponse({
          eventUpdated: true,
          eventId
        }, 'Événement Google Calendar mis à jour')

      case 'delete_event':
        if (!eventId) {
          return createErrorResponse('eventId requis', 400)
        }

        const deleteResult = await GoogleCalendarService.deleteCalendarEvent(eventId)

        if (!deleteResult.success) {
          return createErrorResponse(
            deleteResult.error || 'Erreur suppression événement',
            500
          )
        }

        return createSuccessResponse({
          eventDeleted: true,
          eventId
        }, 'Événement Google Calendar supprimé')

      case 'sync_calendar':
        // Synchroniser avec le calendrier
        const syncDate = new Date()
        const events = await GoogleCalendarService.getCalendarEvents(
          syncDate,
          new Date(syncDate.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 jours
        )

        if (!events.success) {
          return createErrorResponse(
            events.error || 'Erreur synchronisation calendrier',
            500
          )
        }

        return createSuccessResponse({
          synchronized: true,
          eventsCount: events.events?.length || 0,
          syncDate: syncDate.toISOString()
        }, 'Calendrier synchronisé')

      default:
        return createErrorResponse('Action non reconnue', 400)
    }

  } catch (error) {
    logAPIError('google-calendar-action', error as Error, request)
    return createErrorResponse('Erreur action Google Calendar', 500)
  }
}