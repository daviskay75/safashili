'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  CheckIcon, 
  PhoneIcon,
  ClockIcon,
  CurrencyEuroIcon,
  MapPinIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Button, Card, CardContent, Container, Section, Heading, Badge } from '@/components/ui'
import { CONTACT_INFO } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

interface ProcessStep {
  step: number
  title: string
  description: string
}

interface ModaliteData {
  id: string
  title: string
  subtitle: string
  description: string
  price: number
  duration: number
  location?: string
  platforms?: string
  groupSize?: string
  travelZone?: string
  advantages: string[]
  process: ProcessStep[]
  groupTypes?: string[]
  requirements?: string[]
  targetAudience?: string[]
  practicalInfo: {
    schedule: string
    payment?: string
    cancellation?: string
    insurance?: string
    commitment?: string
    confidentiality?: string
    prerequisite?: string
    travel?: string
    conditions?: string
    limitation?: string
    security?: string
    backup?: string
  }
}

interface ModalitePageTemplateProps {
  modaliteData: ModaliteData
}

export function ModalitePageTemplate({ modaliteData }: ModalitePageTemplateProps) {
  const {
    id,
    title,
    subtitle,
    description,
    price,
    duration,
    location,
    platforms,
    groupSize,
    travelZone,
    advantages,
    process,
    groupTypes,
    requirements,
    targetAudience,
    practicalInfo
  } = modaliteData

  const handleContactClick = () => {
    trackEvent({
      action: 'contact_click',
      category: 'modalite',
      label: id,
      custom_parameters: { modalite_type: id }
    })
  }

  const handlePhoneClick = () => {
    trackEvent({
      action: 'phone_click', 
      category: 'modalite',
      label: id,
      custom_parameters: { modalite_type: id }
    })
  }

  const handlePricingView = React.useCallback(() => {
    trackEvent({
      action: 'pricing_view',
      category: 'modalite',
      label: id,
      value: price,
      custom_parameters: { modalite_type: id }
    })
  }, [id, price])

  React.useEffect(() => {
    handlePricingView()
  }, [handlePricingView])

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Modalité de consultation
            </Badge>
            <Heading as="h1" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </Heading>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {subtitle}
            </p>
            <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
              {description}
            </p>

            {/* Key Info Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <Card className="bg-white border-blue-200">
                <CardContent className="p-4 text-center">
                  <CurrencyEuroIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{price}€</div>
                  <div className="text-sm text-gray-600">par séance</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-blue-200">
                <CardContent className="p-4 text-center">
                  <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{duration}</div>
                  <div className="text-sm text-gray-600">minutes</div>
                </CardContent>
              </Card>

              {groupSize && (
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-4 text-center">
                    <UsersIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-blue-600">{groupSize}</div>
                    <div className="text-sm text-gray-600">participants</div>
                  </CardContent>
                </Card>
              )}

              {(location || platforms || travelZone) && (
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-4 text-center">
                    <MapPinIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-blue-600">
                      {location ? 'Cabinet' : platforms ? 'En ligne' : 'À domicile'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {location || platforms || travelZone}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleContactClick} asChild>
                <Link href="/rendez-vous">
                  Prendre rendez-vous
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handlePhoneClick}
                asChild
              >
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  {CONTACT_INFO.phone}
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Advantages Section */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Avantages de cette modalité
              </Heading>
              <p className="text-lg text-gray-600">
                Découvrez les bénéfices spécifiques de {title.toLowerCase()}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => (
                <Card key={index} className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <CheckIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{advantage}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Comment ça fonctionne
              </Heading>
              <p className="text-lg text-gray-600">
                Les étapes de votre accompagnement en {title.toLowerCase()}
              </p>
            </div>
            <div className="grid gap-8">
              {process.map((step, index) => (
                <Card key={index} className="relative bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xl font-bold text-blue-600">{step.step}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {/* Connector line */}
                    {index < process.length - 1 && (
                      <div className="absolute left-11 top-20 w-0.5 h-8 bg-gray-200" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Additional Info Sections */}
      {(groupTypes || requirements || targetAudience) && (
        <Section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {groupTypes && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Types de groupes
                      </h3>
                      <ul className="space-y-2">
                        {groupTypes.map((type, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-gray-700">{type}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {requirements && (
                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Prérequis techniques
                      </h3>
                      <ul className="space-y-2">
                        {requirements.map((req, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {targetAudience && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Public concerné
                      </h3>
                      <ul className="space-y-2">
                        {targetAudience.map((audience, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-gray-700">{audience}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Practical Information */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Informations pratiques
              </Heading>
              <p className="text-lg text-gray-600">
                Tout ce que vous devez savoir pour commencer
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(practicalInfo).map(([key, value]) => {
                if (!value) return null
                
                const labels: Record<string, string> = {
                  schedule: 'Horaires',
                  payment: 'Moyens de paiement',
                  cancellation: 'Annulation',
                  insurance: 'Remboursement',
                  commitment: 'Engagement',
                  confidentiality: 'Confidentialité',
                  prerequisite: 'Prérequis',
                  travel: 'Déplacement',
                  conditions: 'Conditions',
                  limitation: 'Limitations',
                  security: 'Sécurité',
                  backup: 'Solution de secours'
                }

                return (
                  <Card key={key} className="bg-white">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {labels[key] || key}
                      </h3>
                      <p className="text-gray-600">{value}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-blue-600">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" className="text-3xl font-bold text-white mb-6">
              Prêt(e) à commencer ?
            </Heading>
            <p className="text-xl text-blue-100 mb-8">
              Contactez-moi pour discuter de votre accompagnement en {title.toLowerCase()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleContactClick}
                asChild
              >
                <Link href="/rendez-vous">
                  Prendre rendez-vous
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-white border-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/about">
                  En savoir plus sur moi
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}