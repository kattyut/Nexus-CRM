# Catalogo de Capacidades - AGENT-QA

## Leyenda

- Implementada: existe flujo documentado y componentes operativos.
- Parcial: existe arquitectura, contrato o evidencia parcial, pero faltan piezas para considerarla completa.
- Pendiente: no existe implementacion suficiente; puede existir idea, contrato o regla.

## Capacidades

| Estado | Capacidad | Objetivo | Componentes involucrados | Dependencias | Criterios de finalizacion |
|---|---|---|---|---|---|
| Implementada | Orquestacion QA conversacional | Detectar intenciones y coordinar el ciclo QA sin saltar precondiciones. | `qa-master-agent.md`, `qa-run.md`, `agent-rules.md`, `business.rules.md` | Contexto de proyecto, fuente de HU | Intencion mapeada, precondiciones validadas, skill correcto delegado y bloqueo claro ante faltantes. |
| Implementada | Gestion de contexto de proyecto | Mantener contexto funcional y herramienta fuente por proyecto. | `context-service.md`, `connection-service.md`, `ai/projects/{project}/business-context/` | Datos minimos de negocio, fuente oficial | Contexto suficiente persistido, herramienta registrada y flujo bloqueado si falta informacion critica. |
| Implementada | Lectura y normalizacion de HU | Obtener HU reales o manuales y normalizarlas con trazabilidad. | `read-us.md` command/skill, `hu-service.md`, `connection-service.md` | Contexto, fuente definida, permisos si aplica | HU persistida en `source/vN`, metadata creada y summary actualizado. |
| Implementada | Analisis de HU | Evaluar suficiencia, claridad, riesgos, testeabilidad y gaps. | `analyze-us.md` command/skill, `validation-service.md` | HU leida, contexto | `analysis/vN` con `analysis.md`, `metadata.json`, `summary.json` y clasificacion de suficiencia. |
| Implementada | Enriquecimiento de HU | Mejorar HU bajo estrategia aprobada sin inventar reglas. | `enrich-us.md` command/skill, `strategy-service.md`, catalogo de enriquecimiento | Analisis, estrategia seleccionada o default aprobada | HU enriquecida versionada, estrategia registrada, pendientes separados de hechos. |
| Implementada | Explicacion de requerimientos | Explicar alcance funcional sin modificar ni enriquecer. | `explain-requirements.md` command/skill | Contexto, fuente, HU o requerimiento | Explicacion clara con hechos, vacios y preguntas abiertas. |
| Implementada | Planes de prueba | Generar plan versionado con metodologia QA aprobada. | `generate-test-plan.md` command/skill, `strategytest-catalog.json` | HU, contexto, metodologia | `test-plan/vN` persistido, trazable y con criterios de entrada/salida. |
| Implementada | Casos de prueba | Generar casos positivos, negativos, borde y trazables. | `generate-test-cases.md` command/skill | HU, plan o aprobacion para preliminar | `test-cases/vN` con casos trazables, datos esperados y resultados esperados. |
| Implementada | Matriz de trazabilidad | Conectar HU, criterios, plan, casos y cobertura. | `generate-test-matrix.md` command/skill | Casos existentes | Matriz individual o global versionada con ultimas versiones usadas. |
| Implementada | Versionamiento y summaries | Preservar historial, metadata y estado por artefacto. | `versioning-service.md`, `summary-service.md`, `artifact-service.md`, `logging-service.md` | Artefacto aprobado | Version nueva sin sobrescritura, summary actualizado y log registrado. |
| Implementada | Azure DevOps Work Items | Leer y sincronizar Work Items reales con seguridad. | `connection-service.md`, `sync_work_item.py`, `bulk_analyze_enrich_sync.py`, contexto Nexus CRM | `.env`, `tool-connection.json`, permisos | Work Item validado por ID/proyecto, secretos fuera del repo y metadata QA registrada. |
| Parcial | Microsoft Planner via MCP | Gestionar lectura, creacion y edicion segura de tareas Planner. | `planner-mcp-service.md`, `connect-planner.md`, `planner-task.md` | MCP externo, login navegador, permisos | Completo cuando existan herramientas MCP activas verificadas y flujos ejecutados con ETag. |
| Parcial | Jira/Trello/Excel providers | Soportar fuentes alternativas de HU. | `read-us.md`, `hu-service.md`, `connection-service.md` | Configuracion por proyecto y conectores/scripts | Completo cuando cada provider tenga flujo probado, errores documentados y persistencia uniforme. |
| Parcial | Automatizacion Playwright TypeScript | Generar proyecto automatizado UI/API/E2E trazable. | `test-automation-agent.md`, `generate-test-automation.md`, `automation-catalog.json`, templates Playwright | HU enriquecida, plan, casos, datos, locators | Completo cuando ejecucion, evidencias y cierre de pendientes reales esten integrados. |
| Parcial | Analisis OpenAPI/Swagger | Derivar endpoints y casos API desde contratos. | `api-analysis-service.md`, automatizacion API generada en artifacts | Contrato valido local o leido por flujo aprobado | Completo cuando schema validation, negative testing y reportes esten verificados end-to-end. |
| Parcial | Datos de prueba y locators | Centralizar datos y selectores para automatizacion mantenible. | `test-data-service.md`, `locator-service.md`, templates | Casos automatizables, UI/API conocidas | Completo cuando exista resolucion real por proyecto y validacion contra app/contrato. |
| Parcial | Ejecucion de automatizacion | Ejecutar tests generados y capturar evidencias. | `test-execution-service.md`, proyectos Playwright | Dependencias instaladas, `BASE_URL`, datos QA, rutas | Completa cuando todos los runs queden normalizados como `executions/run-NNN` con reportes, screenshots/traces/logs y summary con passed/failed. |
| Pendiente | Coverage Analysis | Medir cobertura funcional y automatizada. | Futuro `coverage-service` o extension de `validation-service` | HU, criterios, casos, matriz, automatizacion | Brechas cuantificadas, cobertura por HU/criterio/caso y recomendaciones. |
| Pendiente | Impact Analysis | Identificar impacto de cambios sobre artefactos y automatizacion. | Futuro `impact-analysis-service` | Versiones historicas, summaries, trazabilidad | Lista de artefactos afectados, riesgo, pruebas sugeridas y acciones recomendadas. |
| Implementada | Gobierno de releases | Mantener historial formal de evolucion del producto. | `docs/releases.md`, `docs/roadmap.md`, `docs/backlog.md` | Disciplina de actualizacion | Cada cambio relevante queda asociado a version, capacidad y backlog. |
