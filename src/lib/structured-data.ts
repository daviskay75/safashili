import { SITE_CONFIG, CONTACT_INFO, SERVICES, CITIES } from './constants'

// Types pour les données structurées
type StructuredData = Record<string, any>

// Schema LocalBusiness pour le cabinet
export const localBusinessSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': `${SITE_CONFIG.url}/#medical-business`,
  name: SITE_CONFIG.name,
  alternateName: 'Cabinet Safa Shili',
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  telephone: CONTACT_INFO.phone,
  email: CONTACT_INFO.email,
  faxNumber: null,
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: ['cash', 'credit card', 'bank transfer'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT_INFO.address.street,
    addressLocality: CONTACT_INFO.address.city,
    postalCode: CONTACT_INFO.address.zipCode,
    addressRegion: 'Seine-Saint-Denis',
    addressCountry: 'FR'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: CONTACT_INFO.coordinates.lat,
    longitude: CONTACT_INFO.coordinates.lng
  },
  openingHours: [
    'Mo 14:00-21:00',
    'Tu 11:00-13:00,14:00-21:00', 
    'We 11:00-13:00,14:00-21:00',
    'Th 11:00-13:00,14:00-21:00',
    'Fr 11:00-13:00,14:00-21:00',
    'Sa 09:00-17:00'
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT_INFO.coordinates.lat,
      longitude: CONTACT_INFO.coordinates.lng
    },
    geoRadius: '20000' // 20km radius
  },
  hasMap: `https://www.google.com/maps/place/${CONTACT_INFO.coordinates.lat},${CONTACT_INFO.coordinates.lng}`,
  isAccessibleForFree: false,
  medicalSpecialty: [
    'Clinical Psychology',
    'Trauma Psychology', 
    'Family Therapy',
    'Domestic Violence Counseling'
  ],
  availableService: SERVICES.map(service => ({
    '@type': 'MedicalService',
    name: service.title,
    description: service.description,
    serviceType: 'Psychology',
    provider: {
      '@type': 'Person',
      name: SITE_CONFIG.author
    }
  }))
}

// Schema Person pour Safa Shili
export const personSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_CONFIG.url}/#person`,
  name: SITE_CONFIG.author,
  givenName: 'Safa',
  familyName: 'Shili',
  jobTitle: 'Psychologue Clinicienne',
  description: 'Psychologue clinicienne spécialisée en violence conjugale, psychotraumatologie et accompagnement thérapeutique des adolescents et adultes.',
  url: SITE_CONFIG.url,
  email: CONTACT_INFO.email,
  telephone: CONTACT_INFO.phone,
  workLocation: {
    '@type': 'Place',
    name: 'Cabinet Safa Shili',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address.street,
      addressLocality: CONTACT_INFO.address.city,
      postalCode: CONTACT_INFO.address.zipCode,
      addressRegion: 'Seine-Saint-Denis',
      addressCountry: 'FR'
    }
  },
  worksFor: {
    '@type': 'MedicalBusiness',
    name: SITE_CONFIG.name,
    '@id': `${SITE_CONFIG.url}/#medical-business`
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Psychologue',
    occupationLocation: {
      '@type': 'City',
      name: 'Rosny-sous-Bois'
    },
    skills: [
      'Psychologie clinique',
      'Psychotraumatologie', 
      'Violence conjugale',
      'Thérapie familiale',
      'Accompagnement adolescents',
      'Bilans psychologiques'
    ]
  },
  knowsAbout: [
    'Violence conjugale',
    'Psychotraumatologie',
    'Thérapie cognitive et comportementale',
    'Psychologie clinique',
    'Troubles anxieux',
    'Dépression',
    'Burn-out',
    'Harcèlement'
  ]
}

// Schema Organization pour le site web
export const organizationSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_CONFIG.url}/#organization`,
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  description: SITE_CONFIG.description,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT_INFO.phone,
    contactType: 'customer service',
    availableLanguage: ['French'],
    areaServed: 'FR'
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT_INFO.address.street,
    addressLocality: CONTACT_INFO.address.city,
    postalCode: CONTACT_INFO.address.zipCode,
    addressRegion: 'Seine-Saint-Denis',
    addressCountry: 'FR'
  },
  sameAs: [
    // Social media links when available
  ]
}

// Schema WebSite pour la recherche
export const websiteSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.url}/#website`,
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  publisher: {
    '@type': 'Person',
    name: SITE_CONFIG.author,
    '@id': `${SITE_CONFIG.url}/#person`
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_CONFIG.url}/recherche?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  },
  inLanguage: 'fr-FR'
}

// Schema Service pour chaque spécialité
export const getServiceSchema = (service: typeof SERVICES[0]): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalService',
  '@id': `${SITE_CONFIG.url}/specialites/${service.id}/#service`,
  name: service.title,
  description: service.description,
  serviceType: 'Psychology',
  category: 'Mental Health',
  provider: {
    '@type': 'Person',
    name: SITE_CONFIG.author,
    '@id': `${SITE_CONFIG.url}/#person`
  },
  areaServed: {
    '@type': 'City',
    name: 'Rosny-sous-Bois'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: service.title,
    itemListElement: [{
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description
      },
      price: service.price.toString(),
      priceCurrency: 'EUR',
      availability: 'InStock',
      validFrom: new Date().toISOString(),
      seller: {
        '@type': 'Person',
        name: SITE_CONFIG.author
      }
    }]
  }
})

// Schema FAQ pour les pages spécialités
export const getFAQSchema = (faqs: Array<{question: string, answer: string}>): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
})

// Schema LocalBusiness pour les pages villes
export const getCitySchema = (city: typeof CITIES[0]): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_CONFIG.url}/secteur/${city.slug}/#local-business`,
  name: `${SITE_CONFIG.name} - ${city.name}`,
  description: `Consultations psychologiques à ${city.name} (${city.zipCode}). ${city.description}`,
  url: `${SITE_CONFIG.url}/secteur/${city.slug}`,
  telephone: CONTACT_INFO.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: city.name,
    postalCode: city.zipCode,
    addressRegion: 'Seine-Saint-Denis',
    addressCountry: 'FR'
  },
  areaServed: {
    '@type': 'City',
    name: city.name
  },
  serviceArea: {
    '@type': 'City',
    name: city.name
  }
})

// Fonction utilitaire pour générer le JSON-LD
export const generateStructuredData = (schemas: StructuredData[]): string => {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 0)
}

// Export des schémas par défaut pour la page d'accueil
export const defaultSchemas = [
  localBusinessSchema,
  personSchema,
  organizationSchema,
  websiteSchema
]