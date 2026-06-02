---
name: generate-test-matrix
description: Skill especializado en generar matrices de prueba individuales o globales con trazabilidad entre HU, planes, casos, cobertura y versiones.
---

# SKILL - GENERATE TEST MATRIX

## Objetivo

Generar matrices de prueba claras, completas y trazables que permitan visualizar cobertura QA por HU o a nivel global del proyecto.

La matriz debe ser util para:

- ejecucion QA
- seguimiento
- auditoria
- refinamiento
- validacion de cobertura funcional
- trazabilidad entre HU, criterios, planes y casos
- exportacion a Excel

---

# Modos soportados

Este skill soporta dos modos:

| Modo | Descripcion | Ruta objetivo |
|---|---|---|
| `individual` | Matriz de una sola HU usando sus ultimas versiones de plan y casos | `ai/projects/{project-slug}/artifacts/{hu-id}/test-matrix/` |
| `global` | Matriz completa del proyecto usando todas las HU con casos generados | `ai/projects/{project-slug}/artifacts/global/test-matrix/` |

Si el usuario no indica modo:

1. Si hay HU activa, sugerir matriz individual.
2. Si el usuario pide "todas", "general", "global", "completa" o "Excel consolidado", usar modo `global`.
3. Si hay ambiguedad, preguntar antes de continuar.

---

# Principio de arquitectura

Este skill NO debe inventar filas, casos, criterios ni dependencias.

Debe apoyarse en:

| Responsabilidad | Servicio |
|---|---|
| Validar contexto del proyecto | `ai/services/context-service.md` |
| Resolver HU, provider e ID | `ai/services/hu-service.md` |
| Validar trazabilidad y cobertura | `ai/services/validation-service.md` |
| Resolver ultimas versiones de artefactos | `ai/services/versioning-service.md` |
| Persistir matriz generada | `ai/services/artifact-service.md` |
| Registrar resumen historico | `ai/services/summary-service.md` |
| Registrar eventos y errores | `ai/services/logging-service.md` |

---

# Entradas esperadas

## Modo individual

Este skill puede recibir:

- HU normalizada o enriquecida
- plan de pruebas versionado
- casos de prueba versionados
- analisis o explicacion funcional
- contexto del proyecto
- prioridad
- metodologia QA

## Modo global

Este skill debe obtener del proyecto:

- todas las HU con carpeta en `ai/projects/{project-slug}/artifacts/`
- ultima version de HU enriquecida, si existe
- ultima version de plan de pruebas, si existe
- ultima version de casos de prueba, si existe
- metadata y summaries disponibles

La matriz global solo debe incluir HU con casos de prueba generados.

---

# Fuentes soportadas

Las HU incluidas pueden provenir de:

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

Antes de generar la matriz:

1. Verificar contexto suficiente del proyecto.
2. Verificar herramienta de gestion o fuente de HU.
3. Verificar modo de generacion: `individual` o `global`.
4. Verificar existencia de casos de prueba.
5. Verificar existencia de plan de pruebas cuando aplique.
6. Resolver ultimas versiones disponibles mediante `versioning-service.md`.
7. Validar trazabilidad mediante `validation-service.md`.

Si no existe herramienta o fuente definida para el proyecto, detener y solicitarla antes de generar matriz.

---

# Si NO existen casos de prueba

Responder:

> No existen casos de prueba asociados para generar la matriz.

Sugerir:

- ejecutar `/generate-test-cases`
- seleccionar otra HU
- generar primero casos para las HU del proyecto

No continuar con matriz definitiva.

---

# Reglas para ultima version

Para cada HU, usar siempre la version mas reciente disponible de:

- `enrich-us`
- `test-plan`
- `test-cases`

La version mas reciente debe resolverse por:

1. metadata de `versioning-service.md`, si existe
2. `summary.json`, si existe
3. carpeta `vN` mas alta como fallback

No mezclar versiones antiguas salvo que el usuario lo solicite explicitamente.

---

# Modo individual

## Objetivo

Generar una matriz trazable para una HU especifica.

Debe usar:

- HU base o enriquecida
- ultima version del plan de pruebas
- ultima version de casos de prueba
- criterios de aceptacion
- riesgos QA
- cobertura esperada

## Ruta objetivo

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-matrix/
```

## Estructura esperada

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-matrix/
  v1/
    test-matrix.md
    test-matrix.csv
    metadata.json
  v2/
    test-matrix.md
    test-matrix.csv
    metadata.json
  summary.json
```

---

# Modo global

## Objetivo

Generar una matriz consolidada del proyecto tomando todas las HU con casos de prueba generados.

Debe:

- recorrer todas las HU del proyecto
- tomar la ultima version de casos de prueba por HU
- tomar la ultima version del plan de pruebas por HU, si existe
- tomar metadata de HU enriquecida, si existe
- ordenar por historia
- agrupar visualmente por HU
- generar un archivo completo
- generar salida exportable a Excel

## Ruta objetivo

```text
ai/projects/{project-slug}/artifacts/global/test-matrix/
```

## Estructura esperada

```text
ai/projects/{project-slug}/artifacts/global/test-matrix/
  v1/
    global-test-matrix.md
    global-test-matrix.csv
    metadata.json
  v2/
    global-test-matrix.md
    global-test-matrix.csv
    metadata.json
  summary.json
```

## Orden obligatorio

La matriz global debe ordenarse por:

1. Proyecto
2. HU ID
3. Prioridad de HU
4. ID de caso de prueba

No generar filas en desorden.

## Agrupacion por historia

En Markdown, agrupar por HU usando encabezados:

```md
## {HU_ID} - {HU_TITULO}
```

En CSV o Excel, repetir `HU ID` y `HU titulo` en cada fila para permitir filtros y tablas dinamicas.

---

# Encabezado visible

Toda matriz debe iniciar con encabezado visible.

## Matriz individual

```md
# Matriz de pruebas - {HU_ID}: {TITULO}

| Campo | Valor |
|---|---|
| Proyecto | {PROJECT_NAME} |
| Modo | individual |
| Origen | {PROVIDER_OR_SOURCE} |
| HU version base | {HU_VERSION} |
| Plan de pruebas base | {TEST_PLAN_VERSION} |
| Casos de prueba base | {TEST_CASES_VERSION} |
| Version de matriz | {VERSION} |
| Estado | Pendiente de aprobacion / Aprobada |
```

## Matriz global

```md
# Matriz global de pruebas - {PROJECT_NAME}

| Campo | Valor |
|---|---|
| Proyecto | {PROJECT_NAME} |
| Modo | global |
| HU incluidas | {TOTAL_HU} |
| Casos incluidos | {TOTAL_TEST_CASES} |
| Fuente de versiones | Ultimas versiones disponibles |
| Version de matriz | {VERSION} |
| Estado | Pendiente de aprobacion / Aprobada |
```

---

# Columnas obligatorias

La matriz debe incluir como minimo estas columnas:

| Columna | Descripcion |
|---|---|
| Proyecto | Proyecto asociado |
| HU ID | Historia relacionada |
| HU titulo | Nombre funcional de la HU |
| HU prioridad | Prioridad de la HU |
| HU version | Version base de HU/enriquecimiento |
| Plan version | Version del plan usado |
| Casos version | Version de casos usada |
| Criterio asociado | Criterio de aceptacion o regla |
| Escenario | Flujo validado |
| Caso de prueba ID | ID del caso asociado |
| Caso de prueba titulo | Titulo del caso |
| Tipo de prueba | Funcional, integracion, seguridad, etc. |
| Cobertura | Positiva, negativa, alterna, edge |
| Prioridad caso | Alta, Media, Baja |
| Automatizable | Si, No, Pendiente |
| Resultado esperado | Resultado verificable |
| Dependencias | APIs, modulos, terceros o datos |
| Estado | Pendiente, Aprobado, Ejecutado, Bloqueado, Fallido, Pasado |
| Observaciones | Riesgos, dudas o notas QA |

---

# Reglas para Excel/CSV

La matriz debe generarse en formato Markdown y en formato tabular exportable.

Formato tabular requerido:

- `.csv` como minimo
- `.xlsx` si existe capacidad disponible en el entorno o integracion

Reglas:

- una fila por caso de prueba
- columnas estables
- sin celdas combinadas en CSV
- repetir HU ID y HU titulo por fila
- ordenar por HU ID y caso de prueba ID
- mantener valores filtrables
- no dejar columnas criticas vacias si la informacion existe

Si no se puede generar `.xlsx`, generar `.csv` y dejarlo listo para abrir en Excel.

---

# Cobertura obligatoria

La matriz debe incluir:

- flujo feliz
- escenarios alternativos
- escenarios negativos
- edge cases
- reglas de negocio criticas
- riesgos QA cubiertos
- candidatos automatizables

---

# Validacion de cobertura

Debe identificar:

- funcionalidades sin cobertura
- reglas no validadas
- escenarios faltantes
- dependencias no cubiertas
- riesgos QA sin validacion
- HU sin casos, en modo global, como apartado separado de exclusiones

---

# Trazabilidad obligatoria

Mantener relacion entre:

- proyecto
- HU
- version de HU
- plan de pruebas
- version del plan
- caso de prueba
- version de casos
- criterio de aceptacion
- cobertura funcional
- riesgos QA

---

# Reglas anti-invencion

NO:

- inventar funcionalidades
- inventar escenarios
- inventar dependencias
- generar filas genericas sin trazabilidad
- incluir HU sin casos como si estuvieran cubiertas
- mezclar versiones sin indicarlo

Si falta informacion, usar:

- `Pendiente de definicion`
- `No documentado`
- `No aplica`

---

# Orden obligatorio de busqueda

## Individual

1. Revisar HU normalizada.
2. Revisar HU enriquecida, si existe.
3. Revisar plan de pruebas.
4. Revisar casos de prueba.
5. Revisar analisis o explicacion funcional.
6. Revisar contexto del proyecto.
7. Preguntar al usuario.

## Global

1. Detectar proyecto activo.
2. Recorrer carpetas de HU en `ai/projects/{project-slug}/artifacts/`.
3. Resolver ultimas versiones por HU.
4. Leer casos de prueba por HU.
5. Leer planes de prueba si existen.
6. Ordenar por HU.
7. Generar matriz consolidada.
8. Reportar HU excluidas por falta de casos.

---

# Validacion final obligatoria

Antes de finalizar, usar `validation-service.md` para validar:

- cobertura funcional
- consistencia
- trazabilidad
- aplicabilidad real
- alineacion con HU, plan y casos
- uso de ultimas versiones
- orden por HU en matriz global

---

# Flujo de aprobacion

Despues de generar la matriz:

1. Mostrar resumen de cobertura.
2. Indicar modo usado: `individual` o `global`.
3. Indicar versiones fuente usadas.
4. Mostrar HU excluidas si aplica.
5. Solicitar aprobacion para persistir version.

---

# Persistencia del artefacto

Si el usuario aprueba guardar:

1. Usar `artifact-service.md`.
2. Crear estructura faltante automaticamente.
3. Usar siempre `versioning-service.md` para crear una version de matriz.
4. Registrar metadata de version, modo, fuentes, cobertura y origen.
5. Registrar resumen mediante `summary-service.md`.

Rutas:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-matrix/
ai/projects/{project-slug}/artifacts/global/test-matrix/
```

Nunca sobrescribir matrices existentes sin aprobacion explicita.

---

# Relacion con otros skills

Este skill puede trabajar despues de:

- `read-us.md`
- `analyze-us.md`
- `enrich-us.md`
- `explain-requirements.md`
- `generate-test-plan.md`
- `generate-test-cases.md`

---

# Criterio de finalizacion

El skill finaliza correctamente cuando:

- se definio modo individual o global
- se usaron las ultimas versiones disponibles
- la matriz mantiene trazabilidad completa
- la matriz global esta ordenada y agrupada por HU
- se genero formato Markdown y CSV/exportable
- se identificaron huecos de cobertura
- se solicito aprobacion antes de persistir
