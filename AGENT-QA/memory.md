# Agent Memory

## Tipo de memoria

Memoria evolutiva del agente QA.

Esta memoria registra aprendizajes persistentes para evitar repetir errores, mantener decisiones acumuladas y conservar preferencias operativas del proyecto.

---

## Correcciones aprendidas

- No inventar contenido de HU cuando falla la lectura desde Jira, Planner u otra fuente externa.
- No usar un `.env` global como prueba de que el proyecto activo es el correcto.
- Validar siempre contexto de negocio, herramienta de gestion y fuente de HU antes de analizar, enriquecer o generar artefactos.
- Persistir artefactos siempre bajo `ai/projects/{project-slug}/artifacts/{hu-id}/`.
- Crear la carpeta del proyecto antes de guardar contexto, configuracion o artefactos.
- La carpeta `analysis/` de cada HU no debe quedar vacia si `analyze-us` finaliza correctamente.
- El analisis inicial debe guardar estado original de la HU, suficiencia, vacios, riesgos, metadata y summary.
- **Prohibido crear carpetas dispersas:** Toda la documentación de una Historia de Usuario (análisis, enriquecimiento, planes) debe residir exclusivamente en `ai/projects/{project-slug}/artifacts/{hu-id}/`. Está estrictamente prohibido dejar archivos en la raíz del repositorio (`/`) o en carpetas de configuración (`config/`) que pertenezcan a una HU específica.

---

## Preferencias persistentes

- Responder y documentar en espanol.
- Trabajar como QA Lead funcional y de automatizacion.
- Mantener un flujo guiado, paso a paso, sin generar artefactos prematuros.
- Separar hechos, supuestos, bloqueos y pendientes.
- Priorizar trazabilidad real sobre velocidad de generacion.
- No pedir la HU hasta tener contexto minimo y herramienta/fuente definida.
- No guardar tokens, passwords ni secretos en artefactos, summaries, contextos o configuraciones versionadas.
- Para Azure DevOps, no asumir que el `.env` define el proyecto activo; siempre validar `tool-connection.json` por proyecto.
- **Orden Estricto y Limpieza:** Respetar la jerarquía de carpetas. Si se detectan archivos de una HU fuera de su ruta en `artifacts/`, deben ser movidos y las rutas erróneas eliminadas de inmediato.

---

## Comportamiento esperado

1. Leer reglas base antes de ejecutar acciones QA:
   - `ai/agents/qa-master-agent.md`
   - `ai/config/agent-rules.md`
   - `ai/config/business.rules.md`
2. Validar o crear contexto del proyecto.
3. Validar herramienta de gestion o fuente de HU.
4. Leer HU mediante `read-us`.
5. Analizar HU mediante `analyze-us`.
6. Enriquecer solo si aplica y con estrategia confirmada.
7. Generar planes, casos, matrices o automatizacion solo con precondiciones cumplidas.
8. Bloquear el flujo ante ambiguedad critica, falta de permisos o falta de HU real.

---

## Decisiones acumuladas

- La ruta oficial del sistema es `ai/`, no `.github/ai/`.
- Los proyectos viven en `ai/projects/{project-slug}/`.
- Cada proyecto debe tener su propio `business-context/`, `config/`, `artifacts/` y `logs/`.
- La configuracion no secreta de herramientas debe ir en `ai/projects/{project-slug}/config/tool-connection.json`.
- Para Jira, el token pertenece a una cuenta Atlassian, no a un proyecto.
- Para Jira, cada proyecto debe validar `base_url`, `project_key` e `issue.key` antes de trabajar una HU.
- Para Planner, la autenticacion debe hacerse mediante MCP externo con login por navegador.
- Para Azure DevOps, el PAT pertenece a una cuenta/usuario, no al proyecto.
- Para Azure DevOps, cada proyecto debe validar `organization_url`, `project` y `System.Id` antes de trabajar una HU.
- Azure DevOps usa `tags`, no `labels`, para metadata QA.
- Los artefactos por HU deben versionarse con `v1`, `v2`, `v3`, sin sobrescribir versiones anteriores.

---

## Pendientes de memoria

- Registrar nuevas correcciones aprendidas cuando aparezcan errores de flujo.
- Agregar preferencias del usuario cuando se confirmen explicitamente.
- Actualizar decisiones acumuladas cuando cambie la arquitectura del sistema.
