// Performance monitoring and Web Vitals tracking

// Types for Web Vitals
interface Metric {
  id: string
  name: string
  value: number
  delta: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

// Analytics function (placeholder for future GA4 integration)
export function sendToAnalytics(metric: Metric) {
  // In production, this would send to Google Analytics 4
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    })
  }

  // Example GA4 implementation:
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', metric.name, {
  //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //     event_category: 'Web Vitals',
  //     event_label: metric.id,
  //     non_interaction: true,
  //   })
  // }
}

// Core Web Vitals thresholds
export const VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay  
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
  INP: { good: 200, poor: 500 },   // Interaction to Next Paint
}

// Get performance rating
export function getPerformanceRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = VITALS_THRESHOLDS[name as keyof typeof VITALS_THRESHOLDS]
  if (!thresholds) return 'good'
  
  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.poor) return 'needs-improvement'
  return 'poor'
}

// Performance optimization utilities
export const performanceUtils = {
  // Preload critical resources
  preloadResource: (href: string, as: string, type?: string) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (type) link.type = type
    document.head.appendChild(link)
  },

  // Prefetch next pages
  prefetchPage: (href: string) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)
  },

  // Lazy load images with Intersection Observer
  lazyLoadImages: () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.classList.remove('lazy')
              imageObserver.unobserve(img)
            }
          }
        })
      })

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
    }
  },

  // Critical CSS inline helper
  inlineCriticalCSS: (css: string) => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
  },

  // Resource hints for better loading
  addResourceHints: () => {
    // DNS prefetch for external domains
    const domains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com',
      'www.googletagmanager.com'
    ]

    domains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = `//${domain}`
      document.head.appendChild(link)
    })
  }
}

// Performance monitoring hook for React components
export function usePerformanceMonitor(componentName: string) {
  if (typeof window !== 'undefined' && window.performance) {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      if (duration > 16.67) { // > 1 frame at 60fps
        console.warn(`Slow component render: ${componentName} took ${duration.toFixed(2)}ms`)
      }
    }
  }
  
  return () => {} // No-op for SSR
}

// Bundle size analyzer helper
export const bundleAnalysis = {
  // Track bundle sizes in development
  logBundleSize: (bundleName: string, size: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Bundle: ${bundleName} - ${(size / 1024).toFixed(2)}KB`)
    }
  },

  // Check for large dependencies
  checkLargeDependencies: () => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      // This would be enhanced with actual bundle analysis
      console.log('Bundle analysis available with: npm run analyze')
    }
  }
}

// Image optimization helpers
export const imageOptimization = {
  // Generate responsive image srcSet
  generateSrcSet: (baseUrl: string, sizes: number[]) => {
    return sizes.map(size => `${baseUrl}?w=${size} ${size}w`).join(', ')
  },

  // Calculate optimal image dimensions
  calculateImageSize: (containerWidth: number, devicePixelRatio = 1) => {
    const optimalWidth = Math.ceil(containerWidth * devicePixelRatio)
    
    // Round to nearest device size for better caching
    const deviceSizes = [640, 750, 828, 1080, 1200, 1920]
    return deviceSizes.find(size => size >= optimalWidth) || 1920
  },

  // Lazy loading with blur placeholder
  createBlurDataURL: (width: number, height: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      ctx.fillStyle = '#f3f4f6' // gray-100
      ctx.fillRect(0, 0, width, height)
    }
    
    return canvas.toDataURL()
  }
}