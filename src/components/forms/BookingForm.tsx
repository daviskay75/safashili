'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircleIcon, ExclamationCircleIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { Button, Input, Textarea, Card, CardContent } from '@/components/ui'
import { BookingSchema } from '@/lib/schemas'
import { BookingFormData } from '@/lib/schemas'
import { trackEvent } from '@/lib/analytics'

type SubmissionState = 'idle' | 'loading' | 'success' | 'error'

interface BookingFormProps {
  className?: string
  onSuccess?: () => void
  defaultConsultationType?: 'cabinet' | 'domicile' | 'groupe' | 'distance'
}

export function BookingForm({ className, onSuccess, defaultConsultationType = 'cabinet' }: BookingFormProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormData>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      consultationType: defaultConsultationType,
      preferredDate: '',
      preferredTime: '',
      duration: '60',
      isFirstConsultation: true,
      reasonForConsultation: '',
      medicalHistory: '',
      emergencyContact: {
        name: '',
        phone: ''
      },
      rgpdConsent: false
    }
  })

  const onSubmit = async (data: BookingFormData) => {
    try {
      setSubmissionState('loading')
      setErrorMessage('')

      // Track form submission attempt
      trackEvent({
        action: 'booking_contact_start',
        category: 'booking',
        label: data.consultationType,
        custom_parameters: {
          consultation_type: data.consultationType,
          duration: data.duration,
          is_first_consultation: data.isFirstConsultation,
          method: 'contact_form'
        }
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          subject: `Demande de rendez-vous - ${data.consultationType}`,
          message: `${data.reasonForConsultation}\n\nType: ${data.consultationType}\nDurée: ${data.duration}min\nDate souhaitée: ${data.preferredDate}\nHeure souhaitée: ${data.preferredTime}`,
          source: 'booking_form'
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi de la demande')
      }

      // Track successful submission
      trackEvent({
        action: 'booking_contact_complete',
        category: 'booking',
        label: 'success',
        custom_parameters: {
          consultation_type: data.consultationType,
          duration: data.duration,
          contact_id: result.contactId,
          method: 'contact_form'
        }
      })

      setSubmissionState('success')
      reset()
      onSuccess?.()

      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        setSubmissionState('idle')
      }, 10000)

    } catch (error) {
      console.error('Booking contact form error:', error)
      
      // Track form error
      trackEvent({
        action: 'booking_contact_error',
        category: 'booking',
        label: 'submission_failed',
        custom_parameters: {
          error_message: error instanceof Error ? error.message : 'Unknown error',
          method: 'contact_form'
        }
      })

      setSubmissionState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue')
    }
  }

  const consultationTypes = [
    { value: 'cabinet', label: 'Consultation au cabinet (Rosny-sous-Bois)', duration: '60 ou 90 min' },
    { value: 'domicile', label: 'Consultation à domicile', duration: '90 min' },
    { value: 'distance', label: 'Consultation à distance (visio/téléphone)', duration: '60 ou 90 min' },
    { value: 'groupe', label: 'Thérapie de groupe', duration: '90 min' }
  ]

  const durations = [
    { value: '60', label: 'Consultation standard (60 min)', types: ['cabinet', 'distance'] },
    { value: '90', label: 'Consultation approfondie (90 min)', types: ['cabinet', 'domicile', 'groupe', 'distance'] }
  ]

  // Get minimum date (today + 1 day)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    return maxDate.toISOString().split('T')[0]
  }

  const watchedConsultationType = watch('consultationType')
  const availableDurations = durations.filter(d => d.types.includes(watchedConsultationType))

  if (submissionState === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Demande envoyée avec succès !
          </h3>
          <p className="text-green-700 mb-4">
            Votre demande de rendez-vous a bien été reçue. Je vous recontacterai 
            <strong> sous 24h</strong> pour organiser votre consultation.
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
              <EnvelopeIcon className="h-4 w-4" />
              <span>Email de confirmation envoyé</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
              <PhoneIcon className="h-4 w-4" />
              <span>Réponse garantie sous 24h</span>
            </div>
          </div>
          <p className="text-xs text-green-600 border-t pt-3">
            <strong>Urgence ?</strong> Contactez-moi directement au 06 51 68 74 30
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <span>Informations personnelles</span>
          </h3>
          
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
        </div>

        {/* Consultation Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Détails de votre demande
          </h3>

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
                  {type.label} - {type.duration}
                </option>
              ))}
            </select>
            {errors.consultationType && (
              <p className="text-sm text-red-600">{errors.consultationType.message}</p>
            )}
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Durée souhaitée <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableDurations.map((duration) => (
                <label key={duration.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    {...register('duration')}
                    value={duration.value}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{duration.label}</span>
                </label>
              ))}
            </div>
            {errors.duration && (
              <p className="text-sm text-red-600">{errors.duration.message}</p>
            )}
          </div>

          {/* Preferences Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Date souhaitée (approximative)"
              type="date"
              {...register('preferredDate')}
              error={errors.preferredDate?.message}
              min={getMinDate()}
              max={getMaxDate()}
              helperText="Donnez-moi une idée de vos disponibilités"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Créneau préféré (approximatif)
              </label>
              <select
                {...register('preferredTime')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="">Pas de préférence</option>
                <option value="morning">Matinée (9h-12h)</option>
                <option value="afternoon">Après-midi (14h-18h)</option>
                <option value="evening">Fin de journée (18h-21h)</option>
                <option value="saturday">Samedi (9h-17h)</option>
              </select>
              <p className="text-xs text-gray-500">
                Je vous proposerai des créneaux selon vos préférences
              </p>
            </div>
          </div>
        </div>

        {/* Consultation Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Informations sur la consultation
          </h3>

          {/* First Consultation */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="first-consultation"
              {...register('isFirstConsultation')}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="first-consultation" className="text-sm text-gray-700">
              <span className="font-medium">Il s'agit de ma première consultation</span>
              <p className="text-xs text-gray-600 mt-1">
                Cochez cette case si c'est votre première visite dans ce cabinet.
              </p>
            </label>
          </div>

          {/* Reason for Consultation */}
          <Textarea
            label="Motif de consultation"
            {...register('reasonForConsultation')}
            error={errors.reasonForConsultation?.message}
            placeholder="Décrivez brièvement ce qui vous amène à consulter. Ces informations m'aideront à mieux préparer notre rencontre."
            rows={4}
            helperText="Minimum 20 caractères - Ces informations restent strictement confidentielles"
            required
          />

          {/* Medical History */}
          <Textarea
            label="Antécédents médicaux (optionnel)"
            {...register('medicalHistory')}
            error={errors.medicalHistory?.message}
            placeholder="Mentionnez tout traitement en cours, allergie, ou information médicale importante."
            rows={3}
            helperText="Ces informations restent strictement confidentielles"
          />
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Contact d'urgence (optionnel mais recommandé)
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Nom du contact d'urgence"
              type="text"
              {...register('emergencyContact.name')}
              error={errors.emergencyContact?.name?.message}
              placeholder="Nom et prénom"
            />
            
            <Input
              label="Téléphone du contact d'urgence"
              type="tel"
              {...register('emergencyContact.phone')}
              error={errors.emergencyContact?.phone?.message}
              placeholder="06 12 34 56 78"
              helperText="Format français requis"
            />
          </div>
        </div>

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
                Vos données sont utilisées uniquement dans le cadre de votre suivi psychologique 
                et pour vous recontacter concernant vos rendez-vous. Elles ne sont jamais partagées 
                avec des tiers et sont protégées par le secret professionnel. 
                Vous pouvez demander leur suppression à tout moment.
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
              ? 'Envoi de votre demande...' 
              : 'Envoyer ma demande de rendez-vous'
            }
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            En envoyant cette demande, vous acceptez que je vous recontacte pour organiser votre consultation. 
            <strong>Réponse garantie sous 24h.</strong>
          </p>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start space-x-3">
              <PhoneIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-700 font-medium mb-1">
                  Vous préférez la réservation instantanée ?
                </p>
                <p className="text-xs text-blue-600">
                  Utilisez l'onglet "Réservation instantanée" ci-dessus pour réserver directement 
                  dans mon agenda, ou appelez-moi au <strong>06 51 68 74 30</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}