import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/');
  });
  test('successful login with correct credentials @login', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedName = 'Jan Demobankowy';

    //Act

    await loginPage.login(userId, userPassword);

    //Assert
    await expect(loginPage.user_name).toHaveText(`${expectedName}`);
  });

  test('unsuccessful login with too short username @login', async ({
    page,
  }) => {
    //arrange

    const incorrectUserId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    //act

    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();

    //assert
    await expect(loginPage.loginError).toHaveText(`${expectedErrorMessage}`);
  });
  test('unsuccessful login with too short password @login', async ({
    page,
  }) => {
    //arrange

    const userId = loginData.userId;
    const incorrectPassword = '1234';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //act

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectPassword);
    await loginPage.passwordInput.blur(); //blur symuluje klikniecie w dowolne inne miejsce, uruchamia walidacje

    //assert
    await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
  });
});
