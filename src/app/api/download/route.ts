import { NextRequest, NextResponse } from 'next/server'
import { LeadMagnetDownloadSchema } from '@/lib/schemas'
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
import { trackEvent } from '@/lib/analytics'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { DatabaseContactManager } from '@/lib/database'

// Types pour les lead magnets
interface LeadMagnet {
  slug: string
  title: string
  fileName: string
  filePath: string
  category: string
  description: string
}

// Configuration des lead magnets disponibles
const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  'sortir-violence-conjugale': {
    slug: 'sortir-violence-conjugale',
    title: 'Guide Complet : Sortir de la Violence Conjugale',
    fileName: 'guide-sortir-violence-conjugale.pdf',
    filePath: '/content/lead-magnets/pdfs/guide-sortir-violence-conjugale.pdf',
    category: 'violence',
    description: 'Guide professionnel de 12 pages pour accompagner les victimes de violence conjugale'
  },
  '10-signes-consultation': {
    slug: '10-signes-consultation',
    title: '10 Signes Qu\'il Faut Consulter un Psychologue',
    fileName: '10-signes-consultation-psychologue.pdf',
    filePath: '/content/lead-magnets/pdfs/10-signes-consultation-psychologue.pdf',
    category: 'consultation',
    description: 'Checklist pratique pour identifier le besoin d\'accompagnement psychologique'
  },
  'gerer-anxiete-quotidien': {
    slug: 'gerer-anxiete-quotidien',
    title: 'Gérer l\'Anxiété au Quotidien : Techniques Pratiques',
    fileName: 'guide-gerer-anxiete-quotidien.pdf',
    filePath: '/content/lead-magnets/pdfs/guide-gerer-anxiete-quotidien.pdf',
    category: 'anxiety',
    description: 'Guide pratique de 8 pages avec techniques concrètes de gestion de l\'anxiété'
  }
}

async function handleLeadMagnetRequest(request: NextRequest): Promise<NextResponse> {
  try {
    // Valider la méthode HTTP
    const methodError = validateHTTPMethod(request, ['POST'])
    if (methodError) return methodError

    // Valider et parser les données
    const validationResult = await validateRequestBody(request, LeadMagnetDownloadSchema)
    if (!validationResult.success) {
      return validationResult.error
    }

    const downloadData = validationResult.data

    // Vérifier que le lead magnet existe
    const leadMagnet = LEAD_MAGNETS[downloadData.leadMagnetSlug]
    if (!leadMagnet) {
      return createErrorResponse(
        'Guide non trouvé',
        404,
        { slug: downloadData.leadMagnetSlug }
      )
    }

    // Validation de sécurité de l'email
    const emailSecurity = validateEmailSecurity(downloadData.email)
    if (!emailSecurity.isValid) {
      return createErrorResponse(
        'Adresse email non autorisée',
        400,
        { reason: emailSecurity.reason }
      )
    }

    // Log en cas d'email à risque
    if (emailSecurity.risk === 'medium' || emailSecurity.risk === 'high') {
      console.warn('🚨 Email à risque pour téléchargement:', {
        email: downloadData.email,
        risk: emailSecurity.risk,
        leadMagnet: leadMagnet.slug
      })
    }

    // Enregistrer le téléchargement dans la base de données
    try {
      await DatabaseContactManager.saveLeadMagnetDownload({
        leadMagnetSlug: leadMagnet.slug,
        email: downloadData.email,
        firstName: downloadData.firstName,
        lastName: downloadData.lastName,
        phone: downloadData.phone,
        source: downloadData.source,
        userAgent: request.headers.get('user-agent') || '',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        gdprConsent: downloadData.rgpdConsent,
        emailSequenceSubscribed: downloadData.subscribeToNewsletter || false
      })
    } catch (dbError) {
      console.error('Erreur base de données:', dbError)
      // Continuer même si la DB échoue (mode dégradé)
    }

    // Envoyer l'email de confirmation avec le lien de téléchargement
    const emailResult = await EmailService.sendLeadMagnetEmail({
      email: downloadData.email,
      firstName: downloadData.firstName,
      leadMagnet: leadMagnet,
      downloadData: downloadData
    })

    if (!emailResult.success) {
      logAPIError('download', new Error(emailResult.error || 'Email send failed'), request)
      return createErrorResponse(
        'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.',
        500,
        { emailError: emailResult.error }
      )
    }

    // Déclencher l'automation email si l'utilisateur s'est abonné
    if (downloadData.subscribeToNewsletter) {
      try {
        await EmailService.subscribeToSequence({
          email: downloadData.email,
          firstName: downloadData.firstName,
          lastName: downloadData.lastName,
          source: 'lead_magnet_download',
          sourceId: leadMagnet.slug,
          sequenceSlug: getSequenceForCategory(leadMagnet.category)
        })
      } catch (sequenceError) {
        console.error('Erreur inscription séquence email:', sequenceError)
        // Ne pas faire échouer la requête pour ça
      }
    }

    // Tracker l'événement analytique
    trackEvent({
      action: 'lead_magnet_download',
      category: 'lead_generation',
      label: leadMagnet.slug,
      value: 1,
      custom_parameters: {
        leadMagnetTitle: leadMagnet.title,
        category: leadMagnet.category,
        source: downloadData.source,
        subscribed: downloadData.subscribeToNewsletter
      }
    })

    // Log succès
    console.log('📥 Téléchargement lead magnet:', {
      email: downloadData.email,
      leadMagnet: leadMagnet.slug,
      source: downloadData.source,
      subscribed: downloadData.subscribeToNewsletter
    })

    return createSuccessResponse({
      message: 'Guide envoyé par email avec succès !',
      leadMagnet: {
        title: leadMagnet.title,
        category: leadMagnet.category
      },
      emailSent: true,
      subscribed: downloadData.subscribeToNewsletter
    })

  } catch (error) {
    logAPIError('download', error as Error, request)
    return createErrorResponse(
      'Erreur interne du serveur',
      500,
      { error: (error as Error).message }
    )
  }
}

// Endpoint pour télécharger directement le fichier (avec token sécurisé)
async function handleDirectDownload(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug')
    const token = url.searchParams.get('token')

    if (!slug || !token) {
      return createErrorResponse('Paramètres manquants', 400)
    }

    // Vérifier le token (simple vérification pour l'exemple)
    // En production, utiliser un JWT ou système plus robuste
    const expectedToken = generateDownloadToken(slug)
    if (token !== expectedToken) {
      return createErrorResponse('Token invalide', 403)
    }

    const leadMagnet = LEAD_MAGNETS[slug]
    if (!leadMagnet) {
      return createErrorResponse('Guide non trouvé', 404)
    }

    // Lire le fichier PDF professionnel
    try {
      const filePath = join(process.cwd(), 'public', leadMagnet.filePath)
      const fileBuffer = await readFile(filePath)

      // Tracker le téléchargement réussi
      trackEvent({
        action: 'pdf_download_success',
        category: 'lead_generation',
        label: leadMagnet.slug,
        value: 1,
        custom_parameters: {
          leadMagnetTitle: leadMagnet.title,
          category: leadMagnet.category,
          fileSize: fileBuffer.length
        }
      })

      // Retourner le fichier PDF avec les headers appropriés
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${leadMagnet.fileName}"`,
          'Content-Length': fileBuffer.length.toString(),
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          // Headers supplémentaires pour les clients d'email
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN'
        }
      })
    } catch (fileError) {
      console.error('Erreur lecture fichier PDF:', fileError)
      
      // Tracker l'erreur
      trackEvent({
        action: 'pdf_download_error',
        category: 'lead_generation',
        label: leadMagnet.slug,
        value: 0,
        custom_parameters: {
          error: 'file_not_found',
          filePath: leadMagnet.filePath
        }
      })
      
      return createErrorResponse('Fichier PDF non disponible temporairement', 404)
    }

  } catch (error) {
    logAPIError('download-direct', error as Error, request)
    return createErrorResponse('Erreur interne', 500)
  }
}

// Helper pour déterminer la séquence email selon la catégorie
function getSequenceForCategory(category: string): string {
  const sequences: Record<string, string> = {
    'violence': 'violence-conjugale-welcome',
    'anxiety': 'anxiety-management-welcome', 
    'consultation': 'general-welcome',
    'default': 'general-welcome'
  }
  
  return sequences[category] || sequences.default
}

// Helper pour générer un token de téléchargement sécurisé
function generateDownloadToken(slug: string): string {
  // En production, utiliser un système plus robuste (JWT, expiration, etc.)
  const secret = process.env.DOWNLOAD_TOKEN_SECRET || 'development-secret'
  const timestamp = Math.floor(Date.now() / (1000 * 60 * 60)) // Valid 1 heure
  
  // Hash simple pour l'exemple (utiliser crypto en production)
  return Buffer.from(`${slug}-${timestamp}-${secret}`).toString('base64')
}

// Routes principales
export const POST = withRateLimit('download')(handleLeadMagnetRequest)
export const GET = handleDirectDownload