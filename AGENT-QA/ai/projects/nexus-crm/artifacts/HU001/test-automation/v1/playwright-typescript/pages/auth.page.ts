import { expect, type Locator, type Page } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly loginForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginForm = page.getByRole('form').first().or(page.getByTestId('login-form'));
  }

  async gotoLogin() {
    await this.page.goto(process.env.LOGIN_PATH ?? '/login');
  }

  async fillCredentials(email: string, password: string) {
    await this.page.getByLabel(/correo|email|usuario/i).fill(email);
    await this.page.getByLabel(/contrasena|password/i).fill(password);
  }

  async submitLogin() {
    await this.page.getByRole('button', { name: /iniciar|ingresar|login/i }).click();
  }

  async logout() {
    await this.page.getByRole('button', { name: /cerrar sesion|logout|salir/i }).click();
  }

  async expectProtectedAccess() {
    await expect(this.page.getByText(/dashboard|empresas|contactos|nexus crm/i).first()).toBeVisible();
  }

  async expectAuthRequired() {
    await expect(this.page.getByText(/iniciar sesion|autenticacion|credenciales/i).first()).toBeVisible();
  }
}
