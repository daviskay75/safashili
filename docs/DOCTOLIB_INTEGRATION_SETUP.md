# Doctolib Integration Setup Guide

This guide explains how to configure the Doctolib widget integration for seamless online booking while maintaining your custom UI.

## Overview

The website includes a dual booking system:
1. **Instant Booking**: Doctolib widget for immediate appointments
2. **Contact Request**: Traditional form for consultation requests

Both options are presented in a tabbed interface on the `/rendez-vous` page, ensuring patients never leave your website.

## Prerequisites

1. Active Doctolib practitioner account
2. Verified practice information on Doctolib
3. Access to Doctolib's widget configuration

## Step 1: Get Your Practitioner ID

### Method 1: Through Doctolib Dashboard
1. Log into your Doctolib practitioner account
2. Go to **Settings** → **Online Booking Widget**
3. Find your **Practitioner ID** (usually a string of numbers)
4. Copy this ID for configuration

### Method 2: From Widget URL
1. In your Doctolib settings, generate a widget
2. Look at the generated URL: `https://widget.doctolib.fr/practitioners/[PRACTITIONER_ID]/booking`
3. Extract the practitioner ID from the URL

### Method 3: Contact Doctolib Support
If you can't find your ID, contact Doctolib support with:
- Your practice name
- Registered email address
- Practice address

## Step 2: Configure Environment Variables

### Development Environment
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Doctolib practitioner ID:
   ```env
   NEXT_PUBLIC_DOCTOLIB_PRACTITIONER_ID="123456789"
   ```

### Production Environment (Render)
1. Go to your Render dashboard
2. Select your web service
3. Go to **Environment** tab
4. Add environment variable:
   - Key: `NEXT_PUBLIC_DOCTOLIB_PRACTITIONER_ID`
   - Value: Your practitioner ID (numbers only)

## Step 3: Doctolib Account Configuration

### Widget Settings
In your Doctolib account, configure:

1. **Consultation Types**: Ensure these match your website offerings:
   - Consultation au cabinet (60 min) - 70€
   - Consultation au cabinet (90 min) - 95€
   - Consultation à domicile (90 min) - 110€
   - Consultation en visioconférence (60 min) - 65€
   - Thérapie de groupe (90 min) - 45€

2. **Availability Settings**:
   - Monday: 14:00-21:00
   - Tuesday-Friday: 11:00-13:00, 14:00-21:00
   - Saturday: 09:00-17:00
   - Sunday: Closed

3. **Booking Rules**:
   - ✅ Allow online booking
   - ✅ Require patient information
   - ✅ Send confirmation emails
   - ✅ Allow cancellations (24h notice)
   - ❌ Require payment upfront

### Patient Information Requirements
Configure required fields:
- ✅ First name / Last name
- ✅ Email address
- ✅ Phone number
- ✅ Date of birth
- ✅ Reason for consultation
- ❌ Address (optional)
- ❌ Medical history (optional)

## Step 4: Verify Integration

### Development Testing
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/rendez-vous`

3. Test both booking options:
   - **Instant Booking tab**: Should load Doctolib widget
   - **Contact Request tab**: Should show contact form

### Widget Loading Verification
Check for:
- ✅ Widget loads without errors
- ✅ Available time slots appear
- ✅ Booking flow works completely
- ✅ Fallback message shows if widget fails
- ✅ Custom styling matches your website

### Fallback Testing
To test fallback behavior:
1. Temporarily set an invalid practitioner ID
2. Verify the fallback message appears
3. Restore correct practitioner ID

## Step 5: Production Deployment

### Pre-deployment Checklist
- [ ] Valid practitioner ID configured
- [ ] Doctolib account properly set up
- [ ] Widget tested in development
- [ ] Environment variables set on Render
- [ ] Domain verification completed

### Post-deployment Verification
1. Test the live booking system
2. Verify confirmation emails are sent
3. Check Doctolib dashboard for test appointments
4. Test cancellation flow

## Customization Options

### Widget Styling
The widget uses custom CSS (defined in `/src/lib/constants/doctolib.ts`):
- Matches your website's color scheme
- Hidden headers/footers for seamless integration
- Custom button styling
- Responsive design

### Consultation Types
Update consultation offerings in `/src/lib/constants/doctolib.ts`:
```typescript
consultationTypes: {
  'new-type': {
    name: 'New Consultation Type',
    duration: 60,
    price: 70,
    location: 'Your location'
  }
}
```

### Availability
Modify working hours in the same file:
```typescript
availability: {
  workingHours: {
    monday: { start: '14:00', end: '21:00' },
    // ... other days
  }
}
```

## Troubleshooting

### Widget Not Loading
**Symptoms**: Loading spinner shows indefinitely
**Solutions**:
1. Verify practitioner ID is correct
2. Check Doctolib account is active
3. Ensure widget is enabled in Doctolib settings
4. Check browser console for errors

### Booking Confirmation Issues
**Symptoms**: Bookings made but no confirmation
**Solutions**:
1. Verify email settings in Doctolib
2. Check patient email addresses
3. Review Doctolib notification settings

### Styling Problems
**Symptoms**: Widget doesn't match website design
**Solutions**:
1. Review custom CSS in doctolib configuration
2. Test with browser developer tools
3. Update styling in `/src/lib/constants/doctolib.ts`

### Performance Issues
**Symptoms**: Widget loads slowly
**Solutions**:
1. Check internet connection
2. Verify Doctolib service status
3. Review browser network tab for loading times

## Advanced Configuration

### Multi-language Support
For international patients:
```typescript
widget: {
  locale: 'fr', // or 'en', 'es', etc.
  // ... other settings
}
```

### Custom Notifications
Integrate with your email system:
```typescript
bookingFlow: {
  confirmationMethod: 'both', // email + SMS
  reminderSettings: {
    enabled: true,
    reminderTimes: [24, 2], // hours before
    methods: ['email', 'sms']
  }
}
```

## Support & Maintenance

### Regular Checks
- Monthly: Verify widget functionality
- Quarterly: Review booking analytics
- As needed: Update consultation types/pricing

### Doctolib Support
If you encounter issues:
- Doctolib Support: contact via your practitioner dashboard
- Documentation: Check Doctolib's widget API documentation
- Community: Consult Doctolib practitioner forums

### Technical Support
For website-specific issues:
- Check error logs in Render dashboard
- Review browser console errors
- Test in different browsers/devices

## Security Considerations

- ✅ Practitioner ID is public (safe to expose)
- ✅ No sensitive credentials in frontend code
- ✅ HTTPS required for widget functionality
- ✅ Patient data handled by Doctolib (GDPR compliant)

## Analytics & Tracking

The integration includes tracking for:
- Widget load attempts
- Successful bookings via widget
- Fallback form usage
- User interaction patterns

View analytics in your Google Analytics dashboard under "Events" → "Booking".