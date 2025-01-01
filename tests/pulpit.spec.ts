import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    pulpitPage = new PulpitPage(page);

    await page.goto('/');
    loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });
  test(
    'quick payment with correct data @pulpit @integration',
    {
      tag: ['@payment', '@integration'],
      annotation: {
        type: 'documentation',
        description: 'https://jaktestowac.pl/course/playwright-wprowadzenie/',
      },
    },
    async ({ page }) => {
      //Arrange
      const transferAmount = '150';
      const transferTitle = 'pizza';
      const expectedTransferReceiver = 'Chuck Demobankowy';
      const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

      //Act

      await pulpitPage.executeQuickPayment(transferAmount, transferTitle);

      //Assert
      await expect(pulpitPage.show_messages).toHaveText(expectedMessage);
    },
  );
  test('Boosting you account balance @pulpit @integration', async ({
    page,
  }) => {
    //arrange
    const topupAmount = '50';
    const topUpReceiver = '500 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topUpReceiver}`;

    //act
    await pulpitPage.executeMobileTopUp(topUpReceiver, topupAmount);

    //assert
    await expect(pulpitPage.show_messages).toHaveText(expectedMessage);
  });
  test('correct balance after successful mobile top-up @pulpit @integration', async ({
    page,
  }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);

    // Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
