import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  ShieldCheckIcon,
  HeartIcon,
  UserGroupIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Button, Card, CardContent, Container, Section, Heading, Badge } from '@/components/ui'
import { SERVICES, SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Mes Spécialités | ${SITE_CONFIG.name}`,
  description: 'Découvrez toutes mes spécialités : violence conjugale, psychotraumatologie, thérapie adolescents, accompagnement adultes et souffrance au travail. Expertise en psychologie clinique.',
  keywords: [
    'spécialités psychologue',
    'violence conjugale',
    'psychotraumatologie', 
    'thérapie adolescents',
    'accompagnement adultes',
    'souffrance travail',
    'bilans psychologiques',
    'Rosny-sous-Bois',
    'Seine-Saint-Denis'
  ],
  openGraph: {
    title: 'Mes Spécialités - Safa Shili Psychologue',
    description: 'Découvrez toutes mes spécialités en psychologie clinique : violence conjugale, psychotraumatologie, thérapie adolescents et accompagnement adultes.',
    type: 'website',
  },
}

export default function SpecialitesPage() {
  const iconMap = {
    'shield-check': ShieldCheckIcon,
    'heart': HeartIcon,
    'academic-cap': UserGroupIcon,
    'user': UserGroupIcon,
    'briefcase': BriefcaseIcon,
    'document-text': DocumentTextIcon,
  }

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="specialty" className="mb-6">
              Expertises cliniques
            </Badge>
            <Heading as="h1" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Mes Spécialités
            </Heading>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Un accompagnement psychologique spécialisé adapté à vos besoins spécifiques, 
              avec une expertise particulière dans la violence, les traumatismes et les difficultés relationnelles.
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Psychologue clinicienne diplômée, je vous propose des prises en charge 
              individualisées basées sur des approches thérapeutiques éprouvées et une 
              écoute bienveillante.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section className="py-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Domaines d'expertise
              </Heading>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Chaque spécialité fait l'objet d'une approche personnalisée, 
                adaptée à votre situation et à vos besoins thérapeutiques.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap] || ShieldCheckIcon
                
                return (
                  <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-8 w-8 text-blue-600" />
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
                          <span className="font-medium">{service.duration} min</span>
                          <span>•</span>
                          <span className="font-semibold text-blue-600">{service.price}€</span>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                          asChild
                        >
                          <Link href={`/specialites/${service.id}`}>
                            Découvrir cette spécialité
                            <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Approach Section */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-3xl font-bold text-gray-900 mb-4">
                Mon Approche Thérapeutique
              </Heading>
              <p className="text-lg text-gray-600">
                Une méthode intégrative adaptée à chaque problématique
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white border-blue-200">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Écoute empathique et non-jugeante
                      </h3>
                      <p className="text-gray-600">
                        Créer un espace de confiance où vous pouvez vous exprimer 
                        librement sur vos difficultés et vos ressentis.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-200">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Approches thérapeutiques variées
                      </h3>
                      <p className="text-gray-600">
                        Techniques psychodynamiques, cognitivo-comportementales et 
                        systémiques selon vos besoins spécifiques.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-200">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Accompagnement personnalisé
                      </h3>
                      <p className="text-gray-600">
                        Chaque suivi est adapté à votre rythme, vos objectifs et 
                        votre situation personnelle et familiale.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-blue-200">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Confidentialité absolue
                      </h3>
                      <p className="text-gray-600">
                        Respect strict du secret professionnel et de la 
                        déontologie du psychologue clinicien.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-blue-600">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" className="text-3xl font-bold text-white mb-6">
              Trouvez la spécialité qui correspond à vos besoins
            </Heading>
            <p className="text-xl text-blue-100 mb-8">
              Chaque problématique mérite une expertise spécifique. 
              Découvrez comment je peux vous accompagner dans votre parcours thérapeutique.
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
                <Link href="/about">
                  Découvrir mon parcours
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}