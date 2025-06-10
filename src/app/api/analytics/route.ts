import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsEventSchema } from '@/lib/schemas'
import { 
  withRateLimit, 
  validateRequestBody, 
  createErrorResponse, 
  createSuccessResponse,
  logAPIError,
  validateHTTPMethod,
  getQueryParams
} from '@/lib/api-helpers'

// Stockage des événements analytics (en production, utiliser une vraie DB)
interface AnalyticsEvent {
  id: string
  eventType: string
  eventData: Record<string, any>
  page: string
  sessionId: string
  timestamp: number
  userAgent?: string
  ip: string
  userId?: string
}

interface ConversionFunnel {
  sessionId: string
  steps: {
    step: string
    timestamp: number
    page: string
    eventData?: Record<string, any>
  }[]
  completed: boolean
  lastActivity: number
}

const analyticsEvents = new Map<string, AnalyticsEvent>()
const conversionFunnels = new Map<string, ConversionFunnel>()
const formAbandonmentData = new Map<string, {
  sessionId: string
  formType: string
  page: string
  startTime: number
  lastFieldInteraction: number
  fieldsCompleted: string[]
  abandonedAt?: number
  completed: boolean
}>()

// Configuration des funnels de conversion
const CONVERSION_FUNNELS = {
  contact: [
    'page_view_contact',
    'form_start_contact', 
    'form_submit_contact'
  ],
  booking: [
    'page_view_booking',
    'form_start_booking',
    'booking_calendar_view',
    'booking_slot_select',
    'form_submit_booking'
  ],
  newsletter: [
    'page_view',
    'newsletter_cta_view',
    'form_start_newsletter',
    'form_submit_newsletter'
  ],
  download: [
    'page_view',
    'download_cta_click',
    'form_start_download',
    'form_submit_download',
    'download_complete'
  ]
} as const

// POST - Enregistrer un événement analytics
async function handleAnalyticsEvent(request: NextRequest): Promise<NextResponse> {
  try {
    // Valider la méthode HTTP
    const methodError = validateHTTPMethod(request, ['POST'])
    if (methodError) return methodError

    // Valider et parser les données
    const validationResult = await validateRequestBody(request, AnalyticsEventSchema)
    if (!validationResult.success) {
      return validationResult.error
    }

    const eventData = validationResult.data

    // Générer un ID unique pour l'événement
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Récupérer l'IP de l'utilisateur
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Créer l'événement
    const analyticsEvent: AnalyticsEvent = {
      id: eventId,
      eventType: eventData.eventType,
      eventData: eventData.eventData || {},
      page: eventData.page,
      sessionId: eventData.sessionId,
      timestamp: eventData.timestamp || Date.now(),
      userAgent: eventData.userAgent || request.headers.get('user-agent') || undefined,
      ip: ip.split(',')[0].trim() // Premier IP si plusieurs
    }

    // Stocker l'événement
    analyticsEvents.set(eventId, analyticsEvent)

    // Traiter les funnels de conversion
    await processConversionFunnel(analyticsEvent)

    // Traiter l'abandon de formulaire
    await processFormAbandonment(analyticsEvent)

    // Log de succès (en mode développement)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', {
        type: eventData.eventType,
        page: eventData.page,
        session: eventData.sessionId.substring(0, 8) + '...'
      })
    }

    return createSuccessResponse(
      { eventId, recorded: true },
      'Événement enregistré avec succès'
    )

  } catch (error) {
    logAPIError('analytics-event', error as Error, request)
    return createErrorResponse('Erreur lors de l\'enregistrement', 500)
  }
}

// Traitement des funnels de conversion
async function processConversionFunnel(event: AnalyticsEvent): Promise<void> {
  try {
    // Déterminer quel funnel cet événement concerne
    const funnelType = determineFunnelType(event.eventType)
    if (!funnelType) return

    const funnelSteps = CONVERSION_FUNNELS[funnelType as keyof typeof CONVERSION_FUNNELS]
    
    // Récupérer ou créer le funnel pour cette session
    let funnel = conversionFunnels.get(event.sessionId)
    if (!funnel) {
      funnel = {
        sessionId: event.sessionId,
        steps: [],
        completed: false,
        lastActivity: event.timestamp
      }
    }

    // Ajouter l'étape au funnel
    funnel.steps.push({
      step: event.eventType,
      timestamp: event.timestamp,
      page: event.page,
      eventData: event.eventData
    })

    funnel.lastActivity = event.timestamp

    // Vérifier si le funnel est complété
    const completedSteps = funnel.steps.map(s => s.step)
    const isCompleted = funnelSteps.every(step => 
      completedSteps.some(completed => completed.includes(step.split('_')[1]))
    )

    if (isCompleted) {
      funnel.completed = true
    }

    conversionFunnels.set(event.sessionId, funnel)

  } catch (error) {
    console.error('Erreur traitement funnel:', error)
  }
}

// Traitement de l'abandon de formulaire
async function processFormAbandonment(event: AnalyticsEvent): Promise<void> {
  try {
    const formType = extractFormType(event.eventType, event.eventData)
    if (!formType) return

    const formKey = `${event.sessionId}_${formType}`

    if (event.eventType === 'form_start') {
      // Démarrage d'un formulaire
      formAbandonmentData.set(formKey, {
        sessionId: event.sessionId,
        formType,
        page: event.page,
        startTime: event.timestamp,
        lastFieldInteraction: event.timestamp,
        fieldsCompleted: [],
        completed: false
      })
    } else if (event.eventType === 'form_abandon') {
      // Abandon explicite du formulaire
      const formData = formAbandonmentData.get(formKey)
      if (formData) {
        formData.abandonedAt = event.timestamp
        formData.fieldsCompleted = event.eventData.fieldsCompleted || []
        formAbandonmentData.set(formKey, formData)
      }
    } else if (event.eventType === 'form_submit') {
      // Formulaire soumis avec succès
      const formData = formAbandonmentData.get(formKey)
      if (formData) {
        formData.completed = true
        formAbandonmentData.set(formKey, formData)
      }
    }

  } catch (error) {
    console.error('Erreur traitement abandon formulaire:', error)
  }
}

// Déterminer le type de funnel basé sur l'événement
function determineFunnelType(eventType: string): string | null {
  if (eventType.includes('contact')) return 'contact'
  if (eventType.includes('booking')) return 'booking'
  if (eventType.includes('newsletter')) return 'newsletter'
  if (eventType.includes('download')) return 'download'
  return null
}

// Extraire le type de formulaire de l'événement
function extractFormType(eventType: string, eventData: Record<string, any>): string | null {
  if (eventType.includes('contact')) return 'contact'
  if (eventType.includes('booking')) return 'booking'
  if (eventType.includes('newsletter')) return 'newsletter'
  if (eventType.includes('download')) return 'download'
  if (eventData.formType) return eventData.formType
  return null
}

// GET - Récupérer les données analytics
async function handleAnalyticsData(request: NextRequest): Promise<NextResponse> {
  try {
    const params = getQueryParams(request)
    const metric = params.metric
    const dateRange = params.dateRange || '7d'
    const startDate = params.startDate
    const endDate = params.endDate

    // Calculer la période
    const now = Date.now()
    const rangeMap: Record<string, number> = {
      '1d': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000
    }
    
    const timeRange = rangeMap[dateRange] || rangeMap['7d']
    const fromTime = startDate ? new Date(startDate).getTime() : now - timeRange
    const toTime = endDate ? new Date(endDate).getTime() : now

    // Filtrer les événements par période
    const filteredEvents = Array.from(analyticsEvents.values())
      .filter(event => event.timestamp >= fromTime && event.timestamp <= toTime)

    switch (metric) {
      case 'events':
        return createSuccessResponse(await getEventMetrics(filteredEvents))
      
      case 'funnels':
        return createSuccessResponse(await getFunnelMetrics(fromTime, toTime))
      
      case 'abandonment':
        return createSuccessResponse(await getAbandonmentMetrics(fromTime, toTime))
      
      case 'overview':
        return createSuccessResponse(await getOverviewMetrics(filteredEvents, fromTime, toTime))
      
      default:
        return createErrorResponse('Métrique non reconnue', 400)
    }

  } catch (error) {
    logAPIError('analytics-data', error as Error, request)
    return createErrorResponse('Erreur lors de la récupération des données', 500)
  }
}

// Métriques des événements
async function getEventMetrics(events: AnalyticsEvent[]): Promise<any> {
  const eventCounts = events.reduce((acc, event) => {
    acc[event.eventType] = (acc[event.eventType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pageViews = events.filter(e => e.eventType === 'page_view').length
  const uniqueSessions = new Set(events.map(e => e.sessionId)).size

  return {
    totalEvents: events.length,
    pageViews,
    uniqueSessions,
    eventBreakdown: eventCounts,
    topPages: getTopPages(events)
  }
}

// Métriques des funnels de conversion
async function getFunnelMetrics(fromTime: number, toTime: number): Promise<any> {
  const relevantFunnels = Array.from(conversionFunnels.values())
    .filter(funnel => funnel.lastActivity >= fromTime && funnel.lastActivity <= toTime)

  const funnelStats = Object.keys(CONVERSION_FUNNELS).reduce((acc, funnelType) => {
    const typeFunnels = relevantFunnels.filter(funnel =>
      funnel.steps.some(step => determineFunnelType(step.step) === funnelType)
    )

    const completed = typeFunnels.filter(f => f.completed).length
    const started = typeFunnels.length

    acc[funnelType] = {
      started,
      completed,
      conversionRate: started > 0 ? Math.round((completed / started) * 100) : 0,
      averageSteps: started > 0 ? 
        Math.round(typeFunnels.reduce((sum, f) => sum + f.steps.length, 0) / started) : 0
    }

    return acc
  }, {} as Record<string, any>)

  return { funnelStats, totalFunnels: relevantFunnels.length }
}

// Métriques d'abandon de formulaire
async function getAbandonmentMetrics(fromTime: number, toTime: number): Promise<any> {
  const relevantForms = Array.from(formAbandonmentData.values())
    .filter(form => form.startTime >= fromTime && form.startTime <= toTime)

  const formStats = relevantForms.reduce((acc, form) => {
    if (!acc[form.formType]) {
      acc[form.formType] = { started: 0, completed: 0, abandoned: 0 }
    }

    acc[form.formType].started++
    
    if (form.completed) {
      acc[form.formType].completed++
    } else if (form.abandonedAt) {
      acc[form.formType].abandoned++
    }

    return acc
  }, {} as Record<string, any>)

  // Calculer les taux pour chaque type de formulaire
  Object.keys(formStats).forEach(formType => {
    const stats = formStats[formType]
    stats.completionRate = stats.started > 0 ? 
      Math.round((stats.completed / stats.started) * 100) : 0
    stats.abandonmentRate = stats.started > 0 ? 
      Math.round((stats.abandoned / stats.started) * 100) : 0
  })

  return { formStats, totalForms: relevantForms.length }
}

// Métriques générales
async function getOverviewMetrics(events: AnalyticsEvent[], fromTime: number, toTime: number): Promise<any> {
  const eventMetrics = await getEventMetrics(events)
  const funnelMetrics = await getFunnelMetrics(fromTime, toTime)
  const abandonmentMetrics = await getAbandonmentMetrics(fromTime, toTime)

  return {
    summary: {
      totalEvents: eventMetrics.totalEvents,
      uniqueSessions: eventMetrics.uniqueSessions,
      pageViews: eventMetrics.pageViews,
      activeFunnels: funnelMetrics.totalFunnels
    },
    topEvents: Object.entries(eventMetrics.eventBreakdown)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5),
    conversionOverview: funnelMetrics.funnelStats,
    formPerformance: abandonmentMetrics.formStats
  }
}

// Pages les plus visitées
function getTopPages(events: AnalyticsEvent[]): Array<{page: string, views: number}> {
  const pageCounts = events
    .filter(e => e.eventType === 'page_view')
    .reduce((acc, event) => {
      acc[event.page] = (acc[event.page] || 0) + 1
      return acc
    }, {} as Record<string, number>)

  return Object.entries(pageCounts)
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
}

// Nettoyage périodique des anciennes données
function cleanupOldAnalyticsData(): void {
  const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
  
  // Nettoyer les événements anciens
  for (const [id, event] of analyticsEvents.entries()) {
    if (event.timestamp < oneMonthAgo) {
      analyticsEvents.delete(id)
    }
  }
  
  // Nettoyer les funnels anciens
  for (const [sessionId, funnel] of conversionFunnels.entries()) {
    if (funnel.lastActivity < oneMonthAgo) {
      conversionFunnels.delete(sessionId)
    }
  }
}

// Nettoyage quotidien
if (typeof window === 'undefined') {
  setInterval(cleanupOldAnalyticsData, 24 * 60 * 60 * 1000)
}

// Routes avec rate limiting
export const POST = withRateLimit('analytics')(handleAnalyticsEvent)

export async function GET(request: NextRequest) {
  return handleAnalyticsData(request)
}