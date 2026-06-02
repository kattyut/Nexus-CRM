# GENERATE TEST AUTOMATION COMMAND

## Objetivo

Generar automatización de pruebas basada en:

- Historias de Usuario
- Planes de prueba
- Casos de prueba
- Framework seleccionado

---

# Flujo obligatorio

## PASO 1 — Validar proyecto activo

Delegar a:

- context-service

---

## PASO 2 — Resolver HU objetivo

Delegar a:

- hu-service

---

## PASO 3 — Validar artefactos requeridos

Validar existencia de:

- HU enriquecida
- test-plan
- test-cases

---

## PASO 4 — Seleccionar framework

Delegar a:

- strategy-service

Leer:

.github/ai/config/automation-options/framework-catalog.json

---

## Frameworks soportados

- Playwright TypeScript
- Playwright Python
- Cypress
- Pytest

---

## PASO 5 — Delegar generación

Delegar a:

skills/generate-test-automation.md

---

## PASO 6 — Persistencia

Delegar a:

- artifact-service
- versioning-service
- summary-service
- logging-service

---

# Resultado esperado

Generar:

- estructura automatizable
- archivos base
- pruebas iniciales
- metadata
- versionamiento
- trazabilidad