import { Locator, Page } from '@playwright/test';
export class PaymentPage {
  payments: Locator;
  transfer_receiver: Locator;
  form_account_to: Locator;
  form_amount: Locator;
  wykonaj_przelew: Locator;
  close_button: Locator;
  show_messages: Locator;

  constructor(private page: Page) {
    this.payments = this.page.getByRole('link', { name: 'płatności' });

    this.transfer_receiver = this.page.getByTestId('transfer_receiver');
    this.form_account_to = this.page.getByTestId('form_account_to');
    this.form_amount = this.page.getByTestId('form_amount');
    this.wykonaj_przelew = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.close_button = this.page.getByTestId('close-button');
    this.show_messages = this.page.locator('#show_messages');
  }
}

/*
 await page.getByTestId('transfer_receiver').fill(transferReceiver);
    await page.getByTestId('form_account_to').fill(transferAccount);
    await page.getByTestId('form_amount').click();

    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    */
