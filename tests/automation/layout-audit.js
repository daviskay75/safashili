/**
 * Comprehensive Layout and Navigation Audit
 * Checks header/footer presence, missing pages, and layout consistency
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class LayoutAuditor {
  constructor() {
    this.baseUrl = 'http://localhost:3001';
    this.screenshotDir = path.join(__dirname, '..', 'screenshots', 'layout-audit');
    this.issues = [];
    this.auditResults = {
      headerFooterCheck: [],
      missingPages: [],
      navigationConsistency: [],
      layoutIssues: []
    };
  }

  async init() {
    // Create screenshots directory
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }

    this.browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: { width: 1920, height: 1080 }
    });
    
    this.page = await this.browser.newPage();
    
    // Set up error logging
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`❌ Console Error on page: ${msg.text()}`);
      }
    });
  }

  async takeScreenshot(name) {
    const filename = `${name}.png`;
    const filepath = path.join(this.screenshotDir, filename);
    await this.page.screenshot({ path: filepath, fullPage: true });
    console.log(`📸 Layout screenshot: ${filename}`);
    return filepath;
  }

  async checkHeaderFooterOnPage(url, pageName) {
    console.log(`🔍 Checking layout on: ${pageName} (${url})`);
    
    try {
      await this.page.goto(`${this.baseUrl}${url}`, { waitUntil: 'networkidle2' });
      
      // Check for header
      const header = await this.page.$('header, nav, [role="banner"]');
      const headerNavigation = await this.page.$$('header a, nav a');
      const logo = await this.page.$('header img, nav img, [alt*="logo"], [alt*="Safa"]');
      
      // Check for footer
      const footer = await this.page.$('footer, [role="contentinfo"]');
      const footerLinks = await this.page.$$('footer a');
      const footerContact = await this.page.evaluate(() => {
        const footer = document.querySelector('footer');
        if (!footer) return false;
        const text = footer.textContent || '';
        return text.includes('contact') || text.includes('06') || text.includes('@');
      });
      
      // Check main content
      const mainContent = await this.page.$('main, [role="main"]');
      const h1 = await this.page.$('h1');
      const h1Text = h1 ? await this.page.evaluate(el => el.textContent, h1) : null;
      
      // Take screenshot
      await this.takeScreenshot(`${pageName.toLowerCase().replace(/\s+/g, '-')}-layout`);
      
      const result = {
        page: pageName,
        url: url,
        header: {
          present: !!header,
          hasNavigation: headerNavigation.length > 0,
          navigationCount: headerNavigation.length,
          hasLogo: !!logo
        },
        footer: {
          present: !!footer,
          hasLinks: footerLinks.length > 0,
          linkCount: footerLinks.length,
          hasContact: !!footerContact
        },
        content: {
          hasMain: !!mainContent,
          hasH1: !!h1,
          h1Text: h1Text
        }
      };
      
      this.auditResults.headerFooterCheck.push(result);
      
      // Log issues
      if (!header) {
        this.issues.push({
          type: 'Missing Header',
          page: pageName,
          url: url,
          severity: 'high'
        });
        console.log(`❌ Missing header on ${pageName}`);
      }
      
      if (!footer) {
        this.issues.push({
          type: 'Missing Footer',
          page: pageName,
          url: url,
          severity: 'high'
        });
        console.log(`❌ Missing footer on ${pageName}`);
      }
      
      if (headerNavigation.length === 0) {
        this.issues.push({
          type: 'Missing Navigation',
          page: pageName,
          url: url,
          severity: 'critical'
        });
        console.log(`❌ Missing navigation on ${pageName}`);
      }
      
      console.log(`  📊 Header: ${result.header.present ? '✅' : '❌'} | Footer: ${result.footer.present ? '✅' : '❌'} | Nav: ${result.header.navigationCount} links`);
      
      return result;
      
    } catch (error) {
      console.log(`❌ Error checking ${pageName}: ${error.message}`);
      this.issues.push({
        type: 'Page Load Error',
        page: pageName,
        url: url,
        message: error.message,
        severity: 'critical'
      });
      return null;
    }
  }

  async auditAllPages() {
    console.log('🏗️ Starting Comprehensive Layout Audit...\n');
    
    // Define all expected pages
    const expectedPages = [
      // Main pages
      { name: 'Homepage', url: '/' },
      { name: 'About', url: '/about' },
      { name: 'Contact', url: '/contact' },
      { name: 'Booking', url: '/rendez-vous' },
      
      // Blog
      { name: 'Blog', url: '/blog' },
      
      // Specialties
      { name: 'Violence Conjugale', url: '/specialites/violence-conjugale' },
      { name: 'Psychotraumatologie', url: '/specialites/psychotraumatologie' },
      { name: 'Thérapie Adolescents', url: '/specialites/therapie-adolescents' },
      { name: 'Accompagnement Adultes', url: '/specialites/accompagnement-adultes' },
      { name: 'Souffrance au Travail', url: '/specialites/souffrance-travail' },
      
      // City pages
      { name: 'Rosny-sous-Bois', url: '/secteur/rosny-sous-bois' },
      { name: 'Montreuil', url: '/secteur/montreuil' },
      { name: 'Bondy', url: '/secteur/bondy' },
      { name: 'Bagnolet', url: '/secteur/bagnolet' },
      { name: 'Noisy-le-Sec', url: '/secteur/noisy-le-sec' },
      
      // Consultation modalities
      { name: 'Cabinet Consultation', url: '/modalites/consultation-cabinet' },
      { name: 'Home Consultation', url: '/modalites/consultation-domicile' },
      { name: 'Distance Consultation', url: '/modalites/suivi-distance' },
      { name: 'Group Therapy', url: '/modalites/therapie-groupe' }
    ];

    // Check each page
    for (const pageInfo of expectedPages) {
      await this.checkHeaderFooterOnPage(pageInfo.url, pageInfo.name);
    }
  }

  async checkNavigationConsistency() {
    console.log('\n🧭 Checking Navigation Consistency...');
    
    // Test from homepage
    await this.page.goto(`${this.baseUrl}/`, { waitUntil: 'networkidle2' });
    
    // Get all navigation links
    const navLinks = await this.page.$$eval('nav a, header a', links => 
      links.map(link => ({
        text: link.textContent.trim(),
        href: link.getAttribute('href'),
        isExternal: link.getAttribute('href')?.startsWith('http')
      }))
    );
    
    console.log(`📊 Found ${navLinks.length} navigation links:`);
    navLinks.forEach(link => {
      if (!link.isExternal) {
        console.log(`  🔗 "${link.text}" → ${link.href}`);
      }
    });
    
    // Test navigation links
    let workingLinks = 0;
    let brokenLinks = 0;
    
    for (const link of navLinks.filter(l => !l.isExternal && l.href)) {
      try {
        const response = await this.page.goto(`${this.baseUrl}${link.href}`, { 
          waitUntil: 'networkidle2',
          timeout: 10000 
        });
        
        if (response.status() === 200) {
          workingLinks++;
          console.log(`  ✅ ${link.href} - Working`);
        } else {
          brokenLinks++;
          console.log(`  ❌ ${link.href} - Status ${response.status()}`);
          this.issues.push({
            type: 'Broken Navigation Link',
            link: link.href,
            text: link.text,
            status: response.status(),
            severity: 'high'
          });
        }
      } catch (error) {
        brokenLinks++;
        console.log(`  ❌ ${link.href} - Error: ${error.message}`);
        this.issues.push({
          type: 'Navigation Link Error',
          link: link.href,
          text: link.text,
          message: error.message,
          severity: 'high'
        });
      }
    }
    
    this.auditResults.navigationConsistency = {
      totalLinks: navLinks.length,
      workingLinks,
      brokenLinks,
      allLinks: navLinks
    };
    
    console.log(`📊 Navigation Summary: ${workingLinks} working, ${brokenLinks} broken`);
  }

  async generateLayoutReport() {
    const report = {
      auditDate: new Date().toISOString(),
      baseUrl: this.baseUrl,
      summary: {
        totalPages: this.auditResults.headerFooterCheck.length,
        pagesWithHeader: this.auditResults.headerFooterCheck.filter(p => p.header.present).length,
        pagesWithFooter: this.auditResults.headerFooterCheck.filter(p => p.footer.present).length,
        pagesWithNavigation: this.auditResults.headerFooterCheck.filter(p => p.header.navigationCount > 0).length,
        totalIssues: this.issues.length,
        criticalIssues: this.issues.filter(i => i.severity === 'critical').length,
        highIssues: this.issues.filter(i => i.severity === 'high').length
      },
      issues: this.issues,
      auditResults: this.auditResults,
      recommendations: []
    };

    // Generate recommendations
    const pagesWithoutHeader = this.auditResults.headerFooterCheck.filter(p => !p.header.present);
    const pagesWithoutFooter = this.auditResults.headerFooterCheck.filter(p => !p.footer.present);
    
    if (pagesWithoutHeader.length > 0) {
      report.recommendations.push({
        type: 'Missing Headers',
        priority: 'High',
        description: `${pagesWithoutHeader.length} pages missing headers`,
        pages: pagesWithoutHeader.map(p => p.page),
        action: 'Add Layout component wrapper to ensure header appears on all pages'
      });
    }
    
    if (pagesWithoutFooter.length > 0) {
      report.recommendations.push({
        type: 'Missing Footers',
        priority: 'High', 
        description: `${pagesWithoutFooter.length} pages missing footers`,
        pages: pagesWithoutFooter.map(p => p.page),
        action: 'Add Layout component wrapper to ensure footer appears on all pages'
      });
    }

    // Save report
    const reportPath = path.join(__dirname, '..', 'LAYOUT_AUDIT_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📋 Layout Audit Report Generated');
    console.log(`📁 Screenshots saved to: ${this.screenshotDir}`);
    console.log(`📄 Report saved to: ${reportPath}`);
    console.log(`🐛 Total issues found: ${this.issues.length}`);
    console.log(`📊 Pages audited: ${this.auditResults.headerFooterCheck.length}`);
    
    return report;
  }

  async runFullAudit() {
    try {
      await this.init();
      await this.auditAllPages();
      await this.checkNavigationConsistency();
      const report = await this.generateLayoutReport();
      await this.browser.close();
      
      console.log('\n🏁 Layout Audit Complete!');
      return report;
      
    } catch (error) {
      console.error('💥 Layout audit failed:', error);
      if (this.browser) {
        await this.browser.close();
      }
      throw error;
    }
  }
}

// Run audit if called directly
if (require.main === module) {
  const auditor = new LayoutAuditor();
  auditor.runFullAudit().catch(console.error);
}

module.exports = LayoutAuditor;