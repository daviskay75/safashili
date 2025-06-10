import type { Metadata } from 'next'
import { Layout } from '@/components/layout'
import { Container, Section, Heading, Card, CardContent, Badge } from '@/components/ui'
import { CONTACT_INFO, SITE_CONFIG } from '@/lib/constants'
import { ShieldCheckIcon, EyeSlashIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: `Politique de Confidentialité | ${SITE_CONFIG.name}`,
  description: 'Politique de confidentialité et protection des données personnelles du cabinet de psychologie de Safa Shili. Respect du RGPD et du secret professionnel.',
  robots: 'noindex, nofollow',
}

export default function ConfidentialitePage() {
  return (
    <Layout>
      <Section className="pt-20 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <ShieldCheckIcon className="h-4 w-4 mr-2" />
                Protection des données
              </Badge>
              <Heading as="h1" className="text-4xl font-bold text-gray-900 mb-6">
                Politique de Confidentialité
              </Heading>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Votre confidentialité et la protection de vos données personnelles sont au cœur de ma pratique professionnelle. 
                Cette politique détaille comment vos informations sont collectées, utilisées et protégées.
              </p>
            </div>

            <div className="space-y-8">
              {/* Engagement de confidentialité */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <LockClosedIcon className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <Heading as="h2" className="text-xl font-semibold text-blue-900 mb-3">
                        Engagement de confidentialité absolue
                      </Heading>
                      <p className="text-blue-800">
                        En tant que psychologue clinicienne, je suis tenue au <strong>secret professionnel</strong> 
                        conformément à l'article 226-13 du Code pénal et au Code de déontologie des psychologues. 
                        Toutes vos informations sont strictement confidentielles et protégées.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Responsable du traitement */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Responsable du traitement des données
                  </Heading>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Responsable :</strong> Safa Shili, Psychologue Clinicienne</p>
                    <p><strong>Adresse :</strong> {CONTACT_INFO.address.street}, {CONTACT_INFO.address.zipCode} {CONTACT_INFO.address.city}</p>
                    <p><strong>Email :</strong> {CONTACT_INFO.email}</p>
                    <p><strong>Téléphone :</strong> {CONTACT_INFO.phone}</p>
                    <p><strong>Numéro ADELI :</strong> [À compléter avec le numéro réel]</p>
                  </div>
                </CardContent>
              </Card>

              {/* Données collectées */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Données personnelles collectées
                  </Heading>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">1. Données d'identification et de contact</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>Nom et prénom</li>
                        <li>Date de naissance</li>
                        <li>Adresse postale</li>
                        <li>Numéro de téléphone</li>
                        <li>Adresse email</li>
                        <li>Profession</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">2. Données de santé (avec votre consentement explicite)</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>Motif de consultation</li>
                        <li>Informations médicales pertinentes</li>
                        <li>Antécédents psychologiques</li>
                        <li>Notes de séances thérapeutiques</li>
                        <li>Résultats de tests psychologiques</li>
                        <li>Correspondances avec d'autres professionnels de santé</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">3. Données techniques (site web)</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li>Adresse IP (anonymisée)</li>
                        <li>Données de navigation (pages visitées, durée)</li>
                        <li>Type de navigateur et système d'exploitation</li>
                        <li>Cookies techniques nécessaires au fonctionnement du site</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Finalités du traitement */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Finalités du traitement
                  </Heading>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">Prise en charge thérapeutique</h3>
                      <p className="text-green-800 text-sm">
                        Assurer votre suivi psychologique, établir un diagnostic, élaborer un plan de traitement 
                        et assurer la continuité des soins.
                      </p>
                      <p className="text-green-700 text-xs mt-2">
                        <strong>Base légale :</strong> Consentement explicite + Intérêt vital (santé)
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Gestion administrative</h3>
                      <p className="text-blue-800 text-sm">
                        Planification des rendez-vous, facturation, suivi des paiements et communication 
                        avec les patients.
                      </p>
                      <p className="text-blue-700 text-xs mt-2">
                        <strong>Base légale :</strong> Exécution d'un contrat
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h3 className="font-medium text-purple-900 mb-2">Obligations légales</h3>
                      <p className="text-purple-800 text-sm">
                        Respect des obligations professionnelles, conservation des dossiers patients, 
                        déclarations obligatoires si nécessaire.
                      </p>
                      <p className="text-purple-700 text-xs mt-2">
                        <strong>Base légale :</strong> Obligation légale
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <h3 className="font-medium text-orange-900 mb-2">Amélioration du site web</h3>
                      <p className="text-orange-800 text-sm">
                        Analyse anonyme du trafic, amélioration de l'expérience utilisateur, 
                        optimisation du contenu.
                      </p>
                      <p className="text-orange-700 text-xs mt-2">
                        <strong>Base légale :</strong> Intérêt légitime
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Destinataires des données */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Destinataires et accès aux données
                  </Heading>
                  
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Accès principal</h3>
                      <p>Seule <strong>Safa Shili</strong>, psychologue clinicienne, a accès à vos données personnelles et de santé dans le cadre de votre prise en charge.</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Partage exceptionnel (avec votre accord explicite)</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Autres professionnels de santé dans le cadre de soins coordonnés</li>
                        <li>Superviseur ou intervisant (données anonymisées)</li>
                        <li>Experts judiciaires (uniquement sur ordonnance du juge)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Prestataires techniques (données anonymisées)</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Hébergeur du site web (Render Services, Inc.)</li>
                        <li>Service de messagerie sécurisée (Resend)</li>
                        <li>Système de sauvegarde sécurisée</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        <strong>Important :</strong> Aucune donnée de santé n'est jamais transmise à des tiers 
                        sans votre consentement explicite, sauf obligation légale stricte.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Durée de conservation */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Durée de conservation des données
                  </Heading>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-medium text-blue-900 mb-2">Dossier patient actif</h3>
                        <p className="text-blue-800 text-sm">
                          Durée du suivi + 20 ans minimum (Code de la santé publique)
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-medium text-green-900 mb-2">Données de contact</h3>
                        <p className="text-green-800 text-sm">
                          3 ans après le dernier contact (sauf demande de suppression)
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h3 className="font-medium text-purple-900 mb-2">Données de navigation</h3>
                        <p className="text-purple-800 text-sm">
                          13 mois maximum (CNIL)
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <h3 className="font-medium text-orange-900 mb-2">Données comptables</h3>
                        <p className="text-orange-800 text-sm">
                          10 ans (Code de commerce)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Suppression automatique</h3>
                      <p className="text-gray-700 text-sm">
                        Les données sont automatiquement supprimées à l'expiration des délais légaux, 
                        sauf demande de votre part pour une suppression anticipée (dans le respect des obligations légales).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sécurité des données */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Sécurité et protection des données
                  </Heading>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-medium text-green-900 mb-2">🔐 Chiffrement</h3>
                        <p className="text-green-800 text-sm">
                          Toutes les communications sont chiffrées (HTTPS/TLS). Les données sensibles sont 
                          stockées de manière chiffrée.
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-medium text-blue-900 mb-2">🔒 Accès sécurisé</h3>
                        <p className="text-blue-800 text-sm">
                          Authentification forte, accès limité aux seules personnes autorisées, 
                          journalisation des accès.
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h3 className="font-medium text-purple-900 mb-2">💾 Sauvegarde</h3>
                        <p className="text-purple-800 text-sm">
                          Sauvegardes automatiques quotidiennes, stockage sécurisé, 
                          plan de continuité d'activité.
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <h3 className="font-medium text-orange-900 mb-2">🛡️ Confidentialité</h3>
                        <p className="text-orange-800 text-sm">
                          Bureau sécurisé, armoires verrouillées, écrans non visibles, 
                          destruction sécurisée des documents.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Formation et sensibilisation</h3>
                      <p className="text-gray-700 text-sm">
                        Formation continue sur la protection des données, mise à jour régulière des pratiques 
                        de sécurité, conformément aux meilleures pratiques du secteur de la santé.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vos droits */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Vos droits sur vos données personnelles
                  </Heading>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 mb-4">
                      Conformément au RGPD et à la loi "Informatique et Libertés", vous disposez des droits suivants :
                    </p>

                    <div className="grid gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-medium text-blue-900 mb-2">✅ Droit d'accès</h3>
                        <p className="text-blue-800 text-sm">
                          Obtenir une copie de toutes vos données personnelles et informations sur leur traitement.
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-medium text-green-900 mb-2">✏️ Droit de rectification</h3>
                        <p className="text-green-800 text-sm">
                          Corriger ou mettre à jour vos données personnelles inexactes ou incomplètes.
                        </p>
                      </div>

                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="font-medium text-red-900 mb-2">🗑️ Droit d'effacement</h3>
                        <p className="text-red-800 text-sm">
                          Demander la suppression de vos données (dans le respect des obligations légales de conservation).
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h3 className="font-medium text-purple-900 mb-2">⏸️ Droit à la limitation</h3>
                        <p className="text-purple-800 text-sm">
                          Demander la limitation du traitement de vos données dans certaines circonstances.
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <h3 className="font-medium text-orange-900 mb-2">📤 Droit à la portabilité</h3>
                        <p className="text-orange-800 text-sm">
                          Récupérer vos données dans un format structuré pour les transférer à un autre professionnel.
                        </p>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="font-medium text-yellow-900 mb-2">🚫 Droit d'opposition</h3>
                        <p className="text-yellow-800 text-sm">
                          Vous opposer au traitement de vos données pour des raisons légitimes.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">⚖️ Limites liées au secret professionnel</h3>
                      <p className="text-gray-700 text-sm">
                        L'exercice de certains droits peut être limité par les obligations du secret professionnel 
                        et les exigences de conservation des dossiers médicaux. Nous vous informerons de toute limitation 
                        et de ses justifications légales.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exercer vos droits */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Comment exercer vos droits
                  </Heading>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Pour exercer vos droits ou pour toute question concernant vos données personnelles, 
                      vous pouvez nous contacter :
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                        <h3 className="font-medium text-blue-900 mb-2">📧 Par email</h3>
                        <p className="text-blue-800 text-sm">{CONTACT_INFO.email}</p>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                        <h3 className="font-medium text-green-900 mb-2">📞 Par téléphone</h3>
                        <p className="text-green-800 text-sm">{CONTACT_INFO.phone}</p>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                        <h3 className="font-medium text-purple-900 mb-2">📮 Par courrier</h3>
                        <p className="text-purple-800 text-sm">
                          {CONTACT_INFO.address.street}<br />
                          {CONTACT_INFO.address.zipCode} {CONTACT_INFO.address.city}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h3 className="font-medium text-yellow-900 mb-2">⏱️ Délai de réponse</h3>
                      <p className="text-yellow-800 text-sm">
                        Nous nous engageons à répondre à votre demande dans un délai d'un mois maximum. 
                        En cas de demande complexe, ce délai peut être prolongé de deux mois avec notification.
                      </p>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h3 className="font-medium text-red-900 mb-2">🆔 Vérification d'identité</h3>
                      <p className="text-red-800 text-sm">
                        Pour protéger vos données, nous pouvons vous demander de justifier votre identité 
                        avant de donner suite à votre demande.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Réclamation */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Droit de réclamation
                  </Heading>
                  
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Si vous estimez que le traitement de vos données personnelles constitue une violation 
                      du RGPD, vous avez le droit d'introduire une réclamation auprès de la CNIL :
                    </p>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Commission Nationale de l'Informatique et des Libertés (CNIL)</h3>
                      <div className="text-blue-800 text-sm space-y-1">
                        <p><strong>Adresse :</strong> 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07</p>
                        <p><strong>Téléphone :</strong> 01 53 73 22 22</p>
                        <p><strong>Site web :</strong> <a href="https://www.cnil.fr" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>
                        <p><strong>Réclamation en ligne :</strong> <a href="https://www.cnil.fr/fr/plaintes" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr/fr/plaintes</a></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cookies */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Cookies et traceurs
                  </Heading>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">🍪 Cookies strictement nécessaires</h3>
                      <p className="text-green-800 text-sm">
                        Utilisés pour le fonctionnement du site (sécurité, navigation). 
                        Ces cookies ne nécessitent pas votre consentement.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">📊 Cookies d'analyse (optionnels)</h3>
                      <p className="text-blue-800 text-sm">
                        Données anonymisées pour améliorer le site. 
                        Vous pouvez les refuser sans impact sur votre navigation.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">⚙️ Gestion des cookies</h3>
                      <p className="text-gray-700 text-sm">
                        Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur 
                        ou via le bandeau de consentement affiché lors de votre première visite.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modifications */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Modifications de cette politique
                  </Heading>
                  
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Cette politique de confidentialité peut être mise à jour pour refléter des changements 
                      dans nos pratiques ou pour respecter de nouvelles obligations légales.
                    </p>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">📢 Notification des changements</h3>
                      <p className="text-blue-800 text-sm">
                        Toute modification importante vous sera notifiée par email ou via une notification 
                        sur le site. Les modifications mineures seront indiquées par la date de dernière mise à jour.
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">📅 Dernière mise à jour</h3>
                      <p className="text-green-800 text-sm">
                        Cette politique de confidentialité a été mise à jour le : <strong>Janvier 2025</strong>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-blue-900 mb-4">
                    Contact pour questions sur la confidentialité
                  </Heading>
                  
                  <div className="space-y-4">
                    <p className="text-blue-800">
                      Pour toute question concernant cette politique de confidentialité ou le traitement 
                      de vos données personnelles, n'hésitez pas à nous contacter :
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="text-blue-800">
                        <h3 className="font-medium mb-2">📧 Contact privilégié</h3>
                        <p className="text-sm">{CONTACT_INFO.email}</p>
                      </div>

                      <div className="text-blue-800">
                        <h3 className="font-medium mb-2">📞 Contact téléphonique</h3>
                        <p className="text-sm">{CONTACT_INFO.phone}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-white border border-blue-300 rounded-lg">
                      <p className="text-blue-900 text-sm">
                        <strong>Engagement :</strong> Nous nous engageons à répondre à toutes vos questions 
                        concernant la protection de vos données dans les meilleurs délais et avec la plus grande transparence.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}