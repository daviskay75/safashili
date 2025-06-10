import { NextRequest } from 'next/server'
import { ContactManager } from '@/lib/contact-management'
import { 
  createErrorResponse, 
  createSuccessResponse,
  logAPIError,
  getQueryParams
} from '@/lib/api-helpers'

// GET - Récupérer les contacts et statistiques
export async function GET(request: NextRequest) {
  try {
    const params = getQueryParams(request)
    const action = params.action
    const format = params.format || 'json'

    // TODO: Ajouter authentification admin

    switch (action) {
      case 'stats':
        const stats = ContactManager.getContactStats()
        return createSuccessResponse(stats)

      case 'search':
        const searchQuery = {
          email: params.email,
          type: params.type as any,
          status: params.status as any,
          dateRange: params.startDate && params.endDate ? {
            start: params.startDate,
            end: params.endDate
          } : undefined
        }
        
        const results = ContactManager.searchContacts(searchQuery)
        return createSuccessResponse({
          contacts: results,
          total: results.length
        })

      case 'export':
        const exportOptions = {
          format: format as 'csv' | 'json',
          contactTypes: params.types ? params.types.split(',') as any : undefined,
          dateRange: params.startDate && params.endDate ? {
            start: params.startDate,
            end: params.endDate
          } : undefined,
          includeDeleted: params.includeDeleted === 'true'
        }

        const exportPath = await ContactManager.exportContacts(exportOptions)
        return createSuccessResponse({
          exportPath,
          message: 'Export généré avec succès'
        })

      case 'backup':
        const backupPath = await ContactManager.createBackup()
        return createSuccessResponse({
          backupPath,
          message: 'Backup créé avec succès'
        })

      default:
        // Récupérer tous les contacts avec pagination
        const page = parseInt(params.page || '1')
        const limit = parseInt(params.limit || '50')
        const allContacts = ContactManager.searchContacts({})
        
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedContacts = allContacts.slice(startIndex, endIndex)

        return createSuccessResponse({
          contacts: paginatedContacts,
          pagination: {
            page,
            limit,
            total: allContacts.length,
            totalPages: Math.ceil(allContacts.length / limit)
          }
        })
    }

  } catch (error) {
    logAPIError('admin-contacts-get', error as Error, request)
    return createErrorResponse('Erreur lors de la récupération des contacts', 500)
  }
}

// POST - Actions administratives
export async function POST(request: NextRequest) {
  try {
    // TODO: Ajouter authentification admin
    
    const body = await request.json()
    const { action, contactId, email, reason, updates } = body

    switch (action) {
      case 'update':
        if (!contactId || !updates) {
          return createErrorResponse('ContactId et updates requis', 400)
        }

        const updateSuccess = await ContactManager.updateContact(contactId, updates)
        if (!updateSuccess) {
          return createErrorResponse('Contact non trouvé', 404)
        }

        return createSuccessResponse({
          updated: true,
          contactId
        }, 'Contact mis à jour avec succès')

      case 'gdpr_request':
        if (!email) {
          return createErrorResponse('Email requis pour la demande RGPD', 400)
        }

        const requestId = await ContactManager.createGDPRDeletionRequest(
          email, 
          reason || 'Admin request'
        )

        return createSuccessResponse({
          requestId,
          email
        }, 'Demande de suppression RGPD créée')

      case 'gdpr_process':
        if (!email) {
          return createErrorResponse('Email requis pour traiter la demande RGPD', 400)
        }

        const result = await ContactManager.processGDPRDeletion(email)
        
        if (!result.success) {
          return createErrorResponse(
            result.error || 'Erreur lors du traitement RGPD',
            400
          )
        }

        return createSuccessResponse({
          processed: true,
          contactsDeleted: result.contactsDeleted,
          email
        }, `Suppression RGPD traitée: ${result.contactsDeleted} contacts supprimés`)

      default:
        return createErrorResponse('Action non reconnue', 400)
    }

  } catch (error) {
    logAPIError('admin-contacts-post', error as Error, request)
    return createErrorResponse('Erreur lors de l\'action administrative', 500)
  }
}

// DELETE - Supprimer un contact (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Ajouter authentification admin
    
    const params = getQueryParams(request)
    const contactId = params.id

    if (!contactId) {
      return createErrorResponse('ID de contact requis', 400)
    }

    const success = await ContactManager.updateContact(contactId, {
      status: 'deleted',
      notes: 'Deleted by admin'
    })

    if (!success) {
      return createErrorResponse('Contact non trouvé', 404)
    }

    return createSuccessResponse({
      deleted: true,
      contactId
    }, 'Contact supprimé avec succès')

  } catch (error) {
    logAPIError('admin-contacts-delete', error as Error, request)
    return createErrorResponse('Erreur lors de la suppression', 500)
  }
}