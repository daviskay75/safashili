import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Card, CardContent, Heading } from '@/components/ui'
import { getContextualLinks, type PageContext } from '@/lib/internal-linking'

interface RelatedContentProps {
  context: PageContext
  title?: string
  className?: string
  maxItems?: number
  variant?: 'default' | 'compact' | 'sidebar'
}

export default function RelatedContent({ 
  context, 
  title = "Contenus liés", 
  className = "",
  maxItems = 6,
  variant = 'default'
}: RelatedContentProps) {
  const suggestions = getContextualLinks(context).slice(0, maxItems)
  
  if (suggestions.length === 0) {
    return null
  }

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <Link
              key={index}
              href={suggestion.url}
              className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-700">
                    {suggestion.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {suggestion.description}
                  </p>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-gray-50 p-6 rounded-lg ${className}`}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
        <nav className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <Link
              key={index}
              href={suggestion.url}
              className="block p-3 bg-white rounded-md border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <h4 className="font-medium text-gray-900 group-hover:text-blue-700 mb-1">
                {suggestion.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {suggestion.description}
              </p>
              <span className="text-xs text-blue-600 group-hover:text-blue-700 font-medium">
                {suggestion.anchor} →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    )
  }

  // Default variant
  return (
    <section className={className}>
      <Heading as="h2" variant="section" className="text-center mb-8">
        {title}
      </Heading>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                  {suggestion.title}
                </h3>
                <div className={`w-2 h-2 rounded-full ${
                  suggestion.relevance === 'high' ? 'bg-green-500' : 
                  suggestion.relevance === 'medium' ? 'bg-yellow-500' : 'bg-gray-300'
                }`} />
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {suggestion.description}
              </p>
              
              <Link
                href={suggestion.url}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
              >
                {suggestion.anchor}
                <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

// Breadcrumb component using internal linking logic
interface BreadcrumbProps {
  pathname: string
  className?: string
}

export function Breadcrumb({ pathname, className = "" }: BreadcrumbProps) {
  const breadcrumbs = generateBreadcrumbs(pathname)
  
  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav className={`${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-blue-600 transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Quick links component for high-priority internal links
interface QuickLinksProps {
  context: PageContext
  className?: string
}

export function QuickLinks({ context, className = "" }: QuickLinksProps) {
  const suggestions = getContextualLinks(context)
    .filter(s => s.relevance === 'high')
    .slice(0, 4)
  
  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className={`bg-blue-50 p-6 rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Liens rapides
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <Link
            key={index}
            href={suggestion.url}
            className="flex items-center p-3 bg-white rounded-md border border-blue-200 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 group-hover:text-blue-700">
                {suggestion.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-1">
                {suggestion.anchor}
              </p>
            </div>
            <ArrowRightIcon className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  )
}

// In-content auto-linking component
interface AutoLinkedTextProps {
  children: string
  currentPath: string
  className?: string
}

export function AutoLinkedText({ children, currentPath, className = "" }: AutoLinkedTextProps) {
  const linkedContent = autoLinkContent(children, currentPath)
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: linkedContent }}
    />
  )
}

// Import the function from internal-linking
import { generateBreadcrumbs, autoLinkContent } from '@/lib/internal-linking'