import { HTMLAttributes, forwardRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  fallback?: string
  children?: React.ReactNode
  unoptimized?: boolean
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', fallback, children, unoptimized = false, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
      '2xl': 'h-20 w-20'
    }
    
    const textSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
      '2xl': 'text-xl'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full',
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || 'Avatar'}
            fill
            className="object-cover"
            unoptimized={unoptimized}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : fallback ? (
          <div className={cn(
            'flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 font-medium',
            textSizes[size]
          )}>
            {fallback}
          </div>
        ) : children ? (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            {children}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <svg
              className={cn('h-1/2 w-1/2 text-gray-400')}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }