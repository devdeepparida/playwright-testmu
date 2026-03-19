import { test, expect }                        from '../fixtures/pageFixtures';
import { captureScreenshot, FORM_DATA }        from '../utils/helpers';

/**
 * Test Scenario 3 – Input Form Submit
 * Uses page fixtures: homePage, inputFormPage
 */

test.describe('Scenario 3: Input Form Submit', () => {

  test('should show validation error on empty submit, then succeed on full submit', async ({
    page,
    homePage,
    inputFormPage,
  }) => {
    // Step 1: Open Selenium Playground and go to Input Form Submit
    await homePage.open();
    await expect(homePage.pageHeading).toBeVisible();

    await homePage.goToInputFormSubmit();
    await page.waitForLoadState('networkidle');
    await captureScreenshot(page, 'scenario3-form-page');

    // Step 2: Click Submit without filling anything
    await inputFormPage.clickSubmitEmpty();
    await captureScreenshot(page, 'scenario3-empty-submit');

    // Step 3: Assert "Please fill in the fields" error message
    const nameRequired = await inputFormPage.nameInput.evaluate(
      (el) => (el as any).validationMessage
    );
    if (nameRequired) {
      console.log(`HTML5 validation message: "${nameRequired}"`);
      expect(nameRequired.length).toBeGreaterThan(0);
    } else {
      const errorText = await inputFormPage.getErrorMessageText();
      console.log(`Error message: "${errorText}"`);
      expect(errorText.toLowerCase()).toContain('please fill in the fields');
    }
    console.log('Validation error assertion passed!');

    // Step 4 & 5: Fill all fields including "United States" from Country dropdown
    await inputFormPage.fillForm(FORM_DATA);
    await captureScreenshot(page, 'scenario3-form-filled');

    // Step 6: Submit the form
    await inputFormPage.submitForm();
    await captureScreenshot(page, 'scenario3-after-submit');

    // Step 7: Assert success message
    const successText = await inputFormPage.getSuccessMessageText();
    console.log(`Success message: "${successText}"`);
    expect(successText.trim()).toContain(
      'Thanks for contacting us, we will get back to you shortly.'
    );
    console.log('Success message assertion passed!');

    await captureScreenshot(page, 'scenario3-final');
  });
});
