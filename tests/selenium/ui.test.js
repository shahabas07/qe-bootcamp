const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const chrome = require('selenium-webdriver/chrome');

const options = new chrome.Options();
options.addArguments('--headless');
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');

describe('UI Element Interaction Test', function () {
  let driver;
  this.timeout(20000);

  before(async () => {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  it('should interact with dropdown and checkbox', async () => {
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    // Text field
    await driver.findElement(By.name('my-text')).sendKeys('Shahabas UI Test');

    // Dropdown
    const selectElem = await driver.findElement(By.name('my-select'));
    await selectElem.findElement(By.css('option[value="2"]')).click();

    // Checkbox
    const checkbox = await driver.findElement(By.name('my-check'));
    await checkbox.click();

    // Submit
    await driver.findElement(By.tagName('form')).submit();

    // Wait for confirmation
    const message = await driver.wait(until.elementLocated(By.id('message')), 5000);
    const text = await message.getText();
    console.log('✅ Message received:', text);

    // Screenshot
    const screenshot = await driver.takeScreenshot();
    const dir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'ui-interaction.png'), screenshot, 'base64');
    console.log('🖼️ Screenshot saved.');
  });

  after(async () => {
    await driver.quit();
  });
});
