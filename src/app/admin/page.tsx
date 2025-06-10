'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Layout } from '@/components/layout'
import { Section, Heading, Card, CardContent, Button } from '@/components/ui'
import { 
  UsersIcon, 
  CalendarIcon, 
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface ContactStats {
  total: number
  byType: { [key: string]: number }
  byStatus: { [key: string]: number }
  recentContacts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<ContactStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = async () => {
    const sessionId = localStorage.getItem('admin-session')
    console.log('Checking authentication, sessionId:', sessionId)
    
    if (!sessionId) {
      console.log('No session found, redirecting to login')
      router.push('/admin/login')
      return
    }

    try {
      const response = await fetch('/api/admin/auth', {
        headers: { 'Authorization': `Bearer ${sessionId}` }
      })

      console.log('Auth check response:', response.status)

      if (response.ok) {
        console.log('Authentication successful')
        setAuthenticated(true)
      } else {
        console.log('Authentication failed, clearing session')
        localStorage.removeItem('admin-session')
        router.push('/admin/login')
      }
    } catch (err) {
      console.error('Authentication error:', err)
      router.push('/admin/login')
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchStats()
    }
  }, [authenticated])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/contacts?action=stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data.data)
      } else {
        setError('Erreur lors du chargement des statistiques')
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const exportContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts?action=export&format=csv')
      if (response.ok) {
        const data = await response.json()
        alert(`Export créé: ${data.data.exportPath}`)
      }
    } catch (err) {
      alert('Erreur lors de l\'export')
    }
  }

  const logout = () => {
    localStorage.removeItem('admin-session')
    router.push('/admin/login')
  }

  // Show loading while checking authentication
  if (!authenticated) {
    return (
      <Layout>
        <Section className="pt-20 pb-16">
          <div className="max-w-6xl mx-auto text-center">
            <p>Vérification de l'authentification...</p>
          </div>
        </Section>
      </Layout>
    )
  }

  return (
    <Layout>
      <Section className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <Heading as="h1" className="text-3xl font-bold text-gray-900 mb-2">
                Tableau de Bord - Cabinet Safa Shili
              </Heading>
              <p className="text-gray-600">
                Gestion centralisée de votre pratique psychologique
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Déconnexion
            </Button>
          </div>

          {/* Quick Stats */}
          {loading ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p>Chargement des statistiques...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6 text-center">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-red-800">{error}</p>
                <Button onClick={fetchStats} className="mt-2">
                  Réessayer
                </Button>
              </CardContent>
            </Card>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Total Contacts */}
              <Card>
                <CardContent className="p-6 text-center">
                  <UsersIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-sm text-gray-600">Contacts Total</p>
                </CardContent>
              </Card>

              {/* Recent Contacts */}
              <Card>
                <CardContent className="p-6 text-center">
                  <ChartBarIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.recentContacts}</p>
                  <p className="text-sm text-gray-600">Cette Semaine</p>
                </CardContent>
              </Card>

              {/* Contact Forms */}
              <Card>
                <CardContent className="p-6 text-center">
                  <DocumentTextIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.byType.contact || 0}</p>
                  <p className="text-sm text-gray-600">Demandes Contact</p>
                </CardContent>
              </Card>

              {/* Bookings */}
              <Card>
                <CardContent className="p-6 text-center">
                  <CalendarIcon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.byType.booking || 0}</p>
                  <p className="text-sm text-gray-600">Réservations</p>
                </CardContent>
              </Card>
            </div>
          ) : null}

          {/* Management Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contact Management */}
            <Card>
              <CardContent className="p-6">
                <UsersIcon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Gestion Contacts</h3>
                <p className="text-gray-600 mb-4">
                  Gérer les demandes de contact et les informations patients
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('/api/admin/contacts', '_blank')}
                    className="w-full"
                  >
                    Voir Contacts
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={exportContacts}
                    className="w-full"
                  >
                    Exporter CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Doctolib Management */}
            <Card>
              <CardContent className="p-6">
                <CalendarIcon className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Doctolib</h3>
                <p className="text-gray-600 mb-4">
                  Gérer vos rendez-vous et disponibilités
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://pro.doctolib.fr', '_blank')}
                    className="w-full"
                  >
                    Ouvrir Doctolib Pro
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('/rendez-vous', '_blank')}
                    className="w-full"
                  >
                    Voir Widget
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardContent className="p-6">
                <ChartBarIcon className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Suivre les performances de votre site
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://analytics.google.com', '_blank')}
                    className="w-full"
                  >
                    Google Analytics
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://dash.cloudflare.com', '_blank')}
                    className="w-full"
                  >
                    Cloudflare
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Management */}
            <Card>
              <CardContent className="p-6">
                <DocumentTextIcon className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Service</h3>
                <p className="text-gray-600 mb-4">
                  Gérer l'envoi d'emails et notifications
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://resend.com/dashboard', '_blank')}
                    className="w-full"
                  >
                    Resend Dashboard
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('/api/contact', '_blank')}
                    className="w-full"
                  >
                    Test API
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Website Management */}
            <Card>
              <CardContent className="p-6">
                <CogIcon className="h-8 w-8 text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Site Web</h3>
                <p className="text-gray-600 mb-4">
                  Configuration et maintenance du site
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://dashboard.render.com', '_blank')}
                    className="w-full"
                  >
                    Render Dashboard
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('/api/analytics', '_blank')}
                    className="w-full"
                  >
                    Performance API
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* GDPR Management */}
            <Card>
              <CardContent className="p-6">
                <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">RGPD</h3>
                <p className="text-gray-600 mb-4">
                  Conformité et protection des données
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    onClick={() => window.open('/rgpd', '_blank')}
                    className="w-full"
                  >
                    Page RGPD
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => alert('Fonctionnalité en développement')}
                    className="w-full"
                  >
                    Gestion Données
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </Layout>
  )
}