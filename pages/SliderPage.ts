import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * SliderPage – "Drag & Drop Sliders" page object.
 */
export class SliderPage extends BasePage {
  // Locator 1: heading
  readonly pageHeading: Locator = this.page.getByRole('heading', { name: 'Slider Demo' });

  constructor(page: Page) {
    super(page);
  }

  /**
   * Returns the slider INPUT element whose label matches the given default value text.
   * Locator 2: XPath relative to label text
   * @param labelText e.g. "Default value 15"
   */
  getSliderByLabel(labelText: string): Locator {
    // Locator 2: CSS – find the range input that follows the matching label span
    return this.page.locator(`input[type="range"][value="15"]`);
  }

  

  /**
   * Drags a slider to a target value using JS evaluation for precision.
   * @param labelText  – label of the slider, e.g. "Default value 15"
   * @param targetValue – desired numeric value, e.g. 95
   */
  async dragSliderToValue(targetValue: string): Promise<void> {
    await this.page.locator('#slider3').getByRole('slider').fill(targetValue);
  }

  /**
   * Returns the current numeric value shown for a given slider label.
   */
  async getSliderCurrentValue(labelText: string): Promise<string> {
    const valueEl = this.page.locator(`//output[@id='rangeSuccess']`).innerText()
  
    return valueEl;
  }
}
