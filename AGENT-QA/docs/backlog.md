# Backlog Priorizado - AGENT-QA

## Proposito

Este backlog convierte el roadmap y catalogo de capacidades en trabajo planificable. No implementa funcionalidades; ordena el trabajo futuro.

## Epica 1 - Gobierno y Compatibilidad del Producto

Objetivo: Mantener AGENT-QA evolucionando como producto sin romper la arquitectura actual.

### Feature 1.1 - Gobierno documental oficial

Tareas tecnicas:

- Mantener sincronizados `roadmap`, `capabilities`, `architecture-evolution`, `releases` y `backlog`.
- Agregar checklist de actualizacion documental para cambios futuros.
- Referenciar estos documentos desde README o AGENTS cuando se apruebe.

### Feature 1.2 - Auditoria de consistencia documental

Tareas tecnicas:

- Revisar referencias obsoletas a rutas antiguas.
- Corregir mojibake/acentos en documentacion existente sin alterar reglas.
- Alinear docs existentes con services actuales agregados: API, locators, test data y execution.

## Epica 2 - Cierre de Automatizacion Playwright

Objetivo: Convertir la generacion Playwright parcial en un flujo validable con evidencias.

### Feature 2.1 - Ejecucion controlada

Tareas tecnicas:

- Formalizar contrato operativo de `test-execution-service.md`.
- Ejecutar `npm install` y `npx playwright test` en proyectos generados cuando el usuario lo solicite.
- Guardar runs bajo `test-automation/executions/run-NNN/`.
- Actualizar `summary.json` con passed, failed, status y fecha.

### Feature 2.2 - Evidencias de automatizacion

Tareas tecnicas:

- Persistir reportes HTML, traces, screenshots, videos y logs.
- Registrar ruta de evidencia en metadata.
- Definir limpieza de artefactos pesados sin perder trazabilidad.

### Feature 2.3 - Pendientes reales de ambiente

Tareas tecnicas:

- Definir plantilla de `.env.example` por proyecto de automatizacion.
- Documentar `BASE_URL`, rutas, usuarios QA, datos y locators requeridos.
- Agregar validacion previa que bloquee ejecucion si faltan datos criticos.

## Epica 3 - Automatizacion API por Contrato

Objetivo: Completar el flujo Swagger/OpenAPI a pruebas API ejecutables.

### Feature 3.1 - Analisis de contrato robusto

Tareas tecnicas:

- Validar entrada `openapi.json`, `swagger.json`, `openapi.yaml` o `swagger.yaml`.
- Extraer endpoints, metodos, parametros, seguridad, payloads y responses.
- Registrar endpoints cubiertos en metadata.

### Feature 3.2 - Validacion de schema y negativos

Tareas tecnicas:

- Generar validaciones de status y body.
- Incluir casos negativos soportados por contrato.
- Documentar limites cuando el contrato no exponga ejemplos suficientes.

## Epica 4 - Coverage Analysis

Objetivo: Medir brechas de cobertura entre requerimientos, casos, matriz y automatizacion.

### Feature 4.1 - Modelo de cobertura QA

Tareas tecnicas:

- Definir metricas por HU, criterio, caso y automatizacion.
- Resolver fuentes: `summary.json`, matrices, casos y metadata de automation.
- Definir salida versionada de coverage.

### Feature 4.2 - Reporte de brechas

Tareas tecnicas:

- Identificar criterios sin caso.
- Identificar casos sin automatizacion.
- Identificar automatizaciones sin trazabilidad clara.
- Proponer siguiente accion sin modificar artefactos automaticamente.

## Epica 5 - Impact Analysis

Objetivo: Evaluar impacto de cambios funcionales o tecnicos antes de regenerar artefactos.

### Feature 5.1 - Deteccion de cambios

Tareas tecnicas:

- Comparar versiones de HU enriquecida, plan, casos y automation metadata.
- Identificar campos o secciones modificadas.
- Registrar impacto por tipo de artefacto.

### Feature 5.2 - Recomendacion de regresion

Tareas tecnicas:

- Sugerir casos afectados.
- Sugerir automatizaciones a reejecutar o regenerar.
- Priorizar por criticidad y trazabilidad.

## Epica 6 - Providers y Multi-Herramienta

Objetivo: Completar soporte real y uniforme para fuentes no Azure DevOps.

### Feature 6.1 - Planner MCP operativo

Tareas tecnicas:

- Verificar disponibilidad de capacidades MCP.
- Validar login, permisos y ETag.
- Probar lectura, creacion y edicion con aprobacion explicita.

### Feature 6.2 - Jira, Trello, Excel y archivo local

Tareas tecnicas:

- Completar contratos por provider.
- Validar errores 401, 403, 404 y proyecto incorrecto.
- Unificar metadata y summaries por fuente.

## Proxima Prioridad Recomendada

La siguiente epica recomendada es Epica 2 - Cierre de Automatizacion Playwright, porque ya existe generacion parcial y evidencia en Nexus CRM, pero falta convertirla en ejecucion controlada con evidencias y cierre de feedback.

