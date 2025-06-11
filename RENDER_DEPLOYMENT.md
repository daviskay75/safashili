# Render Deployment Guide - Psychology Practice Website

## Production Readiness Status: ✅ READY FOR DEPLOYMENT

This website has been audited and made production-ready with sophisticated architecture and proper configuration.

## 🚀 Render Deployment Steps

### 1. Database Setup (PostgreSQL)

#### Create Database Service
1. Go to Render Dashboard → New → PostgreSQL
2. Name: `psychology-practice-db`
3. Plan: Starter ($7/month) or Free (limited)
4. Region: Choose closest to your users (Europe recommended)
5. Database Name: `psychology_practice`
6. User: `postgres` (default)

#### Get Database URL
After creation, copy the "External Database URL" from the database dashboard.
Format: `postgresql://user:password@hostname:port/database`

### 2. Web Service Setup

#### Create Web Service
1. Go to Render Dashboard → New → Web Service
2. Connect your GitHub repository
3. Configuration:
   - **Name**: `safa-shili-psychologue`
   - **Environment**: `Node`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`

#### Environment Variables (CRITICAL)
Set these in Render dashboard under Environment Variables:

```bash
# Database (automatically provided by Render PostgreSQL)
DATABASE_URL=[Use the External Database URL from your PostgreSQL service]

# Email Service (REQUIRED - get from Resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="Safa Shili <contact@safashili.com>"
CONTACT_EMAIL=contact@safashili.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-render-url.onrender.com
PHONE_NUMBER="06 51 68 74 30"
NODE_ENV=production

# Security
CSRF_SECRET=generate-strong-random-string-here

# Analytics (Optional but recommended)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# EmailJS (Alternative/backup email system)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT=your_template_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_CONFIRMATION=your_confirmation_template_id

# Google Calendar (Optional enhancement)
GOOGLE_CALENDAR_CLIENT_ID=your_google_client_id
GOOGLE_CALENDAR_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALENDAR_ID=primary
```

### 3. Database Migration

#### Post-Deploy Script
After first deployment, run database migration:

1. Go to your web service → Settings → Build & Deploy
2. Add to Build Command:
```bash
npm install && npx prisma generate && npx prisma db push && npm run build
```

Or manually run via Render Shell:
```bash
npx prisma db push
```

### 4. Domain Configuration

#### Custom Domain (Optional)
1. In Render Dashboard → Your service → Settings → Custom Domains
2. Add: `safashili.com`
3. Update DNS records as instructed by Render
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

## 🔑 Required External Services

### 1. Resend Email Service
1. Sign up at [resend.com](https://resend.com)
2. Verify domain: `safashili.com`
3. Get API key from dashboard
4. Add API key to Render environment variables

### 2. Google Analytics (Optional)
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (format: G-XXXXXXXXXX)
3. Add to Render environment variables

### 3. Google Search Console
1. Add property at [search.google.com/search-console](https://search.google.com/search-console)
2. Verify ownership via HTML tag or DNS
3. Submit sitemap: `https://your-domain.com/sitemap.xml`

## 📋 Pre-Deployment Checklist

### Environment Setup
- [ ] PostgreSQL database created on Render
- [ ] Database URL configured
- [ ] Resend account created and domain verified
- [ ] All environment variables set in Render

### Testing
- [ ] Build succeeds locally: `npm run build`
- [ ] Tests pass: `npm run test:all`
- [ ] Database connection works with real DATABASE_URL
- [ ] Email service works with real RESEND_API_KEY

### Content
- [ ] Professional headshot uploaded (see IMAGE_REQUIREMENTS.md)
- [ ] Contact information verified
- [ ] Business hours confirmed

## 🔧 Build & Deploy Configuration

### Build Process
```bash
# Render will run these automatically
npm install              # Install dependencies
npx prisma generate     # Generate Prisma client
npx prisma db push      # Apply database schema (first deploy)
npm run build           # Build Next.js application
```

### Health Check
Render will monitor: `https://your-app.onrender.com`
- Expected: 200 response
- Timeout: 30 seconds

### Auto-Deploy
- Enabled by default on `main` branch
- Deploy on every git push
- Build time: ~2-3 minutes

## 🚨 Critical Environment Variables

### Minimum Required for Basic Function:
```bash
DATABASE_URL=postgresql://...          # From Render PostgreSQL
RESEND_API_KEY=re_...                 # From Resend.com
CONTACT_EMAIL=contact@safashili.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Recommended for Full Functionality:
```bash
# All the above plus:
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-...  # Analytics
CSRF_SECRET=...                       # Security
PHONE_NUMBER=06 51 68 74 30          # Contact info
```

## 🎯 Performance Expectations

### Render Starter Plan Performance:
- **Cold start**: 1-2 seconds
- **Warm response**: 100-300ms
- **Build time**: 2-3 minutes
- **Monthly cost**: ~$7 (web) + $7 (database) = $14/month

### Core Web Vitals (Expected):
- **LCP**: < 2.5s (optimized)
- **FID**: < 100ms (Next.js optimized)
- **CLS**: < 0.1 (layout stable)

## 🔄 Post-Deployment Tasks

### Immediate (First 24 hours):
1. Test contact form submission
2. Verify email delivery
3. Check Google Analytics tracking
4. Test appointment booking system
5. Verify mobile responsiveness

### Within First Week:
1. Submit sitemap to Google Search Console
2. Set up Google My Business listing
3. Configure monitoring alerts
4. Test backup and recovery

### Ongoing Maintenance:
1. Monitor Core Web Vitals
2. Review contact form submissions
3. Update content regularly
4. Monitor security updates

## 🆘 Troubleshooting

### Common Issues:

#### Build Fails
```bash
# Check Prisma generation
npx prisma generate

# Check dependencies
npm install --production=false
```

#### Database Connection Fails
```bash
# Verify DATABASE_URL format
echo $DATABASE_URL

# Test connection
npx prisma db pull
```

#### Email Not Sending
1. Verify Resend API key is correct
2. Check domain verification in Resend dashboard
3. Check email templates format

#### Performance Issues
1. Check Core Web Vitals in Lighthouse
2. Monitor Render metrics dashboard
3. Consider upgrading to Standard plan ($25/month)

## 📞 Support Contacts

- **Render Support**: [docs.render.com](https://docs.render.com)
- **Resend Support**: [resend.com/help](https://resend.com/help)
- **Technical Issues**: Check application logs in Render dashboard

---

**Status**: Ready for production deployment  
**Last Updated**: January 2025  
**Architecture**: Next.js 15 + PostgreSQL + Resend + Render  
**Expected Deployment Time**: 30-60 minutes