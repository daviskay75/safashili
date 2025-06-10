# Configuration Google Calendar Integration

Ce guide explique comment configurer l'intégration Google Calendar pour synchroniser automatiquement les rendez-vous.

## 🚀 Configuration Google Cloud Console

### 1. Créer un projet Google Cloud

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un nouveau projet ou sélectionner un projet existant
3. Nommer le projet : `safa-shili-psychologue`

### 2. Activer l'API Google Calendar

1. Dans le menu, aller à **APIs & Services** > **Library**
2. Rechercher "Google Calendar API"
3. Cliquer sur **Enable**

### 3. Créer des identifiants OAuth2

1. Aller à **APIs & Services** > **Credentials**
2. Cliquer sur **Create Credentials** > **OAuth client ID**
3. Si demandé, configurer l'écran de consentement OAuth
4. Choisir **Web application** comme type d'application
5. Configurer :
   - **Name**: `Safa Shili Psychology Calendar Integration`
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (développement)
     - `https://votre-domaine.fr` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/google/callback` (développement)
     - `https://votre-domaine.fr/api/auth/google/callback` (production)

### 4. Récupérer les identifiants

Après création, récupérer :
- **Client ID** : `1234567890-abcdef.apps.googleusercontent.com`
- **Client Secret** : `GOCSPX-abcdef123456`

## 🔧 Configuration de l'application

### 1. Variables d'environnement

Copier `.env.example` vers `.env.local` et configurer :

```env
# Google Calendar API
GOOGLE_CALENDAR_CLIENT_ID=1234567890-abcdef.apps.googleusercontent.com
GOOGLE_CALENDAR_CLIENT_SECRET=GOCSPX-abcdef123456
GOOGLE_CALENDAR_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
GOOGLE_CALENDAR_ID=primary
```

### 2. Première authentification

1. Démarrer l'application : `npm run dev`
2. Aller sur : `http://localhost:3000/api/auth/google?action=authorize`
3. Copier l'URL d'autorisation retournée
4. Se connecter avec le compte Google qui possède le calendrier
5. Autoriser l'accès
6. L'application sera redirigée et les tokens seront stockés

### 3. Test de l'intégration

```bash
# Vérifier le statut
curl http://localhost:3000/api/auth/google?action=status

# Tester la connexion
curl http://localhost:3000/api/auth/google?action=test
```

## 📅 Fonctionnalités disponibles

### Synchronisation automatique

L'intégration Google Calendar synchronise automatiquement :

✅ **Création de rendez-vous**
- Événement créé dans Google Calendar
- Invitation envoyée au patient
- Rappels configurés (24h et 15min avant)

✅ **Modification de rendez-vous**
- Événement mis à jour dans Google Calendar
- Notifications automatiques

✅ **Annulation de rendez-vous**
- Événement supprimé de Google Calendar
- Notifications d'annulation

✅ **Vérification des disponibilités**
- Créneaux bloqués si événements existants
- Respect des horaires de travail
- Gestion des conflits automatique

### APIs disponibles

```typescript
// Créer un événement
POST /api/auth/google
{
  "action": "create_event",
  "bookingData": {...},
  "appointmentId": "apt_123"
}

// Mettre à jour un événement
POST /api/auth/google
{
  "action": "update_event",
  "eventId": "calendar_event_id",
  "bookingData": {...}
}

// Supprimer un événement
POST /api/auth/google
{
  "action": "delete_event",
  "eventId": "calendar_event_id"
}

// Synchroniser le calendrier
POST /api/auth/google
{
  "action": "sync_calendar"
}
```

## 🔒 Sécurité et permissions

### Permissions demandées

L'application demande les permissions minimales :
- `calendar.readonly` : Lecture des événements
- `calendar.events` : Gestion des événements

### Stockage des tokens

- **Développement** : Tokens en mémoire (redémarrage = re-authentification)
- **Production** : Stocker les tokens de manière sécurisée en base de données

### Refresh automatique

Les tokens d'accès sont automatiquement rafraîchis :
- Durée de vie : 1 heure
- Refresh automatique avant expiration
- Gestion des erreurs d'authentification

## 🚨 Résolution de problèmes

### Erreur "unauthorized_client"

```
Error: unauthorized_client
The client is not authorized to request an access token using this method.
```

**Solution** : Vérifier les URLs de redirection dans Google Cloud Console

### Erreur "invalid_grant"

```
Error: invalid_grant
The provided authorization grant is invalid, expired, revoked...
```

**Solution** : Re-authentifier avec `?action=authorize`

### Pas d'événements créés

1. Vérifier les permissions du calendrier
2. Tester avec `?action=test`
3. Vérifier les logs de l'application

### Conflits de créneaux

L'intégration vérifie automatiquement :
- Événements existants dans Google Calendar
- Horaires de travail définis dans l'application
- Pauses déjeuner et jours fériés

## 📋 Checklist de déploiement

- [ ] Projet Google Cloud créé
- [ ] API Google Calendar activée
- [ ] Identifiants OAuth2 configurés
- [ ] Variables d'environnement définies
- [ ] Première authentification effectuée
- [ ] Tests de création/modification/suppression OK
- [ ] Synchronisation des disponibilités OK
- [ ] Gestion des erreurs testée

## 🔄 Mode dégradé

Si Google Calendar n'est pas disponible :
- ✅ Les rendez-vous continuent de fonctionner
- ✅ Disponibilités calculées localement
- ⚠️ Pas de synchronisation automatique
- ⚠️ Logs des erreurs de connexion

L'application reste pleinement fonctionnelle même sans Google Calendar.