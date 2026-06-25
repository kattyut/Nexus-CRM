# ARTIFACT SERVICE

## Objetivo

Gestionar la creacion, organizacion, persistencia y trazabilidad de artefactos QA dentro del sistema multi-proyecto.

Este servicio es responsable de:

- crear estructuras de carpetas
- gestionar artefactos por proyecto
- gestionar artefactos por HU
- crear rutas consistentes
- mantener metadata asociada
- integrarse con `versioning-service.md`, `summary-service.md` y `context-service.md`

Este servicio NO debe generar contenido QA. La generacion pertenece a los skills especializados.

---

# Responsabilidades

- crear carpetas de proyecto
- crear carpetas de artifacts
- crear carpetas de HU
- crear carpetas por tipo de artefacto
- crear carpetas de versiones
- guardar archivos generados
- guardar metadata
- mantener trazabilidad entre proyecto, HU, artefactos, versiones, summaries y estrategias/metodologias usadas

---

# Arquitectura objetivo

```text
ai/projects/{project-slug}/
  config/
    tool-connection.json
  business-context/
    business-context.md
    management-tool-context.md
    project-metadata.json
  artifacts/
    {hu-id}/
      source/
      analysis/
        v1/
          analysis.md
          metadata.json
          summary.json
      enrich-us/
        v1/
        v2/
      requirements-explanation/
      test-plan/
        v1/
      test-cases/
        v1/
      test-matrix/
        v1/
      summary.json
    global/
      test-plan/
      test-matrix/
      summary.json
  logs/
```

---

# Reglas

- Crear siempre primero la carpeta del proyecto `ai/projects/{project-slug}/`.
- Crear y mantener `business-context/`, `config/`, `artifacts/` y `logs/` por proyecto.
- Guardar el contexto de negocio en `business-context/`; nunca en la raiz del repositorio.
- Guardar configuracion no secreta de herramienta en `config/tool-connection.json`; nunca guardar tokens.
- Crear carpeta por HU usando el ID real normalizado de la fuente: `artifacts/{hu-id}/`.
- Crear carpetas faltantes automaticamente cuando la accion este aprobada.
- Para `analysis`, crear siempre `analysis/vN/` con `analysis.md`, `metadata.json` y `summary.json`.
- La carpeta `analysis/` no debe quedar vacia despues de una ejecucion correcta de `analyze-us`.
- Si no se puede generar el analisis porque falta HU fuente real o contexto, no crear una version vacia; registrar bloqueo en logs y summary si ya existe la HU.
- No sobrescribir archivos existentes.
- Delegar versionamiento a `versioning-service.md`.
- Registrar cambios en `summary-service.md`.
- Registrar eventos en `logging-service.md`.
- Bloquear cualquier persistencia que intente escribir artefactos QA fuera de `ai/projects/{project-slug}/artifacts/`.

---

# Automatizacion ejecutable

Para automatizacion QA ejecutable, guardar siempre bajo:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-automation/vN/{framework_id}/
```

Para Playwright TypeScript, la version debe contener como minimo:

```text
package.json
playwright.config.ts
tests/
pages/
fixtures/
utils/
README.md
metadata.json
```

No guardar proyectos de automatizacion en la raiz, en `projects/{project_slug}/automation/` ni fuera de `artifacts/{hu-id}/test-automation/`.
