---
name: read-us
description: Skill especializado en leer, validar y normalizar Historias de Usuario desde fuentes manuales, locales o herramientas conectadas.
---

# SKILL - READ USER STORY

## Objetivo

Leer Historias de Usuario desde distintas fuentes y entregar una estructura normalizada, validada y trazable para que pueda ser usada por los demas skills del flujo QA.

Este skill es la puerta de entrada del ciclo:

- analizar HU
- enriquecer HU
- explicar requerimientos
- generar plan de pruebas
- generar casos de prueba
- generar matriz de trazabilidad

---

# Principio de arquitectura

Este skill NO debe concentrar logica pesada.

Debe orquestar servicios especializados:

| Responsabilidad | Servicio |
|---|---|
| Validar contexto del proyecto | `ai/services/context-service.md` |
| Validar conexion externa | `ai/services/connection-service.md` |
| Leer tareas Planner via MCP | `ai/services/planner-mcp-service.md` |
| Resolver, identificar y normalizar HU | `ai/services/hu-service.md` |
| Validar estructura y suficiencia | `ai/services/validation-service.md` |
| Registrar eventos y errores | `ai/services/logging-service.md` |
| Persistir evidencia de lectura cuando aplique | `ai/services/artifact-service.md` |
| Registrar decisiones y resumen trazable | `ai/services/summary-service.md` |

---

# Entradas esperadas

El skill puede recibir:

- ID de historia en Jira
- ID de historia en Azure DevOps
- ID de historia en Planner
- ID de historia en Trello
- ID de historia en Excel 
- texto manual de una HU
- ruta de archivo local
- referencia a una HU ya cargada en contexto

---

# Decision Gate interno

Antes de normalizar y persistir la HU, este skill debe tomar decisiones tecnicas internas sobre:

| Dimension | Decision |
|---|---|
| Fuente confiable | Confirmar si la fuente es oficial, manual, local o pendiente de validacion. |
| Identidad de HU | Confirmar ID real, ID normalizado y coincidencia con proyecto/fuente. |
| Suficiencia inicial | Clasificar si hay informacion minima para analisis posterior. |
| Riesgo de lectura | Identificar riesgos de permisos, proyecto incorrecto, respuesta incompleta o fuente ambigua. |
| Trazabilidad | Definir provider, source, external_url, version y metadata disponible. |

Reglas:

- No degradar fallos Jira/Azure/Planner a HU manual.
- Si la fuente es texto manual, registrar `source: texto manual`.
- Si falta informacion critica, bloquear o marcar pendiente segun `validation-service.md`.
- Registrar decisiones en `summary-service.md` cuando exista cambio trazable y en `logging-service.md` con nivel `DECISION`.

Este gate no cambia el flujo visible: el usuario sigue usando `read-us` igual.

---

# Fuentes soportadas

## Jira

Leer usando:

- issue id
- conexion configurada
- permisos validados
- MCP disponible, si aplica

Reglas obligatorias para Jira:

- validar que la herramienta activa del proyecto sea `Jira`
- cargar `ai/projects/{project-slug}/config/tool-connection.json`
- validar `base_url`, `project_key`, `user_email` y `auth_ref`
- validar que el ID solicitado empiece por el `project_key` configurado
- consultar Jira antes de normalizar o analizar
- validar que la respuesta de Jira tenga el mismo `issue.key` solicitado
- bloquear si la issue no existe, no hay permisos, Jira no responde o el proyecto no coincide
- no crear HU manual, ejemplo ni contenido inferido como fallback de una lectura Jira fallida

## Azure DevOps

Leer usando:

- work item id
- conexion configurada
- permisos validados

Reglas obligatorias para Azure DevOps:

- validar que la herramienta activa del proyecto sea `Azure DevOps`
- cargar `ai/projects/{project-slug}/config/tool-connection.json`
- validar `organization_url`, `project`, `work_item_type` y `auth_ref`
- validar variables secretas referenciadas por `auth_ref` sin mostrar sus valores
- normalizar IDs tipo `ADO-12345` a `12345`
- consultar Azure DevOps antes de normalizar o analizar
- validar que la respuesta tenga el mismo `System.Id` solicitado
- validar que el Work Item pertenezca al proyecto configurado o a una ruta/area permitida por contexto
- bloquear si el Work Item no existe, no hay permisos, Azure DevOps no responde o el proyecto no coincide
- no crear HU manual, ejemplo ni contenido inferido como fallback de una lectura Azure DevOps fallida

## Planner

Leer usando:

- task id
- plan o bucket asociado
- conexion MCP configurada
- login por navegador validado
- permisos validados (`Tasks.Read` para lectura)
- descripcion, checklist, referencias y metadata funcional disponible

El skill debe usar el contrato definido en:

```text
ai/services/planner-mcp-service.md
```

Campos Planner a leer cuando existan:

- `id`
- `title`
- `description` desde `plannerTaskDetails`
- `checklist`
- `references`
- `bucketId`
- `planId`
- `assignments`
- `percentComplete`
- `priority`
- `dueDateTime`
- `createdDateTime`
- `createdBy`
- `appliedCategories`
- ETag de tarea
- ETag de detalles

Si falta `task_id`, no intentar buscar por titulo de forma ambigua; pedir el ID o listar tareas del plan solo si existe `plan_id` y el usuario lo solicita.

## Trello

Leer usando:

- card id
- board y lista asociados
- conexion configurada
- permisos validados
- descripcion, checklist, labels y comentarios funcionales disponibles

## Excel

Leer usando:

- ID de historia registrado en una fila
- archivo local `.xlsx`, `.xls` o `.csv`
- libro, hoja y columna de identificacion cuando esten disponibles
- conexion configurada si el archivo esta en OneDrive, SharePoint u otra fuente externa

## Input manual

Aceptar:

- texto libre
- formato Scrum
- descripcion parcial
- criterios de aceptacion incluidos por el usuario

## Archivo local

Aceptar archivos:

- `.md`
- `.txt`
- `.json`
- `.xlsx`
- `.xls`
- `.csv`

---

# Flujo obligatorio

## Paso 1 - Validar contexto del proyecto

Antes de leer la HU:

1. Usar `context-service.md`.
2. Validar que exista proyecto activo o contexto suficiente.
3. Validar que exista herramienta de gestion o fuente definida para el proyecto.
4. Si no existe contexto suficiente, detener el flujo y solicitar los datos faltantes.
5. Si no existe herramienta o fuente, detener el flujo y preguntar cual usa el proyecto.

No solicitar la HU si todavia no existe contexto minimo del proyecto.
No solicitar la HU si todavia no existe herramienta de gestion o fuente definida.

---

## Paso 2 - Identificar fuente

Determinar el origen de la HU:

- Jira
- Azure DevOps
- Planner
- Trello
- Excel
- Manual
- Archivo local
- Contexto activo

Si el origen no es claro, preguntar al usuario antes de continuar.

Si la HU fue pegada en el chat, registrar la fuente como `Manual` o `texto manual`; no dejar provider vacio.

---

## Paso 3 - Validar conexion cuando aplique

Si la fuente requiere integracion externa:

1. Usar `connection-service.md`.
2. Validar credenciales, acceso, permisos y disponibilidad.
3. No mostrar tokens, passwords ni secretos.
4. Si la conexion falla, detener el flujo y explicar causa probable y siguiente accion.

Para Planner:

1. Validar que la herramienta activa sea `Planner`.
2. Usar `planner-mcp-service.md`.
3. Validar sesion con `planner.auth.status`.
4. Si no hay sesion, solicitar login por navegador mediante `planner.auth.login`.
5. Validar permiso `Tasks.Read` para lectura.
6. Validar acceso a la tarea, plan o bucket.
7. Si falla 401, 403, 404, 409 o 412, aplicar el manejo de errores de `planner-mcp-service.md`.

Para Jira:

1. Validar que la herramienta activa sea `Jira`.
2. Validar configuracion por proyecto en `ai/projects/{project-slug}/config/tool-connection.json`.
3. Validar variables secretas referenciadas por `auth_ref` sin mostrar sus valores.
4. Validar acceso a `base_url` y `project_key`.
5. Leer la issue por `issue.key`.
6. Comparar el `issue.key` devuelto contra el ID solicitado.
7. Detener el flujo si hay error `401`, `403`, `404`, si el proyecto no coincide o si la respuesta no contiene la issue exacta.

Mensaje sugerido ante fallo Jira:

> No pude leer la HU real desde Jira para el proyecto activo. Se detiene el flujo para evitar inventar informacion o usar una HU de otro proyecto. Valida `base_url`, `project_key`, permisos de la cuenta y el ID solicitado.

Para Azure DevOps:

1. Validar que la herramienta activa sea `Azure DevOps`.
2. Validar configuracion por proyecto en `ai/projects/{project-slug}/config/tool-connection.json`.
3. Validar variables secretas referenciadas por `auth_ref` sin mostrar sus valores.
4. Validar acceso a `organization_url` y `project`.
5. Leer el Work Item por `System.Id`.
6. Comparar el `System.Id` devuelto contra el ID solicitado.
7. Detener el flujo si hay error `401`, `403`, `404`, si el proyecto no coincide o si la respuesta no contiene el Work Item exacto.

Mensaje sugerido ante fallo Azure DevOps:

> No pude leer el Work Item real desde Azure DevOps para el proyecto activo. Se detiene el flujo para evitar inventar informacion o usar una HU de otro proyecto. Valida `organization_url`, `project`, permisos del PAT y el ID solicitado.

---

## Paso 4 - Leer informacion

Obtener toda la informacion disponible sin inventar campos faltantes:

- ID
- titulo
- descripcion
- criterios de aceptacion
- epica o feature relacionada
- labels
- comentarios funcionales relevantes
- estado
- fuente
- fecha de lectura, si esta disponible

Para Planner, obtener la tarea base y sus detalles:

- tarea base con `planner.tasks.get`
- detalles con `planner.taskDetails.get`
- lista por plan con `planner.tasks.list_by_plan` solo cuando el usuario pida explorar un plan o falte seleccionar tarea

Para Azure DevOps, obtener el Work Item y sus campos funcionales disponibles:

- `System.Id`
- `System.Title`
- `System.Description`
- `Microsoft.VSTS.Common.AcceptanceCriteria`
- `System.State`
- `System.WorkItemType`
- `System.Tags`
- `System.AreaPath`
- `System.IterationPath`
- `System.AssignedTo`
- `Microsoft.VSTS.Common.Priority`
- `System.CreatedDate`
- `System.ChangedDate`
- `System.TeamProject`
- relaciones de Feature/Epic/Parent cuando existan

---

## Paso 5 - Resolver y normalizar HU

Usar `hu-service.md` para:

- resolver ID tecnico
- resolver nombre funcional
- identificar provider
- normalizar aliases
- mantener trazabilidad entre fuente, ID y titulo

---

## Paso 6 - Validar existencia

Si la HU no existe:

1. Informar claramente el problema.
2. Detener el flujo.
3. Solicitar una de estas acciones:
   - nuevo ID
   - nueva HU manual
   - validacion de permisos o conexion

Mensaje sugerido:

> No fue posible encontrar la Historia de Usuario solicitada. Verifica el identificador, permisos o conexion configurada.

Para Jira y Azure DevOps, este bloqueo es obligatorio. No continuar con analisis, enriquecimiento, planes, casos ni matrices hasta leer la issue/Work Item real o recibir una HU manual marcada explicitamente como `texto manual`.

---

## Paso 7 - Validar contenido minimo

Usar `validation-service.md` para validar que exista al menos:

- titulo o summary
- descripcion funcional minima
- rol, accion y beneficio cuando el formato de HU este disponible

Formato esperado cuando aplique:

```text
Como [rol]
Quiero [accion]
Para [beneficio]
```

---

## Paso 8 - Clasificar suficiencia

Clasificar la HU en uno de estos estados:

| Estado | Significado |
|---|---|
| `insufficient` | No tiene informacion suficiente para analisis o enriquecimiento confiable |
| `sufficient_not_enriched` | Tiene base suficiente, pero requiere refinamiento |
| `already_enriched` | Ya contiene estructura y detalle funcional adecuados |

Si la informacion es insuficiente, informar:

- que falta
- por que afecta QA
- que informacion se necesita completar
- impacto sobre analisis, enriquecimiento o generacion de pruebas

---

# Formato normalizado esperado

El resultado del skill debe entregar esta estructura:

```json
{
  "id": "",
  "title": "",
  "description": "",
  "acceptance_criteria": [],
  "business_rules": [],
  "dependencies": [],
  "source": "",
  "provider": "",
  "status": "",
  "priority": "",
  "sufficiency_status": "",
  "traceability": {
    "project": "",
    "external_url": "",
    "epic": "",
    "labels": [],
    "planner": {
      "task_id": "",
      "plan_id": "",
      "bucket_id": "",
      "assignments": [],
      "percent_complete": "",
      "due_date": "",
      "created_date": "",
      "task_etag": "",
      "details_etag": ""
    }
  },
  "validation": {
    "status": "",
    "findings": []
  }
}
```

---

# Persistencia

La lectura de una HU no debe generar artefactos QA finales.

Solo puede persistir evidencia operativa cuando sea necesario:

- snapshot de HU leida
- metadata de origen
- log de lectura
- errores de conexion

La persistencia debe delegarse a:

- `artifact-service.md`
- `logging-service.md`
- `summary-service.md`, cuando exista cambio trazable

Ruta objetivo por proyecto:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/source/
```

Si la estructura no existe, debe crearse automaticamente mediante `artifact-service.md`.

---

# Reglas anti-invencion

Este skill NO debe:

- inventar criterios de aceptacion
- inventar reglas de negocio
- inventar dependencias
- inferir integraciones no documentadas
- completar comportamiento funcional sin evidencia
- modificar herramientas externas

Si falta informacion, debe marcarla como faltante y solicitar aclaracion.

---

# Salida esperada al usuario

Responder con:

1. Fuente identificada.
2. HU normalizada.
3. Estado de suficiencia.
4. Hallazgos de validacion.
5. Siguiente accion recomendada.

Ejemplo de siguiente accion:

- analizar HU
- enriquecer HU
- completar informacion faltante
- generar plan de pruebas, si ya existe suficiente informacion

---

# Relacion con otros skills

Este skill debe ejecutarse antes de:

- `analyze-us.md`
- `enrich-us.md`
- `explain-requirements.md`
- `generate-test-plan.md`
- `generate-test-cases.md`
- `generate-test-matrix.md`

---

# Criterio de finalizacion

El skill finaliza correctamente cuando existe una HU:

- leida
- normalizada
- validada
- clasificada
- trazable
- lista para el siguiente paso QA
