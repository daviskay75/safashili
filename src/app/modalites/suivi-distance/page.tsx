import type { Metadata } from 'next'
import { ModalitePageTemplate } from '@/components/ModalitePageTemplate'
import { MODALITES_DETAIL, SITE_CONFIG } from '@/lib/constants'

const modaliteData = MODALITES_DETAIL['suivi-distance']

export const metadata: Metadata = {
  title: `${modaliteData.title} | ${SITE_CONFIG.name}`,
  description: modaliteData.description,
  keywords: [
    'consultation psychologue distance',
    'visioconférence psychologie',
    'téléconsultation psychologue',
    'thérapie en ligne',
    'consultation vidéo psychologue',
    'suivi psychologique distance'
  ],
  openGraph: {
    title: `${modaliteData.title} - Safa Shili Psychologue`,
    description: modaliteData.description,
    type: 'website',
  },
}

export default function SuiviDistancePage() {
  return <ModalitePageTemplate modaliteData={modaliteData} />
}