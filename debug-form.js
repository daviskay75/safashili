const puppeteer = require('puppeteer');

async function testBookingForm() {
  const browser = await puppeteer.launch({ 
    headless: false, // Show browser for debugging
    slowMo: 500 // Slow down for visibility
  });
  
  try {
    const page = await browser.newPage();
    
    // Track failed requests
    const failedRequests = [];
    
    // Enable console logging
    page.on('console', msg => {
      console.log('🔍 BROWSER CONSOLE:', msg.type(), msg.text());
    });
    
    // Enable error logging
    page.on('pageerror', error => {
      console.log('❌ PAGE ERROR:', error.message);
    });
    
    // Enable response logging
    page.on('response', response => {
      if (response.url().includes('/api/')) {
        console.log('📡 API RESPONSE:', response.status(), response.url());
      }
    });
    
    // Enable request logging
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        console.log('📤 API REQUEST:', request.method(), request.url());
      }
    });
    
    // Track failed requests
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        failure: request.failure().errorText
      });
      console.log('❌ REQUEST FAILED:', request.url(), request.failure().errorText);
    });
    
    console.log('🌐 Navigating to booking page...');
    await page.goto('https://safashili.com/rendez-vous', { 
      waitUntil: 'networkidle2' 
    });
    
    console.log('🔄 Looking for form tabs...');
    
    // First, let's see what tabs are available
    const tabs = await page.$$eval('button', buttons => 
      buttons.map(btn => btn.textContent?.trim()).filter(text => text)
    );
    console.log('🔍 Available buttons:', tabs);
    
    // Try to find and click the form tab
    try {
      // Look for tab containing "contact" or "Demande"
      const formTabSelector = 'button:has-text("Demande de contact"), button:has-text("contact"), button:nth-child(2)';
      await page.click('button:nth-child(2)');
      console.log('✅ Clicked form tab');
      await page.waitForTimeout(2000);
    } catch (error) {
      console.log('⚠️ Could not find form tab, proceeding with current form...');
    }
    
    console.log('📝 Filling out form...');
    
    // Check what form fields are available
    const formFields = await page.$$eval('input, textarea, select', elements => 
      elements.map(el => ({ 
        name: el.name, 
        type: el.type, 
        required: el.required,
        id: el.id,
        placeholder: el.placeholder 
      }))
    );
    console.log('📋 Available form fields:', formFields);
    
    // Fill required fields with error handling
    try {
      await page.waitForSelector('input[name="firstName"]', { timeout: 5000 });
      await page.type('input[name="firstName"]', 'Test');
      console.log('✅ Filled firstName');
      
      await page.type('input[name="lastName"]', 'User');
      console.log('✅ Filled lastName');
      
      await page.type('input[name="email"]', 'test@example.com');
      console.log('✅ Filled email');
      
      await page.type('input[name="phone"]', '06 12 34 56 78');
      console.log('✅ Filled phone');
      
      // Fill reason with minimum 20 characters
      await page.type('textarea[name="reasonForConsultation"]', 'This is a test consultation request with more than 20 characters to meet the minimum requirement.');
      console.log('✅ Filled consultation reason');
      
      // Check RGPD consent
      await page.click('input[name="rgpdConsent"]');
      console.log('✅ Checked RGPD consent');
      
    } catch (error) {
      console.log('❌ Error filling form fields:', error.message);
      
      // Let's see what's actually on the page
      const pageContent = await page.content();
      console.log('📄 Page contains form?', pageContent.includes('<form'));
      console.log('📄 Page contains firstName input?', pageContent.includes('name="firstName"'));
    }
    
    console.log('✅ Form filled, checking for submit button...');
    
    // Wait for submit button and check if it's enabled
    const submitButton = await page.waitForSelector('button[type="submit"]');
    const isDisabled = await submitButton.evaluate(el => el.disabled);
    console.log('🔘 Submit button disabled?', isDisabled);
    
    if (isDisabled) {
      console.log('⚠️ Submit button is disabled, checking form validation...');
      
      // Check for validation errors
      const errors = await page.$$eval('.text-red-600, .text-red-500', 
        elements => elements.map(el => el.textContent)
      );
      console.log('🚨 Validation errors found:', errors);
      
      // Check which fields have errors
      const fieldStates = await page.evaluate(() => {
        const form = document.querySelector('form');
        if (!form) return 'No form found';
        
        const inputs = form.querySelectorAll('input, textarea, select');
        const states = {};
        
        inputs.forEach(input => {
          states[input.name] = {
            value: input.value,
            required: input.required,
            valid: input.validity.valid,
            validationMessage: input.validationMessage
          };
        });
        
        return states;
      });
      
      console.log('📋 Field validation states:', JSON.stringify(fieldStates, null, 2));
      return;
    }
    
    console.log('🚀 Attempting to submit form...');
    
    // Get current URL before submission
    const urlBefore = page.url();
    console.log('📍 URL before submit:', urlBefore);
    
    // Click submit button
    await submitButton.click();
    
    // Wait a bit and check what happened
    await page.waitForTimeout(3000);
    
    const urlAfter = page.url();
    console.log('📍 URL after submit:', urlAfter);
    
    if (urlBefore === urlAfter) {
      console.log('✅ Stayed on same page (expected for AJAX form)');
      
      // Check for success/error messages
      const successMessage = await page.$('.border-green-200.bg-green-50');
      const errorMessage = await page.$('.border-red-200.bg-red-50');
      
      if (successMessage) {
        console.log('🎉 SUCCESS MESSAGE FOUND!');
        const successText = await successMessage.textContent();
        console.log('✨ Success message:', successText);
      } else if (errorMessage) {
        console.log('❌ ERROR MESSAGE FOUND');
        const errorText = await errorMessage.textContent();
        console.log('🚨 Error message:', errorText);
      } else {
        console.log('⚠️ No success or error message found');
        
        // Check if form is still visible or if we're back at top
        const scrollPosition = await page.evaluate(() => window.scrollY);
        console.log('📏 Scroll position after submit:', scrollPosition);
        
        if (scrollPosition === 0) {
          console.log('🔝 ISSUE CONFIRMED: Page scrolled to top (form submission failed)');
        }
        
        // Take a screenshot for debugging
        await page.screenshot({ path: 'form-debug.png', fullPage: true });
        console.log('📸 Screenshot saved as form-debug.png');
      }
    } else {
      console.log('🔄 URL changed, possible redirect');
    }
    
    // Final network check
    if (failedRequests.length > 0) {
      console.log('🌐 Failed network requests:', failedRequests);
    }
    
  } catch (error) {
    console.error('💥 Script error:', error);
  } finally {
    await browser.close();
  }
}

testBookingForm();