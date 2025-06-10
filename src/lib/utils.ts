import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine class names with Tailwind CSS merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('33')) {
    // Remove country code if present
    const national = cleaned.substring(2)
    return `0${national.substring(0, 1)} ${national.substring(1, 3)} ${national.substring(3, 5)} ${national.substring(5, 7)} ${national.substring(7, 9)}`
  }
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4, 6)} ${cleaned.substring(6, 8)} ${cleaned.substring(8, 10)}`
  }
  return phone
}

/**
 * Validate French phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(?:\+33|0)[1-9](?:[0-9]{8})$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Generate slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes
    .trim()
}

/**
 * Calculate reading time for article
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Format date for display (French format)
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format time for display
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  return `${hours}h${minutes}`
}

/**
 * Check if business is open at given time
 */
export function isBusinessOpen(date: Date = new Date()): boolean {
  const day = date.getDay() // 0 = Sunday, 1 = Monday, etc.
  const time = date.getHours() * 100 + date.getMinutes()
  
  // Sunday is closed
  if (day === 0) return false
  
  // Monday: 14:00-21:00
  if (day === 1) return time >= 1400 && time <= 2100
  
  // Tuesday-Friday: 11:00-13:00 and 14:00-21:00
  if (day >= 2 && day <= 5) {
    return (time >= 1100 && time <= 1300) || (time >= 1400 && time <= 2100)
  }
  
  // Saturday: 09:00-17:00
  if (day === 6) return time >= 900 && time <= 1700
  
  return false
}

/**
 * Get next available appointment slot
 */
export function getNextAvailableSlot(): Date {
  const now = new Date()
  const nextSlot = new Date(now)
  
  // If current time is late, start from next day
  if (now.getHours() >= 20) {
    nextSlot.setDate(nextSlot.getDate() + 1)
    nextSlot.setHours(11, 0, 0, 0)
  } else {
    // Round up to next hour
    nextSlot.setHours(nextSlot.getHours() + 1, 0, 0, 0)
  }
  
  // Find next business day/hour
  while (!isBusinessOpen(nextSlot)) {
    nextSlot.setHours(nextSlot.getHours() + 1)
    
    // If we go past business hours, jump to next day
    if (nextSlot.getHours() > 21) {
      nextSlot.setDate(nextSlot.getDate() + 1)
      nextSlot.setHours(11, 0, 0, 0)
    }
  }
  
  return nextSlot
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sanitize string for safe display
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
}

/**
 * Generate meta description from content
 */
export function generateMetaDescription(content: string, maxLength: number = 155): string {
  const cleaned = content
    .replace(/[#*_`]/g, '') // Remove markdown
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
  
  if (cleaned.length <= maxLength) return cleaned
  
  // Find last complete word before limit
  const truncated = cleaned.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  return truncated.substring(0, lastSpace) + '...'
}

/**
 * Get business hours for specific day
 */
export function getBusinessHours(dayName: string): string {
  const hours: Record<string, string> = {
    lundi: '14h00 - 21h00',
    mardi: '11h00 - 13h00, 14h00 - 21h00',
    mercredi: '11h00 - 13h00, 14h00 - 21h00',
    jeudi: '11h00 - 13h00, 14h00 - 21h00',
    vendredi: '11h00 - 13h00, 14h00 - 21h00',
    samedi: '09h00 - 17h00',
    dimanche: 'Fermé'
  }
  
  return hours[dayName.toLowerCase()] || 'Fermé'
}

/**
 * Generate structured data for local business
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Safa Shili - Psychologue',
    description: 'Cabinet de psychologie clinique spécialisé en violence conjugale, psychotraumatologie et accompagnement thérapeutique.',
    url: 'https://safa-shili-psychologue.fr',
    telephone: '06 51 68 74 30',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7 Rue du Quatrième Zouave',
      addressLocality: 'Rosny-sous-Bois',
      postalCode: '93110',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8736,
      longitude: 2.4836
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Monday',
        opens: '14:00',
        closes: '21:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '11:00',
        closes: '13:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '14:00',
        closes: '21:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00'
      }
    ]
  }
}