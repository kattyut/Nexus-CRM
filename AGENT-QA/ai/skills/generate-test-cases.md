---
name: generate-test-cases
description: Skill especializado en generar casos de prueba versionados, trazables y ejecutables a partir de HU, plan de pruebas y contexto QA.
---

# SKILL - GENERATE TEST CASES

## Objetivo

Generar casos de prueba completos, claros, trazables y ejecutables para validar una Historia de Usuario o requerimiento.

Los casos deben:

- alinearse con la HU normalizada o enriquecida
- alinearse con el plan de pruebas aprobado o confirmado
- mantener trazabilidad con criterios de aceptacion, riesgos y cobertura
- cubrir escenarios positivos, negativos, alternativos y edge cases
- ser aplicables en entornos QA reales
- preparar insumos para matriz de prueba y automatizacion futura

---

# Principio de arquitectura

Este skill NO debe duplicar validaciones ni inventar escenarios fuera del alcance aprobado.

Debe apoyarse en:

| Responsabilidad | Servicio |
|---|---|
| Validar contexto del proyecto | `ai/services/context-service.md` |
| Resolver HU, provider e ID | `ai/services/hu-service.md` |
| Validar cobertura, consistencia y trazabilidad | `ai/services/validation-service.md` |
| Construir prompt con HU, plan y reglas | `ai/services/prompt-service.md` |
| Persistir casos generados | `ai/services/artifact-service.md` |
| Versionar si ya existen casos previos | `ai/services/versioning-service.md` |
| Registrar resumen historico | `ai/services/summary-service.md` |
| Registrar eventos y errores | `ai/services/logging-service.md` |

---

# Entradas esperadas

Este skill puede recibir:

- HU normalizada desde `read-us.md`
- analisis generado por `analyze-us.md`
- HU enriquecida y versionada desde `enrich-us.md`
- explicacion funcional desde `explain-requirements.md`
- plan de pruebas desde `generate-test-plan.md`
- contexto del proyecto
- reglas de negocio
- prioridad
- metodologia QA aplicada en el plan
- origen y provider

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

Antes de generar casos:

1. Verificar HU valida.
2. Verificar contexto suficiente.
3. Verificar herramienta de gestion o fuente de HU.
4. Verificar plan de pruebas existente o aprobado para la HU.
5. Verificar criterios de aceptacion o escenarios validables.
6. Validar que exista informacion suficiente para generar resultados esperados verificables.

---

# Si NO existe HU

Responder:

> No se encontro una Historia de Usuario valida para generar casos de prueba.

Sugerir:

- ejecutar `/read-us`
- ejecutar `/analyze-us`
- ejecutar `/enrich-us`
- proporcionar HU manualmente

No continuar.

---

# Si NO existe plan de pruebas

Responder:

> No existe un plan de pruebas asociado para generar casos consistentes.

Sugerir:

- ejecutar `/generate-test-plan`
- proporcionar un plan de pruebas existente
- confirmar si desea generar casos preliminares sin plan

No generar casos definitivos sin plan confirmado.

---

# Si NO existe herramienta o fuente

Responder:

> No existe una herramienta de gestion o fuente definida para el proyecto. Antes de generar casos necesito saber si la HU viene de Jira, Azure DevOps, Planner, Trello, Excel, archivo local, texto manual u otra fuente.

No continuar hasta registrar la herramienta o fuente.

---

# Si falta informacion funcional

Si no hay criterios, reglas, flujo o resultados esperados suficientes:

1. Detener generacion definitiva.
2. Informar vacios encontrados.
3. Explicar impacto QA.
4. Solicitar informacion faltante.

No inventar comportamiento esperado.

---

# Fuentes de cobertura

Los casos deben derivarse de:

1. Criterios de aceptacion.
2. HU enriquecida, si existe.
3. Plan de pruebas.
4. Analisis previo.
5. Explicacion funcional.
6. Reglas de negocio.
7. Contexto del proyecto.

---

# Estructura obligatoria del artefacto

El artefacto de casos debe iniciar con un encabezado visible.

## 1. Encabezado visible

Formato obligatorio:

```md
# Casos de prueba - {HU_ID}: {TITULO}

| Campo | Valor |
|---|---|
| Proyecto | {PROJECT_NAME} |
| Origen | {PROVIDER_OR_SOURCE} |
| HU version base | {HU_VERSION} |
| Plan de pruebas base | {TEST_PLAN_VERSION} |
| Metodologia QA | {METHODOLOGY_ID} - {METHODOLOGY_NAME} |
| Prioridad | {PRIORIDAD} |
| Cobertura | Positiva / Negativa / Alterna / Edge / Automatizable |
| Version de casos | {VERSION} |
| Estado | Pendiente de aprobacion / Aprobado |
```

Reglas del encabezado:

- `Metodologia QA` debe venir del plan de pruebas.
- `Plan de pruebas base` debe referenciar la version usada.
- `Prioridad` debe venir de HU, herramienta origen, usuario o contexto.
- Si no existe prioridad, usar `Pendiente de definicion`, no inventarla.
- `Version de casos` debe venir de `versioning-service.md`.

---

# Estructura obligatoria de cada caso

Cada caso debe incluir:

| Campo | Descripcion |
|---|---|
| ID | Identificador unico y estable |
| HU ID | Historia relacionada |
| Criterio asociado | Criterio de aceptacion o regla cubierta |
| Titulo | Nombre corto y claro |
| Objetivo | Que valida |
| Precondiciones | Estado previo requerido |
| Datos de prueba | Informacion necesaria |
| Pasos | Secuencia de ejecucion |
| Resultado esperado | Resultado verificable |
| Prioridad | Alta / Media / Baja |
| Tipo de prueba | Funcional, integracion, seguridad, etc. |
| Cobertura | Positiva, negativa, alterna, edge |
| Automatizable | Si / No / Pendiente |
| Notas QA | Riesgos, supuestos o dependencias |

---

# Convencion de IDs

Usar IDs trazables:

```text
TC-{HU_ID}-{NN}
```

Ejemplo:

```text
TC-MCA-1-001
```

Si el ID de HU no existe, usar un identificador normalizado definido por `hu-service.md`.

---

# Cobertura obligatoria

Los casos deben cubrir:

- flujo feliz
- validaciones
- errores
- escenarios alternativos
- edge cases
- reglas de negocio
- dependencias documentadas
- riesgos QA del analisis o plan

---

# Tipos de casos requeridos

Generar segun contexto:

- positivos
- negativos
- validaciones
- integracion
- datos invalidos
- permisos
- seguridad basica
- UX funcional
- manejo de errores
- regresion
- smoke
- automatizables

No incluir tipos sin evidencia o sin aplicabilidad; si son recomendados pero no confirmados, marcarlos como sugeridos.

---

# Casos automatizables

Cuando sea posible identificar automatizacion, marcar:

```text
Automatizable: Si
```

Y clasificar candidato:

- API
- UI
- E2E
- regresion
- smoke
- validacion repetitiva

Si no hay informacion suficiente:

```text
Automatizable: Pendiente
```

---

# Priorizacion

Clasificar:

| Prioridad | Criterio |
|---|---|
| Alta | Critico para negocio, flujo principal, riesgo alto |
| Media | Funcionalidad importante o validacion frecuente |
| Baja | Impacto menor, escenario complementario |

No inventar prioridad si no existe base; usar impacto funcional, riesgo y plan de pruebas como criterio.

---

# Reglas de generacion

Los casos deben:

- ser claros
- ser reproducibles
- ser verificables
- evitar ambiguedad
- mantener consistencia funcional
- tener resultados esperados observables
- vincularse a criterio, riesgo o regla

---

# Reglas anti-invencion

NO generar:

- pasos ambiguos
- validaciones irreales
- comportamiento inventado
- dependencias inexistentes
- datos de prueba no documentados como obligatorios
- integraciones no confirmadas

Si falta informacion, usar:

- `Pendiente de definicion`
- `Dato requerido`
- `Duda funcional`

---

# Orden obligatorio de busqueda

Antes de asumir algo:

1. Revisar HU normalizada.
2. Revisar HU enriquecida, si existe.
3. Revisar criterios de aceptacion.
4. Revisar plan de pruebas.
5. Revisar analisis previo, si existe.
6. Revisar explicacion funcional, si existe.
7. Revisar contexto del proyecto.
8. Revisar reglas de negocio.
9. Preguntar al usuario.

---

# Salida esperada

La salida debe incluir:

## 1. Encabezado visible

Con metadata, versiones y cobertura.

## 2. Resumen de cobertura

Tabla:

| Tipo de cobertura | Cantidad | Observaciones |
|---|---:|---|

## 3. Casos de prueba

Tabla o bloques estructurados con todos los campos obligatorios.

## 4. Casos automatizables

Lista de candidatos y motivo.

## 5. Riesgos y pendientes

Listar informacion faltante, riesgos de ejecucion o supuestos.

---

# Validacion final obligatoria

Antes de finalizar, usar `validation-service.md` para validar:

- cobertura funcional
- trazabilidad
- consistencia
- claridad
- aplicabilidad real
- alineacion con HU y plan
- ausencia de informacion inventada

---

# Flujo de aprobacion

Despues de generar los casos:

1. Mostrar casos generados.
2. Explicar cobertura lograda.
3. Mostrar riesgos, supuestos y pendientes.
4. Solicitar aprobacion para persistir version en la carpeta de la HU.

---

# Persistencia del artefacto

Si el usuario aprueba guardar:

1. Usar `artifact-service.md`.
2. Crear estructura faltante automaticamente.
3. Usar siempre `versioning-service.md` para crear una version de casos.
4. Registrar metadata de version, plan base, prioridad, cobertura y origen.
5. Registrar resumen mediante `summary-service.md`.

Ruta objetivo:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-cases/
```

Estructura esperada:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/test-cases/
  v1/
    test-cases.md
    metadata.json
  v2/
    test-cases.md
    metadata.json
  summary.json
```

Nunca sobrescribir casos existentes sin aprobacion explicita.

---

# Relacion con otros skills

Este skill puede trabajar despues de:

- `read-us.md`
- `analyze-us.md`
- `enrich-us.md`
- `explain-requirements.md`
- `generate-test-plan.md`

Este skill alimenta:

- `generate-test-matrix.md`

---

# Criterio de finalizacion

El skill finaliza correctamente cuando:

- existe HU valida
- existe plan de pruebas base o aprobacion explicita para casos preliminares
- los casos tienen trazabilidad con HU, criterios y plan
- se cubren escenarios positivos, negativos, alternos y edge cases segun contexto
- se identifican candidatos de automatizacion
- se validaron cobertura, consistencia y aplicabilidad
- se solicito aprobacion antes de persistir
