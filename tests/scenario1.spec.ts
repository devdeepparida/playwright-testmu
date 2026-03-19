import { test, expect }     from '../fixtures/pageFixtures';
import { captureScreenshot } from '../utils/helpers';

/**
 * Test Scenario 1 – Simple Form Demo
 * Uses page fixtures: homePage, simpleFormPage
 */

const TEST_MESSAGE = 'Welcome to TestMu AI';

test.describe('Scenario 1: Simple Form Demo', () => {

  test('should display correct message in the Your Message panel', async ({
    page,
    homePage,
    simpleFormPage,
  }) => {
    test.slow();
    // Step 1: Open Selenium Playground
    await homePage.open();
    await expect(homePage.pageHeading).toBeVisible();
    await captureScreenshot(page, 'scenario1-home');

    // Step 2: Click "Simple Form Demo"
    await homePage.goToSimpleFormDemo();
    await page.waitForURL("https://www.testmuai.com/selenium-playground/simple-form-demo/")

    // Step 3: Validate URL contains "simple-form-demo"
    expect(page.url()).toContain('simple-form-demo');
    console.log(`URL validated: ${page.url()}`);

    // Step 4 & 5: Enter message and click "Get Checked Value"
    await simpleFormPage.enterMessageAndSubmit(TEST_MESSAGE);
    await captureScreenshot(page, 'scenario1-after-submit');

    // Step 6: Validate displayed message matches the variable
    const displayedMessage = await simpleFormPage.getDisplayedMessage();
    console.log(`Displayed message: "${displayedMessage}"`);
    expect(displayedMessage.trim()).toBe(TEST_MESSAGE);
    console.log('Message assertion passed!');

    await captureScreenshot(page, 'scenario1-final');
  });
});
