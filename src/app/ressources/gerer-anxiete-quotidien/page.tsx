import { Metadata } from 'next'
import Link from 'next/link'
import { 
  HeartIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  CheckCircleIcon,
  DocumentArrowDownIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Section, Heading, Button, Card, CardContent } from '@/components/ui'
import { LeadMagnetForm, LEAD_MAGNET_CONFIGS } from '@/components/forms/LeadMagnetForm'

export const metadata: Metadata = {
  title: 'Guide Gratuit : Gérer l\'Anxiété au Quotidien | Techniques Anti-Stress',
  description: 'Téléchargez gratuitement notre guide pratique avec 8 pages de techniques concrètes pour gérer l\'anxiété et le stress au quotidien. Méthodes validées scientifiquement.',
  keywords: [
    'gérer anxiété',
    'techniques anti-stress',
    'gestion anxiété quotidien',
    'respiration anxiété',
    'guide anxiété gratuit',
    'psychologue anxiété'
  ],
  openGraph: {
    title: 'Guide Gratuit : Gérer l\'Anxiété au Quotidien',
    description: 'Des techniques concrètes et scientifiquement prouvées pour retrouver votre sérénité.',
    type: 'website'
  }
}

const config = LEAD_MAGNET_CONFIGS['gerer-anxiete-quotidien'] || {
  title: 'Gérer l\'Anxiété au Quotidien',
  description: 'Un guide pratique pour gérer votre anxiété',
  benefits: []
}

export default function AnxieteQuotidienGuidePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <Section variant="primary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="h-10 w-10 text-blue-600" />
            </div>
            
            <Heading as="h1" variant="hero" className="mb-6">
              Guide Pratique :<br />
              <span className="text-blue-600">Gérer l'Anxiété au Quotidien</span>
            </Heading>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              <strong>8 pages</strong> de techniques concrètes et scientifiquement prouvées 
              pour retrouver votre sérénité et gérer l'anxiété naturellement.
            </p>

            {/* Indicateurs de crédibilité */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Techniques validées</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Application immédiate</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Guide professionnel</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>100% gratuit</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section technique d'urgence */}
      <Section className="bg-blue-50 border-l-4 border-blue-400">
        <div className="max-w-4xl mx-auto">
          <div className="flex">
            <LightBulbIcon className="h-8 w-8 text-blue-400 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                💡 Technique d'urgence : Respiration 4-7-8
              </h3>
              <div className="text-blue-700 space-y-2">
                <p>
                  <strong>Inspirez</strong> par le nez pendant 4 secondes → 
                  <strong>Retenez</strong> 7 secondes → 
                  <strong>Expirez</strong> par la bouche pendant 8 secondes
                </p>
                <p className="text-sm">
                  Répétez 3 fois. Cette technique active votre système nerveux parasympathique 
                  et calme naturellement l'anxiété.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contenu principal avec formulaire */}
      <Section padding="xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contenu descriptif */}
            <div>
              <Heading as="h2" variant="section" className="mb-6">
                Techniques que vous allez maîtriser
              </Heading>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mr-3">🌬️</span>
                    Techniques de respiration
                  </h3>
                  <p className="text-gray-600 text-sm">
                    3 méthodes de respiration différentes pour les situations d'urgence, 
                    la détente quotidienne et l'amélioration de la concentration.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold mr-3">🧠</span>
                    Restructuration cognitive
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Comment identifier et transformer les pensées anxieuses automatiques 
                    en pensées plus réalistes et apaisantes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold mr-3">🧘</span>
                    Techniques corporelles
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Relaxation musculaire progressive, ancrage sensoriel et exercices 
                    de mindfulness adaptés aux débutants.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold mr-3">📅</span>
                    Programme quotidien
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Routine matinale, pauses dans la journée et rituel du soir 
                    pour maintenir un état de calme durable.
                  </p>
                </div>
              </div>

              {/* Section bénéfices */}
              <div className="mt-8 bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-4">
                  ✨ Ce que vous obtiendrez en appliquant ces techniques
                </h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                    Réduction immédiate des symptômes physiques d'anxiété
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                    Meilleure qualité de sommeil et récupération
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                    Capacité à gérer le stress professionnel et personnel
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                    Confiance retrouvée face aux situations anxiogènes
                  </li>
                </ul>
              </div>

              {/* Section témoignage */}
              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">
                  💬 Message de Safa Shili, Psychologue
                </h3>
                <p className="text-blue-800 italic text-sm">
                  "L'anxiété se traite très bien avec les bonnes techniques. Ces exercices, 
                  que j'utilise régulièrement en consultation, peuvent considérablement améliorer 
                  votre qualité de vie. La clé est la pratique régulière - même 5 minutes par jour 
                  peuvent faire une différence notable."
                </p>
              </div>
            </div>

            {/* Formulaire de téléchargement */}
            <div className="lg:sticky lg:top-8">
              <LeadMagnetForm
                leadMagnetSlug="gerer-anxiete-quotidien"
                title={config.title}
                description={config.description}
                benefits={config.benefits}
                source={typeof window !== 'undefined' ? window.location.href : '/ressources/gerer-anxiete-quotidien'}
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Section de preuves scientifiques */}
      <Section variant="secondary" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            🔬 Techniques validées scientifiquement
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <strong>Respiration contrôlée</strong><br />
              Études cliniques démontrent une réduction de 40% des symptômes d'anxiété
            </div>
            <div>
              <strong>Mindfulness</strong><br />
              Recommandée par l'OMS pour la gestion du stress et de l'anxiété
            </div>
            <div>
              <strong>TCC (Thérapie Cognitive)</strong><br />
              Approche la plus efficace selon les méta-analyses internationales
            </div>
          </div>
        </div>
      </Section>

      {/* Section ressources complémentaires */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          <Heading as="h2" variant="section" className="text-center mb-8">
            Aller plus loin dans votre démarche
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <PhoneIcon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-3">Consultation personnalisée</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Thérapie cognitive et comportementale spécialisée dans l'anxiété.
                </p>
                <Link href="/rendez-vous">
                  <Button variant="primary" size="sm">
                    Prendre rendez-vous
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <ClockIcon className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-3">Première consultation</h3>
                <p className="text-gray-600 text-sm mb-4">
                  15 minutes gratuites pour évaluer vos besoins ensemble.
                </p>
                <Link href="/infos-pratiques">
                  <Button variant="outline" size="sm">
                    En savoir plus
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <DocumentArrowDownIcon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-3">Autres ressources</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Checklist consultation et guide violence conjugale.
                </p>
                <Link href="/ressources">
                  <Button variant="outline" size="sm">
                    Voir les guides
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Section urgence psychologique */}
      <Section className="bg-red-50 border-l-4 border-red-400">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-4">
              En cas de crise d'anxiété sévère
            </h3>
            <div className="text-red-700 space-y-2 text-sm">
              <p>
                <strong>SOS Amitié :</strong> 09 72 39 40 50 (24h/24, gratuit)<br />
                <strong>Suicide Écoute :</strong> 01 45 39 40 00 (24h/24)<br />
                <strong>Cabinet Safa Shili :</strong> 06 51 68 74 30
              </p>
              <p className="italic">
                Si vous ressentez des pensées suicidaires ou une détresse intense, 
                n'hésitez pas à chercher de l'aide immédiatement.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  )
}