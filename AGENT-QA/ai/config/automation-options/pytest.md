# PYTEST API RULES

## Framework

Pytest + Requests

---

# Objetivo

Generar automatización API mantenible, desacoplada y reutilizable utilizando Pytest para validación de servicios REST.

---

# Casos ideales

Este framework es ideal para:

- APIs REST
- microservicios
- backend testing
- contract testing
- smoke testing API
- regression API
- validación de integración

---

# Compatibilidad

## Protocolos soportados

- HTTP
- HTTPS
- REST

---

## Tipos de aplicación

- APIs REST
- microservicios
- backends distribuidos
- arquitecturas orientadas a servicios

---

# Estructura obligatoria

automation/

- tests/
- helpers/
- fixtures/
- builders/
- config/
- data/
- evidence/

---

# Niveles soportados

| Nivel | Estructura |
|---|---|
| básico | tests + data |
| intermedio | helpers + fixtures + tests |
| avanzado | builders + config + environments + helpers + fixtures + tests |

---

# Reglas obligatorias

## Tests

SIEMPRE:

- usar pytest
- usar requests
- mantener tests independientes
- validar status codes
- validar response body
- validar contratos cuando aplique
- mantener trazabilidad con HU y test cases

---

## Assertions

Usar assertions explícitas.

Ejemplos:

- assert response.status_code == 200
- assert response.json()["success"] is True
- assert "token" in response.json()

---

# API Client

## Obligatorio en nivel intermedio y avanzado

Debe existir:

helpers/api_client.py

Responsabilidades:

- centralizar requests
- centralizar headers
- centralizar autenticación
- evitar duplicación

---

# Builders

## Obligatorio en nivel avanzado

Los builders deben:

- generar payloads
- reutilizar estructuras
- soportar múltiples escenarios
- facilitar edge cases

---

# Naming conventions

## Tests

Formato:

test_{story_id}.py

Ejemplos:

- test_MCA_1.py
- test_HU001.py

---

## Helpers

Formato:

{module}_client.py

Ejemplos:

- auth_client.py
- orders_client.py

---

## Builders

Formato:

{entity}_builder.py

Ejemplos:

- user_builder.py
- order_builder.py

---

## Data

Formato:

{story_id}_data.json

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

Nunca hardcodear URLs ni tokens.

---

# Evidencias

El framework debe soportar:

- logs
- responses
- payloads
- reportes HTML

---

# Logging

Registrar:

- endpoint
- request
- response
- status code
- tiempo de respuesta

Nunca exponer secretos.

---

# Trazabilidad obligatoria

Cada test debe mantener referencia a:

- HU ID
- test case ID
- endpoint validado
- módulo funcional

---

# Reglas de mantenibilidad

SIEMPRE:

- evitar duplicación
- reutilizar helpers
- reutilizar builders
- separar configuración
- mantener estructura limpia

---

# Reglas QA

La automatización debe validar:

- happy paths
- escenarios negativos
- validaciones funcionales
- validaciones de contrato
- validaciones de negocio críticas

---

# Validaciones obligatorias

## Status codes

Validar:

- 200
- 201
- 400
- 401
- 403
- 404
- 500

según el caso.

---

## Payload

Validar:

- estructura
- tipos
- valores
- campos obligatorios

---

## Tiempo de respuesta

Validar SLA cuando aplique.

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

- requests
- assertions
- validaciones
- payloads
- setup cuando aplique

---

## PASO 5 — Generar helpers/builders

Si aplica:

- api_client
- builders
- fixtures

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

Generar automatización API:

- mantenible
- reutilizable
- desacoplada
- alineada con QA real
- preparada para CI/CD
- lista para evolución