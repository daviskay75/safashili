import { MetadataRoute } from 'next'
import { SITE_CONFIG, SERVICES, CITIES } from '@/lib/constants'
import { getBlogSitemapEntries } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url
  
  // Pages statiques principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/specialites`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/modalites`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/infos-pratiques`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rendez-vous`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Pages spécialités dynamiques
  const specialtyPages = SERVICES.map((service) => ({
    url: `${baseUrl}/specialites/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Pages modalités
  const modalityPages = [
    'consultation-cabinet',
    'therapie-groupe', 
    'suivi-distance',
    'consultation-domicile'
  ].map((modality) => ({
    url: `${baseUrl}/modalites/${modality}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Pages villes (SEO local)
  const cityPages = CITIES.map((city) => ({
    url: `${baseUrl}/secteur/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Articles de blog dynamiques
  const blogEntries = getBlogSitemapEntries().map((entry) => ({
    url: `${baseUrl}${entry.url}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))

  // Combinaison de toutes les pages
  return [
    ...staticPages,
    ...specialtyPages,
    ...modalityPages,
    ...cityPages,
    ...blogEntries,
  ]
}