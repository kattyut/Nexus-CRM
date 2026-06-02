# PROMPT SERVICE

## Objetivo

Centralizar:

- carga de prompts
- construccion dinamica de prompts
- inyeccion de contexto
- composicion de instrucciones
- manejo de placeholders
- trazabilidad de prompts utilizados

Este servicio evita:

- prompts hardcodeados
- logica distribuida
- duplicacion de instrucciones
- inconsistencias entre agentes, commands y skills

---

# Ubicacion

```text
ai/services/prompt-service.md
```

---

# Responsabilidades

El Prompt Service debe:

- cargar prompts base o templates
- reemplazar placeholders
- inyectar contexto
- inyectar reglas dinamicas
- inyectar estrategia o metodologia seleccionada
- ensamblar prompts finales
- validar prompts antes de ejecutar
- registrar prompts usados
- soportar multiples estrategias
- soportar multiples proyectos
- soportar versionamiento de artefactos

---

# Estructura de templates

Ruta sugerida:

```text
ai/templates/
```

Templates sugeridos:

- `enrich-us.template.md`
- `test-plan.template.md`
- `test-cases.template.md`
- `test-matrix.template.md`
- `explain-requirements.template.md`

Si no existe template fisico, el skill puede construir el prompt usando sus reglas internas, pero debe mantener trazabilidad de instrucciones aplicadas.

---

# Reglas importantes

El Prompt Service NO debe:

- generar logica QA
- generar artefactos finales
- validar reglas funcionales
- decidir metodologias

Eso pertenece a:

- `strategy-service.md`
- `validation-service.md`
- `skills/`

---

# Flujo obligatorio

## Paso 1 - Identificar tipo de prompt

Ejemplos:

- `enrich-us`
- `test-plan`
- `test-cases`
- `test-matrix`
- `explain-requirements`

## Paso 2 - Cargar template base

Buscar, si existe:

```text
ai/templates/{template-name}
```

## Paso 3 - Cargar contexto del proyecto

Leer contexto desde:

```text
ai/projects/{project-slug}/business-context/
```

## Paso 4 - Cargar artefactos fuente

Cuando aplique, leer ultimas versiones desde:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/
ai/projects/{project-slug}/artifacts/global/
```

## Paso 5 - Cargar estrategia o metodologia activa

Usar `strategy-service.md` para resolver:

- estrategia de enriquecimiento
- metodologia QA para plan
- `rule_file` asociado

## Paso 6 - Inyectar placeholders

Reemplazar placeholders soportados.

## Paso 7 - Validar placeholders faltantes

Si falta informacion critica:

- solicitar datos al usuario
- detener ejecucion
- nunca inventar informacion

## Paso 8 - Construir prompt final

El prompt final debe ser:

- limpio
- consistente
- sin placeholders vacios criticos
- contextualizado
- trazable

---

# Placeholders soportados

| Placeholder | Descripcion |
|---|---|
| `{{PROJECT_NAME}}` | Nombre del proyecto |
| `{{PROJECT_SLUG}}` | Slug tecnico |
| `{{BUSINESS_CONTEXT}}` | Contexto de negocio |
| `{{USER_STORY}}` | Historia de usuario |
| `{{HU_ID}}` | ID de la HU |
| `{{HU_TITLE}}` | Nombre de la HU |
| `{{SOURCE_PROVIDER}}` | Jira, Azure DevOps, Planner, Trello, Excel, manual o archivo |
| `{{PLANNER_TASK_ID}}` | ID de tarea Planner cuando aplique |
| `{{PLANNER_PLAN_ID}}` | ID de plan Planner cuando aplique |
| `{{PLANNER_BUCKET_ID}}` | ID de bucket Planner cuando aplique |
| `{{PLANNER_TASK_ETAG}}` | ETag de tarea Planner para actualizacion segura |
| `{{PLANNER_DETAILS_ETAG}}` | ETag de detalles Planner para actualizacion segura |
| `{{PRIORITY}}` | Prioridad |
| `{{STRATEGY_ID}}` | ID de estrategia |
| `{{STRATEGY_NAME}}` | Nombre de estrategia |
| `{{STRATEGY_RULES}}` | Reglas de estrategia |
| `{{METHODOLOGY_ID}}` | ID de metodologia QA |
| `{{METHODOLOGY_NAME}}` | Nombre de metodologia QA |
| `{{METHODOLOGY_RULES}}` | Reglas de metodologia |
| `{{TEST_PLAN}}` | Plan de pruebas |
| `{{TEST_CASES}}` | Casos de prueba |
| `{{TEST_MATRIX_MODE}}` | individual o global |
| `{{CURRENT_VERSION}}` | Version actual |
| `{{ARTIFACT_HISTORY}}` | Historial de cambios |

---

# Contexto obligatorio

Todo prompt debe incluir:

- contexto de negocio
- herramienta de gestion o fuente de HU
- restricciones
- reglas importantes
- estrategia o metodologia activa
- artefactos previos relevantes
- reglas anti-invencion
- trazabilidad de versiones

---

# Reglas anti-invencion

Todo prompt generado debe incluir:

- no inventar reglas
- no inventar integraciones
- no inventar comportamiento
- preguntar si falta contexto
- preguntar si falta herramienta de gestion o fuente
- usar unicamente informacion validada
- separar hechos, supuestos y pendientes

---

# Persistencia

Guardar metadata en:

```text
ai/projects/{project-slug}/logs/prompt-history.json
```

Metadata minima:

```json
{
  "timestamp": "2026-05-19T14:22:00Z",
  "project": "banking-app",
  "agent": "enrich-us",
  "template": "enrich-us.template.md",
  "strategy": "clasica_scrum",
  "methodology": "",
  "user_story": "MCA-1",
  "version": "v1"
}
```
