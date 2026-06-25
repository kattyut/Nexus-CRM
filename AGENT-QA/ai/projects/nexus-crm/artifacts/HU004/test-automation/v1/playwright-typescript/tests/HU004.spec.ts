import { test, expect } from '../fixtures/roles.fixture';
import { roleData } from '../test-data/HU004.data';

const runE2E = process.env.RUN_E2E === 'true';

test.describe('HU004 - Administrar roles', () => {
  test.beforeEach(() => {
    test.skip(!runE2E, 'Pendiente BASE_URL, ROLES_PATH, login helper y matriz de permisos.');
  });

  test('TC-HU004-001 - Acceso Gerencia a roles', async ({ rolesPage }) => {
    await rolesPage.goto();
    await rolesPage.expectLoaded();
  });

  test('TC-HU004-002 - Crear rol', async ({ rolesPage, page }) => {
    await rolesPage.goto();
    await rolesPage.createRole(roleData.roleName);
    await expect(page.getByText(/creado|guardado|exitos/i).first()).toBeVisible();
  });

  test('TC-HU004-003 - Editar rol', async ({ rolesPage, page }) => {
    await rolesPage.goto();
    await rolesPage.searchRole(process.env.EXISTING_ROLE_NAME ?? roleData.roleName);
    await page.getByRole('button', { name: /editar/i }).click();
    await page.getByLabel(/nombre/i).fill(roleData.updatedRoleName);
    await page.getByRole('button', { name: /guardar/i }).click();
    await expect(page.getByText(/actualizado|guardado|exitos/i).first()).toBeVisible();
  });

  test('TC-HU004-004 - Configurar permisos', async ({ rolesPage, page }) => {
    await rolesPage.goto();
    await rolesPage.searchRole(process.env.EXISTING_ROLE_NAME ?? roleData.roleName);
    await page.getByText(/permiso|permisos/i).first().click();
    await page.getByRole('checkbox').first().check();
    await page.getByRole('button', { name: /guardar/i }).click();
    await expect(page.getByText(/guardado|permisos actualizados|exitos/i).first()).toBeVisible();
  });

  test('TC-HU004-005 - Consultar roles', async ({ rolesPage }) => {
    await rolesPage.goto();
    await rolesPage.searchRole(process.env.EXISTING_ROLE_NAME ?? roleData.baseRole);
  });

  test('TC-HU004-006 - Validar datos obligatorios', async ({ rolesPage, page }) => {
    await rolesPage.goto();
    await page.getByRole('button', { name: /crear|nuevo|agregar/i }).click();
    await page.getByRole('button', { name: /guardar|crear/i }).click();
    await rolesPage.expectValidation();
  });

  test('TC-HU004-007 - Bloquear Comercial/Analista', async ({ rolesPage }) => {
    test.skip(!process.env.NON_ADMIN_SESSION, 'Requiere sesion Comercial o Analista.');
    await rolesPage.goto();
    await rolesPage.expectPermissionDenied();
  });

  test('TC-HU004-008 - Desactivar rol', async ({ rolesPage, page }) => {
    await rolesPage.goto();
    await rolesPage.searchRole(process.env.DEACTIVATABLE_ROLE_NAME ?? roleData.roleName);
    await page.getByRole('button', { name: /desactivar|inactivar/i }).click();
    await expect(page.getByText(/desactivado|inactivo|no permitido/i).first()).toBeVisible();
  });

  test('TC-HU004-009 - Rol base o rol en uso', async ({ rolesPage, page }) => {
    await rolesPage.goto();
    await rolesPage.searchRole(roleData.baseRole);
    await page.getByRole('button', { name: /desactivar|editar/i }).first().click();
    await expect(page.getByText(/no permitido|rol base|en uso|restriccion|restricción/i).first()).toBeVisible();
  });
});
