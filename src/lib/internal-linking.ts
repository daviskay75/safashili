// Internal linking strategy for psychology practice SEO

import { SPECIALTIES_DETAIL, MODALITES_DETAIL, CITIES } from './constants'

// Types for internal linking
interface LinkSuggestion {
  url: string
  title: string
  description: string
  anchor: string
  relevance: 'high' | 'medium' | 'low'
  context: string
}

export interface PageContext {
  type: 'specialty' | 'modality' | 'city' | 'home' | 'about' | 'contact' | 'blog'
  id?: string
  keywords?: string[]
}

// Internal linking configuration
export const INTERNAL_LINKING_CONFIG = {
  // Maximum links per page to avoid over-optimization
  MAX_LINKS_PER_PAGE: 8,
  
  // Link distribution strategy
  LINK_DISTRIBUTION: {
    'specialty': ['modality', 'specialty', 'city'],
    'modality': ['specialty', 'city', 'about'],
    'city': ['specialty', 'modality', 'contact'],
    'home': ['specialty', 'about', 'contact'],
    'about': ['specialty', 'contact', 'modality'],
    'contact': ['specialty', 'modality', 'city'],
    'blog': ['specialty', 'modality', 'about']
  },

  // Keywords for automatic linking
  AUTO_LINK_KEYWORDS: {
    // Specialty keywords
    'violence conjugale': '/specialites/violence-conjugale',
    'psychotraumatologie': '/specialites/psychotraumatologie', 
    'thérapie adolescent': '/specialites/therapie-adolescents',
    'accompagnement adultes': '/specialites/accompagnement-adultes',
    'souffrance au travail': '/specialites/souffrance-travail',
    
    // Modality keywords
    'consultation cabinet': '/modalites/consultation-cabinet',
    'thérapie groupe': '/modalites/therapie-groupe',
    'suivi distance': '/modalites/suivi-distance',
    'consultation domicile': '/modalites/consultation-domicile',
    
    // Location keywords
    'Rosny-sous-Bois': '/secteur/rosny-sous-bois',
    'Montreuil': '/secteur/montreuil',
    'Bondy': '/secteur/bondy',
    'Bagnolet': '/secteur/bagnolet',
    'Noisy-le-Sec': '/secteur/noisy-le-sec',
    
    // General pages
    'prendre rendez-vous': '/contact',
    'à propos': '/about',
    'contact': '/contact'
  }
}

// Get related specialties based on current specialty
export function getRelatedSpecialties(currentSpecialtyId: string): LinkSuggestion[] {
  const currentSpecialty = SPECIALTIES_DETAIL[currentSpecialtyId as keyof typeof SPECIALTIES_DETAIL]
  if (!currentSpecialty) return []

  const relatedIds = currentSpecialty.relatedServices || []
  
  return relatedIds.map(id => {
    const related = SPECIALTIES_DETAIL[id as keyof typeof SPECIALTIES_DETAIL]
    return {
      url: `/specialites/${id}`,
      title: related.title,
      description: related.description,
      anchor: `Découvrir ${related.title.toLowerCase()}`,
      relevance: 'high' as const,
      context: 'specialty_related'
    }
  })
}

// Get related modalities based on specialty
export function getRelatedModalities(specialtyId: string): LinkSuggestion[] {
  const specialty = SPECIALTIES_DETAIL[specialtyId as keyof typeof SPECIALTIES_DETAIL]
  if (!specialty) return []

  // Logic to suggest appropriate modalities based on specialty
  const modalityMapping: Record<string, string[]> = {
    'violence-conjugale': ['consultation-cabinet', 'consultation-domicile', 'therapie-groupe'],
    'psychotraumatologie': ['consultation-cabinet', 'suivi-distance', 'consultation-domicile'],
    'therapie-adolescents': ['consultation-cabinet', 'therapie-groupe', 'suivi-distance'],
    'accompagnement-adultes': ['consultation-cabinet', 'suivi-distance', 'therapie-groupe'],
    'souffrance-travail': ['consultation-cabinet', 'suivi-distance', 'consultation-domicile']
  }

  const suggestedModalities = modalityMapping[specialtyId] || []
  
  return suggestedModalities.slice(0, 3).map(modalityId => {
    const modality = MODALITES_DETAIL[modalityId as keyof typeof MODALITES_DETAIL]
    return {
      url: `/modalites/${modalityId}`,
      title: modality.title,
      description: modality.description,
      anchor: `En savoir plus sur ${modality.title.toLowerCase()}`,
      relevance: 'medium' as const,
      context: 'modality_suggestion'
    }
  })
}

// Get related cities based on current page
export function getRelatedCities(): LinkSuggestion[] {
  // Always suggest main location (Rosny-sous-Bois) and top 2 other cities
  const priorityCities = ['rosny-sous-bois', 'montreuil', 'bondy']
  
  return priorityCities.map(citySlug => {
    const city = CITIES.find(c => c.slug === citySlug)
    if (!city) return null
    
    return {
      url: `/secteur/${citySlug}`,
      title: `Psychologue ${city.name}`,
      description: city.longDescription,
      anchor: `Consulter à ${city.name}`,
      relevance: citySlug === 'rosny-sous-bois' ? 'high' as const : 'medium' as const,
      context: 'city_coverage'
    }
  }).filter(Boolean) as LinkSuggestion[]
}

// Get contextual links based on current page
export function getContextualLinks(context: PageContext): LinkSuggestion[] {
  const links: LinkSuggestion[] = []
  
  switch (context.type) {
    case 'specialty':
      if (context.id) {
        links.push(...getRelatedSpecialties(context.id))
        links.push(...getRelatedModalities(context.id))
        links.push(...getRelatedCities().slice(0, 2))
      }
      break
      
    case 'modality':
      // Suggest specialties that commonly use this modality
      links.push(...getSuggestedSpecialtiesForModality(context.id || ''))
      links.push(...getRelatedCities().slice(0, 2))
      break
      
    case 'city':
      // Suggest all specialties and top modalities for this city
      links.push(...getTopSpecialtiesForCity())
      links.push(...getTopModalitiesForCity(context.id || ''))
      break
      
    case 'home':
      // From homepage, link to top specialties and about
      links.push(...getTopSpecialtiesForCity().slice(0, 3))
      links.push({
        url: '/about',
        title: 'À propos de Safa Shili',
        description: 'Découvrez mon parcours et mon approche thérapeutique',
        anchor: 'En savoir plus sur mon parcours',
        relevance: 'medium',
        context: 'about_link'
      })
      break
      
    case 'about':
      // From about page, link to specialties and contact
      links.push(...getTopSpecialtiesForCity().slice(0, 2))
      links.push({
        url: '/contact',
        title: 'Prendre rendez-vous',
        description: 'Contactez-moi pour une première consultation',
        anchor: 'Prendre rendez-vous',
        relevance: 'high',
        context: 'contact_cta'
      })
      break
      
    case 'contact':
      // From contact page, link to modalities and main specialties
      links.push(...getTopModalitiesForCity().slice(0, 2))
      links.push(...getTopSpecialtiesForCity().slice(0, 2))
      break
  }
  
  return links.slice(0, INTERNAL_LINKING_CONFIG.MAX_LINKS_PER_PAGE)
}

// Helper functions
function getSuggestedSpecialtiesForModality(modalityId: string): LinkSuggestion[] {
  // Logic to suggest specialties based on modality
  const specialtyMapping: Record<string, string[]> = {
    'consultation-cabinet': ['violence-conjugale', 'psychotraumatologie', 'accompagnement-adultes'],
    'therapie-groupe': ['violence-conjugale', 'therapie-adolescents', 'accompagnement-adultes'],
    'suivi-distance': ['accompagnement-adultes', 'souffrance-travail', 'psychotraumatologie'],
    'consultation-domicile': ['violence-conjugale', 'therapie-adolescents', 'psychotraumatologie']
  }

  const suggestedSpecialties = specialtyMapping[modalityId] || []
  
  return suggestedSpecialties.slice(0, 3).map(specialtyId => {
    const specialty = SPECIALTIES_DETAIL[specialtyId as keyof typeof SPECIALTIES_DETAIL]
    return {
      url: `/specialites/${specialtyId}`,
      title: specialty.title,
      description: specialty.description,
      anchor: `Spécialité : ${specialty.title}`,
      relevance: 'medium' as const,
      context: 'specialty_for_modality'
    }
  })
}

function getTopSpecialtiesForCity(): LinkSuggestion[] {
  // Return top specialties (violence conjugale and psychotraumatologie as main expertise)
  const topSpecialtyIds = ['violence-conjugale', 'psychotraumatologie', 'accompagnement-adultes', 'therapie-adolescents']
  
  return topSpecialtyIds.map(id => {
    const specialty = SPECIALTIES_DETAIL[id as keyof typeof SPECIALTIES_DETAIL]
    return {
      url: `/specialites/${id}`,
      title: specialty.title,
      description: specialty.description,
      anchor: specialty.title,
      relevance: id === 'violence-conjugale' ? 'high' as const : 'medium' as const,
      context: 'top_specialty'
    }
  })
}

function getTopModalitiesForCity(citySlug?: string): LinkSuggestion[] {
  const city = CITIES.find(c => c.slug === citySlug)
  const availableServices = city?.availableServices || ['consultation-cabinet', 'suivi-distance']
  
  return availableServices.slice(0, 3).map(modalityId => {
    const modality = MODALITES_DETAIL[modalityId as keyof typeof MODALITES_DETAIL]
    return {
      url: `/modalites/${modalityId}`,
      title: modality.title,
      description: modality.description,
      anchor: modality.title,
      relevance: 'medium' as const,
      context: 'available_modality'
    }
  })
}

// Generate breadcrumb navigation
export function generateBreadcrumbs(pathname: string): Array<{label: string, href?: string}> {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: Array<{label: string, href?: string}> = [{ label: 'Accueil', href: '/' }]
  
  let currentPath = ''
  
  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`
    const segment = segments[i]
    
    if (i === segments.length - 1) {
      // Last segment - no link
      if (segment === 'specialites') {
        breadcrumbs.push({ label: 'Spécialités' })
      } else if (segment === 'modalites') {
        breadcrumbs.push({ label: 'Modalités' })
      } else if (segment === 'secteur') {
        breadcrumbs.push({ label: 'Secteurs' })
      } else if (segment === 'about') {
        breadcrumbs.push({ label: 'À propos' })
      } else if (segment === 'contact') {
        breadcrumbs.push({ label: 'Contact' })
      } else {
        // Dynamic page - get title from constants
        const specialty = Object.values(SPECIALTIES_DETAIL).find(s => s.id === segment)
        const modality = Object.values(MODALITES_DETAIL).find(m => m.id === segment)
        const city = CITIES.find(c => c.slug === segment)
        
        if (specialty) {
          breadcrumbs.push({ label: specialty.title })
        } else if (modality) {
          breadcrumbs.push({ label: modality.title })
        } else if (city) {
          breadcrumbs.push({ label: city.name })
        } else {
          breadcrumbs.push({ label: segment })
        }
      }
    } else {
      // Intermediate segment - with link
      if (segment === 'specialites') {
        breadcrumbs.push({ label: 'Spécialités', href: '/specialites' })
      } else if (segment === 'modalites') {
        breadcrumbs.push({ label: 'Modalités', href: '/modalites' })
      } else if (segment === 'secteur') {
        breadcrumbs.push({ label: 'Secteurs', href: currentPath })
      }
    }
  }
  
  return breadcrumbs
}

// Automatic content linking (replace keywords with links in content)
export function autoLinkContent(content: string, currentPath: string): string {
  let linkedContent = content
  
  Object.entries(INTERNAL_LINKING_CONFIG.AUTO_LINK_KEYWORDS).forEach(([keyword, url]) => {
    // Don't link to current page
    if (url === currentPath) return
    
    // Create case-insensitive regex
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
    
    // Replace first occurrence only to avoid over-linking
    let replaced = false
    linkedContent = linkedContent.replace(regex, (match) => {
      if (replaced) return match
      replaced = true
      return `<a href="${url}" class="text-blue-600 hover:text-blue-800 underline">${match}</a>`
    })
  })
  
  return linkedContent
}

// SEO link analysis
export function analyzeLinkStructure(pageContext: PageContext): {
  suggestions: LinkSuggestion[]
  seoScore: number
  recommendations: string[]
} {
  const suggestions = getContextualLinks(pageContext)
  const recommendations: string[] = []
  let seoScore = 100
  
  // Check link distribution
  if (suggestions.length < 3) {
    recommendations.push('Ajouter plus de liens internes pour améliorer le maillage')
    seoScore -= 20
  }
  
  if (suggestions.length > 8) {
    recommendations.push('Réduire le nombre de liens internes pour éviter la sur-optimisation')
    seoScore -= 10
  }
  
  // Check link relevance
  const highRelevanceLinks = suggestions.filter(s => s.relevance === 'high')
  if (highRelevanceLinks.length === 0) {
    recommendations.push('Ajouter des liens de haute pertinence pour renforcer le SEO')
    seoScore -= 15
  }
  
  // Check anchor text diversity
  const anchors = suggestions.map(s => s.anchor)
  const uniqueAnchors = new Set(anchors)
  if (uniqueAnchors.size / anchors.length < 0.8) {
    recommendations.push('Diversifier les textes d\'ancre pour améliorer le référencement')
    seoScore -= 10
  }
  
  return {
    suggestions,
    seoScore,
    recommendations
  }
}