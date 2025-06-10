import type { Metadata } from 'next'
import { CityPageTemplate } from '@/components/CityPageTemplate'
import { CITIES, SITE_CONFIG } from '@/lib/constants'

const cityData = CITIES.find(city => city.slug === 'noisy-le-sec')!

// Type assertion to fix TypeScript inference issue
const typedCityData = {
  ...cityData,
  transportDetails: cityData.transportDetails as unknown as Record<string, string>
}

export const metadata: Metadata = {
  title: `Psychologue Noisy-le-Sec ${cityData.zipCode} | ${SITE_CONFIG.name}`,
  description: `${cityData.longDescription} Zone d'intervention prioritaire, très proche du cabinet.`,
  keywords: [
    'psychologue Noisy-le-Sec',
    'psychologue 93130',
    'violence conjugale Noisy-le-Sec',
    'thérapie groupe Noisy-le-Sec',
    'consultation cabinet Noisy-le-Sec',
    'consultation domicile Noisy-le-Sec',
    'psychologue femmes violences'
  ],
  openGraph: {
    title: `Psychologue à Noisy-le-Sec - ${SITE_CONFIG.name}`,
    description: cityData.longDescription,
    type: 'website',
  },
}

export default function NoisyLeSecPage() {
  return <CityPageTemplate cityData={typedCityData} />
}