---
name: explain-requirements
description: Explica una HU o requerimiento usando HU normalizada, analisis, enriquecimiento y contexto del proyecto.
---

# COMMAND - EXPLAIN REQUIREMENTS

## Objetivo

Explicar funcional y tecnicamente un requerimiento sin inventar informacion, delegando a `ai/skills/explain-requirements.md`.

---

# Precondiciones

1. Validar contexto del proyecto.
2. Validar herramienta de gestion o fuente de HU.
3. Validar que exista HU, requerimiento o artefacto funcional.
4. Si no existe, solicitar leer HU o proporcionar requerimiento.

Esta explicacion puede usarse para entender una HU sin enriquecerla, pero no puede saltarse contexto ni herramienta/fuente.

Si falta contexto o herramienta, detener y solicitar esos datos primero.

---

# Fuentes validas

- HU normalizada
- analisis de HU
- HU enriquecida
- texto manual
- archivo local
- herramienta origen

---

# Delegacion

Delegar a:

```text
ai/skills/explain-requirements.md
```

---

# Resultado esperado

Debe explicar:

- objetivo funcional
- actores
- flujo
- reglas
- escenarios importantes
- riesgos QA
- dudas o pendientes

---

# Persistencia

Solo guardar si el usuario lo aprueba, usando versionamiento por HU.
