# GENERATE TEST AUTOMATION SKILL

## Objetivo

Generar automatizacion QA ejecutable, versionada y trazable a partir de HU enriquecida, plan de pruebas, casos de prueba, summary y contexto del proyecto.

La implementacion inicial funcional es Playwright TypeScript. La arquitectura debe seguir permitiendo nuevos frameworks mediante `strategy-service.md` y `ai/config/automation-options/automation-catalog.json`.

---

# Entradas obligatorias

- Proyecto activo validado por `context-service.md`.
- HU objetivo resuelta por `hu-service.md`.
- HU enriquecida existente.
- Plan de pruebas existente.
- Casos de prueba existentes.
- `summary.json` de la HU cuando exista.
- Framework seleccionado o default resuelto por `strategy-service.md`.
- Catalogo `ai/config/automation-options/automation-catalog.json`.
- Templates del framework en `templates_path`.

Si falta una entrada obligatoria, detener la generacion y registrar bloqueo mediante `logging-service.md`.

---

# Framework default

Usar `default_framework` o `default_framework_id` desde:

```text
ai/config/automation-options/automation-catalog.json
```

El default oficial es:

```text
playwright-typescript
```

No aplicar frameworks fuera del catalogo.

---

# Responsabilidades

Este skill debe:

- leer casos de prueba reales y su metadata;
- leer summary de HU;
- leer contexto de negocio;
- leer `strategy-service.md` y resolver framework;
- identificar tipo de automatizacion: UI, API o E2E;
- consultar `locator-service.md` antes de generar locators;
- consultar `test-data-service.md` antes de generar datos;
- consultar `api-analysis-service.md` cuando exista contrato OpenAPI/Swagger;
- leer `rule_file` del framework seleccionado;
- leer templates desde `templates_path`;
- generar un proyecto Playwright TypeScript ejecutable;
- crear version nueva mediante `versioning-service.md`;
- persistir mediante `artifact-service.md`;
- actualizar `summary.json` mediante `summary-service.md`;
- registrar eventos y errores mediante `logging-service.md`;
- dejar la automatizacion lista para ejecucion controlada por `test-execution-service.md`;
- mantener trazabilidad entre HU, plan, casos y automatizacion.

Este skill NO debe:

- inventar flujos, URLs, endpoints, reglas o validaciones;
- actualizar Azure DevOps, Jira, Planner u otra herramienta sin aprobacion explicita;
- sobrescribir versiones existentes;
- mezclar frameworks en una misma version.

---

# Flujo obligatorio

## PASO 1 - Leer fuentes

Leer la ultima version disponible de:

- `ai/projects/{project_slug}/business-context/business-context.md`
- `ai/projects/{project_slug}/artifacts/{story_id}/enrich-us/vN/`
- `ai/projects/{project_slug}/artifacts/{story_id}/test-plan/vN/`
- `ai/projects/{project_slug}/artifacts/{story_id}/test-cases/vN/`
- `ai/projects/{project_slug}/artifacts/{story_id}/summary.json`

Resolver las versiones fuente usadas y conservarlas en metadata.

## PASO 2 - Resolver framework

Delegar a `strategy-service.md`:

- cargar catalogo de automatizacion;
- validar `default_framework`;
- validar `framework_id`;
- resolver `rule_file`;
- resolver `templates_path`;
- resolver `output_path`.
- resolver capacidades `supports_ui`, `supports_api`, `supports_page_object`, `supports_fixtures`;
- resolver capacidades `api_contract_testing`, `http_validation`, `schema_validation`, `negative_testing`;
- resolver tipo Playwright: `playwright-ui`, `playwright-api` o `playwright-e2e`.

## PASO 2.1 - Identificar tipo de automatizacion

Leer casos de prueba y clasificar:

- `UI`: pasos sobre pantallas, formularios, botones, navegación o validaciones visuales;
- `API`: pasos sobre endpoints, request, response, status code, payload o contrato OpenAPI/Swagger;
- `E2E`: combina preparacion/validacion API con flujo UI.

Si existe contrato OpenAPI/Swagger, delegar analisis a `api-analysis-service.md`. Si el caso menciona API sin contrato suficiente, generar base API solo con placeholders visibles y registrar pendientes.

## PASO 2.2 - Analizar contrato API

Cuando el tipo sea `playwright-api` o `playwright-e2e` y exista contrato:

- leer `openapi.json`, `swagger.json`, `openapi.yaml` o `swagger.yaml`;
- delegar analisis a `api-analysis-service.md`;
- identificar endpoints, metodos HTTP, parametros, headers, autenticacion, payloads, responses y codigos HTTP;
- derivar casos positivos `200`, `201`, `204`;
- derivar casos negativos `400`, `401`, `403`, `404`, `409`, `500`;
- conservar endpoints cubiertos y contrato fuente en metadata.

## PASO 3 - Validar automatizabilidad

Delegar a `validation-service.md`:

- confirmar que existen casos automatizables;
- validar trazabilidad de casos contra HU y plan;
- detectar datos faltantes criticos;
- bloquear si los pasos no permiten generar codigo ejecutable sin inventar informacion.

Cuando falte una URL o selector real, usar placeholders seguros y visibles, por ejemplo `BASE_URL` o selectores por rol/texto derivados literalmente del caso. Registrar el pendiente en metadata y README.

## PASO 3.0 - Decision Gate de automatizacion

Antes de generar codigo Playwright, clasificar los casos de prueba y decidir:

- que casos automatizar;
- que casos dejar manuales;
- prioridad de automatizacion;
- ROI aproximado;
- complejidad de mantenimiento.

La decision debe basarse en:

- criticidad y riesgo del caso;
- repetibilidad;
- estabilidad del flujo;
- disponibilidad de datos de prueba;
- disponibilidad de URL/rutas/selectores/endpoints;
- valor de regresion;
- costo de mantenimiento;
- dependencia de juicio humano;
- evidencia de API/UI/E2E en el caso.

Valores esperados:

| Campo | Valores |
|---|---|
| `automation_recommendation` | `automate`, `manual`, `hybrid`, `not_applicable`, `unknown` |
| `automation_priority` | `high`, `medium`, `low` |
| `roi_estimate` | `high`, `medium`, `low`, `unknown` |
| `maintenance_complexity` | `low`, `medium`, `high`, `unknown` |

Reglas:

- No automatizar casos que requieran informacion inexistente sin dejar placeholders visibles y pendientes.
- No convertir un caso manual en automatizado si depende de juicio humano o validacion subjetiva.
- Automatizar primero casos repetibles, criticos y de alto valor de regresion.
- Registrar justificacion por caso en metadata, README y summary.
- Registrar decisiones en `logging-service.md` con nivel `DECISION`.

## PASO 3.1 - Resolver locators

Delegar a `locator-service.md`:

- priorizar `getByRole()`;
- luego `getByTestId()`;
- luego `getByLabel()`;
- finalmente locator semantico controlado;
- bloquear o registrar pendiente si el selector seria fragil.

Los locators deben vivir en Page Objects, no en el spec.

## PASO 3.2 - Resolver datos de prueba

Delegar a `test-data-service.md`:

- generar datos validos;
- generar datos invalidos cuando el caso lo requiera;
- separar datos en `fixtures/`;
- importar datos desde `fixtures/test-data.ts`;
- evitar valores quemados dentro del spec.

## PASO 4 - Crear version

Delegar a `versioning-service.md` para crear la siguiente version:

```text
ai/projects/{project_slug}/artifacts/{story_id}/test-automation/vN/
```

Dentro de la version, crear una carpeta por framework:

```text
playwright-typescript/
```

Nunca sobrescribir una version existente.

Mantener referencia `latest` sin reemplazar versiones historicas. La referencia debe quedar registrada en `summary.json` y, cuando aplique, en un archivo liviano:

```text
ai/projects/{project_slug}/artifacts/{story_id}/test-automation/latest.json
```

`latest.json` debe apuntar a la ultima version generada y no debe contener codigo duplicado.

## PASO 5 - Generar proyecto Playwright TypeScript

Usar templates desde:

```text
ai/config/automation-templates/playwright-typescript/
```

Generar como minimo:

```text
package.json
playwright.config.ts
tests/{story_id}.spec.ts
pages/{module}.page.ts
fixtures/{entity}.json
fixtures/test-data.ts
utils/
README.md
metadata.json
```

La salida debe poder ejecutarse desde la carpeta `playwright-typescript` con:

```bash
npm install
npx playwright test
```

## PASO 6 - Reglas de codigo

Para Playwright TypeScript:

- usar `@playwright/test`;
- usar `test.describe`;
- usar `test.step` para mapear pasos del caso;
- usar `async/await`;
- usar Page Object para UI y E2E;
- importar fixtures para datos de prueba;
- aplicar locators segun `locator-service.md`;
- evitar `waitForTimeout()` salvo justificacion documentada;
- usar `BASE_URL` desde variable de entorno;
- activar evidencias: trace, screenshot y video en fallos;
- no hardcodear secretos.

Para `playwright-api`:

- usar `request` de `@playwright/test`;
- importar payloads desde `fixtures/`;
- validar status code y cuerpo de respuesta;
- validar contratos derivados por `api-analysis-service.md`;
- generar pruebas bajo `tests/api/`;
- incluir casos positivos y negativos cuando el contrato lo soporte.

## PASO 7 - Metadata

Crear `metadata.json` dentro del proyecto generado con:

```json
{
  "artifact_type": "test-automation",
  "automation_generated": true,
  "framework": "playwright-typescript",
  "framework_name": "Playwright + TypeScript",
  "framework_version": "catalog:1.3.0",
  "automation_type": "playwright-ui",
  "api_tests_generated": false,
  "endpoints_covered": [],
  "contract_validated": false,
  "supports_page_object": true,
  "supports_fixtures": true,
  "automation_recommendation": "hybrid",
  "automation_decisions": [],
  "roi_estimate": "medium",
  "maintenance_complexity": "medium",
  "automation_version": "vN",
  "latest": true,
  "project_slug": "{project_slug}",
  "hu_id": "{story_id}",
  "source_versions": {
    "enrich_us": "vN",
    "test_plan": "vN",
    "test_cases": "vN"
  },
  "generated_at": "{iso_datetime}",
  "generated_by": "generate-test-automation"
}
```

## PASO 8 - Summary

Actualizar:

```text
ai/projects/{project_slug}/artifacts/{story_id}/summary.json
```

Agregar o actualizar:

- `automation_generated`
- `framework`
- `framework_version`
- `automation_type`
- `api_tests_generated`
- `endpoints_covered`
- `contract_validated`
- `api_execution_status`
- `automation_version`
- `execution_status`
- `last_execution`
- `passed_tests`
- `failed_tests`
- `generated_at`
- `artifacts.test_automation.latest_version`
- `artifacts.test_automation.path`
- `artifacts.test_automation.status`
- `artifacts.test_automation.latest_path`
- `automation_recommendation`
- `coverage_summary`
- `decisions`
- `roi_estimate`
- `maintenance_complexity`

## PASO 9 - Logging

Registrar en `ai/projects/{project_slug}/logs/`:

- framework seleccionado;
- templates usados;
- ruta de salida;
- artefactos generados;
- version creada;
- decisiones de automatizacion por caso;
- ROI aproximado;
- complejidad de mantenimiento;
- errores o pendientes;
- tiempo de ejecucion.

---

# Estructura objetivo

```text
ai/projects/{project_slug}/artifacts/{story_id}/test-automation/vN/playwright-typescript/
  package.json
  playwright.config.ts
  tests/
    ui/
      {story_id}.spec.ts
    api/
      {story_id}.api.spec.ts
    e2e/
  pages/
    {module}.page.ts
  fixtures/
    {entity}.json
    test-data.ts
  reports/
  utils/
  README.md
  metadata.json
```

---

# Resultado esperado

El resultado debe ser un proyecto Playwright TypeScript ejecutable, versionado, trazable, auditable y generado unicamente desde artefactos existentes.
