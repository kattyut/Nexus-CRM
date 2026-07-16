# Releases - AGENT-QA

## Proposito

Este documento registra el historial de evolucion del producto AGENT-QA. Solo deben marcarse como implementadas las capacidades que existen en el repositorio o tienen evidencia operativa.

## Historial

### v1.0 - Arquitectura QA Base

Estado: Implementada

Incluye:

- Estructura oficial bajo `ai/`.
- Separacion entre `agents`, `commands`, `skills`, `services`, `config` y `projects`.
- QA Master Agent como orquestador principal.
- Reglas globales en `agent-rules.md` y `business.rules.md`.

### v1.1 - Contexto, Persistencia y Versionamiento

Estado: Implementada

Incluye:

- Contexto de proyecto bajo `ai/projects/{project-slug}/business-context/`.
- Servicios de contexto, artefactos, versionamiento, summaries y logs.
- Reglas de no sobrescritura y trazabilidad por version `vN`.

### v1.2 - Ciclo QA Funcional

Estado: Implementada

Incluye:

- Lectura y normalizacion de HU.
- Analisis de suficiencia.
- Enriquecimiento con estrategia aprobada.
- Explicacion de requerimientos.
- Generacion de planes, casos y matrices.
- Comandos conversacionales para el ciclo QA.

### v1.3 - Integraciones de Gestion

Estado: Parcial

Incluye:

- Azure DevOps documentado y usado para Nexus CRM.
- Scripts `sync_work_item.py` y `bulk_analyze_enrich_sync.py`.
- Contratos para Jira, Planner, Trello, Excel, archivo local y texto manual.

Pendiente:

- Verificacion operativa uniforme de todos los providers.
- Consolidacion MCP para Planner.

### v1.4 - Catalogos Configurables

Estado: Implementada

Incluye:

- Catalogo de estrategias de enriquecimiento.
- Catalogo de metodologias QA.
- Catalogo de frameworks de automatizacion.
- Reglas por framework y templates Playwright TypeScript.

### v1.5 - Automatizacion QA Inicial

Estado: Parcial

Incluye:

- Test Automation Agent.
- Skill y command de generacion de automatizacion.
- Playwright TypeScript como framework default.
- Proyectos Playwright generados para HU y contratos API en Nexus CRM.
- Metadata y README con pendientes visibles.

Pendiente:

- Ejecucion controlada end-to-end.
- Evidencias versionadas.
- Resolucion real de ambientes, rutas, datos QA y locators.

### v1.6 - Gobierno de Evolucion del Producto

Estado: Implementada

Incluye:

- `docs/roadmap.md`.
- `docs/capabilities.md`.
- `docs/architecture-evolution.md`.
- `docs/releases.md`.
- `docs/backlog.md`.

## Reglas de Actualizacion

- Actualizar este archivo cuando se cierre una epica o capacidad relevante.
- No registrar funcionalidades futuras como implementadas.
- Toda release debe apuntar a capacidades existentes o planificadas.

