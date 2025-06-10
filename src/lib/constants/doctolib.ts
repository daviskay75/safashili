// Doctolib configuration - Real data from Safa Shili's Doctolib profile
export const DOCTOLIB_CONFIG = {
  // Practitioner Information (extracted from real Doctolib profile)
  practitionerId: process.env.NEXT_PUBLIC_DOCTOLIB_PRACTITIONER_ID || '1109217',
  profileSlug: process.env.NEXT_PUBLIC_DOCTOLIB_PROFILE_SLUG || 'safa-shili',
  placeId: process.env.NEXT_PUBLIC_DOCTOLIB_PLACE_ID || '629716',
  rppsNumber: '10009036871',
  city: 'rosny-sous-bois',
  specialty: 'psychologue',
  
  // Widget configuration
  widget: {
    showHeader: false,
    showFooter: false,
    theme: 'custom',
    locale: 'fr',
    speciality: 'psychologue'
  },
  
  // Custom styling to match site design
  customCSS: `
    .doctolib-widget {
      border-radius: 0.5rem;
      box-shadow: none;
      border: 1px solid #e5e7eb;
    }
    
    .doctolib-widget .header {
      display: none !important;
    }
    
    .doctolib-widget .footer {
      display: none !important;
    }
    
    .doctolib-widget .calendar {
      font-family: 'Inter', sans-serif;
    }
    
    .doctolib-widget .available-slot {
      background-color: #3b82f6;
      border-color: #3b82f6;
      border-radius: 0.375rem;
    }
    
    .doctolib-widget .available-slot:hover {
      background-color: #2563eb;
      border-color: #2563eb;
    }
    
    .doctolib-widget .selected-slot {
      background-color: #059669;
      border-color: #059669;
    }
    
    .doctolib-widget .booking-form {
      background-color: #f9fafb;
      border-radius: 0.5rem;
      padding: 1rem;
    }
  `,
  
  // Booking flow configuration
  bookingFlow: {
    enableInstantBooking: true,
    requirePrePayment: false,
    allowCancellation: true,
    cancellationDeadline: 24, // hours
    confirmationMethod: 'email', // 'email' | 'sms' | 'both'
    reminderSettings: {
      enabled: true,
      reminderTimes: [24, 2], // hours before appointment
      methods: ['email', 'sms']
    }
  },
  
  // Consultation types mapping (real Doctolib pricing)
  consultationTypes: {
    'cabinet': {
      name: 'séances de psychologie',
      duration: 60,
      price: 60, // Real Doctolib price
      location: 'Centre médical'
    },
    'domicile': {
      name: 'Consultation à domicile : Personne âgée/ handicap',
      duration: 90,
      price: 125, // Average of 100-150€ range
      priceRange: { min: 100, max: 150 },
      location: 'À votre domicile'
    },
    'missed': {
      name: 'Rendez-vous non honorée ou déplacée moins de 48h avant',
      duration: 0,
      price: 60, // Cancellation fee
      location: 'Frais d\'annulation'
    }
  },
  
  // Availability settings (real Doctolib schedule)
  availability: {
    timezone: 'Europe/Paris',
    workingDays: [2, 3, 4], // Tuesday, Wednesday, Thursday (real schedule)
    workingHours: {
      monday: null, // Closed
      tuesday: { start: '11:00', end: '13:00', afternoon: '14:00', afternoonEnd: '21:00' },
      wednesday: { start: '10:00', end: '13:00', afternoon: '14:00', afternoonEnd: '20:00' },
      thursday: { start: '11:00', end: '13:00', afternoon: '14:00', afternoonEnd: '21:00' },
      friday: null, // Closed
      saturday: null, // Closed
      sunday: null // Closed
    },
    slotDuration: 60, // minutes
    bufferTime: 15, // minutes between appointments
    advanceBookingDays: 60, // how far in advance can patients book
    emergencySlots: {
      enabled: true,
      sameDay: true,
      maxPerDay: 2
    }
  },
  
  // Patient information requirements
  patientRequirements: {
    requiredFields: [
      'firstName',
      'lastName',
      'email',
      'phone',
      'birthDate',
      'consultationReason'
    ],
    optionalFields: [
      'address',
      'emergencyContact',
      'medicalHistory',
      'currentMedications',
      'referringDoctor'
    ],
    consentRequired: [
      'dataProcessing',
      'appointments',
      'reminders'
    ]
  }
}

// Environment validation
export const validateDoctoLibConfig = () => {
  const errors: string[] = []
  
  if (!process.env.NEXT_PUBLIC_DOCTOLIB_PRACTITIONER_ID) {
    errors.push('NEXT_PUBLIC_DOCTOLIB_PRACTITIONER_ID is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Helper functions for Doctolib integration
export const getDoctoLibUrl = (practitionerId: string = DOCTOLIB_CONFIG.practitionerId) => {
  return `https://widget.doctolib.fr/practitioners/${practitionerId}/booking`
}

// Real Safa Shili Doctolib booking URL
export const getSafaShiliBookingUrl = () => {
  return `https://www.doctolib.fr/psychologue/rosny-sous-bois/safa-shili/booking?bookingFunnelSource=profile`
}

// Generate Doctolib profile URL
export const getDoctoLibProfileUrl = () => {
  return `https://www.doctolib.fr/psychologue/rosny-sous-bois/safa-shili`
}

export const getConsultationTypeBySlug = (slug: string) => {
  return DOCTOLIB_CONFIG.consultationTypes[slug as keyof typeof DOCTOLIB_CONFIG.consultationTypes]
}

export const formatAvailabilityForDoctoLib = () => {
  // Convert our availability format to Doctolib's expected format
  return Object.entries(DOCTOLIB_CONFIG.availability.workingHours)
    .filter(([_, hours]) => hours !== null)
    .map(([day, hours]) => {
      if (!hours) return null
      return {
        day,
        slots: 'afternoon' in hours && hours.afternoon ? [
          { start: hours.start, end: hours.end },
          { start: hours.afternoon, end: hours.afternoonEnd }
        ] : [
          { start: hours.start, end: hours.end }
        ]
      }
    })
    .filter(Boolean)
}