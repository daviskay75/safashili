import type { Metadata } from 'next'
import { SpecialtyPageTemplate } from '@/components/SpecialtyPageTemplate'
import { SPECIALTIES_DETAIL, SITE_CONFIG } from '@/lib/constants'

const specialtyData = SPECIALTIES_DETAIL['violence-conjugale']

export const metadata: Metadata = {
  title: `${specialtyData.title} | ${SITE_CONFIG.name}`,
  description: specialtyData.description,
  keywords: [
    'violence conjugale',
    'violence familiale', 
    'psychologue violence conjugale',
    'aide violence domestique',
    'sortir violence conjugale',
    'Rosny-sous-Bois',
    'Seine-Saint-Denis'
  ],
  openGraph: {
    title: `${specialtyData.title} - Safa Shili Psychologue`,
    description: specialtyData.description,
    type: 'website',
  },
}

export default function ViolenceConjugalePage() {
  return <SpecialtyPageTemplate specialtyData={specialtyData} />
}