'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import { Heading } from '@/components/ui'

// MDX Components for client-side rendering
const mdxComponents = {
  h1: (props: any) => (
    <Heading as="h1" variant="section" className="mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <Heading as="h2" variant="card" className="mt-6 mb-3" {...props} />
  ),
  h3: (props: any) => (
    <Heading as="h3" variant="small" className="mt-4 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4 text-gray-700 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="mb-4 pl-6 list-disc space-y-1" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-4 pl-6 list-decimal space-y-1" {...props} />
  ),
  li: (props: any) => (
    <li className="text-gray-700" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-200 pl-6 py-4 my-6 bg-blue-50 italic text-gray-700" {...props} />
  ),
  a: (props: any) => {
    const { href, children, ...rest } = props
    return (
      <Link 
        href={href || '#'} 
        className="text-blue-600 hover:text-blue-700 underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {children}
      </Link>
    )
  },
  code: (props: any) => (
    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  )
}

interface MDXContentProps {
  source: MDXRemoteSerializeResult
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote 
      {...source} 
      components={mdxComponents}
    />
  )
}