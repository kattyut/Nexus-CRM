import { expect, type Page } from '@playwright/test';

export class RolesPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto(process.env.ROLES_PATH ?? '/roles');
  }

  async expectLoaded() {
    await expect(this.page.getByText(/roles|permisos|administrar roles/i).first()).toBeVisible();
  }

  async createRole(name: string) {
    await this.page.getByRole('button', { name: /crear|nuevo|agregar/i }).click();
    await this.page.getByLabel(/nombre/i).fill(name);
    await this.page.getByRole('button', { name: /guardar|crear/i }).click();
  }

  async searchRole(name: string) {
    await this.page.getByPlaceholder(/buscar|filtrar/i).fill(name);
    await expect(this.page.getByText(name).first()).toBeVisible();
  }

  async expectValidation() {
    await expect(this.page.getByText(/requerido|obligatorio|duplicado|invalido|inválido/i).first()).toBeVisible();
  }

  async expectPermissionDenied() {
    await expect(this.page.getByText(/permiso insuficiente|no autorizado|acceso denegado/i).first()).toBeVisible();
  }
}
