import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    const paymentPage = new PaymentPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    await paymentPage.payments.click();
  });

  test('simple payment', async ({ page }) => {
    //arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5678 9012 34567';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    //act
    const paymentPage = new PaymentPage(page);

    await paymentPage.transfer_receiver.fill(transferReceiver);
    await paymentPage.form_account_to.fill(transferAccount);
    await paymentPage.form_amount.click();

    await paymentPage.form_amount.fill(transferAmount);
    await paymentPage.wykonaj_przelew.click();
    await paymentPage.close_button.click();

    //assert
    await expect(paymentPage.show_messages).toHaveText(expectedMessage);
  });
});
