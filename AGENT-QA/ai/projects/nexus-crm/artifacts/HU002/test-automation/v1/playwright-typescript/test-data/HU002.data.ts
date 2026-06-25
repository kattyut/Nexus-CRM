export const recoveryData = {
  registeredEmail: process.env.RECOVERY_REGISTERED_EMAIL ?? 'usuario.registrado@example.com',
  unknownEmail: 'correo.no.registrado@example.com',
  validOtp: process.env.RECOVERY_VALID_OTP ?? '123456',
  invalidOtp: '000000',
  expiredOtp: process.env.RECOVERY_EXPIRED_OTP ?? '999999',
  validPassword: process.env.RECOVERY_NEW_PASSWORD ?? 'ChangeMe123!',
  invalidPassword: '123'
};
