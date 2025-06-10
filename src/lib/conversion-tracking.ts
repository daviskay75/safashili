// Conversion tracking and goals for psychology practice

import { trackEvent, trackConversion } from './analytics'
import { pushToDataLayer } from './tag-manager'

// Conversion goal definitions for psychology practice
export const CONVERSION_GOALS = {
  // Primary conversions (high value)
  APPOINTMENT_BOOKING: {
    name: 'appointment_booking',
    value: 60, // Average consultation price
    category: 'appointment',
    description: 'Patient books a consultation'
  },
  
  CONTACT_FORM_SUBMIT: {
    name: 'contact_form_submit', 
    value: 30, // Lead value
    category: 'lead',
    description: 'Patient submits contact form'
  },
  
  PHONE_CALL: {
    name: 'phone_call',
    value: 40, // High intent action
    category: 'contact',
    description: 'Patient calls practice'
  },
  
  // Secondary conversions (medium value)
  NEWSLETTER_SIGNUP: {
    name: 'newsletter_signup',
    value: 15,
    category: 'engagement',
    description: 'User subscribes to newsletter'
  },
  
  LEAD_MAGNET_DOWNLOAD: {
    name: 'lead_magnet_download',
    value: 10,
    category: 'content',
    description: 'User downloads psychology guide'
  },
  
  // Micro conversions (engagement indicators)
  SPECIALTY_PAGE_VIEW: {
    name: 'specialty_page_view',
    value: 5,
    category: 'engagement',
    description: 'User views specialty page'
  },
  
  FAQ_INTERACTION: {
    name: 'faq_interaction',
    value: 2,
    category: 'engagement', 
    description: 'User interacts with FAQ'
  },
  
  TIME_ON_SITE_5MIN: {
    name: 'time_on_site_5min',
    value: 3,
    category: 'engagement',
    description: 'User spends 5+ minutes on site'
  },
  
  // Crisis/emergency tracking (special category)
  EMERGENCY_CONTACT: {
    name: 'emergency_contact',
    value: 0, // No monetary value, but critical tracking
    category: 'emergency',
    description: 'User accesses emergency resources'
  }
}

// Conversion funnel stages for patient journey
export const PATIENT_JOURNEY_STAGES = {
  AWARENESS: 'awareness',
  CONSIDERATION: 'consideration', 
  INTENT: 'intent',
  BOOKING: 'booking',
  PATIENT: 'patient'
}

// Track conversion with multiple analytics platforms
export function trackConversionGoal(
  goalId: keyof typeof CONVERSION_GOALS,
  additionalData: Record<string, any> = {}
) {
  const goal = CONVERSION_GOALS[goalId]
  
  if (!goal) {
    console.warn(`Conversion goal not found: ${goalId}`)
    return
  }

  // Track in GA4
  trackConversion({
    event_name: goal.name,
    parameters: {
      currency: 'EUR',
      value: goal.value,
      custom_parameters: {
        conversion_category: goal.category,
        conversion_description: goal.description,
        ...additionalData
      }
    }
  })

  // Track in GTM Data Layer
  pushToDataLayer({
    event: 'conversion',
    conversion_name: goal.name,
    conversion_value: goal.value,
    conversion_category: goal.category,
    currency: 'EUR',
    ...additionalData
  })

  // Log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Conversion tracked:', {
      goal: goal.name,
      value: goal.value,
      category: goal.category,
      data: additionalData
    })
  }
}

// Psychology practice specific conversion helpers
export const PsychologyConversions = {
  // Appointment booking conversion
  appointmentBooked: (appointmentData: {
    specialty: string
    consultation_type: string
    appointment_date: string
    patient_type: 'new' | 'returning'
    source: string
  }) => {
    trackConversionGoal('APPOINTMENT_BOOKING', {
      specialty_type: appointmentData.specialty,
      consultation_type: appointmentData.consultation_type,
      appointment_date: appointmentData.appointment_date,
      patient_type: appointmentData.patient_type,
      booking_source: appointmentData.source,
      patient_journey_stage: PATIENT_JOURNEY_STAGES.BOOKING
    })
  },

  // Contact form submission
  contactFormSubmitted: (formData: {
    consultation_type: string
    specialty_interest: string
    urgency_level: 'low' | 'medium' | 'high'
    form_location: string
  }) => {
    trackConversionGoal('CONTACT_FORM_SUBMIT', {
      consultation_type: formData.consultation_type,
      specialty_interest: formData.specialty_interest,
      urgency_level: formData.urgency_level,
      form_location: formData.form_location,
      patient_journey_stage: PATIENT_JOURNEY_STAGES.INTENT
    })
  },

  // Phone call tracking
  phoneCallMade: (callData: {
    call_source: string
    call_type: 'appointment' | 'information' | 'emergency'
    specialty_context?: string
  }) => {
    trackConversionGoal('PHONE_CALL', {
      call_source: callData.call_source,
      call_type: callData.call_type,
      specialty_context: callData.specialty_context,
      patient_journey_stage: callData.call_type === 'appointment' ? 
        PATIENT_JOURNEY_STAGES.BOOKING : PATIENT_JOURNEY_STAGES.CONSIDERATION
    })
  },

  // Newsletter subscription
  newsletterSubscribed: (subscriptionData: {
    source_page: string
    lead_magnet?: string
    user_type: 'patient' | 'family' | 'professional'
  }) => {
    trackConversionGoal('NEWSLETTER_SIGNUP', {
      subscription_source: subscriptionData.source_page,
      lead_magnet: subscriptionData.lead_magnet,
      subscriber_type: subscriptionData.user_type,
      patient_journey_stage: PATIENT_JOURNEY_STAGES.CONSIDERATION
    })
  },

  // Lead magnet download
  leadMagnetDownloaded: (downloadData: {
    guide_name: string
    guide_category: string
    download_source: string
    user_email_provided: boolean
  }) => {
    trackConversionGoal('LEAD_MAGNET_DOWNLOAD', {
      guide_name: downloadData.guide_name,
      guide_category: downloadData.guide_category,
      download_source: downloadData.download_source,
      email_captured: downloadData.user_email_provided,
      patient_journey_stage: PATIENT_JOURNEY_STAGES.CONSIDERATION
    })
  },

  // Specialty page engagement
  specialtyPageViewed: (pageData: {
    specialty: string
    time_on_page: number
    scroll_depth: number
    source_page?: string
  }) => {
    trackConversionGoal('SPECIALTY_PAGE_VIEW', {
      specialty_type: pageData.specialty,
      time_on_page: pageData.time_on_page,
      scroll_depth_percentage: pageData.scroll_depth,
      source_page: pageData.source_page,
      patient_journey_stage: PATIENT_JOURNEY_STAGES.CONSIDERATION
    })
  },

  // Emergency contact access
  emergencyContactAccessed: (emergencyData: {
    emergency_type: string
    contact_method: string
    source_page: string
    time_of_day: 'business_hours' | 'after_hours'
  }) => {
    trackConversionGoal('EMERGENCY_CONTACT', {
      emergency_type: emergencyData.emergency_type,
      contact_method: emergencyData.contact_method,
      source_page: emergencyData.source_page,
      time_of_day: emergencyData.time_of_day,
      crisis_intervention: true,
      patient_journey_stage: 'crisis'
    })
  },

  // High engagement tracking
  highEngagement: (engagementData: {
    pages_viewed: number
    time_on_site: number
    interactions: number
    content_types_viewed: string[]
  }) => {
    if (engagementData.time_on_site >= 300000) { // 5 minutes
      trackConversionGoal('TIME_ON_SITE_5MIN', {
        pages_viewed: engagementData.pages_viewed,
        total_time_seconds: Math.round(engagementData.time_on_site / 1000),
        interaction_count: engagementData.interactions,
        content_types: engagementData.content_types_viewed.join(','),
        engagement_level: 'high',
        patient_journey_stage: PATIENT_JOURNEY_STAGES.CONSIDERATION
      })
    }
  }
}

// Conversion funnel tracking
export function trackFunnelStep(
  funnelName: string,
  stepName: string,
  stepData: Record<string, any> = {}
) {
  pushToDataLayer({
    event: 'funnel_step',
    funnel_name: funnelName,
    funnel_step: stepName,
    ...stepData
  })

  trackEvent({
    action: 'funnel_progress',
    category: funnelName,
    label: stepName,
    custom_parameters: stepData
  })
}

// Patient journey mapping
export const PatientJourneyFunnels = {
  // Appointment booking funnel
  appointmentFunnel: {
    step1: (data: { specialty: string }) => trackFunnelStep('appointment_booking', 'specialty_selected', data),
    step2: (data: { consultation_type: string }) => trackFunnelStep('appointment_booking', 'consultation_type_selected', data),
    step3: (data: { date_selected: string }) => trackFunnelStep('appointment_booking', 'date_selected', data),
    step4: (data: { contact_info: boolean }) => trackFunnelStep('appointment_booking', 'contact_info_provided', data),
    step5: (data: { booking_confirmed: boolean }) => trackFunnelStep('appointment_booking', 'booking_completed', data)
  },

  // Contact form funnel
  contactFunnel: {
    step1: () => trackFunnelStep('contact_form', 'form_started'),
    step2: (data: { contact_type: string }) => trackFunnelStep('contact_form', 'contact_type_selected', data),
    step3: (data: { message_length: number }) => trackFunnelStep('contact_form', 'message_written', data),
    step4: (data: { rgpd_accepted: boolean }) => trackFunnelStep('contact_form', 'privacy_accepted', data),
    step5: (data: { form_submitted: boolean }) => trackFunnelStep('contact_form', 'form_submitted', data)
  },

  // Information gathering funnel
  informationFunnel: {
    step1: (data: { entry_page: string }) => trackFunnelStep('information_gathering', 'site_entry', data),
    step2: (data: { specialty_viewed: string }) => trackFunnelStep('information_gathering', 'specialty_explored', data),
    step3: (data: { faq_viewed: boolean }) => trackFunnelStep('information_gathering', 'faq_consulted', data),
    step4: (data: { contact_info_viewed: boolean }) => trackFunnelStep('information_gathering', 'contact_info_viewed', data),
    step5: (data: { action_taken: string }) => trackFunnelStep('information_gathering', 'action_taken', data)
  }
}

// Conversion attribution tracking
export function setConversionAttribution(attributionData: {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
  landing_page: string
  session_id: string
}) {
  // Store attribution data for later conversion tracking
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('conversion_attribution', JSON.stringify({
      ...attributionData,
      timestamp: Date.now()
    }))
  }
}

// Get attribution data for conversions
export function getConversionAttribution(): Record<string, any> | null {
  if (typeof window === 'undefined') return null
  
  const stored = sessionStorage.getItem('conversion_attribution')
  return stored ? JSON.parse(stored) : null
}

// Enhanced conversion tracking with attribution
export function trackConversionWithAttribution(
  goalId: keyof typeof CONVERSION_GOALS,
  conversionData: Record<string, any> = {}
) {
  const attribution = getConversionAttribution()
  
  trackConversionGoal(goalId, {
    ...conversionData,
    ...attribution,
    conversion_timestamp: Date.now()
  })
}

// Debug conversion tracking
export function debugConversions() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Conversion Tracking Debug:', {
      goals: Object.keys(CONVERSION_GOALS),
      attribution: getConversionAttribution(),
      sessionData: {
        sessionStorage: sessionStorage.getItem('conversion_attribution'),
        dataLayer: window.dataLayer?.filter(item => item.event === 'conversion').slice(-3)
      }
    })
  }
}