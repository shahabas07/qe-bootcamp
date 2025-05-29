const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

describe('Google Page Test', function() {
  let driver;
  
  // Set timeout to 15 seconds
  this.timeout(15000);

  before(async function() {
    // Initialize Chrome WebDriver
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
  });

  it('should load Google homepage and take screenshot', async function() {
    try {
      await driver.get('https://www.google.com');
      
      // Wait for page to load - we'll just verify URL contains google.com
      await driver.wait(until.urlContains('google.com'), 5000);
      
      // Handle cookie popup if it appears (with more reliable selectors)
      try {
        const rejectButton = await driver.wait(until.elementLocated(
          By.xpath('//button[contains(., "Reject all") or contains(., "Decline all")]')), 
          3000
        );
        await rejectButton.click();
        console.log('Cookie popup handled');
      } catch (error) {
        console.log('No cookie consent popup found');
      }
      
      const dir = path.join(__dirname, 'screenshots');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Take and save screenshot
      const screenshotPath = path.join(dir, 'google-homepage.png');
      const image = await driver.takeScreenshot();
      fs.writeFileSync(screenshotPath, image, 'base64');
      console.log(`Screenshot saved to: ${screenshotPath}`);
      
      // More reliable verification that page loaded
      const pageTitle = await driver.getTitle();
      console.log(`Page title: "${pageTitle}"`);
      
      if (!pageTitle.includes('Google')) {
        throw new Error('Page title does not contain "Google"');
      }
      
      console.log('Google page loaded successfully');
      
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  after(async function() {
    await driver.quit();
  });
});