import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';
export class PulpitPage {
  widget_transfer_receiver: Locator;
  widget_transfer_amount: Locator;
  widget_transfer_title: Locator;

  wykonaj_button: Locator;
  close_button: Locator;

  widget_topup_receiver: Locator;
  widget_topup_amount: Locator;
  uniform_widget_topup_agreement_span: Locator;

  doladuj_telefon: Locator;
  show_messages: Locator;
  money_value: Locator;
  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {
    this.widget_transfer_receiver = page.locator('#widget_1_transfer_receiver');
    this.widget_transfer_amount = page.locator('#widget_1_transfer_amount');
    this.widget_transfer_title = page.locator('#widget_1_transfer_title');

    this.wykonaj_button = page.getByRole('button', { name: 'wykonaj' });
    this.close_button = page.getByTestId('close-button');
    this.widget_topup_receiver = page.locator('#widget_1_topup_receiver');
    this.widget_topup_amount = page.locator('#widget_1_topup_amount');
    this.uniform_widget_topup_agreement_span = page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.doladuj_telefon = page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.show_messages = page.locator('#show_messages');
    this.money_value = page.locator('#money_value');
    this.sideMenuComponent = new SideMenuComponent(this.page);
  }
}
