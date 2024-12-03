import { Locator, Page } from '@playwright/test';

export class SideMenuComponent {
  payments: Locator;
  constructor(private page) {
    this.payments = this.page.getByRole('link', { name: 'płatności' });
  }
}
