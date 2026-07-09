# VALIDATION SERVICE

## Objetivo

Centralizar todas las validaciones del sistema QA AI.

Este servicio debe validar:

- historias de usuario
- requerimientos
- artefactos QA
- estructura de proyectos
- integraciones
- metadata
- versionamiento
- consistencia documental
- reglas QA
- trazabilidad

---

# Ubicacion

```text
ai/services/validation-service.md
```

---

# Responsabilidades

El Validation Service debe:

- validar entradas
- validar estructura
- validar coherencia
- validar completitud
- validar trazabilidad
- validar formatos
- validar metadata
- detectar inconsistencias
- prevenir persistencia invalida
- detectar informacion inventada o no soportada

---

# Reglas importantes

Este servicio NO debe:

- generar contenido
- modificar artefactos
- aplicar estrategias
- construir prompts
- sincronizar herramientas externas

Eso pertenece a:

- `prompt-service.md`
- `strategy-service.md`
- `connection-service.md`
- `skills/`

---

# Validacion de contexto

Debe validar contexto minimo del proyecto:

- nombre del proyecto
- objetivo de negocio
- dominio funcional
- usuarios involucrados
- funcionalidades principales
- restricciones
- integraciones conocidas
- criticidad funcional
- herramienta de gestion o fuente de HU

Si falta herramienta de gestion o fuente, la validacion debe fallar con severidad `ERROR` para cualquier accion sobre HU o artefactos QA.

---

# Validacion de HU

Debe validar:

- estructura INVEST
- formato Scrum cuando aplique
- claridad funcional
- criterios de aceptacion
- reglas de negocio
- dependencias
- consistencia
- suficiencia
- provider y trazabilidad
- source no vacio
- provider no vacio

## Estructura minima HU

Cuando aplique formato Scrum:

```text
Como [rol]
Quiero [accion]
Para [beneficio]
```

Si el origen no usa Scrum, validar informacion equivalente:

- actor
- necesidad
- resultado esperado
- descripcion funcional minima

---

# Estados de suficiencia

| Estado | Uso |
|---|---|
| `insufficient` | Bloquea enriquecimiento y generacion definitiva |
| `sufficient_not_enriched` | Permite enriquecimiento con aprobacion |
| `already_enriched` | Permite generar artefactos posteriores |

---

# Validaciones INVEST

| Validacion | Obligatoria |
|---|---|
| Independent | Si |
| Negotiable | Si |
| Valuable | Si |
| Estimable | Si |
| Small | Si |
| Testable | Si |

---

# Validacion de artefactos

Debe validar:

- IDs
- titulos
- encabezado visible
- metadata
- referencias cruzadas
- trazabilidad
- consistencia con HU
- version fuente
- version generada

## Validacion de analisis inicial

El artefacto `analysis` debe validar:

- ruta `ai/projects/{project-slug}/artifacts/{hu-id}/analysis/vN/`
- existencia de `analysis.md`
- existencia de `metadata.json`
- existencia de `summary.json`
- `artifact_type` igual a `analysis`
- `hu_id`, `project_slug`, `provider` y `source` presentes
- estado inicial de la HU incluido sin enriquecer
- `sufficiency_status` presente
- hallazgos de completitud y campos faltantes
- veredicto INVEST
- riesgos QA
- siguiente paso recomendado
- referencia a la version o snapshot fuente cuando exista

Si `analysis/` existe pero esta vacia despues de una ejecucion correcta de `analyze-us`, la validacion debe fallar con severidad `ERROR`.

---

# Validacion de planes de prueba

Debe validar:

- objetivo
- alcance
- metodologia QA
- riesgos
- cobertura
- criterios de entrada
- criterios de salida
- supuestos y pendientes
- version y trazabilidad

---

# Validacion de casos de prueba

Debe validar:

- ID
- HU ID
- criterio asociado
- titulo
- pasos
- resultado esperado
- prioridad
- tipo
- cobertura
- automatizable
- trazabilidad con HU y plan

---

# Validacion de matrices

Debe validar:

- modo individual o global
- trazabilidad
- cobertura
- referencias validas
- consistencia entre artefactos
- ultimas versiones usadas
- orden por HU en matriz global
- formato exportable CSV/Excel

---

# Validacion de automatizacion ejecutable

Debe validar:

- existencia de HU enriquecida;
- existencia de plan de pruebas;
- existencia de casos de prueba;
- existencia de `summary.json` de la HU cuando aplique;
- framework presente en `ai/config/automation-options/automation-catalog.json`;
- `rule_file` existente;
- `templates_path` existente para frameworks basados en templates;
- ruta de salida bajo `ai/projects/{project-slug}/artifacts/{hu-id}/test-automation/vN/{framework_id}/`;
- archivos minimos para Playwright TypeScript: `package.json`, `playwright.config.ts`, `tests/`, `pages/`, `fixtures/`, `utils/`, `README.md` y `metadata.json`;
- `package.json` con script ejecutable;
- metadata con `automation_generated`, `framework`, `framework_version`, `automation_version` y `generated_at`;
- metadata con `automation_type` cuando se genere `playwright-ui`, `playwright-api` o `playwright-e2e`;
- metadata API con `api_tests_generated`, `endpoints_covered`, `contract_validated` y `api_execution_status` cuando aplique;
- contratos OpenAPI/Swagger existentes y parseables cuando se declare `contract_validated`;
- pruebas API bajo `tests/api/` cuando el tipo sea `playwright-api`;
- uso de locators segun `locator-service.md`;
- datos de prueba separados segun `test-data-service.md`;
- referencia `latest` en `summary.json` o `test-automation/latest.json` sin duplicar codigo generado;
- ausencia de secretos hardcodeados;
- ausencia de `waitForTimeout()` salvo justificacion documentada;
- no uso de rutas `.github/ai/...`.

Si faltan casos automatizables o informacion critica para generar pasos verificables sin inventar, la validacion debe fallar con severidad `ERROR`.

---

# Validacion de estructura del proyecto

Debe validar existencia de:

```text
ai/projects/{project-slug}/
```

Estructura minima:

```text
ai/projects/{project-slug}/
  business-context/
  artifacts/
  logs/
```

---

# Estructura obligatoria por HU

```text
ai/projects/{project-slug}/artifacts/{hu-id}/
  source/
  analysis/
  enrich-us/
  requirements-explanation/
  test-plan/
  test-cases/
  test-matrix/
  summary.json
```

No todos los subdirectorios deben existir desde el inicio, pero cuando se genere un artefacto debe respetar esta estructura.

---

# Estructura global

```text
ai/projects/{project-slug}/artifacts/global/
  test-plan/
  test-matrix/
```

---

# Validacion de versiones

Debe validar:

- secuencia correcta `v1`, `v2`, `v3`
- metadata completa
- historial consistente
- timestamps validos
- referencias a artefactos fuente

---

# Metadata minima

Todo `metadata.json` debe contener, cuando aplique:

- version
- artifact_type
- project
- hu_id
- hu_name
- source_provider
- created_at
- updated_at
- strategy
- methodology
- source_versions
- generated_by

Para Planner, cuando aplique, metadata debe incluir:

- planner_task_id
- planner_plan_id
- planner_bucket_id
- planner_task_etag
- planner_details_etag
- planner_permissions_status

Para Azure DevOps, cuando aplique, metadata debe incluir:

- azure_work_item_id
- azure_organization_url
- azure_project
- azure_area_path
- azure_iteration_path
- azure_work_item_type
- azure_rev
- azure_tags
- azure_permissions_status

---

# Validacion de summary.json

Debe validar:

- historial completo
- acciones registradas
- versiones existentes
- integridad documental
- ultima version marcada

---

# Validacion de integraciones

Debe validar:

- provider valido
- credenciales minimas si aplica
- permisos
- configuracion correcta
- errores claros

Providers soportados:

- Jira
- Azure DevOps
- Trello
- Planner
- Excel
- Manual
- Archivo local

Si la HU fue proporcionada manualmente, provider debe ser `Manual` o equivalente y source debe indicar `texto manual`.

## Validacion especifica de Planner

Para Planner debe validar:

- `provider` igual a `Planner` o `planner`.
- `source` igual a `Microsoft Planner` o equivalente.
- `task_id` presente para leer, analizar, enriquecer o actualizar una tarea existente.
- `plan_id` y `bucket_id` presentes para crear una nueva tarea.
- usuario conectado mediante MCP externo.
- consentimiento Microsoft otorgado.
- permisos `Tasks.Read` para lectura.
- permisos `Tasks.ReadWrite` para creacion o edicion.
- ETag presente para actualizar `plannerTask` o `plannerTaskDetails`.

Bloqueos Planner:

| Condicion | Severidad |
|---|---|
| usuario no conectado | ERROR |
| consentimiento no otorgado | ERROR |
| permiso insuficiente | ERROR |
| tarea/plan/bucket no encontrado | ERROR |
| falta `plan_id` o `bucket_id` al crear | ERROR |
| falta ETag al editar | ERROR |
| conflicto 409 o 412 | ERROR |

Errores Planner deben explicarse asi:

- `401`: sesion expirada o token invalido; solicitar reconexion por navegador.
- `403`: permiso insuficiente o acceso denegado; indicar permiso o acceso requerido.
- `404`: tarea, plan o bucket no encontrado; validar ID y permisos.
- `409`: conflicto de actualizacion; releer tarea antes de reintentar.
- `412`: ETag obsoleto o faltante; releer ETag y pedir confirmacion antes de reintentar.

## Validacion especifica de Jira

Para Jira debe validar:

- `provider` igual a `Jira` o `jira`.
- `source` con la instancia Jira configurada para el proyecto activo.
- `tool-connection.json` existente en `ai/projects/{project-slug}/config/`.
- `base_url` definido.
- `project_key` definido.
- ID solicitado con prefijo igual al `project_key`.
- issue leida realmente desde Jira.
- `issue.key` devuelto igual al ID solicitado.
- permisos de lectura sobre proyecto e issue.

Bloqueos Jira:

| Condicion | Severidad |
|---|---|
| falta configuracion por proyecto | ERROR |
| falta `project_key` | ERROR |
| ID solicitado pertenece a otro proyecto | ERROR |
| autenticacion fallida | ERROR |
| permiso insuficiente | ERROR |
| issue no encontrada | ERROR |
| Jira devuelve una issue distinta | ERROR |

Errores Jira deben explicarse asi:

- `401`: credenciales invalidas o expiradas; validar usuario/token local.
- `403`: permiso insuficiente para el proyecto o issue; validar acceso de la cuenta.
- `404`: issue no encontrada o sin visibilidad; validar ID, proyecto y permisos.
- proyecto no coincide: detener y pedir confirmar proyecto activo o ID correcto.

Ante cualquier bloqueo Jira, no generar contenido alternativo. El flujo solo puede continuar si se lee la issue real o si el usuario decide cambiar explicitamente la fuente a `texto manual`.

## Validacion especifica de Azure DevOps

Para Azure DevOps debe validar:

- `provider` igual a `Azure DevOps`, `azure-devops` o equivalente controlado.
- `source` igual a `Azure DevOps`.
- `tool-connection.json` existente en `ai/projects/{project-slug}/config/`.
- `organization_url` definido.
- `project` definido.
- variables `AZURE_DEVOPS_ORG_URL`, `AZURE_DEVOPS_PROJECT` y `AZURE_DEVOPS_PAT` referenciadas, sin exponer valores.
- ID solicitado numerico o alias normalizable `ADO-{id}`.
- Work Item leido realmente desde Azure DevOps.
- `System.Id` devuelto igual al ID solicitado normalizado.
- Work Item perteneciente al proyecto configurado o a una ruta/area permitida por contexto.
- permisos de lectura sobre proyecto y Work Item.

Bloqueos Azure DevOps:

| Condicion | Severidad |
|---|---|
| falta configuracion por proyecto | ERROR |
| falta `organization_url` | ERROR |
| falta `project` | ERROR |
| ID solicitado no es un Work Item ID valido | ERROR |
| autenticacion fallida | ERROR |
| permiso insuficiente | ERROR |
| Work Item no encontrado | ERROR |
| Azure DevOps devuelve un Work Item distinto | ERROR |
| Work Item pertenece a otro proyecto/contexto | ERROR |

Errores Azure DevOps deben explicarse asi:

- `401`: PAT invalido, expirado o variable mal configurada; validar `.env` local.
- `403`: permiso insuficiente sobre proyecto o Work Item; validar permisos del PAT.
- `404`: organizacion, proyecto o Work Item no encontrado; validar URL, proyecto e ID.
- `409`: conflicto de actualizacion; releer Work Item antes de reintentar.
- `412`: revision obsoleta o condicion de concurrencia fallida; releer revision y pedir confirmacion.

Ante cualquier bloqueo Azure DevOps, no generar contenido alternativo. El flujo solo puede continuar si se lee el Work Item real o si el usuario decide cambiar explicitamente la fuente a `texto manual`.

---

# Validacion de estrategias y metodologias

Debe validar:

- `strategy_id` valido
- `methodology_id` valido
- `rule_file` existente
- categoria correcta
- estructura valida
- aprobacion del usuario cuando se use default

---

# Reglas anti-invencion

Detectar:

- funcionalidades inventadas
- reglas inexistentes
- integraciones no soportadas
- referencias invalidas
- supuestos presentados como hechos

---

# Severidad de errores

## ERROR

Bloquea ejecucion.

Ejemplos:

- HU invalida
- contexto inexistente
- metadata corrupta
- version inconsistente
- casos inexistentes para matriz

## WARNING

Permite continuar con aprobacion.

Ejemplos:

- descripcion incompleta
- riesgo poco detallado
- plan preliminar sin HU enriquecida

## INFO

Informacion contextual.

---

# Respuesta estandar

```json
{
  "status": "failed",
  "severity": "ERROR",
  "message": "Acceptance criteria missing",
  "field": "acceptance_criteria"
}
```
