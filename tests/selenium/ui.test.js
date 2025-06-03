const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const chrome = require('selenium-webdriver/chrome');

// Configure Chrome options
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
chromeOptions.addArguments('--no-sandbox');
chromeOptions.addArguments('--disable-dev-shm-usage');
chromeOptions.addArguments('--window-size=1920,1080');

// Create directories if they don't exist
const screenshotsDir = path.join(__dirname, 'screenshots');
const reportsDir = path.join(__dirname, 'reports');
[reportsDir, screenshotsDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

describe('UI Element Interaction Test Suite', function() {
  let driver;
  this.timeout(30000); // Increased timeout

  // Store test results for simple reporting
  const testResults = [];

  before(async function() {
    try {
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
    } catch (error) {
      console.error('❌ Failed to initialize WebDriver:', error);
      throw error;
    }
  });

  afterEach(async function() {
    const testCase = this.currentTest;
    const testName = testCase.title;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const status = testCase.state;

    // Capture screenshot on test failure
    if (status === 'failed') {
      try {
        const screenshot = await driver.takeScreenshot();
        const screenshotPath = path.join(screenshotsDir, `FAILED_${testName}_${timestamp}.png`);
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        console.error(`🖼️ Screenshot saved: ${screenshotPath}`);
      } catch (error) {
        console.error('Failed to capture screenshot:', error);
      }
    }

    // Store test results
    testResults.push({
      name: testName,
      status: status || 'unknown',
      duration: testCase.duration,
      error: testCase.err?.message,
      screenshot: status === 'failed' ? `FAILED_${testName}_${timestamp}.png` : undefined
    });
  });

  it('should successfully submit form with all fields', async function() {
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    // Fill text field
    await driver.findElement(By.name('my-text')).sendKeys('Comprehensive UI Test');
    
    // Select dropdown option
    const select = await driver.findElement(By.name('my-select'));
    await select.findElement(By.css('option[value="2"]')).click();
    
    // Check checkbox
    const checkbox = await driver.findElement(By.id('my-check-1'));
    await checkbox.click();
    
    // Fill date field
    await driver.findElement(By.name('my-date')).sendKeys('2024-05-30');
    
    // Submit form
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Verify submission
    await driver.wait(until.urlContains('?'), 5000);
    const message = await driver.wait(until.elementLocated(By.id('message')), 5000);
    const messageText = await message.getText();
    expect(messageText).to.include('Received!');
  });

  it('should fail deliberately to demonstrate reporting', async function() {
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
    throw new Error('This test is designed to fail for demonstration purposes');
  });

  after(async function() {
    try {
      if (driver) {
        await driver.quit();
      }
      
      // Generate simple text report
      const reportPath = path.join(reportsDir, 'test-report.txt');
      const reportContent = testResults.map(result => {
        return `Test: ${result.name}
Status: ${result.status.toUpperCase()}
Duration: ${result.duration}ms
${result.error ? `Error: ${result.error}\n` : ''}${result.screenshot ? `Screenshot: ${result.screenshot}` : ''}
------------------------------------`;
      }).join('\n\n');
      
      fs.writeFileSync(reportPath, reportContent);
      console.log(`📊 Test report saved to: ${reportPath}`);
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  });
});