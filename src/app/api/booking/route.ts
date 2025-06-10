import { NextRequest, NextResponse } from 'next/server'
import { BookingSchema } from '@/lib/schemas'
import { EmailService } from '@/lib/email'
import { 
  withRateLimit, 
  validateRequestBody, 
  createErrorResponse, 
  createSuccessResponse,
  logAPIError,
  validateHTTPMethod,
  getQueryParams
} from '@/lib/api-helpers'
import { 
  SlotGenerator, 
  AppointmentManager, 
  BookingValidator,
  DateUtils 
} from '@/lib/booking'

// GET - Récupérer les créneaux disponibles
async function handleGetAvailableSlots(request: NextRequest): Promise<NextResponse> {
  try {
    const params = getQueryParams(request)
    const dateParam = params.date
    const durationParam = params.duration || '60'
    const rangeParam = params.range || '7' // Nombre de jours à afficher

    if (!dateParam) {
      return createErrorResponse('Paramètre date requis (format: YYYY-MM-DD)', 400)
    }

    const startDate = new Date(dateParam)
    const duration = parseInt(durationParam)
    const range = parseInt(rangeParam)

    if (isNaN(startDate.getTime())) {
      return createErrorResponse('Format de date invalide', 400)
    }

    if (![60, 90].includes(duration)) {
      return createErrorResponse('Durée invalide (60 ou 90 minutes)', 400)
    }

    // Calculer la date de fin
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + range - 1)

    // Générer les créneaux disponibles
    const schedules = SlotGenerator.getAvailableSlots(startDate, endDate, duration)

    return createSuccessResponse({
      schedules,
      period: {
        start: DateUtils.formatDate(startDate),
        end: DateUtils.formatDate(endDate),
        duration
      }
    })

  } catch (error) {
    logAPIError('booking-slots', error as Error, request)
    return createErrorResponse('Erreur lors de la récupération des créneaux', 500)
  }
}

// POST - Créer un nouveau rendez-vous
async function handleCreateAppointment(request: NextRequest): Promise<NextResponse> {
  try {
    // Valider la méthode HTTP
    const methodError = validateHTTPMethod(request, ['POST'])
    if (methodError) return methodError

    // Valider et parser les données
    const validationResult = await validateRequestBody(request, BookingSchema)
    if (!validationResult.success) {
      return validationResult.error
    }

    const bookingData = {
      ...validationResult.data,
      duration: validationResult.data.duration || '60' // Ensure duration has a default value
    }

    // Validation métier du rendez-vous
    const businessValidation = BookingValidator.validateBookingRequest(bookingData)
    if (!businessValidation.isValid) {
      return createErrorResponse(
        'Données de rendez-vous invalides',
        400,
        { errors: businessValidation.errors }
      )
    }

    // Créer le rendez-vous
    const appointmentResult = await AppointmentManager.createAppointment(bookingData)
    if (!appointmentResult.success) {
      return createErrorResponse(appointmentResult.error || 'Erreur lors de la création', 409)
    }

    // Envoyer l'email à Safa
    const emailResult = await EmailService.sendBookingRequest(bookingData)
    if (!emailResult.success) {
      // Annuler le rendez-vous créé
      if (appointmentResult.appointmentId) {
        AppointmentManager.cancelAppointment(appointmentResult.appointmentId)
      }
      
      logAPIError('booking-email', new Error(emailResult.error || 'Email failed'), request)
      return createErrorResponse(
        'Erreur lors de l\'envoi de la notification. Veuillez réessayer.',
        500
      )
    }

    // Confirmer le rendez-vous
    if (appointmentResult.appointmentId) {
      await AppointmentManager.updateAppointment(appointmentResult.appointmentId, { 
        status: 'confirmed' 
      })
    }

    // Enregistrer dans le système de gestion de contacts
    try {
      const { ContactManager } = await import('@/lib/contact-management')
      await ContactManager.addContact('booking', bookingData, 'booking_form')
    } catch (error) {
      console.warn('⚠️ Erreur enregistrement booking contact:', error)
    }

    // Log de succès
    console.log('✅ Rendez-vous créé:', {
      id: appointmentResult.appointmentId,
      patient: `${bookingData.firstName} ${bookingData.lastName}`,
      date: bookingData.preferredDate,
      time: bookingData.preferredTime,
      type: bookingData.consultationType
    })

    return createSuccessResponse(
      {
        appointmentId: appointmentResult.appointmentId,
        status: 'confirmed',
        emailSent: emailResult.success
      },
      'Rendez-vous confirmé ! Vous recevrez une confirmation par email.'
    )

  } catch (error) {
    logAPIError('booking-create', error as Error, request)
    return createErrorResponse('Erreur lors de la création du rendez-vous', 500)
  }
}

// PUT - Modifier un rendez-vous existant
async function handleUpdateAppointment(request: NextRequest): Promise<NextResponse> {
  try {
    const params = getQueryParams(request)
    const appointmentId = params.id

    if (!appointmentId) {
      return createErrorResponse('ID de rendez-vous requis', 400)
    }

    const body = await request.json()
    const { date, time, status, notes } = body

    // Vérifier que le rendez-vous existe
    const existingAppointment = AppointmentManager.getAppointment(appointmentId)
    if (!existingAppointment) {
      return createErrorResponse('Rendez-vous non trouvé', 404)
    }

    // Mettre à jour le rendez-vous
    const updateResult = await AppointmentManager.updateAppointment(appointmentId, {
      ...(date && { date }),
      ...(time && { time }),
      ...(status && { status }),
      ...(notes && { notes })
    })

    if (!updateResult.success) {
      return createErrorResponse(updateResult.error || 'Erreur lors de la modification', 409)
    }

    console.log('📝 Rendez-vous modifié:', appointmentId)

    return createSuccessResponse(
      { appointmentId, updated: true },
      'Rendez-vous modifié avec succès'
    )

  } catch (error) {
    logAPIError('booking-update', error as Error, request)
    return createErrorResponse('Erreur lors de la modification', 500)
  }
}

// DELETE - Annuler un rendez-vous
async function handleCancelAppointment(request: NextRequest): Promise<NextResponse> {
  try {
    const params = getQueryParams(request)
    const appointmentId = params.id

    if (!appointmentId) {
      return createErrorResponse('ID de rendez-vous requis', 400)
    }

    // Vérifier que le rendez-vous existe
    const existingAppointment = AppointmentManager.getAppointment(appointmentId)
    if (!existingAppointment) {
      return createErrorResponse('Rendez-vous non trouvé', 404)
    }

    // Annuler le rendez-vous
    const cancelResult = await AppointmentManager.cancelAppointment(appointmentId)
    if (!cancelResult.success) {
      return createErrorResponse(cancelResult.error || 'Erreur lors de l\'annulation', 500)
    }

    // TODO: Envoyer email de notification d'annulation

    console.log('❌ Rendez-vous annulé:', appointmentId)

    return createSuccessResponse(
      { appointmentId, cancelled: true },
      'Rendez-vous annulé avec succès'
    )

  } catch (error) {
    logAPIError('booking-cancel', error as Error, request)
    return createErrorResponse('Erreur lors de l\'annulation', 500)
  }
}

// Fonction pour obtenir les statistiques (pour admin)
async function handleBookingStats(request: NextRequest): Promise<NextResponse> {
  try {
    const stats = AppointmentManager.getStats()
    
    const params = getQueryParams(request)
    const startDate = params.startDate
    const endDate = params.endDate

    let appointments: any[] = []
    if (startDate && endDate) {
      appointments = AppointmentManager.getAppointmentsByDateRange(startDate, endDate)
    }

    return createSuccessResponse({
      stats,
      ...(appointments.length > 0 && { appointments })
    })

  } catch (error) {
    logAPIError('booking-stats', error as Error, request)
    return createErrorResponse('Erreur lors de la récupération des statistiques', 500)
  }
}

// Routes avec rate limiting
export const POST = withRateLimit('booking')(handleCreateAppointment)
export const PUT = withRateLimit('booking')(handleUpdateAppointment)
export const DELETE = withRateLimit('booking')(handleCancelAppointment)

export async function GET(request: NextRequest) {
  const params = getQueryParams(request)
  const action = params.action

  switch (action) {
    case 'stats':
      return handleBookingStats(request)
    default:
      // Par défaut, récupérer les créneaux disponibles
      return handleGetAvailableSlots(request)
  }
}