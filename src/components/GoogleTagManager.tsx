'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initGTM, PsychologyDataLayerEvents, debugGTM } from '@/lib/tag-manager'


export default function GoogleTagManager() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize GTM on mount
    initGTM()
    
    // Debug in development
    if (process.env.NODE_ENV === 'development') {
      debugGTM()
    }
  }, [])

  useEffect(() => {
    // Track page views with enhanced data for psychology practice
    if (pathname) {
      const pageData = {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
        content_group1: getContentGroup1(pathname),
        content_group2: getContentGroup2(pathname)
      }
      
      PsychologyDataLayerEvents.pageView(pageData)
    }
  }, [pathname])

  return null
}

// Helper functions to categorize content
function getContentGroup1(pathname: string): string {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/specialites')) return 'specialty'
  if (pathname.startsWith('/modalites')) return 'modality'
  if (pathname.startsWith('/secteur')) return 'location'
  if (pathname === '/about') return 'about'
  if (pathname === '/contact') return 'contact'
  if (pathname.startsWith('/blog')) return 'blog'
  if (pathname === '/infos-pratiques') return 'info'
  return 'other'
}

function getContentGroup2(pathname: string): string | undefined {
  // Extract specific specialty or page type
  const pathParts = pathname.split('/')
  if (pathParts[1] === 'specialites' && pathParts[2]) {
    return pathParts[2] // e.g., 'violence-conjugale'
  }
  if (pathParts[1] === 'modalites' && pathParts[2]) {
    return pathParts[2] // e.g., 'consultation-cabinet'
  }
  if (pathParts[1] === 'secteur' && pathParts[2]) {
    return pathParts[2] // e.g., 'rosny-sous-bois'
  }
  return undefined
}