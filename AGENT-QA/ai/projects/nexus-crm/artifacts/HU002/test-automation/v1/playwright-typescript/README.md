# Automatizacion Playwright TypeScript - HU002

## HU

- Proyecto: Nexus CRM
- HU: HU002 - Recuperar acceso a la cuenta
- Framework: Playwright TypeScript
- Version de automatizacion: v1

## Ejecucion

```bash
npm install
RUN_E2E=true BASE_URL=http://localhost:3000 npm test
```

## Trazabilidad

- HU enriquecida: enrich-us/v2
- Plan de pruebas: test-plan/v1
- Casos de prueba: test-cases/v1

## Pendientes

- Definir `RECOVERY_PATH`, inbox controlado, OTP validos/vencidos y mock de falla de correo.
