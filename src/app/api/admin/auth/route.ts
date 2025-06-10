import { NextRequest } from 'next/server'
import { createAdminSession, validateAdminCredentials, checkLoginRateLimit, validateAdminSession } from '@/lib/admin-auth'
import { createErrorResponse, createSuccessResponse, logAPIError } from '@/lib/api-helpers'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Rate limiting
    if (!checkLoginRateLimit(clientIP)) {
      return createErrorResponse('Trop de tentatives. Réessayez dans 15 minutes.', 429)
    }

    // Validate credentials
    if (!username || !password) {
      return createErrorResponse('Nom d\'utilisateur et mot de passe requis', 400)
    }

    if (!validateAdminCredentials(username, password)) {
      return createErrorResponse('Identifiants incorrects', 401)
    }

    // Create session
    const sessionId = createAdminSession(clientIP)

    return createSuccessResponse({
      sessionId,
      message: 'Connexion réussie'
    })

  } catch (error) {
    logAPIError('admin-auth', error as Error, request)
    return createErrorResponse('Erreur d\'authentification', 500)
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const sessionId = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!sessionId) {
      return createErrorResponse('Session manquante', 401)
    }

    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Validate session  
    const isValid = validateAdminSession(sessionId, clientIP)
    
    if (!isValid) {
      return createErrorResponse('Session expirée', 401)
    }

    return createSuccessResponse({
      authenticated: true,
      message: 'Session valide'
    })

  } catch (error) {
    logAPIError('admin-auth-check', error as Error, request)
    return createErrorResponse('Erreur de vérification', 500)
  }
}