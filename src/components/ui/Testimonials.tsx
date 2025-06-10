'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { Avatar, Card, CardContent } from '@/components/ui'
import { Testimonial } from '@/lib/types'

interface TestimonialsProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function Testimonials({ 
  testimonials, 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }, [testimonials.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, goToNext])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main testimonial display */}
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Card variant="testimonial" className="p-8 md:p-12">
              <CardContent className="text-center space-y-6">
                {/* Stars */}
                <div className="flex justify-center space-x-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center justify-center space-x-4">
                  <Avatar 
                    fallback={currentTestimonial.initials}
                    size="md"
                    className="bg-blue-100 text-blue-600"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {currentTestimonial.location} • {currentTestimonial.specialty}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goToPrevious}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          aria-label="Témoignage précédent"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          aria-label="Témoignage suivant"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <div 
          className="bg-blue-600 h-1 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

// Simplified testimonials grid for static display
export function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} variant="testimonial">
          <CardContent className="p-6 space-y-4">
            {/* Stars */}
            <div className="flex space-x-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-gray-700 text-sm leading-relaxed">
              "{testimonial.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center space-x-3">
              <Avatar 
                fallback={testimonial.initials}
                size="sm"
                className="bg-blue-100 text-blue-600"
              />
              <div>
                <p className="font-medium text-sm text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-600">
                  {testimonial.location}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}