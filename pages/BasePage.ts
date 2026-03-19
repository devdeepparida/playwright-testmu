import { Page, Locator } from '@playwright/test';

/**
 * BasePage – shared utilities inherited by all page objects.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to a relative path under the base URL */
  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /** Wait for network to be idle */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Capture a named screenshot */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  /** Return current page URL */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /** Click a link by its visible text */
  async clickLinkByText(text: string): Promise<void> {
    await this.page.getByRole('link', { name: text }).click();
  }
}
