'use client'

import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ExitIntentPopup, useExitIntentPopup } from '@/components/ExitIntentPopup'

interface LayoutProps {
  children: ReactNode
  className?: string
  disableExitIntent?: boolean
}

export function Layout({ children, className, disableExitIntent = false }: LayoutProps) {
  const { isActive, pageType, deactivate, currentUrl } = useExitIntentPopup()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${className || ''}`}>
        {children}
      </main>
      <Footer />
      
      {/* Exit Intent Popup */}
      {!disableExitIntent && isActive && (
        <ExitIntentPopup
          onClose={deactivate}
          pageType={pageType}
          currentUrl={currentUrl}
        />
      )}
    </div>
  )
}