import type { Metadata } from 'next'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Section, Heading, Card, CardContent } from '@/components/ui'
import { ContactForm } from '@/components/forms/ContactForm'
import { CONTACT_INFO, EMERGENCY_CONTACTS } from '@/lib/constants'
import { formatPhoneNumber, getBusinessHours } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact - Prendre Rendez-vous avec Safa Shili Psychologue',
  description: 'Prenez RDV avec Safa Shili, psychologue Rosny-sous-Bois 93110. Formulaire ou téléphone 06 51 68 74 30. Cabinet RER E, consultation domicile.',
  keywords: ['contact psychologue Rosny', 'rendez-vous psychologue 93110', 'Safa Shili contact', 'psychologue urgence', 'consultation psychologique'],
}

export default function ContactPage() {
  return (
    <Layout>
      {/* Hero Contact */}
      <Section variant="primary" padding="xl">
        <div className="text-center max-w-3xl mx-auto">
          <Heading as="h1" variant="hero" className="mb-6">
            Prendre Rendez-vous
          </Heading>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-moi pour une première consultation ou pour toute question. 
            Je vous réponds rapidement et vous propose un créneau adapté à vos besoins.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <PhoneIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Téléphone</p>
              <p className="text-sm text-gray-600">Réponse rapide</p>
            </div>
            <div>
              <EnvelopeIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Email</p>
              <p className="text-sm text-gray-600">Sous 24h</p>
            </div>
            <div>
              <MapPinIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Cabinet</p>
              <p className="text-sm text-gray-600">Centre médical</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Form & Info */}
      <Section padding="xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Heading as="h2" variant="section" className="mb-6">
              Formulaire de Contact
            </Heading>
            <p className="text-gray-600 mb-8">
              Remplissez ce formulaire pour me faire part de votre demande. 
              Je vous recontacterai dans les plus brefs délais pour convenir d'un rendez-vous.
            </p>
            
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <Heading as="h2" variant="section" className="mb-6">
                Informations de Contact
              </Heading>
              
              <div className="space-y-6">
                {/* Téléphone */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <PhoneIcon className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                        <p className="text-lg font-medium text-blue-600">
                          {formatPhoneNumber(CONTACT_INFO.phone)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Consultations et rendez-vous
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <EnvelopeIcon className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-blue-600 font-medium">
                          {CONTACT_INFO.email}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Réponse sous 24h
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Adresse */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPinIcon className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Adresse du Cabinet</h3>
                        <p className="text-gray-900">
                          {CONTACT_INFO.address.street}<br />
                          {CONTACT_INFO.address.zipCode} {CONTACT_INFO.address.city}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {CONTACT_INFO.address.building}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Horaires */}
            <div>
              <Heading as="h3" variant="subsection" className="mb-4">
                Horaires d'ouverture
              </Heading>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Lundi</span>
                      <span className="text-gray-600">{getBusinessHours('lundi')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Mardi - Vendredi</span>
                      <span className="text-gray-600">{getBusinessHours('mardi')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Samedi</span>
                      <span className="text-gray-600">{getBusinessHours('samedi')}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="font-medium">Dimanche</span>
                      <span className="text-gray-500">Fermé</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Transport & Accès */}
      <Section variant="secondary" padding="xl">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Heading as="h2" variant="section" className="mb-6">
              Comment Venir au Cabinet
            </Heading>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Transports en commun</h3>
                <ul className="space-y-2 text-gray-600">
                  {CONTACT_INFO.transport.map((transport, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>{transport}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Accessibilité</h3>
                <p className="text-gray-600">
                  Le cabinet est situé au 1er sous-sol du centre médical avec 
                  ascenseur. Accès facilité pour les personnes à mobilité réduite.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Stationnement</h3>
                <p className="text-gray-600">
                  Places de parking disponibles aux alentours du centre médical. 
                  Zones de stationnement gratuit à proximité.
                </p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div>
            <Heading as="h3" variant="subsection" className="mb-4">
              Localisation
            </Heading>
            
            <Card>
              <CardContent className="p-0">
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPinIcon className="h-12 w-12 mx-auto mb-2" />
                    <p>Carte interactive</p>
                    <p className="text-sm">Google Maps sera intégrée ici</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 text-center">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${CONTACT_INFO.address.street}, ${CONTACT_INFO.address.zipCode} ${CONTACT_INFO.address.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Voir sur Google Maps →
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Urgences */}
      <Section padding="lg">
        <div className="max-w-4xl mx-auto">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-2">
                    En cas d'urgence
                  </h3>
                  <p className="text-orange-800 mb-4">
                    Si vous traversez une crise ou ressentez des pensées suicidaires, 
                    contactez immédiatement ces numéros d'urgence :
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {EMERGENCY_CONTACTS.map((contact, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="font-bold text-orange-900">
                          {contact.number}
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-orange-900">{contact.name}</p>
                          <p className="text-orange-700">{contact.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </Layout>
  )
}