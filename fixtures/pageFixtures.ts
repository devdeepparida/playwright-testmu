import { test as base, Page } from '@playwright/test';
import { HomePage }       from '../pages/HomePage';
import { SimpleFormPage } from '../pages/SimpleFormPage';
import { SliderPage }     from '../pages/SliderPage';
import { InputFormPage }  from '../pages/InputFormPage';
import { attachConsoleLogger, attachNetworkLogger } from '../utils/helpers';

/**
 * Custom fixture types – each page object is available as a named fixture.
 */
type PageFixtures = {
  homePage:       HomePage;
  simpleFormPage: SimpleFormPage;
  sliderPage:     SliderPage;
  inputFormPage:  InputFormPage;
};

/**
 * Extended `test` with all page object fixtures pre-wired.
 *
 * Usage in specs:
 *   import { test, expect } from '../fixtures/pageFixtures';
 *
 *   test('my test', async ({ homePage, simpleFormPage }) => { ... });
 */
export const test = base.extend<PageFixtures>({
  // ── Attach console & network loggers on every test automatically ──────────
  page: async ({ page }, use) => {
    attachConsoleLogger(page);
    attachNetworkLogger(page);
    await use(page);
  },

  // ── Page object fixtures ──────────────────────────────────────────────────
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  simpleFormPage: async ({ page }, use) => {
    const simpleFormPage = new SimpleFormPage(page);
    await use(simpleFormPage);
  },

  sliderPage: async ({ page }, use) => {
    const sliderPage = new SliderPage(page);
    await use(sliderPage);
  },

  inputFormPage: async ({ page }, use) => {
    const inputFormPage = new InputFormPage(page);
    await use(inputFormPage);
  },
});

export { expect } from '@playwright/test';
