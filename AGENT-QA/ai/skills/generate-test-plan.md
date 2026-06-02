---
name: generate-test-plan
description: Skill especializado en generar planes de prueba versionados usando metodologias QA dinamicas, HU trazable y contexto del proyecto.
---

# SKILL - GENERATE TEST PLAN

## Objetivo

Generar planes de prueba completos, estructurados y aplicables en entornos reales QA.

El plan debe:

- alinearse al contexto del proyecto
- alinearse a la HU normalizada o enriquecida
- usar analisis y explicacion funcional cuando existan
- seguir la metodologia QA seleccionada desde catalogo
- mantener trazabilidad funcional
- permitir ejecucion real de pruebas
- servir como base para casos y matriz de pruebas

---

# Principio de arquitectura

Este skill NO debe hardcodear metodologias ni duplicar validaciones.

Debe apoyarse en:

| Responsabilidad | Servicio |
|---|---|
| Validar contexto del proyecto | `ai/services/context-service.md` |
| Resolver HU, provider e ID | `ai/services/hu-service.md` |
| Validar suficiencia y consistencia | `ai/services/validation-service.md` |
| Cargar metodologia y archivo de reglas | `ai/services/strategy-service.md` |
| Construir prompt final con contexto y metodologia | `ai/services/prompt-service.md` |
| Persistir plan generado | `ai/services/artifact-service.md` |
| Versionar si ya existe plan previo | `ai/services/versioning-service.md` |
| Registrar resumen historico | `ai/services/summary-service.md` |
| Registrar eventos y errores | `ai/services/logging-service.md` |

---

# Entradas esperadas

Este skill puede recibir:

- HU normalizada desde `read-us.md`
- analisis generado por `analyze-us.md`
- HU enriquecida y versionada desde `enrich-us.md`
- explicacion funcional desde `explain-requirements.md`
- contexto del proyecto
- reglas de negocio
- prioridad
- origen y provider
- metodologia QA indicada por el usuario, si existe

La HU puede provenir de:

- Jira
- Azure DevOps
- Planner
- Trello
- Excel
- texto manual
- archivo local
- contexto activo

---

# Dependencias obligatorias

Antes de generar el plan:

1. Verificar HU valida.
2. Verificar contexto suficiente.
3. Verificar herramienta de gestion o fuente de HU.
4. Verificar que exista informacion funcional suficiente para planificar pruebas.
5. Verificar existencia de `ai/config/qa-testplan-options/strategytest-catalog.json`.
6. Leer el catalogo de metodologias QA.
7. Resolver metodologia por defecto o metodologia indicada por el usuario.
8. Solicitar confirmacion antes de aplicar cualquier metodologia.

---

# Si NO existe HU

Responder:

> No se encontro una Historia de Usuario valida para generar el plan de pruebas.

Sugerir:

- ejecutar `/read-us`
- ejecutar `/analyze-us`
- ejecutar `/enrich-us`
- proporcionar HU manualmente

No continuar.

---

# Si NO existe contexto

Responder:

> No existe suficiente contexto funcional para generar un plan de pruebas coherente.

Solicitar:

- flujo funcional
- objetivo de negocio
- integraciones
- restricciones
- tipos de usuarios
- comportamiento esperado
- ambientes conocidos

No inventar informacion.

---

# Si NO existe herramienta o fuente

Responder:

> No existe una herramienta de gestion o fuente definida para el proyecto. Antes de generar el plan necesito saber si la HU viene de Jira, Azure DevOps, Planner, Trello, Excel, archivo local, texto manual u otra fuente.

No continuar hasta registrar la herramienta o fuente.

---

# Validacion previa de suficiencia

Antes de seleccionar metodologia, revisar `sufficiency_status`:

| Estado | Accion |
|---|---|
| `insufficient` | Detener generacion y solicitar informacion faltante |
| `sufficient_not_enriched` | Permitir plan preliminar solo si el usuario lo aprueba |
| `already_enriched` | Generar plan usando HU enriquecida como fuente principal |

Si no existe `sufficiency_status`, usar `validation-service.md` para clasificar antes de continuar.

---

# Seleccion de metodologia QA

## Catalogo oficial

El catalogo oficial esta en:

```text
ai/config/qa-testplan-options/strategytest-catalog.json
```

Este archivo define:

- `default_strategy_id`
- lista de `strategies`
- `id`
- `name`
- `summary`
- `preview`
- `rule_file`

---

## Flujo obligatorio

1. Leer `ai/config/qa-testplan-options/strategytest-catalog.json`.
2. Identificar `default_strategy_id`.
3. Buscar la metodologia default en `strategies`.
4. Informar al usuario la metodologia por defecto con:
   - `id`
   - `name`
   - `summary`
   - `preview`
5. Preguntar:

> La metodologia QA por defecto es "{name}". {summary}. {preview}. Deseas continuar con esta metodologia, escoger otra o ver todas las opciones disponibles?

6. No generar el plan hasta que el usuario confirme una opcion.

---

## Si el usuario acepta la metodologia por defecto

Usar la metodologia cuyo `id` coincide con `default_strategy_id`.

Luego:

1. Leer el `rule_file`.
2. Aplicar estrictamente sus reglas.
3. Mantener trazabilidad de metodologia aplicada.

---

## Si el usuario quiere escoger otra metodologia

Solicitar el `id` o nombre de la metodologia.

Si el usuario no sabe que opciones hay, mostrar y explicar todas las opciones del catalogo.

La explicacion debe usar unicamente:

- `id`
- `name`
- `summary`
- `preview`

Formato requerido:

| ID | Nombre | Resumen | Cuando conviene |
|---|---|---|---|

Donde:

- `Resumen` usa `summary`
- `Cuando conviene` usa `preview`

---

## Si la metodologia indicada no existe

1. Informar que la metodologia no fue encontrada.
2. Mostrar las opciones disponibles desde el catalogo.
3. Preguntar nuevamente cual desea usar.
4. No aplicar fallback silencioso.

Solo usar default como fallback si el usuario lo aprueba.

---

# Aplicacion de metodologia

Cuando la metodologia sea seleccionada y confirmada:

1. Identificar `rule_file`.
2. Leer dinamicamente el archivo correspondiente.
3. Aplicar estrictamente:
   - reglas
   - estructura
   - formato
   - cobertura
   - restricciones
4. Registrar:
   - metodologia aplicada
   - archivo de reglas usado
   - HU relacionada
   - proyecto
   - version generada
   - fuente de la HU

---

# Estructura obligatoria del plan

Todo plan de pruebas debe iniciar con un encabezado visible.

## 1. Encabezado visible

Formato obligatorio:

```md
# Plan de pruebas - {HU_ID}: {TITULO}

| Campo | Valor |
|---|---|
| Proyecto | {PROJECT_NAME} |
| Origen | {PROVIDER_OR_SOURCE} |
| HU version base | {HU_VERSION} |
| Metodologia QA | {METHODOLOGY_ID} - {METHODOLOGY_NAME} |
| Prioridad | {PRIORIDAD} |
| Cobertura esperada | {COBERTURA_BREVE} |
| Version del plan | {VERSION} |
| Estado | Pendiente de aprobacion / Aprobado |
```

Reglas del encabezado:

- `Metodologia QA` debe usar `id` y `name` del catalogo.
- `Cobertura esperada` debe ser breve y basada en HU, analisis, explicacion o metodologia.
- `Prioridad` debe venir de la HU, herramienta origen, usuario o contexto.
- Si no existe prioridad, usar `Pendiente de definicion`, no inventarla.
- `Version del plan` debe venir de `versioning-service.md`.

---

## 2. Objetivo

Definir:

- proposito del testing
- alcance funcional
- valor esperado
- relacion con HU o requerimiento

---

## 3. Alcance

Definir:

### Incluye

- funcionalidades cubiertas
- modulos
- validaciones
- reglas de negocio cubiertas

### No incluye

- exclusiones
- restricciones
- fuera de alcance
- informacion pendiente

---

## 4. Estrategia de pruebas

Definir:

- enfoque QA
- metodologia aplicada
- profundidad esperada
- enfoque funcional o tecnico
- criterios de priorizacion

---

## 5. Tipos de prueba

Identificar segun contexto:

- funcional
- regresion
- integracion
- smoke
- exploratorio
- usabilidad
- API
- rendimiento
- seguridad
- automatizacion

No incluir tipos sin evidencia o sin aplicabilidad; si son recomendados pero no confirmados, marcarlos como sugeridos.

---

## 6. Riesgos

Identificar:

- funcionales
- tecnicos
- operativos
- dependencias
- cobertura
- ambientes
- datos
- integraciones

---

## 7. Ambientes

Definir solo si estan documentados:

- QA
- staging
- integracion
- preproduccion

Si no estan definidos, marcar `Pendiente de definicion`.

---

## 8. Dependencias

Identificar solo si existen en HU, contexto o artefactos previos:

- APIs
- terceros
- servicios externos
- modulos relacionados
- datos requeridos
- usuarios o permisos

---

## 9. Criterios de entrada

Definir condiciones minimas para iniciar pruebas.

---

## 10. Criterios de salida

Definir condiciones minimas para finalizar pruebas.

---

## 11. Cobertura

Explicar:

- funcionalidades cubiertas
- escenarios cubiertos
- exclusiones
- profundidad QA
- trazabilidad con criterios de aceptacion

---

## 12. Supuestos y pendientes

Listar:

- supuestos
- dudas funcionales
- datos faltantes
- decisiones pendientes

---

# Reglas importantes

NO:

- inventar funcionalidades
- inventar integraciones
- inventar ambientes
- inventar arquitectura tecnica
- convertir supuestos en reglas confirmadas

SI:

- mantener trazabilidad con HU
- usar HU enriquecida como fuente principal si existe
- separar confirmado de pendiente
- indicar riesgos y cobertura real
- preparar insumos para casos de prueba

---

# Orden obligatorio de busqueda

Antes de asumir algo:

1. Revisar HU normalizada.
2. Revisar HU enriquecida, si existe.
3. Revisar analisis previo, si existe.
4. Revisar explicacion funcional, si existe.
5. Revisar contexto del proyecto.
6. Revisar reglas de negocio.
7. Revisar metodologia seleccionada.
8. Preguntar al usuario.

---

# Validacion final obligatoria

Antes de finalizar, usar `validation-service.md` para validar:

- claridad
- cobertura
- consistencia
- aplicabilidad real
- trazabilidad
- alineacion con la HU
- ausencia de informacion inventada

---

# Flujo de aprobacion

Despues de generar el plan:

1. Mostrar el plan.
2. Explicar metodologia aplicada.
3. Mostrar riesgos, supuestos y pendientes.
4. Solicitar aprobacion para persistir version en la carpeta de la HU.

---

# Persistencia del artefacto

Si el usuario aprueba guardar:

1. Usar `artifact-service.md`.
2. Crear estructura faltante automaticamente.
3. Usar siempre `versioning-service.md` para crear una version del plan.
4. Registrar metadata de version, metodologia, prioridad, cobertura y origen.
5. Registrar resumen mediante `summary-service.md`.

Ruta objetivo para plan individual:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-plan/
```

Estructura esperada:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-plan/
  v1/
    test-plan.md
    metadata.json
  v2/
    test-plan.md
    metadata.json
  summary.json
```

Ruta objetivo para plan global, si el usuario lo solicita:

```text
ai/projects/{project-slug}/artifacts/global/test-plan/
```

Nunca sobrescribir planes existentes sin aprobacion explicita.

---

# Relacion con otros skills

Este skill puede trabajar despues de:

- `read-us.md`
- `analyze-us.md`
- `enrich-us.md`
- `explain-requirements.md`

Este skill alimenta:

- `generate-test-cases.md`
- `generate-test-matrix.md`

---

# Criterio de finalizacion

El skill finaliza correctamente cuando:

- la metodologia fue seleccionada desde el catalogo
- el usuario confirmo la metodologia
- se aplico el `rule_file`
- se genero encabezado visible con metodologia, HU base, prioridad, cobertura y version
- el plan mantiene trazabilidad con HU y artefactos previos
- se validaron calidad, cobertura y consistencia
- se solicito aprobacion antes de persistir
