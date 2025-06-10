import { NextRequest, NextResponse } from 'next/server'
import { NewsletterSchema } from '@/lib/schemas'
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
import { validateEmailSecurity } from '@/lib/security'

// Stockage simple des abonnés (en production, utiliser une vraie DB)
const subscribers = new Map<string, {
  email: string
  firstName: string
  interests: string[]
  subscribedAt: string
  confirmed: boolean
  confirmationToken?: string
  unsubscribeToken: string
}>()

// Générer un token unique
function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15) +
         Date.now().toString(36)
}

async function handleNewsletterSubscription(request: NextRequest): Promise<NextResponse> {
  try {
    // Valider la méthode HTTP
    const methodError = validateHTTPMethod(request, ['POST'])
    if (methodError) return methodError

    // Valider et parser les données
    const validationResult = await validateRequestBody(request, NewsletterSchema)
    if (!validationResult.success) {
      return validationResult.error
    }

    const newsletterData = validationResult.data

    // Validation de sécurité de l'email
    const emailSecurity = validateEmailSecurity(newsletterData.email)
    if (!emailSecurity.isValid) {
      return createErrorResponse(
        'Adresse email non autorisée',
        400,
        { reason: emailSecurity.reason }
      )
    }

    // Vérifier si l'email est déjà inscrit
    const existingSubscriber = subscribers.get(newsletterData.email.toLowerCase())
    if (existingSubscriber && existingSubscriber.confirmed) {
      return createErrorResponse(
        'Cette adresse email est déjà inscrite à la newsletter',
        409
      )
    }

    // Créer l'abonnement avec token de confirmation
    const confirmationToken = generateToken()
    const unsubscribeToken = generateToken()
    
    const subscriber = {
      email: newsletterData.email.toLowerCase(),
      firstName: newsletterData.firstName,
      interests: newsletterData.interests || [],
      subscribedAt: new Date().toISOString(),
      confirmed: false,
      confirmationToken,
      unsubscribeToken
    }

    subscribers.set(newsletterData.email.toLowerCase(), subscriber)

    // Enregistrer dans le système de gestion de contacts
    try {
      const { ContactManager } = await import('@/lib/contact-management')
      await ContactManager.addContact('newsletter', newsletterData, 'newsletter_form')
    } catch (error) {
      console.warn('⚠️ Erreur enregistrement newsletter contact:', error)
    }

    // Envoyer l'email de bienvenue
    const emailResult = await EmailService.sendNewsletterWelcome(newsletterData)
    if (!emailResult.success) {
      logAPIError('newsletter', new Error(emailResult.error || 'Email send failed'), request)
      // Retirer l'abonnement raté
      subscribers.delete(newsletterData.email.toLowerCase())
      return createErrorResponse(
        'Erreur lors de l\'envoi de l\'email de confirmation. Veuillez réessayer.',
        500
      )
    }

    // Log de succès
    console.log('✅ Newsletter subscription:', {
      email: newsletterData.email,
      interests: newsletterData.interests,
      messageId: emailResult.messageId
    })

    return createSuccessResponse(
      {
        subscribed: true,
        requiresConfirmation: true,
        messageId: emailResult.messageId
      },
      'Inscription réussie ! Vérifiez votre email pour confirmer votre abonnement.'
    )

  } catch (error) {
    logAPIError('newsletter', error as Error, request)
    
    return createErrorResponse(
      'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.',
      500
    )
  }
}

async function handleNewsletterUnsubscribe(request: NextRequest): Promise<NextResponse> {
  try {
    const params = getQueryParams(request)
    const email = params.email
    const token = params.token
    const reason = params.reason

    if (!email || !token) {
      return createErrorResponse(
        'Email et token de désinscription requis',
        400
      )
    }

    // Vérifier que l'abonné existe
    const subscriber = subscribers.get(email.toLowerCase())
    if (!subscriber) {
      return createErrorResponse(
        'Aucun abonnement trouvé pour cette adresse email',
        404
      )
    }

    // Vérifier le token de désinscription
    if (subscriber.unsubscribeToken !== token) {
      return createErrorResponse(
        'Token de désinscription invalide',
        403
      )
    }

    // Supprimer l'abonnement
    subscribers.delete(email.toLowerCase())

    // Log de la désinscription
    console.log('📤 Newsletter unsubscribe:', {
      email,
      reason: reason || 'not_specified',
      subscribedAt: subscriber.subscribedAt
    })

    return createSuccessResponse(
      {
        unsubscribed: true,
        email: email
      },
      'Désinscription confirmée. Vous ne recevrez plus nos emails.'
    )

  } catch (error) {
    logAPIError('newsletter-unsubscribe', error as Error, request)
    
    return createErrorResponse(
      'Erreur lors de la désinscription. Veuillez réessayer.',
      500
    )
  }
}

async function handleNewsletterConfirmation(request: NextRequest): Promise<NextResponse> {
  try {
    const params = getQueryParams(request)
    const email = params.email
    const token = params.token

    if (!email || !token) {
      return createErrorResponse(
        'Email et token de confirmation requis',
        400
      )
    }

    // Vérifier que l'abonné existe
    const subscriber = subscribers.get(email.toLowerCase())
    if (!subscriber) {
      return createErrorResponse(
        'Aucun abonnement trouvé pour cette adresse email',
        404
      )
    }

    // Vérifier le token de confirmation
    if (subscriber.confirmationToken !== token) {
      return createErrorResponse(
        'Token de confirmation invalide',
        403
      )
    }

    // Confirmer l'abonnement
    subscriber.confirmed = true
    delete subscriber.confirmationToken
    subscribers.set(email.toLowerCase(), subscriber)

    console.log('✅ Newsletter confirmed:', {
      email,
      subscribedAt: subscriber.subscribedAt
    })

    return createSuccessResponse(
      {
        confirmed: true,
        email: email
      },
      'Abonnement confirmé ! Vous recevrez maintenant nos emails.'
    )

  } catch (error) {
    logAPIError('newsletter-confirm', error as Error, request)
    
    return createErrorResponse(
      'Erreur lors de la confirmation. Veuillez réessayer.',
      500
    )
  }
}

// Fonction pour obtenir les statistiques (pour admin)
async function handleNewsletterStats(request: NextRequest): Promise<NextResponse> {
  try {
    const totalSubscribers = subscribers.size
    const confirmedSubscribers = Array.from(subscribers.values())
      .filter(sub => sub.confirmed).length
    const pendingSubscribers = totalSubscribers - confirmedSubscribers

    const interestStats = Array.from(subscribers.values())
      .reduce((acc, sub) => {
        sub.interests.forEach(interest => {
          acc[interest] = (acc[interest] || 0) + 1
        })
        return acc
      }, {} as Record<string, number>)

    return createSuccessResponse({
      total: totalSubscribers,
      confirmed: confirmedSubscribers,
      pending: pendingSubscribers,
      interests: interestStats
    })

  } catch (error) {
    logAPIError('newsletter-stats', error as Error, request)
    return createErrorResponse('Erreur lors de la récupération des statistiques', 500)
  }
}

// Routes avec rate limiting
export const POST = withRateLimit('newsletter')(handleNewsletterSubscription)
export const DELETE = withRateLimit('newsletter')(handleNewsletterUnsubscribe)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  switch (action) {
    case 'confirm':
      return handleNewsletterConfirmation(request)
    case 'stats':
      return handleNewsletterStats(request)
    default:
      return createErrorResponse('Action non reconnue', 400)
  }
}