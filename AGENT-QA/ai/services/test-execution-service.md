# TEST EXECUTION SERVICE

## Objetivo

Ejecutar, controlar y registrar resultados de pruebas automatizadas generadas por AGENT-QA.

Este servicio es responsable de:

- instalar dependencias del proyecto de automatizacion;
- ejecutar pruebas Playwright;
- capturar resultados, logs y evidencias;
- manejar errores de instalacion y ejecucion;
- actualizar summaries mediante `summary-service.md`;
- registrar auditoria mediante `logging-service.md`.

Este servicio NO debe:

- generar automatizacion;
- modificar casos de prueba, HU, planes o matrices;
- inventar datos, selectores, URLs o reglas;
- actualizar herramientas externas sin aprobacion explicita.

---

# Entradas obligatorias

- `project_slug`
- `story_id`
- `automation_version`
- `framework_id`
- ruta existente del proyecto generado:

```text
ai/projects/{project_slug}/artifacts/{story_id}/test-automation/{automation_version}/{framework_id}/
```

Para esta fase, el framework ejecutable soportado es:

```text
playwright-typescript
```

---

# Comandos soportados

Para Playwright TypeScript, ejecutar desde la carpeta del proyecto generado:

```bash
npm install
npx playwright test --reporter=json
```

El servicio debe registrar los comandos ejecutados en logs, sin secretos ni variables sensibles.

---

# Directorio de ejecucion

Cada ejecucion debe guardarse bajo:

```text
ai/projects/{project_slug}/artifacts/{story_id}/test-automation/executions/run-NNN/
```

Estructura minima:

```text
report.json
screenshots/
traces/
logs/
```

`run-NNN` debe resolverse incrementalmente, por ejemplo `run-001`, `run-002`, `run-003`.

---

# Flujo obligatorio

## PASO 1 - Validar proyecto generado

Validar:

- existencia de `package.json`;
- existencia de `playwright.config.ts`;
- existencia de `tests/`;
- existencia de `fixtures/` para datos de prueba;
- existencia de `utils/` cuando la version generada declare utilidades;
- existencia de `README.md`;
- existencia de `metadata.json`;
- ausencia de rutas fuera de `ai/projects/{project_slug}/artifacts/{story_id}/test-automation/`.

Si falta algun archivo obligatorio, bloquear ejecucion y registrar error.

## PASO 2 - Crear carpeta de ejecucion

Crear el siguiente `run-NNN` disponible en:

```text
test-automation/executions/
```

Crear siempre:

- `screenshots/`
- `traces/`
- `logs/`

## PASO 3 - Instalar dependencias

Ejecutar:

```bash
npm install
```

Guardar salida estandar y errores en:

```text
logs/npm-install.log
```

Si falla, marcar:

```json
{
  "execution_status": "install_failed"
}
```

## PASO 4 - Ejecutar pruebas

Ejecutar:

```bash
npx playwright test --reporter=json
```

Guardar salida JSON en:

```text
report.json
```

Guardar salida completa en:

```text
logs/playwright-test.log
```

Si Playwright genera evidencias, copiarlas o referenciarlas desde:

- `screenshots/`
- `traces/`

## PASO 5 - Consolidar resultados

Extraer desde `report.json`:

- total de pruebas;
- pruebas pasadas;
- pruebas fallidas;
- pruebas omitidas;
- duracion;
- errores principales.

Si el JSON no puede parsearse, conservar el log crudo y marcar:

```json
{
  "execution_status": "result_parse_failed"
}
```

## PASO 6 - Actualizar summary

Actualizar:

```text
ai/projects/{project_slug}/artifacts/{story_id}/summary.json
```

Registrar:

- `execution_status`
- `last_execution`
- `passed_tests`
- `failed_tests`
- `artifacts.test_automation.last_execution_path`
- `artifacts.test_automation.execution_status`
- `artifacts.test_automation.passed_tests`
- `artifacts.test_automation.failed_tests`

`last_execution` debe apuntar al `run-NNN` mas reciente.

## PASO 7 - Registrar logs

Registrar mediante `logging-service.md`:

- inicio de ejecucion;
- comandos ejecutados;
- ruta del proyecto ejecutado;
- ruta de evidencias;
- estado de instalacion;
- estado de ejecucion;
- conteo de pruebas pasadas y fallidas;
- errores.

---

# Estados permitidos

| Estado | Uso |
|---|---|
| `not_executed` | Automatizacion generada pero no ejecutada |
| `install_failed` | Fallo `npm install` |
| `execution_failed` | Fallo el comando Playwright |
| `result_parse_failed` | No se pudo interpretar `report.json` |
| `passed` | Ejecucion completa sin fallos |
| `failed` | Ejecucion completa con pruebas fallidas |

---

# Resultado esperado

El servicio debe permitir validar una automatizacion generada sin pedir al usuario ejecutar comandos manuales, dejando resultados versionados, trazables y auditables dentro del artefacto de la HU.
