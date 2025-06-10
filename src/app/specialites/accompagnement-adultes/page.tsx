import type { Metadata } from 'next'
import { SpecialtyPageTemplate } from '@/components/SpecialtyPageTemplate'
import { SPECIALTIES_DETAIL, SITE_CONFIG } from '@/lib/constants'

const specialtyData = SPECIALTIES_DETAIL['accompagnement-adultes']

export const metadata: Metadata = {
  title: `${specialtyData.title} | ${SITE_CONFIG.name}`,
  description: specialtyData.description,
  keywords: [
    'accompagnement adultes',
    'psychologue adulte',
    'thérapie adulte',
    'anxiété dépression',
    'consultation psychologique',
    'Rosny-sous-Bois',
    'Seine-Saint-Denis'
  ],
  openGraph: {
    title: `${specialtyData.title} - Safa Shili Psychologue`,
    description: specialtyData.description,
    type: 'website',
  },
}

export default function AccompagnementAdultesPage() {
  return <SpecialtyPageTemplate specialtyData={specialtyData} />
}