'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DocumentArrowDownIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { LeadMagnetDownloadSchema } from '@/lib/schemas'
import { Button, Input, Card, CardContent, Heading } from '@/components/ui'
import { trackEvent } from '@/lib/analytics'
import type { LeadMagnetDownloadData } from '@/lib/types'

type SubmissionState = 'idle' | 'loading' | 'success' | 'error'

interface LeadMagnetFormProps {
  leadMagnetSlug: string
  title: string
  description: string
  benefits: string[]
  className?: string
  source: string
  variant?: 'compact' | 'full'
  onSuccess?: () => void
}

export function LeadMagnetForm({ 
  leadMagnetSlug, 
  title, 
  description, 
  benefits, 
  className, 
  source,
  variant = 'full',
  onSuccess 
}: LeadMagnetFormProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<LeadMagnetDownloadData>({
    resolver: zodResolver(LeadMagnetDownloadSchema),
    defaultValues: {
      leadMagnetSlug,
      source,
      subscribeToNewsletter: true,
      rgpdConsent: false
    }
  })

  const onSubmit = async (data: LeadMagnetDownloadData) => {
    try {
      setSubmissionState('loading')
      setErrorMessage('')

      // Track form submission attempt
      trackEvent({
        action: 'lead_magnet_form_submit',
        category: 'lead_generation',
        label: leadMagnetSlug,
        custom_parameters: {
          source,
          subscribed: data.subscribeToNewsletter
        }
      })

      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        setSubmissionState('success')
        reset()
        onSuccess?.()
        
        // Track successful conversion
        trackEvent({
          action: 'lead_magnet_downloaded',
          category: 'lead_generation',
          label: leadMagnetSlug,
          value: 1,
          custom_parameters: {
            source,
            subscribed: data.subscribeToNewsletter,
            emailSent: result.emailSent
          }
        })
      } else {
        setSubmissionState('error')
        setErrorMessage(result.error || 'Une erreur est survenue')
        
        // Track error
        trackEvent({
          action: 'lead_magnet_error',
          category: 'lead_generation',
          label: leadMagnetSlug,
          custom_parameters: {
            error: result.error,
            source
          }
        })
      }
    } catch (error) {
      setSubmissionState('error')
      setErrorMessage('Erreur de connexion. Veuillez réessayer.')
      console.error('Erreur soumission lead magnet:', error)
      
      trackEvent({
        action: 'lead_magnet_network_error',
        category: 'lead_generation',
        label: leadMagnetSlug,
        custom_parameters: { source }
      })
    }
  }

  if (submissionState === 'success') {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          
          <Heading as="h3" variant="card" className="mb-4 text-green-800">
            Guide envoyé avec succès !
          </Heading>
          
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Vérifiez votre boîte email</strong> - Votre guide vous a été envoyé instantanément.
            </p>
            
            <p className="text-sm">
              Si vous ne voyez pas l'email, pensez à vérifier votre dossier spam ou courrier indésirable.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <p className="text-blue-800 font-semibold text-sm">
                💡 Conseil : Ajoutez contact@safa-shili-psychologue.fr à vos contacts 
                pour recevoir tous nos conseils directement dans votre boîte principale.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        {variant === 'full' && (
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentArrowDownIcon className="h-8 w-8 text-blue-600" />
            </div>
            
            <Heading as="h2" variant="card" className="mb-3">
              {title}
            </Heading>
            
            <p className="text-gray-600 mb-6">
              {description}
            </p>
            
            {benefits && benefits.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-green-800 mb-3">
                  Ce que vous allez découvrir :
                </h4>
                <ul className="space-y-2 text-sm text-green-700">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {submissionState === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <ExclamationCircleIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Erreur lors de l'envoi
                </h3>
                <p className="mt-1 text-sm text-red-700">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                {...register('firstName')}
                placeholder="Prénom *"
                error={errors.firstName?.message}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Input
                {...register('lastName')}
                placeholder="Nom (optionnel)"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <Input
            {...register('email')}
            type="email"
            placeholder="Votre email *"
            error={errors.email?.message}
            disabled={isSubmitting}
          />

          <Input
            {...register('phone')}
            type="tel"
            placeholder="Téléphone (optionnel)"
            disabled={isSubmitting}
          />

          {/* Options d'abonnement */}
          <div className="space-y-3">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                {...register('subscribeToNewsletter')}
                className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                disabled={isSubmitting}
                defaultChecked
              />
              <div className="text-sm">
                <span className="text-gray-700 font-medium">
                  Recevoir des conseils et techniques par email
                </span>
                <p className="text-gray-500 text-xs mt-1">
                  Recevez des conseils professionnels et des techniques pratiques 
                  pour améliorer votre bien-être psychologique (recommandé)
                </p>
              </div>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                {...register('rgpdConsent')}
                className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                disabled={isSubmitting}
                required
              />
              <div className="text-sm">
                <span className="text-gray-700">
                  J'accepte le traitement de mes données personnelles *
                </span>
                <p className="text-gray-500 text-xs mt-1">
                  Conformément au RGPD. Vous pouvez vous désabonner à tout moment.
                </p>
              </div>
            </label>
            {errors.rgpdConsent && (
              <p className="text-red-500 text-sm">{errors.rgpdConsent.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </span>
            ) : (
              <>
                <DocumentArrowDownIcon className="h-5 w-5 mr-2 inline" />
                Recevoir le guide gratuitement
              </>
            )}
          </Button>

          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">
              ✅ <strong>100% gratuit</strong> • 
              ✅ <strong>Aucune carte de crédit</strong> • 
              ✅ <strong>Téléchargement immédiat</strong>
            </p>
          </div>
        </form>

        {variant === 'full' && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-3">
                À propos de Safa Shili
              </h4>
              <p className="text-sm text-gray-600">
                Psychologue clinicienne diplômée de l'Université Paris-Cité, 
                spécialisée en violence conjugale et psychotraumatologie. 
                Plus de 5 ans d'expérience dans l'accompagnement thérapeutique.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Version compacte pour les sidebars et espaces restreints
export function CompactLeadMagnetForm(props: Omit<LeadMagnetFormProps, 'variant'>) {
  return <LeadMagnetForm {...props} variant="compact" />
}

// Configuration pré-définie pour chaque lead magnet
export const LEAD_MAGNET_CONFIGS = {
  'sortir-violence-conjugale': {
    title: 'Guide Complet : Sortir de la Violence Conjugale',
    description: 'Un guide professionnel de 12 pages avec des ressources concrètes et des étapes pratiques pour vous accompagner vers la sortie de violence.',
    benefits: [
      'Reconnaître les différents types de violence',
      'Comprendre les mécanismes de l\'emprise psychologique', 
      'Préparer votre plan de sortie en sécurité',
      'Connaître vos droits et les démarches légales',
      'Accéder aux ressources d\'aide spécialisées',
      'Stratégies de reconstruction et de prévention'
    ]
  },
  '10-signes-consultation': {
    title: '10 Signes Qu\'il Faut Consulter un Psychologue',
    description: 'Une checklist pratique et professionnelle pour identifier si un accompagnement psychologique pourrait vous être bénéfique.',
    benefits: [
      'Auto-évaluation guidée de votre état psychologique',
      'Signaux d\'alarme à ne pas ignorer',
      'Différence entre difficultés passagères et troubles',
      'Comment préparer votre première consultation',
      'Types d\'accompagnement disponibles',
      'Conseils pour franchir le pas de la consultation'
    ]
  },
  'gerer-anxiete-quotidien': {
    title: 'Gérer l\'Anxiété au Quotidien : Techniques Pratiques',
    description: 'Un guide pratique de 8 pages avec des techniques concrètes et scientifiquement prouvées pour gérer votre anxiété au quotidien.',
    benefits: [
      'Techniques de respiration d\'urgence (4-7-8)',
      'Exercices de relaxation musculaire progressive',
      'Méthodes de restructuration cognitive',
      'Stratégies d\'ancrage et de mindfulness',
      'Programme quotidien anti-anxiété',
      'Quand consulter un professionnel'
    ]
  }
}

// Hook pour utiliser les configurations
export function useLeadMagnetConfig(slug: string) {
  return LEAD_MAGNET_CONFIGS[slug as keyof typeof LEAD_MAGNET_CONFIGS] || {
    title: 'Guide Gratuit',
    description: 'Un guide professionnel pour vous accompagner.',
    benefits: []
  }
}