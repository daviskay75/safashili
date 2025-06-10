import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  MapPinIcon, 
  PhoneIcon,
  StarIcon,
  TruckIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Button, Section, Heading, Card, CardContent, Badge } from '@/components/ui'
import { CITIES, CONTACT_INFO, SERVICES, MODALITES_DETAIL } from '@/lib/constants'
import { formatPhoneNumber } from '@/lib/utils'
import { getCitySchema } from '@/lib/structured-data'
import StructuredData from '@/components/StructuredData'

interface CityPageProps {
  params: Promise<{
    city: string
  }>
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = CITIES.find(c => c.slug === citySlug)
  
  if (!city) {
    return {
      title: 'Ville non trouvée',
      description: 'Cette ville n\'est pas dans notre zone d\'intervention.'
    }
  }

  return {
    title: `Psychologue ${city.name} ${city.zipCode} - Safa Shili`,
    description: `${city.longDescription} Transport : ${city.transport.join(', ')}. Téléphone : ${CONTACT_INFO.phone}`,
    keywords: [
      `psychologue ${city.name}`,
      `psychologue ${city.zipCode}`,
      `violence conjugale ${city.name}`,
      `consultation psychologique ${city.name}`,
      `thérapie ${city.name}`,
      ...city.transport.map(t => `psychologue ${t}`),
      ...city.nearbyAreas.map(area => `psychologue proche ${area}`)
    ],
    openGraph: {
      title: `Psychologue ${city.name} - Safa Shili`,
      description: city.longDescription,
      type: 'website',
    },
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params
  const city = CITIES.find(c => c.slug === citySlug)
  
  if (!city) {
    notFound()
  }

  const availableModalites = city.availableServices.map(serviceId => 
    MODALITES_DETAIL[serviceId as keyof typeof MODALITES_DETAIL]
  ).filter(Boolean)

  const citySchema = getCitySchema(city)

  return (
    <Layout>
      <StructuredData schemas={[citySchema]} />
      
      {/* Hero Section */}
      <Section variant="primary" padding="xl">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="specialty" className="mb-4">
            Psychologue {city.name}
          </Badge>
          
          <Heading as="h1" variant="hero" className="mb-6">
            {city.subtitle}
          </Heading>
          
          <p className="text-xl text-gray-600 mb-8">
            {city.longDescription}
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <MapPinIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">{city.distanceFromParis}</p>
              <p className="text-sm text-gray-600">de Paris</p>
            </div>
            <div className="text-center">
              <TruckIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">{city.transport.length} lignes</p>
              <p className="text-sm text-gray-600">de transport</p>
            </div>
            <div className="text-center">
              <BuildingOffice2Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">{city.availableServices.length} modalités</p>
              <p className="text-sm text-gray-600">disponibles</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <PhoneIcon className="h-5 w-5 mr-2" />
                Prendre Rendez-vous
              </Button>
            </Link>
            <Link href="/specialites">
              <Button variant="outline" size="lg">
                Voir les spécialités
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Transport & Access */}
      <Section padding="xl">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Heading as="h2" variant="section" className="mb-6">
              Comment venir depuis {city.name}
            </Heading>
            
            <div className="space-y-4">
              {Object.entries(city.transportDetails).map(([transport, details]) => (
                <Card key={transport}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <TruckIcon className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold">{transport}</h3>
                        <p className="text-gray-600 text-sm">{details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Zones limitrophes</h3>
              <p className="text-blue-800 text-sm">
                Également accessible depuis : {city.nearbyAreas.join(', ')}
              </p>
            </div>
          </div>

          <div>
            <Heading as="h2" variant="section" className="mb-6">
              Contact & Informations
            </Heading>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <PhoneIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Téléphone</h3>
                    <p className="text-lg font-medium text-blue-600">
                      {formatPhoneNumber(CONTACT_INFO.phone)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Adresse du cabinet</h3>
                    <p className="text-gray-600">
                      {CONTACT_INFO.address.street}<br/>
                      {CONTACT_INFO.address.zipCode} {CONTACT_INFO.address.city}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {CONTACT_INFO.address.building}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Zone d'intervention prioritaire</h3>
              <p className="text-green-800 text-sm">
                {city.name} fait partie de ma zone d'intervention prioritaire. 
                {city.availableServices.includes('consultation-domicile') && 
                  ' Consultations à domicile disponibles.'
                }
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Available Services */}
      <Section variant="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <Heading as="h2" variant="section" className="text-center mb-8">
            Modalités disponibles à {city.name}
          </Heading>
          
          <div className="grid md:grid-cols-2 gap-6">
            {availableModalites.map((modalite) => (
              <Card key={modalite.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{modalite.title}</h3>
                  <p className="text-gray-600 mb-4">{modalite.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{modalite.duration}min</span>
                      <span>•</span>
                      <span>{modalite.price}€</span>
                    </div>
                  </div>
                  
                  <Link href={`/modalites/${modalite.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      En savoir plus
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Local Testimonial */}
      {city.localTestimonial && (
        <Section padding="lg">
          <div className="max-w-3xl mx-auto text-center">
            <Heading as="h2" variant="section" className="mb-8">
              Témoignage local
            </Heading>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  {[...Array(city.localTestimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg text-gray-700 mb-4 italic">
                  "{city.localTestimonial.text}"
                </blockquote>
                
                <cite className="text-gray-600 font-medium">
                  {city.localTestimonial.name}, {city.name}
                </cite>
              </CardContent>
            </Card>
          </div>
        </Section>
      )}

      {/* Specialties Preview */}
      <Section padding="xl">
        <div className="text-center mb-12">
          <Heading as="h2" variant="section" className="mb-4">
            Mes spécialités pour {city.name}
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un accompagnement expert adapté aux besoins des habitants de {city.name} et environs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 6).map((service) => (
            <Card key={service.id} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <Link href={`/specialites/${service.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Découvrir
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="primary" padding="lg">
        <div className="text-center">
          <Heading as="h2" variant="section" className="mb-4">
            Consultation depuis {city.name}
          </Heading>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Prenez rendez-vous facilement. Accès rapide depuis {city.name} 
            {city.transport.length > 0 && ` via ${city.transport[0]}`}.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <PhoneIcon className="h-5 w-5 mr-2" />
                {formatPhoneNumber(CONTACT_INFO.phone)}
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Formulaire de contact
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export async function generateStaticParams() {
  return CITIES.map((city) => ({
    city: city.slug,
  }))
}