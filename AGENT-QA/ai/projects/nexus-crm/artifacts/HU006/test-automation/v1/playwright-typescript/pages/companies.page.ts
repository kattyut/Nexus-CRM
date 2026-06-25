import { expect, type Page } from '@playwright/test';

export class CompaniesPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto(process.env.COMPANIES_PATH ?? '/empresas');
  }

  async expectLoaded() {
    await expect(this.page.getByText(/empresas|administrar empresas/i).first()).toBeVisible();
  }

  async createCompany(name: string) {
    await this.page.getByRole('button', { name: /crear|nueva|agregar/i }).click();
    await this.page.getByLabel(/nombre/i).fill(name);
    await this.page.getByLabel(/sector/i).fill(process.env.COMPANY_SECTOR ?? 'Tecnologia');
    await this.page.getByLabel(/estado/i).selectOption({ label: process.env.COMPANY_STATE ?? 'Activa' });
    await this.page.getByLabel(/fuente/i).fill(process.env.COMPANY_SOURCE ?? 'Referido');
    await this.page.getByLabel(/responsable/i).fill(process.env.COMPANY_OWNER ?? 'Comercial QA');
    await this.page.getByRole('button', { name: /guardar|crear/i }).click();
  }

  async searchCompany(name: string) {
    await this.page.getByPlaceholder(/buscar|filtrar/i).fill(name);
    await expect(this.page.getByText(name).first()).toBeVisible();
  }

  async expectValidation() {
    await expect(this.page.getByText(/requerido|obligatorio|invalido|inválido/i).first()).toBeVisible();
  }

  async expectPermissionDenied() {
    await expect(this.page.getByText(/permiso insuficiente|no autorizado|acceso denegado/i).first()).toBeVisible();
  }
}
