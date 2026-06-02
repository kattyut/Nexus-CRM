# GENERATE TEST AUTOMATION SKILL

## Objetivo

Generar automatización de pruebas consistente y mantenible.

---

# Entradas obligatorias

- HU enriquecida
- test-plan
- test-cases
- framework seleccionado
- contexto del proyecto

---

# Framework inicial recomendado

## Default

Playwright TypeScript

---

# Responsabilidades

Este skill debe:

- analizar casos de prueba
- identificar flujo automatizable
- generar estructura base
- generar pruebas iniciales
- generar Page Objects básicos
- mantener trazabilidad

---

# Reglas IMPORTANTES

## SIEMPRE

- usar casos de prueba reales
- mantener naming consistente
- generar estructura limpia
- mantener trazabilidad con HU

---

## NUNCA

- inventar flujos
- inventar validaciones
- generar código inconsistente
- mezclar frameworks

---

# Estructura objetivo

automation/

- tests/
- pages/
- fixtures/
- utils/
- data/
- config/

---

# Naming conventions

## Tests

{hu-id}.spec.ts

Ejemplo:

MCA-1.spec.ts

---

## Pages

{module}.page.ts

Ejemplo:

login.page.ts

---

# Flujo obligatorio

## PASO 1 — Leer contexto

Leer:

- business-context.md
- test-plan
- test-cases

---

## PASO 2 — Resolver framework

Validar framework seleccionado.

---

## PASO 3 — Generar estructura

Crear:

- tests
- pages
- fixtures
- config

---

## PASO 4 — Generar pruebas

Generar:

- test básico
- assertions básicas
- navegación inicial

---

## PASO 5 — Persistencia

Delegar a:

- artifact-service
- versioning-service
- summary-service

---

# Resultado esperado

Generar:

- estructura inicial automatizable
- código base consistente
- trazabilidad completa