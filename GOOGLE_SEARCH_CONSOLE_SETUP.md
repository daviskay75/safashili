# Google Search Console Setup Guide

## 🎯 Setup Instructions for Psychology Practice

### **Step 1: Property Verification**

1. **Go to Google Search Console**: https://search.google.com/search-console/
2. **Add Property**: 
   - Choose "URL prefix" method
   - Enter: `https://safa-shili-psychologue.fr`
3. **Verify Ownership** (Choose one method):
   
   **Method A: HTML File Upload**
   - Download verification file from Google
   - Upload to `/public/` folder as `google[...].html`
   
   **Method B: Meta Tag** (Recommended)
   - Copy the meta tag provided by Google
   - Add to layout.tsx `<head>` section:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
   
   **Method C: GTM Verification**
   - Use existing GTM container for verification (if GTM is already connected)

### **Step 2: Sitemap Submission**

1. **Automatic Sitemap**: Our dynamic sitemap is already configured at:
   - `https://safa-shili-psychologue.fr/sitemap.xml`

2. **Submit to Search Console**:
   - Go to "Sitemaps" section
   - Add sitemap URL: `sitemap.xml`
   - Submit and verify successful processing

3. **Verify Sitemap Content**:
   ```
   ✅ Homepage (priority: 1.0)
   ✅ About page (priority: 0.8)
   ✅ Contact page (priority: 0.8)
   ✅ Specialties index (priority: 0.9)
   ✅ Individual specialty pages (priority: 0.8)
   ✅ Modalities pages (priority: 0.6-0.7)
   ✅ City/location pages (priority: 0.7)
   ✅ Blog/info pages (priority: 0.7)
   ```

### **Step 3: Core Web Vitals Monitoring**

Our implementation automatically provides:
- **LCP Tracking**: Largest Contentful Paint monitoring
- **FID Tracking**: First Input Delay measurement  
- **CLS Tracking**: Cumulative Layout Shift detection
- **Performance Budget**: Lighthouse CI integration

**Search Console will show**:
- Real-user Core Web Vitals data
- Mobile usability issues
- Page experience signals
- Performance opportunities

### **Step 4: Rich Results Monitoring**

Our structured data implementation includes:
- **LocalBusiness Schema**: Practice information
- **MedicalBusiness Schema**: Healthcare-specific data
- **Person Schema**: Safa Shili professional profile
- **Service Schemas**: Individual psychology services
- **FAQ Schemas**: Common questions markup

**Monitor in Search Console**:
- Enhancements > FAQ
- Enhancements > Local Business
- Rich results test tool validation

### **Step 5: Mobile Usability Check**

Our responsive implementation should pass all checks:
- ✅ Viewport meta tag configured
- ✅ Touch targets 44px minimum
- ✅ Responsive font sizes
- ✅ Content fits viewport
- ✅ No horizontal scrolling

### **Step 6: Regional/Local SEO Setup**

**Geographic Targeting**:
- Set target country: France 🇫🇷
- Target region: Île-de-France
- Local focus: Seine-Saint-Denis (93)

**Local Keywords Monitoring**:
- "psychologue Rosny-sous-Bois"
- "psychologue 93110"
- "violence conjugale psychologue"
- "psychotraumatologie Seine-Saint-Denis"
- "thérapie adolescent Rosny"

### **Step 7: Search Analytics Configuration**

**Key Metrics to Monitor**:
1. **Clicks & Impressions**: Overall visibility
2. **CTR (Click-Through Rate)**: Title/description effectiveness
3. **Average Position**: Ranking performance
4. **Query Analysis**: Search terms bringing traffic

**Important Queries for Psychology Practice**:
- Emergency/crisis related searches
- Specialty-specific queries
- Local geographic searches
- Service/consultation type searches

### **Step 8: Index Coverage Monitoring**

**Pages to Monitor**:
- ✅ All specialty pages indexed
- ✅ Local city pages indexed  
- ✅ Contact and booking pages indexed
- ❌ Admin/API routes excluded (robots.txt)
- ❌ Dev files excluded

**Exclusions (Expected)**:
```
/api/* - Server routes
/admin/* - Administrative pages
/_next/* - Next.js internal files
```

## 🚀 Post-Setup Actions

### **Immediate Tasks** (Week 1)
- [ ] Verify property ownership
- [ ] Submit main sitemap
- [ ] Check initial indexing status
- [ ] Validate structured data

### **Ongoing Monitoring** (Weekly)
- [ ] Core Web Vitals performance
- [ ] Index coverage issues
- [ ] Search query analysis
- [ ] Mobile usability reports

### **Monthly Reviews**
- [ ] Local SEO performance
- [ ] Specialty page rankings
- [ ] Emergency contact page visibility
- [ ] Patient journey search patterns

## 🎯 Psychology Practice Specific Considerations

### **Crisis/Emergency Content Priority**
- Emergency contact pages must be indexed
- Crisis resource pages need high visibility
- Local emergency service information

### **GDPR Compliance**
- No personal patient data in URLs
- Anonymous analytics only
- Privacy-first approach in all tracking

### **Professional Standards**
- Healthcare content guidelines
- Medical accuracy in structured data
- Professional ethics in search presence

### **Local Community Focus**
- Seine-Saint-Denis local keywords
- Transport/accessibility information
- Community resource integration

---

**Search Console setup guide prepared by DEV 3**  
*Ready for deployment and ongoing SEO monitoring*