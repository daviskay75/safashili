import type { Metadata } from 'next'
import { CityPageTemplate } from '@/components/CityPageTemplate'
import { CITIES, SITE_CONFIG } from '@/lib/constants'

const cityData = CITIES.find(city => city.slug === 'montreuil')!

// Type assertion to fix TypeScript inference issue
const typedCityData = {
  ...cityData,
  transportDetails: cityData.transportDetails as unknown as Record<string, string>
}

export const metadata: Metadata = {
  title: `Psychologue Montreuil ${cityData.zipCode} | ${SITE_CONFIG.name}`,
  description: `${cityData.longDescription} Consultations à domicile et au cabinet pour les habitants de Montreuil.`,
  keywords: [
    'psychologue Montreuil',
    'psychologue 93100',
    'consultation domicile Montreuil',
    'thérapie famille Montreuil',
    'violence conjugale Montreuil',
    'psychologue adolescent Montreuil',
    'consultation psychologique Montreuil'
  ],
  openGraph: {
    title: `Psychologue à Montreuil - ${SITE_CONFIG.name}`,
    description: cityData.longDescription,
    type: 'website',
  },
}

export default function MontreuilPage() {
  return <CityPageTemplate cityData={typedCityData} />
}