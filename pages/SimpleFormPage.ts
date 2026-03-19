import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SimpleFormPage extends BasePage {

  readonly messageInput: Locator ;

  readonly getCheckedValueBtn: Locator ;

  readonly yourMessageText: Locator ;

  constructor(page: Page) {
    super(page);
    this.messageInput = this.page.getByRole('textbox', { name: 'Please enter your Message' });
    this.getCheckedValueBtn =this.page.getByRole('button', { name: 'Get Checked Value' });
    this.yourMessageText = this.page.locator('#message');
  }

  /**
   * Enter a message in the single input and click "Get Checked Value".
   * @param message - string to type
   */
  async enterMessageAndSubmit(message: string): Promise<void> {
    await this.messageInput.click();
    await this.messageInput.fill(message);
    await this.getCheckedValueBtn.click();
  }

  /**
   * Returns the text currently shown in the "Your Message:" panel.
   */
  async getDisplayedMessage(): Promise<string> {
    return (await this.yourMessageText.textContent()) ?? '';
  }
}
