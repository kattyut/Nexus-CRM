import { expect, type Page } from '@playwright/test';

export class RoleAssignmentPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto(process.env.ROLE_ASSIGNMENT_PATH ?? '/usuarios/roles');
  }

  async expectLoaded() {
    await expect(this.page.getByText(/asignar|roles|usuarios/i).first()).toBeVisible();
  }

  async selectUser(email: string) {
    await this.page.getByPlaceholder(/buscar|filtrar/i).fill(email);
    await this.page.getByText(email).first().click();
  }

  async assignRole(role: string) {
    await this.page.getByLabel(/rol/i).selectOption({ label: role });
    await this.page.getByRole('button', { name: /guardar|asignar|actualizar/i }).click();
  }

  async expectSaved() {
    await expect(this.page.getByText(/guardado|actualizado|asignado|exitos/i).first()).toBeVisible();
  }

  async expectValidation() {
    await expect(this.page.getByText(/rol requerido|requerido|invalido|inválido/i).first()).toBeVisible();
  }
}
