import Link from 'next/link'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  ShieldCheckIcon,
  HeartIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'
import { Container, Button } from '@/components/ui'
import { CONTACT_INFO, EMERGENCY_CONTACTS } from '@/lib/constants'
import { formatPhoneNumber, getBusinessHours } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Contact Principal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <PhoneIcon className="h-5 w-5 mt-0.5 text-blue-400" />
                  <div>
                    <p className="font-medium">{formatPhoneNumber(CONTACT_INFO.phone)}</p>
                    <p className="text-sm text-gray-400">Consultations</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <EnvelopeIcon className="h-5 w-5 mt-0.5 text-blue-400" />
                  <div>
                    <p className="text-sm">{CONTACT_INFO.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <MapPinIcon className="h-5 w-5 mt-0.5 text-blue-400" />
                  <div>
                    <p className="text-sm">
                      {CONTACT_INFO.address.street}<br />
                      {CONTACT_INFO.address.zipCode} {CONTACT_INFO.address.city}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {CONTACT_INFO.address.building}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Horaires</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Lundi</span>
                  <span className="text-gray-400">{getBusinessHours('lundi')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mar-Ven</span>
                  <span className="text-gray-400">{getBusinessHours('mardi')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-gray-400">{getBusinessHours('samedi')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-gray-400">Fermé</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Prendre RDV
                  </Button>
                </Link>
              </div>
            </div>

            {/* Ressources Gratuites */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources Gratuites</h3>
              <div className="space-y-3">
                <Link href="/ressources/sortir-violence-conjugale" className="flex items-start space-x-2 text-gray-300 hover:text-white transition-colors group">
                  <ShieldCheckIcon className="h-4 w-4 mt-0.5 text-red-400 group-hover:text-red-300" />
                  <div>
                    <p className="text-sm font-medium">Guide Violence Conjugale</p>
                    <p className="text-xs text-gray-400">12 pages • Gratuit</p>
                  </div>
                </Link>
                
                <Link href="/ressources/gerer-anxiete-quotidien" className="flex items-start space-x-2 text-gray-300 hover:text-white transition-colors group">
                  <HeartIcon className="h-4 w-4 mt-0.5 text-blue-400 group-hover:text-blue-300" />
                  <div>
                    <p className="text-sm font-medium">Gérer l'Anxiété</p>
                    <p className="text-xs text-gray-400">8 pages • Techniques pratiques</p>
                  </div>
                </Link>
                
                <Link href="/ressources/10-signes-consultation" className="flex items-start space-x-2 text-gray-300 hover:text-white transition-colors group">
                  <ClipboardDocumentCheckIcon className="h-4 w-4 mt-0.5 text-purple-400 group-hover:text-purple-300" />
                  <div>
                    <p className="text-sm font-medium">10 Signes Consultation</p>
                    <p className="text-xs text-gray-400">Checklist • 2 pages</p>
                  </div>
                </Link>
              </div>
              
              <div className="mt-4">
                <Link href="/ressources">
                  <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-gray-900">
                    <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                    Voir tous les guides
                  </Button>
                </Link>
              </div>
            </div>

            {/* Urgences */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Urgences</h3>
              <div className="space-y-3 text-sm">
                {EMERGENCY_CONTACTS.map((contact) => (
                  <div key={contact.name}>
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="h-4 w-4 text-red-400" />
                      <span className="font-medium">{contact.number}</span>
                    </div>
                    <p className="text-xs text-gray-400 ml-6">{contact.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                <p className="text-xs text-red-300">
                  En cas d'urgence vitale, appelez le 15 (SAMU)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <p>&copy; {currentYear} Safa Shili - Psychologue</p>
              <span>•</span>
              <p>RPPS: 10009036871</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="text-gray-400 hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link href="/rgpd" className="text-gray-400 hover:text-white transition-colors">
                RGPD
              </Link>
            </div>
          </div>
          
          {/* Transport info */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center">
              <ClockIcon className="inline h-3 w-3 mr-1" />
              Accès: {CONTACT_INFO.transport.join(' • ')}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}