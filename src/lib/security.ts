import { NextRequest } from 'next/server'

// Rate limiting en mémoire (pour développement)
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Configuration du rate limiting par endpoint
const RATE_LIMITS = {
  contact: { requests: 3, windowMs: 60000 }, // 3 requêtes par minute
  newsletter: { requests: 1, windowMs: 60000 }, // 1 requête par minute
  booking: { requests: 5, windowMs: 300000 }, // 5 requêtes par 5 minutes
  download: { requests: 3, windowMs: 300000 }, // 3 téléchargements par 5 minutes
  analytics: { requests: 50, windowMs: 60000 }, // 50 événements par minute
}

export function getRateLimitKey(ip: string, endpoint: string): string {
  return `${ip}:${endpoint}`
}

export function checkRateLimit(
  request: NextRequest, 
  endpoint: keyof typeof RATE_LIMITS
): { allowed: boolean; remaining: number; resetTime: number } {
  const ip = getClientIP(request)
  const key = getRateLimitKey(ip, endpoint)
  const now = Date.now()
  const limit = RATE_LIMITS[endpoint]
  
  const entry = rateLimitStore.get(key)
  
  if (!entry || now > entry.resetTime) {
    // Nouveau rate limit ou fenêtre expirée
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + limit.windowMs
    }
    rateLimitStore.set(key, newEntry)
    
    return {
      allowed: true,
      remaining: limit.requests - 1,
      resetTime: newEntry.resetTime
    }
  }
  
  if (entry.count >= limit.requests) {
    // Limite atteinte
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime
    }
  }
  
  // Incrémenter le compteur
  entry.count++
  rateLimitStore.set(key, entry)
  
  return {
    allowed: true,
    remaining: limit.requests - entry.count,
    resetTime: entry.resetTime
  }
}

export function getClientIP(request: NextRequest): string {
  // Essayer plusieurs headers pour obtenir l'IP réelle
  const xForwardedFor = request.headers.get('x-forwarded-for')
  const xRealIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim()
  }
  
  if (xRealIP) {
    return xRealIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}

// Sanitisation des entrées utilisateur
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Supprimer les scripts
    .replace(/<[^>]*>/g, '') // Supprimer les tags HTML
    .replace(/javascript:/gi, '') // Supprimer javascript:
    .replace(/on\w+\s*=/gi, '') // Supprimer les event handlers
    .substring(0, 10000) // Limiter la taille
}

// Validation de l'origine CORS
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  
  // En production, liste des domaines autorisés
  const allowedOrigins = [
    'https://safa-shili-psychologue.fr',
    'https://www.safa-shili-psychologue.fr',
    'https://safashili.com',
    'https://www.safashili.com',
    'http://localhost:3000', // Pour le développement
    'http://127.0.0.1:3000'
  ]
  
  if (process.env.NODE_ENV === 'development') {
    return true // En développement, autoriser toutes les origines
  }
  
  if (!origin && !referer) {
    return false // Pas d'origine = suspect
  }
  
  if (origin && allowedOrigins.includes(origin)) {
    return true
  }
  
  if (referer) {
    const refererOrigin = new URL(referer).origin
    return allowedOrigins.includes(refererOrigin)
  }
  
  return false
}

// Headers de sécurité CSRF
export function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  }
}

// Validation du token CSRF (simple)
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}

export function validateCSRFToken(
  token: string, 
  sessionToken: string | null
): boolean {
  if (!token || !sessionToken) return false
  return token === sessionToken
}

// Nettoyage périodique du rate limit store
export function cleanupRateLimitStore(): void {
  const now = Date.now()
  
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Validation d'email avancée (anti-spam)
export function validateEmailSecurity(email: string): {
  isValid: boolean
  risk: 'low' | 'medium' | 'high'
  reason?: string
} {
  const disposableEmailDomains = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com'
  ]
  
  const domain = email.split('@')[1]?.toLowerCase()
  
  if (!domain) {
    return { isValid: false, risk: 'high', reason: 'Domaine manquant' }
  }
  
  if (disposableEmailDomains.includes(domain)) {
    return { isValid: false, risk: 'high', reason: 'Email jetable détecté' }
  }
  
  // Vérifier les patterns suspects
  const suspiciousPatterns = [
    /^[a-z]+\d{3,}@/, // lettres suivies de beaucoup de chiffres
    /^\w{1,3}@/, // très court avant @
    /\+.*\+/, // plusieurs + dans l'email
  ]
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(email)) {
      return { isValid: true, risk: 'medium', reason: 'Pattern suspect' }
    }
  }
  
  return { isValid: true, risk: 'low' }
}

// Initialiser le nettoyage périodique (toutes les heures)
if (typeof window === 'undefined') {
  setInterval(cleanupRateLimitStore, 3600000)
}