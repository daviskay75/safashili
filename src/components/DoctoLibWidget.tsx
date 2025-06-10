'use client'

import React, { useEffect, useRef } from 'react'
import { Card, CardContent, Heading } from '@/components/ui'

interface DoctoLibWidgetProps {
  practitionerId?: string
  className?: string
}

export function DoctoLibWidget({ 
  practitionerId = process.env.NEXT_PUBLIC_DOCTOLIB_PRACTITIONER_ID || '1109217',
  className = ""
}: DoctoLibWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)
  const widgetInitializedRef = useRef(false)

  const showFallback = () => {
      if (!widgetRef.current) return
      
      widgetRef.current.innerHTML = `
        <div class="text-center p-8 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="mb-4">
            <svg class="h-12 w-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 12v-6m0 0V7m0 6h.01M12 17h.01"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-blue-900 mb-2">
            Widget de réservation en cours de chargement
          </h3>
          <p class="text-blue-700 mb-6">
            Vous pouvez réserver directement sur Doctolib ou m'appeler
          </p>
          <div class="space-y-3">
            <a 
              href="https://www.doctolib.fr/psychologue/rosny-sous-bois/safa-shili/booking?bookingFunnelSource=profile" 
              target="_blank"
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 12v-6m0 0V7m0 6h.01M12 17h.01"></path>
              </svg>
              Réserver sur Doctolib
            </a>
            <a href="tel:+33651687430" class="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full justify-center">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              Appeler: 06 51 68 74 30
            </a>
          </div>
        </div>
      `
    }

  const initializeWidget = () => {
    if (!widgetRef.current || !practitionerId) {
      showFallback()
      return
    }

    // Don't initialize if already done
    if (widgetInitializedRef.current) {
      return
    }

    // Initialize Doctolib widget
    try {
      // Clear any existing content only if not already initialized
      if (!widgetInitializedRef.current) {
        widgetRef.current.innerHTML = ''
      }
      
      // Create widget container with Safa Shili's actual Doctolib configuration
      const widgetContainer = document.createElement('div')
      widgetContainer.setAttribute('data-doctolib-practitioner', practitionerId)
      widgetContainer.setAttribute('data-doctolib-speciality', 'psychologue')
      widgetContainer.setAttribute('data-doctolib-place-id', process.env.NEXT_PUBLIC_DOCTOLIB_PLACE_ID || '629716')
      widgetContainer.setAttribute('data-doctolib-show-header', 'false')
      widgetContainer.setAttribute('data-doctolib-show-footer', 'false')
      widgetContainer.setAttribute('data-doctolib-theme', 'custom')
      widgetContainer.setAttribute('data-doctolib-city', 'rosny-sous-bois')
      widgetContainer.setAttribute('data-doctolib-profile-slug', 'safa-shili')
      widgetContainer.style.minHeight = '600px'
      widgetContainer.style.border = 'none'
      
      widgetRef.current.appendChild(widgetContainer)

      // Initialize widget if function is available
      if (window.DoctoLib && window.DoctoLib.init) {
        window.DoctoLib.init()
        widgetInitializedRef.current = true
        console.log('Doctolib widget initialized successfully')
      } else {
        // Fallback to direct Doctolib booking link
        setTimeout(showFallback, 2000) // Give it 2 seconds to load
      }
    } catch (error) {
      console.error('Error initializing Doctolib widget:', error)
      showFallback()
    }
  }

  useEffect(() => {
    // Only load script once
    if (scriptLoadedRef.current) {
      // If script is already loaded but widget not initialized, try to initialize
      if (!widgetInitializedRef.current) {
        initializeWidget()
      }
      return
    }
    
    const loadDoctoLibScript = () => {
      // Check if script already exists
      if (document.querySelector('script[src*="doctolib"]')) {
        initializeWidget()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://www.doctolib.fr/external/booking-widget.js'
      script.async = true
      script.onload = () => {
        scriptLoadedRef.current = true
        initializeWidget()
      }
      script.onerror = () => {
        console.error('Failed to load Doctolib widget script')
        showFallback()
      }
      
      document.head.appendChild(script)
    }

    // Load the script
    loadDoctoLibScript()

    // Cleanup function
    return () => {
      // Don't remove the script as it might be used elsewhere
    }
  }, [practitionerId])

  if (!practitionerId) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <p>Configuration Doctolib en cours...</p>
            <p className="text-sm mt-2">
              Veuillez contacter directement pour prendre rendez-vous
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <Heading as="h3" className="text-lg font-semibold text-gray-900 mb-4">
          Réservation en ligne
        </Heading>
        <div 
          ref={widgetRef}
          className="doctolib-widget-container"
          style={{ minHeight: '600px' }}
        >
          {/* Loading state */}
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement du calendrier Doctolib...</p>
              <p className="text-xs text-gray-500 mt-2">
                Si le chargement prend trop de temps, utilisez le lien direct ci-dessous
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          {/* Direct Doctolib Link - Always Available */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 mb-3">
              <strong>⚡ Réservation directe :</strong> Accédez immédiatement à votre agenda Doctolib
            </p>
            <a 
              href="https://www.doctolib.fr/psychologue/rosny-sous-bois/safa-shili/booking?bookingFunnelSource=profile" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 12v-6m0 0V7m0 6h.01M12 17h.01"></path>
              </svg>
              Ouvrir Doctolib
              <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>💡 Astuce :</strong> Le calendrier intégré apparaît ci-dessus une fois chargé. 
              Sinon, utilisez le lien direct Doctolib pour réserver immédiatement.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    DoctoLib: {
      init: () => void
    }
  }
}