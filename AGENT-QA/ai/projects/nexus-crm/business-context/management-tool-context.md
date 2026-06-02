# Contexto de Herramienta de Gestion - Nexus CRM

## Herramienta oficial

Azure DevOps.

## Uso esperado

La gestion funcional y tecnica del proyecto se realizara en Azure DevOps.

Alli se administraran:

- epicas
- features
- historias de usuario
- tareas
- backlog
- bugs
- documentacion funcional y tecnica

## Reglas operativas

- No se debe asumir que el `.env` raiz corresponde al proyecto activo.
- La configuracion no secreta debe permanecer en `ai/projects/nexus-crm/config/tool-connection.json`.
- El PAT de Azure DevOps pertenece a una cuenta o usuario, no al proyecto.
- Antes de leer una HU, se debe validar que el Work Item pertenece al proyecto Azure DevOps configurado.
- Si falla la lectura real del Work Item, se debe detener el flujo y no generar una HU sustituta.
- Azure DevOps usa `tags`, no `labels`, para metadata QA.

## Configuracion de la herramienta

- `organization_url`: Configurado en `tool-connection.json`.
- `project`: Configurado en `tool-connection.json`.
- `team`: Configurado en `tool-connection.json`.
- `work_item_type`: User Story.
- `PAT`: Configurado en `.env` (Variable de entorno).

## Procedimiento de Sincronizacion

Para leer Work Items de Azure DevOps, se utiliza el script `scripts/sync_work_item.py`.
Este script:
1. Lee la configuracion de `tool-connection.json`.
2. Utiliza el PAT del `.env`.
3. Descarga el contenido en formato Markdown en `ai/projects/nexus-crm/artifacts/`.

## Fuente

Informacion proporcionada por la usuaria en conversacion el 2026-05-28.
