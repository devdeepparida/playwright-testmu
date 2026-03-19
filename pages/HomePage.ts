import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage – Selenium Playground landing page.
 * Lists all demo links (Simple Form Demo, Drag & Drop Sliders, etc.)
 */
export class HomePage extends BasePage {
  // Locator 1: role-based – page heading
  readonly pageHeading = this.page.getByRole('heading', { name: 'Selenium Playground' });

  // Locator 2: role-based links for each demo
  readonly simpleFormDemoLink = this.page.getByRole('link', { name: 'Simple Form Demo' });
  readonly dragDropSliderLink  = this.page.getByRole('link', { name: 'Drag & Drop Sliders' });
  readonly inputFormSubmitLink = this.page.getByRole('link', { name: 'Input Form Submit' });

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigateTo("https://www.testmuai.com/selenium-playground/");
    await this.waitForPageLoad();
  }

  async goToSimpleFormDemo(): Promise<void> {
    await this.simpleFormDemoLink.click();
    await this.waitForPageLoad();
  }

  async goToDragDropSliders(): Promise<void> {
    await this.dragDropSliderLink.click();
  }

  async goToInputFormSubmit(): Promise<void> {
    await this.inputFormSubmitLink.click();
  }
}
