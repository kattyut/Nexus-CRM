# Automatizacion Playwright TypeScript - HU005

## HU

- Proyecto: Nexus CRM
- HU: HU005 - Asignar/restringir roles
- Framework: Playwright TypeScript
- Version de automatizacion: v1

## Ejecucion

```bash
npm install
RUN_E2E=true BASE_URL=http://localhost:3000 npm test
```

## Trazabilidad

- HU enriquecida: enrich-us/v1
- Plan de pruebas: test-plan/v1
- Casos de prueba: test-cases/v1

## Pendientes

- Definir `ROLE_ASSIGNMENT_PATH`, matriz de permisos, ruta de verificacion de restricciones y regla de sesion activa.
