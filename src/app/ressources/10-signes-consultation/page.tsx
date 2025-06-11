import { Metadata } from 'next'
import Link from 'next/link'
import { 
  ClipboardDocumentCheckIcon, 
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
  title: 'Guide Gratuit : 10 Signes Qu\'il Faut Consulter un Psychologue | Checklist',
  description: 'Téléchargez gratuitement notre checklist professionnelle pour identifier si un accompagnement psychologique pourrait vous être bénéfique. Auto-évaluation guidée.',
  keywords: [
    '10 signes consulter psychologue',
    'quand consulter psychologue',
    'checklist consultation psychologique',
    'auto-évaluation psychologique',
    'besoin psychologue',
    'signaux d\'alarme mental'
  ],
  openGraph: {
    title: 'Guide Gratuit : 10 Signes Qu\'il Faut Consulter un Psychologue',
    description: 'Une checklist pratique et professionnelle pour identifier si un accompagnement psychologique pourrait vous être bénéfique.',
    type: 'website'
  }
}

const config = LEAD_MAGNET_CONFIGS['10-signes-consultation'] || {
  title: '10 Signes Qu\'il Faut Consulter',
  description: 'Une checklist pour identifier vos besoins',
  benefits: []
}

export default function SignesConsultationGuidePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <Section variant="primary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ClipboardDocumentCheckIcon className="h-10 w-10 text-purple-600" />
            </div>
            
            <Heading as="h1" variant="hero" className="mb-6">
              Checklist Gratuite :<br />
              <span className="text-purple-600">10 Signes Qu'il Faut Consulter</span>
            </Heading>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Une <strong>checklist pratique</strong> créée par une psychologue clinicienne 
              pour vous aider à identifier si un accompagnement psychologique pourrait vous être bénéfique.
            </p>

            {/* Indicateurs de crédibilité */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Auto-évaluation guidée</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Checklist professionnelle</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>100% gratuit</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>2 pages concises</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section question d'urgence */}
      <Section className="bg-purple-50 border-l-4 border-purple-400">
        <div className="max-w-4xl mx-auto">
          <div className="flex">
            <LightBulbIcon className="h-8 w-8 text-purple-400 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                💡 Question du jour : "Ai-je besoin d'aide ?"
              </h3>
              <div className="text-purple-700 space-y-2">
                <p>
                  Vous vous posez des questions sur votre état psychologique ? 
                  Cette checklist vous donnera des <strong>repères clairs et objectifs</strong>.
                </p>
                <p className="text-sm">
                  Parfois, un regard extérieur professionnel peut faire toute la différence 
                  pour retrouver votre équilibre.
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
                Ce que vous allez découvrir
              </Heading>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold mr-3">✓</span>
                    Signaux d'alarme à identifier
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Les 10 indicateurs les plus fiables selon la recherche clinique 
                    pour détecter un besoin d'accompagnement psychologique.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mr-3">📋</span>
                    Auto-évaluation structurée
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Une méthode simple et objective pour évaluer votre état psychologique 
                    actuel sans jugement.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold mr-3">🎯</span>
                    Différents types d'accompagnement
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Comprendre les différentes approches thérapeutiques et choisir 
                    celle qui correspond le mieux à vos besoins.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold mr-3">🚀</span>
                    Comment franchir le pas
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Des conseils pratiques pour préparer votre première consultation 
                    et dépasser les appréhensions naturelles.
                  </p>
                </div>
              </div>

              {/* Section situations courantes */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">
                  🤔 Situations fréquentes qui motivent une consultation
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                    Anxiété persistante qui impacte votre quotidien
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                    Difficultés relationnelles répétitives
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                    Tristesse profonde qui ne passe pas
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                    Traumatisme non résolu
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                    Besoin de faire le point sur sa vie
                  </li>
                </ul>
              </div>

              {/* Section témoignage */}
              <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-3">
                  💬 Message de Safa Shili, Psychologue
                </h3>
                <p className="text-purple-800 italic text-sm">
                  "Beaucoup de personnes se demandent si elles ont 'vraiment besoin' 
                  d'une consultation. Cette checklist vous aide à objectiver cette question. 
                  N'oubliez pas : prendre soin de sa santé mentale, c'est un acte de courage 
                  et de bienveillance envers soi-même."
                </p>
              </div>
            </div>

            {/* Formulaire de téléchargement */}
            <div className="lg:sticky lg:top-8">
              <LeadMagnetForm
                leadMagnetSlug="10-signes-consultation"
                title={config.title}
                description={config.description}
                benefits={config.benefits}
                source={typeof window !== 'undefined' ? window.location.href : '/ressources/10-signes-consultation'}
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Section démystification */}
      <Section variant="secondary" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            🔍 Idées reçues sur la consultation psychologique
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <strong className="text-red-600">❌ "Il faut être fou"</strong><br />
              La majorité des consultants sont des personnes qui traversent 
              des difficultés passagères ou cherchent à mieux se connaître.
            </div>
            <div>
              <strong className="text-red-600">❌ "C'est pour les faibles"</strong><br />
              Demander de l'aide demande du courage. C'est un signe de force 
              et d'intelligence émotionnelle.
            </div>
            <div>
              <strong className="text-red-600">❌ "Ça va passer tout seul"</strong><br />
              Certaines difficultés nécessitent un accompagnement professionnel 
              pour être résolues durablement.
            </div>
          </div>
        </div>
      </Section>

      {/* Section ressources complémentaires */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          <Heading as="h2" variant="section" className="text-center mb-8">
            Prochaines étapes dans votre démarche
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <PhoneIcon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-3">Première consultation</h3>
                <p className="text-gray-600 text-sm mb-4">
                  15 minutes gratuites pour faire connaissance et évaluer vos besoins.
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
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-3">Questions et conseils</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Posez vos questions sans engagement via notre formulaire de contact.
                </p>
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Poser une question
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <DocumentArrowDownIcon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-3">Autres ressources</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Guides anxiété et violence conjugale pour approfondir.
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

      {/* Section contact professionnel */}
      <Section className="bg-gray-900 text-white" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">
            Un questionnement sur votre bien-être ?
          </h3>
          <p className="text-gray-300 mb-6">
            N'hésitez pas à prendre contact pour un échange sans engagement. 
            Chaque démarche est unique et mérite d'être accueillie avec bienveillance.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div>
              <strong>Cabinet :</strong> 06 51 68 74 30
            </div>
            <div>
              <strong>Email :</strong> contact@safashili.com
            </div>
            <div>
              <strong>Urgences :</strong> 3919 (Violences Info) • 01 45 39 40 00 (Suicide Écoute)
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  )
}