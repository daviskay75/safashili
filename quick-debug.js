const puppeteer = require('puppeteer');

async function quickFormTest() {
  const browser = await puppeteer.launch({ 
    headless: false,
    slowMo: 100 // Faster
  });
  
  try {
    const page = await browser.newPage();
    
    // Track errors and API calls
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ CONSOLE ERROR:', msg.text());
      }
    });
    
    page.on('response', response => {
      if (response.url().includes('/api/contact')) {
        console.log('📡 CONTACT API:', response.status(), response.statusText());
      }
    });
    
    page.on('request', request => {
      if (request.url().includes('/api/contact')) {
        console.log('📤 CONTACT REQUEST:', request.method());
        const postData = request.postData();
        if (postData) {
          console.log('📝 POST DATA:', postData.substring(0, 200) + '...');
        }
      }
    });
    
    console.log('🌐 Loading page...');
    await page.goto('https://safashili.com/rendez-vous', { waitUntil: 'domcontentloaded' });
    
    console.log('🔄 Clicking form tab...');
    await page.click('button:nth-child(2)'); // "Demande de contact"
    await page.waitForSelector('form', { timeout: 5000 });
    
    console.log('📝 Quick form fill...');
    await page.type('input[name="firstName"]', 'Test', { delay: 10 });
    await page.type('input[name="lastName"]', 'User', { delay: 10 });
    await page.type('input[name="email"]', 'test@example.com', { delay: 10 });
    await page.type('input[name="phone"]', '06 12 34 56 78', { delay: 10 });
    await page.type('textarea[name="reasonForConsultation"]', 'This is a test consultation request with more than twenty characters.', { delay: 10 });
    await page.click('input[name="rgpdConsent"]');
    
    console.log('🔘 Checking submit button...');
    const submitBtn = await page.$('button[type="submit"]');
    const isDisabled = await submitBtn.evaluate(el => el.disabled);
    console.log('Submit button disabled?', isDisabled);
    
    if (isDisabled) {
      // Check for validation errors
      const errors = await page.$$eval('.text-red-600, .text-red-500, .text-red-700', 
        els => els.map(el => el.textContent.trim()).filter(text => text)
      );
      console.log('🚨 Validation errors:', errors);
      return;
    }
    
    console.log('🚀 Submitting form...');
    const urlBefore = page.url();
    const scrollBefore = await page.evaluate(() => window.scrollY);
    
    // Submit and track what happens
    await submitBtn.click();
    
    // Wait for response
    await page.waitForSelector('body', { timeout: 3000 }).catch(() => {});
    
    const urlAfter = page.url();
    const scrollAfter = await page.evaluate(() => window.scrollY);
    
    console.log('📍 URL before/after:', urlBefore === urlAfter ? 'SAME' : 'CHANGED');
    console.log('📏 Scroll before/after:', scrollBefore, '→', scrollAfter);
    
    // Check for success/error messages
    const successMsg = await page.$('.border-green-200, .bg-green-50');
    const errorMsg = await page.$('.border-red-200, .bg-red-50');
    
    if (successMsg) {
      console.log('🎉 SUCCESS MESSAGE FOUND!');
    } else if (errorMsg) {
      const errorText = await errorMsg.evaluate(el => el.textContent);
      console.log('❌ ERROR MESSAGE:', errorText);
    } else if (scrollAfter === 0 && scrollBefore > 0) {
      console.log('🔝 CONFIRMED: Form submission failed - scrolled to top');
      
      // Check browser console for errors
      console.log('🔍 Checking for client-side errors...');
    } else {
      console.log('❓ Unknown state - no clear success/error indication');
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
  } finally {
    await browser.close();
  }
}

quickFormTest();