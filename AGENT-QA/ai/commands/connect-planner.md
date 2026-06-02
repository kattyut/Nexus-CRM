---
name: connect-planner
description: Conecta Microsoft Planner mediante MCP externo y login por navegador.
---

# COMMAND - CONNECT PLANNER

## Objetivo

Guiar la conexion de un usuario a Microsoft Planner usando un MCP externo, sin guardar tokens ni secretos en el repositorio.

---

# Precondiciones

1. Validar contexto del proyecto.
2. Validar que Planner sera la herramienta de gestion o fuente de HU.
3. Validar disponibilidad del MCP externo de Planner.
4. Aplicar `ai/services/planner-mcp-service.md`.

---

# Flujo obligatorio

1. Explicar que la conexion se hara con login por navegador.
2. Ejecutar o solicitar capacidad equivalente a `planner.auth.login`.
3. Validar resultado con `planner.auth.status`.
4. Confirmar usuario conectado, tenant y permisos disponibles.
5. Registrar metadata no sensible del proyecto:
   - `provider: planner`
   - `auth_mode: browser_oauth_mcp`
   - `tenant_id`, si aplica
   - `user_id` o cuenta conectada
   - `permissions_status`
   - `last_connection_check`
6. No guardar tokens, refresh tokens, cookies ni secretos.

---

# Permisos

Validar:

- `Tasks.Read` para lectura.
- `Tasks.ReadWrite` para crear o editar.
- `Group.Read.All` o equivalente solo si se necesita listar planes por grupo.

Si falta consentimiento o permiso, detener y explicar que el usuario o administrador Microsoft debe aprobarlo.

---

# Resultado esperado

Responder con:

- estado de conexion
- usuario conectado enmascarado cuando aplique
- permisos disponibles
- permisos faltantes
- siguiente accion recomendada: leer HU, listar tareas del plan, crear tarea o completar configuracion de `plan_id`/`bucket_id`
