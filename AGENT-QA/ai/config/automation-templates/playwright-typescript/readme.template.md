# Automatizacion Playwright TypeScript - {{story_id}}

## HU

- Proyecto: {{project_name}}
- HU: {{story_id}} - {{story_title}}
- Framework: Playwright TypeScript
- Version de automatizacion: {{automation_version}}

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npx playwright test
```

## Estructura

```text
tests/
tests/ui/
tests/api/
tests/e2e/
pages/
fixtures/
reports/
utils/
```

## Variables

Definir `BASE_URL` para apuntar al ambiente correspondiente. No guardar secretos en este proyecto.

## Locators

Los Page Objects deben aplicar la prioridad definida en `ai/services/locator-service.md`: `getByRole()`, `getByTestId()`, `getByLabel()` y locator semantico controlado.

## Datos de prueba

Los tests deben importar datos desde `fixtures/` segun `ai/services/test-data-service.md`. No quemar datos sensibles ni valores fijos dentro del spec.

## API Testing

Cuando la automatizacion se genere desde OpenAPI/Swagger, debe registrar el contrato analizado, endpoints cubiertos, codigos HTTP esperados y validaciones de contrato. El analisis fuente pertenece a `ai/services/api-analysis-service.md`.

## Trazabilidad

Esta automatizacion fue generada desde:

- HU enriquecida: {{enriched_version}}
- Plan de pruebas: {{test_plan_version}}
- Casos de prueba: {{test_cases_version}}
