import { NextRequest, NextResponse } from 'next/server'
import { ContactSchema } from '@/lib/schemas'
import { EmailService } from '@/lib/email'
import { 
  withRateLimit, 
  validateRequestBody, 
  createErrorResponse, 
  createSuccessResponse,
  logAPIError,
  validateHTTPMethod 
} from '@/lib/api-helpers'
import { validateEmailSecurity } from '@/lib/security'

async function handleContactSubmission(request: NextRequest): Promise<NextResponse> {
  try {
    // Valider la méthode HTTP
    const methodError = validateHTTPMethod(request, ['POST'])
    if (methodError) return methodError

    // Valider et parser les données
    const validationResult = await validateRequestBody(request, ContactSchema)
    if (!validationResult.success) {
      return validationResult.error
    }

    const contactData = validationResult.data

    // Validation de sécurité de l'email
    const emailSecurity = validateEmailSecurity(contactData.email)
    if (!emailSecurity.isValid) {
      return createErrorResponse(
        'Adresse email non autorisée',
        400,
        { reason: emailSecurity.reason }
      )
    }

    // Log en cas d'email à risque
    if (emailSecurity.risk === 'medium' || emailSecurity.risk === 'high') {
      console.warn('🚨 Email à risque détecté:', {
        email: contactData.email,
        risk: emailSecurity.risk,
        reason: emailSecurity.reason
      })
    }

    // Envoyer l'email à Safa
    const emailResult = await EmailService.sendContactEmail(contactData)
    if (!emailResult.success) {
      logAPIError('contact', new Error(emailResult.error || 'Email send failed'), request)
      return createErrorResponse(
        'Erreur lors de l\'envoi du message. Veuillez réessayer.',
        500
      )
    }

    // Envoyer la confirmation au client
    const confirmationResult = await EmailService.sendContactConfirmation(contactData)
    if (!confirmationResult.success) {
      // Log l'erreur mais ne pas faire échouer la requête
      console.warn('⚠️ Échec envoi confirmation:', confirmationResult.error)
    }

    // Enregistrer le contact dans le système de gestion
    try {
      const { ContactManager } = await import('@/lib/contact-management')
      await ContactManager.addContact('contact', contactData, 'contact_page')
    } catch (error) {
      console.warn('⚠️ Erreur enregistrement contact:', error)
    }

    // Log de succès pour monitoring
    console.log('✅ Contact form submitted:', {
      email: contactData.email,
      type: contactData.consultationType,
      urgency: contactData.urgency,
      messageId: emailResult.messageId
    })

    return createSuccessResponse(
      {
        messageId: emailResult.messageId,
        confirmationSent: confirmationResult.success
      },
      'Votre message a été envoyé avec succès. Vous recevrez une réponse rapidement.'
    )

  } catch (error) {
    logAPIError('contact', error as Error, request)
    
    return createErrorResponse(
      'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.',
      500
    )
  }
}

// Appliquer le rate limiting
export const POST = withRateLimit('contact')(handleContactSubmission)

export async function GET() {
  return createErrorResponse('Méthode non autorisée', 405)
}