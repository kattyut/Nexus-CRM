import { expect, type Page } from '@playwright/test';

export class UsersPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto(process.env.USERS_PATH ?? '/usuarios');
  }

  async expectLoaded() {
    await expect(this.page.getByText(/usuarios|administrar usuarios/i).first()).toBeVisible();
  }

  async createUser(name: string, email: string) {
    await this.page.getByRole('button', { name: /crear|nuevo|agregar/i }).click();
    await this.page.getByLabel(/nombre/i).fill(name);
    await this.page.getByLabel(/correo|email/i).fill(email);
    await this.page.getByRole('button', { name: /guardar|crear/i }).click();
  }

  async searchUser(email: string) {
    await this.page.getByPlaceholder(/buscar|filtrar/i).fill(email);
    await expect(this.page.getByText(email).first()).toBeVisible();
  }

  async expectValidation() {
    await expect(this.page.getByText(/requerido|obligatorio|invalido|inválido/i).first()).toBeVisible();
  }

  async expectPermissionDenied() {
    await expect(this.page.getByText(/permiso insuficiente|no autorizado|acceso denegado/i).first()).toBeVisible();
  }
}
