// Google Tag Manager setup with custom data layer for psychology practice

// GTM Configuration
export const GTM_CONFIG = {
  // Replace with actual GTM Container ID in production
  CONTAINER_ID: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || 'GTM-XXXXXXX',
  
  // Custom data layer events for psychology practice
  EVENTS: {
    // Page and navigation events
    PAGE_VIEW: 'page_view',
    VIRTUAL_PAGE_VIEW: 'virtual_page_view',
    
    // User interaction events
    FORM_START: 'form_start',
    FORM_SUBMIT: 'form_submit',
    FORM_ABANDON: 'form_abandon',
    
    // Business-specific events
    APPOINTMENT_BOOKING_START: 'appointment_booking_start',
    APPOINTMENT_BOOKING_COMPLETE: 'appointment_booking_complete',
    CONTACT_FORM_SUBMIT: 'contact_form_submit',
    PHONE_CLICK: 'phone_click',
    EMERGENCY_CONTACT: 'emergency_contact',
    
    // Content engagement
    SPECIALTY_PAGE_VIEW: 'specialty_page_view',
    TESTIMONIAL_VIEW: 'testimonial_view',
    FAQ_EXPAND: 'faq_expand',
    
    // Lead generation
    NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',
    LEAD_MAGNET_DOWNLOAD: 'lead_magnet_download',
    
    // E-commerce style events for consultations
    VIEW_CONSULTATION: 'view_consultation',
    ADD_TO_CART: 'add_to_cart', // For booking flow
    PURCHASE: 'purchase', // For completed bookings
    
    // User journey tracking
    USER_ENGAGEMENT: 'user_engagement',
    SCROLL_DEPTH: 'scroll_depth',
    TIME_ON_PAGE: 'time_on_page',
  }
}

// Initialize Google Tag Manager
export function initGTM() {
  if (typeof window === 'undefined' || !GTM_CONFIG.CONTAINER_ID.startsWith('GTM-')) {
    console.log('GTM not initialized: Invalid container ID')
    return
  }

  // Initialize data layer
  window.dataLayer = window.dataLayer || []
  
  // Push GTM initialization
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  })

  // Load GTM script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONFIG.CONTAINER_ID}`
  document.head.appendChild(script)

  // Load GTM noscript fallback
  const noscript = document.createElement('noscript')
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_CONFIG.CONTAINER_ID}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  noscript.appendChild(iframe)
  document.body.insertBefore(noscript, document.body.firstChild)

  console.log('GTM initialized:', GTM_CONFIG.CONTAINER_ID)
}

// Enhanced data layer push function
export function pushToDataLayer(data: Record<string, any>) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)
  
  if (process.env.NODE_ENV === 'development') {
    console.log('DataLayer push:', data)
  }
}

// Psychology practice specific data layer events
export const PsychologyDataLayerEvents = {
  // Enhanced page view with practice context
  pageView: (pageData: {
    page_title: string
    page_location: string
    page_path: string
    content_group1?: string // e.g., 'specialty', 'about', 'contact'
    content_group2?: string // e.g., 'violence-conjugale', 'psychotraumatologie'
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.PAGE_VIEW,
      ...pageData,
      user_properties: {
        practice_type: 'psychology',
        specialization: 'violence_trauma'
      }
    })
  },

  // Contact form interactions
  contactFormStart: (formData: {
    form_name: string
    form_location: string
    consultation_type?: string
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.FORM_START,
      form_name: formData.form_name,
      form_location: formData.form_location,
      consultation_type: formData.consultation_type,
      timestamp: Date.now()
    })
  },

  contactFormSubmit: (formData: {
    form_name: string
    consultation_type: string
    specialty_interest: string
    form_location: string
    success: boolean
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.CONTACT_FORM_SUBMIT,
      ...formData,
      conversion_value: 1, // Lead value
      currency: 'EUR'
    })
  },

  // Appointment booking flow
  appointmentBookingStart: (bookingData: {
    specialty: string
    consultation_type: string
    source_page: string
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.APPOINTMENT_BOOKING_START,
      specialty_type: bookingData.specialty,
      consultation_type: bookingData.consultation_type,
      source_page: bookingData.source_page,
      booking_step: 1,
      funnel_name: 'appointment_booking'
    })
  },

  appointmentBookingComplete: (bookingData: {
    transaction_id: string
    specialty: string
    consultation_type: string
    price: number
    appointment_date: string
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.PURCHASE,
      transaction_id: bookingData.transaction_id,
      value: bookingData.price,
      currency: 'EUR',
      items: [{
        item_id: bookingData.specialty,
        item_name: `Consultation ${bookingData.specialty}`,
        item_category: 'psychology_consultation',
        item_variant: bookingData.consultation_type,
        price: bookingData.price,
        quantity: 1
      }],
      appointment_date: bookingData.appointment_date,
      booking_complete: true
    })
  },

  // User engagement tracking
  specialtyPageView: (specialtyData: {
    specialty_name: string
    specialty_id: string
    content_type: 'specialty_page'
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.SPECIALTY_PAGE_VIEW,
      specialty_name: specialtyData.specialty_name,
      specialty_id: specialtyData.specialty_id,
      content_type: specialtyData.content_type,
      engagement_type: 'specialty_interest'
    })
  },

  // Phone and contact interactions
  phoneClick: (phoneData: {
    phone_number: string
    click_location: string
    call_type: 'appointment' | 'information' | 'emergency'
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.PHONE_CLICK,
      phone_number: phoneData.phone_number,
      click_location: phoneData.click_location,
      call_type: phoneData.call_type,
      conversion_value: phoneData.call_type === 'appointment' ? 50 : 10
    })
  },

  // Emergency contact tracking (important for psychology practice)
  emergencyContactClick: (emergencyData: {
    emergency_type: string
    contact_number: string
    source_page: string
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.EMERGENCY_CONTACT,
      emergency_type: emergencyData.emergency_type,
      contact_number: emergencyData.contact_number,
      source_page: emergencyData.source_page,
      urgency_level: 'high',
      crisis_intervention: true
    })
  },

  // Newsletter and lead magnets
  newsletterSubscribe: (subscriptionData: {
    subscription_source: string
    lead_magnet?: string
    user_type: 'patient' | 'professional' | 'family'
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.NEWSLETTER_SUBSCRIBE,
      subscription_source: subscriptionData.subscription_source,
      lead_magnet: subscriptionData.lead_magnet,
      user_type: subscriptionData.user_type,
      conversion_value: 25
    })
  },

  leadMagnetDownload: (downloadData: {
    guide_name: string
    guide_category: string
    download_source: string
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.LEAD_MAGNET_DOWNLOAD,
      guide_name: downloadData.guide_name,
      guide_category: downloadData.guide_category,
      download_source: downloadData.download_source,
      content_type: 'lead_magnet',
      conversion_value: 15
    })
  },

  // User engagement metrics
  scrollDepth: (scrollData: {
    page_path: string
    scroll_percentage: number
    content_type: string
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.SCROLL_DEPTH,
      page_path: scrollData.page_path,
      scroll_percentage: scrollData.scroll_percentage,
      content_type: scrollData.content_type,
      engagement_level: scrollData.scroll_percentage > 75 ? 'high' : scrollData.scroll_percentage > 50 ? 'medium' : 'low'
    })
  },

  // FAQ interactions
  faqExpand: (faqData: {
    question: string
    answer_category: string
    page_location: string
  }) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.FAQ_EXPAND,
      faq_question: faqData.question,
      answer_category: faqData.answer_category,
      page_location: faqData.page_location,
      content_type: 'faq',
      engagement_type: 'question_interest'
    })
  }
}

// Enhanced e-commerce tracking for consultation bookings
export function trackConsultationView(consultationData: {
  specialty: string
  consultation_type: string
  price: number
  availability: boolean
}) {
  pushToDataLayer({
    event: GTM_CONFIG.EVENTS.VIEW_CONSULTATION,
    currency: 'EUR',
    value: consultationData.price,
    items: [{
      item_id: consultationData.specialty,
      item_name: `Consultation ${consultationData.specialty}`,
      item_category: 'psychology_consultation',
      item_variant: consultationData.consultation_type,
      price: consultationData.price,
      quantity: 1
    }],
    consultation_available: consultationData.availability
  })
}

// Custom triggers setup for GTM
export const GTM_TRIGGERS = {
  // Form interaction triggers
  FORM_START: 'form_interaction_start',
  FORM_COMPLETION: 'form_completion',
  FORM_ERROR: 'form_validation_error',
  
  // Engagement triggers
  TIME_ON_PAGE_30S: 'time_on_page_30_seconds',
  TIME_ON_PAGE_60S: 'time_on_page_60_seconds', 
  SCROLL_25: 'scroll_25_percent',
  SCROLL_50: 'scroll_50_percent',
  SCROLL_75: 'scroll_75_percent',
  SCROLL_100: 'scroll_100_percent',
  
  // Business triggers
  HIGH_INTENT_PAGE_VIEW: 'high_intent_page_view', // Contact, booking pages
  SPECIALTY_INTEREST: 'specialty_interest_shown',
  PRICE_INTERACTION: 'pricing_information_viewed',
  
  // Crisis/emergency triggers (important for psychology)
  EMERGENCY_CONTACT_VIEWED: 'emergency_contact_information_viewed',
  CRISIS_RESOURCE_ACCESSED: 'crisis_resource_accessed'
}

// Debug helper for GTM
export function debugGTM() {
  if (process.env.NODE_ENV === 'development') {
    console.log('GTM Debug Info:', {
      containerId: GTM_CONFIG.CONTAINER_ID,
      dataLayerSize: window.dataLayer?.length || 0,
      recentEvents: window.dataLayer?.slice(-3) || [],
      gtmLoaded: !!(window as any).google_tag_manager
    })
  }
}