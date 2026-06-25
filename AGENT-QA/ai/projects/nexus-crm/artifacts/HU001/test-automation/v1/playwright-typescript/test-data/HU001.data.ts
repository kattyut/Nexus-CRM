export const users = {
  gerencia: {
    email: process.env.GERENCIA_USER ?? 'gerencia.qa@example.com',
    password: process.env.GERENCIA_PASSWORD ?? 'ChangeMe123!'
  },
  comercial: {
    email: process.env.COMERCIAL_USER ?? 'comercial.qa@example.com',
    password: process.env.COMERCIAL_PASSWORD ?? 'ChangeMe123!'
  },
  analista: {
    email: process.env.ANALISTA_USER ?? 'analista.qa@example.com',
    password: process.env.ANALISTA_PASSWORD ?? 'ChangeMe123!'
  },
  invalid: {
    email: 'usuario.invalido@example.com',
    password: 'wrong-password'
  }
};

export const protectedPath = process.env.PROTECTED_PATH ?? '/dashboard';
