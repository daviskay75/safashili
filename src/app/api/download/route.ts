import { NextRequest, NextResponse } from 'next/server'
import { LeadMagnetSchema } from '@/lib/schemas'
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
import { readFile } from 'fs/promises'
import { join } from 'path'

// Stockage des tokens de téléchargement (en production, utiliser une vraie DB)
interface DownloadToken {
  email: string
  guideType: string
  expiresAt: number
  used: boolean
  createdAt: string
}

const downloadTokens = new Map<string, DownloadToken>()
const downloadStats = new Map<string, {
  totalRequests: number
  totalDownloads: number
  emailsByGuide: Record<string, number>
}>()

// Configuration des guides disponibles
const AVAILABLE_GUIDES = {
  'guide-violence-conjugale': {
    title: 'Guide - Sortir de la violence conjugale',
    filename: 'guide-violence-conjugale.pdf',
    description: 'Conseils pratiques et ressources pour sortir de la violence conjugale'
  },
  'guide-psychotraumatisme': {
    title: 'Guide - Comprendre le psychotraumatisme',
    filename: 'guide-psychotraumatisme.pdf', 
    description: 'Les mécanismes du trauma et les étapes de guérison'
  },
  'guide-adolescents': {
    title: 'Guide - Accompagner un adolescent en difficulté',
    filename: 'guide-adolescents.pdf',
    description: 'Conseils pour les parents et proches d\'adolescents'
  },
  'guide-souffrance-travail': {
    title: 'Guide - Gérer la souffrance au travail',
    filename: 'guide-souffrance-travail.pdf',
    description: 'Reconnaître et agir face au burnout et au harcèlement'
  },
  'autotest-bien-etre': {
    title: 'Autotest - Évaluer votre bien-être psychologique',
    filename: 'autotest-bien-etre.pdf',
    description: 'Questionnaire d\'auto-évaluation de votre santé mentale'
  }
} as const

// Générer un token sécurisé
function generateDownloadToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

// POST - Demander un téléchargement avec email gate
async function handleDownloadRequest(request: NextRequest): Promise<NextResponse> {
  try {
    // Valider la méthode HTTP
    const methodError = validateHTTPMethod(request, ['POST'])
    if (methodError) return methodError

    // Valider et parser les données
    const validationResult = await validateRequestBody(request, LeadMagnetSchema)
    if (!validationResult.success) {
      return validationResult.error
    }

    const leadData = validationResult.data

    // Vérifier que le guide existe
    if (!(leadData.guideType in AVAILABLE_GUIDES)) {
      return createErrorResponse('Guide non disponible', 404)
    }

    // Validation de sécurité de l'email
    const emailSecurity = validateEmailSecurity(leadData.email)
    if (!emailSecurity.isValid) {
      return createErrorResponse(
        'Adresse email non autorisée',
        400,
        { reason: emailSecurity.reason }
      )
    }

    // Générer un token de téléchargement
    const downloadToken = generateDownloadToken()
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000) // 24h

    const tokenData: DownloadToken = {
      email: leadData.email.toLowerCase(),
      guideType: leadData.guideType,
      expiresAt,
      used: false,
      createdAt: new Date().toISOString()
    }

    downloadTokens.set(downloadToken, tokenData)

    // Inscrire automatiquement à la newsletter si consentement
    if (leadData.marketingConsent) {
      // Créer les données pour la newsletter
      const newsletterData = {
        email: leadData.email,
        firstName: leadData.firstName,
        interests: [leadData.guideType.split('-')[1]], // Extraire l'intérêt du type de guide
        marketingConsent: true,
        rgpdConsent: leadData.rgpdConsent
      }

      // Appeler l'API newsletter en interne (simulation)
      console.log('📧 Auto-inscription newsletter:', newsletterData.email)
    }

    // Mettre à jour les statistiques
    const stats = downloadStats.get('global') || { 
      totalRequests: 0, 
      totalDownloads: 0, 
      emailsByGuide: {} 
    }
    stats.totalRequests++
    stats.emailsByGuide[leadData.guideType] = (stats.emailsByGuide[leadData.guideType] || 0) + 1
    downloadStats.set('global', stats)

    // Créer l'URL de téléchargement sécurisée
    const downloadUrl = `/api/download?token=${downloadToken}&guide=${leadData.guideType}`

    // Log de succès
    console.log('📥 Demande de téléchargement:', {
      email: leadData.email,
      guide: leadData.guideType,
      newsletter: leadData.marketingConsent,
      token: downloadToken.substring(0, 8) + '...'
    })

    return createSuccessResponse(
      {
        downloadUrl,
        guideInfo: AVAILABLE_GUIDES[leadData.guideType],
        expiresAt: new Date(expiresAt).toISOString(),
        newsletterSubscribed: leadData.marketingConsent
      },
      'Lien de téléchargement généré avec succès ! Le lien expire dans 24h.'
    )

  } catch (error) {
    logAPIError('download-request', error as Error, request)
    return createErrorResponse('Erreur lors de la génération du lien', 500)
  }
}

// GET - Télécharger le fichier avec token
async function handleSecureDownload(request: NextRequest): Promise<NextResponse> {
  try {
    const params = getQueryParams(request)
    const token = params.token
    const guideType = params.guide

    if (!token || !guideType) {
      return createErrorResponse('Token et type de guide requis', 400)
    }

    // Vérifier le token
    const tokenData = downloadTokens.get(token)
    if (!tokenData) {
      return createErrorResponse('Token invalide', 403)
    }

    // Vérifier l'expiration
    if (Date.now() > tokenData.expiresAt) {
      downloadTokens.delete(token)
      return createErrorResponse('Token expiré', 403)
    }

    // Vérifier le type de guide
    if (tokenData.guideType !== guideType) {
      return createErrorResponse('Token ne correspond pas au guide demandé', 403)
    }

    // Vérifier que le guide existe
    if (!(guideType in AVAILABLE_GUIDES)) {
      return createErrorResponse('Guide non trouvé', 404)
    }

    // Marquer comme utilisé (mais garder pour les stats)
    tokenData.used = true
    downloadTokens.set(token, tokenData)

    // Mettre à jour les stats de téléchargement
    const stats = downloadStats.get('global') || { 
      totalRequests: 0, 
      totalDownloads: 0, 
      emailsByGuide: {} 
    }
    stats.totalDownloads++
    downloadStats.set('global', stats)

    try {
      // Tenter de servir le fichier PDF (si il existe)
      const filePath = join(process.cwd(), 'public', 'downloads', AVAILABLE_GUIDES[guideType as keyof typeof AVAILABLE_GUIDES].filename)
      const fileBuffer = await readFile(filePath)

      // Log du téléchargement
      console.log('📄 Téléchargement effectué:', {
        email: tokenData.email,
        guide: guideType,
        token: token.substring(0, 8) + '...'
      })

      // Retourner le fichier PDF
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${AVAILABLE_GUIDES[guideType as keyof typeof AVAILABLE_GUIDES].filename}"`,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache'
        }
      })

    } catch {
      // Si le fichier n'existe pas, retourner un PDF de placeholder
      console.warn('⚠️ Fichier PDF non trouvé:', guideType)
      
      return createSuccessResponse(
        {
          message: 'Téléchargement validé',
          guide: AVAILABLE_GUIDES[guideType as keyof typeof AVAILABLE_GUIDES],
          note: 'Le fichier sera bientôt disponible. Vous recevrez un email de notification.'
        },
        'Téléchargement autorisé - Fichier en préparation'
      )
    }

  } catch (error) {
    logAPIError('download-file', error as Error, request)
    return createErrorResponse('Erreur lors du téléchargement', 500)
  }
}

// GET - Statistiques des téléchargements (pour admin)
async function handleDownloadStats(request: NextRequest): Promise<NextResponse> {
  try {
    const stats = downloadStats.get('global') || { 
      totalRequests: 0, 
      totalDownloads: 0, 
      emailsByGuide: {} 
    }

    const conversionRate = stats.totalRequests > 0 
      ? Math.round((stats.totalDownloads / stats.totalRequests) * 100) 
      : 0

    // Calculer les stats par guide
    const guideStats = Object.entries(AVAILABLE_GUIDES).map(([key, guide]) => ({
      guideType: key,
      title: guide.title,
      requests: stats.emailsByGuide[key] || 0,
      percentage: stats.totalRequests > 0 
        ? Math.round(((stats.emailsByGuide[key] || 0) / stats.totalRequests) * 100)
        : 0
    }))

    return createSuccessResponse({
      overview: {
        totalRequests: stats.totalRequests,
        totalDownloads: stats.totalDownloads,
        conversionRate: `${conversionRate}%`
      },
      byGuide: guideStats,
      activeTokens: Array.from(downloadTokens.values())
        .filter(token => !token.used && Date.now() < token.expiresAt).length
    })

  } catch (error) {
    logAPIError('download-stats', error as Error, request)
    return createErrorResponse('Erreur lors de la récupération des statistiques', 500)
  }
}

// Nettoyage périodique des tokens expirés
function cleanupExpiredTokens(): void {
  const now = Date.now()
  for (const [token, data] of downloadTokens.entries()) {
    if (now > data.expiresAt) {
      downloadTokens.delete(token)
    }
  }
}

// Nettoyage toutes les heures
if (typeof window === 'undefined') {
  setInterval(cleanupExpiredTokens, 3600000)
}

// Routes avec rate limiting
export const POST = withRateLimit('download')(handleDownloadRequest)

export async function GET(request: NextRequest) {
  const params = getQueryParams(request)
  const action = params.action

  switch (action) {
    case 'stats':
      return handleDownloadStats(request)
    default:
      // Par défaut, téléchargement sécurisé
      return handleSecureDownload(request)
  }
}