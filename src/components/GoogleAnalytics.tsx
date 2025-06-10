'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initGA4, trackPageView, debugGA4 } from '@/lib/analytics'


export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize GA4 on mount
    initGA4()
    
    // Debug in development
    if (process.env.NODE_ENV === 'development') {
      debugGA4()
    }
  }, [])

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      const url = window.location.origin + pathname
      const title = document.title
      trackPageView(url, title)
    }
  }, [pathname])

  // This component doesn't render anything visible
  return null
}

// Cookie consent banner component for GDPR compliance
export function CookieConsent() {
  // This would be a full cookie consent implementation
  // For now, just a placeholder that would integrate with the analytics consent
  
  return null // Placeholder for cookie consent UI
}