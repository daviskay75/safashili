// Service email pour les formulaires de contact et newsletter
// Utilise EmailJS pour l'envoi côté client et peut être étendu avec Resend côté serveur

import { ContactFormData, NewsletterFormData, BookingFormData } from './schemas'

// Configuration EmailJS (variables d'environnement)
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateIds: {
    contact: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT || '',
    contactConfirmation: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_CONFIRMATION || '',
    newsletter: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_NEWSLETTER || '',
    booking: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_BOOKING || '',
    bookingConfirmation: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_BOOKING_CONFIRMATION || '',
  },
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
}

// Templates d'emails pour différents types de communication
export const EMAIL_TEMPLATES = {
  contact: {
    subject: 'Nouvelle demande de contact - {firstName} {lastName}',
    toSafa: `
Nouvelle demande de contact reçue via le site web.

INFORMATIONS CONTACT:
- Nom: {firstName} {lastName}
- Email: {email}
- Téléphone: {phone}
- Type de consultation: {consultationType}
- Urgence: {urgency}

MESSAGE:
{message}

---
Envoyé automatiquement depuis safa-shili-psychologue.fr
    `,
    toClient: `
Bonjour {firstName},

Merci pour votre message. J'ai bien reçu votre demande et je vous recontacterai dans les plus brefs délais.

En cas d'urgence, n'hésitez pas à m'appeler directement au 06 51 68 74 30.

Cordialement,
Safa Shili
Psychologue clinicienne

---
Cabinet de psychologie - 7 Rue du Quatrième Zouave, 93110 Rosny-sous-Bois
Tél: 06 51 68 74 30 | Email: contact@safa-shili-psychologue.fr
    `
  },

  newsletter: {
    subject: 'Bienvenue dans la newsletter de Safa Shili',
    welcome: `
Bonjour {firstName},

Merci de vous être inscrit(e) à ma newsletter !

Vous recevrez régulièrement :
• Des conseils en psychologie
• Des articles sur mes spécialités (violence conjugale, psychotraumatologie, etc.)
• Des informations sur les nouveaux services
• Des ressources utiles pour votre bien-être

Vos centres d'intérêt sélectionnés : {interests}

Si vous souhaitez vous désinscrire, utilisez le lien en bas de chaque email.

À bientôt,
Safa Shili

---
Cabinet de psychologie - 7 Rue du Quatrième Zouave, 93110 Rosny-sous-Bois
    `
  },

  booking: {
    subject: 'Nouvelle demande de rendez-vous - {firstName} {lastName}',
    toSafa: `
Nouvelle demande de rendez-vous reçue.

INFORMATIONS PATIENT:
- Nom: {firstName} {lastName}
- Email: {email}
- Téléphone: {phone}
- Type de consultation: {consultationType}
- Date souhaitée: {preferredDate}
- Heure souhaitée: {preferredTime}
- Durée: {duration} minutes
- Première consultation: {isFirstConsultation}

MOTIF DE CONSULTATION:
{reasonForConsultation}

ANTÉCÉDENTS MÉDICAUX:
{medicalHistory}

CONTACT D'URGENCE:
{emergencyContact}

---
Envoyé automatiquement depuis safa-shili-psychologue.fr
    `,
    confirmation: `
Bonjour {firstName},

Votre demande de rendez-vous a bien été reçue.

RÉCAPITULATIF:
- Type: {consultationType}
- Date souhaitée: {preferredDate}
- Heure souhaitée: {preferredTime}
- Durée: {duration} minutes

Je vous recontacterai rapidement pour confirmer le créneau ou proposer une alternative.

En cas d'urgence, n'hésitez pas à m'appeler au 06 51 68 74 30.

Cordialement,
Safa Shili

---
Cabinet de psychologie - 7 Rue du Quatrième Zouave, 93110 Rosny-sous-Bois
    `
  }
}

// Interface pour l'envoi d'emails
export interface EmailSendResult {
  success: boolean
  messageId?: string
  error?: string
}

// Service d'envoi d'emails (côté serveur avec Resend)
export class EmailService {
  
  // Envoyer un email de contact
  static async sendContactEmail(data: ContactFormData): Promise<EmailSendResult> {
    try {
      // Production: Utiliser Resend
      if (process.env.RESEND_API_KEY) {
        return await this.sendWithResend({
          to: [process.env.CONTACT_EMAIL || 'contact@safa-shili-psychologue.fr'],
          subject: EMAIL_TEMPLATES.contact.subject
            .replace('{firstName}', data.firstName)
            .replace('{lastName}', data.lastName),
          html: this.formatTemplate(EMAIL_TEMPLATES.contact.toSafa, data),
        })
      }
      
      // Development fallback: Log pour développement
      console.log('📧 Email de contact (DEV MODE):', {
        from: `${data.firstName} ${data.lastName} <${data.email}>`,
        to: process.env.CONTACT_EMAIL || 'contact@safa-shili-psychologue.fr',
        subject: `Nouveau contact - ${data.firstName} ${data.lastName}`,
        message: data.message
      })
      
      // En développement, simuler succès
      return { success: true, messageId: `dev_${Date.now()}` }
      
    } catch (error) {
      console.error('Erreur envoi email contact:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      }
    }
  }

  // Envoyer confirmation au client
  static async sendContactConfirmation(data: ContactFormData): Promise<EmailSendResult> {
    try {
      // Production: Utiliser Resend
      if (process.env.RESEND_API_KEY) {
        return await this.sendWithResend({
          to: [data.email],
          subject: 'Confirmation de réception - Safa Shili Psychologue',
          html: this.formatTemplate(EMAIL_TEMPLATES.contact.toClient, data),
        })
      }
      
      // Development: Log only
      console.log('📧 Confirmation contact envoyée à (DEV):', data.email)
      return { success: true, messageId: `dev_conf_${Date.now()}` }
      
    } catch (error) {
      console.error('Erreur confirmation contact:', error)
      return { success: false, error: String(error) }
    }
  }

  // Envoyer email de bienvenue newsletter
  static async sendNewsletterWelcome(data: NewsletterFormData): Promise<EmailSendResult> {
    try {
      // Production: Utiliser Resend
      if (process.env.RESEND_API_KEY) {
        return await this.sendWithResend({
          to: [data.email],
          subject: EMAIL_TEMPLATES.newsletter.subject,
          html: this.formatTemplate(EMAIL_TEMPLATES.newsletter.welcome, {
            ...data,
            interests: data.interests?.join(', ') || 'Aucun spécifié'
          }),
        })
      }
      
      // Development: Log only
      console.log('📧 Newsletter bienvenue envoyée à (DEV):', data.email)
      return { success: true, messageId: `dev_newsletter_${Date.now()}` }
      
    } catch (error) {
      console.error('Erreur newsletter:', error)
      return { success: false, error: String(error) }
    }
  }

  // Envoyer email de demande de rendez-vous
  static async sendBookingRequest(data: BookingFormData): Promise<EmailSendResult> {
    try {
      // Production: Utiliser Resend
      if (process.env.RESEND_API_KEY) {
        return await this.sendWithResend({
          to: [process.env.CONTACT_EMAIL || 'contact@safa-shili-psychologue.fr'],
          subject: EMAIL_TEMPLATES.booking.subject
            .replace('{firstName}', data.firstName)
            .replace('{lastName}', data.lastName),
          html: this.formatTemplate(EMAIL_TEMPLATES.booking.toSafa, {
            ...data,
            isFirstConsultation: data.isFirstConsultation ? 'Oui' : 'Non',
            emergencyContact: data.emergencyContact ? 
              `${data.emergencyContact.name} - ${data.emergencyContact.phone}` : 'Non spécifié'
          }),
        })
      }
      
      // Development: Log only
      console.log('📧 Demande de RDV reçue pour (DEV):', `${data.firstName} ${data.lastName}`)
      return { success: true, messageId: `dev_booking_${Date.now()}` }
      
    } catch (error) {
      console.error('Erreur booking email:', error)
      return { success: false, error: String(error) }
    }
  }

  // Méthode privée pour envoyer avec Resend
  private static async sendWithResend(params: {
    to: string[]
    subject: string
    html: string
  }): Promise<EmailSendResult> {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      const result = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Safa Shili <contact@safa-shili-psychologue.fr>',
        to: params.to,
        subject: params.subject,
        html: params.html,
      })
      
      if (result.error) {
        console.error('Resend API error:', result.error)
        return { 
          success: false, 
          error: result.error.message || 'Erreur envoi Resend' 
        }
      }
      
      console.log('✅ Email envoyé via Resend:', result.data?.id)
      return { 
        success: true, 
        messageId: result.data?.id || 'resend_sent' 
      }
      
    } catch (error) {
      console.error('Erreur Resend:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur Resend inconnue' 
      }
    }
  }

  // Formater un template avec les données
  private static formatTemplate(template: string, data: Record<string, any>): string {
    let formatted = template
    
    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`\\{${key}\\}`, 'g')
      formatted = formatted.replace(regex, String(value || ''))
    }
    
    return formatted
  }
}

// Configuration côté client pour EmailJS
export const getEmailJSConfig = () => {
  if (typeof window === 'undefined') return null
  
  return {
    serviceId: EMAILJS_CONFIG.serviceId,
    templateIds: EMAILJS_CONFIG.templateIds,
    publicKey: EMAILJS_CONFIG.publicKey,
  }
}

// Validation de la configuration email
export function validateEmailConfig(): {
  isValid: boolean
  missing: string[]
} {
  const missing: string[] = []
  
  if (!EMAILJS_CONFIG.serviceId) missing.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID')
  if (!EMAILJS_CONFIG.publicKey) missing.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY')
  if (!EMAILJS_CONFIG.templateIds.contact) missing.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT')
  
  return {
    isValid: missing.length === 0,
    missing
  }
}