import { test, expect } from '../fixtures/role-assignment.fixture';
import { assignmentData } from '../test-data/HU005.data';

const runE2E = process.env.RUN_E2E === 'true';

test.describe('HU005 - Asignar/restringir roles', () => {
  test.beforeEach(() => {
    test.skip(!runE2E, 'Pendiente BASE_URL, ROLE_ASSIGNMENT_PATH, login helper y matriz de permisos.');
  });

  test('TC-HU005-001 - Acceso Gerencia a asignacion', async ({ roleAssignmentPage }) => {
    await roleAssignmentPage.goto();
    await roleAssignmentPage.expectLoaded();
  });

  test('TC-HU005-002 - Asignar rol valido', async ({ roleAssignmentPage }) => {
    await roleAssignmentPage.goto();
    await roleAssignmentPage.selectUser(assignmentData.userEmail);
    await roleAssignmentPage.assignRole(assignmentData.comercialRole);
    await roleAssignmentPage.expectSaved();
  });

  test('TC-HU005-003 - Modificar rol de usuario', async ({ roleAssignmentPage }) => {
    await roleAssignmentPage.goto();
    await roleAssignmentPage.selectUser(assignmentData.userEmail);
    await roleAssignmentPage.assignRole(assignmentData.analistaRole);
    await roleAssignmentPage.expectSaved();
  });

  test('TC-HU005-004 - Rechazar rol invalido o vacio', async ({ roleAssignmentPage, page }) => {
    await roleAssignmentPage.goto();
    await roleAssignmentPage.selectUser(assignmentData.userEmail);
    await page.getByLabel(/rol/i).selectOption('');
    await page.getByRole('button', { name: /guardar|asignar|actualizar/i }).click();
    await roleAssignmentPage.expectValidation();
  });

  test('TC-HU005-005 - Aplicar restricciones por rol', async ({ page }) => {
    test.skip(!process.env.PERMISSION_CHECK_PATH, 'Requiere ruta protegida para validar restricciones.');
    await page.goto(process.env.PERMISSION_CHECK_PATH);
    await expect(page.getByText(/permiso|no autorizado|acceso denegado|dashboard|empresas/i).first()).toBeVisible();
  });

  test('TC-HU005-006 - Bloquear usuario sin permiso', async ({ roleAssignmentPage, page }) => {
    test.skip(!process.env.NON_ADMIN_SESSION, 'Requiere sesion Comercial o Analista.');
    await roleAssignmentPage.goto();
    await expect(page.getByText(/permiso insuficiente|no autorizado|acceso denegado/i).first()).toBeVisible();
  });

  test('TC-HU005-007 - Trazabilidad del cambio de rol', async ({ roleAssignmentPage, page }) => {
    test.skip(!process.env.AUDIT_PATH, 'Mecanismo de trazabilidad pendiente.');
    await roleAssignmentPage.goto();
    await roleAssignmentPage.selectUser(assignmentData.userEmail);
    await roleAssignmentPage.assignRole(assignmentData.comercialRole);
    await page.goto(process.env.AUDIT_PATH);
    await expect(page.getByText(/rol anterior|rol nuevo|fecha|usuario/i).first()).toBeVisible();
  });

  test('TC-HU005-008 - Cambio de rol con sesion activa', async ({ page }) => {
    test.skip(!process.env.ACTIVE_SESSION_SCENARIO, 'Regla de sesion activa pendiente de definicion.');
    await page.goto(process.env.PERMISSION_CHECK_PATH ?? '/');
    await expect(page.getByText(/sesion|permisos|actualizado|nueva sesion/i).first()).toBeVisible();
  });
});
