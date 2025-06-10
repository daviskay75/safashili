import type { Metadata } from 'next'
import { ModalitePageTemplate } from '@/components/ModalitePageTemplate'
import { MODALITES_DETAIL, SITE_CONFIG } from '@/lib/constants'

const modaliteData = MODALITES_DETAIL['therapie-groupe']

export const metadata: Metadata = {
  title: `${modaliteData.title} | ${SITE_CONFIG.name}`,
  description: modaliteData.description,
  keywords: [
    'thérapie de groupe',
    'groupe thérapeutique',
    'soutien groupe psychologie',
    'thérapie collective Rosny-sous-Bois',
    'groupe femmes violence',
    'groupe gestion anxiété'
  ],
  openGraph: {
    title: `${modaliteData.title} - Safa Shili Psychologue`,
    description: modaliteData.description,
    type: 'website',
  },
}

export default function TherapieGroupePage() {
  return <ModalitePageTemplate modaliteData={modaliteData} />
}