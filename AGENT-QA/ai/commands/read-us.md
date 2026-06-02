---
name: read-us
description: Lee y normaliza una Historia de Usuario desde Jira, Azure DevOps, Planner, Trello, Excel, texto manual, archivo local o contexto activo.
---

# COMMAND - READ USER STORY

## Objetivo

Leer una HU de forma conversacional y delegar el procesamiento a `ai/skills/read-us.md`.

---

# Precondiciones

Antes de leer:

1. Validar contexto del proyecto mediante `ai/services/context-service.md`.
2. Si no hay contexto suficiente, detener y solicitar datos minimos del proyecto.
3. Validar herramienta de gestion o fuente de HU del proyecto.
4. Identificar origen especifico de la HU.

No solicitar ni procesar la HU antes de tener contexto y herramienta/fuente.

---

# Origenes soportados

- Jira
- Azure DevOps
- Planner
- Trello
- Excel
- texto manual
- archivo local
- contexto activo

## Planner

Si el origen es Planner:

1. Validar que exista conexion MCP externa.
2. Validar login por navegador mediante `planner.auth.status`.
3. Si no hay sesion, solicitar `planner.auth.login`.
4. Validar permiso `Tasks.Read`.
5. Leer por `task_id` usando `planner.tasks.get`.
6. Leer detalles usando `planner.taskDetails.get`.
7. Normalizar tarea como HU sin inventar campos.

Si el usuario no tiene `task_id`, permitir listar tareas solo si existe `plan_id` y el usuario lo solicita.

Bloquear si no hay usuario conectado, consentimiento otorgado, acceso al plan/tarea o capacidad MCP requerida.

## Jira

Si el origen es Jira:

1. Validar que el proyecto activo tenga herramienta `Jira`.
2. Validar configuracion por proyecto en `ai/projects/{project-slug}/config/tool-connection.json`.
3. Validar `base_url`, `project_key`, `user_email` y referencia de secretos.
4. Validar que el ID solicitado pertenezca al `project_key` del proyecto activo.
5. Leer la issue real desde Jira.
6. Confirmar que Jira devuelve exactamente el mismo `issue.key`.
7. Persistir snapshot de lectura solo bajo `ai/projects/{project-slug}/artifacts/{hu-id}/source/`.

Bloquear si la configuracion no corresponde al proyecto activo, si falla la autenticacion, si no hay permisos, si la issue no existe o si el ID pertenece a otro proyecto.

Nunca generar contenido de ejemplo ni inferido cuando falla la lectura de Jira.

## Azure DevOps

Si el origen es Azure DevOps:

1. Validar que el proyecto activo tenga herramienta `Azure DevOps`.
2. Validar configuracion por proyecto en `ai/projects/{project-slug}/config/tool-connection.json`.
3. Validar `organization_url`, `project`, `work_item_type` y referencia de secretos.
4. Validar que el ID solicitado sea un Work Item ID valido. Si llega como `ADO-12345`, normalizar a `12345`.
5. Leer el Work Item real desde Azure DevOps.
6. Confirmar que Azure DevOps devuelve exactamente el mismo `System.Id`.
7. Validar que el Work Item pertenece al proyecto configurado o a una ruta/area permitida.
8. Persistir snapshot de lectura solo bajo `ai/projects/{project-slug}/artifacts/{hu-id}/source/`.

Bloquear si la configuracion no corresponde al proyecto activo, si falla la autenticacion, si no hay permisos, si el Work Item no existe o si pertenece a otro proyecto/contexto.

Nunca generar contenido de ejemplo ni inferido cuando falla la lectura de Azure DevOps.

Si el proyecto no tiene herramienta/fuente definida, preguntar cual desea usar y registrarla en el contexto.

Si el usuario no indica origen de una HU concreta, preguntar cual desea usar.

---

# Delegacion

Delegar a:

```text
ai/skills/read-us.md
```

El skill debe:

- leer
- validar existencia
- normalizar
- clasificar suficiencia
- conservar trazabilidad

---

# Restricciones

Este comando NO debe:

- enriquecer
- analizar profundamente
- generar criterios nuevos
- inventar contenido faltante

---

# Resultado esperado

Retornar:

- HU normalizada
- origen detectado
- provider
- estado de suficiencia
- hallazgos de validacion
- siguiente paso recomendado
