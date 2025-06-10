import type { Metadata } from 'next'
import { SpecialtyPageTemplate } from '@/components/SpecialtyPageTemplate'
import { SPECIALTIES_DETAIL, SITE_CONFIG } from '@/lib/constants'

const specialtyData = SPECIALTIES_DETAIL['therapie-adolescents']

export const metadata: Metadata = {
  title: `${specialtyData.title} | ${SITE_CONFIG.name}`,
  description: specialtyData.description,
  keywords: [
    'thérapie adolescents',
    'psychologue adolescent',
    'consultation adolescent',
    'soutien psychologique jeunes',
    'problèmes comportement adolescent',
    'Rosny-sous-Bois',
    'Seine-Saint-Denis'
  ],
  openGraph: {
    title: `${specialtyData.title} - Safa Shili Psychologue`,
    description: specialtyData.description,
    type: 'website',
  },
}

export default function TherapieAdolescentsPage() {
  return <SpecialtyPageTemplate specialtyData={specialtyData} />
}