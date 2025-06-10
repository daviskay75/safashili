import type { Metadata } from 'next'
import { ModalitePageTemplate } from '@/components/ModalitePageTemplate'
import { MODALITES_DETAIL, SITE_CONFIG } from '@/lib/constants'

const modaliteData = MODALITES_DETAIL['consultation-cabinet']

export const metadata: Metadata = {
  title: `${modaliteData.title} | ${SITE_CONFIG.name}`,
  description: modaliteData.description,
  keywords: [
    'consultation cabinet psychologue',
    'rendez-vous psychologue Rosny-sous-Bois',
    'cabinet psychologie',
    'consultation présentiel',
    'psychologue Seine-Saint-Denis',
    'thérapie individuelle cabinet'
  ],
  openGraph: {
    title: `${modaliteData.title} - Safa Shili Psychologue`,
    description: modaliteData.description,
    type: 'website',
  },
}

export default function ConsultationCabinetPage() {
  return <ModalitePageTemplate modaliteData={modaliteData} />
}