# CYPRESS RULES

## Framework

Cypress

---

# Objetivo

Generar automatización frontend rápida, mantenible y desacoplada utilizando Cypress.

---

# Casos ideales

Este framework es ideal para:

- frontend testing
- component testing
- smoke testing
- regression testing
- aplicaciones SPA
- pruebas rápidas UI

---

# Compatibilidad

## Navegadores soportados

- Chrome
- Edge
- Electron
- Firefox

---

## Tipos de aplicación

- React
- Angular
- Vue
- aplicaciones SPA
- frontend moderno

---

# Estructura obligatoria

automation/

- cypress/
  - e2e/
  - pages/
  - fixtures/
  - support/
  - utils/
  - config/
  - evidence/

---

# Niveles soportados

| Nivel | Estructura |
|---|---|
| básico | e2e + fixtures |
| intermedio | pages + support + e2e |
| avanzado | environments + config + pages + support + e2e |

---

# Reglas obligatorias

## Tests

SIEMPRE:

- usar describe
- usar beforeEach cuando aplique
- mantener tests independientes
- mantener trazabilidad con HU y test cases
- reutilizar comandos

---

## Assertions

Usar assertions explícitas.

Ejemplos:

- cy.url().should()
- cy.contains().should()
- cy.get().should()

---

# Selectores

Priorizar:

1. data-testid
2. data-cy
3. role
4. text
5. css

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
- mantener responsabilidad única

---

# Naming conventions

## Tests

Formato:

{story_id}.cy.js

Ejemplos:

- MCA-1.cy.js
- HU001.cy.js

---

## Pages

Formato:

{module}.page.js

Ejemplos:

- login.page.js
- checkout.page.js

---

## Fixtures

Formato:

{story_id}.json

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

# Reglas de mantenibilidad

SIEMPRE:

- evitar duplicación
- reutilizar pages
- reutilizar comandos
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
- navegación
- assertions
- validaciones

---

## PASO 5 — Generar Pages y Support

Si aplica:

- pages
- custom commands
- support utils

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
- framework utilizado
- nivel utilizado
- timestamp
- summary

---

# Resultado esperado

Generar automatización:

- mantenible
- reutilizable
- desacoplada
- alineada con QA real
- preparada para CI/CD
- lista para evolución