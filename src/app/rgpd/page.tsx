import type { Metadata } from 'next'
import Link from 'next/link'
import { Layout } from '@/components/layout'
import { Container, Section, Heading, Card, CardContent, Badge, Button } from '@/components/ui'
import { CONTACT_INFO, SITE_CONFIG } from '@/lib/constants'
import { 
  ShieldCheckIcon, 
  DocumentIcon, 
  LockClosedIcon, 
  UserIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: `Conformité RGPD | ${SITE_CONFIG.name}`,
  description: 'Conformité au Règlement Général sur la Protection des Données (RGPD) du cabinet de psychologie de Safa Shili. Engagement de protection des données personnelles.',
  robots: 'noindex, nofollow',
}

export default function RGPDPage() {
  return (
    <Layout>
      <Section className="pt-20 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <ShieldCheckIcon className="h-4 w-4 mr-2" />
                Conformité RGPD
              </Badge>
              <Heading as="h1" className="text-4xl font-bold text-gray-900 mb-6">
                Règlement Général sur la Protection des Données
              </Heading>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Notre engagement pour la protection de vos données personnelles dans le cadre du RGPD. 
                Transparence, sécurité et respect de vos droits sont au cœur de notre pratique professionnelle.
              </p>
            </div>

            <div className="space-y-8">
              {/* Engagement RGPD */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircleIcon className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <Heading as="h2" className="text-xl font-semibold text-green-900 mb-3">
                        ✅ Conformité RGPD certifiée
                      </Heading>
                      <p className="text-green-800 mb-4">
                        Notre cabinet de psychologie respecte intégralement le Règlement Général sur la Protection 
                        des Données (RGPD) entré en vigueur le 25 mai 2018. Toutes nos pratiques ont été adaptées 
                        pour garantir la meilleure protection de vos données personnelles.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                          <span className="text-green-800">Consentement explicite</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                          <span className="text-green-800">Droits respectés</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                          <span className="text-green-800">Sécurité renforcée</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Qu'est-ce que le RGPD */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Qu'est-ce que le RGPD ?
                  </Heading>
                  
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Le <strong>Règlement Général sur la Protection des Données (RGPD)</strong> est un texte 
                      réglementaire européen qui encadre le traitement des données personnelles sur le territoire 
                      de l'Union européenne.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">🎯 Objectifs du RGPD</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-500">•</span>
                            <span>Renforcer les droits des citoyens</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-500">•</span>
                            <span>Responsabiliser les organisations</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-500">•</span>
                            <span>Harmoniser les règles européennes</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-500">•</span>
                            <span>Adapter la loi à l'ère numérique</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">📋 Principes fondamentaux</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-green-500">•</span>
                            <span>Licéité, loyauté, transparence</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-500">•</span>
                            <span>Limitation des finalités</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-500">•</span>
                            <span>Minimisation des données</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-500">•</span>
                            <span>Exactitude et limitation de conservation</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conformité du cabinet */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Notre conformité RGPD
                  </Heading>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <DocumentIcon className="h-6 w-6 text-blue-600" />
                            <h3 className="font-medium text-blue-900">Base légale des traitements</h3>
                          </div>
                          <ul className="space-y-1 text-blue-800 text-sm">
                            <li>• Consentement explicite du patient</li>
                            <li>• Intérêt vital (soins de santé)</li>
                            <li>• Exécution d'un contrat de soins</li>
                            <li>• Obligations légales professionnelles</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <LockClosedIcon className="h-6 w-6 text-green-600" />
                            <h3 className="font-medium text-green-900">Sécurité des données</h3>
                          </div>
                          <ul className="space-y-1 text-green-800 text-sm">
                            <li>• Chiffrement bout en bout</li>
                            <li>• Accès sécurisé et authentifié</li>
                            <li>• Sauvegardes régulières</li>
                            <li>• Stockage sécurisé physique</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-purple-200 bg-purple-50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <UserIcon className="h-6 w-6 text-purple-600" />
                            <h3 className="font-medium text-purple-900">Droits des patients</h3>
                          </div>
                          <ul className="space-y-1 text-purple-800 text-sm">
                            <li>• Procédures d'exercice des droits</li>
                            <li>• Délais de réponse respectés</li>
                            <li>• Information claire et accessible</li>
                            <li>• Droit de réclamation facilité</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <ClockIcon className="h-6 w-6 text-orange-600" />
                            <h3 className="font-medium text-orange-900">Conservation des données</h3>
                          </div>
                          <ul className="space-y-1 text-orange-800 text-sm">
                            <li>• Durées légales respectées</li>
                            <li>• Suppression automatique</li>
                            <li>• Archivage sécurisé</li>
                            <li>• Traçabilité des opérations</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Traitements de données spécifiques */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Traitements de données dans notre cabinet
                  </Heading>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h3 className="font-medium text-red-900 mb-2">🏥 Données de santé (catégorie particulière)</h3>
                      <div className="text-red-800 text-sm space-y-2">
                        <p><strong>Finalité :</strong> Prise en charge thérapeutique et suivi psychologique</p>
                        <p><strong>Base légale :</strong> Consentement explicite + Intérêt vital (santé)</p>
                        <p><strong>Destinataires :</strong> Psychologue uniquement (partage exceptionnel avec consentement)</p>
                        <p><strong>Conservation :</strong> 20 ans minimum après fin de prise en charge</p>
                        <p><strong>Sécurité :</strong> Chiffrement renforcé, accès ultra-restreint</p>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">📋 Données administratives</h3>
                      <div className="text-blue-800 text-sm space-y-2">
                        <p><strong>Finalité :</strong> Gestion administrative et facturation</p>
                        <p><strong>Base légale :</strong> Exécution du contrat de soins</p>
                        <p><strong>Destinataires :</strong> Cabinet de psychologie uniquement</p>
                        <p><strong>Conservation :</strong> 3 ans après dernier contact + 10 ans pour données comptables</p>
                        <p><strong>Sécurité :</strong> Accès sécurisé, chiffrement standard</p>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">🌐 Données de navigation web</h3>
                      <div className="text-green-800 text-sm space-y-2">
                        <p><strong>Finalité :</strong> Amélioration du site web et analyse d'audience</p>
                        <p><strong>Base légale :</strong> Intérêt légitime (données anonymisées)</p>
                        <p><strong>Destinataires :</strong> Hébergeur technique uniquement</p>
                        <p><strong>Conservation :</strong> 13 mois maximum</p>
                        <p><strong>Sécurité :</strong> Anonymisation, pas de données personnelles</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mesures de sécurité */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Mesures de sécurité RGPD
                  </Heading>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Conformément à l'article 32 du RGPD, nous avons mis en place des mesures techniques 
                      et organisationnelles appropriées pour garantir un niveau de sécurité adapté au risque :
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">🔒 Mesures techniques</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Chiffrement des données en transit et au repos</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Authentification forte et gestion des accès</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Sauvegardes automatiques et redondantes</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Surveillance et détection des incidents</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Mise à jour régulière des systèmes</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">🏢 Mesures organisationnelles</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Politique de confidentialité stricte</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Formation continue sur la protection des données</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Procédures de traitement des demandes</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Plan de gestion des incidents</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Audits réguliers de conformité</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vos droits RGPD */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Vos droits selon le RGPD
                  </Heading>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 mb-4">
                      Le RGPD vous confère 8 droits fondamentaux sur vos données personnelles :
                    </p>

                    <div className="grid gap-4">
                      <div className="flex items-start space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                          <h3 className="font-medium text-blue-900 mb-1">Droit à l'information</h3>
                          <p className="text-blue-800 text-sm">Être informé de manière claire sur l'utilisation de vos données</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                          <h3 className="font-medium text-green-900 mb-1">Droit d'accès</h3>
                          <p className="text-green-800 text-sm">Obtenir une copie de toutes vos données et savoir comment elles sont utilisées</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                          <h3 className="font-medium text-purple-900 mb-1">Droit de rectification</h3>
                          <p className="text-purple-800 text-sm">Faire corriger des données inexactes ou incomplètes</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                        <div>
                          <h3 className="font-medium text-red-900 mb-1">Droit à l'effacement ("droit à l'oubli")</h3>
                          <p className="text-red-800 text-sm">Demander la suppression de vos données dans certaines conditions</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                        <div>
                          <h3 className="font-medium text-orange-900 mb-1">Droit à la limitation du traitement</h3>
                          <p className="text-orange-800 text-sm">Demander la suspension temporaire du traitement de vos données</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                        <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                        <div>
                          <h3 className="font-medium text-teal-900 mb-1">Droit à la portabilité</h3>
                          <p className="text-teal-800 text-sm">Récupérer vos données dans un format structuré pour les transférer</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">7</div>
                        <div>
                          <h3 className="font-medium text-yellow-900 mb-1">Droit d'opposition</h3>
                          <p className="text-yellow-800 text-sm">Vous opposer au traitement de vos données pour des raisons légitimes</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-pink-50 border border-pink-200 rounded-lg">
                        <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">8</div>
                        <div>
                          <h3 className="font-medium text-pink-900 mb-1">Droit de ne pas faire l'objet d'une décision automatisée</h3>
                          <p className="text-pink-800 text-sm">Ne pas être soumis à des décisions basées uniquement sur un traitement automatisé</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gestion des incidents */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Gestion des incidents de sécurité
                  </Heading>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-red-900 mb-2">En cas de violation de données</h3>
                          <p className="text-red-800 text-sm mb-3">
                            Conformément à l'article 33 du RGPD, nous nous engageons à :
                          </p>
                          <ul className="space-y-1 text-red-800 text-sm">
                            <li>• Notifier la CNIL dans les 72h si l'incident présente un risque</li>
                            <li>• Vous informer sans délai si vos droits et libertés sont menacés</li>
                            <li>• Documenter l'incident et les mesures prises</li>
                            <li>• Mettre en place des mesures correctives immédiates</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <InformationCircleIcon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-blue-900 mb-2">Prévention et surveillance</h3>
                          <ul className="space-y-1 text-blue-800 text-sm">
                            <li>• Surveillance continue des systèmes</li>
                            <li>• Tests réguliers des mesures de sécurité</li>
                            <li>• Plan de continuité d'activité</li>
                            <li>• Formation continue sur les risques cyber</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transferts de données */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Transferts de données hors UE
                  </Heading>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">🇪🇺 Hébergement européen privilégié</h3>
                      <p className="text-green-800 text-sm">
                        Nos données sont prioritairement hébergées au sein de l'Union européenne 
                        pour garantir l'application du RGPD.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">🛡️ Garanties supplémentaires</h3>
                      <p className="text-blue-800 text-sm mb-2">
                        Quand un transfert hors UE est nécessaire, nous utilisons :
                      </p>
                      <ul className="space-y-1 text-blue-800 text-sm">
                        <li>• Clauses contractuelles types de la Commission européenne</li>
                        <li>• Mesures de sécurité supplémentaires (chiffrement renforcé)</li>
                        <li>• Évaluation d'impact sur la protection des données</li>
                        <li>• Contrôle strict des sous-traitants</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact DPO */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Contact pour questions RGPD
                  </Heading>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Pour toute question concernant le RGPD ou l'exercice de vos droits :
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-medium text-blue-900 mb-2">📧 Email privilégié</h3>
                        <p className="text-blue-800 text-sm">{CONTACT_INFO.email}</p>
                        <p className="text-blue-700 text-xs mt-1">Objet : "RGPD - [votre demande]"</p>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-medium text-green-900 mb-2">📞 Contact téléphonique</h3>
                        <p className="text-green-800 text-sm">{CONTACT_INFO.phone}</p>
                        <p className="text-green-700 text-xs mt-1">Aux heures d'ouverture du cabinet</p>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h3 className="font-medium text-yellow-900 mb-2">⏱️ Délais de traitement</h3>
                      <p className="text-yellow-800 text-sm">
                        Nous nous engageons à traiter votre demande dans un délai maximum d'un mois. 
                        En cas de demande complexe, ce délai peut être prolongé de deux mois avec notification préalable.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ressources */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Ressources et liens utiles
                  </Heading>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">📖 Documentation</h3>
                      <div className="space-y-2">
                        <Link href="/confidentialite" className="block text-blue-600 hover:underline text-sm">
                          → Politique de confidentialité complète
                        </Link>
                        <Link href="/mentions-legales" className="block text-blue-600 hover:underline text-sm">
                          → Mentions légales
                        </Link>
                        <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees" 
                           className="block text-blue-600 hover:underline text-sm" 
                           target="_blank" rel="noopener noreferrer">
                          → CNIL - Guide RGPD
                        </a>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">🏛️ Autorités de contrôle</h3>
                      <div className="space-y-2">
                        <a href="https://www.cnil.fr" 
                           className="block text-blue-600 hover:underline text-sm" 
                           target="_blank" rel="noopener noreferrer">
                          → CNIL (Commission Nationale Informatique et Libertés)
                        </a>
                        <a href="https://www.cnil.fr/fr/plaintes" 
                           className="block text-blue-600 hover:underline text-sm" 
                           target="_blank" rel="noopener noreferrer">
                          → Déposer une plainte à la CNIL
                        </a>
                        <a href="https://edpb.europa.eu/about-edpb/board/members_fr" 
                           className="block text-blue-600 hover:underline text-sm" 
                           target="_blank" rel="noopener noreferrer">
                          → Comité européen de la protection des données
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Heading as="h2" className="text-xl font-semibold text-blue-900 mb-4">
                    Questions sur vos données personnelles ?
                  </Heading>
                  <p className="text-blue-800 mb-6">
                    N'hésitez pas à nous contacter pour toute question concernant le traitement 
                    de vos données personnelles ou l'exercice de vos droits RGPD.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <Link href="/contact">
                        Nous contacter
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/confidentialite">
                        Politique de confidentialité
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Dernière mise à jour */}
              <div className="text-center text-gray-500 text-sm">
                <p>Dernière mise à jour de la conformité RGPD : Janvier 2025</p>
                <p className="mt-1">Version du RGPD : Règlement (UE) 2016/679 du 27 avril 2016</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}