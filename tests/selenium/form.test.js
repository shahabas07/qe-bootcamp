const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const chrome = require('selenium-webdriver/chrome');

// Configure Chrome options
const chromeOptions = new chrome.Options();
// chromeOptions.addArguments('--headless');
// chromeOptions.addArguments('--no-sandbox');
// chromeOptions.addArguments('--disable-dev-shm-usage');

describe('Form Submission Tests (Parallel)', function() {
  this.timeout(20000);

  it('should submit text form successfully', submitTextForm);
  it('should verify form elements exist', verifyFormElements); // Changed from validation test
});

async function submitTextForm() {
  let driver;
  const testId = Math.floor(Math.random() * 1000);
  
  try {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
    
    // Fill form fields
    await driver.findElement(By.name('my-text')).sendKeys(`Test User ${testId}`);
    await driver.findElement(By.name('my-password')).sendKeys(`Pass${testId}`);
    await driver.findElement(By.name('my-textarea')).sendKeys(`Parallel test ${testId}`);
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Verify submission
    await driver.wait(until.urlContains('?'), 5000);
    const message = await driver.wait(until.elementLocated(By.id('message')), 5000);
    const messageText = await message.getText();

    expect(messageText).to.include('Received!');

    // Save screenshot
    const screenshotDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(
      path.join(screenshotDir, `form-success-${testId}.png`), 
      screenshot, 
      'base64'
    );

    console.log(`✅ Form submission test ${testId} completed successfully`);
  } catch (error) {
    console.error(`❌ Form submission test ${testId} failed:`, error.message);
    throw error;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

async function verifyFormElements() {
  let driver;
  const testId = Math.floor(Math.random() * 1000);
  
  try {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
    
    // Verify all form elements exist
    const textInput = await driver.findElement(By.name('my-text'));
    const passwordInput = await driver.findElement(By.name('my-password'));
    const textarea = await driver.findElement(By.name('my-textarea'));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    
    expect(await textInput.isDisplayed()).to.be.true;
    expect(await passwordInput.isDisplayed()).to.be.true;
    expect(await textarea.isDisplayed()).to.be.true;
    expect(await submitButton.isDisplayed()).to.be.true;

    // Save screenshot
    const screenshotDir = path.join(__dirname, 'screenshots');
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(
      path.join(screenshotDir, `form-elements-${testId}.png`), 
      screenshot, 
      'base64'
    );

    console.log(`✅ Form elements verification test ${testId} completed successfully`);
  } catch (error) {
    console.error(`❌ Form elements verification test ${testId} failed:`, error.message);
    throw error;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}