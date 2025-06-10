import type { Metadata } from 'next'
import { SpecialtyPageTemplate } from '@/components/SpecialtyPageTemplate'
import { SPECIALTIES_DETAIL, SITE_CONFIG } from '@/lib/constants'

const specialtyData = SPECIALTIES_DETAIL['psychotraumatologie']

export const metadata: Metadata = {
  title: `${specialtyData.title} | ${SITE_CONFIG.name}`,
  description: specialtyData.description,
  keywords: [
    'psychotraumatologie',
    'traumatisme psychologique',
    'stress post-traumatique',
    'EMDR',
    'thérapie traumatisme',
    'Rosny-sous-Bois',
    'Seine-Saint-Denis'
  ],
  openGraph: {
    title: `${specialtyData.title} - Safa Shili Psychologue`,
    description: specialtyData.description,
    type: 'website',
  },
}

export default function PsychotraumatologiePage() {
  return <SpecialtyPageTemplate specialtyData={specialtyData} />
}