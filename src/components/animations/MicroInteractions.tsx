'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Form field focus animation
interface FormFieldAnimationProps {
  children: React.ReactNode
  className?: string
}

export function FormFieldAnimation({ children, className }: FormFieldAnimationProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div
      className={className}
      animate={{
        scale: isFocused ? 1.02 : 1,
        boxShadow: isFocused 
          ? '0 0 0 3px rgba(59, 130, 246, 0.1)' 
          : '0 0 0 0px rgba(59, 130, 246, 0)'
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {children}
    </motion.div>
  )
}

// Success checkmark animation
export function SuccessCheckmark({ className }: { className?: string }) {
  return (
    <motion.svg
      className={`w-6 h-6 text-green-500 ${className || ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.1
      }}
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </motion.svg>
  )
}

// Error shake animation
interface ErrorShakeProps {
  children: React.ReactNode
  trigger: boolean
  className?: string
}

export function ErrorShake({ children, trigger, className }: ErrorShakeProps) {
  return (
    <motion.div
      className={className}
      animate={trigger ? {
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      } : {}}
    >
      {children}
    </motion.div>
  )
}

// Toast notification animation
interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  }

  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${typeStyles[type]}`}
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </motion.div>
  )
}

// Button ripple effect
interface RippleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function RippleButton({ children, onClick, className }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    }
    
    setRipples(prev => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
    
    onClick?.()
  }

  return (
    <button
      className={`relative overflow-hidden ${className || ''}`}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </button>
  )
}

// Floating action button animation
interface FloatingActionButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function FloatingActionButton({ children, onClick, className }: FloatingActionButtonProps) {
  return (
    <motion.button
      className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 ${className || ''}`}
      whileHover={{ 
        scale: 1.1,
        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

// Card flip animation
interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}

export function FlipCard({ front, back, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className={`relative w-full h-full cursor-pointer ${className || ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>
        
        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Typing animation
interface TypingAnimationProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypingAnimation({ text, speed = 50, className, onComplete }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      
      return () => clearTimeout(timeout)
    } else {
      onComplete?.()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-4 bg-current ml-1"
      />
    </span>
  )
}