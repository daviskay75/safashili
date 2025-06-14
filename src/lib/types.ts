// Types partagés pour l'application Safa Shili Psychologue

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  consultationType: 'cabinet' | 'domicile' | 'groupe' | 'distance'
  rgpdConsent: boolean
}

export interface NewsletterData {
  email: string
  firstName: string
  consentement: boolean
}

export interface BookingData {
  type: 'consultation' | 'domicile' | 'groupe' | 'premiere'
  date: string
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message?: string
}

export interface LeadMagnetData {
  email: string
  firstName: string
  guide: 'violence-conjugale' | 'signes-consulter' | 'gerer-anxiete'
}

// New enhanced lead magnet types
export interface LeadMagnetDownloadData {
  leadMagnetSlug: string
  firstName: string
  lastName?: string
  email: string
  phone?: string
  source: string
  subscribeToNewsletter?: boolean
  rgpdConsent: boolean
}

export interface LeadMagnet {
  slug: string
  title: string
  fileName: string
  filePath: string
  category: 'violence' | 'anxiety' | 'consultation' | 'general'
  description: string
  targetAudience: string
  isActive: boolean
}

export interface EmailSequence {
  slug: string
  name: string
  category: string
  triggerType: string
  triggerValue?: string
  isActive: boolean
  totalEmails: number
}

export interface EmailTemplate {
  emailNumber: number
  subject: string
  htmlContent: string
  textContent: string
  delayDays: number
  isActive: boolean
}

export interface Specialty {
  id: string
  title: string
  description: string
  slug: string
  icon: string
  features: string[]
  process: string[]
  faqs: FAQ[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface Testimonial {
  id: string
  name: string
  initials: string
  location: string
  specialty: string
  text: string
  rating: number
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  publishedAt: string
  readingTime: number
  author: string
  seoTitle?: string
  seoDescription?: string
}

export interface City {
  name: string
  slug: string
  zipCode: string
  transport: string[]
  description: string
  services: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  duration: number
  price: number
  type: 'individual' | 'couple' | 'group' | 'online'
}