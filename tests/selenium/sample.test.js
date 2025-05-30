const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

describe('Login Functionality Test', function () {
  let driver;
  this.timeout(20000);

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('should log in with valid credentials', async () => {
    await driver.get('https://the-internet.herokuapp.com/login');
    
    await driver.findElement(By.id('username')).sendKeys('tomsmith');
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const message = await driver.wait(
      until.elementLocated(By.css('.flash.success')),
      5000
    );

    const text = await message.getText();
    expect(text).to.include('You logged into a secure area!');

    // Screenshot
    const screenshot = await driver.takeScreenshot();
    const dir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFileSync(path.join(dir, 'login-success.png'), screenshot, 'base64');

    console.log('✅ Login test passed and screenshot saved.');
  });

  after(async () => {
    await driver.quit();
  });
});
