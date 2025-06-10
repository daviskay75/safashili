import type { Metadata } from 'next'
import { CityPageTemplate } from '@/components/CityPageTemplate'
import { CITIES, SITE_CONFIG } from '@/lib/constants'

const cityData = CITIES.find(city => city.slug === 'rosny-sous-bois')!

// Type assertion to fix TypeScript inference issue
const typedCityData = {
  ...cityData,
  transportDetails: cityData.transportDetails as unknown as Record<string, string>
}

export const metadata: Metadata = {
  title: `Psychologue Rosny-sous-Bois ${cityData.zipCode} | ${SITE_CONFIG.name}`,
  description: `${cityData.longDescription} Cabinet au centre médical de Rosny-sous-Bois, proche RER E.`,
  keywords: [
    'psychologue Rosny-sous-Bois',
    'psychologue 93110',
    'cabinet psychologie Rosny-sous-Bois',
    'violence conjugale Rosny-sous-Bois',
    'psychotraumatologie Rosny-sous-Bois',
    'thérapie Rosny-sous-Bois',
    'consultation psychologique 93110'
  ],
  openGraph: {
    title: `Psychologue à Rosny-sous-Bois - ${SITE_CONFIG.name}`,
    description: cityData.longDescription,
    type: 'website',
  },
}

export default function RosnySousBoisPage() {
  return <CityPageTemplate cityData={typedCityData} />
}