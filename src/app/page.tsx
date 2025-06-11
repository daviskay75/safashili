import Image from 'next/image'
import Link from 'next/link'
import { 
  PhoneIcon, 
  MapPinIcon,
  StarIcon,
  ShieldCheckIcon,
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentArrowDownIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Button, Section, Heading, Card, CardContent, Badge, Testimonials, FAQ } from '@/components/ui'
import { CONTACT_INFO, SERVICES, TESTIMONIALS, FAQS } from '@/lib/constants'
import { formatPhoneNumber } from '@/lib/utils'

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <Section variant="primary" padding="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="specialty" className="mb-4">
              Spécialisée Violence & Traumatisme
            </Badge>
            
            <Heading as="h1" variant="hero" className="mb-6">
              Safa Shili
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-blue-600 font-normal mt-2">
                Psychologue Clinicienne
              </span>
            </Heading>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Accompagnement psychologique spécialisé en <strong>violence conjugale</strong>, 
              <strong> psychotraumatologie</strong> et <strong>thérapies individuelles</strong> 
              à Rosny-sous-Bois et communes limitrophes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/rendez-vous">
                <Button size="lg" className="w-full sm:w-auto">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Prendre Rendez-vous
                </Button>
              </Link>
              
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Découvrir mon approche
                </Button>
              </Link>
            </div>
            
            {/* Contact rapide */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <PhoneIcon className="h-4 w-4 mr-2" />
                <span>{formatPhoneNumber(CONTACT_INFO.phone)}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-2" />
                <span>Rosny-sous-Bois (93110)</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-2" />
                <span>Du lundi au samedi</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
              <picture>
                <source 
                  srcSet="/images/safa-shili-psychologue.webp" 
                  type="image/webp" 
                />
                <Image
                  src="/images/safa-shili-psychologue.jpg"
                  alt="Safa Shili, psychologue clinicienne spécialisée en violence conjugale et psychotraumatologie"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </picture>
            </div>
            
            {/* Badges flottants */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3">
              <div className="flex items-center space-x-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-1">Avis patients</p>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white rounded-lg shadow-lg p-3">
              <p className="font-semibold">PSYCHOLOGUE</p>
              <p className="text-xs">DIPLOMÉE DE L'UNIVERSITÉ DE PARIS</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Lead Magnet Section */}
      <Section variant="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <ClipboardDocumentCheckIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <Badge variant="specialty" className="bg-purple-100 text-purple-800">
                    Guide Gratuit
                  </Badge>
                </div>
                
                <Heading as="h2" variant="section" className="mb-4">
                  Ai-je besoin d'une consultation ?
                </Heading>
                
                <p className="text-gray-600 mb-6">
                  <strong>Vous vous posez des questions</strong> sur votre état psychologique ? 
                  Téléchargez notre <strong>checklist professionnelle</strong> pour identifier 
                  si un accompagnement pourrait vous être bénéfique.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Auto-évaluation guidée en 10 points</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Signaux d'alarme à ne pas ignorer</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Conseils pour préparer votre première consultation</span>
                  </div>
                </div>
                
                <Link href="/ressources/10-signes-consultation">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                    Télécharger le guide gratuit
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Checklist Consultation</h3>
                    <span className="text-purple-600 font-semibold">GRATUIT</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-100 rounded mr-2"></div>
                      <span className="text-sm text-gray-600">✓ Évaluation objective</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-100 rounded mr-2"></div>
                      <span className="text-sm text-gray-600">✓ Signaux d'alarme</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-100 rounded mr-2"></div>
                      <span className="text-sm text-gray-600">✓ Types d'accompagnement</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 border-t pt-3">
                    Par Safa Shili, Psychologue Clinicienne
                  </div>
                </div>
                
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  2 pages
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section padding="xl">
        <div className="text-center mb-12">
          <Heading as="h2" variant="section" className="mb-4">
            Mes Spécialités
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un accompagnement personnalisé pour chaque problématique, 
            avec une expertise particulière dans les situations de violence et de traumatisme.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const icons = {
              'shield-check': ShieldCheckIcon,
              'heart': HeartIcon,
              'academic-cap': UserGroupIcon,
              'user': UserGroupIcon,
              'briefcase': ShieldCheckIcon,
              'document-text': HeartIcon,
            }
            const IconComponent = icons[service.icon as keyof typeof icons] || ShieldCheckIcon
            
            return (
              <Card key={service.id} variant="service" className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>{service.duration}min</span>
                    <span>•</span>
                    <span>{service.price}€</span>
                  </div>
                  
                  <Link href={`/specialites/${service.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      En savoir plus
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Section>

      {/* About Preview */}
      <Section variant="secondary" padding="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Heading as="h2" variant="section" className="mb-6">
              Une Approche Professionnelle et Bienveillante
            </Heading>
            
            <div className="space-y-6 text-gray-600">
              <p className="text-lg">
                Diplômée d'un Master en psychologie clinique de l'Université Paris-Cité, 
                je vous accompagne avec une expertise particulière dans la prise en charge 
                des violences et traumatismes.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Spécialisation en violence conjugale et familiale</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Expertise en psychotraumatologie et accompagnement des victimes</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Formations continues en protection de l'enfance</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Approche adaptée aux adolescents et adultes</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/about">
                <Button variant="primary">
                  Découvrir mon parcours
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Formation Universitaire</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Master Psychologie Clinique - Paris-Cité (2021)</li>
                  <li>• Diplôme d'État Psychologue Clinicien (2020)</li>
                  <li>• Licence Psychologie Clinique - Paris 7 (2018)</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Formations Spécialisées</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Protection de l'enfance (2024)</li>
                  <li>• Clinique de la psychose (2022)</li>
                  <li>• Psychologie du travail (2022)</li>
                  <li>• Clinique de l'Autisme (2018)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section padding="xl">
        <div className="text-center mb-12">
          <Heading as="h2" variant="section" className="mb-4">
            Ce Que Disent Mes Patients
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de personnes que j'ai accompagnées 
            dans leur parcours de guérison et de reconstruction.
          </p>
        </div>
        
        <Testimonials testimonials={TESTIMONIALS} />
      </Section>

      {/* FAQ Section */}
      <Section variant="secondary" padding="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Heading as="h2" variant="section" className="mb-6">
              Questions Fréquentes
            </Heading>
            <p className="text-lg text-gray-600 mb-8">
              Vous vous posez des questions sur le déroulement des consultations, 
              les tarifs ou mon approche thérapeutique ? Voici les réponses aux 
              questions les plus fréquentes.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Première consultation gratuite de 15min</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Consultations en cabinet, à domicile ou à distance</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Remboursement par de nombreuses mutuelles</span>
              </div>
            </div>
          </div>
          
          <div>
            <FAQ faqs={FAQS} />
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="primary" padding="lg">
        <div className="text-center">
          <Heading as="h2" variant="section" className="mb-4">
            Prêt(e) à Commencer Votre Accompagnement ?
          </Heading>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Prenez rendez-vous dès aujourd'hui pour une première consultation 
            ou contactez-moi pour toute question.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rendez-vous">
              <Button size="lg">
                <PhoneIcon className="h-5 w-5 mr-2" />
                Prendre Rendez-vous
              </Button>
            </Link>
            
            <Link href="/infos-pratiques">
              <Button variant="outline" size="lg">
                Infos pratiques
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Consultation remboursée par certaines mutuelles • Première consultation gratuite de 15min
          </p>
        </div>
      </Section>
    </Layout>
  )
}