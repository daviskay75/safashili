# Image Requirements for Production

## Critical: Professional Headshot Required

### File Location
Place the professional headshot photo at:
```
/public/images/safa-shili-psychologue.jpg
```

### Image Specifications

#### Technical Requirements
- **Format**: JPG or WebP
- **Dimensions**: Minimum 800x1000px (4:5 aspect ratio)
- **File Size**: Maximum 500KB (optimized for web)
- **Quality**: High resolution for retina displays
- **Compression**: Optimized for web delivery

#### Content Requirements
- **Subject**: Professional headshot of Safa Shili
- **Style**: Professional, welcoming, approachable
- **Background**: Clean, neutral background
- **Lighting**: Professional, even lighting
- **Attire**: Professional clothing appropriate for psychology practice
- **Expression**: Warm, professional, trustworthy

#### Accessibility Requirements
- **Alt Text**: Will be automatically set to "Safa Shili, psychologue clinicienne spécialisée en violence conjugale et psychotraumatologie"
- **Color Contrast**: Ensure good contrast if text overlays are used
- **Focus**: Clear focus on subject's face

### Performance Impact
- **Core Web Vitals**: This image is the LCP (Largest Contentful Paint) element
- **Loading**: Image is set to priority loading for performance
- **Responsive**: Will be automatically optimized for multiple screen sizes

### Fallback Behavior
Until the professional image is added:
- A CSS-generated placeholder will be shown
- Alt text will still be properly set for screen readers
- Layout will be preserved to prevent CLS (Cumulative Layout Shift)

### Next.js Image Optimization
The image will be automatically optimized by Next.js:
- WebP/AVIF conversion for supported browsers
- Responsive sizes for different screen sizes
- Lazy loading for off-screen images
- Blur placeholder while loading

### Recommended Tools for Optimization
```bash
# If you have ImageMagick installed
convert input.jpg -resize 800x1000^ -gravity center -extent 800x1000 -quality 85 safa-shili-psychologue.jpg

# Online tools
# - TinyPNG.com for compression
# - Squoosh.app for format conversion
# - Photopea.com for free editing
```

## Additional Images (Optional)

### Office Photos
```
/public/images/cabinet/
├── salle-consultation.jpg
├── salle-attente.jpg
└── exterieur-cabinet.jpg
```

### Social Media Images
```
/public/images/og/
├── safa-shili-og.jpg (1200x630px for Open Graph)
└── safa-shili-twitter.jpg (1200x600px for Twitter Cards)
```

## Testing Checklist

After adding the image:
- [ ] Verify image loads correctly on homepage
- [ ] Check responsive behavior on mobile/tablet
- [ ] Test Core Web Vitals (LCP should be < 2.5s)
- [ ] Verify alt text for accessibility
- [ ] Check Open Graph image in social media previews

## Deployment Notes
- Upload image to `/public/images/` directory
- Commit and deploy
- Clear CDN cache if using one
- Verify production performance with Lighthouse