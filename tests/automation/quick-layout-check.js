/**
 * Quick Layout Check - Header/Footer and Missing Pages
 * Simple audit to identify layout issues
 */

const puppeteer = require('puppeteer');

class QuickLayoutCheck {
  constructor() {
    this.baseUrl = 'http://localhost:3001';
    this.issues = [];
  }

  async init() {
    this.browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: { width: 1920, height: 1080 }
    });
    this.page = await this.browser.newPage();
  }

  async checkPage(url, name) {
    console.log(`🔍 Checking: ${name} (${url})`);
    
    try {
      const response = await this.page.goto(`${this.baseUrl}${url}`, { 
        waitUntil: 'networkidle2',
        timeout: 10000 
      });
      
      if (response.status() !== 200) {
        console.log(`❌ ${name}: Status ${response.status()}`);
        this.issues.push({
          page: name,
          url: url,
          issue: `HTTP ${response.status()}`,
          type: 'missing_page'
        });
        return;
      }
      
      // Check for header
      const hasHeader = await this.page.$('header, nav') !== null;
      const hasNavigation = (await this.page.$$('header a, nav a')).length > 0;
      
      // Check for footer
      const hasFooter = await this.page.$('footer') !== null;
      
      // Check for main content
      const hasH1 = await this.page.$('h1') !== null;
      
      console.log(`  📊 Header: ${hasHeader ? '✅' : '❌'} | Footer: ${hasFooter ? '✅' : '❌'} | H1: ${hasH1 ? '✅' : '❌'} | Nav: ${hasNavigation ? '✅' : '❌'}`);
      
      if (!hasHeader) {
        this.issues.push({
          page: name,
          url: url,
          issue: 'Missing header',
          type: 'layout'
        });
      }
      
      if (!hasFooter) {
        this.issues.push({
          page: name,
          url: url,
          issue: 'Missing footer',
          type: 'layout'
        });
      }
      
      if (!hasNavigation) {
        this.issues.push({
          page: name,
          url: url,
          issue: 'Missing navigation',
          type: 'layout'
        });
      }
      
    } catch (error) {
      console.log(`❌ ${name}: Error - ${error.message}`);
      this.issues.push({
        page: name,
        url: url,
        issue: error.message,
        type: 'error'
      });
    }
  }

  async runQuickCheck() {
    console.log('🚀 Quick Layout Check Starting...\n');
    
    const pages = [
      { name: 'Homepage', url: '/' },
      { name: 'About', url: '/about' },
      { name: 'Contact', url: '/contact' },
      { name: 'Booking', url: '/rendez-vous' },
      { name: 'Blog', url: '/blog' },
      
      // Test the broken links from navigation
      { name: 'Specialites Index', url: '/specialites' },
      { name: 'Modalites Index', url: '/modalites' },
      { name: 'Infos Pratiques', url: '/infos-pratiques' },
      
      // Specialty pages
      { name: 'Violence Conjugale', url: '/specialites/violence-conjugale' },
      { name: 'Psychotraumatologie', url: '/specialites/psychotraumatologie' },
      { name: 'Thérapie Adolescents', url: '/specialites/therapie-adolescents' },
      { name: 'Accompagnement Adultes', url: '/specialites/accompagnement-adultes' },
      { name: 'Souffrance Travail', url: '/specialites/souffrance-travail' },
      
      // Modality pages
      { name: 'Cabinet Consultation', url: '/modalites/consultation-cabinet' },
      { name: 'Home Consultation', url: '/modalites/consultation-domicile' },
      { name: 'Distance Consultation', url: '/modalites/suivi-distance' },
      { name: 'Group Therapy', url: '/modalites/therapie-groupe' },
      
      // City pages
      { name: 'Rosny-sous-Bois', url: '/secteur/rosny-sous-bois' },
      { name: 'Montreuil', url: '/secteur/montreuil' },
      { name: 'Bondy', url: '/secteur/bondy' },
      { name: 'Bagnolet', url: '/secteur/bagnolet' },
      { name: 'Noisy-le-Sec', url: '/secteur/noisy-le-sec' }
    ];

    await this.init();
    
    for (const page of pages) {
      await this.checkPage(page.url, page.name);
    }
    
    await this.browser.close();
    
    console.log('\n📋 SUMMARY:');
    console.log(`Total issues found: ${this.issues.length}`);
    
    const missingPages = this.issues.filter(i => i.type === 'missing_page');
    const layoutIssues = this.issues.filter(i => i.type === 'layout');
    
    if (missingPages.length > 0) {
      console.log('\n❌ MISSING PAGES:');
      missingPages.forEach(issue => {
        console.log(`  • ${issue.page} (${issue.url}) - ${issue.issue}`);
      });
    }
    
    if (layoutIssues.length > 0) {
      console.log('\n🏗️ LAYOUT ISSUES:');
      layoutIssues.forEach(issue => {
        console.log(`  • ${issue.page} (${issue.url}) - ${issue.issue}`);
      });
    }
    
    return {
      totalIssues: this.issues.length,
      missingPages,
      layoutIssues,
      allIssues: this.issues
    };
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new QuickLayoutCheck();
  checker.runQuickCheck().catch(console.error);
}

module.exports = QuickLayoutCheck;