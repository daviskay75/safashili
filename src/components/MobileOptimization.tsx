'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

// Mobile-optimized Image component with lazy loading
interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  unoptimized?: boolean
}

export function LazyImage({ src, alt, className, width, height, priority = false, unoptimized = false }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    skip: priority
  })

  const shouldLoad = priority || inView

  return (
    <div ref={ref} className={className}>
      {shouldLoad && (
        <Image
          src={src}
          alt={alt}
          width={width || 400}
          height={height || 300}
          priority={priority}
          unoptimized={unoptimized}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className || ''}`}
        />
      )}
      {!isLoaded && shouldLoad && (
        <div 
          className={`bg-gray-200 animate-pulse ${className || ''}`}
          style={{ width, height }}
          aria-label="Image en cours de chargement"
        />
      )}
    </div>
  )
}

// Viewport height fix for mobile browsers
export function ViewportHeightFix() {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setVH()
    window.addEventListener('resize', setVH)
    window.addEventListener('orientationchange', setVH)

    return () => {
      window.removeEventListener('resize', setVH)
      window.removeEventListener('orientationchange', setVH)
    }
  }, [])

  return null
}

// Mobile performance optimizations
export function MobilePerformance() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload font files
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.href = '/fonts/inter.woff2'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.crossOrigin = 'anonymous'
      document.head.appendChild(fontLink)
    }

    // Optimize touch events
    const optimizeTouchEvents = () => {
      // Add passive listeners for better scroll performance
      document.addEventListener('touchstart', () => {}, { passive: true })
      document.addEventListener('touchmove', () => {}, { passive: true })
    }

    // iOS Safari specific optimizations
    const iosSafariOptimizations = () => {
      // Prevent iOS Safari from adjusting font size
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const viewport = document.querySelector('meta[name=viewport]')
        if (viewport) {
          viewport.setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          )
        }
      }
    }

    preloadCriticalResources()
    optimizeTouchEvents()
    iosSafariOptimizations()
  }, [])

  return null
}

// Mobile-specific animations and interactions
interface TouchFeedbackProps {
  children: React.ReactNode
  className?: string
  onTap?: () => void
}

export function TouchFeedback({ children, className, onTap }: TouchFeedbackProps) {
  const [isTouched, setIsTouched] = useState(false)

  const handleTouchStart = () => {
    setIsTouched(true)
  }

  const handleTouchEnd = () => {
    setIsTouched(false)
    onTap?.()
  }

  return (
    <div
      className={`${className || ''} ${
        isTouched ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
      } transition-all duration-150 ease-out`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => setIsTouched(false)}
    >
      {children}
    </div>
  )
}

// Mobile navigation helper
export function MobileNavOptimization() {
  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    const handleMobileMenuScroll = () => {
      const mobileMenu = document.querySelector('[data-mobile-menu]')
      if (mobileMenu) {
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = 'unset'
        }
      }
    }

    // Handle safe area insets for modern mobile devices
    const handleSafeAreaInsets = () => {
      const root = document.documentElement
      root.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top)')
      root.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)')
      root.style.setProperty('--safe-area-inset-left', 'env(safe-area-inset-left)')
      root.style.setProperty('--safe-area-inset-right', 'env(safe-area-inset-right)')
    }

    handleMobileMenuScroll()
    handleSafeAreaInsets()
  }, [])

  return null
}

// Progressive Web App optimizations
export function PWAOptimizations() {
  useEffect(() => {
    // Add meta tags for PWA
    const addPWAMeta = () => {
      // Theme color for browser UI
      const themeColorMeta = document.createElement('meta')
      themeColorMeta.name = 'theme-color'
      themeColorMeta.content = '#3b82f6'
      document.head.appendChild(themeColorMeta)

      // Status bar style for iOS
      const statusBarMeta = document.createElement('meta')
      statusBarMeta.name = 'apple-mobile-web-app-status-bar-style'
      statusBarMeta.content = 'default'
      document.head.appendChild(statusBarMeta)

      // Enable web app mode for iOS
      const webAppMeta = document.createElement('meta')
      webAppMeta.name = 'apple-mobile-web-app-capable'
      webAppMeta.content = 'yes'
      document.head.appendChild(webAppMeta)
    }

    addPWAMeta()
  }, [])

  return null
}

// Main mobile optimization wrapper
export function MobileOptimization({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ViewportHeightFix />
      <MobilePerformance />
      <MobileNavOptimization />
      <PWAOptimizations />
      {children}
    </>
  )
}