import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  HomeIcon,
  VideoCameraIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  CurrencyEuroIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Button, Card, CardContent, Container, Section, Heading, Badge } from '@/components/ui'
import { MODALITES_DETAIL, SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Modalités de Consultation | ${SITE_CONFIG.name}`,
  description: 'Découvrez les différentes modalités de consultation : cabinet, domicile, à distance et thérapies de groupe. Trouvez la formule qui vous convient le mieux.',
  keywords: [
    'consultation psychologue',
    'cabinet psychologue',
    'consultation domicile',
    'thérapie distance',
    'thérapie groupe',
    'modalités consultation',
    'Rosny-sous-Bois',
    'Seine-Saint-Denis'
  ],
  openGraph: {
    title: 'Modalités de Consultation - Safa Shili Psychologue',
    description: 'Cabinet, domicile, à distance ou en groupe : découvrez toutes les modalités de consultation pour votre accompagnement psychologique.',
    type: 'website',
  },
}

export default function ModalitesPage() {
  const modalites = Object.values(MODALITES_DETAIL)
  
  const iconMap = {
    'consultation-cabinet': MapPinIcon,
    'consultation-domicile': HomeIcon,
    'suivi-distance': VideoCameraIcon,
    'therapie-groupe': UsersIcon,
  }

  const colorMap = {
    'consultation-cabinet': 'blue',
    'consultation-domicile': 'green',
    'suivi-distance': 'purple',
    'therapie-groupe': 'orange',
  }

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Flexibilité & Adaptation
            </Badge>
            <Heading as="h1" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Modalités de Consultation
            </Heading>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Choisissez la formule qui correspond le mieux à vos besoins, votre situation 
              et vos préférences pour un accompagnement psychologique optimal.
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Je propose différentes modalités de consultation pour m'adapter à votre 
              rythme de vie et vous offrir un cadre thérapeutique dans lequel vous vous sentez à l'aise.
            </p>
          </div>
        </Container>
      </Section>

      {/* Modalités Grid */}
      <Section className="py-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Trouvez votre modalité idéale
              </Heading>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Chaque modalité offre ses propres avantages. L'important est de choisir 
                celle qui vous permet de vous sentir le plus à l'aise pour votre suivi.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {modalites.map((modalite) => {
                const IconComponent = iconMap[modalite.id as keyof typeof iconMap] || MapPinIcon
                const color = colorMap[modalite.id as keyof typeof colorMap] || 'blue'
                
                return (
                  <Card key={modalite.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start space-x-4 mb-6">
                          <div className={`w-14 h-14 bg-${color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className={`h-7 w-7 text-${color}-600`} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-xl font-semibold text-gray-900 mb-2 group-hover:text-${color}-600 transition-colors`}>
                              {modalite.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {modalite.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {modalite.description}
                        </p>

                        {/* Key Info */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center space-x-2">
                            <CurrencyEuroIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">
                              <span className={`font-semibold text-${color}-600`}>{modalite.price}€</span>
                              <span className="text-gray-500"> / séance</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{modalite.duration} minutes</span>
                          </div>
                        </div>

                        {/* Special Info */}
                        {'location' in modalite && modalite.location && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 flex items-center">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              {modalite.location}
                            </p>
                          </div>
                        )}
                        
                        {'platforms' in modalite && modalite.platforms && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 flex items-center">
                              <VideoCameraIcon className="h-3 w-3 mr-1" />
                              {modalite.platforms}
                            </p>
                          </div>
                        )}

                        {'groupSize' in modalite && modalite.groupSize && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 flex items-center">
                              <UsersIcon className="h-3 w-3 mr-1" />
                              {modalite.groupSize}
                            </p>
                          </div>
                        )}

                        {'travelZone' in modalite && modalite.travelZone && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 flex items-center">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              Zone: {modalite.travelZone}
                            </p>
                          </div>
                        )}

                        {/* Advantages Preview */}
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Avantages principaux :</h4>
                          <div className="space-y-2">
                            {modalite.advantages.slice(0, 3).map((advantage, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <CheckIcon className={`h-4 w-4 text-${color}-500 mt-0.5 flex-shrink-0`} />
                                <span className="text-sm text-gray-600">{advantage}</span>
                              </div>
                            ))}
                            {modalite.advantages.length > 3 && (
                              <p className="text-xs text-gray-500 ml-6">
                                +{modalite.advantages.length - 3} autres avantages
                              </p>
                            )}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-auto">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={`w-full group-hover:bg-${color}-600 group-hover:text-white group-hover:border-${color}-600 transition-all duration-300`}
                            asChild
                          >
                            <Link href={`/modalites/${modalite.id}`}>
                              Découvrir cette modalité
                              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Comparison Section */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Comparaison des modalités
              </Heading>
              <p className="text-lg text-gray-600">
                Un aperçu rapide pour vous aider à choisir
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Modalité</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Prix</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Durée</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Idéal pour</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <MapPinIcon className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Cabinet</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-blue-600 font-semibold">60€</td>
                    <td className="px-6 py-4 text-center">60 min</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Cadre professionnel optimal</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <HomeIcon className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Domicile</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">80€</td>
                    <td className="px-6 py-4 text-center">60 min</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Familles, mobilité réduite</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <VideoCameraIcon className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">À distance</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-purple-600 font-semibold">55€</td>
                    <td className="px-6 py-4 text-center">50 min</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Flexibilité géographique</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <UsersIcon className="h-5 w-5 text-orange-600" />
                        <span className="font-medium">Groupe</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-orange-600 font-semibold">40€</td>
                    <td className="px-6 py-4 text-center">90 min</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Partage, soutien mutuel</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* Help Section */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-6">
              Besoin d'aide pour choisir ?
            </Heading>
            <p className="text-lg text-gray-600 mb-8">
              Vous hésitez entre plusieurs modalités ? Lors de notre premier échange, 
              nous discutons ensemble de la formule la plus adaptée à votre situation.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3">
                💡 Conseil professionnel
              </h3>
              <p className="text-blue-800">
                Il est tout à fait possible de combiner plusieurs modalités ou de changer 
                en cours de suivi selon l'évolution de vos besoins. L'adaptabilité est la clé 
                d'un accompagnement réussi.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-blue-600">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" className="text-3xl font-bold text-white mb-6">
              Prêt(e) à commencer votre accompagnement ?
            </Heading>
            <p className="text-xl text-blue-100 mb-8">
              Contactez-moi pour discuter de vos besoins et choisir ensemble 
              la modalité qui vous convient le mieux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
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
                <Link href="/contact">
                  Poser une question
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}