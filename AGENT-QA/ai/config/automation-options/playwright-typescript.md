# PLAYWRIGHT TYPESCRIPT RULES

## Framework

Playwright + TypeScript

---

# Objetivo

Generar automatizacion moderna, mantenible, escalable y desacoplada para aplicaciones web y APIs utilizando Playwright con TypeScript.

---

# Casos ideales

Este framework es ideal para:

- pruebas E2E
- automatizacion web
- frontend moderno
- CI/CD
- smoke testing
- regression testing
- validaciones cross-browser

---

# Compatibilidad

## Browsers soportados

- Chromium
- Firefox
- WebKit

---

## Tipos de aplicacion

- Web SPA
- React
- Angular
- Vue
- APIs REST
- Microfrontends

---

# Estructura obligatoria

automation/

- tests/
- tests/ui/
- tests/api/
- tests/e2e/
- pages/
- fixtures/
- reports/
- utils/
- README.md
- metadata.json

---

# Niveles de generacion soportados

| Nivel | Estructura |
|---|---|
| basico | package.json + playwright.config.ts + tests + fixtures + README |
| intermedio | basico + pages + reports + Page Object Model |
| avanzado | intermedio + utils + metadata completa + validacion de contrato API |

---

# Reglas obligatorias

## Tests

SIEMPRE:

- usar test.describe
- usar test.beforeEach cuando aplique
- usar async/await
- usar assertions Playwright
- mantener tests independientes
- mantener trazabilidad con HU y test cases

---

## Assertions

Usar:

- expect(locator).toBeVisible()
- expect(page).toHaveURL()
- expect(locator).toContainText()

Evitar assertions genericas innecesarias.

---

## Selectores

Priorizar:

1. data-testid
2. role
3. text
4. css

Evitar:

- xpath innecesario
- selectores fragiles
- indices dinamicos

---

# Page Objects

## Obligatorio para UI y E2E

Las paginas deben:

- encapsular selectores
- encapsular acciones
- evitar logica duplicada
- mantener nombres descriptivos
- exponer metodos orientados a negocio, por ejemplo `createCompany(data)`

---

# Naming conventions

## Tests

Formato:

{story_id}.spec.ts

Ejemplos:

- MCA-1.spec.ts
- HU001.spec.ts

---

## Pages

Formato:

{module}.page.ts

Ejemplos:

- login.page.ts
- checkout.page.ts

---

## Data

Formato:

fixtures/{entity}.json
fixtures/test-data.ts

---

# Datos de prueba

Los datos deben:

- separarse del test
- evitar hardcoded values
- soportar reutilizacion
- permitir multiples ambientes
- diferenciar datos validos e invalidos

---

# Configuracion de ambientes

Soportar:

- DEV
- QA
- UAT
- PROD

Nunca hardcodear URLs.

---

# Evidencias

El framework debe soportar:

- screenshots
- videos
- traces
- logs

---

# Screenshots

Tomar screenshot automatico:

- al fallar
- opcionalmente en pasos criticos

---

# Videos

Permitir grabacion:

- por test
- por suite

---

# Trazabilidad obligatoria

Cada test debe mantener referencia a:

- HU ID
- test case ID
- modulo funcional

---

# Comentarios

Evitar comentarios innecesarios.

El codigo debe ser autoexplicativo.

---

# Reglas de mantenibilidad

SIEMPRE:

- evitar duplicacion
- reutilizar pages
- reutilizar fixtures
- reutilizar utils cuando aporten valor
- separar configuracion
- mantener estructura limpia

---

# Locator Strategy

Aplicar `ai/services/locator-service.md`.

Prioridad:

1. `getByRole()`
2. `getByTestId()`
3. `getByLabel()`
4. locator semantico controlado

Evitar xpath, clases dinamicas, ids autogenerados y sleeps.

---

# Playwright API Testing

Soportar API Testing basado en OpenAPI/Swagger mediante `ai/services/api-analysis-service.md`.

Para API:

- usar `request` de `@playwright/test`;
- importar payloads desde `fixtures/`;
- validar status code;
- validar cuerpo de respuesta con assertions claras;
- validar contratos derivados del analisis OpenAPI/Swagger;
- cubrir casos positivos `200`, `201`, `204`;
- cubrir casos negativos `400`, `401`, `403`, `404`, `409`, `500` cuando el contrato lo soporte;
- registrar contratos o endpoints pendientes cuando no esten documentados.

---

# Reglas QA

La automatizacion debe validar:

- happy paths
- escenarios negativos
- validaciones funcionales
- reglas de negocio criticas

---

# Flujo obligatorio de generacion

## PASO 1 - Leer contexto

Leer:

- business-context
- test-plan
- test-cases
- metadata HU

---

## PASO 2 - Resolver nivel

Resolver:

- basico
- intermedio
- avanzado
- playwright-ui
- playwright-api
- playwright-e2e

Para `playwright-api`, resolver tambien:

- contrato OpenAPI/Swagger fuente;
- endpoints cubiertos;
- codigos HTTP esperados;
- validaciones de schema;
- estrategia negativa.

---

## PASO 3 - Resolver estructura

Generar estructura segun nivel.

---

## PASO 4 - Generar tests

Generar:

- describe
- beforeEach
- assertions
- navegacion
- validaciones

---

## PASO 5 - Generar Page Objects

Si aplica:

- pages
- methods
- locators

---

## PASO 6 - Persistencia

Delegar a:

- artifact-service
- versioning-service
- summary-service
- logging-service

---

# Persistencia esperada

projects/{project_slug}/artifacts/{story_id}/test-automation/

---

# Versionamiento esperado

test-automation/

- v1
- v2
- v3

Cada version debe incluir:

- codigo generado
- metadata.json
- strategy utilizada
- framework utilizado
- timestamp
- summary

---

# Resultado esperado

Generar automatizacion:

- mantenible
- reutilizable
- desacoplada
- lista para evolucion
- consistente con QA real
- compatible con CI/CD
