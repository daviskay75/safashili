// Simple admin authentication for psychology practice
// Add this to secure your admin dashboard in production

export const ADMIN_CONFIG = {
  // Admin credentials (set in environment variables)
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'safa.admin',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  
  // Session duration (24 hours)
  SESSION_DURATION: 24 * 60 * 60 * 1000,
  
  // IP whitelist (optional - your practice IPs)
  ALLOWED_IPS: process.env.ADMIN_ALLOWED_IPS?.split(',') || [],
}

// Simple session management
interface AdminSession {
  authenticated: boolean
  expires: number
  ip?: string
}

const sessions = new Map<string, AdminSession>()

export function createAdminSession(ip?: string): string {
  const sessionId = Math.random().toString(36).substring(2, 15)
  const session: AdminSession = {
    authenticated: true,
    expires: Date.now() + ADMIN_CONFIG.SESSION_DURATION,
    ip
  }
  
  sessions.set(sessionId, session)
  return sessionId
}

export function validateAdminSession(sessionId: string, ip?: string): boolean {
  const session = sessions.get(sessionId)
  
  if (!session) return false
  if (session.expires < Date.now()) {
    sessions.delete(sessionId)
    return false
  }
  
  // IP validation (optional)
  if (ADMIN_CONFIG.ALLOWED_IPS.length > 0 && ip) {
    if (!ADMIN_CONFIG.ALLOWED_IPS.includes(ip) && session.ip !== ip) {
      return false
    }
  }
  
  return session.authenticated
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CONFIG.ADMIN_USERNAME && password === ADMIN_CONFIG.ADMIN_PASSWORD
}

// Keep backward compatibility
export function validateAdminPassword(password: string): boolean {
  return password === ADMIN_CONFIG.ADMIN_PASSWORD
}

// Middleware for admin routes
export function requireAdmin(password?: string, sessionId?: string, ip?: string): boolean {
  // Password authentication
  if (password) {
    return validateAdminPassword(password)
  }
  
  // Session authentication  
  if (sessionId) {
    return validateAdminSession(sessionId, ip)
  }
  
  return false
}

// Rate limiting for admin login attempts
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

export function checkLoginRateLimit(ip: string): boolean {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)
  
  if (!attempts) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }) // 15 min
    return true
  }
  
  if (now > attempts.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 })
    return true
  }
  
  if (attempts.count >= 5) {
    return false // Too many attempts
  }
  
  attempts.count++
  return true
}