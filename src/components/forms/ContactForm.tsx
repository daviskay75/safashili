'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Button, Input, Textarea, Card, CardContent } from '@/components/ui'
import { ContactSchema } from '@/lib/schemas'
import { ContactFormData } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'

type SubmissionState = 'idle' | 'loading' | 'success' | 'error'

interface ContactFormProps {
  className?: string
  onSuccess?: () => void
}

export function ContactForm({ className, onSuccess }: ContactFormProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      consultationType: 'cabinet',
      rgpdConsent: false
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmissionState('loading')
      setErrorMessage('')

      // Track form submission attempt
      trackEvent({
        action: 'form_start',
        category: 'contact',
        label: data.consultationType,
        custom_parameters: {
          consultation_type: data.consultationType
        }
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du message')
      }

      // Track successful submission
      trackEvent({
        action: 'form_submit',
        category: 'contact',
        label: 'success',
        custom_parameters: {
          consultation_type: data.consultationType,
          response_time: Date.now()
        }
      })

      setSubmissionState('success')
      reset()
      onSuccess?.()

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmissionState('idle')
      }, 5000)

    } catch (error) {
      console.error('Contact form error:', error)
      
      // Track form error
      trackEvent({
        action: 'form_error',
        category: 'contact',
        label: 'submission_failed',
        custom_parameters: {
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }
      })

      setSubmissionState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue')
    }
  }

  const consultationTypes = [
    { value: 'cabinet', label: 'Consultation au cabinet (Rosny-sous-Bois)' },
    { value: 'domicile', label: 'Consultation à domicile' },
    { value: 'distance', label: 'Consultation à distance (visio/téléphone)' },
    { value: 'groupe', label: 'Thérapie de groupe' }
  ]

  if (submissionState === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Message envoyé avec succès !
          </h3>
          <p className="text-green-700 mb-4">
            Votre demande a bien été reçue. Je vous recontacterai dans les plus brefs délais, 
            généralement sous 24h.
          </p>
          <p className="text-sm text-green-600">
            Vous recevrez également un email de confirmation.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="space-y-6">
        {/* Error Message */}
        {submissionState === 'error' && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            type="text"
            {...register('firstName')}
            error={errors.firstName?.message}
            placeholder="Votre prénom"
            required
          />
          
          <Input
            label="Nom"
            type="text"
            {...register('lastName')}
            error={errors.lastName?.message}
            placeholder="Votre nom"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="votre.email@exemple.com"
            required
          />
          
          <Input
            label="Téléphone"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
            placeholder="06 12 34 56 78"
            helperText="Format français requis"
            required
          />
        </div>

        {/* Consultation Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Type de consultation souhaité <span className="text-red-500">*</span>
          </label>
          <select
            {...register('consultationType')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          >
            {consultationTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.consultationType && (
            <p className="text-sm text-red-600">{errors.consultationType.message}</p>
          )}
        </div>

        {/* Message */}
        <Textarea
          label="Votre message"
          {...register('message')}
          error={errors.message?.message}
          placeholder="Décrivez votre situation ou vos questions. Ces informations m'aideront à mieux vous accompagner lors de notre premier échange."
          rows={5}
          helperText="Minimum 10 caractères"
          required
        />

        {/* RGPD Consent */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="rgpd-consent"
              {...register('rgpdConsent')}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rgpd-consent" className="text-sm text-gray-700">
              <span className="font-medium">J'accepte le traitement de mes données personnelles</span>
              <span className="text-red-500 ml-1">*</span>
              <p className="text-xs text-gray-600 mt-1">
                Vos données sont utilisées uniquement pour vous recontacter et traiter votre demande. 
                Elles ne sont jamais partagées avec des tiers. 
                Vous pouvez les supprimer à tout moment en me contactant.
              </p>
            </label>
          </div>
          {errors.rgpdConsent && (
            <p className="text-sm text-red-600">{errors.rgpdConsent.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="space-y-4">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            loading={isSubmitting || submissionState === 'loading'}
            disabled={isSubmitting || submissionState === 'loading'}
          >
            {isSubmitting || submissionState === 'loading' 
              ? 'Envoi en cours...' 
              : 'Envoyer ma demande'
            }
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            En envoyant ce formulaire, vous acceptez que je vous recontacte pour répondre à votre demande. 
            Délai de réponse habituel : sous 24h.
          </p>
        </div>
      </div>
    </form>
  )
}

// Simplified version for newsletter signup
export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(ContactSchema.pick({ 
      firstName: true, 
      email: true, 
      rgpdConsent: true 
    }))
  })

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)
      
      // Track newsletter signup attempt
      trackEvent({
        action: 'newsletter_signup',
        category: 'engagement',
        label: 'attempt'
      })

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          marketingConsent: true
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription')
      }

      // Track successful signup
      trackEvent({
        action: 'newsletter_signup',
        category: 'engagement',
        label: 'success'
      })

      setIsSuccess(true)
      reset()
      
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      console.error('Newsletter signup error:', error)
      
      // Track signup error
      trackEvent({
        action: 'newsletter_signup',
        category: 'engagement',  
        label: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-green-200 bg-green-50 p-4 text-center">
        <CheckCircleIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
        <p className="text-green-700 font-medium">Inscription réussie !</p>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          {...register('firstName')}
          error={errors.firstName?.message}
          placeholder="Prénom"
        />
        <Input
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="Email"
        />
      </div>
      
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          {...register('rgpdConsent')}
          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          id="newsletter-consent"
        />
        <label htmlFor="newsletter-consent" className="text-xs text-gray-600">
          J'accepte de recevoir des conseils en psychologie et le traitement de mes données.
        </label>
      </div>
      
      {errors.rgpdConsent && (
        <p className="text-xs text-red-600">{errors.rgpdConsent.message}</p>
      )}
      
      <Button 
        type="submit" 
 
        className="w-full"
        loading={isSubmitting}
      >
        {isSubmitting ? 'Inscription...' : 'S\'inscrire'}
      </Button>
    </form>
  )
}