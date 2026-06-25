# GENERATE TEST AUTOMATION SKILL

## Objetivo

Generar automatizacion QA ejecutable, versionada y trazable a partir de HU enriquecida, plan de pruebas, casos de prueba, summary y contexto del proyecto.

La implementacion inicial funcional es Playwright TypeScript. La arquitectura debe seguir permitiendo nuevos frameworks mediante `strategy-service.md` y `ai/config/automation-options/automation-catalog.json`.

---

# Entradas obligatorias

- Proyecto activo validado por `context-service.md`.
- HU objetivo resuelta por `hu-service.md`.
- HU enriquecida existente.
- Plan de pruebas existente.
- Casos de prueba existentes.
- `summary.json` de la HU cuando exista.
- Framework seleccionado o default resuelto por `strategy-service.md`.
- Catalogo `ai/config/automation-options/automation-catalog.json`.
- Templates del framework en `templates_path`.

Si falta una entrada obligatoria, detener la generacion y registrar bloqueo mediante `logging-service.md`.

---

# Framework default

Usar `default_framework` o `default_framework_id` desde:

```text
ai/config/automation-options/automation-catalog.json
```

El default oficial es:

```text
playwright-typescript
```

No aplicar frameworks fuera del catalogo.

---

# Responsabilidades

Este skill debe:

- leer casos de prueba reales y su metadata;
- leer summary de HU;
- leer contexto de negocio;
- leer `strategy-service.md` y resolver framework;
- leer `rule_file` del framework seleccionado;
- leer templates desde `templates_path`;
- generar un proyecto Playwright TypeScript ejecutable;
- crear version nueva mediante `versioning-service.md`;
- persistir mediante `artifact-service.md`;
- actualizar `summary.json` mediante `summary-service.md`;
- registrar eventos y errores mediante `logging-service.md`;
- mantener trazabilidad entre HU, plan, casos y automatizacion.

Este skill NO debe:

- inventar flujos, URLs, endpoints, reglas o validaciones;
- actualizar Azure DevOps, Jira, Planner u otra herramienta sin aprobacion explicita;
- sobrescribir versiones existentes;
- mezclar frameworks en una misma version.

---

# Flujo obligatorio

## PASO 1 - Leer fuentes

Leer la ultima version disponible de:

- `ai/projects/{project_slug}/business-context/business-context.md`
- `ai/projects/{project_slug}/artifacts/{story_id}/enrich-us/vN/`
- `ai/projects/{project_slug}/artifacts/{story_id}/test-plan/vN/`
- `ai/projects/{project_slug}/artifacts/{story_id}/test-cases/vN/`
- `ai/projects/{project_slug}/artifacts/{story_id}/summary.json`

Resolver las versiones fuente usadas y conservarlas en metadata.

## PASO 2 - Resolver framework

Delegar a `strategy-service.md`:

- cargar catalogo de automatizacion;
- validar `default_framework`;
- validar `framework_id`;
- resolver `rule_file`;
- resolver `templates_path`;
- resolver `output_path`.

## PASO 3 - Validar automatizabilidad

Delegar a `validation-service.md`:

- confirmar que existen casos automatizables;
- validar trazabilidad de casos contra HU y plan;
- detectar datos faltantes criticos;
- bloquear si los pasos no permiten generar codigo ejecutable sin inventar informacion.

Cuando falte una URL o selector real, usar placeholders seguros y visibles, por ejemplo `BASE_URL` o selectores por rol/texto derivados literalmente del caso. Registrar el pendiente en metadata y README.

## PASO 4 - Crear version

Delegar a `versioning-service.md` para crear la siguiente version:

```text
ai/projects/{project_slug}/artifacts/{story_id}/test-automation/vN/
```

Dentro de la version, crear una carpeta por framework:

```text
playwright-typescript/
```

Nunca sobrescribir una version existente.

Mantener referencia `latest` sin reemplazar versiones historicas. La referencia debe quedar registrada en `summary.json` y, cuando aplique, en un archivo liviano:

```text
ai/projects/{project_slug}/artifacts/{story_id}/test-automation/latest.json
```

`latest.json` debe apuntar a la ultima version generada y no debe contener codigo duplicado.

## PASO 5 - Generar proyecto Playwright TypeScript

Usar templates desde:

```text
ai/config/automation-templates/playwright-typescript/
```

Generar como minimo:

```text
package.json
playwright.config.ts
tests/{story_id}.spec.ts
pages/{module}.page.ts
fixtures/{feature}.fixture.ts
utils/
README.md
metadata.json
```

La salida debe poder ejecutarse desde la carpeta `playwright-typescript` con:

```bash
npm install
npx playwright test
```

## PASO 6 - Reglas de codigo

Para Playwright TypeScript:

- usar `@playwright/test`;
- usar `test.describe`;
- usar `test.step` para mapear pasos del caso;
- usar `async/await`;
- usar Page Object en niveles intermedio y avanzado;
- priorizar selectores `data-testid`, `role`, `text`, `css`;
- usar `BASE_URL` desde variable de entorno;
- activar evidencias: trace, screenshot y video en fallos;
- no hardcodear secretos.

## PASO 7 - Metadata

Crear `metadata.json` dentro del proyecto generado con:

```json
{
  "artifact_type": "test-automation",
  "automation_generated": true,
  "framework": "playwright-typescript",
  "framework_name": "Playwright + TypeScript",
  "framework_version": "catalog:1.1.0",
  "automation_version": "vN",
  "latest": true,
  "project_slug": "{project_slug}",
  "hu_id": "{story_id}",
  "source_versions": {
    "enrich_us": "vN",
    "test_plan": "vN",
    "test_cases": "vN"
  },
  "generated_at": "{iso_datetime}",
  "generated_by": "generate-test-automation"
}
```

## PASO 8 - Summary

Actualizar:

```text
ai/projects/{project_slug}/artifacts/{story_id}/summary.json
```

Agregar o actualizar:

- `automation_generated`
- `framework`
- `framework_version`
- `automation_version`
- `generated_at`
- `artifacts.test_automation.latest_version`
- `artifacts.test_automation.path`
- `artifacts.test_automation.status`
- `artifacts.test_automation.latest_path`

## PASO 9 - Logging

Registrar en `ai/projects/{project_slug}/logs/`:

- framework seleccionado;
- templates usados;
- ruta de salida;
- artefactos generados;
- version creada;
- errores o pendientes;
- tiempo de ejecucion.

---

# Estructura objetivo

```text
ai/projects/{project_slug}/artifacts/{story_id}/test-automation/vN/playwright-typescript/
  package.json
  playwright.config.ts
  tests/
    {story_id}.spec.ts
  pages/
    {module}.page.ts
  fixtures/
    {feature}.fixture.ts
  utils/
  README.md
  metadata.json
```

---

# Resultado esperado

El resultado debe ser un proyecto Playwright TypeScript ejecutable, versionado, trazable, auditable y generado unicamente desde artefactos existentes.
