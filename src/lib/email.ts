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

  // Envoyer email avec lead magnet (nouveau)
  static async sendLeadMagnetEmail(params: {
    email: string
    firstName: string
    leadMagnet: any
    downloadData: any
  }): Promise<EmailSendResult> {
    try {
      const downloadToken = this.generateDownloadToken(params.leadMagnet.slug)
      const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/download?slug=${params.leadMagnet.slug}&token=${downloadToken}`
      
      const emailContent = this.getLeadMagnetEmailTemplate(params.leadMagnet.category)
      
      // Production: Utiliser Resend
      if (process.env.RESEND_API_KEY) {
        return await this.sendWithResend({
          to: [params.email],
          subject: `Votre guide "${params.leadMagnet.title}" est prêt !`,
          html: this.formatTemplate(emailContent, {
            firstName: params.firstName,
            guideTitle: params.leadMagnet.title,
            downloadUrl: downloadUrl,
            guideDescription: params.leadMagnet.description,
            subscribed: params.downloadData.subscribeToNewsletter ? 'Oui' : 'Non'
          })
        })
      }
      
      // Development: Log only
      console.log('📧 Lead magnet email envoyé à (DEV):', params.email, params.leadMagnet.title)
      return { success: true, messageId: `dev_leadmagnet_${Date.now()}` }
      
    } catch (error) {
      console.error('Erreur lead magnet email:', error)
      return { success: false, error: String(error) }
    }
  }

  // S'abonner à une séquence email (nouveau)
  static async subscribeToSequence(params: {
    email: string
    firstName: string
    lastName?: string
    source: string
    sourceId: string
    sequenceSlug: string
  }): Promise<EmailSendResult> {
    try {
      // Ici, on créerait l'abonnement dans la base de données
      // Pour l'instant, on simule avec un log
      console.log('📧 Inscription séquence email:', {
        email: params.email,
        sequence: params.sequenceSlug,
        source: params.source
      })

      // Envoyer le premier email de la séquence immédiatement
      const firstEmail = this.getSequenceEmail(params.sequenceSlug, 1)
      if (firstEmail) {
        if (process.env.RESEND_API_KEY) {
          return await this.sendWithResend({
            to: [params.email],
            subject: firstEmail.subject,
            html: this.formatTemplate(firstEmail.content, {
              firstName: params.firstName,
              lastName: params.lastName || ''
            })
          })
        }
      }

      return { success: true, messageId: `sequence_${Date.now()}` }
      
    } catch (error) {
      console.error('Erreur inscription séquence:', error)
      return { success: false, error: String(error) }
    }
  }

  // Helper pour générer token de téléchargement
  private static generateDownloadToken(slug: string): string {
    const secret = process.env.DOWNLOAD_TOKEN_SECRET || 'development-secret'
    const timestamp = Math.floor(Date.now() / (1000 * 60 * 60)) // Valid 1 heure
    return Buffer.from(`${slug}-${timestamp}-${secret}`).toString('base64')
  }

  // Templates pour les lead magnets
  private static getLeadMagnetEmailTemplate(category: string): string {
    const templates = {
      violence: `
        <h2>Bonjour {firstName},</h2>
        
        <p>Merci pour votre confiance. Votre guide "<strong>{guideTitle}</strong>" est maintenant disponible au téléchargement.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{downloadUrl}" style="background-color: #2563EB; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            📥 Télécharger mon guide
          </a>
        </div>
        
        <p><strong>Important :</strong> Ce lien est sécurisé et expire dans 24 heures.</p>
        
        <hr style="margin: 30px 0;">
        
        <h3>Vous n'êtes pas seule</h3>
        <p>Si vous vous trouvez dans une situation de violence, sachez que de l'aide professionnelle existe :</p>
        <ul>
          <li><strong>3919</strong> - Violences Femmes Info (gratuit, 24h/24)</li>
          <li><strong>Cabinet Safa Shili</strong> - 06 51 68 74 30</li>
        </ul>
        
        <p>N'hésitez pas à prendre rendez-vous pour un accompagnement personnalisé.</p>
        
        <p>Prenez soin de vous,<br>
        <strong>Safa Shili</strong><br>
        <em>Psychologue Clinicienne</em></p>
      `,
      
      anxiety: `
        <h2>Bonjour {firstName},</h2>
        
        <p>Votre guide "<strong>{guideTitle}</strong>" est prêt ! Il contient des techniques concrètes que vous pouvez appliquer dès aujourd'hui.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{downloadUrl}" style="background-color: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            📥 Télécharger mon guide
          </a>
        </div>
        
        <p><strong>Conseil :</strong> Commencez par la technique de respiration 4-7-8 présentée dans le guide. Elle est particulièrement efficace en cas de crise d'anxiété.</p>
        
        <hr style="margin: 30px 0;">
        
        <h3>Besoin d'un accompagnement personnalisé ?</h3>
        <p>L'anxiété se traite très bien avec les bonnes techniques. En consultation, nous pouvons :</p>
        <ul>
          <li>Identifier les causes spécifiques de votre anxiété</li>
          <li>Développer des stratégies personnalisées</li>
          <li>Pratiquer les techniques ensemble</li>
        </ul>
        
        <p>Première consultation de 15 minutes gratuite au 06 51 68 74 30.</p>
        
        <p>Bien à vous,<br>
        <strong>Safa Shili</strong><br>
        <em>Psychologue Clinicienne</em></p>
      `,
      
      consultation: `
        <h2>Bonjour {firstName},</h2>
        
        <p>Votre checklist "<strong>{guideTitle}</strong>" est maintenant disponible !</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{downloadUrl}" style="background-color: #7C3AED; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            📥 Télécharger ma checklist
          </a>
        </div>
        
        <p>Cette checklist vous aidera à identifier si un accompagnement psychologique pourrait vous être bénéfique.</p>
        
        <hr style="margin: 30px 0;">
        
        <h3>Prêt(e) à faire le premier pas ?</h3>
        <p>Si la checklist vous a amené(e) à envisager un accompagnement, sachez que :</p>
        <ul>
          <li>La première consultation de 15 minutes est <strong>gratuite</strong></li>
          <li>Nous définissons ensemble vos objectifs</li>
          <li>L'accompagnement est adapté à votre rythme</li>
        </ul>
        
        <p>N'hésitez pas à m'appeler au 06 51 68 74 30 pour échanger sur votre situation.</p>
        
        <p>Cordialement,<br>
        <strong>Safa Shili</strong><br>
        <em>Psychologue Clinicienne</em></p>
      `
    }
    
    return templates[category as keyof typeof templates] || templates.consultation
  }

  // Récupérer un email d'une séquence
  private static getSequenceEmail(sequenceSlug: string, emailNumber: number): { subject: string; content: string } | null {
    const sequences = {
      'violence-conjugale-welcome': [
        {
          subject: 'Bienvenue {firstName} - Vous avez fait le bon choix',
          content: `
            <h2>Bienvenue {firstName},</h2>
            
            <p>Merci pour votre confiance en téléchargeant notre guide sur la violence conjugale.</p>
            
            <p>Sachez que <strong>demander de l'aide est un acte de courage</strong>. Vous avez fait le premier pas vers votre libération.</p>
            
            <h3>Dans les prochains jours, vous recevrez :</h3>
            <ul>
              <li>Des conseils pour préparer votre première consultation</li>
              <li>Des techniques d'auto-soin en attendant votre rendez-vous</li>
              <li>Des informations sur le processus thérapeutique</li>
            </ul>
            
            <p><strong>En cas d'urgence :</strong> 3919 (gratuit, 24h/24)</p>
            
            <p>Vous n'êtes plus seule,<br>
            <strong>Safa Shili</strong></p>
          `
        }
      ],
      'anxiety-management-welcome': [
        {
          subject: 'Vos premiers outils contre l\'anxiété',
          content: `
            <h2>Bonjour {firstName},</h2>
            
            <p>Félicitations pour avoir pris les devants face à votre anxiété !</p>
            
            <p>L'anxiété peut sembler envahissante, mais elle se traite très bien avec les bonnes techniques.</p>
            
            <h3>Commencez dès aujourd'hui :</h3>
            <ol>
              <li><strong>Technique 4-7-8</strong> : Pratiquez 3 fois par jour</li>
              <li><strong>Journal d'anxiété</strong> : Notez vos déclencheurs</li>
              <li><strong>Exercice doux</strong> : 20 minutes de marche quotidienne</li>
            </ol>
            
            <p>Dans les prochains emails, je partagerai avec vous des techniques plus avancées.</p>
            
            <p>À bientôt,<br>
            <strong>Safa Shili</strong></p>
          `
        }
      ],
      'general-welcome': [
        {
          subject: 'Bienvenue dans votre parcours de bien-être',
          content: `
            <h2>Bienvenue {firstName},</h2>
            
            <p>Merci d'avoir téléchargé notre guide. Prendre soin de sa santé mentale est essentiel.</p>
            
            <p>Je vais vous accompagner avec des conseils pratiques et bienveillants.</p>
            
            <p>N'hésitez pas à me contacter pour toute question.</p>
            
            <p>Bien à vous,<br>
            <strong>Safa Shili</strong></p>
          `
        }
      ]
    }
    
    const sequence = sequences[sequenceSlug as keyof typeof sequences]
    return sequence?.[emailNumber - 1] || null
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