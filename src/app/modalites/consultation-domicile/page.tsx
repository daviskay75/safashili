import type { Metadata } from 'next'
import { ModalitePageTemplate } from '@/components/ModalitePageTemplate'
import { MODALITES_DETAIL, SITE_CONFIG } from '@/lib/constants'

const modaliteData = MODALITES_DETAIL['consultation-domicile']

export const metadata: Metadata = {
  title: `${modaliteData.title} | ${SITE_CONFIG.name}`,
  description: modaliteData.description,
  keywords: [
    'consultation psychologue domicile',
    'psychologue à domicile Rosny-sous-Bois',
    'thérapie familiale domicile',
    'consultation domicile Seine-Saint-Denis',
    'psychologue déplacement domicile',
    'thérapie à domicile'
  ],
  openGraph: {
    title: `${modaliteData.title} - Safa Shili Psychologue`,
    description: modaliteData.description,
    type: 'website',
  },
}

export default function ConsultationDomicilePage() {
  return <ModalitePageTemplate modaliteData={modaliteData} />
}