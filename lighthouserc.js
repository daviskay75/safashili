module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/about',
        'http://localhost:3000/contact',
        'http://localhost:3000/specialites',
      ],
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.85 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:pwa': 'off',
        
        // Core Web Vitals
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'first-input-delay': ['warn', { maxNumericValue: 100 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
        
        // Performance budgets
        'resource-summary:script:size': ['warn', { maxNumericValue: 200000 }], // 200KB
        'resource-summary:image:size': ['warn', { maxNumericValue: 500000 }], // 500KB
        'resource-summary:document:size': ['warn', { maxNumericValue: 100000 }], // 100KB
        'resource-summary:font:size': ['warn', { maxNumericValue: 100000 }], // 100KB
        'resource-summary:stylesheet:size': ['warn', { maxNumericValue: 50000 }], // 50KB
        
        // SEO Requirements
        'meta-description': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-viewport': 'error',
        'structured-data': 'warn',
        
        // Accessibility
        'color-contrast': 'error',
        'image-alt': 'error',
        'aria-roles': 'error',
        'heading-order': 'warn',
        
        // Best Practices
        'uses-https': 'error',
        'no-vulnerable-libraries': 'warn',
        'external-anchors-use-rel-noopener': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}