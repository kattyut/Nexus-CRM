---
name: generate-test-cases
description: Genera casos de prueba versionados y trazables desde HU, plan de pruebas y contexto QA.
---

# COMMAND - GENERATE TEST CASES

## Objetivo

Generar casos de prueba claros, ejecutables y trazables, delegando a `ai/skills/generate-test-cases.md`.

---

# Precondiciones obligatorias

1. Validar contexto del proyecto.
2. Validar herramienta de gestion o fuente de HU.
3. Validar HU leida o enriquecida.
4. Validar plan de pruebas existente.
5. Validar criterios o escenarios verificables.

---

# Bloqueos

Si no hay HU, solicitar leer HU primero.

Si no hay herramienta de gestion o fuente, detener y solicitar ese dato antes de generar casos.

Si no hay plan de pruebas:

1. No generar casos definitivos.
2. Sugerir ejecutar `generate-test-plan`.
3. Preguntar si desea casos preliminares bajo aprobacion explicita.

---

# Delegacion

Delegar a:

```text
ai/skills/generate-test-cases.md
```

---

# Persistencia

Guardar solo con aprobacion del usuario en:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-cases/
```

Usar versionamiento.
