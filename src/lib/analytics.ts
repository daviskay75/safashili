// Google Analytics 4 setup with GDPR compliance for psychology practice

import { sendToAnalytics } from './performance'

// Types for GA4 events
export interface GAEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

export interface ConversionEvent {
  event_name: string
  parameters: {
    currency?: string
    value?: number
    custom_parameters?: Record<string, any>
  }
}

// GA4 Configuration
export const GA_CONFIG = {
  // Replace with actual GA4 Measurement ID in production
  MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  
  // GDPR compliant settings for healthcare
  PRIVACY_SETTINGS: {
    anonymize_ip: true,
    cookie_flags: 'secure;samesite=strict',
    ads_personalization: false,
    analytics_storage: 'denied', // Require explicit consent
    ad_storage: 'denied',
    wait_for_update: 500,
  },

  // Enhanced ecommerce settings for psychology practice
  ECOMMERCE_SETTINGS: {
    currency: 'EUR',
    send_page_view: false, // Manual page view tracking
  }
}

// Initialize Google Analytics 4
export function initGA4() {
  if (typeof window === 'undefined' || !GA_CONFIG.MEASUREMENT_ID.startsWith('G-')) {
    return
  }

  // Load gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_CONFIG.MEASUREMENT_ID}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  
  // Make gtag globally available
  ;(window as any).gtag = gtag

  gtag('js', new Date())
  
  // Configure GA4 with privacy settings
  gtag('config', GA_CONFIG.MEASUREMENT_ID, {
    ...GA_CONFIG.PRIVACY_SETTINGS,
    ...GA_CONFIG.ECOMMERCE_SETTINGS,
    custom_map: {
      // Custom dimensions for psychology practice
      'custom_parameter_1': 'specialty_type',
      'custom_parameter_2': 'consultation_type',
      'custom_parameter_3': 'patient_journey_stage'
    }
  })

  // Set default consent state (GDPR compliant)
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'wait_for_update': 500,
  })

  console.log('GA4 initialized with privacy-first settings')
}

// Track page views manually
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('config', GA_CONFIG.MEASUREMENT_ID, {
    page_title: title,
    page_location: url,
  })
}

// Track custom events
export function trackEvent({ action, category, label, value, custom_parameters }: GAEvent) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...custom_parameters,
  })
}

// Psychology practice specific events
export const PsychologyEvents = {
  // Contact form events
  contactFormStart: () => trackEvent({
    action: 'form_start',
    category: 'contact',
    label: 'contact_form'
  }),

  contactFormSubmit: (consultationType: string) => trackEvent({
    action: 'form_submit',
    category: 'contact',
    label: 'contact_form',
    custom_parameters: { consultation_type: consultationType }
  }),

  // Appointment booking events
  bookingStart: (specialty: string) => trackEvent({
    action: 'booking_start',
    category: 'appointment',
    label: specialty,
    custom_parameters: { specialty_type: specialty }
  }),

  bookingComplete: (specialty: string, consultationType: string) => trackEvent({
    action: 'booking_complete',
    category: 'appointment',
    label: specialty,
    custom_parameters: { 
      specialty_type: specialty,
      consultation_type: consultationType 
    }
  }),

  // Newsletter events
  newsletterSubscribe: () => trackEvent({
    action: 'subscribe',
    category: 'newsletter',
    label: 'psychology_newsletter'
  }),

  // Lead magnet downloads
  leadMagnetDownload: (guideName: string) => trackEvent({
    action: 'download',
    category: 'lead_magnet',
    label: guideName,
    custom_parameters: { guide_type: guideName }
  }),

  // Emergency contact clicks
  emergencyContactClick: (contactType: string) => trackEvent({
    action: 'emergency_contact',
    category: 'urgency',
    label: contactType,
    custom_parameters: { contact_type: contactType }
  }),

  // Specialty page engagement
  specialtyPageView: (specialty: string) => trackEvent({
    action: 'specialty_view',
    category: 'engagement',
    label: specialty,
    custom_parameters: { specialty_type: specialty }
  }),

  // Phone number clicks
  phoneClick: () => trackEvent({
    action: 'phone_click',
    category: 'contact',
    label: 'phone_number'
  }),

  // Pricing interactions
  pricingView: (serviceType: string, price: number) => trackEvent({
    action: 'pricing_view',
    category: 'pricing',
    label: serviceType,
    value: price,
    custom_parameters: { service_type: serviceType }
  })
}

// Conversion tracking for business goals
export function trackConversion({ event_name, parameters }: ConversionEvent) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', event_name, {
    currency: parameters.currency || 'EUR',
    value: parameters.value,
    ...parameters.custom_parameters,
  })
}

// Enhanced ecommerce for consultation bookings
export function trackConsultationPurchase(consultationData: {
  transaction_id: string
  specialty: string
  consultation_type: string
  price: number
}) {
  trackConversion({
    event_name: 'purchase',
    parameters: {
      currency: 'EUR',
      value: consultationData.price,
      custom_parameters: {
        transaction_id: consultationData.transaction_id,
        items: [{
          item_id: consultationData.specialty,
          item_name: `Consultation ${consultationData.specialty}`,
          item_category: 'psychology_consultation',
          item_variant: consultationData.consultation_type,
          price: consultationData.price,
          quantity: 1
        }]
      }
    }
  })
}

// GDPR Consent Management
export function updateConsent(consentSettings: {
  analytics: boolean
  marketing: boolean
}) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('consent', 'update', {
    'analytics_storage': consentSettings.analytics ? 'granted' : 'denied',
    'ad_storage': consentSettings.marketing ? 'granted' : 'denied',
  })

  // Log consent update
  trackEvent({
    action: 'consent_update',
    category: 'privacy',
    label: `analytics_${consentSettings.analytics ? 'granted' : 'denied'}_marketing_${consentSettings.marketing ? 'granted' : 'denied'}`
  })
}

// Enhanced Web Vitals integration
export function enhancedSendToAnalytics(metric: any) {
  // Send to our performance monitoring first
  sendToAnalytics(metric)

  // Also send to GA4 if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
}

// Audience segmentation helpers
export function setUserProperties(properties: {
  specialty_interest?: string
  consultation_preference?: string
  patient_type?: string
  geographic_area?: string
}) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('set', {
    user_properties: properties
  })
}

// Custom dimensions for psychology practice analytics
export const CustomDimensions = {
  SPECIALTY_TYPE: 'specialty_type',
  CONSULTATION_TYPE: 'consultation_type', 
  PATIENT_JOURNEY_STAGE: 'patient_journey_stage',
  REFERRAL_SOURCE: 'referral_source',
  GEOGRAPHIC_AREA: 'geographic_area'
}

// Debugging helper for development
export function debugGA4() {
  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Debug Info:', {
      measurementId: GA_CONFIG.MEASUREMENT_ID,
      dataLayer: window.dataLayer?.slice(-5), // Last 5 events
      gtagExists: typeof window.gtag !== 'undefined'
    })
  }
}