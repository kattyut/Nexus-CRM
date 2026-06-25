import { expect, type Page } from '@playwright/test';

export class RecoveryPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto(process.env.RECOVERY_PATH ?? '/login/recuperar-acceso');
  }

  async requestRecovery(email: string) {
    await this.page.getByLabel(/correo|email/i).fill(email);
    await this.page.getByRole('button', { name: /recuperar|enviar|solicitar/i }).click();
  }

  async submitOtp(otp: string) {
    await this.page.getByLabel(/otp|codigo|código/i).fill(otp);
    await this.page.getByRole('button', { name: /validar|continuar|confirmar/i }).click();
  }

  async setPassword(password: string) {
    await this.page.getByLabel(/nueva contrasena|nueva contraseña|password/i).fill(password);
    await this.page.getByRole('button', { name: /guardar|restablecer|confirmar/i }).click();
  }

  async expectGenericConfirmation() {
    await expect(this.page.getByText(/solicitud|correo|instrucciones|confirmacion|confirmación/i).first()).toBeVisible();
  }

  async expectError() {
    await expect(this.page.getByText(/error|invalido|inválido|vencido|no pudo/i).first()).toBeVisible();
  }
}
