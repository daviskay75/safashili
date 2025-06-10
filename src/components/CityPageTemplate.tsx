'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { TruckIcon } from '@heroicons/react/24/solid'
import { Layout } from '@/components/layout'
import { Button, Card, CardContent, Container, Section, Heading, Badge, Avatar } from '@/components/ui'
import { CONTACT_INFO, SERVICES, MODALITES_DETAIL } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

interface CityData {
  name: string
  slug: string
  zipCode: string
  transport: string[]
  description: string
  subtitle: string
  longDescription: string
  availableServices: string[]
  transportDetails: Record<string, string>
  localTestimonial: {
    name: string
    text: string
    rating: number
  }
  nearbyAreas: string[]
  distanceFromParis: string
}

interface CityPageTemplateProps {
  cityData: CityData
}

export function CityPageTemplate({ cityData }: CityPageTemplateProps) {
  const {
    name,
    zipCode,
    subtitle,
    longDescription,
    availableServices,
    transportDetails,
    localTestimonial,
    nearbyAreas,
    distanceFromParis
  } = cityData

  // Get available services data
  const cityServices = SERVICES.filter(service => 
    availableServices.includes(service.id)
  )

  // Get available modalités
  const cityModalites = Object.values(MODALITES_DETAIL).filter(modalite =>
    availableServices.includes(modalite.id)
  )

  const handleContactClick = () => {
    trackEvent({
      action: 'contact_click',
      category: 'city_page',
      label: cityData.slug,
      custom_parameters: { city: name }
    })
  }

  const handlePhoneClick = () => {
    trackEvent({
      action: 'phone_click',
      category: 'city_page', 
      label: cityData.slug,
      custom_parameters: { city: name }
    })
  }

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Psychologue {name}
            </Badge>
            <Heading as="h1" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {subtitle}
            </Heading>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {longDescription}
            </p>
            
            {/* Key Info */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <Card className="bg-white border-blue-200">
                <CardContent className="p-4 text-center">
                  <MapPinIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-blue-600">{name}</div>
                  <div className="text-sm text-gray-600">{zipCode} - {distanceFromParis}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-blue-200">
                <CardContent className="p-4 text-center">
                  <TruckIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-blue-600">Bien desservi</div>
                  <div className="text-sm text-gray-600">{cityData.transport.join(', ')}</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-200">
                <CardContent className="p-4 text-center">
                  <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-blue-600">Disponible</div>
                  <div className="text-sm text-gray-600">Du lundi au samedi</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleContactClick} asChild>
                <Link href="/contact">
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

      {/* Services Available */}
      <Section className="py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Mes spécialités pour {name}
              </Heading>
              <p className="text-lg text-gray-600">
                Accompagnement psychologique adapté aux besoins des habitants de {name}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-blue-600 font-medium">
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

      {/* Modalités Available */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Comment consulter depuis {name}
              </Heading>
              <p className="text-lg text-gray-600">
                Différentes modalités pour s'adapter à vos besoins
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {cityModalites.map((modalite) => (
                <Card key={modalite.id} className="bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {modalite.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {modalite.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold text-blue-600">
                        {modalite.price}€
                      </div>
                      <div className="text-sm text-gray-500">
                        {modalite.duration} minutes
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/modalites/${modalite.id}`}>
                        Découvrir cette modalité
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Transport Details */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Comment venir depuis {name}
              </Heading>
              <p className="text-lg text-gray-600">
                Accès facile au cabinet de Rosny-sous-Bois
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(transportDetails).map(([transport, details]) => (
                <Card key={transport} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <TruckIcon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{transport}</h3>
                        <p className="text-gray-600">{details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <MapPinIcon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Cabinet à Rosny-sous-Bois
                </h3>
                <p className="text-gray-600 mb-4">
                  {CONTACT_INFO.address.street}, {CONTACT_INFO.address.city} {CONTACT_INFO.address.zipCode}
                </p>
                <p className="text-sm text-gray-500">
                  {CONTACT_INFO.address.building}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Local Testimonial */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Témoignage d'un(e) habitant(e) de {name}
              </Heading>
              <p className="text-lg text-gray-600">
                L'expérience d'une personne que j'accompagne dans votre ville
              </p>
            </div>
            
            <Card className="bg-white border-blue-200 max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(localTestimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 italic mb-6">
                  "{localTestimonial.text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-3">
                  <Avatar 
                    fallback={localTestimonial.name.split(' ').map(n => n[0]).join('')}
                    size="sm"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{localTestimonial.name}</div>
                    <div className="text-sm text-gray-500">{name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Nearby Areas */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-6">
              Secteur d'intervention élargi
            </Heading>
            <p className="text-lg text-gray-600 mb-8">
              J'interviens également dans les communes proches de {name}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyAreas.map((area) => (
                <Badge key={area} variant="secondary" className="text-sm">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-blue-600">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" className="text-3xl font-bold text-white mb-6">
              Vous habitez {name} ? Parlons de votre situation
            </Heading>
            <p className="text-xl text-blue-100 mb-8">
              Un premier échange pour comprendre vos besoins et voir comment je peux vous accompagner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleContactClick}
                asChild
              >
                <Link href="/contact">
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
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  Appeler maintenant
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}