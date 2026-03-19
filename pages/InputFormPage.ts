import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * InputFormPage – "Input Form Submit" page object.
 * Handles form validation, field filling, country selection and success assertion.
 */
export class InputFormPage extends BasePage {
  // Locator 1: role-based – form fields
  readonly nameInput: Locator     = this.page.getByRole('textbox', { name: 'Name' });
  readonly emailInput: Locator    = this.page.getByRole('textbox', { name: 'Email' });
  readonly passwordInput: Locator = this.page.getByRole('textbox', { name: 'Password' });
  readonly companyInput: Locator  = this.page.getByRole('textbox', { name: 'Company' });
  readonly websiteInput: Locator  = this.page.getByRole('textbox', { name: 'Website' });
  readonly cityInput: Locator     = this.page.locator(`//input[@id='inputCity']`);
  readonly address1Input: Locator = this.page.locator(`#inputAddress1`);
  readonly address2Input: Locator = this.page.locator(`#inputAddress2`);
  readonly stateInput: Locator    = this.page.locator(`#inputState`);
  readonly zipInput: Locator      = this.page.locator(`#inputZip`);

  // Locator 2: CSS selector – country dropdown
  readonly countryDropdown: Locator = this.page.locator('select[name="country"]');

  // Locator 3: role-based – submit button
  readonly submitBtn: Locator = this.page.getByRole('button', { name: 'Submit' });

  // Locator 4: CSS selector – success / error message containers
  readonly successMessage: Locator = this.page.locator('.success-msg, #success-message, .alert-success');
  readonly errorMessage: Locator   = this.page.locator('.error-msg, #error-message, .alert-danger, p.error');

  constructor(page: Page) {
    super(page);
  }

  /** Click Submit without filling any fields */
  async clickSubmitEmpty(): Promise<void> {
    await this.submitBtn.click();
  }

  /** Fill all required form fields */
  async fillForm(data: Form_Data): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.companyInput.fill(data.company);
    await this.websiteInput.fill(data.website);
    await this.cityInput.fill(data.city);
    await this.address1Input.fill(data.address1);
    await this.address2Input.fill(data.address2);
    await this.stateInput.fill(data.state);
    await this.zipInput.fill(data.zip);
    // Select country by visible text
    await this.countryDropdown.selectOption({ label: data.country });
  }

  /** Submit the filled form */
  async submitForm(): Promise<void> {
    await this.submitBtn.click();
  }

  /** Get the displayed error message text */
  async getErrorMessageText(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10_000 });
    return (await this.errorMessage.textContent()) ?? '';
  }

  /** Get the displayed success message text */
  async getSuccessMessageText(): Promise<string> {
    await this.successMessage.waitFor({ state: 'visible', timeout: 15_000 });
    return (await this.successMessage.textContent()) ?? '';
  }
}
