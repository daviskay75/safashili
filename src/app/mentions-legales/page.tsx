import type { Metadata } from 'next'
import { Layout } from '@/components/layout'
import { Container, Section, Heading, Card, CardContent } from '@/components/ui'
import { CONTACT_INFO, SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Mentions Légales | ${SITE_CONFIG.name}`,
  description: 'Mentions légales du cabinet de psychologie de Safa Shili. Informations légales, conditions d\'utilisation et responsabilités.',
  robots: 'noindex, nofollow',
}

export default function MentionsLegalesPage() {
  return (
    <Layout>
      <Section className="pt-20 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading as="h1" className="text-4xl font-bold text-gray-900 mb-8">
              Mentions Légales
            </Heading>

            <div className="space-y-8">
              {/* Éditeur du site */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Éditeur du site
                  </Heading>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Nom :</strong> Safa Shili</p>
                    <p><strong>Profession :</strong> Psychologue Clinicienne</p>
                    <p><strong>Numéro ADELI :</strong> [À compléter avec le numéro réel]</p>
                    <p><strong>Diplôme :</strong> Master en Psychologie Clinique - Université Paris-Cité</p>
                    <p><strong>Adresse :</strong> {CONTACT_INFO.address.street}, {CONTACT_INFO.address.zipCode} {CONTACT_INFO.address.city}</p>
                    <p><strong>Téléphone :</strong> {CONTACT_INFO.phone}</p>
                    <p><strong>Email :</strong> {CONTACT_INFO.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Hébergement */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Hébergement du site
                  </Heading>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Hébergeur :</strong> Render Services, Inc.</p>
                    <p><strong>Adresse :</strong> 525 Brannan Street, Suite 300, San Francisco, CA 94107, États-Unis</p>
                    <p><strong>Site web :</strong> <a href="https://render.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">render.com</a></p>
                  </div>
                </CardContent>
              </Card>

              {/* Conditions d'utilisation */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Conditions d'utilisation
                  </Heading>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Objet du site</h3>
                      <p>Ce site internet a pour objet de présenter l'activité professionnelle de Safa Shili, psychologue clinicienne, et de permettre la prise de rendez-vous pour des consultations psychologiques.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Utilisation du site</h3>
                      <p>L'utilisation de ce site implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. L'utilisateur s'engage à faire un usage conforme aux lois en vigueur et aux présentes conditions d'utilisation.</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Contenu du site</h3>
                      <p>Les informations contenues sur ce site sont données à titre indicatif et sont susceptibles d'évoluer. Le contenu de ce site ne constitue en aucun cas un avis médical ou psychologique personnalisé.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Propriété intellectuelle */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Propriété intellectuelle
                  </Heading>
                  <div className="space-y-4 text-gray-700">
                    <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
                    
                    <p>La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de publication.</p>
                    
                    <p>Les marques et logos reproduits sur ce site sont déposés par les sociétés qui en sont propriétaires.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Responsabilité */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Responsabilité
                  </Heading>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Limitation de responsabilité</h3>
                      <p>Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Disponibilité du site</h3>
                      <p>Safa Shili s'efforce de permettre l'accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d'un événement hors du contrôle de Safa Shili, et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement du site.</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Liens hypertextes</h3>
                      <p>Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site. Il est possible qu'un de ces liens ne fonctionne pas correctement et que la page ne s'affiche pas.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Secret professionnel */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Secret professionnel et déontologie
                  </Heading>
                  <div className="space-y-4 text-gray-700">
                    <p>Safa Shili, psychologue clinicienne, est tenue au respect du secret professionnel conformément à l'article 226-13 du Code pénal et au Code de déontologie des psychologues (mars 2012).</p>
                    
                    <p>Toute information communiquée dans le cadre d'une consultation psychologique est strictement confidentielle et ne peut être divulguée sans l'accord explicite du patient, sauf dans les cas prévus par la loi.</p>
                    
                    <p>Les échanges électroniques via ce site (formulaires de contact, prise de rendez-vous) sont sécurisés et soumis au même secret professionnel.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Protection des données */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Protection des données personnelles
                  </Heading>
                  <div className="space-y-4 text-gray-700">
                    <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi "Informatique et Libertés", vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.</p>
                    
                    <p>Pour exercer ces droits ou pour toute question relative au traitement de vos données, vous pouvez nous contacter :</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Par email : {CONTACT_INFO.email}</li>
                      <li>Par téléphone : {CONTACT_INFO.phone}</li>
                      <li>Par courrier : {CONTACT_INFO.address.street}, {CONTACT_INFO.address.zipCode} {CONTACT_INFO.address.city}</li>
                    </ul>
                    
                    <p>Pour plus d'informations, consultez notre <a href="/confidentialite" className="text-blue-600 hover:underline">politique de confidentialité</a> et notre page dédiée au <a href="/rgpd" className="text-blue-600 hover:underline">RGPD</a>.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Droit applicable */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Droit applicable et juridiction
                  </Heading>
                  <div className="space-y-4 text-gray-700">
                    <p>Tout litige en relation avec l'utilisation du site est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Bobigny.</p>
                    
                    <p>Si une partie de ce document devait s'avérer illégale, invalide ou inapplicable pour quelque raison que ce soit, les dispositions en question seraient exclues et n'affecteraient pas la validité et l'applicabilité des dispositions restantes.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Contact
                  </Heading>
                  <div className="space-y-2 text-gray-700">
                    <p>Pour toute question concernant ces mentions légales, vous pouvez nous contacter :</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Email : {CONTACT_INFO.email}</li>
                      <li>Téléphone : {CONTACT_INFO.phone}</li>
                      <li>Adresse : {CONTACT_INFO.address.street}, {CONTACT_INFO.address.zipCode} {CONTACT_INFO.address.city}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Dernière mise à jour */}
              <div className="text-center text-gray-500 text-sm">
                <p>Dernière mise à jour : Janvier 2025</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}