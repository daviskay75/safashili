import type { Metadata } from 'next'
import { SpecialtyPageTemplate } from '@/components/SpecialtyPageTemplate'
import { SPECIALTIES_DETAIL, SITE_CONFIG } from '@/lib/constants'

const specialtyData = SPECIALTIES_DETAIL['souffrance-travail']

export const metadata: Metadata = {
  title: `${specialtyData.title} | ${SITE_CONFIG.name}`,
  description: specialtyData.description,
  keywords: [
    'souffrance au travail',
    'burn-out',
    'harcèlement professionnel',
    'stress professionnel',
    'psychologue travail',
    'Rosny-sous-Bois',
    'Seine-Saint-Denis'
  ],
  openGraph: {
    title: `${specialtyData.title} - Safa Shili Psychologue`,
    description: specialtyData.description,
    type: 'website',
  },
}

export default function SouffranceTravailPage() {
  return <SpecialtyPageTemplate specialtyData={specialtyData} />
}