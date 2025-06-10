import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { 
  AcademicCapIcon,
  BookOpenIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ClockIcon,
  PhoneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { Layout } from '@/components/layout'
import { Button, Section, Heading, Card, CardContent, Badge } from '@/components/ui'
import { CONTACT_INFO } from '@/lib/constants'
import { formatPhoneNumber } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'À propos - Safa Shili, Psychologue Clinicienne Spécialisée',
  description: 'Découvrez le parcours de Safa Shili, psychologue clinicienne spécialisée en violence conjugale et psychotraumatologie. Master Paris-Cité, expertise reconnue.',
  keywords: ['Safa Shili', 'psychologue formation', 'psychologue expérience', 'Paris-Cité psychologie', 'violence conjugale spécialiste'],
}

export default function AboutPage() {
  const formations = [
    {
      year: '2021',
      title: 'Master de psychologie spécialisé en psychanalyse et recherches interdisciplinaires',
      institution: 'Institut de psychologie de l\'Université de Paris-Cité',
      type: 'diplome'
    },
    {
      year: '2020', 
      title: 'Diplôme d\'État de psychologue clinicien',
      institution: 'Institut de psychologie de l\'Université de Paris-Cité',
      type: 'diplome'
    },
    {
      year: '2018',
      title: 'Licence de psychologie clinique',
      institution: 'Université Paris Diderot - Paris 7',
      type: 'diplome'
    }
  ]

  const specialisations = [
    {
      year: '2024',
      title: 'Protection de l\'enfance',
      institution: 'Association d\'entraide francilienne',
      type: 'formation'
    },
    {
      year: '2022',
      title: 'Clinique de la psychose',
      institution: 'Fondation diaconesses',
      type: 'formation'
    },
    {
      year: '2022',
      title: 'Clinique de l\'Aidant',
      institution: 'Fondation diaconnesses',
      type: 'formation'
    },
    {
      year: '2022',
      title: 'Psychologie du travail',
      institution: 'Fondation diaconnesses',
      type: 'formation'
    },
    {
      year: '2019',
      title: 'Psychiatrie et Psychothérapie institutionnelle',
      institution: 'Hôpitaux Saint Maurice',
      type: 'formation'
    },
    {
      year: '2018',
      title: 'Clinique de l\'Autisme',
      institution: 'CMPP L\'imagerie de Vitry',
      type: 'formation'
    }
  ]

  const expertises = [
    {
      title: 'Violence conjugale & familiale',
      description: 'Accompagnement spécialisé des victimes de violence avec une approche empathique et sécurisante',
      icon: ShieldCheckIcon
    },
    {
      title: 'Psychotraumatologie',
      description: 'Prise en charge des traumatismes avec des techniques adaptées (EMDR, thérapies cognitivo-comportementales)',
      icon: HeartIcon
    },
    {
      title: 'Thérapies adolescents',
      description: 'Accompagnement des jeunes en difficulté avec une approche adaptée à leur développement',
      icon: UserGroupIcon
    },
    {
      title: 'Bilans psychologiques',
      description: 'Évaluations complètes avec tests projectifs (Rorschach, TAT) pour une compréhension approfondie',
      icon: BookOpenIcon
    }
  ]

  return (
    <Layout>
      {/* Hero About */}
      <Section variant="primary" padding="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Badge variant="specialty" className="mb-4">
              Psychologue Clinicienne
            </Badge>
            
            <Heading as="h1" variant="hero" className="mb-6">
              Safa Shili
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-blue-600 font-normal mt-2">
                Mon Parcours & Mon Approche
              </span>
            </Heading>
            
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Je suis psychologue clinicienne spécialisée dans l'accompagnement des 
                adolescents, des adultes, et dans les situations de violences intrafamiliales, 
                conjugales et professionnelles.
              </p>
              
              <p>
                Diplômée d'un Master en psychologie clinique de l'Université Paris-Cité, 
                j'ai développé une expertise particulière dans la prise en charge des 
                traumatismes et l'accompagnement des victimes de violence.
              </p>
              
              <p>
                Mon approche thérapeutique s'appuie sur une écoute bienveillante, 
                une relation de confiance et des méthodes éprouvées pour vous accompagner 
                vers la guérison et la reconstruction.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Prendre Rendez-vous
                </Button>
              </Link>
              
              <Link href="/specialites">
                <Button variant="outline" size="lg">
                  Découvrir mes spécialités
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
              <picture>
                <source 
                  srcSet="/images/safa-shili-psychologue.webp" 
                  type="image/webp" 
                />
                <Image
                  src="/images/safa-shili-psychologue.jpg"
                  alt="Safa Shili dans son cabinet de psychologie à Rosny-sous-Bois"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </picture>
            </div>
          </div>
        </div>
      </Section>

      {/* Formation Timeline */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading as="h2" variant="section" className="mb-4">
              Formation Universitaire
            </Heading>
            <p className="text-xl text-gray-600">
              Un parcours académique solide à l'Université de Paris
            </p>
          </div>
          
          <div className="space-y-8">
            {formations.map((formation, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <AcademicCapIcon className="h-8 w-8 text-blue-600" />
                </div>
                
                <Card className="flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="primary" size="sm">{formation.year}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {formation.title}
                    </h3>
                    <p className="text-gray-600">{formation.institution}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Spécialisations */}
      <Section variant="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading as="h2" variant="section" className="mb-4">
              Formations Spécialisées
            </Heading>
            <p className="text-xl text-gray-600">
              Une formation continue pour une expertise toujours actualisée
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {specialisations.map((formation, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" size="sm">{formation.year}</Badge>
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {formation.title}
                  </h3>
                  <p className="text-sm text-gray-600">{formation.institution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Expertises */}
      <Section padding="xl">
        <div className="text-center mb-12">
          <Heading as="h2" variant="section" className="mb-4">
            Mes Domaines d'Expertise
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des spécialisations développées au fil des années pour un 
            accompagnement adapté à vos besoins spécifiques.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {expertises.map((expertise, index) => (
            <Card key={index} variant="service" className="p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <expertise.icon className="h-6 w-6 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900">
                  {expertise.title}
                </h3>
                
                <p className="text-gray-600">
                  {expertise.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Approche thérapeutique */}
      <Section variant="secondary" padding="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Heading as="h2" variant="section" className="mb-6">
              Mon Approche Thérapeutique
            </Heading>
            
            <div className="space-y-6 text-gray-600">
              <p className="text-lg">
                Ma pratique s'appuie sur une approche intégrative qui combine 
                différentes méthodes thérapeutiques selon vos besoins spécifiques.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Écoute bienveillante :</span> 
                    <span className="ml-1">Un espace sécurisant pour exprimer vos difficultés sans jugement</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Approche personnalisée :</span>
                    <span className="ml-1">Adaptation des méthodes à votre personnalité et vos objectifs</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Techniques éprouvées :</span>
                    <span className="ml-1">Psychanalyse, TCC, thérapies systémiques selon les besoins</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Respect du rythme :</span>
                    <span className="ml-1">Accompagnement progressif en respectant votre tempo de guérison</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Bilans Psychologiques Approfondis</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Je propose des bilans psychologiques complets incluant des tests 
                  projectifs comme le Rorschach ou le TAT, permettant une meilleure 
                  compréhension du fonctionnement psychique.
                </p>
                <Link href="/specialites/bilans-psychologiques">
                  <Button variant="outline" size="sm">
                    En savoir plus
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Modalités Flexibles</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Consultations en cabinet (Rosny-sous-Bois)</li>
                  <li>• Consultations à domicile (personnes âgées, handicap)</li>
                  <li>• Suivi à distance par message</li>
                  <li>• Thérapies de groupe en visioconférence</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section variant="primary" padding="lg">
        <div className="text-center">
          <Heading as="h2" variant="section" className="mb-4">
            Prête à Vous Accompagner
          </Heading>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contactez-moi pour une première consultation gratuite de 15 minutes 
            et découvrons ensemble comment je peux vous aider.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <PhoneIcon className="h-5 w-5 mr-2" />
                {formatPhoneNumber(CONTACT_INFO.phone)}
              </Button>
            </Link>
            
            <Link href="/infos-pratiques">
              <Button variant="outline" size="lg">
                Infos pratiques & tarifs
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  )
}