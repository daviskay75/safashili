'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon, PhoneIcon, DocumentArrowDownIcon, ShieldCheckIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'
import { HeartIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { Layout } from '@/components/layout'
import { Button, Card, CardContent, Container, Section, Heading, Badge } from '@/components/ui'
import { FAQ } from '@/components/ui/FAQ'
import { CONTACT_INFO, SERVICES } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

interface ProcessStep {
  step: number
  title: string
  description: string
}

interface SpecialtyFAQ {
  question: string
  answer: string
}

interface SpecialtyData {
  id: string
  title: string
  subtitle: string
  description: string
  heroImage: string
  problems: string[]
  solutions: string[]
  process: ProcessStep[]
  faqs: SpecialtyFAQ[]
  relatedServices: string[]
  urgencyNote?: string
}

interface SpecialtyPageTemplateProps {
  specialtyData: SpecialtyData
}

export function SpecialtyPageTemplate({ specialtyData }: SpecialtyPageTemplateProps) {
  const {
    id,
    title,
    subtitle,
    description,
    problems,
    solutions,
    process,
    faqs,
    relatedServices,
    urgencyNote
  } = specialtyData

  // Get related services data
  const relatedServicesData = SERVICES.filter(service => 
    relatedServices.includes(service.id)
  )

  // Lead magnet mapping for each specialty
  const SPECIALTY_LEAD_MAGNETS = {
    'violence-conjugale': {
      slug: 'sortir-violence-conjugale',
      title: 'Guide Gratuit : Sortir de la Violence Conjugale',
      description: 'Un guide professionnel de 12 pages avec des ressources concrètes et des étapes pratiques pour vous accompagner vers la sortie de violence.',
      icon: ShieldCheckIcon,
      bgColor: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      buttonColor: 'bg-red-600 hover:bg-red-700',
      benefits: [
        'Plan de sortie sécurisé',
        'Démarches légales expliquées',
        'Ressources d\'aide spécialisées'
      ]
    },
    'accompagnement-adultes': {
      slug: '10-signes-consultation',
      title: 'Checklist : 10 Signes Qu\'il Faut Consulter',
      description: 'Une checklist professionnelle pour identifier si un accompagnement psychologique pourrait vous être bénéfique.',
      icon: ClipboardDocumentCheckIcon,
      bgColor: 'from-purple-50 to-blue-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      benefits: [
        'Auto-évaluation guidée',
        'Signaux d\'alarme identifiés',
        'Types d\'accompagnement'
      ]
    },
    'psychotraumatologie': {
      slug: 'gerer-anxiete-quotidien',
      title: 'Guide : Gérer l\'Anxiété au Quotidien',
      description: 'Des techniques concrètes et scientifiquement prouvées pour retrouver votre sérénité et gérer l\'anxiété naturellement.',
      icon: HeartIcon,
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      benefits: [
        'Techniques de respiration d\'urgence',
        'Exercices de relaxation',
        'Programme quotidien anti-anxiété'
      ]
    },
    'souffrance-travail': {
      slug: 'gerer-anxiete-quotidien',
      title: 'Guide : Gérer l\'Anxiété au Quotidien',
      description: 'Des techniques concrètes pour gérer le stress professionnel et retrouver un équilibre.',
      icon: HeartIcon,
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      benefits: [
        'Gestion du stress professionnel',
        'Techniques de relaxation',
        'Prévention du burn-out'
      ]
    },
    'therapie-adolescents': {
      slug: '10-signes-consultation',
      title: 'Checklist : 10 Signes Qu\'il Faut Consulter',
      description: 'Pour les parents qui s\'interrogent sur le bien-être psychologique de leur adolescent.',
      icon: ClipboardDocumentCheckIcon,
      bgColor: 'from-purple-50 to-blue-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      benefits: [
        'Signaux d\'alarme chez l\'adolescent',
        'Quand consulter un professionnel',
        'Comment aborder le sujet'
      ]
    }
  }

  const leadMagnet = SPECIALTY_LEAD_MAGNETS[id as keyof typeof SPECIALTY_LEAD_MAGNETS]

  const handleContactClick = () => {
    trackEvent({
      action: 'contact_click',
      category: 'specialty',
      label: id,
      custom_parameters: { specialty_type: id }
    })
  }

  const handlePhoneClick = () => {
    trackEvent({
      action: 'phone_click',
      category: 'specialty',
      label: id,
      custom_parameters: { specialty_type: id }
    })
  }

  const handleBookingClick = () => {
    trackEvent({
      action: 'booking_click',
      category: 'specialty',
      label: id,
      custom_parameters: { specialty_type: id }
    })
  }

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Spécialité
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

      {/* Problems Section */}
      <Section className="py-16 bg-red-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Vous reconnaissez-vous ?
              </Heading>
              <p className="text-lg text-gray-600">
                Ces difficultés peuvent vous sembler familières
              </p>
            </div>
            <div className="grid gap-4">
              {problems.map((problem, index) => (
                <Card key={index} className="border-red-200 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{problem}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Solutions Section */}
      <Section className="py-16 bg-green-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <HeartIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Comment je peux vous aider
              </Heading>
              <p className="text-lg text-gray-600">
                Une approche personnalisée pour surmonter vos difficultés
              </p>
            </div>
            <div className="grid gap-4">
              {solutions.map((solution, index) => (
                <Card key={index} className="border-green-200 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <CheckIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{solution}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Comment se déroule l'accompagnement
              </Heading>
              <p className="text-lg text-gray-600">
                Un processus structuré adapté à votre rythme
              </p>
            </div>
            <div className="grid gap-8">
              {process.map((step, index) => (
                <Card key={index} className="relative">
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

      {/* FAQ Section */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </Heading>
              <p className="text-lg text-gray-600">
                Réponses aux questions les plus posées sur {title.toLowerCase()}
              </p>
            </div>
            <FAQ faqs={faqs} />
          </div>
        </Container>
      </Section>

      {/* Related Services */}
      {relatedServicesData.length > 0 && (
        <Section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                  Autres accompagnements
                </Heading>
                <p className="text-lg text-gray-600">
                  Ces spécialités peuvent également vous intéresser
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedServicesData.map((service) => (
                  <Card key={service.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {service.duration} min - {service.price}€
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/specialites/${service.id}`}>
                            En savoir plus
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Urgency Note */}
      {urgencyNote && (
        <Section className="py-12 bg-orange-50">
          <Container>
            <Card className="max-w-4xl mx-auto border-orange-200 bg-orange-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <ExclamationTriangleIcon className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">
                      Besoin d'aide immédiate ?
                    </h3>
                    <p className="text-orange-800">
                      {urgencyNote}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>
      )}

      {/* Lead Magnet Section */}
      {leadMagnet && (
        <Section className="py-16 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className={`bg-gradient-to-r ${leadMagnet.bgColor} rounded-2xl p-8 border ${leadMagnet.borderColor}`}>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm`}>
                        <leadMagnet.icon className={`h-6 w-6 ${leadMagnet.iconColor}`} />
                      </div>
                      <Badge variant="specialty" className="bg-white text-gray-800">
                        Ressource Gratuite
                      </Badge>
                    </div>
                    
                    <Heading as="h2" className="text-2xl font-bold text-gray-900 mb-4">
                      {leadMagnet.title}
                    </Heading>
                    
                    <p className="text-gray-600 mb-6">
                      {leadMagnet.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {leadMagnet.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center">
                          <CheckIcon className={`h-5 w-5 ${leadMagnet.iconColor} mr-3 flex-shrink-0`} />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href={`/ressources/${leadMagnet.slug}`}>
                      <Button size="lg" className={`${leadMagnet.buttonColor} text-white`}>
                        <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                        Télécharger gratuitement
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                      <div className="text-center mb-4">
                        <leadMagnet.icon className={`h-12 w-12 ${leadMagnet.iconColor} mx-auto mb-3`} />
                        <h3 className="font-bold text-gray-900 mb-2">Guide Professionnel</h3>
                        <span className={`${leadMagnet.iconColor} font-semibold text-lg`}>100% GRATUIT</span>
                      </div>
                      
                      <div className="text-xs text-gray-500 border-t pt-3">
                        <p>✅ Téléchargement immédiat</p>
                        <p>✅ Aucune carte de crédit</p>
                        <p>✅ Guide professionnel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="py-16 bg-blue-600">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" className="text-3xl font-bold text-white mb-6">
              Prêt(e) à commencer votre accompagnement ?
            </Heading>
            <p className="text-xl text-blue-100 mb-8">
              Je vous accompagne avec bienveillance et expertise pour surmonter vos difficultés
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleBookingClick}
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