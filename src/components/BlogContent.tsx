'use client'

import dynamic from 'next/dynamic'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'

const MDXContent = dynamic(() => import('./MDXContent').then(mod => ({ default: mod.MDXContent })), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
    </div>
  )
})

interface BlogContentProps {
  source: MDXRemoteSerializeResult
}

export function BlogContent({ source }: BlogContentProps) {
  return <MDXContent source={source} />
}