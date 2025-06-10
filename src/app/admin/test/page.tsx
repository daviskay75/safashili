'use client'

import React, { useState, useEffect } from 'react'
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

export default function AdminTestDashboard() {
  const [stats, setStats] = useState<ContactStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

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

  return (
    <Layout>
      <Section className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Heading as="h1" className="text-3xl font-bold text-gray-900 mb-2">
              🧪 TEST - Tableau de Bord Admin (Sans Auth)
            </Heading>
            <p className="text-gray-600">
              Version test du dashboard sans authentification
            </p>
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

          {/* Test Success Message */}
          <Card className="bg-green-50 border-green-200 mb-6">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                ✅ Dashboard Test Working!
              </h3>
              <p className="text-green-600">
                The admin dashboard is functional. If you see this, the issue was with authentication, not the dashboard itself.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={() => window.open('/admin/login', '_self')}>
              Aller à la vraie page de connexion
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  )
}