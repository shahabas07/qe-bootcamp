const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

// Configure Chrome options
const options = new chrome.Options();
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');
// options.addArguments('--headless'); // Uncomment for headless mode

// Configure test to work with both direct execution and Mocha
async function runLoginTest() {
  let driver;
  
  try {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    // Using demo login page
    const loginUrl = 'https://the-internet.herokuapp.com/login';
    await driver.get(loginUrl);

    // Fill in login form
    await driver.findElement(By.id('username')).sendKeys('tomsmith');
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for login success
    await driver.wait(until.urlContains('/secure'), 5000);
    await driver.wait(until.elementLocated(By.css('.flash.success')), 5000);

    // Create screenshots directory
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Take and save screenshot
    const screenshotPath = path.join(screenshotsDir, 'login_success.png');
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(screenshotPath, screenshot, 'base64');

    console.log(`✅ Login automation completed successfully. Screenshot saved to: ${screenshotPath}`);
    
    // Verify login by checking success message
    const successMessage = await driver.findElement(By.css('.flash.success')).getText();
    console.log(`Success message: "${successMessage.trim()}"`);

    return true;
  } catch (err) {
    console.error('❌ Login automation failed:', err.message);
    
    // Save screenshot on error
    if (driver) {
      const screenshotPath = path.join(screenshotsDir, 'login_error.png');
      const screenshot = await driver.takeScreenshot();
      fs.writeFileSync(screenshotPath, screenshot, 'base64');
      console.log(`Error screenshot saved to: ${screenshotPath}`);
    }
    
    return false;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

// Handle both direct execution and Mocha test
if (require.main === module) {
  // Run directly with Node
  (async () => {
    const success = await runLoginTest();
    process.exit(success ? 0 : 1);
  })();
} else {
  // Export for Mocha
  describe('Login Test', function() {
    this.timeout(10000);
    
    it('should login successfully', async function() {
      const success = await runLoginTest();
      if (!success) throw new Error('Login failed');
    });
  });
}