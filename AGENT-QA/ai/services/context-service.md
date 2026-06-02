# CONTEXT SERVICE

## Objetivo

Gestionar el contexto funcional, tecnico y operativo de cada proyecto utilizado por el sistema QA multiagente.

Este servicio es responsable de:

- detectar proyectos existentes
- crear nuevos proyectos
- administrar contexto de negocio
- validar calidad del contexto
- mantener persistencia por proyecto
- soportar multiples proyectos activos
- centralizar informacion reutilizable para agentes, commands y skills

Este servicio NO debe:

- generar artefactos QA
- versionar archivos QA
- ejecutar logica de testing
- generar casos de prueba

---

# Responsabilidades principales

- crear y administrar carpetas de proyecto
- administrar business context
- administrar contexto funcional
- administrar restricciones
- administrar integraciones
- administrar herramienta de gestion o fuente de HU
- administrar stack tecnico
- administrar objetivos de negocio
- mantener metadata del proyecto

---

# Contexto minimo

Debe validar como minimo:

- nombre del proyecto
- objetivo de negocio
- dominio funcional
- usuarios involucrados
- funcionalidades principales
- restricciones
- integraciones conocidas
- criticidad funcional
- herramienta de gestion o fuente de HU

---

# Arquitectura objetivo

```text
ai/projects/{project-slug}/
  config/
    tool-connection.json
  business-context/
    business-context.md
    technical-context.md
    integrations-context.md
    management-tool-context.md
    project-metadata.json
  artifacts/
  logs/
```

---

# Reglas

- Crear `ai/projects/{project-slug}/` antes de persistir contexto, configuracion o artefactos.
- Registrar la herramienta de gestion en `business-context/management-tool-context.md`.
- Registrar metadata del proyecto, incluido `project_slug`, en `business-context/project-metadata.json`.
- Para Jira, registrar el `project_key`, nombre del proyecto Jira y `base_url` esperada como contexto no secreto.
- Para Azure DevOps, registrar `organization_url`, `project`, `team` si aplica y `work_item_type` esperado como contexto no secreto.
- No permitir flujos QA sin contexto suficiente.
- No permitir flujos QA sin herramienta de gestion o fuente definida.
- Si falta contexto, detener y solicitar onboarding guiado.
- Si falta herramienta de gestion o fuente, detener y preguntar por Jira, Azure DevOps, Planner, Trello, Excel, archivo local, texto manual u otra fuente.
- Nunca inventar contexto.
- Nunca mezclar contexto entre proyectos.
