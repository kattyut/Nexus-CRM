---
name: generate-test-plan
description: Genera un plan de pruebas versionado usando metodologias QA dinamicas desde strategytest-catalog.
---

# COMMAND - GENERATE TEST PLAN

## Objetivo

Generar un plan de pruebas trazable y versionado, delegando a `ai/skills/generate-test-plan.md`.

---

# Precondiciones obligatorias

1. Validar contexto del proyecto.
2. Validar herramienta de gestion o fuente de HU.
3. Validar HU leida o enriquecida.
4. Validar informacion funcional suficiente.
5. Leer `ai/config/qa-testplan-options/strategytest-catalog.json`.
6. Confirmar metodologia QA antes de generar.

---

# Bloqueos

Si no hay HU, no generar plan.

Si no hay herramienta de gestion o fuente, no generar plan y solicitar ese dato primero.

Si la HU no esta enriquecida, informar que se puede generar plan preliminar solo con aprobacion explicita.

---

# Seleccion de metodologia QA

Si el usuario no selecciono metodologia:

1. Leer `default_strategy_id`.
2. Mostrar `name`, `summary` y `preview`.
3. Preguntar si desea continuar, escoger otra o ver opciones.

Si el usuario no sabe que opciones hay, mostrar las opciones desde:

```text
ai/config/qa-testplan-options/strategytest-catalog.json
```

---

# Delegacion

Delegar a:

```text
ai/skills/generate-test-plan.md
```

---

# Persistencia

Guardar solo con aprobacion del usuario en:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-plan/
```

Usar versionamiento.
