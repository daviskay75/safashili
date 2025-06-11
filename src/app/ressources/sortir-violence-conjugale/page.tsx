import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ShieldCheckIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Section, Heading, Button, Card, CardContent } from '@/components/ui'
import { LeadMagnetForm, LEAD_MAGNET_CONFIGS } from '@/components/forms/LeadMagnetForm'

export const metadata: Metadata = {
  title: 'Guide Gratuit : Sortir de la Violence Conjugale | Safa Shili Psychologue',
  description: 'Téléchargez gratuitement notre guide professionnel pour sortir de la violence conjugale. 12 pages de conseils pratiques, démarches légales et ressources d\'aide.',
  keywords: [
    'violence conjugale',
    'sortir violence conjugale',
    'guide violence conjugale',
    'aide violence conjugale',
    'psychologue violence conjugale',
    'guide gratuit violence'
  ],
  openGraph: {
    title: 'Guide Gratuit : Sortir de la Violence Conjugale',
    description: 'Un guide professionnel avec des étapes concrètes pour vous accompagner vers la sortie de violence.',
    type: 'website'
  }
}

const config = LEAD_MAGNET_CONFIGS['sortir-violence-conjugale'] || {
  title: 'Sortir de la Violence Conjugale',
  description: 'Un guide complet pour vous accompagner',
  benefits: []
}

export default function ViolenceConjugaleGuidePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <Section variant="primary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon className="h-10 w-10 text-red-600" />
            </div>
            
            <Heading as="h1" variant="hero" className="mb-6">
              Guide Gratuit :<br />
              <span className="text-red-600">Sortir de la Violence Conjugale</span>
            </Heading>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Un guide professionnel de <strong>12 pages</strong> avec des ressources concrètes, 
              des étapes pratiques et des contacts d'aide pour vous accompagner vers la sortie de violence.
            </p>

            {/* Indicateurs de crédibilité */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Guide professionnel</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>100% gratuit</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Téléchargement immédiat</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Confidentiel</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section d'urgence */}
      <Section className="bg-red-50 border-l-4 border-red-400">
        <div className="max-w-4xl mx-auto">
          <div className="flex">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-400 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                En cas de danger immédiat
              </h3>
              <div className="text-red-700 space-y-2">
                <p>
                  <strong>3919</strong> - Violences Femmes Info (gratuit, anonyme, 24h/24)
                </p>
                <p>
                  <strong>15</strong> - SAMU pour urgence médicale | <strong>17</strong> - Police/Gendarmerie
                </p>
                <p className="text-sm">
                  Vous n'êtes pas seule. De l'aide professionnelle existe.
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
                    <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">1</span>
                    Reconnaître la violence
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Les différents types de violence (physique, psychologique, sexuelle, économique) 
                    et comment identifier les signes d'emprise.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold mr-3">2</span>
                    Préparer votre sortie
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Plan de sécurité personnalisé, documents à préparer, lieux de refuge 
                    et stratégies de protection.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mr-3">3</span>
                    Vos droits légaux
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Démarches juridiques, ordonnance de protection, dépôt de plainte 
                    et aide juridictionnelle.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold mr-3">4</span>
                    Reconstruction
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Accompagnement psychologique, réinsertion sociale et professionnelle, 
                    prévention de la rechute.
                  </p>
                </div>
              </div>

              {/* Section témoignage */}
              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">
                  💬 Message de Safa Shili, Psychologue
                </h3>
                <p className="text-blue-800 italic text-sm">
                  "La violence conjugale n'est jamais de votre faute. Sortir de cette situation 
                  est possible avec les bonnes informations et le bon accompagnement. Ce guide 
                  vous donnera les clés pour reprendre le contrôle de votre vie en toute sécurité."
                </p>
              </div>
            </div>

            {/* Formulaire de téléchargement */}
            <div className="lg:sticky lg:top-8">
              <LeadMagnetForm
                leadMagnetSlug="sortir-violence-conjugale"
                title={config.title}
                description={config.description}
                benefits={config.benefits}
                source={typeof window !== 'undefined' ? window.location.href : '/ressources/sortir-violence-conjugale'}
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Section ressources complémentaires */}
      <Section variant="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <Heading as="h2" variant="section" className="text-center mb-8">
            Ressources complémentaires
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <PhoneIcon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-3">Consultation spécialisée</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Accompagnement psychologique personnalisé pour sortir de la violence.
                </p>
                <Link href="/rendez-vous">
                  <Button variant="outline" size="sm">
                    Prendre rendez-vous
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-3">Écoute et soutien</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Besoin de parler ? Contactez-moi pour un premier échange.
                </p>
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Me contacter
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <DocumentArrowDownIcon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-3">Autres guides</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Découvrez nos autres ressources pour votre bien-être.
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

      {/* Section contact d'urgence final */}
      <Section className="bg-gray-900 text-white" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">
            Vous n'êtes pas seule
          </h3>
          <p className="text-gray-300 mb-6">
            Si vous vous trouvez en situation de danger, n'hésitez pas à demander de l'aide immédiatement.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div>
              <strong>3919</strong> - Violences Femmes Info (24h/24)
            </div>
            <div>
              <strong>119</strong> - Allô Enfance en Danger
            </div>
            <div>
              <strong>06 51 68 74 30</strong> - Cabinet Safa Shili
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  )
}