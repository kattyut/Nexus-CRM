---
name: enrich-us
description: Enriquece una HU usando estrategias dinamicas desde el catalogo de enrichment-options y versiona el resultado por HU.
---

# COMMAND - ENRICH USER STORY

## Objetivo

Guiar el enriquecimiento de una HU y delegar la ejecucion a `ai/skills/enrich-us.md`.

---

# Precondiciones obligatorias

Antes de enriquecer:

1. Validar contexto del proyecto.
2. Validar herramienta de gestion o fuente de HU.
3. Validar que exista HU leida y normalizada.
4. Validar que exista analisis previo o clasificacion de suficiencia.
5. Leer `ai/config/enrichment-options/strategy-catalog.json`.
6. Confirmar estrategia antes de enriquecer.

---

# Bloqueos

Si no hay contexto, no continuar.

Si no hay herramienta de gestion o fuente, no continuar y preguntar cual usa el proyecto.

Si no hay HU, no continuar y solicitar leerla primero.

Si no hay analisis previo ni clasificacion de suficiencia, no enriquecer; ejecutar o solicitar `analyze-us` primero.

Si la HU esta `insufficient`, solicitar informacion faltante antes de enriquecer.

---

# Seleccion de estrategia

Si el usuario no selecciono estrategia:

1. Leer `default_strategy_id`.
2. Mostrar `name`, `summary` y `preview`.
3. Preguntar si desea continuar, escoger otra o ver opciones.

Si el usuario no sabe que opciones hay, mostrar las estrategias desde:

```text
ai/config/enrichment-options/strategy-catalog.json
```

---

# Delegacion

Delegar a:

```text
ai/skills/enrich-us.md
```

---

# Persistencia y sincronizacion

El skill debe:

- versionar en `ai/projects/{project-slug}/artifacts/{hu-id}/enrich-us/`
- incluir encabezado visible con metodologia, contexto breve, prioridad y version
- pedir aprobacion antes de persistir
- pedir aprobacion antes de actualizar herramienta origen

---

# Restricciones

No inventar reglas, integraciones, validaciones ni comportamiento tecnico.
