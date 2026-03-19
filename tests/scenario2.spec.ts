import { test, expect }     from '../fixtures/pageFixtures';
import { captureScreenshot } from '../utils/helpers';

/**
 * Test Scenario 2 – Drag & Drop Sliders
 * Uses page fixtures: homePage, sliderPage
 */

test.describe('Scenario 2: Drag & Drop Slider', () => {

  test('should drag slider "Default value 15" to 95', async ({
    page,
    homePage,
    sliderPage,
  }) => {
    // Step 1: Open Selenium Playground
    await homePage.open();
    await expect(homePage.pageHeading).toBeVisible();

    // Step 2: Navigate to Drag & Drop Sliders
    await homePage.goToDragDropSliders();
    await page.waitForLoadState('networkidle');

    await expect(sliderPage.pageHeading).toBeVisible();
    await captureScreenshot(page, 'scenario2-slider-page');

    // Step 3: Drag slider "Default value 15" to 95
    const TARGET_VALUE = "95";

    await sliderPage.dragSliderToValue(TARGET_VALUE);
    await captureScreenshot(page, 'scenario2-after-drag');

    // Step 4: Validate slider value shows 95
    const currentValue = await sliderPage.getSliderCurrentValue(TARGET_VALUE);
    console.log(`Slider value after drag: ${currentValue}`);
    expect(currentValue).toBe(TARGET_VALUE);
    console.log(`Slider value validated: ${currentValue}`);

    await captureScreenshot(page, 'scenario2-final');
  });
});
