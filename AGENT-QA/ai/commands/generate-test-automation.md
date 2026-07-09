# GENERATE TEST AUTOMATION COMMAND

## Objetivo

Generar automatizacion de pruebas ejecutable basada en:

- Historias de Usuario enriquecidas
- Planes de prueba
- Casos de prueba
- Summary de HU
- Framework seleccionado desde catalogo

La salida inicial soportada debe ser un proyecto Playwright TypeScript ejecutable con:

```bash
npm install
npx playwright test
```

---

# Flujo obligatorio

## PASO 1 - Validar proyecto activo

Delegar a:

- `context-service.md`
- `validation-service.md`

## PASO 2 - Resolver HU objetivo

Delegar a:

- `hu-service.md`

## PASO 3 - Validar artefactos requeridos

Validar existencia de:

- HU enriquecida
- test-plan
- test-cases
- summary de HU

Si falta alguno, detener el flujo y explicar el bloqueo.

## PASO 4 - Seleccionar framework

Delegar a:

- `strategy-service.md`

Leer:

```text
ai/config/automation-options/automation-catalog.json
```

Si el usuario no especifica framework, resolver el default del catalogo:

```text
playwright-typescript
```

No usar rutas `.github/ai/...`.

## PASO 5 - Leer templates

Para `playwright-typescript`, usar:

```text
ai/config/automation-templates/playwright-typescript/
```

Templates obligatorios:

- `package.template.json`
- `playwright.config.template.ts`
- `page-object.template.ts`
- `spec.template.ts`
- `api.spec.template.ts`
- `fixture-data.template.json`
- `test-data.template.ts`
- `utils.template.ts`
- `readme.template.md`

## PASO 6 - Delegar generacion

Delegar a:

```text
ai/skills/generate-test-automation.md
```

El command no debe contener logica tecnica duplicada.

El skill debe resolver si corresponde generar `playwright-ui`, `playwright-api` o `playwright-e2e`.

Para automatizacion API basada en contrato, el skill debe delegar analisis a `api-analysis-service.md` y no duplicar parsing OpenAPI/Swagger dentro del command.

## PASO 7 - Persistencia

Delegar a:

- `artifact-service.md`
- `versioning-service.md`
- `summary-service.md`
- `logging-service.md`

Si el usuario solicita validar la ejecucion, delegar despues de la generacion a:

- `test-execution-service.md`

Guardar bajo:

```text
ai/projects/{project_slug}/artifacts/{story_id}/test-automation/vN/playwright-typescript/
```

## PASO 8 - Azure DevOps

Si existe integracion Azure DevOps:

- preparar metadata QA local;
- no actualizar Azure DevOps sin aprobacion explicita;
- no guardar PATs ni secretos.

---

# Resultado esperado

Generar:

- proyecto Playwright TypeScript completo;
- Page Objects para UI/E2E;
- fixtures de datos;
- base API cuando el caso sea API;
- analisis OpenAPI/Swagger cuando exista contrato;
- pruebas API positivas y negativas cuando el contrato lo soporte;
- archivos ejecutables;
- metadata;
- versionamiento;
- summary actualizado;
- logs de auditoria;
- trazabilidad con HU, plan y casos.

El usuario debe poder pedir:

```text
Genera automatizacion para MCA-1
```

El command debe resolver internamente:

```text
HU -> casos -> automatizacion -> proyecto Playwright
```
