# PLAYWRIGHT TYPESCRIPT RULES

## Framework

Playwright + TypeScript

---

# Objetivo

Generar automatización moderna, mantenible, escalable y desacoplada para aplicaciones web y APIs utilizando Playwright con TypeScript.

---

# Casos ideales

Este framework es ideal para:

- pruebas E2E
- automatización web
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

## Tipos de aplicación

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
- pages/
- fixtures/
- utils/
- config/
- test-data/
- evidence/

---

# Niveles de generación soportados

| Nivel | Estructura |
|---|---|
| básico | tests + test-data |
| intermedio | pages + fixtures + tests |
| avanzado | builders + config + environments + fixtures + pages + tests |

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

Evitar assertions genéricas innecesarias.

---

## Selectores

Priorizar:

1. data-testid
2. role
3. text
4. css

Evitar:

- xpath innecesario
- selectores frágiles
- índices dinámicos

---

# Page Objects

## Obligatorio en nivel intermedio y avanzado

Las páginas deben:

- encapsular selectores
- encapsular acciones
- evitar lógica duplicada
- mantener nombres descriptivos

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

## Fixtures

Formato:

{feature}.fixture.ts

---

## Data

Formato:

{story_id}.data.ts

---

# Datos de prueba

Los datos deben:

- separarse del test
- evitar hardcoded values
- soportar reutilización
- permitir múltiples ambientes

---

# Configuración de ambientes

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

Tomar screenshot automático:

- al fallar
- opcionalmente en pasos críticos

---

# Videos

Permitir grabación:

- por test
- por suite

---

# Trazabilidad obligatoria

Cada test debe mantener referencia a:

- HU ID
- test case ID
- módulo funcional

---

# Comentarios

Evitar comentarios innecesarios.

El código debe ser autoexplicativo.

---

# Reglas de mantenibilidad

SIEMPRE:

- evitar duplicación
- reutilizar pages
- reutilizar fixtures
- separar configuración
- mantener estructura limpia

---

# Reglas QA

La automatización debe validar:

- happy paths
- escenarios negativos
- validaciones funcionales
- reglas de negocio críticas

---

# Flujo obligatorio de generación

## PASO 1 — Leer contexto

Leer:

- business-context
- test-plan
- test-cases
- metadata HU

---

## PASO 2 — Resolver nivel

Resolver:

- básico
- intermedio
- avanzado

---

## PASO 3 — Resolver estructura

Generar estructura según nivel.

---

## PASO 4 — Generar tests

Generar:

- describe
- beforeEach
- assertions
- navegación
- validaciones

---

## PASO 5 — Generar Page Objects

Si aplica:

- pages
- methods
- locators

---

## PASO 6 — Persistencia

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

Cada versión debe incluir:

- código generado
- metadata.json
- strategy utilizada
- framework utilizado
- timestamp
- summary

---

# Resultado esperado

Generar automatización:

- mantenible
- reutilizable
- desacoplada
- lista para evolución
- consistente con QA real
- compatible con CI/CD