/**
 * Comprehensive Website Testing with Puppeteer
 * Psychology Practice Website - Safa Shili
 * 
 * Tests navigation, forms, responsiveness, and takes screenshots
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class WebsiteTester {
  constructor() {
    this.baseUrl = 'http://localhost:3001';
    this.screenshotDir = path.join(__dirname, '..', 'screenshots');
    this.issues = [];
    this.testResults = {
      navigation: [],
      forms: [],
      pages: [],
      responsive: [],
      performance: [],
      accessibility: []
    };
  }

  async init() {
    // Create screenshots directory
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }

    // Launch browser
    this.browser = await puppeteer.launch({ 
      headless: false, // Set to true for CI
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    
    // Set up error logging
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.issues.push({
          type: 'Console Error',
          message: msg.text(),
          location: msg.location()
        });
      }
    });

    this.page.on('pageerror', error => {
      this.issues.push({
        type: 'Page Error',
        message: error.message,
        stack: error.stack
      });
    });
  }

  async takeScreenshot(name, options = {}) {
    const filename = `${name}.png`;
    const filepath = path.join(this.screenshotDir, filename);
    
    await this.page.screenshot({
      path: filepath,
      fullPage: true,
      ...options
    });
    
    console.log(`📸 Screenshot saved: ${filename}`);
    return filepath;
  }

  async testHomepage() {
    console.log('🏠 Testing Homepage...');
    
    try {
      await this.page.goto(`${this.baseUrl}/`, { waitUntil: 'networkidle2' });
      
      // Take homepage screenshot
      await this.takeScreenshot('homepage-desktop');
      
      // Test hero section (look for main heading and hero content)
      const heroSection = await this.page.$('.hero, [data-testid="hero"], section:first-of-type, main section:first-child');
      const heroHeading = await this.page.$('h1');
      const hasHero = !!(heroSection || heroHeading);
      
      // Test navigation
      const navLinks = await this.page.$$('nav a, header a');
      const navCount = navLinks.length;
      
      // Test services section (look for "Mes Spécialités" or services grid)
      const servicesSection = await this.page.$('[data-testid="services"], .services');
      const specialitiesHeading = await this.page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h2, h3'));
        return headings.some(h => h.textContent.includes('Spécialités') || h.textContent.includes('Violence') || h.textContent.includes('Psychotraumatologie'));
      });
      const hasServices = !!(servicesSection || specialitiesHeading);
      
      // Test CTA buttons
      const ctaButtons = await this.page.$$('a[href="/rendez-vous"], a[href="/contact"]');
      const ctaCount = ctaButtons.length;
      
      // Test professional image
      const professionalImage = await this.page.$('img[alt*="Safa Shili"]');
      const hasImage = !!professionalImage;
      
      this.testResults.pages.push({
        page: 'Homepage',
        url: '/',
        status: 'success',
        details: {
          hasHero,
          navLinksCount: navCount,
          hasServices,
          ctaButtonsCount: ctaCount,
          hasProfessionalImage: hasImage
        }
      });
      
      if (!hasHero) {
        this.issues.push({
          type: 'Missing Element',
          page: 'Homepage',
          message: 'Hero section not found'
        });
      }
      
      console.log(`✅ Homepage tested - Navigation: ${navCount} links, CTA: ${ctaCount} buttons`);
      
    } catch (error) {
      this.issues.push({
        type: 'Page Load Error',
        page: 'Homepage',
        message: error.message
      });
      console.log(`❌ Homepage test failed: ${error.message}`);
    }
  }

  async testNavigation() {
    console.log('🧭 Testing Navigation...');
    
    const testPages = [
      { name: 'About', url: '/about' },
      { name: 'Contact', url: '/contact' },
      { name: 'Booking', url: '/rendez-vous' },
      { name: 'Blog', url: '/blog' },
      { name: 'Violence Conjugale', url: '/specialites/violence-conjugale' },
      { name: 'Psychotraumatologie', url: '/specialites/psychotraumatologie' },
      { name: 'Rosny-sous-Bois', url: '/secteur/rosny-sous-bois' },
      { name: 'Cabinet Consultation', url: '/modalites/consultation-cabinet' }
    ];

    for (const testPage of testPages) {
      try {
        console.log(`  📄 Testing ${testPage.name}...`);
        
        await this.page.goto(`${this.baseUrl}${testPage.url}`, { 
          waitUntil: 'networkidle2',
          timeout: 10000 
        });
        
        // Take screenshot
        await this.takeScreenshot(`page-${testPage.name.toLowerCase().replace(/\s+/g, '-')}`);
        
        // Check if page loaded successfully
        const title = await this.page.title();
        const h1 = await this.page.$('h1');
        const h1Text = h1 ? await this.page.evaluate(el => el.textContent, h1) : null;
        
        this.testResults.navigation.push({
          page: testPage.name,
          url: testPage.url,
          status: 'success',
          title,
          h1Text
        });
        
        console.log(`    ✅ ${testPage.name} loaded successfully`);
        
      } catch (error) {
        this.issues.push({
          type: 'Navigation Error',
          page: testPage.name,
          url: testPage.url,
          message: error.message
        });
        console.log(`    ❌ ${testPage.name} failed: ${error.message}`);
      }
    }
  }

  async testContactForm() {
    console.log('📝 Testing Contact Form...');
    
    try {
      await this.page.goto(`${this.baseUrl}/contact`, { waitUntil: 'networkidle2' });
      
      // Take screenshot of empty form
      await this.takeScreenshot('contact-form-empty');
      
      // Test form validation (submit empty form)
      const submitButton = await this.page.$('button[type="submit"], input[type="submit"]');
      if (submitButton) {
        await submitButton.click();
        await this.page.waitForSelector('body', { timeout: 1000 }).catch(() => {});
        
        // Check for validation messages
        const validationErrors = await this.page.$$('.error, .invalid, [role="alert"]');
        await this.takeScreenshot('contact-form-validation-errors');
        
        console.log(`    📋 Found ${validationErrors.length} validation messages`);
      }
      
      // Test filling out form
      const nameField = await this.page.$('input[name="firstName"], input[name="name"]');
      const emailField = await this.page.$('input[name="email"]');
      const messageField = await this.page.$('textarea[name="message"]');
      
      if (nameField && emailField && messageField) {
        await nameField.type('Test User');
        await emailField.type('test@example.com');
        await messageField.type('This is a test message for form validation.');
        
        // Check for GDPR consent
        const consentCheckbox = await this.page.$('input[type="checkbox"][name*="consent"], input[type="checkbox"][name*="gdpr"]');
        if (consentCheckbox) {
          await consentCheckbox.click();
        }
        
        await this.takeScreenshot('contact-form-filled');
        
        this.testResults.forms.push({
          form: 'Contact Form',
          status: 'success',
          fields: {
            hasNameField: !!nameField,
            hasEmailField: !!emailField,
            hasMessageField: !!messageField,
            hasConsentCheckbox: !!consentCheckbox
          }
        });
        
        console.log('    ✅ Contact form fields tested successfully');
      } else {
        this.issues.push({
          type: 'Missing Form Fields',
          page: 'Contact',
          message: 'Required form fields not found'
        });
      }
      
    } catch (error) {
      this.issues.push({
        type: 'Form Test Error',
        page: 'Contact Form',
        message: error.message
      });
      console.log(`    ❌ Contact form test failed: ${error.message}`);
    }
  }

  async testBookingForm() {
    console.log('📅 Testing Booking Form...');
    
    try {
      await this.page.goto(`${this.baseUrl}/rendez-vous`, { waitUntil: 'networkidle2' });
      
      await this.takeScreenshot('booking-form');
      
      // Test booking form fields
      const firstNameField = await this.page.$('input[name="firstName"]');
      const lastNameField = await this.page.$('input[name="lastName"]');
      const emailField = await this.page.$('input[name="email"]');
      const phoneField = await this.page.$('input[name="phone"]');
      const consultationTypeField = await this.page.$('select[name="consultationType"], input[name="consultationType"]');
      
      this.testResults.forms.push({
        form: 'Booking Form',
        status: 'success',
        fields: {
          hasFirstName: !!firstNameField,
          hasLastName: !!lastNameField,
          hasEmail: !!emailField,
          hasPhone: !!phoneField,
          hasConsultationType: !!consultationTypeField
        }
      });
      
      console.log('    ✅ Booking form structure verified');
      
    } catch (error) {
      this.issues.push({
        type: 'Booking Form Error',
        page: 'Booking',
        message: error.message
      });
      console.log(`    ❌ Booking form test failed: ${error.message}`);
    }
  }

  async testResponsiveDesign() {
    console.log('📱 Testing Responsive Design...');
    
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      try {
        await this.page.setViewport({ width: viewport.width, height: viewport.height });
        await this.page.goto(`${this.baseUrl}/`, { waitUntil: 'networkidle2' });
        
        await this.takeScreenshot(`homepage-${viewport.name.toLowerCase()}`);
        
        // Test mobile menu (for mobile viewport)
        if (viewport.name === 'Mobile') {
          const mobileMenuButton = await this.page.$('button[aria-label*="menu"], .mobile-menu-button, [data-testid="mobile-menu"]');
          if (mobileMenuButton) {
            await mobileMenuButton.click();
            await this.page.waitForSelector('body', { timeout: 500 }).catch(() => {});
            await this.takeScreenshot('mobile-menu-open');
          }
        }
        
        this.testResults.responsive.push({
          viewport: viewport.name,
          width: viewport.width,
          height: viewport.height,
          status: 'success'
        });
        
        console.log(`    ✅ ${viewport.name} (${viewport.width}x${viewport.height}) tested`);
        
      } catch (error) {
        this.issues.push({
          type: 'Responsive Test Error',
          viewport: viewport.name,
          message: error.message
        });
        console.log(`    ❌ ${viewport.name} test failed: ${error.message}`);
      }
    }
    
    // Reset to desktop viewport
    await this.page.setViewport({ width: 1920, height: 1080 });
  }

  async testBlogSystem() {
    console.log('📰 Testing Blog System...');
    
    try {
      // Test blog listing
      await this.page.goto(`${this.baseUrl}/blog`, { waitUntil: 'networkidle2' });
      await this.takeScreenshot('blog-listing');
      
      // Test individual blog post
      const blogLinks = await this.page.$$('a[href*="/blog/"]');
      if (blogLinks.length > 0) {
        await blogLinks[0].click();
        await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
        await this.takeScreenshot('blog-post-individual');
        
        // Check for MDX content rendering
        const articleContent = await this.page.$('article, .prose, .blog-content');
        const hasBlogContent = !!articleContent;
        
        this.testResults.pages.push({
          page: 'Blog System',
          status: 'success',
          details: {
            blogListingWorks: true,
            individualPostWorks: true,
            hasMDXContent: hasBlogContent
          }
        });
        
        console.log('    ✅ Blog system functioning correctly');
      } else {
        this.issues.push({
          type: 'Blog Error',
          message: 'No blog posts found'
        });
      }
      
    } catch (error) {
      this.issues.push({
        type: 'Blog Test Error',
        message: error.message
      });
      console.log(`    ❌ Blog test failed: ${error.message}`);
    }
  }

  async generateReport() {
    const report = {
      testDate: new Date().toISOString(),
      baseUrl: this.baseUrl,
      summary: {
        totalIssues: this.issues.length,
        criticalIssues: this.issues.filter(i => i.type.includes('Error')).length,
        pagesTestedSuccessfully: this.testResults.navigation.filter(n => n.status === 'success').length,
        formsTestedSuccessfully: this.testResults.forms.filter(f => f.status === 'success').length
      },
      issues: this.issues,
      testResults: this.testResults,
      recommendations: []
    };

    // Add recommendations based on issues found
    if (this.issues.length === 0) {
      report.recommendations.push('🎉 No critical issues found! Website is ready for production.');
    } else {
      report.recommendations.push('🔧 Review and fix the identified issues before deployment.');
    }

    // Save report
    const reportPath = path.join(__dirname, '..', 'AUTOMATED_TEST_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📋 Test Report Generated');
    console.log(`📁 Screenshots saved to: ${this.screenshotDir}`);
    console.log(`📄 Report saved to: ${reportPath}`);
    console.log(`🐛 Issues found: ${this.issues.length}`);
    console.log(`✅ Pages tested: ${this.testResults.navigation.length}`);
    
    return report;
  }

  async runAllTests() {
    console.log('🚀 Starting Comprehensive Website Testing...\n');
    
    try {
      await this.init();
      
      await this.testHomepage();
      await this.testNavigation();
      await this.testContactForm();
      await this.testBookingForm();
      await this.testResponsiveDesign();
      await this.testBlogSystem();
      
      const report = await this.generateReport();
      
      await this.browser.close();
      
      console.log('\n🏁 Testing Complete!');
      
      return report;
      
    } catch (error) {
      console.error('💥 Testing failed:', error);
      if (this.browser) {
        await this.browser.close();
      }
      throw error;
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new WebsiteTester();
  tester.runAllTests().catch(console.error);
}

module.exports = WebsiteTester;