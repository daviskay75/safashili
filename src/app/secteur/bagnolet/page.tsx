import type { Metadata } from 'next'
import { CityPageTemplate } from '@/components/CityPageTemplate'
import { CITIES, SITE_CONFIG } from '@/lib/constants'

const cityData = CITIES.find(city => city.slug === 'bagnolet')!

// Type assertion to fix TypeScript inference issue
const typedCityData = {
  ...cityData,
  transportDetails: cityData.transportDetails as unknown as Record<string, string>
}

export const metadata: Metadata = {
  title: `Psychologue Bagnolet ${cityData.zipCode} | ${SITE_CONFIG.name}`,
  description: `${cityData.longDescription} Proche de Paris, facilement accessible depuis Bagnolet.`,
  keywords: [
    'psychologue Bagnolet',
    'psychologue 93170',
    'consultation cabinet Bagnolet',
    'psychotraumatologie Bagnolet',
    'thérapie Bagnolet',
    'consultation psychologique Bagnolet',
    'psychologue près Paris'
  ],
  openGraph: {
    title: `Psychologue à Bagnolet - ${SITE_CONFIG.name}`,
    description: cityData.longDescription,
    type: 'website',
  },
}

export default function BagnoletPage() {
  return <CityPageTemplate cityData={typedCityData} />
}