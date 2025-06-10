// Blog utilities for psychology practice content management

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

// Types for blog posts
export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: string
  updatedAt?: string
  author: string
  category: BlogCategory
  tags: string[]
  excerpt: string
  readingTime: string
  featured: boolean
  seoTitle?: string
  seoDescription?: string
  image?: string
  relatedPosts?: string[]
}

export type BlogCategory = 
  | 'violence-conjugale'
  | 'psychotraumatologie'
  | 'therapie-adolescents'
  | 'accompagnement-adultes'
  | 'souffrance-travail'
  | 'bien-etre'
  | 'sante-mentale'
  | 'ressources'

// Blog configuration
export const BLOG_CONFIG = {
  POSTS_PER_PAGE: 6,
  CATEGORIES: {
    'violence-conjugale': {
      name: 'Violence conjugale',
      description: 'Articles sur la violence domestique et familiale',
      color: 'red'
    },
    'psychotraumatologie': {
      name: 'Psychotraumatologie',
      description: 'Comprendre et soigner les traumatismes',
      color: 'purple'
    },
    'therapie-adolescents': {
      name: 'Thérapie adolescents',
      description: 'Accompagnement des jeunes en difficulté',
      color: 'blue'
    },
    'accompagnement-adultes': {
      name: 'Accompagnement adultes',
      description: 'Soutien psychologique pour adultes',
      color: 'green'
    },
    'souffrance-travail': {
      name: 'Souffrance au travail',
      description: 'Burn-out, stress professionnel, harcèlement',
      color: 'orange'
    },
    'bien-etre': {
      name: 'Bien-être',
      description: 'Conseils pour améliorer son bien-être mental',
      color: 'teal'
    },
    'sante-mentale': {
      name: 'Santé mentale',
      description: 'Informations générales sur la santé psychologique',
      color: 'indigo'
    },
    'ressources': {
      name: 'Ressources',
      description: 'Outils et ressources utiles',
      color: 'gray'
    }
  } as const
}

// Get posts directory
const postsDirectory = path.join(process.cwd(), 'content/blog')

// Ensure content directory exists
export function ensureContentDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }
}

// Get all blog posts
export function getAllPosts(): BlogPost[] {
  ensureContentDirectory()
  
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // Calculate reading time
      const readingTimeResult = readingTime(content)
      
      // Generate excerpt if not provided
      const excerpt = data.excerpt || content.slice(0, 200).replace(/[#*`]/g, '') + '...'

      return {
        slug,
        title: data.title,
        description: data.description,
        content,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
        author: data.author || 'Safa Shili',
        category: data.category,
        tags: data.tags || [],
        excerpt,
        readingTime: readingTimeResult.text,
        featured: data.featured || false,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        image: data.image,
        relatedPosts: data.relatedPosts || []
      } as BlogPost
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1
    } else {
      return -1
    }
  })
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  const allPosts = getAllPosts()
  return allPosts.find(post => post.slug === slug) || null
}

// Get posts by category
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category === category)
}

// Get featured posts
export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured)
}

// Get related posts
export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts()
  
  // First try to get explicitly related posts
  const explicitlyRelated = currentPost.relatedPosts
    ? allPosts.filter(post => currentPost.relatedPosts!.includes(post.slug))
    : []
  
  // If we don't have enough, get posts from same category
  const categoryPosts = allPosts
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.category === currentPost.category &&
      !explicitlyRelated.some(related => related.slug === post.slug)
    )
    .slice(0, limit - explicitlyRelated.length)
  
  // Combine and limit
  return [...explicitlyRelated, ...categoryPosts].slice(0, limit)
}

// Get recent posts
export function getRecentPosts(limit: number = 5): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.slice(0, limit)
}

// Get posts with pagination
export function getPostsWithPagination(page: number = 1, postsPerPage: number = BLOG_CONFIG.POSTS_PER_PAGE) {
  const allPosts = getAllPosts()
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const startIndex = (page - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  
  return {
    posts: allPosts.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  }
}

// Search posts
export function searchPosts(query: string): BlogPost[] {
  const allPosts = getAllPosts()
  const lowercaseQuery = query.toLowerCase()
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Generate blog sitemap entries
export function getBlogSitemapEntries() {
  const allPosts = getAllPosts()
  
  return allPosts.map(post => ({
    url: `/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.6
  }))
}

// Get post categories with counts
export function getCategoriesWithCounts() {
  const allPosts = getAllPosts()
  const categoryCounts: Record<string, number> = {}
  
  allPosts.forEach(post => {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1
  })
  
  return Object.entries(BLOG_CONFIG.CATEGORIES).map(([key, categoryInfo]) => ({
    key: key as BlogCategory,
    ...categoryInfo,
    count: categoryCounts[key] || 0
  }))
}

// Validate blog post data
export function validatePostData(data: Record<string, unknown>): string[] {
  const errors: string[] = []
  
  if (!data.title) errors.push('Title is required')
  if (!data.description) errors.push('Description is required')
  if (!data.category) errors.push('Category is required')
  if (!data.publishedAt) errors.push('Published date is required')
  
  if (data.category && typeof data.category === 'string' && !(data.category in BLOG_CONFIG.CATEGORIES)) {
    errors.push('Invalid category')
  }
  
  return errors
}

// Generate SEO metadata for blog posts
export function generateBlogSEO(post: BlogPost) {
  return {
    title: post.seoTitle || `${post.title} | Blog Safa Shili Psychologue`,
    description: post.seoDescription || post.description,
    keywords: [
      ...post.tags,
      post.category,
      'psychologue',
      'Rosny-sous-Bois',
      'santé mentale',
      'bien-être'
    ],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      ...(post.image && { images: [{ url: post.image }] })
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      author: {
        '@type': 'Person',
        name: post.author
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      ...(post.image && { image: post.image })
    }
  }
}