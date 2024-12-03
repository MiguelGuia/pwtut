import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';
export class PaymentPage {
  transfer_receiver: Locator;
  form_account_to: Locator;
  form_amount: Locator;
  wykonaj_przelew: Locator;
  close_button: Locator;
  show_messages: Locator;
  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {
    this.transfer_receiver = this.page.getByTestId('transfer_receiver');
    this.form_account_to = this.page.getByTestId('form_account_to');
    this.form_amount = this.page.getByTestId('form_amount');
    this.wykonaj_przelew = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.close_button = this.page.getByTestId('close-button');
    this.show_messages = this.page.locator('#show_messages');
    this.sideMenuComponent = new SideMenuComponent(this.page);
  }
}
