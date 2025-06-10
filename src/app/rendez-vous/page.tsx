'use client'

import React, { useState } from 'react'
import { 
  CalendarIcon, 
  ClockIcon, 
  PhoneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Section, Heading, Card, CardContent, Button } from '@/components/ui'
import { BookingForm } from '@/components/forms'
import { DoctoLibWidget } from '@/components/DoctoLibWidget'
import { CONTACT_INFO, EMERGENCY_CONTACTS } from '@/lib/constants'
import { formatPhoneNumber } from '@/lib/utils'

export default function BookingPage() {
  const [bookingMethod, setBookingMethod] = useState<'instant' | 'form'>('instant')

  return (
    <Layout>
      {/* Hero Booking */}
      <Section variant="primary" padding="xl">
        <div className="text-center max-w-3xl mx-auto">
          <Heading as="h1" variant="hero" className="mb-6">
            Prendre Rendez-vous en Ligne
          </Heading>
          <p className="text-xl text-gray-600 mb-8">
            Réservez directement votre consultation en choisissant le type de suivi, 
            la date et l'heure qui vous conviennent. Je vous confirmerai le rendez-vous rapidement.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <CalendarIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Doctolib</p>
              <p className="text-sm text-gray-600">Réservation instantanée</p>
            </div>
            <div>
              <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Formulaire</p>
              <p className="text-sm text-gray-600">Demande de contact</p>
            </div>
            <div>
              <PhoneIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Téléphone</p>
              <p className="text-sm text-gray-600">Contact direct</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Information Important */}
      <Section padding="lg">
        <div className="max-w-4xl mx-auto">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <InformationCircleIcon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Comment fonctionne la prise de rendez-vous
                  </h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Sélectionnez le type de consultation et remplissez le formulaire</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Choisissez votre date et créneau horaire parmi les disponibilités</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Je vous recontacte sous 24h pour confirmer le rendez-vous</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Vous recevez un email de confirmation avec tous les détails</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Booking Options */}
      <Section padding="xl">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Booking Area */}
          <div className="lg:col-span-2">
            <Heading as="h2" variant="section" className="mb-6">
              Réserver votre consultation
            </Heading>
            
            {/* Booking Method Tabs */}
            <div className="mb-8">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setBookingMethod('instant')}
                  className={`flex-1 px-4 py-3 rounded-md font-medium text-sm transition-colors ${
                    bookingMethod === 'instant'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <CalendarIcon className="h-5 w-5 inline mr-2" />
                  Réservation instantanée
                </button>
                <button
                  onClick={() => setBookingMethod('form')}
                  className={`flex-1 px-4 py-3 rounded-md font-medium text-sm transition-colors ${
                    bookingMethod === 'form'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <PhoneIcon className="h-5 w-5 inline mr-2" />
                  Demande de contact
                </button>
              </div>
            </div>

            {/* Booking Content */}
            <div>
              {/* Instant Booking Tab */}
              <div className={bookingMethod === 'instant' ? 'block' : 'hidden'}>
                <p className="text-gray-600 mb-6">
                  Sélectionnez directement votre créneau dans le calendrier ci-dessous. 
                  Votre rendez-vous sera confirmé instantanément.
                </p>
                <DoctoLibWidget />
              </div>
              
              {/* Contact Form Tab */}
              <div className={bookingMethod === 'form' ? 'block' : 'hidden'}>
                <p className="text-gray-600 mb-6">
                  Complétez ce formulaire pour une demande personnalisée. 
                  Je vous recontacte sous 24h pour confirmer votre rendez-vous.
                </p>
                <BookingForm />
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="space-y-8">
            <div>
              <Heading as="h2" variant="section" className="mb-6">
                Types de Consultation
              </Heading>
              
              <div className="space-y-4">
                {/* Cabinet */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Au Cabinet</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Centre médical de Rosny-sous-Bois
                    </p>
                    <p className="text-xs text-gray-500">
                      60 ou 90 minutes • Accès RER E
                    </p>
                  </CardContent>
                </Card>

                {/* Domicile */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">À Domicile</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Consultation chez vous
                    </p>
                    <p className="text-xs text-gray-500">
                      90 minutes • Zone Rosny et alentours
                    </p>
                  </CardContent>
                </Card>

                {/* Distance */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">À Distance</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Visioconférence ou téléphone
                    </p>
                    <p className="text-xs text-gray-500">
                      60 ou 90 minutes • Plateforme sécurisée
                    </p>
                  </CardContent>
                </Card>

                {/* Groupe */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Thérapie de Groupe</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Séances collectives thématiques
                    </p>
                    <p className="text-xs text-gray-500">
                      90 minutes • Groupes de 4-6 personnes
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tarifs */}
            <div>
              <Heading as="h3" variant="subsection" className="mb-4">
                Tarifs des Consultations
              </Heading>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Consultation 60 min</span>
                      <span className="font-semibold">70€</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Consultation 90 min</span>
                      <span className="font-semibold">95€</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Consultation à domicile</span>
                      <span className="font-semibold">110€</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <p className="text-xs text-gray-600">
                        Moyens de paiement : espèces, chèque, carte bancaire
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Direct */}
            <div>
              <Heading as="h3" variant="subsection" className="mb-4">
                Contact Direct
              </Heading>
              
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="text-center">
                    <PhoneIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <p className="font-semibold text-green-900 mb-2">
                      Préférez-vous appeler ?
                    </p>
                    <p className="text-lg font-bold text-green-800 mb-2">
                      {formatPhoneNumber(CONTACT_INFO.phone)}
                    </p>
                    <p className="text-sm text-green-700">
                      Lundi - Vendredi : 9h-18h<br />
                      Réponse rapide garantie
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Spécialités */}
      <Section variant="secondary" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <Heading as="h2" variant="section" className="mb-6">
            Mes Spécialités
          </Heading>
          <p className="text-gray-600 mb-8">
            J'accompagne les personnes dans différents domaines de la psychologie clinique
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Violence Conjugale</h3>
                <p className="text-sm text-gray-600">
                  Accompagnement spécialisé pour sortir de situations de violence
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Psychotraumatologie</h3>
                <p className="text-sm text-gray-600">
                  Prise en charge des traumatismes et du stress post-traumatique
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Thérapie Adolescents</h3>
                <p className="text-sm text-gray-600">
                  Accompagnement adapté aux problématiques adolescentes
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Accompagnement Adultes</h3>
                <p className="text-sm text-gray-600">
                  Soutien psychologique pour les adultes en difficulté
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Souffrance au Travail</h3>
                <p className="text-sm text-gray-600">
                  Burn-out, harcèlement, reconversion professionnelle
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Bilans Psychologiques</h3>
                <p className="text-sm text-gray-600">
                  Évaluations psychologiques complètes et personnalisées
                </p>
              </CardContent>
            </Card>
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
                    En cas d'urgence psychologique
                  </h3>
                  <p className="text-orange-800 mb-4">
                    Si vous traversez une crise ou ressentez des pensées suicidaires, 
                    n'attendez pas pour demander de l'aide. Contactez immédiatement :
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
                  
                  <div className="mt-4 p-3 bg-orange-100 rounded-md">
                    <p className="text-sm text-orange-800">
                      <strong>Pour une consultation urgente :</strong> Appelez-moi directement au {formatPhoneNumber(CONTACT_INFO.phone)}. 
                      Je m'efforce de répondre rapidement aux situations d'urgence.
                    </p>
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