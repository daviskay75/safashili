import { Metadata } from 'next'
import Link from 'next/link'
import { 
  DocumentArrowDownIcon,
  ShieldCheckIcon,
  HeartIcon,
  ClipboardDocumentCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Section, Heading, Button, Card, CardContent } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Ressources Gratuites - Guides Psychologie | Safa Shili Psychologue',
  description: 'Téléchargez gratuitement nos guides professionnels : violence conjugale, gestion de l\'anxiété, checklist consultation. Ressources validées par une psychologue clinicienne.',
  keywords: [
    'guides psychologie gratuits',
    'ressources psychologiques',
    'aide psychologique gratuite',
    'guides violence conjugale',
    'techniques anxiété',
    'psychologue ressources'
  ]
}

const LEAD_MAGNETS = [
  {
    slug: 'sortir-violence-conjugale',
    title: 'Sortir de la Violence Conjugale',
    subtitle: 'Guide Complet - 12 pages',
    description: 'Un guide professionnel avec des étapes concrètes pour vous accompagner vers la sortie de violence en toute sécurité.',
    icon: ShieldCheckIcon,
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    benefits: [
      'Plan de sortie sécurisé',
      'Démarches légales expliquées',
      'Ressources d\'aide spécialisées',
      'Accompagnement reconstruction'
    ],
    targetAudience: 'Victimes de violence conjugale et leurs proches',
    urgent: true
  },
  {
    slug: 'gerer-anxiete-quotidien',
    title: 'Gérer l\'Anxiété au Quotidien',
    subtitle: 'Techniques Pratiques - 8 pages',
    description: 'Des techniques concrètes et scientifiquement prouvées pour retrouver votre sérénité et gérer l\'anxiété naturellement.',
    icon: HeartIcon,
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    benefits: [
      'Techniques de respiration d\'urgence',
      'Exercices de relaxation',
      'Restructuration cognitive',
      'Programme quotidien anti-anxiété'
    ],
    targetAudience: 'Personnes souffrant d\'anxiété et de stress',
    urgent: false
  },
  {
    slug: '10-signes-consultation',
    title: '10 Signes Qu\'il Faut Consulter',
    subtitle: 'Checklist Pratique - 2 pages',
    description: 'Une checklist professionnelle pour identifier si un accompagnement psychologique pourrait vous être bénéfique.',
    icon: ClipboardDocumentCheckIcon,
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
    benefits: [
      'Auto-évaluation guidée',
      'Signaux d\'alarme identifiés',
      'Conseils de préparation',
      'Types d\'accompagnement'
    ],
    targetAudience: 'Toute personne s\'interrogeant sur le besoin de consulter',
    urgent: false
  }
]

export default function RessourcesPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <Section variant="primary" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <DocumentArrowDownIcon className="h-10 w-10 text-blue-600" />
          </div>
          
          <Heading as="h1" variant="hero" className="mb-6">
            Ressources Gratuites<br />
            <span className="text-blue-600">pour Votre Bien-être</span>
          </Heading>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Des guides professionnels créés par <strong>Safa Shili, psychologue clinicienne</strong>, 
            pour vous accompagner dans votre démarche de bien-être psychologique.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              <span>Guides professionnels</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              <span>100% gratuits</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              <span>Téléchargement immédiat</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              <span>Basés sur la pratique clinique</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Guides Section */}
      <Section padding="xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {LEAD_MAGNETS.map((guide, index) => {
              const IconComponent = guide.icon
              
              return (
                <Card key={guide.slug} className={`${guide.bgColor} ${guide.borderColor} border-2 hover:shadow-xl transition-all duration-300`}>
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      {/* Icon et titre */}
                      <div className="text-center lg:text-left">
                        <div className={`w-16 h-16 ${guide.bgColor} rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-lg border-2 ${guide.borderColor}`}>
                          <IconComponent className={`h-8 w-8 ${guide.iconColor}`} />
                        </div>
                        
                        {guide.urgent && (
                          <div className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full mb-3 font-semibold">
                            URGENT - AIDE IMMÉDIATE
                          </div>
                        )}
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {guide.title}
                        </h3>
                        
                        <p className={`text-sm font-semibold ${guide.iconColor} mb-3`}>
                          {guide.subtitle}
                        </p>
                        
                        <p className="text-gray-600 text-sm">
                          {guide.description}
                        </p>
                      </div>

                      {/* Contenu et bénéfices */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Ce que vous allez apprendre :
                        </h4>
                        
                        <ul className="space-y-2 mb-6">
                          {guide.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-700">
                              <CheckCircleIcon className={`h-4 w-4 ${guide.iconColor} mr-2 flex-shrink-0`} />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-600">
                            <strong>Pour qui :</strong> {guide.targetAudience}
                          </p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="text-center">
                        <Link href={`/ressources/${guide.slug}`}>
                          <Button 
                            size="lg" 
                            className={`w-full mb-4 ${
                              guide.urgent 
                                ? 'bg-red-600 hover:bg-red-700' 
                                : 'bg-blue-600 hover:bg-blue-700'
                            } text-white font-semibold py-4 px-6`}
                          >
                            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                            Télécharger gratuitement
                          </Button>
                        </Link>
                        
                        <p className="text-xs text-gray-500">
                          ✅ Aucune carte de crédit<br />
                          ✅ Accès immédiat par email
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Section À propos */}
      <Section variant="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heading as="h2" variant="section" className="mb-6">
                Pourquoi Ces Ressources ?
              </Heading>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  En tant que psychologue clinicienne spécialisée en violence conjugale 
                  et psychotraumatologie, je rencontre quotidiennement des personnes 
                  qui ont besoin d'informations fiables et d'outils concrets.
                </p>
                
                <p>
                  Ces guides condensent des années d'expérience clinique et sont 
                  conçus pour vous donner des clés pratiques, que vous soyez en 
                  situation d'urgence ou simplement en questionnement.
                </p>
                
                <p>
                  <strong>Mon objectif :</strong> Démocratiser l'accès aux ressources 
                  psychologiques de qualité et vous accompagner dans votre démarche 
                  de bien-être.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">
                À propos de Safa Shili
              </h3>
              
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Psychologue clinicienne diplômée
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Master Psychologie Clinique - Paris-Cité
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Spécialisée violence conjugale & traumatisme
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Plus de 5 ans d'expérience clinique
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Formations continues en protection de l'enfance
                </li>
              </ul>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link href="/about">
                  <Button variant="outline" size="sm" className="w-full">
                    En savoir plus sur mon parcours
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section CTA */}
      <Section padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Besoin d'un Accompagnement Personnalisé ?
          </h3>
          
          <p className="text-lg text-gray-600 mb-8">
            Ces ressources sont un premier pas. Pour un accompagnement adapté à votre situation, 
            n'hésitez pas à prendre rendez-vous.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rendez-vous">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Prendre rendez-vous
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Poser une question
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Première consultation de 15 minutes gratuite • Remboursement par certaines mutuelles
          </p>
        </div>
      </Section>
    </Layout>
  )
}