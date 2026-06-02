---
name: enrich-us
description: Skill especializado en enriquecer Historias de Usuario usando estrategias dinamicas definidas en ai/config/enrichment-options.
---

# SKILL - ENRICH USER STORY

## Objetivo

Transformar una Historia de Usuario en una HU clara, consistente, testeable, refinada y alineada al negocio.

El enriquecimiento debe usar:

- HU normalizada por `read-us.md`
- analisis previo de `analyze-us.md`, si existe
- contexto del proyecto
- reglas de negocio
- estrategia de enriquecimiento seleccionada desde `ai/config/enrichment-options/strategy-catalog.json`

Este skill NO debe inventar funcionalidades, reglas, integraciones ni decisiones tecnicas.

---

# Principio de arquitectura

Este skill NO debe concentrar logica pesada ni hardcodear estrategias.

Debe apoyarse en:

| Responsabilidad | Servicio |
|---|---|
| Validar contexto del proyecto | `ai/services/context-service.md` |
| Resolver HU, provider e ID | `ai/services/hu-service.md` |
| Validar suficiencia, consistencia y trazabilidad | `ai/services/validation-service.md` |
| Cargar estrategia y archivo de reglas | `ai/services/strategy-service.md` |
| Construir prompt final con contexto y estrategia | `ai/services/prompt-service.md` |
| Validar conexion y actualizar herramienta origen | `ai/services/connection-service.md` |
| Persistir artefacto generado | `ai/services/artifact-service.md` |
| Versionar si ya existe artefacto | `ai/services/versioning-service.md` |
| Registrar resumen historico | `ai/services/summary-service.md` |
| Registrar eventos y errores | `ai/services/logging-service.md` |

---

# Entradas esperadas

Este skill recibe:

- Historia de Usuario normalizada
- contexto del proyecto
- clasificacion de suficiencia
- analisis previo, si existe
- reglas del proyecto
- origen de la HU
- estrategia seleccionada, si el usuario ya la indico
- prioridad, si existe en la fuente o fue indicada por el usuario
- contexto resumido de la HU, si existe

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

Antes de enriquecer:

1. Verificar HU valida.
2. Verificar contexto suficiente.
3. Verificar herramienta de gestion o fuente de HU.
4. Verificar que la HU fue leida y normalizada mediante `read-us.md`.
5. Verificar que existe analisis previo o clasificacion de suficiencia.
6. Verificar existencia de `ai/config/enrichment-options/strategy-catalog.json`.
7. Leer el catalogo de estrategias.
8. Resolver estrategia por defecto o estrategia indicada por el usuario.
9. Solicitar confirmacion antes de aplicar cualquier estrategia.

---

# Si NO existe HU

Responder:

> No se encontro una Historia de Usuario valida para enriquecer.

Sugerir:

- ejecutar `/read-us`
- proporcionar HU manualmente
- indicar ID y fuente de la HU

No continuar.

---

# Si NO existe contexto

Responder:

> No existe suficiente contexto funcional del proyecto para enriquecer la historia correctamente.

Solicitar:

- flujo funcional
- reglas de negocio
- comportamiento esperado
- restricciones
- integraciones
- usuarios involucrados

No inventar informacion.

---

# Validacion por suficiencia

Antes de seleccionar estrategia, revisar `sufficiency_status`:

| Estado | Accion |
|---|---|
| `insufficient` | Detener enriquecimiento y solicitar informacion faltante |
| `sufficient_not_enriched` | Permitir seleccionar estrategia y pedir confirmacion |
| `already_enriched` | Informar que ya esta enriquecida y ofrecer mejoras incrementales |

Si no existe `sufficiency_status`, usar `validation-service.md` para clasificar la HU antes de continuar.

Si no existe analisis previo ni clasificacion de suficiencia, detener el enriquecimiento y solicitar `analyze-us` primero.

---

# Seleccion de estrategia

## Catalogo oficial

El catalogo oficial esta en:

```text
ai/config/enrichment-options/strategy-catalog.json
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

1. Leer `ai/config/enrichment-options/strategy-catalog.json`.
2. Identificar `default_strategy_id`.
3. Buscar la estrategia default en `strategies`.
4. Informar al usuario la estrategia por defecto con:
   - `id`
   - `name`
   - `summary`
   - `preview`
5. Preguntar:

> La estrategia por defecto es "{name}". {summary}. {preview}. Deseas continuar con esta estrategia, escoger otra o ver todas las opciones disponibles?

6. No enriquecer hasta que el usuario confirme una opcion.

---

## Si el usuario acepta la estrategia por defecto

Usar la estrategia cuyo `id` coincide con `default_strategy_id`.

Luego:

1. Leer el `rule_file`.
2. Aplicar estrictamente sus reglas.
3. Mantener trazabilidad de estrategia aplicada.

---

## Si el usuario quiere escoger otra estrategia

Solicitar el `id` o nombre de la estrategia.

Si el usuario no sabe que opciones hay, mostrar y explicar todas las opciones del catalogo.

La explicacion debe usar unicamente:

- `id`
- `name`
- `summary`
- `preview`

No inventar beneficios ni usos adicionales.

Formato requerido:

| ID | Nombre | Resumen | Cuando conviene |
|---|---|---|---|

Donde:

- `Resumen` usa `summary`
- `Cuando conviene` usa `preview`

---

## Si la estrategia indicada no existe

1. Informar que la estrategia no fue encontrada.
2. Mostrar las opciones disponibles desde el catalogo.
3. Preguntar nuevamente cual desea usar.
4. No aplicar fallback silencioso.

Solo usar default como fallback si el usuario lo aprueba.

---

# Aplicacion de estrategia

Cuando la estrategia sea seleccionada y confirmada:

1. Identificar `rule_file`.
2. Leer dinamicamente el archivo correspondiente.
3. Aplicar estrictamente:
   - reglas
   - restricciones
   - estructura
   - formato de salida
   - validaciones
4. Registrar:
   - estrategia aplicada
   - archivo de reglas usado
   - HU relacionada
   - proyecto
   - version generada
   - herramienta origen

---

# Reglas generales de enriquecimiento

El enriquecimiento debe:

- mejorar claridad
- mejorar entendimiento funcional
- mejorar precision
- mejorar testeabilidad
- mejorar cobertura QA
- mejorar trazabilidad
- respetar el origen de la HU
- conservar informacion original util

---

# Informacion que puede agregarse

Permitido agregar cuando derive de la HU, contexto o reglas existentes:

- criterios de aceptacion
- escenarios alternativos
- escenarios de error
- reglas funcionales
- dependencias explicitas
- supuestos claramente marcados
- restricciones funcionales
- criterios verificables

---

# Informacion NO permitida

NO inventar:

- funcionalidades nuevas
- reglas inexistentes
- integraciones no confirmadas
- validaciones tecnicas no documentadas
- comportamiento de negocio no especificado
- decisiones de arquitectura

---

# Orden obligatorio de busqueda

Antes de asumir algo:

1. Revisar la HU.
2. Revisar contexto del proyecto.
3. Revisar reglas de negocio.
4. Revisar analisis previo.
5. Revisar estrategia seleccionada.
6. Preguntar al usuario.

---

# Estructura minima obligatoria

Toda HU enriquecida debe contener:

## 1. Encabezado visible

El artefacto enriquecido debe iniciar con un encabezado visible y breve para que el lector identifique rapidamente metodologia, contexto y prioridad.

Formato obligatorio:

```md
# HU enriquecida - {HU_ID}: {TITULO}

| Campo | Valor |
|---|---|
| Proyecto | {PROJECT_NAME} |
| Origen | {PROVIDER_OR_SOURCE} |
| Metodologia / estrategia | {STRATEGY_ID} - {STRATEGY_NAME} |
| Contexto breve | {RESUMEN_CORTO_DE_LA_HU} |
| Prioridad | {PRIORIDAD} |
| Version | {VERSION} |
| Estado | Pendiente de aprobacion / Aprobada / Sincronizada |
```

Reglas del encabezado:

- `Metodologia / estrategia` debe usar el `id` y `name` definidos en `strategy-catalog.json`.
- `Contexto breve` debe ser una frase corta basada solo en la HU, contexto o analisis previo.
- `Prioridad` debe venir de la herramienta origen, archivo, usuario o contexto.
- Si no existe prioridad, usar `Pendiente de definicion`, no inventarla.
- `Version` debe venir de `versioning-service.md`.
- `Estado` debe actualizarse segun el flujo de aprobacion y sincronizacion.

## 2. Metadata tecnica

- Proyecto
- HU ID
- Titulo
- Origen
- Provider
- Estrategia aplicada
- Archivo de regla aplicado
- Version
- Prioridad
- Estado de sincronizacion con herramienta origen

## 3. Historia original

Conservar el texto original o la version normalizada sin alterarlo.

## 4. Historia enriquecida

Debe incluir, cuando aplique:

```text
Como [rol]
Quiero [accion]
Para [beneficio]
```

## 5. Contexto funcional

Explicar:

- comportamiento esperado
- objetivo funcional
- impacto de negocio

## 6. Criterios de aceptacion

Minimo:

- flujo feliz
- validaciones
- errores
- restricciones
- comportamiento esperado

Preferiblemente:

```text
Dado
Cuando
Entonces
```

## 7. Reglas de negocio

Identificar:

- restricciones
- validaciones
- permisos
- dependencias
- comportamiento esperado

## 8. Dependencias

Identificar solo si existen en HU, contexto o reglas:

- APIs
- terceros
- integraciones
- modulos relacionados
- prerequisitos

## 9. Supuestos y dudas

Cuando falte informacion, marcar:

- `Supuesto:`
- `Pendiente de validacion:`
- `Duda funcional:`

## 10. Riesgos QA

Listar riesgos funcionales, de cobertura, datos, integracion, seguridad o rendimiento si existen evidencias.

---

# Validacion posterior al enriquecimiento

Despues de enriquecer, usar `validation-service.md` para validar:

- claridad
- consistencia
- trazabilidad
- calidad QA
- cobertura funcional
- alineacion con contexto
- ausencia de informacion inventada

---

# Flujo de aprobacion

Despues del enriquecimiento:

1. Mostrar resultado.
2. Explicar mejoras aplicadas.
3. Mostrar dudas o supuestos pendientes.
4. Solicitar aprobacion para persistir version en la carpeta de la HU.
5. Solicitar aprobacion explicita para actualizar la herramienta origen.

Nunca actualizar automaticamente herramientas externas sin aprobacion explicita.

---

# Persistencia de historias enriquecidas

Si el usuario aprueba guardar:

1. Usar `artifact-service.md`.
2. Crear estructura faltante automaticamente.
3. Usar siempre `versioning-service.md` para crear una version de enriquecimiento.
4. Registrar metadata de version, estrategia, prioridad y origen.
5. Registrar resumen mediante `summary-service.md`.

Ruta objetivo:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/enrich-us/
```

Estructura esperada:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/enrich-us/
  v1/
    enriched-us.md
    metadata.json
  v2/
    enriched-us.md
    metadata.json
  summary.json
```

Nunca sobrescribir archivos existentes sin aprobacion explicita.

---

# Actualizacion de herramienta origen

Si la HU proviene de una herramienta conectada, despues de persistir la version local debe preguntarse al usuario si desea actualizar la herramienta origen.

Herramientas soportadas:

- Jira
- Azure DevOps
- Planner
- Trello
- Excel conectado o archivo local

Flujo obligatorio:

1. Confirmar que existe version local persistida.
2. Mostrar herramienta origen y HU objetivo.
3. Mostrar resumen de campos que se actualizarian.
4. Solicitar aprobacion explicita del usuario.
5. Usar `connection-service.md` para validar conexion y permisos.
6. Actualizar solo los campos aprobados.
7. Registrar resultado en `summary-service.md` y `logging-service.md`.

Campos candidatos para sincronizar:

| Campo | Regla |
|---|---|
| Titulo | Solo si el usuario aprueba cambiarlo |
| Descripcion | Puede incluir HU enriquecida con encabezado visible |
| Criterios de aceptacion | Sincronizar si la herramienta tiene campo compatible |
| Prioridad | Solo si existe campo compatible y valor confirmado |
| Labels / tags | Solo si el usuario aprueba agregarlos |
| Comentario | Recomendado para dejar nota de version y metodologia |

## Reglas especificas para Planner

Planner debe actualizarse mediante MCP externo y `planner-mcp-service.md`.

Antes de crear una tarea Planner:

1. Confirmar solicitud explicita del usuario.
2. Validar conexion con `planner.auth.status`.
3. Validar permiso `Tasks.ReadWrite`.
4. Confirmar `plan_id`, `bucket_id` y titulo.
5. Mostrar campos a crear.
6. Solicitar aprobacion explicita.

Antes de editar una tarea Planner:

1. Leer tarea actual con `planner.tasks.get`.
2. Leer detalles actuales con `planner.taskDetails.get`.
3. Mostrar campos actuales y campos propuestos.
4. Indicar si la HU enriquecida se agregara como seccion/anexo o reemplazara descripcion.
5. Solicitar aprobacion explicita.
6. Usar ETag/`If-Match` valido.

Campos Planner candidatos:

| Campo Planner | Regla |
|---|---|
| `title` | Solo si el usuario aprueba cambiar titulo |
| `plannerTaskDetails.description` | No reemplazar sin confirmacion; preferir agregar seccion controlada |
| `checklist` | Agregar criterios solo si son verificables y aprobados |
| `priority` | Solo si existe valor confirmado |
| `dueDateTime` | Solo si el usuario confirma fecha |
| `bucketId` | Solo si el usuario aprueba mover de bucket |
| `assignments` | Solo si el usuario aprueba asignaciones |

Si ocurre `401`, `403`, `404`, `409` o `412`, detener sincronizacion, conservar version local y explicar siguiente accion.

Comentario sugerido al actualizar herramienta:

```md
HU enriquecida por QA AI Agent.
Metodologia / estrategia: {STRATEGY_ID} - {STRATEGY_NAME}
Version local: {VERSION}
Resumen: {RESUMEN_CORTO_DE_LA_HU}
```

Reglas de seguridad:

- No actualizar herramientas externas sin aprobacion explicita.
- No sincronizar supuestos como reglas confirmadas.
- No sobrescribir descripcion original sin confirmar si se reemplaza o se agrega como comentario/anexo.
- No mostrar credenciales ni tokens.
- Si falla la conexion, conservar version local y reportar el error claramente.

Para HU manuales o archivos locales:

- Persistir version local.
- Si es Excel local, actualizar archivo solo con aprobacion explicita.
- Si no hay herramienta origen, informar que no aplica sincronizacion externa.

---

# Relacion con otros skills

Este skill puede trabajar despues de:

- `read-us.md`
- `analyze-us.md`

Este skill puede alimentar:

- `explain-requirements.md`
- `generate-test-plan.md`
- `generate-test-cases.md`
- `generate-test-matrix.md`

---

# Criterio de finalizacion

El skill finaliza correctamente cuando:

- la estrategia fue seleccionada desde el catalogo
- el usuario confirmo la estrategia
- se aplico el `rule_file`
- se genero encabezado visible con metodologia, contexto breve, prioridad y version
- la HU enriquecida mantiene trazabilidad
- se validaron calidad y consistencia
- se persistio version local si el usuario aprobo
- se solicito aprobacion antes de actualizar herramienta origen
