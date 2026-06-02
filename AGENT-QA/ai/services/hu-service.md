# HU SERVICE

## Objetivo

Centralizar toda la logica relacionada con Historias de Usuario dentro del sistema QA multiagente.

Este servicio es responsable de:

- detectar HU
- resolver IDs
- normalizar nombres
- identificar providers
- cargar historias
- validar referencias
- mantener trazabilidad
- evitar duplicacion de logica entre skills y commands

Este servicio NO debe:

- generar artefactos QA
- generar casos de prueba
- generar planes
- manejar versionamiento
- actualizar herramientas externas

---

# Responsabilidades principales

## Resolucion de HU

Resolver correctamente:

- ID tecnico
- nombre funcional
- provider
- origen
- aliases
- URL externa cuando exista
- prioridad cuando exista

## Normalizacion

Convertir distintos formatos a una estructura uniforme.

## Trazabilidad

Mantener relacion estable aunque cambie el nombre de la HU.

---

# Providers soportados

- Jira
- Azure DevOps
- Planner
- Trello
- Excel
- Manual
- Archivo local
- Contexto activo

---

# IDs soportados

## Jira

```text
MCA-1
AUTH-15
QA-300
```

Para Jira:

- `id` debe ser el `issue.key` real devuelto por Jira.
- `provider` debe ser `Jira`.
- `source` debe indicar la instancia Jira configurada para el proyecto activo.
- `traceability.project` debe corresponder al `project_key` configurado.
- `traceability.external_url` debe construirse desde la issue real o conservar la URL devuelta por Jira.
- No inventar HU cuando Jira no devuelve la issue.
- No usar una issue cuyo `key` sea distinto al solicitado.
- No usar una issue cuyo prefijo no coincida con el `project_key` del proyecto activo.
- No convertir un ID inexistente en input manual.
- Si Jira no retorna descripcion o criterios, mantener campos vacios y registrar hallazgos; no completarlos con supuestos.

## Azure DevOps

```text
12345
ADO-12345
```

Para Azure DevOps:

- `id` debe ser el `System.Id` real devuelto por Azure DevOps.
- Si el usuario entrega `ADO-12345`, normalizar a `12345` y conservar el alias.
- `provider` debe ser `Azure DevOps`.
- `source` debe indicar `Azure DevOps`.
- `traceability.project` debe corresponder al proyecto Azure DevOps configurado.
- `traceability.external_url` debe conservar la URL del Work Item cuando exista.
- `traceability.azure.work_item_id` debe conservar el ID real.
- `traceability.azure.organization_url` debe conservar la organizacion configurada.
- `traceability.azure.project` debe conservar el proyecto configurado.
- `traceability.azure.area_path` debe conservar `System.AreaPath`.
- `traceability.azure.iteration_path` debe conservar `System.IterationPath`.
- `traceability.azure.work_item_type` debe conservar `System.WorkItemType`.
- `traceability.azure.rev` debe conservar la revision del Work Item cuando exista.
- `traceability.azure.tags` debe conservar `System.Tags`.
- No inventar HU cuando Azure DevOps no devuelve el Work Item.
- No usar un Work Item cuyo `System.Id` sea distinto al solicitado.
- No convertir un ID inexistente en input manual.
- Si Azure DevOps no retorna descripcion o criterios, mantener campos vacios y registrar hallazgos; no completarlos con supuestos.

## Planner

```text
planner-task-id
plan/bucket/task
```

Para Planner:

- `id` debe ser el `plannerTask.id`.
- `provider` debe ser `Planner`.
- `source` debe indicar `Microsoft Planner`.
- `traceability.planner.task_id` debe conservar el ID real de la tarea.
- `traceability.planner.plan_id` debe conservar `planId`.
- `traceability.planner.bucket_id` debe conservar `bucketId`.
- `traceability.planner.task_etag` y `traceability.planner.details_etag` deben conservarse cuando esten disponibles para ediciones seguras.
- No inventar HU ID alternativo si existe `plannerTask.id`.

## Trello

```text
card-id
board/list/card
```

## Excel

```text
HU-001
MCA-1
fila identificada por columna ID
```

## Manual o archivo local

Si no existe ID, crear identificador normalizado temporal:

```text
HU-TEMP-{timestamp}
```

---

# Formato normalizado

Toda HU debe normalizarse a:

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
    "azure": {
      "work_item_id": "",
      "organization_url": "",
      "project": "",
      "area_path": "",
      "iteration_path": "",
      "work_item_type": "",
      "rev": "",
      "tags": [],
      "assigned_to": "",
      "created_date": "",
      "changed_date": ""
    },
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

# Reglas

- No inventar ID si existe uno en la herramienta origen.
- No inventar prioridad si no existe.
- Si falta prioridad, usar `Pendiente de definicion`.
- Mantener provider y source en todos los artefactos.
- No permitir HU sin provider/source definidos.
- Para Jira, exigir coincidencia estricta entre proyecto activo, `project_key`, `base_url` e `issue.key`.
- Para Azure DevOps, exigir coincidencia estricta entre proyecto activo, `organization_url`, `project` y `System.Id`.
- Si la HU llega por chat, usar provider `Manual` y source `texto manual`.
- Si la HU viene de Azure DevOps, mantener Work Item ID, proyecto, area, iteracion, tipo, estado, tags y revision en trazabilidad.
- Si la HU viene de Planner, mantener IDs, plan, bucket, asignaciones, estado, fechas y ETags en trazabilidad.
- Para Planner, mapear `title` como titulo, `plannerTaskDetails.description` como descripcion funcional y `checklist` como criterios o validaciones solo si el contenido lo permite literalmente.
- Para Planner, no convertir `checklist` en criterios de aceptacion si los items no expresan validaciones verificables; marcarlos como checklist funcional.
- Resolver nombres de carpeta seguros para filesystem.
- Nunca mezclar HU de proyectos distintos.
