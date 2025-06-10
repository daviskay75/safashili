import { NextRequest, NextResponse } from 'next/server'
import { validateOrigin, getSecurityHeaders } from './lib/security'

export function middleware(request: NextRequest) {
  // Appliquer le middleware uniquement aux routes API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    
    // Validation CORS
    if (!validateOrigin(request)) {
      return new NextResponse('Origin not allowed', { 
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders()
        }
      })
    }
    
    // Créer une réponse avec les headers de sécurité
    const response = NextResponse.next()
    
    // Ajouter les headers de sécurité
    const securityHeaders = getSecurityHeaders()
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    // Headers CORS
    const origin = request.headers.get('origin')
    if (origin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
    
    response.headers.set(
      'Access-Control-Allow-Methods', 
      'GET, POST, PUT, DELETE, OPTIONS'
    )
    
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, X-CSRF-Token'
    )
    
    response.headers.set('Access-Control-Max-Age', '86400')
    
    // Gérer les requêtes OPTIONS (preflight)
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { 
        status: 200, 
        headers: response.headers 
      })
    }
    
    return response
  }
  
  // Pour les autres routes, continuer normalement
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}