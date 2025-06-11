'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { XMarkIcon, DocumentArrowDownIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { LeadMagnetDownloadSchema } from '@/lib/schemas'
import { Button, Input } from '@/components/ui'
import { trackEvent } from '@/lib/analytics'
import type { LeadMagnetDownloadData } from '@/lib/types'

interface ExitIntentPopupProps {
  onClose: () => void
  pageType?: 'violence' | 'anxiety' | 'consultation' | 'general'
  currentUrl: string
}

interface PopupVariant {
  id: string
  title: string
  subtitle: string
  leadMagnetSlug: string
  buttonText: string
  bgColor: string
  description: string
}

// Configuration des variantes de popup selon le type de page
const POPUP_VARIANTS: Record<string, PopupVariant> = {
  violence: {
    id: 'violence-guide',
    title: 'Attendez ! Un guide peut vous aider',
    subtitle: 'Guide gratuit : "Sortir de la violence conjugale"',
    leadMagnetSlug: 'sortir-violence-conjugale',
    buttonText: 'Recevoir le guide gratuit',
    bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
    description: 'Un guide complet avec des ressources concrètes pour vous accompagner vers la sortie de violence.'
  },
  anxiety: {
    id: 'anxiety-guide',
    title: 'Avant de partir...',
    subtitle: 'Techniques gratuites contre l\'anxiété',
    leadMagnetSlug: 'gerer-anxiete-quotidien',
    buttonText: 'Télécharger les techniques',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    description: 'Des techniques concrètes que vous pouvez appliquer immédiatement pour gérer votre anxiété.'
  },
  consultation: {
    id: 'consultation-checklist',
    title: 'Une question importante...',
    subtitle: 'Ai-je besoin de consulter un psychologue ?',
    leadMagnetSlug: '10-signes-consultation',
    buttonText: 'Faire le test gratuit',
    bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
    description: 'Une checklist simple pour identifier si un accompagnement psychologique pourrait vous aider.'
  },
  general: {
    id: 'general-consultation',
    title: 'Première consultation gratuite',
    subtitle: '15 minutes pour échanger sur votre situation',
    leadMagnetSlug: '10-signes-consultation',
    buttonText: 'Découvrir la consultation',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    description: 'Échangeons ensemble pour voir comment je peux vous accompagner dans votre démarche.'
  }
}

export function ExitIntentPopup({ onClose, pageType = 'general', currentUrl }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const exitIntentRef = useRef<boolean>(false)
  
  const variant = POPUP_VARIANTS[pageType] || POPUP_VARIANTS.general

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LeadMagnetDownloadData>({
    resolver: zodResolver(LeadMagnetDownloadSchema),
    defaultValues: {
      leadMagnetSlug: variant.leadMagnetSlug,
      source: currentUrl,
      subscribeToNewsletter: true,
      rgpdConsent: false
    }
  })

  // Détection de l'intention de sortie
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      // Vérifier si la souris sort par le haut de la page
      if (e.clientY <= 0 && !hasTriggered && !exitIntentRef.current) {
        setHasTriggered(true)
        exitIntentRef.current = true
        
        // Délai pour éviter les faux positifs
        timeoutId = setTimeout(() => {
          setIsVisible(true)
          trackEvent({
            action: 'exit_intent_shown',
            category: 'popup',
            label: variant.id,
            custom_parameters: { pageType, url: currentUrl }
          })
        }, 100)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose()
      }
    }

    // Détection mobile : scroll rapide vers le haut
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollSpeed = lastScrollY - currentScrollY
      
      // Si scroll rapide vers le haut et proche du top
      if (scrollSpeed > 50 && currentScrollY < 100 && !hasTriggered && !exitIntentRef.current) {
        setHasTriggered(true)
        exitIntentRef.current = true
        
        timeoutId = setTimeout(() => {
          setIsVisible(true)
          trackEvent({
            action: 'exit_intent_shown_mobile',
            category: 'popup',
            label: variant.id,
            custom_parameters: { pageType, url: currentUrl }
          })
        }, 200)
      }
      
      lastScrollY = currentScrollY
    }

    // Détection desktop
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('keydown', handleKeyDown)
    
    // Détection mobile
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isVisible, hasTriggered, variant.id, pageType, currentUrl])

  // Fermeture automatique après succès
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        handleClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  const handleClose = () => {
    setIsVisible(false)
    trackEvent({
      action: 'exit_intent_closed',
      category: 'popup',
      label: variant.id,
      custom_parameters: { pageType, url: currentUrl, converted: isSuccess }
    })
    setTimeout(onClose, 300) // Délai pour l'animation
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const onSubmit = async (data: LeadMagnetDownloadData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        reset()
        
        trackEvent({
          action: 'exit_intent_converted',
          category: 'popup',
          label: variant.id,
          value: 1,
          custom_parameters: { 
            pageType, 
            url: currentUrl,
            subscribed: data.subscribeToNewsletter,
            leadMagnet: data.leadMagnetSlug
          }
        })
      } else {
        console.error('Erreur lors du téléchargement:', result.error)
        // Ici on pourrait afficher une erreur à l'utilisateur
      }
    } catch (error) {
      console.error('Erreur soumission popup:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        ref={popupRef}
        className={`relative w-full max-w-md mx-4 p-6 rounded-2xl shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${variant.bgColor}`}
      >
        {/* Bouton fermeture */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fermer"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {isSuccess ? (
          // État de succès
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Guide envoyé !
            </h3>
            <p className="text-gray-600">
              Vérifiez votre boîte email. Si vous ne le voyez pas, regardez dans vos spams.
            </p>
          </div>
        ) : (
          // Formulaire principal
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <DocumentArrowDownIcon className="h-8 w-8 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {variant.title}
              </h2>
              
              <h3 className="text-lg font-semibold text-blue-600 mb-3">
                {variant.subtitle}
              </h3>
              
              <p className="text-gray-600 text-sm">
                {variant.description}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    {...register('firstName')}
                    placeholder="Prénom"
                    error={errors.firstName?.message}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Input
                    {...register('lastName')}
                    placeholder="Nom (optionnel)"
                    className="text-sm"
                  />
                </div>
              </div>

              <Input
                {...register('email')}
                type="email"
                placeholder="Votre email"
                error={errors.email?.message}
                className="text-sm"
              />

              <Input
                {...register('phone')}
                type="tel"
                placeholder="Téléphone (optionnel)"
                className="text-sm"
              />

              {/* Cases à cocher */}
              <div className="space-y-3 text-sm">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('subscribeToNewsletter')}
                    className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">
                    Recevoir des conseils et techniques par email (recommandé)
                  </span>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('rgpdConsent')}
                    className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    required
                  />
                  <span className="text-gray-700">
                    J'accepte le traitement de mes données personnelles*
                  </span>
                </label>
                {errors.rgpdConsent && (
                  <p className="text-red-500 text-xs">{errors.rgpdConsent.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
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
                  variant.buttonText
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                * Conformément au RGPD. Vous pouvez vous désabonner à tout moment.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// Hook pour utiliser le popup avec smart targeting
export function useExitIntentPopup() {
  const [isActive, setIsActive] = useState(false)
  const [pageType, setPageType] = useState<'violence' | 'anxiety' | 'consultation' | 'general'>('general')

  useEffect(() => {
    // Déterminer le type de page basé sur l'URL
    const currentPath = window.location.pathname.toLowerCase()
    
    if (currentPath.includes('violence') || currentPath.includes('conjugale')) {
      setPageType('violence')
    } else if (currentPath.includes('anxiet') || currentPath.includes('stress')) {
      setPageType('anxiety')
    } else if (currentPath.includes('consultation') || currentPath.includes('rendez-vous')) {
      setPageType('consultation')
    } else {
      setPageType('general')
    }

    // Vérifier si le popup a déjà été montré récemment
    const lastShown = localStorage.getItem('exitIntentLastShown')
    const now = Date.now()
    const dayInMs = 24 * 60 * 60 * 1000 * 7 // 7 jours

    if (!lastShown || (now - parseInt(lastShown)) > dayInMs) {
      setIsActive(true)
    }
  }, [])

  const deactivate = () => {
    setIsActive(false)
    localStorage.setItem('exitIntentLastShown', Date.now().toString())
  }

  return {
    isActive,
    pageType,
    deactivate,
    currentUrl: typeof window !== 'undefined' ? window.location.href : ''
  }
}