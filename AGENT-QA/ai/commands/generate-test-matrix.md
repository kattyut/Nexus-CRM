---
name: generate-test-matrix
description: Genera matriz de pruebas individual o global usando ultimas versiones de HU, planes y casos.
---

# COMMAND - GENERATE TEST MATRIX

## Objetivo

Generar matriz de pruebas trazable, individual o global, delegando a `ai/skills/generate-test-matrix.md`.

---

# Modos

| Modo | Uso |
|---|---|
| individual | Matriz para una HU activa |
| global | Matriz consolidada del proyecto con todas las HU que tengan casos |

Detectar modo desde lenguaje natural:

- "esta HU", "MCA-1", "individual" -> individual
- "global", "todas", "completa", "Excel consolidado" -> global

Si hay ambiguedad, preguntar.

---

# Precondiciones

## Individual

1. Contexto del proyecto.
2. Herramienta de gestion o fuente de HU.
3. HU activa.
4. Casos de prueba de la HU.
5. Plan de pruebas si existe.

## Global

1. Contexto del proyecto.
2. Herramienta de gestion o fuente de HU.
3. Proyecto activo.
4. Una o mas HU con casos generados.
5. Ultimas versiones resolubles.

Si falta herramienta de gestion o fuente, no generar matriz.

---

# Delegacion

Delegar a:

```text
ai/skills/generate-test-matrix.md
```

---

# Reglas globales

La matriz global debe:

- usar ultimas versiones disponibles
- ordenar por HU
- agrupar por HU en Markdown
- generar CSV exportable a Excel
- reportar HU excluidas por falta de casos

---

# Persistencia

Guardar solo con aprobacion del usuario en:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-matrix/
ai/projects/{project-slug}/artifacts/global/test-matrix/
```

Usar versionamiento.
