# VERSIONING SERVICE

## Objetivo

Gestionar el versionamiento completo de todos los artefactos generados por el sistema QA multiagente.

Este servicio es responsable de:

- crear versiones
- detectar versiones existentes
- evitar sobrescrituras
- mantener historial
- preservar trazabilidad
- controlar estructura de carpetas
- mantener consistencia entre artefactos

Este servicio NO debe:

- generar contenido QA
- crear logica funcional
- generar casos de prueba
- generar planes de prueba

---

# Responsabilidades

- controlar `v1`, `v2`, `v3` y versiones futuras
- resolver ultima version disponible
- resolver versiones fuente
- mantener estructura reutilizable
- garantizar historial completo de cambios

---

# Arquitectura objetivo

```text
ai/projects/{project-slug}/artifacts/{hu-id}/
  analysis/
    v1/
    v2/
    summary.json
  enrich-us/
    v1/
    v2/
    summary.json
  test-plan/
    v1/
    summary.json
  test-cases/
    v1/
    summary.json
  test-matrix/
    v1/
    summary.json
  metadata.json
```

Artefactos globales:

```text
ai/projects/{project-slug}/artifacts/global/
  test-plan/
    v1/
  test-matrix/
    v1/
```

---

# Reglas

- Nunca sobrescribir una version existente.
- Crear nueva version si ya existe contenido previo.
- Para `analysis`, crear una nueva version cada vez que se ejecute `analyze-us` sobre una HU leida o actualizada.
- La version `analysis/vN/` debe contener como minimo `analysis.md`, `metadata.json` y `summary.json`.
- Resolver la ultima version usando metadata, summary o carpeta `vN` mas alta.
- Registrar version en `summary-service.md`.
