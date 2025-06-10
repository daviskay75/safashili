/**
 * SEO Tests - Structured Data
 * Tests for Schema.org structured data implementation
 */

import { localBusinessSchema, personSchema, getServiceSchema } from '@/lib/structured-data'

describe('Structured Data Schemas', () => {
  describe('LocalBusiness Schema', () => {
    test('should have valid LocalBusiness structure', () => {
      expect(localBusinessSchema['@context']).toBe('https://schema.org')
      expect(localBusinessSchema['@type']).toBe('MedicalBusiness')
      expect(localBusinessSchema.name).toContain('Safa Shili')
      expect(localBusinessSchema.telephone).toBe('06 51 68 74 30')
    })

    test('should have valid address information', () => {
      const address = localBusinessSchema.address
      expect(address['@type']).toBe('PostalAddress')
      expect(address.streetAddress).toBe('7 Rue du Quatrième Zouave')
      expect(address.addressLocality).toBe('Rosny-sous-Bois')
      expect(address.postalCode).toBe('93110')
      expect(address.addressCountry).toBe('FR')
    })

    test('should have geo coordinates', () => {
      const geo = localBusinessSchema.geo
      expect(geo['@type']).toBe('GeoCoordinates')
      expect(typeof geo.latitude).toBe('number')
      expect(typeof geo.longitude).toBe('number')
      expect(geo.latitude).toBeCloseTo(48.8736, 3)
      expect(geo.longitude).toBeCloseTo(2.4836, 3)
    })

    test('should have medical specialties', () => {
      const specialties = localBusinessSchema.medicalSpecialty
      expect(Array.isArray(specialties)).toBe(true)
      expect(specialties).toContain('Clinical Psychology')
      expect(specialties).toContain('Trauma Therapy')
      expect(specialties).toContain('Family Violence Counseling')
    })

    test('should have opening hours', () => {
      const hours = localBusinessSchema.openingHoursSpecification
      expect(Array.isArray(hours)).toBe(true)
      expect(hours.length).toBeGreaterThan(0)
      
      const mondayHours = hours.find((h: any) => 
        Array.isArray(h.dayOfWeek) ? h.dayOfWeek.includes('Monday') : h.dayOfWeek === 'Monday'
      )
      expect(mondayHours).toBeDefined()
      expect(mondayHours.opens).toBe('09:00')
      expect(mondayHours.closes).toBe('19:00')
    })
  })

  describe('Person Schema', () => {
    test('should have valid Person structure', () => {
      expect(personSchema['@context']).toBe('https://schema.org')
      expect(personSchema['@type']).toBe('Person')
      expect(personSchema.name).toBe('Safa Shili')
      expect(personSchema.givenName).toBe('Safa')
      expect(personSchema.familyName).toBe('Shili')
      expect(personSchema.jobTitle).toBe('Psychologue Clinicienne')
    })

    test('should have credentials', () => {
      const credentials = personSchema.hasCredential
      expect(Array.isArray(credentials)).toBe(true)
      expect(credentials.length).toBeGreaterThan(0)
      
      const masterCredential = credentials.find((c: any) => 
        c.name.includes('Master')
      )
      expect(masterCredential).toBeDefined()
      expect(masterCredential['@type']).toBe('EducationalOccupationalCredential')
    })

    test('should have areas of expertise', () => {
      const expertise = personSchema.knowsAbout
      expect(Array.isArray(expertise)).toBe(true)
      expect(expertise).toContain('Violence conjugale')
      expect(expertise).toContain('Psychotraumatologie')
      expect(expertise).toContain('EMDR')
    })
  })

  describe('Service Schema', () => {
    test('should generate valid service schema', () => {
      const violenceServiceSchema = getServiceSchema('violence-conjugale')
      
      expect(violenceServiceSchema['@type']).toBe('MedicalTherapy')
      expect(violenceServiceSchema.name).toContain('Violence')
      expect(violenceServiceSchema.provider['@id']).toBe('https://safa-shili-psychologue.fr/#organization')
    })

    test('should include service area', () => {
      const traumaServiceSchema = getServiceSchema('psychotraumatologie')
      
      expect(traumaServiceSchema.areaServed).toBeDefined()
      expect(Array.isArray(traumaServiceSchema.areaServed)).toBe(true)
      
      const rosnyArea = traumaServiceSchema.areaServed.find((area: any) => 
        area.name === 'Rosny-sous-Bois'
      )
      expect(rosnyArea).toBeDefined()
      expect(rosnyArea['@type']).toBe('City')
    })
  })

  describe('Schema Validation', () => {
    test('all schemas should have required @context and @type', () => {
      const schemas = [localBusinessSchema, personSchema]
      
      schemas.forEach(schema => {
        expect(schema['@context']).toBe('https://schema.org')
        expect(schema['@type']).toBeDefined()
        expect(typeof schema['@type']).toBe('string')
      })
    })

    test('should not have circular references', () => {
      const stringify = () => JSON.stringify(localBusinessSchema)
      expect(stringify).not.toThrow()
      
      const stringifyPerson = () => JSON.stringify(personSchema)
      expect(stringifyPerson).not.toThrow()
    })

    test('should have valid URLs', () => {
      const urlPattern = /^https?:\/\/.+/
      
      expect(localBusinessSchema.url).toMatch(urlPattern)
      
      if (localBusinessSchema.image) {
        expect(localBusinessSchema.image).toMatch(urlPattern)
      }
    })
  })
})