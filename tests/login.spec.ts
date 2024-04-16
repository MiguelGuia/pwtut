import { test, expect } from '@playwright/test';
import { loginData, userId } from '../test-data/login.data';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expectedName = 'Jan Demobankowy';

    //Act
    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(`${expectedName}`);
  });
  test('unsuccessful login with too short username', async ({ page }) => {
    //arrange

    const wrongUserId = 'tester';
    const expectedResult = 'identyfikator ma min. 8 znaków';

    //act
    await page.goto('/');
    await page.getByTestId('login-input').fill(wrongUserId);
    await page.getByTestId('password-input').click();

    //assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      `${expectedResult}`,
    );
  });
  test('unsuccessful login with too short password', async ({ page }) => {
    //arrange

    const userId = loginData.userId;
    const wrongPassword = '1234';
    const expectedResult = 'hasło ma min. 8 znaków';

    //act
    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(wrongPassword);
    await page.getByTestId('password-input').blur();

    //assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      `${expectedResult}`,
    );
  });
});
