import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'
import { 
  getPostBySlug, 
  getAllPosts, 
  getRelatedPosts,
  generateBlogSEO,
  BLOG_CONFIG 
} from '@/lib/blog'
import { Container, Section, Heading, Card, CardContent, Badge } from '@/components/ui'
import { ClockIcon, TagIcon, UserIcon, CalendarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { BlogContent } from '@/components/BlogContent'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Article non trouvé | Safa Shili Psychologue',
      description: 'L\'article demandé n\'a pas été trouvé.'
    }
  }

  const seo = generateBlogSEO(post)
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      url: `/blog/${post.slug}`,
      ...(post.image && { images: [{ url: post.image }] })
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(post.image && { images: [post.image] })
    }
  }
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post, 3)
  const mdxSource = await serialize(post.content)

  return (
    <main>
        {/* Article Header */}
        <Section variant="secondary">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Back Link */}
              <Link 
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Retour au blog
              </Link>

              {/* Article Meta */}
              <div className="mb-6">
                <Badge 
                  variant="secondary"
                  className={`mb-4 bg-${BLOG_CONFIG.CATEGORIES[post.category].color}-50 
                    text-${BLOG_CONFIG.CATEGORIES[post.category].color}-700 
                    border-${BLOG_CONFIG.CATEGORIES[post.category].color}-200`}
                >
                  {BLOG_CONFIG.CATEGORIES[post.category].name}
                </Badge>
                
                <Heading as="h1" variant="hero" className="mb-4">
                  {post.title}
                </Heading>
                
                <p className="text-xl text-gray-600 mb-6">
                  {post.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    <span>Par {post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>{post.readingTime}</span>
                  </div>
                  {post.updatedAt && post.updatedAt !== post.publishedAt && (
                    <div className="flex items-center gap-2">
                      <span>Mis à jour le</span>
                      <time dateTime={post.updatedAt}>
                        {new Date(post.updatedAt).toLocaleDateString('fr-FR')}
                      </time>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Article Content */}
        <Section variant="default">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <article className="lg:col-span-3 prose prose-lg max-w-none">
                  <BlogContent source={mdxSource} />
                  
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <TagIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Tags :</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-8 space-y-6">
                    {/* Table of Contents could go here */}
                    
                    {/* CTA */}
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-6 text-center">
                        <Heading as="h3" variant="card" className="text-blue-900 mb-3">
                          Besoin d&apos;accompagnement ?
                        </Heading>
                        <p className="text-blue-700 text-sm mb-4">
                          Je peux vous aider dans votre démarche thérapeutique
                        </p>
                        <Link
                          href="/contact"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                          Prendre rendez-vous
                        </Link>
                      </CardContent>
                    </Card>
                    
                    {/* Share buttons could go here */}
                  </div>
                </aside>
              </div>
            </div>
          </Container>
        </Section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Section variant="default" className="bg-gray-50">
            <Container>
              <div className="max-w-4xl mx-auto">
                <Heading as="h2" variant="section" className="text-center mb-8">
                  Articles similaires
                </Heading>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.slug} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <Badge 
                          variant="secondary" 
                          className={`mb-3 bg-${BLOG_CONFIG.CATEGORIES[relatedPost.category].color}-50 
                            text-${BLOG_CONFIG.CATEGORIES[relatedPost.category].color}-700 
                            border-${BLOG_CONFIG.CATEGORIES[relatedPost.category].color}-200`}
                        >
                          {BLOG_CONFIG.CATEGORIES[relatedPost.category].name}
                        </Badge>
                        
                        <Heading as="h3" variant="card" className="mb-3">
                          <Link 
                            href={`/blog/${relatedPost.slug}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {relatedPost.title}
                          </Link>
                        </Heading>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedPost.readingTime}</span>
                          <time dateTime={relatedPost.publishedAt}>
                            {new Date(relatedPost.publishedAt).toLocaleDateString('fr-FR')}
                          </time>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        )}
      </main>
  )
}