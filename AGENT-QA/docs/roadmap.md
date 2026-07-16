# Roadmap de Evolucion - AGENT-QA

## Proposito

Este roadmap gobierna la evolucion de AGENT-QA como producto de software. Toda nueva capacidad debe planificarse aqui, relacionarse con `docs/capabilities.md` y aterrizarse en `docs/backlog.md` antes de implementarse.

## Estado Actual

AGENT-QA cuenta con una arquitectura modular bajo `ai/` con agentes, comandos, skills, services, configuracion, proyectos persistidos y scripts de soporte. El flujo funcional QA ya cubre lectura, analisis, enriquecimiento, explicacion, plan, casos, matriz y generacion inicial de automatizacion Playwright TypeScript. La ejecucion automatizada, inteligencia QA avanzada, analisis de cobertura e impacto estan documentados parcialmente o pendientes de consolidacion.

## Roadmap por Versiones

| Version | Nombre | Estado | Objetivo |
|---|---|---|---|
| v1.0 | Arquitectura QA Base | Implementada | Establecer arquitectura `agents`, `commands`, `skills`, `services`, `config` y `projects`. |
| v1.1 | Gobierno de Contexto y Proyectos | Implementada | Gestionar contexto de negocio, herramienta fuente, persistencia por proyecto y reglas anti-invencion. |
| v1.2 | Ciclo QA Conversacional | Implementada | Orquestar lectura, analisis, enriquecimiento, explicacion, plan, casos y matriz mediante QA Master. |
| v1.3 | Integracion Azure DevOps | Implementada | Leer y sincronizar Work Items reales con validacion de proyecto, PAT externo y metadata QA. |
| v1.4 | Catalogos de Estrategias QA | Implementada | Resolver estrategias de enriquecimiento, metodologias de plan y frameworks desde catalogos versionables. |
| v1.5 | Automatizacion Playwright TypeScript | Parcial | Generar proyectos Playwright trazables desde HU enriquecida, plan y casos; dejar pendientes visibles cuando falten datos reales. |
| v1.6 | Gobierno de Evolucion del Producto | Implementada | Formalizar roadmap, capabilities, arquitectura evolutiva, releases y backlog como sistema oficial de gobierno. |
| v1.7 | Automatizacion API por Contrato | Parcial | Analizar Swagger/OpenAPI y generar pruebas API Playwright con endpoints, payloads y validaciones derivadas. |
| v1.8 | Ejecucion Controlada y Evidencias | Pendiente | Ejecutar automatizacion generada, capturar reportes, trazas, screenshots, logs y actualizar summaries. |
| v1.9 | Coverage Analysis | Pendiente | Medir cobertura entre HU, criterios, plan, casos, matriz y automatizacion. |
| v1.10 | Impact Analysis | Pendiente | Determinar impacto de cambios en HU, reglas o artefactos sobre casos, matrices y automatizacion existente. |
| v2.0 | QA Intelligence Platform | Pendiente | Consolidar inteligencia QA sobre riesgos, brechas, priorizacion, regresion sugerida y gobierno multi-proyecto. |

## Reglas de Uso

- Una version no debe marcarse implementada si solo esta documentada.
- Las capacidades parciales deben declarar sus brechas en `docs/capabilities.md`.
- El backlog debe priorizar cerrar brechas antes de crear capacidades nuevas no esenciales.
- Los cambios funcionales deben preservar compatibilidad con `ai/config/agent-rules.md` y `ai/config/business.rules.md`.
