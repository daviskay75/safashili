import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, sanitizeInput } from './security'
import { z } from 'zod'

// Types pour le rate limiting
type RateLimitEndpoint = 'contact' | 'newsletter' | 'booking' | 'download' | 'analytics'

// Helper pour créer une réponse avec rate limiting
export function withRateLimit(endpoint: RateLimitEndpoint) {
  return function(
    handler: (request: NextRequest) => Promise<NextResponse>
  ) {
    return async function(request: NextRequest): Promise<NextResponse> {
      // Vérifier le rate limiting
      const rateLimitResult = checkRateLimit(request, endpoint)
      
      if (!rateLimitResult.allowed) {
        const timeUntilReset = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        
        return NextResponse.json(
          { 
            error: 'Trop de requêtes. Veuillez patienter.',
            retryAfter: timeUntilReset
          },
          { 
            status: 429,
            headers: {
              'Retry-After': timeUntilReset.toString(),
              'X-RateLimit-Limit': '3',
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
            }
          }
        )
      }
      
      // Ajouter les headers de rate limiting
      const response = await handler(request)
      
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
      response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString())
      
      return response
    }
  }
}

// Helper pour valider les données avec Zod
export async function validateRequestBody<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: NextResponse }> {
  try {
    const body = await request.json()
    
    // Sanitiser les chaînes dans le body
    const sanitizedBody = sanitizeObjectStrings(body)
    
    // Valider avec le schéma Zod
    const validatedData = schema.parse(sanitizedBody)
    
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]
      return {
        success: false,
        error: NextResponse.json(
          { 
            error: 'Données invalides',
            details: firstError.message,
            field: firstError.path.join('.')
          },
          { status: 400 }
        )
      }
    }
    
    return {
      success: false,
      error: NextResponse.json(
        { error: 'Format de données invalide' },
        { status: 400 }
      )
    }
  }
}

// Sanitiser récursivement les chaînes dans un objet
function sanitizeObjectStrings(obj: any): any {
  if (typeof obj === 'string') {
    return sanitizeInput(obj)
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObjectStrings)
  }
  
  if (obj && typeof obj === 'object') {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObjectStrings(value)
    }
    return sanitized
  }
  
  return obj
}

// Helper pour les erreurs API standardisées
export function createErrorResponse(
  message: string,
  status: number = 400,
  details?: any
): NextResponse {
  return NextResponse.json(
    {
      error: message,
      ...(details && { details }),
      timestamp: new Date().toISOString()
    },
    { status }
  )
}

// Helper pour les réponses de succès standardisées
export function createSuccessResponse(
  data: any,
  message?: string
): NextResponse {
  return NextResponse.json({
    success: true,
    ...(message && { message }),
    data,
    timestamp: new Date().toISOString()
  })
}

// Helper pour log des erreurs (pour monitoring)
export function logAPIError(
  endpoint: string,
  error: Error,
  request: NextRequest,
  userId?: string
): void {
  const logData = {
    timestamp: new Date().toISOString(),
    endpoint,
    method: request.method,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || 'unknown',
    userId,
    error: {
      message: error.message,
      stack: error.stack
    }
  }
  
  // En production, envoyer vers un service de monitoring
  if (process.env.NODE_ENV === 'production') {
    // TODO: Intégrer avec Sentry, LogRocket, etc.
    console.error('API Error:', logData)
  } else {
    console.error('API Error:', logData)
  }
}

// Helper pour la validation des méthodes HTTP
export function validateHTTPMethod(
  request: NextRequest,
  allowedMethods: string[]
): NextResponse | null {
  if (!allowedMethods.includes(request.method)) {
    return NextResponse.json(
      { error: `Méthode ${request.method} non autorisée` },
      { 
        status: 405,
        headers: {
          'Allow': allowedMethods.join(', ')
        }
      }
    )
  }
  
  return null
}

// Helper pour extraire les paramètres de query string
export function getQueryParams(request: NextRequest): Record<string, string> {
  const params: Record<string, string> = {}
  const { searchParams } = new URL(request.url)
  
  for (const [key, value] of searchParams.entries()) {
    params[key] = sanitizeInput(value)
  }
  
  return params
}