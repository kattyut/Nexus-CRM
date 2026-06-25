import { test, expect } from '../fixtures/recovery.fixture';
import { recoveryData } from '../test-data/HU002.data';

const runE2E = process.env.RUN_E2E === 'true';

test.describe('HU002 - Recuperar acceso a la cuenta', () => {
  test.beforeEach(() => {
    test.skip(!runE2E, 'Pendiente BASE_URL, correo controlado, OTP y selectores reales. Ejecutar con RUN_E2E=true.');
  });

  test('TC-HU002-001 - Solicitud con correo registrado', async ({ recoveryPage }) => {
    await recoveryPage.goto();
    await recoveryPage.requestRecovery(recoveryData.registeredEmail);
    await recoveryPage.expectGenericConfirmation();
  });

  test('TC-HU002-002 - Solicitud con correo no registrado', async ({ recoveryPage }) => {
    await recoveryPage.goto();
    await recoveryPage.requestRecovery(recoveryData.unknownEmail);
    await recoveryPage.expectGenericConfirmation();
  });

  test('TC-HU002-003 - Restablecimiento con OTP vigente', async ({ recoveryPage }) => {
    await recoveryPage.goto();
    await recoveryPage.requestRecovery(recoveryData.registeredEmail);
    await recoveryPage.submitOtp(recoveryData.validOtp);
    await recoveryPage.setPassword(recoveryData.validPassword);
    await expect(recoveryPage.page.getByText(/restablecido|actualizada|exitos/i).first()).toBeVisible();
  });

  test('TC-HU002-004 - OTP invalido', async ({ recoveryPage }) => {
    await recoveryPage.goto();
    await recoveryPage.requestRecovery(recoveryData.registeredEmail);
    await recoveryPage.submitOtp(recoveryData.invalidOtp);
    await recoveryPage.expectError();
  });

  test('TC-HU002-005 - OTP vencido', async ({ recoveryPage }) => {
    await recoveryPage.goto();
    await recoveryPage.submitOtp(recoveryData.expiredOtp);
    await recoveryPage.expectError();
  });

  test('TC-HU002-006 - OTP reutilizado', async ({ recoveryPage }) => {
    await recoveryPage.goto();
    await recoveryPage.submitOtp(recoveryData.validOtp);
    await recoveryPage.setPassword(recoveryData.validPassword);
    await recoveryPage.goto();
    await recoveryPage.submitOtp(recoveryData.validOtp);
    await recoveryPage.expectError();
  });

  test('TC-HU002-007 - Nueva contrasena invalida', async ({ recoveryPage }) => {
    await recoveryPage.goto();
    await recoveryPage.submitOtp(recoveryData.validOtp);
    await recoveryPage.setPassword(recoveryData.invalidPassword);
    await recoveryPage.expectError();
  });

  test('TC-HU002-008 - Falla en envio de correo', async ({ recoveryPage }) => {
    test.skip(!process.env.SIMULATE_MAIL_ERROR, 'Requiere mock o ambiente con falla controlada de correo.');
    await recoveryPage.goto();
    await recoveryPage.requestRecovery(recoveryData.registeredEmail);
    await recoveryPage.expectError();
  });

  test('TC-HU002-009 - Login con nueva contrasena', async ({ page }) => {
    await page.goto(process.env.LOGIN_PATH ?? '/login');
    await page.getByLabel(/correo|email|usuario/i).fill(recoveryData.registeredEmail);
    await page.getByLabel(/contrasena|password/i).fill(recoveryData.validPassword);
    await page.getByRole('button', { name: /iniciar|ingresar|login/i }).click();
    await expect(page.getByText(/dashboard|nexus crm|empresas/i).first()).toBeVisible();
  });
});
