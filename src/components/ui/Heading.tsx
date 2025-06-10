import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  variant?: 'hero' | 'section' | 'subsection' | 'card' | 'small'
  align?: 'left' | 'center' | 'right'
  color?: 'default' | 'primary' | 'secondary' | 'muted'
  children: React.ReactNode
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ 
    className, 
    as: Tag = 'h2', 
    variant = 'section', 
    align = 'left', 
    color = 'default',
    children, 
    ...props 
  }, ref) => {
    const variants = {
      hero: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight',
      section: 'text-3xl sm:text-4xl font-bold tracking-tight',
      subsection: 'text-2xl sm:text-3xl font-bold tracking-tight',
      card: 'text-xl sm:text-2xl font-semibold',
      small: 'text-lg font-semibold'
    }
    
    const alignments = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }
    
    const colors = {
      default: 'text-gray-900',
      primary: 'text-blue-600',
      secondary: 'text-gray-600',
      muted: 'text-gray-500'
    }

    return (
      <Tag
        ref={ref}
        className={cn(
          variants[variant],
          alignments[align],
          colors[color],
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

Heading.displayName = 'Heading'

export { Heading }