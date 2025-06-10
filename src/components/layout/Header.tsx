'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Bars3Icon, 
  XMarkIcon, 
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import { Button, Container } from '@/components/ui'
import { NAVIGATION, CONTACT_INFO } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">SS</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-semibold text-gray-900">Safa Shili</span>
                <p className="text-sm text-gray-600">Psychologue</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-blue-600',
                    isActivePath(item.href)
                      ? 'text-blue-600'
                      : 'text-gray-900'
                  )}
                >
                  {item.name}
                </Link>
                
                {/* Submenu pour desktop */}
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <PhoneIcon className="h-4 w-4" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <Link href="/rendez-vous">
              <Button>Prendre RDV</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold text-gray-900">Menu</span>
                <button
                  type="button"
                  className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="overflow-y-auto h-full pb-20">
                <nav className="px-4 py-6 space-y-4">
                  {NAVIGATION.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          'block text-base font-medium py-2',
                          isActivePath(item.href)
                            ? 'text-blue-600'
                            : 'text-gray-900'
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      
                      {/* Submenu pour mobile */}
                      {item.submenu && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                
                {/* Contact mobile */}
                <div className="px-4 py-6 border-t space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <PhoneIcon className="h-5 w-5" />
                    <span>{CONTACT_INFO.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <EnvelopeIcon className="h-5 w-5" />
                    <span>{CONTACT_INFO.email}</span>
                  </div>
                  <Link href="/rendez-vous" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">
                      Prendre Rendez-vous
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}