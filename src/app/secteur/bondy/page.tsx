import type { Metadata } from 'next'
import { CityPageTemplate } from '@/components/CityPageTemplate'
import { CITIES, SITE_CONFIG } from '@/lib/constants'

const cityData = CITIES.find(city => city.slug === 'bondy')!

// Type assertion to fix TypeScript inference issue
const typedCityData = {
  ...cityData,
  transportDetails: cityData.transportDetails as unknown as Record<string, string>
}

export const metadata: Metadata = {
  title: `Psychologue Bondy ${cityData.zipCode} | ${SITE_CONFIG.name}`,
  description: `${cityData.longDescription} Consultations à domicile privilégiées pour les résidents de Bondy.`,
  keywords: [
    'psychologue Bondy',
    'psychologue 93140',
    'consultation domicile Bondy',
    'suivi distance Bondy',
    'burn-out psychologue Bondy',
    'thérapie adulte Bondy',
    'consultation psychologique Bondy'
  ],
  openGraph: {
    title: `Psychologue à Bondy - ${SITE_CONFIG.name}`,
    description: cityData.longDescription,
    type: 'website',
  },
}

export default function BondyPage() {
  return <CityPageTemplate cityData={typedCityData} />
}