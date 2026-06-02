# PLANNER MCP SERVICE

## Objetivo

Definir el contrato operativo para conectar Microsoft Planner mediante un MCP externo.

Este servicio documenta como el agente debe autenticar usuarios, validar permisos, leer tareas de Planner, crear nuevas tareas y actualizar tareas existentes sin implementar OAuth directamente dentro del repositorio.

---

# Principios

- Usar MCP externo para autenticacion y llamadas a Microsoft Graph.
- Usar login por navegador con OAuth Authorization Code + PKCE.
- Soportar solo cuentas Microsoft profesionales o educativas.
- No guardar tokens, refresh tokens, secretos ni credenciales en el repositorio.
- No crear ni editar tareas sin aprobacion explicita del usuario.
- Tratar Planner como Microsoft Graph v1.0.

---

# Capacidades MCP requeridas

El MCP externo debe exponer capacidades equivalentes a:

| Capacidad | Uso |
|---|---|
| `planner.auth.login` | Iniciar login por navegador y consentimiento Microsoft |
| `planner.auth.status` | Validar usuario conectado, tenant y permisos |
| `planner.tasks.get` | Obtener una tarea por `task_id` |
| `planner.tasks.list_by_plan` | Listar tareas de un `plan_id` |
| `planner.tasks.create` | Crear una tarea en un plan y bucket |
| `planner.tasks.update` | Actualizar campos base de una tarea |
| `planner.taskDetails.get` | Obtener descripcion, checklist, referencias y ETag de detalles |
| `planner.taskDetails.update` | Actualizar descripcion, checklist o referencias usando `If-Match` |

Si el MCP no expone alguna capacidad requerida para la intencion del usuario, detener el flujo y explicar la capacidad faltante.

---

# Permisos esperados

Permisos minimos:

- Lectura: `Tasks.Read`
- Lectura, creacion y edicion: `Tasks.ReadWrite`
- Listar planes por grupo, si aplica: `Group.Read.All` o permiso equivalente aprobado por el tenant

Reglas:

- Si el usuario solo va a leer HU, solicitar o validar permisos de lectura.
- Si el usuario quiere crear o editar, validar permisos de escritura antes de continuar.
- Si Microsoft o el tenant requiere consentimiento de administrador, detener y explicar que se necesita aprobacion del administrador.

---

# Contrato de conexion por proyecto

La conexion Planner debe registrarse en metadata del proyecto sin secretos:

```json
{
  "provider": "planner",
  "auth_mode": "browser_oauth_mcp",
  "tenant_id": "",
  "user_id": "",
  "user_display": "",
  "plan_id": "",
  "bucket_id": "",
  "permissions_status": {
    "Tasks.Read": "granted|missing|unknown",
    "Tasks.ReadWrite": "granted|missing|unknown",
    "Group.Read.All": "granted|missing|unknown|not_required"
  },
  "last_connection_check": "",
  "mcp_capabilities": []
}
```

No persistir access tokens, refresh tokens, client secrets ni cookies.

---

# Bloqueos obligatorios

Bloquear el flujo Planner si:

- no hay usuario conectado
- el consentimiento Microsoft no fue otorgado
- el usuario no tiene acceso al plan o tarea
- falta `task_id` para leer una tarea concreta
- falta `plan_id` o `bucket_id` al crear una tarea
- falta ETag o `If-Match` al editar `plannerTask` o `plannerTaskDetails`
- el MCP externo no tiene la capacidad requerida

---

# Lectura de tareas

Para leer una HU desde Planner:

1. Validar contexto del proyecto.
2. Validar que Planner es la herramienta activa.
3. Validar conexion con `planner.auth.status`.
4. Obtener tarea con `planner.tasks.get`.
5. Obtener detalles con `planner.taskDetails.get`.
6. Normalizar la tarea como HU mediante `hu-service.md`.
7. Validar suficiencia con `validation-service.md`.

Campos que se deben leer cuando esten disponibles:

- `id`
- `title`
- `description`
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

No inventar criterios, reglas, prioridad ni dependencias si Planner no las contiene.

---

# Creacion de tareas

Crear tareas solo si el usuario lo solicita explicitamente.

Antes de crear:

1. Validar `Tasks.ReadWrite`.
2. Solicitar o resolver `plan_id`.
3. Solicitar o resolver `bucket_id`.
4. Mostrar titulo, descripcion y campos a crear.
5. Solicitar aprobacion explicita.

Campos minimos:

- `planId`
- `bucketId`
- `title`

La descripcion enriquecida, checklist, referencias o metadata QA se agregan despues de crear la tarea usando `planner.taskDetails.update` con ETag valido.

---

# Edicion de tareas

Editar tareas solo con aprobacion explicita.

Antes de editar:

1. Leer tarea actual.
2. Leer detalles actuales.
3. Mostrar campos actuales y campos propuestos.
4. Indicar si se agregara contenido como anexo/comentario o si se reemplazara descripcion.
5. Solicitar aprobacion explicita.
6. Usar ETag/`If-Match` de `planner.tasks.get` o `planner.taskDetails.get`.

Reglas:

- No sobrescribir descripcion original sin confirmacion.
- No sincronizar supuestos como reglas confirmadas.
- No cambiar titulo, prioridad, fechas, bucket o asignaciones sin aprobacion campo por campo.
- Si hay conflicto `409` o `412`, detener, releer la tarea y pedir confirmacion antes de reintentar.

---

# Manejo de errores

Errores esperados:

| Codigo | Significado | Accion |
|---|---|---|
| 401 | Sesion expirada o token invalido | Solicitar reconexion por navegador |
| 403 | Permiso insuficiente o acceso denegado | Explicar permiso faltante o acceso requerido |
| 404 | Tarea, plan o bucket no encontrado | Validar ID o permisos |
| 409 | Conflicto de actualizacion | Releer tarea antes de reintentar |
| 412 | ETag obsoleto o faltante | Releer ETag y solicitar confirmacion |

Nunca mostrar tokens ni detalles sensibles del error.

---

# Referencias oficiales

- Microsoft Graph Planner overview: `https://learn.microsoft.com/en-us/graph/planner-concept-overview`
- List tasks: `https://learn.microsoft.com/en-us/graph/api/planneruser-list-tasks`
- Get plannerTask: `https://learn.microsoft.com/en-us/graph/api/plannertask-get`
- Create plannerTask: `https://learn.microsoft.com/en-us/graph/api/planner-post-tasks`
- Update plannerTaskDetails: `https://learn.microsoft.com/en-us/graph/api/plannertaskdetails-update`
- OAuth Authorization Code flow: `https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow`
