# LOGGING SERVICE

## Objetivo

Centralizar el registro de eventos del sistema multiagente QA.

Este servicio debe registrar:

- ejecucion de agentes
- ejecucion de commands
- generacion de artefactos
- errores
- validaciones
- conexiones
- cambios
- versionamiento
- acciones del usuario
- decisiones del sistema
- sincronizacion con herramientas externas

---

# Ubicacion

```text
ai/services/logging-service.md
```

---

# Responsabilidades

El Logging Service debe:

- registrar eventos
- registrar errores
- registrar auditoria
- registrar cambios
- registrar trazabilidad
- centralizar logs
- mantener historial por proyecto

---

# Reglas importantes

El Logging Service NO debe:

- generar artefactos
- modificar archivos QA
- decidir logica
- aplicar estrategias
- sincronizar herramientas externas

---

# Tipos de logs

| Tipo | Descripcion |
|---|---|
| INFO | Eventos normales |
| WARNING | Situaciones no criticas |
| ERROR | Errores del sistema |
| AUDIT | Cambios auditables |
| DEBUG | Diagnostico tecnico |

---

# Eventos obligatorios

Debe registrar:

- inicio de agents, commands y skills
- finalizacion de agents, commands y skills
- errores
- validaciones
- creacion de artefactos
- versionamiento
- cambios de estrategia
- cambios de metodologia
- conexiones
- generacion de prompts
- persistencia aprobada
- sincronizacion aprobada con herramientas externas

---

# Estructura de logs

```text
ai/projects/{project-slug}/logs/
```

Archivos recomendados:

- `system.log`
- `audit.log`
- `validation.log`
- `prompt.log`
- `versioning.log`
- `errors.log`
- `sync.log`

---

# Formato obligatorio

```json
{
  "timestamp": "2026-05-19T15:10:00Z",
  "level": "INFO",
  "service": "artifact-service",
  "project": "banking-app",
  "artifact": "test-plan",
  "hu_id": "MCA-1",
  "version": "v1",
  "message": "Artifact generated successfully"
}
```
