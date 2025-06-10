'use client'

import { useEffect } from 'react'
import { enhancedSendToAnalytics } from '@/lib/analytics'

export default function WebVitals() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamic import to reduce bundle size
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        // Use enhanced analytics that sends to both performance monitoring and GA4
        onCLS(enhancedSendToAnalytics)
        onINP(enhancedSendToAnalytics)
        onFCP(enhancedSendToAnalytics)
        onLCP(enhancedSendToAnalytics)
        onTTFB(enhancedSendToAnalytics)
      }).catch(() => {
        // Fallback if web-vitals is not available
        console.log('Web Vitals tracking not available')
      })
    }
  }, [])

  // This component doesn't render anything visible
  return null
}