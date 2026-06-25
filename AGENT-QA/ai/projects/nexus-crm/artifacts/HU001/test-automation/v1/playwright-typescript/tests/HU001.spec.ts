import { test, expect } from '../fixtures/auth.fixture';
import { protectedPath, users } from '../test-data/HU001.data';

const runE2E = process.env.RUN_E2E === 'true';

test.describe('HU001 - Gestionar autenticacion de usuarios', () => {
  test.beforeEach(() => {
    test.skip(!runE2E, 'Pendiente BASE_URL, rutas y selectores reales. Ejecutar con RUN_E2E=true.');
  });

  test('TC-HU001-001 - Login exitoso', async ({ authPage }) => {
    await test.step('Abrir login e ingresar credenciales validas', async () => {
      await authPage.gotoLogin();
      await authPage.fillCredentials(users.gerencia.email, users.gerencia.password);
      await authPage.submitLogin();
    });
    await test.step('Validar sesion activa', async () => {
      await authPage.expectProtectedAccess();
    });
  });

  test('TC-HU001-002 - Acceso segun rol', async ({ authPage, page }) => {
    for (const user of [users.gerencia, users.comercial, users.analista]) {
      await authPage.gotoLogin();
      await authPage.fillCredentials(user.email, user.password);
      await authPage.submitLogin();
      await expect(page.getByText(/nexus crm|dashboard|empresas|contactos/i).first()).toBeVisible();
      await page.context().clearCookies();
    }
  });

  test('TC-HU001-003 - Credenciales invalidas', async ({ authPage, page }) => {
    await authPage.gotoLogin();
    await authPage.fillCredentials(users.invalid.email, users.invalid.password);
    await authPage.submitLogin();
    await expect(page.getByText(/credenciales invalidas|error|no fue posible/i).first()).toBeVisible();
  });

  test('TC-HU001-004 - Campos obligatorios vacios', async ({ authPage, page }) => {
    await authPage.gotoLogin();
    await authPage.submitLogin();
    await expect(page.getByText(/requerido|obligatorio|complete/i).first()).toBeVisible();
  });

  test('TC-HU001-005 - Logout exitoso', async ({ authPage }) => {
    await authPage.gotoLogin();
    await authPage.fillCredentials(users.gerencia.email, users.gerencia.password);
    await authPage.submitLogin();
    await authPage.logout();
    await authPage.expectAuthRequired();
  });

  test('TC-HU001-006 - Acceso directo sin sesion', async ({ authPage, page }) => {
    await page.goto(protectedPath);
    await authPage.expectAuthRequired();
  });

  test('TC-HU001-007 - Sesion expirada', async ({ authPage, page }) => {
    await authPage.gotoLogin();
    await authPage.fillCredentials(users.gerencia.email, users.gerencia.password);
    await authPage.submitLogin();
    await page.context().clearCookies();
    await page.goto(protectedPath);
    await authPage.expectAuthRequired();
  });

  test('TC-HU001-008 - Bloqueo por intentos fallidos', async ({ authPage, page }) => {
    await authPage.gotoLogin();
    for (let attempt = 1; attempt <= 5; attempt += 1) {
      await authPage.fillCredentials(users.gerencia.email, users.invalid.password);
      await authPage.submitLogin();
    }
    await expect(page.getByText(/bloquead|15 minutos|intentos fallidos/i).first()).toBeVisible();
  });
});
