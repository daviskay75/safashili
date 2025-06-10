import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  ClockIcon,
  CurrencyEuroIcon,
  MapPinIcon,
  PhoneIcon,
  CreditCardIcon,
  CalendarIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Button, Card, CardContent, Container, Section, Heading, Badge, FAQ } from '@/components/ui'
import { CONTACT_INFO, BUSINESS_HOURS, FAQS, SITE_CONFIG } from '@/lib/constants'
import { formatPhoneNumber } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Informations Pratiques | ${SITE_CONFIG.name}`,
  description: 'Toutes les informations pratiques : tarifs, horaires, remboursements, modalités d\'annulation, accès au cabinet et conseils pour votre première consultation.',
  keywords: [
    'informations pratiques psychologue',
    'tarifs psychologue',
    'horaires consultation',
    'remboursement psychologue',
    'cabinet Rosny-sous-Bois',
    'accès transport',
    'première consultation',
    'Seine-Saint-Denis'
  ],
  openGraph: {
    title: 'Informations Pratiques - Safa Shili Psychologue',
    description: 'Horaires, tarifs, remboursements et tout ce qu\'il faut savoir avant votre première consultation.',
    type: 'website',
  },
}

export default function InfosPratiquesPage() {
  const formatBusinessHours = (hours: any) => {
    if (hours === 'fermé') return 'Fermé'
    if (hours.afternoon) {
      return `${hours.open}-${hours.close} et ${hours.afternoon}-${hours.afternoonClose}`
    }
    return `${hours.open}-${hours.close}`
  }

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Informations essentielles
            </Badge>
            <Heading as="h1" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Informations Pratiques
            </Heading>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Tout ce que vous devez savoir avant votre première consultation : 
              tarifs, horaires, modalités pratiques et conseils pour bien préparer votre rendez-vous.
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Ces informations vous permettront d'aborder sereinement votre accompagnement psychologique 
              en connaissant toutes les modalités pratiques.
            </p>
          </div>
        </Container>
      </Section>

      {/* Quick Info Cards */}
      <Section className="py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="bg-blue-50 border-blue-200 text-center">
                <CardContent className="p-6">
                  <CurrencyEuroIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Tarif consultation</h3>
                  <p className="text-2xl font-bold text-blue-600">60€</p>
                  <p className="text-sm text-gray-600">60 minutes</p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200 text-center">
                <CardContent className="p-6">
                  <ClockIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Première consultation</h3>
                  <p className="text-lg font-bold text-green-600">Gratuite</p>
                  <p className="text-sm text-gray-600">15 minutes d'échange</p>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200 text-center">
                <CardContent className="p-6">
                  <ShieldCheckIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Remboursement</h3>
                  <p className="text-lg font-bold text-purple-600">Mutuelles</p>
                  <p className="text-sm text-gray-600">Selon votre contrat</p>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200 text-center">
                <CardContent className="p-6">
                  <CalendarIcon className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Annulation</h3>
                  <p className="text-lg font-bold text-orange-600">48h</p>
                  <p className="text-sm text-gray-600">de préavis minimum</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Detailed Information */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Horaires et Contact */}
              <div>
                <Heading as="h2" className="text-2xl font-bold text-gray-900 mb-8">
                  Horaires et Contact
                </Heading>
                
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <ClockIcon className="h-5 w-5 mr-2 text-blue-600" />
                      Horaires du cabinet
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(BUSINESS_HOURS).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize font-medium text-gray-700">{day}</span>
                          <span className="text-gray-600">{formatBusinessHours(hours)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <PhoneIcon className="h-5 w-5 mr-2 text-blue-600" />
                      Contact et rendez-vous
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <PhoneIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{formatPhoneNumber(CONTACT_INFO.phone)}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">📧</span>
                        <span className="text-gray-700">{CONTACT_INFO.email}</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Urgences :</strong> En cas de crise, contactez le 3114 
                          (numéro national gratuit de prévention du suicide) ou rendez-vous aux urgences.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <MapPinIcon className="h-5 w-5 mr-2 text-blue-600" />
                      Accès au cabinet
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900">{CONTACT_INFO.address.street}</p>
                        <p className="text-gray-600">{CONTACT_INFO.address.zipCode} {CONTACT_INFO.address.city}</p>
                        <p className="text-sm text-gray-500">{CONTACT_INFO.address.building}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Transports :</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {CONTACT_INFO.transport.map((transport, index) => (
                            <li key={index}>• {transport}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Parking :</strong> Places de stationnement disponibles aux alentours
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Accessibilité :</strong> Cabinet accessible PMR (ascenseur)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tarifs et Modalités */}
              <div>
                <Heading as="h2" className="text-2xl font-bold text-gray-900 mb-8">
                  Tarifs et Modalités
                </Heading>

                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <CurrencyEuroIcon className="h-5 w-5 mr-2 text-blue-600" />
                      Grille tarifaire
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Première consultation</p>
                          <p className="text-sm text-gray-600">15 minutes d'échange</p>
                        </div>
                        <span className="text-lg font-bold text-green-600">Gratuite</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Consultation cabinet</p>
                          <p className="text-sm text-gray-600">60 minutes</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">60€</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Consultation à domicile</p>
                          <p className="text-sm text-gray-600">60 minutes + frais de déplacement</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">80€</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Consultation à distance</p>
                          <p className="text-sm text-gray-600">50 minutes en visioconférence</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">55€</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Thérapie de groupe</p>
                          <p className="text-sm text-gray-600">90 minutes, 6-8 participants</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">40€</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Bilan psychologique</p>
                          <p className="text-sm text-gray-600">Tests projectifs complets</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">120€</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <CreditCardIcon className="h-5 w-5 mr-2 text-blue-600" />
                      Modalités de paiement
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Moyens acceptés :</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Espèces</li>
                          <li>• Chèque (à l'ordre de Safa Shili)</li>
                          <li>• Virement bancaire</li>
                          <li>• PayPal (pour les consultations à distance)</li>
                        </ul>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Facturation :</strong> Facture remise après chaque séance pour 
                          remboursement par votre mutuelle
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <ShieldCheckIcon className="h-5 w-5 mr-2 text-blue-600" />
                      Remboursements
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm">
                          <strong className="text-yellow-800">Sécurité Sociale :</strong>
                          <span className="text-yellow-700"> Non remboursée (psychologue non conventionnée)</span>
                        </p>
                      </div>
                      
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm">
                          <strong className="text-green-800">Mutuelles :</strong>
                          <span className="text-green-700"> Nombreuses mutuelles proposent un forfait annuel 
                          pour les consultations psychologiques (50€ à 200€ selon les contrats)</span>
                        </p>
                      </div>
                      
                      <div className="pt-3">
                        <h4 className="font-medium text-gray-900 mb-2">Mutuelles partenaires courantes :</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <span>• MGEN</span>
                          <span>• Harmonie Mutuelle</span>
                          <span>• MMA</span>
                          <span>• MAIF</span>
                          <span>• Allianz</span>
                          <span>• Et bien d'autres...</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Rules and Policies */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Règles et Politiques
            </Heading>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-6">
                  <h3 className="flex items-center text-lg font-semibold text-orange-900 mb-4">
                    <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                    Annulations et retards
                  </h3>
                  <div className="space-y-3 text-orange-800">
                    <p><strong>Annulation :</strong> Préavis de 48h minimum requis</p>
                    <p><strong>Annulation tardive :</strong> 60€ facturés (moins de 48h)</p>
                    <p><strong>Absence non excusée :</strong> Séance facturée intégralement</p>
                    <p><strong>Retard :</strong> Séance écourtée, durée non rattrapée</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="flex items-center text-lg font-semibold text-blue-900 mb-4">
                    <InformationCircleIcon className="h-5 w-5 mr-2" />
                    Confidentialité et déontologie
                  </h3>
                  <div className="space-y-3 text-blue-800">
                    <p><strong>Secret professionnel :</strong> Respect absolu de la confidentialité</p>
                    <p><strong>Code de déontologie :</strong> Respect strict des règles professionnelles</p>
                    <p><strong>Dossier patient :</strong> Conservation sécurisée des informations</p>
                    <p><strong>Supervision :</strong> Analyse de pratique régulière</p>
                  </div>
                </CardContent>
              </Card>
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
                Questions Fréquentes
              </Heading>
              <p className="text-lg text-gray-600">
                Les réponses aux questions les plus posées sur les modalités pratiques
              </p>
            </div>
            
            <FAQ faqs={FAQS} />
          </div>
        </Container>
      </Section>

      {/* Preparation Section */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Préparer votre première consultation
              </Heading>
              <p className="text-lg text-gray-600">
                Quelques conseils pour aborder sereinement votre premier rendez-vous
              </p>
            </div>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-4">✅ Ce qu'il faut apporter</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Votre carte d'identité</li>
                      <li>• Votre carte de mutuelle</li>
                      <li>• Éventuels rapports médicaux pertinents</li>
                      <li>• Liste de vos traitements actuels</li>
                      <li>• Moyen de paiement</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-4">💭 Comment se préparer</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Réfléchir à ce qui vous amène</li>
                      <li>• Noter vos questions éventuelles</li>
                      <li>• Arriver 5-10 minutes en avance</li>
                      <li>• Prévoir du temps après la séance</li>
                      <li>• Rester ouvert(e) à l'échange</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-blue-200">
                  <p className="text-blue-900 text-center">
                    <strong>💡 Rappel :</strong> La première consultation de 15 minutes est gratuite et 
                    sans engagement. C'est l'occasion de faire connaissance et de voir si nous pouvons 
                    travailler ensemble.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-blue-600">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" className="text-3xl font-bold text-white mb-6">
              Prêt(e) pour votre première consultation ?
            </Heading>
            <p className="text-xl text-blue-100 mb-8">
              Toutes les informations sont claires ? N'hésitez pas à me contacter 
              pour toute question complémentaire ou pour prendre rendez-vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
              >
                <Link href="/rendez-vous">
                  Prendre rendez-vous
                  <CalendarIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-white border-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/contact">
                  Poser une question
                  <QuestionMarkCircleIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}