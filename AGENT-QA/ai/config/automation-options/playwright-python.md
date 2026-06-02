# PLAYWRIGHT PYTHON RULES

## Framework

Playwright + Python

---

# Objetivo

Generar automatización robusta, mantenible y desacoplada utilizando Playwright con Python y Pytest.

---

# Casos ideales

Este framework es ideal para:

- automatización web
- pruebas E2E
- automatización API
- equipos Python
- pipelines CI/CD
- smoke testing
- regression testing

---

# Compatibilidad

## Browsers soportados

- Chromium
- Firefox
- WebKit

---

## Tipos de aplicación

- aplicaciones web
- APIs REST
- microservicios
- aplicaciones híbridas

---

# Estructura obligatoria

automation/

- tests/
- pages/
- fixtures/
- utils/
- config/
- data/
- evidence/

---

# Niveles soportados

| Nivel | Estructura |
|---|---|
| básico | tests + data |
| intermedio | pages + fixtures + tests |
| avanzado | builders + config + environments + fixtures + pages + tests |

---

# Reglas obligatorias

## Tests

SIEMPRE:

- usar pytest
- usar async_playwright cuando aplique
- mantener tests independientes
- usar asserts claros
- mantener trazabilidad con HU y test cases

---

## Assertions

Usar assertions explícitas.

Ejemplos:

- expect(locator).to_be_visible()
- expect(page).to_have_url()
- expect(locator).to_contain_text()

---

# Selectores

Priorizar:

1. data-testid
2. role
3. text
4. css

Evitar:

- xpath innecesario
- selectores frágiles
- selectores dinámicos

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

test_{story_id}.py

Ejemplos:

- test_MCA_1.py
- test_HU001.py

---

## Pages

Formato:

{module}_page.py

Ejemplos:

- login_page.py
- checkout_page.py

---

## Fixtures

Formato:

conftest.py

---

## Data

Formato:

{story_id}_data.json

---

# Datos de prueba

Los datos deben:

- separarse del test
- soportar reutilización
- evitar hardcoded values
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
- traces

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
- reutilizar fixtures
- separar configuración
- mantener estructura limpia

---

# Reglas QA

La automatización debe validar:

- happy paths
- escenarios negativos
- reglas de negocio críticas
- validaciones funcionales

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

- navegación
- validaciones
- assertions
- setup
- teardown cuando aplique

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
- preparada para evolución
- compatible con CI/CD