import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });
  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.widget_transfer_receiver.selectOption('2');
    await pulpitPage.widget_transfer_amount.fill(transferAmount);
    await pulpitPage.widget_transfer_title.fill(transferTitle);
    await pulpitPage.wykonaj_button.click();
    await pulpitPage.close_button.click();

    //Assert
    await expect(pulpitPage.show_messages).toHaveText(expectedMessage);
  });
  test('Boosting you account balance', async ({ page }) => {
    //arrange
    const topupAmount = '50';
    const expectedNumber = '500 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${expectedNumber}`;

    //act

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.widget_topup_receiver.selectOption('500 xxx xxx');
    await pulpitPage.widget_topup_amount.fill(topupAmount);
    await pulpitPage.uniform_widget_topup_agreement_span.click();
    await pulpitPage.doladuj_telefon.click();
    await pulpitPage.close_button.click();

    //assert
    await expect(pulpitPage.show_messages).toHaveText(expectedMessage);
  });
  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.widget_topup_receiver.selectOption(topUpReceiver);
    await pulpitPage.widget_topup_amount.fill(topUpAmount);
    await pulpitPage.uniform_widget_topup_agreement_span.click();
    await pulpitPage.doladuj_telefon.click();
    await pulpitPage.close_button.click();

    // Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
