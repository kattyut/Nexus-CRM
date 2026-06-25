# Automatizacion Playwright TypeScript - HU001

## HU

- Proyecto: Nexus CRM
- HU: HU001 - Gestionar autenticacion de usuarios
- Framework: Playwright TypeScript
- Version de automatizacion: v1

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
RUN_E2E=true BASE_URL=http://localhost:3000 npm test
```

Los tests quedan omitidos por defecto hasta definir `RUN_E2E=true`, `BASE_URL`, rutas y selectores reales.

## Trazabilidad

- HU enriquecida: enrich-us/v2
- Plan de pruebas: test-plan/v1
- Casos de prueba: test-cases/v1

## Pendientes

- Definir `LOGIN_PATH`, `PROTECTED_PATH` y datos reales de usuarios QA.
- Reemplazar selectores por `data-testid` cuando el frontend los exponga.
