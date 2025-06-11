'use client'

import React from 'react'
import Link from 'next/link'
import { 
  DocumentArrowDownIcon, 
  ShieldCheckIcon, 
  HeartIcon, 
  ClipboardDocumentCheckIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline'
import { Button, Card, CardContent, Heading } from '@/components/ui'
import { trackEvent } from '@/lib/analytics'

interface LeadMagnetSidebarProps {
  variant?: 'violence' | 'anxiety' | 'consultation' | 'all'
  className?: string
  compact?: boolean
}

const LEAD_MAGNETS = {
  violence: {
    slug: 'sortir-violence-conjugale',
    title: 'Guide Violence Conjugale',
    subtitle: 'Sortir de la violence',
    description: '12 pages de ressources concrètes pour vous accompagner vers la sortie de violence.',
    icon: ShieldCheckIcon,
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    benefits: ['Plan de sortie sécurisé', 'Démarches légales', 'Ressources d\'aide']
  },
  anxiety: {
    slug: 'gerer-anxiete-quotidien',
    title: 'Guide Anxiété',
    subtitle: 'Techniques pratiques',
    description: '8 pages de techniques concrètes pour gérer votre anxiété au quotidien.',
    icon: HeartIcon,
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    benefits: ['Respiration d\'urgence', 'Relaxation', 'Programme quotidien']
  },
  consultation: {
    slug: '10-signes-consultation',
    title: 'Checklist Consultation',
    subtitle: '10 signes à identifier',
    description: 'Checklist pour identifier si un accompagnement psychologique vous serait bénéfique.',
    icon: ClipboardDocumentCheckIcon,
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    benefits: ['Auto-évaluation', 'Signaux d\'alarme', 'Types d\'accompagnement']
  }
}

export function LeadMagnetSidebar({ variant = 'consultation', className = '', compact = false }: LeadMagnetSidebarProps) {
  
  const handleLeadMagnetClick = (slug: string) => {
    trackEvent({
      action: 'sidebar_lead_magnet_click',
      category: 'lead_generation',
      label: slug,
      custom_parameters: { source: 'sidebar', variant }
    })
  }

  if (variant === 'all') {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <DocumentArrowDownIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <Heading as="h3" variant="card" className="text-gray-900 mb-2">
                Ressources Gratuites
              </Heading>
              <p className="text-sm text-gray-600">
                Guides professionnels pour votre bien-être
              </p>
            </div>

            <div className="space-y-3">
              {Object.entries(LEAD_MAGNETS).map(([key, magnet]) => (
                <Link 
                  key={key}
                  href={`/ressources/${magnet.slug}`}
                  onClick={() => handleLeadMagnetClick(magnet.slug)}
                  className="block"
                >
                  <div className="bg-white rounded-lg p-3 border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all">
                    <div className="flex items-center">
                      <magnet.icon className={`h-5 w-5 ${magnet.iconColor} mr-3 flex-shrink-0`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{magnet.title}</h4>
                        <p className="text-xs text-gray-600">{magnet.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-purple-200">
              <Link href="/ressources">
                <Button variant="outline" size="sm" className="w-full text-purple-600 border-purple-300 hover:bg-purple-50">
                  Voir tous les guides
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const magnet = LEAD_MAGNETS[variant]
  
  return (
    <div className={className}>
      <Card className={`${magnet.bgColor} ${magnet.borderColor} border-2`}>
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm`}>
              <magnet.icon className={`h-6 w-6 ${magnet.iconColor}`} />
            </div>
            
            <Heading as="h3" variant="card" className="text-gray-900 mb-2">
              {magnet.title}
            </Heading>
            
            <p className="text-sm text-gray-600 mb-4">
              {magnet.description}
            </p>
          </div>

          {!compact && (
            <div className="space-y-2 mb-4">
              {magnet.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircleIcon className={`h-4 w-4 ${magnet.iconColor} mr-2 flex-shrink-0`} />
                  <span className="text-xs text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          )}

          <Link 
            href={`/ressources/${magnet.slug}`}
            onClick={() => handleLeadMagnetClick(magnet.slug)}
          >
            <Button 
              size={compact ? "sm" : "md"} 
              className={`w-full ${magnet.buttonColor} text-white`}
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Télécharger gratuit
            </Button>
          </Link>

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              ✅ Gratuit • ✅ Immédiat • ✅ Professionnel
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Compact version for smaller spaces
export function CompactLeadMagnetSidebar(props: Omit<LeadMagnetSidebarProps, 'compact'>) {
  return <LeadMagnetSidebar {...props} compact={true} />
}

// Specific variants for easy use
export function ViolenceLeadMagnetSidebar({ className }: { className?: string }) {
  return <LeadMagnetSidebar variant="violence" className={className} />
}

export function AnxietyLeadMagnetSidebar({ className }: { className?: string }) {
  return <LeadMagnetSidebar variant="anxiety" className={className} />
}

export function ConsultationLeadMagnetSidebar({ className }: { className?: string }) {
  return <LeadMagnetSidebar variant="consultation" className={className} />
}

export function AllLeadMagnetsSidebar({ className }: { className?: string }) {
  return <LeadMagnetSidebar variant="all" className={className} />
}