'use client'

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FAQ as FAQType } from '@/lib/types'

interface FAQProps {
  faqs: FAQType[]
  className?: string
}

export function FAQ({ faqs, className }: FAQProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {faqs.map((faq, index) => (
        <Disclosure key={index} as="div" className="border border-gray-200 rounded-lg">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={cn(
                    'h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0',
                    open && 'rotate-180'
                  )}
                />
              </Disclosure.Button>
              
              <Disclosure.Panel
                as={motion.div}
                initial={false}
                animate={{
                  height: open ? 'auto' : 0,
                  opacity: open ? 1 : 0
                }}
                transition={{ duration: 0.2, ease: 'easeInOut' } as any}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}

// Compact FAQ variant for smaller spaces
export function FAQCompact({ faqs, className }: FAQProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {faqs.map((faq, index) => (
        <Disclosure key={index} as="div" className="border-b border-gray-200 last:border-b-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-left hover:text-blue-600 transition-colors">
                <span className="font-medium text-sm text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={cn(
                    'h-4 w-4 text-gray-500 transition-transform duration-200 flex-shrink-0',
                    open && 'rotate-180'
                  )}
                />
              </Disclosure.Button>
              
              <Disclosure.Panel
                as={motion.div}
                initial={false}
                animate={{
                  height: open ? 'auto' : 0,
                  opacity: open ? 1 : 0
                }}
                transition={{ duration: 0.2, ease: 'easeInOut' } as any}
                className="overflow-hidden"
              >
                <div className="pb-3 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}

// FAQ with search functionality
export function FAQWithSearch({ faqs, className }: FAQProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={cn('space-y-6', className)}>
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher dans les questions fréquentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results */}
      {filteredFAQs.length > 0 ? (
        <FAQ faqs={filteredFAQs} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          Aucune question ne correspond à votre recherche.
        </div>
      )}
    </div>
  )
}