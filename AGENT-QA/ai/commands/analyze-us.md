---
name: analyze-us
description: Analiza una HU leida o proporcionada, evaluando suficiencia, INVEST, claridad, riesgos y trazabilidad QA.
---

# COMMAND - ANALYZE USER STORY

## Objetivo

Analizar una HU sin modificarla y delegar la evaluacion a `ai/skills/analyze-us.md`.

---

# Precondiciones

Antes de analizar:

1. Validar contexto del proyecto.
2. Validar herramienta de gestion o fuente de HU.
3. Validar que exista HU activa leida y normalizada.
4. Si no hay HU, guiar al usuario hacia `read-us`.

---

# Bloqueos

Si no hay contexto:

> No puedo analizar la HU porque falta contexto del proyecto.

Si no hay herramienta de gestion o fuente:

> No puedo analizar la HU porque falta definir la herramienta de gestion o fuente del proyecto. Primero necesito saber si usan Jira, Azure DevOps, Planner, Trello, Excel, archivo local, texto manual u otra fuente.

Si no hay HU:

> No puedo analizar porque aun no hay una HU leida o proporcionada. Primero debo leerla desde Jira, Azure DevOps, Planner, Trello, Excel, archivo local o texto manual.

---

# Delegacion

Delegar a:

```text
ai/skills/analyze-us.md
```

---

# Resultado esperado

El analisis debe entregar:

- clasificacion de suficiencia
- evaluacion INVEST
- hallazgos
- riesgos QA
- recomendaciones
- siguiente paso recomendado

Tambien debe persistir una version obligatoria bajo:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/analysis/vN/
```

Archivos esperados:

- `analysis.md`
- `metadata.json`
- `summary.json`

El `summary.json` raiz de la HU debe actualizarse con la ultima version de `analysis`.

---

# Restricciones

No modificar, enriquecer ni sincronizar la HU.
No dejar la carpeta `analysis/` vacia si el analisis finalizo correctamente.
