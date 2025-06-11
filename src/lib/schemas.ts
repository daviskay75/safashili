import { z } from 'zod'

// Schema de validation pour le formulaire de contact
export const ContactSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().regex(
    /^(?:\+33|0)[1-9](?:[\s.-]?[0-9]){8}$/,
    'Numéro de téléphone invalide (format français requis)'
  ),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  consultationType: z.enum([
    'cabinet',
    'domicile', 
    'groupe',
    'distance'
  ], {
    errorMap: () => ({ message: 'Type de consultation invalide' })
  }),
  urgency: z.enum(['low', 'medium', 'high']).optional(),
  rgpdConsent: z.boolean().refine(
    val => val === true, 
    'Vous devez accepter les conditions de traitement des données personnelles'
  )
})

// Schema de validation pour l'inscription newsletter
export const NewsletterSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  interests: z.array(z.enum([
    'violence-conjugale',
    'psychotraumatologie', 
    'therapie-adolescents',
    'accompagnement-adultes',
    'souffrance-travail',
    'conseils-generaux'
  ])).optional(),
  marketingConsent: z.boolean().refine(
    val => val === true,
    'Vous devez accepter de recevoir nos communications'
  ),
  rgpdConsent: z.boolean().refine(
    val => val === true,
    'Vous devez accepter les conditions de traitement des données personnelles'
  )
})

// Schema de validation pour les téléchargements de lead magnets
export const LeadMagnetDownloadSchema = z.object({
  leadMagnetSlug: z.string().min(1, 'L\'identifiant du guide est requis'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').optional(),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().regex(
    /^(?:\+33|0)[1-9](?:[\s.-]?[0-9]){8}$/,
    'Numéro de téléphone invalide (format français requis)'
  ).optional(),
  source: z.string().min(1, 'La page source est requise'),
  subscribeToNewsletter: z.boolean().default(false),
  rgpdConsent: z.boolean().refine(
    val => val === true,
    'Vous devez accepter les conditions de traitement des données personnelles'
  )
})

// Schema de validation pour la prise de rendez-vous
export const BookingSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().regex(
    /^(?:\+33|0)[1-9](?:[\s.-]?[0-9]){8}$/,
    'Numéro de téléphone invalide'
  ),
  consultationType: z.enum([
    'cabinet',
    'domicile',
    'groupe', 
    'distance'
  ]),
  preferredDate: z.string().optional(),
  preferredTime: z.enum(['', 'morning', 'afternoon', 'evening', 'saturday']).optional(),
  duration: z.enum(['60', '90']),
  isFirstConsultation: z.boolean(),
  reasonForConsultation: z.string().min(20, 'Veuillez décrire brièvement le motif de consultation (min. 20 caractères)'),
  medicalHistory: z.string().optional(),
  emergencyContact: z.object({
    name: z.string().optional(),
    phone: z.string().optional()
  }).optional(),
  rgpdConsent: z.boolean().refine(
    val => val === true,
    'Vous devez accepter les conditions de traitement des données personnelles'
  )
})

// Schema de validation pour les lead magnets (téléchargements)
export const LeadMagnetSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  guideType: z.enum([
    'guide-violence-conjugale',
    'guide-psychotraumatisme', 
    'guide-adolescents',
    'guide-souffrance-travail',
    'autotest-bien-etre'
  ], {
    errorMap: () => ({ message: 'Type de guide invalide' })
  }),
  marketingConsent: z.boolean().default(false),
  rgpdConsent: z.boolean().refine(
    val => val === true,
    'Vous devez accepter les conditions de traitement des données personnelles'
  )
})

// Schema de validation pour les événements analytics
export const AnalyticsEventSchema = z.object({
  eventType: z.enum([
    'page_view',
    'form_start',
    'form_submit', 
    'form_abandon',
    'download_start',
    'download_complete',
    'booking_start',
    'booking_complete',
    'contact_submit',
    'newsletter_subscribe',
    'cta_click',
    'scroll_depth'
  ]),
  eventData: z.record(z.any()).optional(),
  page: z.string().min(1, 'Page requise'),
  sessionId: z.string().min(1, 'Session ID requis'),
  timestamp: z.number().optional(),
  userAgent: z.string().optional()
})

// Schema pour la désinscription newsletter
export const UnsubscribeSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  token: z.string().min(1, 'Token de désinscription requis'),
  reason: z.enum([
    'too_frequent',
    'not_relevant', 
    'found_solution',
    'other'
  ]).optional()
})

// Types TypeScript dérivés des schémas
export type ContactFormData = z.infer<typeof ContactSchema>
export type NewsletterFormData = z.infer<typeof NewsletterSchema>
export type BookingFormData = z.infer<typeof BookingSchema>
export type LeadMagnetFormData = z.infer<typeof LeadMagnetSchema>
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>
export type UnsubscribeData = z.infer<typeof UnsubscribeSchema>