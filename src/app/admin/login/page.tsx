'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Layout } from '@/components/layout'
import { Section, Heading, Card, CardContent, Button, Input } from '@/components/ui'
import { LockClosedIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const result = await response.json()

      if (response.ok) {
        // Store session token
        localStorage.setItem('admin-session', result.data.sessionId)
        console.log('Login successful, redirecting...')
        // Add small delay for localStorage to persist
        setTimeout(() => {
          router.push('/admin')
          // Fallback redirect if router.push fails
          setTimeout(() => {
            window.location.href = '/admin'
          }, 500)
        }, 100)
      } else {
        setError(result.error || 'Identifiants incorrects')
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
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <LockClosedIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <Heading as="h1" className="text-2xl font-bold mb-2">
                  Accès Administrateur
                </Heading>
                <p className="text-gray-600">
                  Cabinet de Psychologie Safa Shili
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                  <div className="flex">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
                    <span className="text-sm text-red-800">{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom d'utilisateur
                  </label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                    className="w-full"
                    autoComplete="username"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    required
                    className="w-full"
                    autoComplete="current-password"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || !username || !password}
                  className="w-full"
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Accès réservé au personnel autorisé
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs">
                    <p className="font-medium text-blue-800 mb-1">Mode Développement:</p>
                    <p className="text-blue-600">Username: safa.admin</p>
                    <p className="text-blue-600">Password: admin123</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </Layout>
  )
}