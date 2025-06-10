import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Container, ContainerProps } from './Container'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'dark'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  containerSize?: ContainerProps['size']
  children: React.ReactNode
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'lg', 
    containerSize = 'lg',
    children, 
    ...props 
  }, ref) => {
    const variants = {
      default: 'bg-white',
      primary: 'bg-blue-50',
      secondary: 'bg-gray-50',
      dark: 'bg-gray-900 text-white'
    }
    
    const paddings = {
      none: '',
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16 sm:py-20',
      xl: 'py-20 sm:py-24'
    }

    return (
      <section
        ref={ref}
        className={cn(
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        <Container size={containerSize}>
          {children}
        </Container>
      </section>
    )
  }
)

Section.displayName = 'Section'

export { Section }