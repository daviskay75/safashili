# Psychology Practice Website - Safa Shili

A **production-ready** professional psychology practice website built with Next.js 15, featuring comprehensive local SEO, appointment booking, and content management.

## 🎯 Project Overview

Professional website for Safa Shili, clinical psychologist specializing in violence counseling and psychotraumatology in Rosny-sous-Bois, France (Seine-Saint-Denis).

**Status**: ✅ Production-ready | **Deployment**: Render (PostgreSQL + Web Service)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL (for production)
- Resend account (for email)

### Development Setup

```bash
# Clone and install
git clone <repository-url>
cd site
npm install

# Environment setup
cp .env.example .env
# Configure your environment variables

# Database setup (if using PostgreSQL)
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4 with custom design system
- **Email**: Resend API for production delivery
- **Forms**: react-hook-form + Zod validation
- **Blog**: MDX with next-mdx-remote
- **Testing**: Jest with comprehensive coverage
- **Deployment**: Render platform

## 🏗️ Architecture

### Core Features
- 📅 **Appointment Booking** - Full booking system with Google Calendar integration
- 📧 **Professional Email** - Resend API with template system
- 📊 **Analytics** - Custom event tracking and business intelligence
- 🗄️ **Database** - Hybrid PostgreSQL/memory architecture for reliability
- 📝 **Blog System** - MDX-powered blog with SEO optimization
- 🔒 **Security** - Rate limiting, CSRF protection, GDPR compliance
- 🎨 **Design System** - Custom UI components with Tailwind CSS
- 📍 **Local SEO** - Optimized for Seine-Saint-Denis region

### API Endpoints
```
POST /api/contact        # Contact form submission
POST /api/booking        # Appointment booking
POST /api/newsletter     # Newsletter subscription
GET  /api/admin/contacts # Contact management (secured)
POST /api/analytics      # Custom analytics
```

### Page Structure
```
/                        # Homepage with services overview
/about                   # About page with credentials
/contact                 # Contact form and information
/rendez-vous            # Appointment booking
/blog                   # Blog listing and articles
/specialites/*          # Psychology specializations
/secteur/*              # City-specific pages (local SEO)
/modalites/*            # Consultation modalities
```

## 🧪 Testing

Comprehensive test suite with 8 categories:

```bash
# Core testing
npm run test:all         # Essential tests (API, forms, SEO, business)
npm run test             # Run all Jest tests

# Specific test categories
npm run test:api         # API endpoints and validation
npm run test:forms       # Form components and logic
npm run test:seo         # Structured data and SEO
npm run test:business    # Booking logic and business rules

# Extended testing
npm run test:full        # Complete test suite including performance
npm run test:accessibility  # WCAG compliance
npm run test:performance    # Core Web Vitals
npm run test:integration    # End-to-end flows
npm run test:security      # Security and rate limiting
```

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server (port 3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # ESLint validation

# Database
npx prisma generate      # Generate Prisma client
npx prisma db push       # Apply schema to database
npx prisma studio        # Database GUI

# Analysis
npm run analyze          # Bundle size analysis
npm run lighthouse       # Performance audit
```

## 🌐 Production Deployment

### Render Platform Setup

1. **Database**: Create PostgreSQL service on Render
2. **Web Service**: Deploy from GitHub repository
3. **Environment**: Configure production variables
4. **Domain**: Set up custom domain (optional)

### Required Environment Variables

```bash
# Core configuration
DATABASE_URL="postgresql://..."           # Render PostgreSQL URL
RESEND_API_KEY="re_..."                  # Resend email service
CONTACT_EMAIL="contact@safa-shili-psychologue.fr"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
NODE_ENV="production"
CSRF_SECRET="your-strong-random-string"

# Optional enhancements
NEXT_PUBLIC_GA4_MEASUREMENT_ID="G-..."   # Google Analytics
GOOGLE_CALENDAR_CLIENT_ID="..."          # Calendar integration
NEXT_PUBLIC_EMAILJS_SERVICE_ID="..."     # Backup email service
```

### Deployment Guide

Complete deployment instructions available in:
- 📖 `RENDER_DEPLOYMENT.md` - Step-by-step deployment guide
- 🖼️ `IMAGE_REQUIREMENTS.md` - Professional image specifications
- 📅 `docs/GOOGLE_CALENDAR_SETUP.md` - Calendar integration

## 📊 Performance

- **Bundle Size**: Optimized for Core Web Vitals
- **SEO Score**: 100/100 (Lighthouse)
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: < 2.5s LCP, < 100ms FID

## 🔐 Security Features

- Rate limiting with configurable thresholds
- CSRF protection on all forms
- Input validation with Zod schemas
- GDPR-compliant data handling
- Secure email template rendering
- Environment-based configuration

## 📱 Local SEO Strategy

Optimized for "psychologue" searches in:
- Rosny-sous-Bois (primary)
- Montreuil, Bondy, Bagnolet, Noisy-le-Sec
- Complete NAP (Name, Address, Phone) consistency
- Structured data for LocalBusiness and MedicalBusiness

## 🏥 Psychology Specializations

- Violence conjugale & familiale
- Psychotraumatologie
- Thérapie adolescents
- Accompagnement adultes
- Souffrance au travail
- Bilans psychologiques

## 📞 Support

- **Documentation**: See `CLAUDE.md` for development guidelines
- **Issues**: Database connectivity, email delivery, build errors
- **Monitoring**: Render dashboard, Prisma logs, analytics events

## 📄 License

Private project for Safa Shili Psychology Practice.

---

**Ready for production deployment** ✅ | **Built with Next.js 15** ⚡ | **Optimized for mental health services** 🧠