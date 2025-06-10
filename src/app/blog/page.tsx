import { Metadata } from 'next'
import Link from 'next/link'
import { 
  getAllPosts, 
  getCategoriesWithCounts, 
  BLOG_CONFIG
} from '@/lib/blog'
import { Layout } from '@/components/layout'
import { Container, Section, Heading, Card, CardContent, Badge } from '@/components/ui'
import { ClockIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Blog | Safa Shili Psychologue - Conseils et Ressources en Santé Mentale',
  description: 'Articles de blog sur la psychologie, violence conjugale, psychotraumatologie et bien-être mental par Safa Shili, psychologue clinicienne à Rosny-sous-Bois.',
  keywords: [
    'blog psychologie',
    'articles santé mentale',
    'conseils psychologue',
    'violence conjugale ressources',
    'psychotraumatologie',
    'bien-être mental',
    'Rosny-sous-Bois'
  ],
  openGraph: {
    title: 'Blog - Conseils et Ressources en Santé Mentale',
    description: 'Articles de blog sur la psychologie et le bien-être mental par Safa Shili, psychologue clinicienne.',
    type: 'website',
    url: '/blog'
  }
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const categories = getCategoriesWithCounts()

  return (
    <Layout>
        {/* Hero Section */}
        <Section variant="primary" className="bg-gradient-to-br from-blue-50 to-teal-50">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <Heading as="h1" variant="hero" className="mb-6">
                Blog & Ressources
              </Heading>
              <p className="text-xl text-gray-600 mb-8">
                Articles de psychologie, conseils pratiques et ressources pour votre bien-être mental. 
                Découvrez des contenus spécialisés en violence conjugale, psychotraumatologie et accompagnement thérapeutique.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.filter(cat => cat.count > 0).slice(0, 4).map((category) => (
                  <Link
                    key={category.key}
                    href={`/blog?category=${category.key}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                      bg-${category.color}-100 text-${category.color}-700 hover:bg-${category.color}-200`}
                  >
                    {category.name} ({category.count})
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Blog Posts */}
        <Section variant="default">
          <Container>
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {allPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <TagIcon className="w-12 h-12 text-gray-400" />
                      </div>
                      <Heading as="h2" variant="section" className="mb-4">
                        Articles à venir
                      </Heading>
                      <p className="text-gray-600 mb-8">
                        Le blog est en cours de préparation. Des articles spécialisés en psychologie 
                        et bien-être mental seront bientôt disponibles.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Me poser une question
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <Heading as="h2" variant="section">
                        Derniers articles ({allPosts.length})
                      </Heading>
                    </div>
                    
                    <div className="grid gap-8">
                      {allPosts.map((post) => (
                        <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-8">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <Badge 
                                    variant="secondary"
                                    className={`bg-${BLOG_CONFIG.CATEGORIES[post.category].color}-50 
                                      text-${BLOG_CONFIG.CATEGORIES[post.category].color}-700 
                                      border-${BLOG_CONFIG.CATEGORIES[post.category].color}-200`}
                                  >
                                    {BLOG_CONFIG.CATEGORIES[post.category].name}
                                  </Badge>
                                  {post.featured && (
                                    <Badge variant="secondary">
                                      À la une
                                    </Badge>
                                  )}
                                </div>
                                
                                <Heading as="h3" variant="card" className="mb-3">
                                  <Link 
                                    href={`/blog/${post.slug}`}
                                    className="hover:text-blue-600 transition-colors"
                                  >
                                    {post.title}
                                  </Link>
                                </Heading>
                                
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                  {post.excerpt}
                                </p>
                                
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <UserIcon className="w-4 h-4" />
                                    {post.author}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ClockIcon className="w-4 h-4" />
                                    {post.readingTime}
                                  </div>
                                  <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </time>
                                </div>
                              </div>
                            </div>
                            
                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Lire l&apos;article →
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Categories */}
                  <Card>
                    <CardContent className="p-6">
                      <Heading as="h3" variant="card" className="mb-4">
                        Catégories
                      </Heading>
                      <nav className="space-y-2">
                        {categories.map((category) => (
                          <Link
                            key={category.key}
                            href={`/blog?category=${category.key}`}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-gray-700">{category.name}</span>
                            <span className="text-sm text-gray-500">
                              {category.count}
                            </span>
                          </Link>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Heading as="h3" variant="card" className="text-blue-900 mb-3">
                        Besoin d&apos;aide ?
                      </Heading>
                      <p className="text-blue-700 text-sm mb-4">
                        Prenez rendez-vous pour un accompagnement personnalisé
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        Prendre rendez-vous
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </Section>
    </Layout>
  )
}