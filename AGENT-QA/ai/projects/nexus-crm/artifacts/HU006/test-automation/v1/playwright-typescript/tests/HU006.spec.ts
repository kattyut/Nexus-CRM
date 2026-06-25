import { test, expect } from '../fixtures/companies.fixture';
import { companyData } from '../test-data/HU006.data';

const runE2E = process.env.RUN_E2E === 'true';

test.describe('HU006 - Administrar empresas', () => {
  test.beforeEach(() => {
    test.skip(!runE2E, 'Pendiente BASE_URL, COMPANIES_PATH, login helper, catalogos y selectores reales.');
  });

  test('TC-HU006-001 - Acceso a administrar empresas', async ({ companiesPage }) => {
    await companiesPage.goto();
    await companiesPage.expectLoaded();
  });

  test('TC-HU006-002 - Crear empresa', async ({ companiesPage, page }) => {
    await companiesPage.goto();
    await companiesPage.createCompany(companyData.name);
    await expect(page.getByText(/creada|guardada|exitos/i).first()).toBeVisible();
  });

  test('TC-HU006-003 - Editar empresa', async ({ companiesPage, page }) => {
    await companiesPage.goto();
    await companiesPage.searchCompany(process.env.EXISTING_COMPANY_NAME ?? companyData.name);
    await page.getByRole('button', { name: /editar/i }).click();
    await page.getByLabel(/nombre/i).fill(companyData.updatedName);
    await page.getByRole('button', { name: /guardar/i }).click();
    await expect(page.getByText(/actualizada|guardada|exitos/i).first()).toBeVisible();
  });

  test('TC-HU006-004 - Desactivar empresa', async ({ companiesPage, page }) => {
    await companiesPage.goto();
    await companiesPage.searchCompany(process.env.EXISTING_COMPANY_NAME ?? companyData.name);
    await page.getByRole('button', { name: /desactivar|inactivar/i }).click();
    await expect(page.getByText(/desactivada|inactiva/i).first()).toBeVisible();
  });

  test('TC-HU006-005 - Consultar empresa', async ({ companiesPage }) => {
    await companiesPage.goto();
    await companiesPage.searchCompany(process.env.EXISTING_COMPANY_NAME ?? companyData.name);
  });

  test('TC-HU006-006 - Validar campos obligatorios', async ({ companiesPage, page }) => {
    await companiesPage.goto();
    await page.getByRole('button', { name: /crear|nueva|agregar/i }).click();
    await page.getByRole('button', { name: /guardar|crear/i }).click();
    await companiesPage.expectValidation();
  });

  test('TC-HU006-007 - Configurar Sin seguimiento', async ({ page }) => {
    test.skip(!process.env.FOLLOW_UP_CONFIG_PATH, 'Requiere ruta de parametros de seguimiento.');
    await page.goto(process.env.FOLLOW_UP_CONFIG_PATH);
    await page.getByLabel(/sin seguimiento|dias|días/i).fill(process.env.NO_FOLLOW_UP_DAYS ?? '30');
    await page.getByRole('button', { name: /guardar/i }).click();
    await expect(page.getByText(/guardado|sin seguimiento|30/i).first()).toBeVisible();
  });

  test('TC-HU006-008 - Marcar empresa Prioritaria', async ({ companiesPage, page }) => {
    await companiesPage.goto();
    await companiesPage.searchCompany(process.env.EXISTING_COMPANY_NAME ?? companyData.name);
    await page.getByLabel(/prioritaria|prioridad/i).check();
    await page.getByRole('button', { name: /guardar/i }).click();
    await expect(page.getByText(/prioritaria|guardada|exitos/i).first()).toBeVisible();
  });

  test('TC-HU006-009 - Bloquear usuario sin permiso', async ({ companiesPage }) => {
    test.skip(!process.env.NON_AUTHORIZED_COMPANY_SESSION, 'Requiere sesion sin permiso para empresas.');
    await companiesPage.goto();
    await companiesPage.expectPermissionDenied();
  });
});
