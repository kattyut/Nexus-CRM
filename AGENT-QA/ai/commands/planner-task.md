---
name: planner-task
description: Crea o edita tareas de Microsoft Planner mediante MCP externo con aprobacion explicita.
---

# COMMAND - PLANNER TASK

## Objetivo

Gestionar creacion y edicion segura de tareas Planner como Historias de Usuario o artefactos funcionales del flujo QA.

Este comando no reemplaza el ciclo QA. Solo permite crear o sincronizar tareas cuando el usuario lo solicita y aprueba.

---

# Precondiciones comunes

1. Validar contexto del proyecto.
2. Validar Planner como herramienta activa.
3. Validar conexion MCP con `planner.auth.status`.
4. Validar permiso `Tasks.ReadWrite`.
5. Aplicar `ai/services/planner-mcp-service.md`.

---

# Crear tarea

Requiere:

- solicitud explicita del usuario
- `plan_id`
- `bucket_id`
- titulo
- aprobacion explicita despues de mostrar campos

Flujo:

1. Mostrar plan, bucket, titulo y descripcion propuesta.
2. Separar hechos, supuestos y pendientes.
3. Preguntar aprobacion explicita.
4. Crear con capacidad equivalente a `planner.tasks.create`.
5. Si hay descripcion, checklist o referencias, actualizar detalles con `planner.taskDetails.update` y ETag valido.
6. Registrar resultado y task id.

---

# Editar tarea

Requiere:

- tarea leida previamente o `task_id`
- lectura actual de tarea con `planner.tasks.get`
- lectura de detalles con `planner.taskDetails.get`
- ETag valido
- aprobacion explicita despues de mostrar cambios

Flujo:

1. Mostrar valores actuales y valores propuestos.
2. Indicar si se agregara contenido como seccion/anexo o si se reemplazara descripcion.
3. Solicitar aprobacion explicita.
4. Actualizar solo campos aprobados.
5. Usar `If-Match` con ETag.
6. Registrar resultado.

---

# Restricciones

- No sobrescribir descripcion original sin confirmacion.
- No cambiar titulo, prioridad, fecha, bucket o asignaciones sin aprobacion campo por campo.
- No sincronizar supuestos como reglas confirmadas.
- No mostrar tokens ni secretos.
- No reintentar conflictos sin releer tarea y pedir confirmacion.

---

# Manejo de errores

- `401`: solicitar reconexion por navegador.
- `403`: indicar permiso o acceso faltante.
- `404`: validar tarea, plan, bucket o permisos.
- `409`: releer antes de reintentar.
- `412`: releer ETag y pedir confirmacion.
