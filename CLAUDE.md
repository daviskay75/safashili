# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **production-ready** professional psychology practice website for Safa Shili, a clinical psychologist in Rosny-sous-Bois, France. The site specializes in violence counseling, psychotraumatology, and therapeutic services with comprehensive local SEO optimization for the Seine-Saint-Denis area.

**Status**: ✅ Production-ready, deployed on Render with PostgreSQL database and Resend email service.
**Lead Generation**: ✅ Complete Phase 1 Critical Growth Engine implemented with 3 professional lead magnets, email automation, and multi-touchpoint conversion funnel.

## Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack (port 3000)
npm run build        # Production build (fully tested)
npm run start        # Start production server
npm run lint         # Run ESLint
npm run analyze      # Bundle analysis (sets ANALYZE=true)

# Testing
npm run test         # Run all Jest tests
npm run test:api     # Test API endpoints
npm run test:forms   # Test form components
npm run test:seo     # Test SEO and structured data
npm run test:all     # Run core test suite
npm run test:full    # Run complete test suite including performance

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4 with custom design system
- **Database**: PostgreSQL with Prisma ORM (production-ready)
- **Email**: Resend API for production email delivery & lead nurturing
- **Lead Generation**: Complete funnel with PDF guides, exit-intent popups, and email sequences
- **Booking System**: Dual system with Doctolib widget integration + contact forms
- **Forms**: react-hook-form + Zod validation
- **UI Components**: Custom design system (no external UI library)
- **Blog**: MDX with next-mdx-remote (client-side rendering)
- **SEO**: next-seo with structured data
- **Testing**: Jest with comprehensive test suite
- **Deployment**: Render (PostgreSQL + Web Service)
- **Authentication**: Google Calendar integration ready
- **Analytics**: Custom event tracking for lead generation conversion funnel

### Core Directories Structure

```
src/
├── app/                 # Next.js App Router pages and API routes
│   ├── api/            # Server-side API endpoints (contact, booking, newsletter, admin)
│   │   └── download/   # Lead magnet download API with analytics & email automation
│   ├── blog/           # Blog pages with MDX support & contextual lead magnets
│   ├── ressources/     # Lead magnet landing pages (3 professional guides)
│   │   ├── sortir-violence-conjugale/     # Violence conjugale guide (12 pages)
│   │   ├── gerer-anxiete-quotidien/       # Anxiety management guide (8 pages)
│   │   └── 10-signes-consultation/        # Consultation checklist (2 pages)
│   ├── secteur/        # City-specific pages for local SEO
│   ├── specialites/    # Psychology specialization pages + contextual lead magnets
│   └── modalites/      # Consultation modality pages
├── components/
│   ├── ui/             # Design system components (Button, Card, Input, etc.)
│   ├── layout/         # Layout components (Header, Footer, Layout)
│   ├── forms/          # Form components (ContactForm, BookingForm, LeadMagnetForm)
│   ├── animations/     # Animation components (FadeInSection, HoverEffects)
│   ├── ExitIntentPopup.tsx     # Smart exit-intent popup system
│   ├── LeadMagnetSidebar.tsx   # Contextual lead magnet promotion components
│   ├── SpecialtyPageTemplate.tsx # Template with integrated lead magnet offers
│   ├── BlogContent.tsx # Client-side MDX blog rendering
│   └── MDXContent.tsx  # MDX component definitions
├── lib/
│   ├── constants.ts       # Site configuration, contact info, services data, navigation
│   ├── types.ts          # TypeScript interfaces (forms, data, lead magnets)
│   ├── utils.ts          # Utility functions (formatting, validation, business logic)
│   ├── schemas.ts        # Zod validation schemas (contact, booking, lead magnets)
│   ├── structured-data.ts # SEO structured data schemas
│   ├── email.ts          # Resend email service + 5-email nurturing sequences
│   ├── database.ts       # Prisma operations + lead magnet tracking
│   ├── contact-management.ts # Contact form handling
│   ├── booking.ts        # Appointment booking logic
│   ├── blog.ts           # Blog content management
│   └── analytics.ts      # Analytics tracking + conversion funnel events
├── middleware.ts         # Rate limiting and security
└── types/               # Global TypeScript declarations
```

### Production Infrastructure

```
prisma/
├── schema.prisma       # Database schema (Contact, Appointment, Analytics, LeadMagnet models)
└── migrations/         # Database migration files

content/
└── lead-magnets/       # Lead magnet content and professional PDFs
    ├── sortir-violence-conjugale.md       # Source markdown for violence guide
    ├── gerer-anxiete-quotidien.md         # Source markdown for anxiety guide
    └── 10-signes-consultation-psychologue.md # Source markdown for consultation checklist

public/content/lead-magnets/pdfs/    # Professional PDF guides (3.47 MB total)
    ├── guide-sortir-violence-conjugale.pdf     # 0.71 MB - Professional violence safety guide
    ├── guide-gerer-anxiete-quotidien.pdf       # 0.88 MB - Practical anxiety management techniques
    └── 10-signes-consultation-psychologue.pdf  # 1.88 MB - Interactive consultation checklist

tests/
├── api/               # API endpoint tests (including /api/download)
├── forms/             # Form component tests (including LeadMagnetForm)
├── seo/               # SEO and structured data tests
├── business/          # Business logic tests (including lead generation)
├── accessibility/     # Accessibility tests
├── performance/       # Performance tests
└── integration/       # Integration tests (including conversion funnel)

docs/
├── RENDER_DEPLOYMENT.md    # Complete deployment guide
├── IMAGE_REQUIREMENTS.md   # Professional image specifications
└── GOOGLE_CALENDAR_SETUP.md # Google Calendar integration
```

### Lead Generation System Architecture

The site implements a complete **Phase 1 Critical Growth Engine** with professional lead magnets and email automation:

**🎯 Lead Magnets (3 Professional PDF Guides):**
1. **Violence Conjugale Guide** (0.71 MB, professional PDF) - `/ressources/sortir-violence-conjugale`
   - Target: Victims of domestic violence and their supporters
   - Content: Comprehensive 12-page safety guide with legal procedures, emergency contacts, reconstruction steps
   - PDF: `guide-sortir-violence-conjugale.pdf` with professional medical design
   - CTA: Red theme, urgent messaging, specialized support offer

2. **Anxiety Management Guide** (0.88 MB, professional PDF) - `/ressources/gerer-anxiete-quotidien`
   - Target: People suffering from anxiety and stress
   - Content: 8-page practical guide with breathing techniques, cognitive restructuring, daily management program
   - PDF: `guide-gerer-anxiete-quotidien.pdf` with step-by-step techniques
   - CTA: Blue theme, wellness focus, professional techniques

3. **Consultation Checklist** (1.88 MB, professional PDF) - `/ressources/10-signes-consultation`
   - Target: Anyone questioning whether they need psychological support
   - Content: Comprehensive 10-point assessment with scoring system, emergency contacts, consultation preparation
   - PDF: `10-signes-consultation-psychologue.pdf` with interactive checklist format
   - CTA: Purple theme, self-reflection, professional guidance

**🎯 Multi-Touchpoint Conversion Funnel:**
- **Homepage Hero Section**: Features consultation checklist with visual preview
- **Specialty Pages**: Contextual lead magnet offers (violence page → violence guide)
- **Blog Integration**: Smart content analysis determines relevant guide
- **Sidebar Components**: Reusable LeadMagnetSidebar with 4 variants
- **Footer Promotion**: "Ressources Gratuites" section on every page
- **Exit-Intent Popups**: Smart targeting based on page content
- **Navigation Access**: "Ressources" menu item with dropdown to all guides

**🎯 Email Automation System:**
- **5-Email Nurturing Sequences**: Specialized sequences per lead magnet category
- **Welcome Series**: Introduction to Safa Shili's approach and expertise
- **Value-First Content**: Practical tips and techniques before promotional content
- **Consultation Encouragement**: Gentle progression toward booking consultation
- **GDPR Compliance**: Explicit opt-in, easy unsubscribe, data protection

### Design System Architecture

The project uses a custom design system located in `/src/components/ui/`. All components follow these patterns:

- **Variants**: Most components accept a `variant` prop for different styles
- **Forwardref**: All components use React.forwardRef for proper ref handling  
- **TypeScript**: Strict typing with interface extension of native HTML elements
- **Tailwind**: Uses `cn()` utility (tailwind-merge + clsx) for class combination
- **Modularity**: Each component is exported from `/src/components/ui/index.ts`

Key components:
- `Button`: 5 variants (primary, secondary, ghost, danger, outline), 4 sizes, loading state
- `Section`: Layout wrapper with 4 variants, responsive padding, container integration
- `Card`: Modular card system with Header, Content, Footer subcomponents
- `Layout`: Global layout wrapper with Header/Footer integration

### Business Logic & Configuration

**Site Configuration**: `/src/lib/constants.ts` contains all business data:
- Contact information and business hours
- Service offerings with pricing
- **Navigation structure with "Ressources" menu** including lead magnet dropdown
- Cities served for local SEO
- Emergency contact numbers
- **Lead magnet metadata and configuration**

**Type System**: `/src/lib/types.ts` defines interfaces for:
- Form data (ContactFormData, BookingData, NewsletterData, **LeadMagnetDownloadData**)
- Business entities (Service, Article, Testimonial, FAQ, **LeadMagnet**, **EmailSequence**)
- Geographic data (City information for local SEO)
- **Lead generation data types** (EmailTemplate, SentEmail, EmailSequenceSubscription)

### API Architecture

API routes follow RESTful patterns in `/src/app/api/` with production-grade features:

**Core APIs:**
- `POST /api/contact` - Contact form submission with database persistence
- `POST /api/newsletter` - Newsletter subscription with GDPR compliance
- `GET/POST /api/booking` - Appointment booking with Google Calendar integration
- **`POST /api/download`** - **Lead magnet form submission with email automation**
  - Validates lead magnet form submissions with Zod schemas
  - Triggers email delivery with secure PDF download links
  - Initiates 5-email nurturing sequences based on category
  - Tracks conversion funnel analytics and user behavior
  - Manages GDPR-compliant data collection and consent
- **`GET /api/download`** - **Secure PDF download endpoint**
  - Token-based authentication for PDF access
  - Direct PDF file serving (3 professional guides: 3.47 MB total)
  - Download tracking and analytics
  - CORS security for email client compatibility
- `POST /api/analytics` - Custom analytics events storage

**Admin APIs:**
- `GET /api/admin/contacts` - Contact management dashboard (secured with admin credentials)
- `POST /api/admin/auth` - Admin authentication system

**Authentication:**
- `POST /api/auth/google` - Google Calendar OAuth integration

**Features:**
- Zod schema validation for all inputs
- Rate limiting with memory/Redis store
- CSRF protection
- Database persistence with Prisma
- Email notifications via Resend
- Error handling and logging
- Production/development mode detection

### Database Architecture

**Production Database**: PostgreSQL on Render with Prisma ORM

**Models:**
- `Contact` - Form submissions with GDPR compliance
- `Appointment` - Booking requests with Google Calendar sync
- `GdprRequest` - Data deletion requests
- `AnalyticsEvent` - Business intelligence tracking

**Data Management:**
- Hybrid architecture: Database-first with memory fallback
- Graceful degradation for development environments
- Automatic contact tagging and categorization
- GDPR-compliant data retention policies

```typescript
// Production-ready database operations
const contact = await DatabaseContactManager.saveContact(formData)
const appointments = await DatabaseAppointmentManager.getAppointments()
```

### Blog System

**MDX Integration**: Professional blog with full Markdown support

**Architecture:**
- Server-side content parsing with `gray-matter` and `reading-time`
- Client-side MDX rendering with `next-mdx-remote`
- Custom MDX components using design system
- SEO optimization with structured data

**Content Management:**
- File-based content in `/content/blog/`
- Automatic reading time calculation
- Category and tag system
- Related posts generation
- Social media meta tags

### Email System

**Production Email**: Resend API with domain verification

**Features:**
- Professional email templates
- GDPR-compliant opt-in/opt-out
- Automatic contact confirmations
- Admin notifications
- Development mode simulation

```typescript
// Production email sending
await EmailService.sendContactConfirmation(contactData)
await EmailService.sendAdminNotification(contactData)
```

### SEO Strategy

The site implements comprehensive local SEO:
- **Structured Data**: LocalBusiness, MedicalBusiness, Person schemas
- **Local Keywords**: Targets "psychologue Rosny-sous-Bois" and surrounding cities
- **Business Information**: Consistent NAP (Name, Address, Phone) across all pages
- **Content Strategy**: Specialty pages for different therapeutic services
- **Blog SEO**: Article metadata, reading time, social sharing

### Testing Strategy

**Comprehensive Test Suite**: Jest with 8 test categories

**Test Categories:**
- `npm run test:api` - API endpoint functionality and validation
- `npm run test:forms` - Form components and validation logic
- `npm run test:seo` - Structured data and SEO compliance
- `npm run test:business` - Booking logic and business rules
- `npm run test:accessibility` - WCAG compliance testing
- `npm run test:performance` - Core Web Vitals optimization
- `npm run test:integration` - End-to-end user flows
- `npm run test:security` - Security and rate limiting

**Coverage Areas:**
- Contact form submission and validation
- Appointment booking logic
- Email template rendering
- Database operations
- SEO structured data
- Performance metrics
- Security headers

### Environment Configuration

**Development Setup:**
```bash
DATABASE_URL="postgresql://localhost:5432/psychology_practice_dev"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NODE_ENV="development"
```

**Production Requirements:**
```bash
DATABASE_URL="postgresql://..."  # Render PostgreSQL URL
RESEND_API_KEY="re_..."         # Resend email service
CONTACT_EMAIL="contact@safashili.com"
NEXT_PUBLIC_SITE_URL="https://safashili.com"
CSRF_SECRET="strong-random-string"
NODE_ENV="production"

# Admin System
ADMIN_USERNAME="safa.admin"     # Admin dashboard access
ADMIN_PASSWORD="secure-password" # Change in production
```

**Optional Enhancements:**
```bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID="G-..."  # Google Analytics
GOOGLE_CALENDAR_CLIENT_ID="..."         # Calendar integration
NEXT_PUBLIC_EMAILJS_SERVICE_ID="..."    # Backup email service
```

**Doctolib Integration:**
```bash
NEXT_PUBLIC_DOCTOLIB_PRACTITIONER_ID="..."  # Doctolib practitioner ID for widget
```

### Booking System Architecture

**Dual Booking System**: The site features a sophisticated booking system with two complementary options:

1. **Instant Booking (Doctolib Widget)**: 
   - Real-time calendar integration with Doctolib
   - Direct appointment booking without leaving the website
   - Automatic confirmation and reminder emails
   - Custom styling to match site design

2. **Contact Request Form**:
   - Traditional booking request via contact form
   - Sends to contact API for manual processing
   - 24-hour response guarantee
   - Fallback for widget issues

**Implementation Details:**
- **Location**: `/src/app/rendez-vous/page.tsx` - Main booking page with tabbed interface
- **Widget Component**: `/src/components/DoctoLibWidget.tsx` - Doctolib widget integration
- **Configuration**: `/src/lib/constants/doctolib.ts` - Complete Doctolib settings
- **Form Component**: `/src/components/forms/BookingForm.tsx` - Contact-based booking requests

**Key Features:**
- Seamless UI integration (users never leave the website)
- Automatic fallback handling if Doctolib widget fails
- Custom styling matching site design
- Analytics tracking for both booking methods
- GDPR-compliant patient data handling

**Setup Requirements:**
1. Doctolib practitioner account with widget access
2. Practitioner ID configuration in environment variables
3. Proper consultation types and pricing setup in Doctolib
4. Widget styling customization for brand consistency

**Documentation**: See `/docs/DOCTOLIB_INTEGRATION_SETUP.md` for complete setup guide.

### Admin System Architecture

**Dashboard Access**: `/admin` (secured with basic authentication)

**Admin Credentials** (from environment variables):
- Username: `safa.admin` (ADMIN_USERNAME)
- Password: `shouw` (ADMIN_PASSWORD - change in production)

**Admin Features:**
- Contact management dashboard with database integration
- Lead magnet download analytics and statistics
- GDPR-compliant data export and deletion
- Email sequence subscription management
- Real-time conversion funnel metrics

**Security:**
- Basic HTTP authentication for admin routes
- CSRF protection on all admin operations
- Rate limiting on admin login attempts
- Session management with secure cookies

### Production Deployment

**Target Platform**: Render (PostgreSQL + Web Service)

**Prerequisites:**
1. Professional headshot image at `/public/images/safa-shili-psychologue.jpg`
2. Resend account with domain verification
3. PostgreSQL database on Render
4. Environment variables configured

**Deployment Steps:**
1. Follow `RENDER_DEPLOYMENT.md` guide
2. Configure database with `npx prisma db push`
3. Upload professional images per `IMAGE_REQUIREMENTS.md`
4. Verify email delivery with Resend
5. Test contact forms and booking system

### Key Development Patterns

1. **Typography**: Uses Inter (sans-serif) and Merriweather (serif) via `next/font/google`
2. **Colors**: Custom blue/green palette defined in `tailwind.config.ts`
3. **Responsive**: Mobile-first approach with consistent breakpoints
4. **Performance**: Image optimization, bundle analysis, Core Web Vitals optimization
5. **Security**: Custom headers, CSRF protection, input sanitization, rate limiting
6. **Accessibility**: WCAG 2.1 AA compliance target
7. **Data Persistence**: Hybrid database/memory architecture for reliability
8. **Email Delivery**: Production Resend integration with development fallbacks

### Form Handling Pattern

All forms use react-hook-form + Zod validation:
```typescript
// Schema definition in /src/lib/schemas.ts
export const ContactSchema = z.object({...})

// Component usage
const form = useForm<ContactFormData>({
  resolver: zodResolver(ContactSchema)
})
```

### Business Hours & Availability Logic

The site includes business logic for appointment scheduling:
- Business hours defined in constants
- `isBusinessOpen()` utility function
- `getNextAvailableSlot()` for appointment booking
- French business hour formatting utilities

### Local SEO Cities

The site targets these primary locations for local SEO:
- Rosny-sous-Bois (primary)
- Montreuil, Bondy, Bagnolet, Noisy-le-Sec (secondary)
- Transport information for each location

### Specialization Focus

The site emphasizes these psychological specialties:
- Violence conjugale & familiale (primary specialization)
- Psychotraumatologie 
- Thérapie adolescents
- Accompagnement adultes
- Souffrance au travail
- Bilans psychologiques

## Production Notes

**Current Status**: ✅ Fully production-ready with comprehensive testing, complete lead generation funnel, and professional PDF guides

**Architecture Highlights:**
- Hybrid database/memory storage for maximum reliability
- Client-side MDX rendering for React 18 compatibility  
- Professional email service with Resend API integration
- **Complete Phase 1 Critical Growth Engine with 3 professional PDF guides (3.47 MB total)**
- **Multi-touchpoint conversion funnel with email automation sequences**
- **Smart contextual lead magnet targeting based on content analysis**
- **Secure PDF download system with token authentication**
- **CORS-compliant API for email client compatibility**
- **Admin dashboard with contact management (safa.admin access)**
- Comprehensive test coverage across all critical paths
- Local SEO optimization for Seine-Saint-Denis region
- Production Supabase database with lead magnet tracking

**Development Guidelines:**
- Always run `npm run test:all` before major changes
- Use `npm run build` to verify production compatibility
- Follow the established design system patterns
- Maintain GDPR compliance for all data operations
- **Test lead generation funnel components and email automation**
- **Verify contextual lead magnet targeting accuracy**
- Test email functionality in both development and production modes

**When working on this codebase:**
- Maintain the professional, empathetic tone appropriate for mental health services
- Ensure all new features support the local SEO strategy for the Seine-Saint-Denis region
- **Preserve the conversion funnel integrity when making changes to pages**
- **Test lead magnet contextual targeting when modifying content**
- **Verify email sequence triggers when updating lead generation components**
- Test database operations in both connected and fallback modes
- Verify email delivery through both Resend and development channels
- Run the full test suite to ensure no regressions

**Lead Generation System Maintenance:**
- Content changes may affect contextual lead magnet targeting
- Blog posts determine which lead magnet appears in sidebar via content analysis
- Specialty pages have predefined lead magnet mappings
- Exit-intent popups adapt based on page type and user behavior
- All lead magnet downloads trigger email automation sequences

**Recent Updates & Issue Resolution:**

✅ **Lead Magnet System Completion (Latest)**:
- Created 3 professional PDF guides (3.47 MB total) with medical-grade design
- Fixed CORS "Origin not allowed" error for email download links
- Implemented secure token-based PDF download system
- Optimized Prisma Client generation for deployment
- Added comprehensive download analytics and tracking

✅ **Database & Deployment Optimization**:
- Enhanced Prisma schema with binary targets for cross-platform deployment  
- Added `postinstall` script for automatic client generation
- Resolved Supabase connection issues with proper error handling
- Implemented hybrid fallback system for maximum reliability

**Emergency Contacts & Support:**
- Database issues: Check Render dashboard and Prisma logs
- Email delivery problems: Verify Resend API key and domain verification
- Build failures: Review `npm run build` output and dependency versions
- Performance issues: Use `npm run analyze` for bundle analysis
- PDF download issues: Check token generation and file permissions

**Production Deployment Status:**
The website is ready for immediate production deployment following the `RENDER_DEPLOYMENT.md` guide. The complete Phase 1 Critical Growth Engine with professional PDF lead magnets, email automation, and multi-touchpoint conversion funnel is fully operational and production-ready with all critical issues resolved.