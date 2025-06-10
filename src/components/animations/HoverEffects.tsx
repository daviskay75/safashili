'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Hover scale effect for cards and buttons
interface HoverScaleProps {
  children: React.ReactNode
  scale?: number
  className?: string
}

export function HoverScale({ children, scale = 1.02, className }: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// Hover lift effect for cards
interface HoverLiftProps {
  children: React.ReactNode
  className?: string
}

export function HoverLift({ children, className }: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -4,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

// Magnetic hover effect
interface MagneticHoverProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticHover({ children, className, strength = 20 }: MagneticHoverProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = event.clientX - centerX
    const deltaY = event.clientY - centerY
    
    x.set(deltaX * (strength / 100))
    y.set(deltaY * (strength / 100))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// Button press animation
interface ButtonPressProps {
  children: React.ReactNode
  className?: string
}

export function ButtonPress({ children, className }: ButtonPressProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {children}
    </motion.div>
  )
}

// Text reveal animation
interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const words = children.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Icon bounce animation
interface IconBounceProps {
  children: React.ReactNode
  className?: string
}

export function IconBounce({ children, className }: IconBounceProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: [0, -4, 0],
        transition: {
          duration: 0.3,
          ease: 'easeInOut'
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Progress bar animation
interface ProgressBarProps {
  progress: number
  className?: string
  color?: string
}

export function ProgressBar({ progress, className, color = '#3b82f6' }: ProgressBarProps) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className || ''}`}>
      <motion.div
        className="h-2 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  )
}

// Count up animation
interface CountUpProps {
  end: number
  duration?: number
  className?: string
}

export function CountUp({ end, className }: CountUpProps) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))

  React.useEffect(() => {
    const animation = motionValue.set(end)
    return () => animation
  }, [motionValue, end])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  )
}