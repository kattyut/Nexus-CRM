import { test, expect } from '../fixtures/users.fixture';
import { userData } from '../test-data/HU003.data';

const runE2E = process.env.RUN_E2E === 'true';

test.describe('HU003 - Administrar usuarios', () => {
  test.beforeEach(() => {
    test.skip(!runE2E, 'Pendiente BASE_URL, USERS_PATH, login helper y selectores reales.');
  });

  test('TC-HU003-001 - Acceso Gerencia', async ({ usersPage }) => {
    await usersPage.goto();
    await usersPage.expectLoaded();
  });

  test('TC-HU003-002 - Crear usuario', async ({ usersPage, page }) => {
    await usersPage.goto();
    await usersPage.createUser(userData.name, userData.email);
    await expect(page.getByText(/creado|guardado|exitos/i).first()).toBeVisible();
  });

  test('TC-HU003-003 - Consultar usuario', async ({ usersPage }) => {
    await usersPage.goto();
    await usersPage.searchUser(process.env.EXISTING_USER_EMAIL ?? userData.email);
  });

  test('TC-HU003-004 - Editar usuario', async ({ usersPage, page }) => {
    await usersPage.goto();
    await usersPage.searchUser(process.env.EXISTING_USER_EMAIL ?? userData.email);
    await page.getByRole('button', { name: /editar/i }).first().click();
    await page.getByLabel(/nombre/i).fill(userData.updatedName);
    await page.getByRole('button', { name: /guardar/i }).click();
    await expect(page.getByText(/actualizado|guardado|exitos/i).first()).toBeVisible();
  });

  test('TC-HU003-005 - Desactivar usuario', async ({ usersPage, page }) => {
    await usersPage.goto();
    await usersPage.searchUser(process.env.EXISTING_USER_EMAIL ?? userData.email);
    await page.getByRole('button', { name: /desactivar|inactivar/i }).click();
    await expect(page.getByText(/desactivado|inactivo/i).first()).toBeVisible();
  });

  test('TC-HU003-006 - Activar usuario', async ({ usersPage, page }) => {
    await usersPage.goto();
    await usersPage.searchUser(process.env.INACTIVE_USER_EMAIL ?? userData.email);
    await page.getByRole('button', { name: /activar/i }).click();
    await expect(page.getByText(/activado|activo/i).first()).toBeVisible();
  });

  test('TC-HU003-007 - Validar datos obligatorios', async ({ usersPage, page }) => {
    await usersPage.goto();
    await page.getByRole('button', { name: /crear|nuevo|agregar/i }).click();
    await page.getByRole('button', { name: /guardar|crear/i }).click();
    await usersPage.expectValidation();
  });

  test('TC-HU003-008 - Bloquear Comercial/Analista', async ({ usersPage }) => {
    test.skip(!process.env.NON_ADMIN_SESSION, 'Requiere sesion de usuario Comercial o Analista.');
    await usersPage.goto();
    await usersPage.expectPermissionDenied();
  });

  test('TC-HU003-009 - Trazabilidad de cambio', async ({ usersPage, page }) => {
    test.skip(!process.env.AUDIT_PATH, 'Auditoria pendiente de confirmacion.');
    await usersPage.goto();
    await page.goto(process.env.AUDIT_PATH);
    await expect(page.getByText(/usuario|cambio|auditoria|auditoría/i).first()).toBeVisible();
  });
});
