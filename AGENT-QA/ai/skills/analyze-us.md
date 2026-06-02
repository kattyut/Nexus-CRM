---
name: analyze-us
description: Skill especializado en analizar Historias de Usuario normalizadas, evaluando suficiencia, criterios INVEST, claridad funcional, trazabilidad y riesgos QA.
---

# SKILL - ANALYZE USER STORY

## Objetivo

Analizar una Historia de Usuario para identificar problemas de calidad funcional y QA antes de enriquecer, explicar o generar artefactos de prueba.

Este skill debe ayudar a decidir si la HU esta:

- lista para enriquecimiento
- lista para plan de pruebas
- incompleta y requiere aclaraciones
- ya suficientemente refinada

Este skill NO debe modificar, enriquecer ni persistir una HU enriquecida.

---

# Principio de arquitectura

Este skill NO debe concentrar logica pesada ni duplicar responsabilidades de servicios.

Debe apoyarse en:

| Responsabilidad | Servicio |
|---|---|
| Validar contexto del proyecto | `ai/services/context-service.md` |
| Validar estructura, suficiencia e INVEST | `ai/services/validation-service.md` |
| Resolver trazabilidad de HU y provider | `ai/services/hu-service.md` |
| Persistir analisis inicial | `ai/services/artifact-service.md` |
| Versionar analisis inicial | `ai/services/versioning-service.md` |
| Registrar hallazgos y eventos | `ai/services/logging-service.md` |
| Registrar resumen historico cuando aplique | `ai/services/summary-service.md` |

---

# Entradas esperadas

Este skill recibe preferiblemente la salida normalizada de `read-us.md`:

```json
{
  "id": "",
  "title": "",
  "description": "",
  "acceptance_criteria": [],
  "business_rules": [],
  "dependencies": [],
  "source": "",
  "provider": "",
  "status": "",
  "sufficiency_status": "",
  "traceability": {
    "project": "",
    "external_url": "",
    "epic": "",
    "labels": []
  },
  "validation": {
    "status": "",
    "findings": []
  }
}
```

Tambien puede recibir una HU manual, pero en ese caso debe solicitar o ejecutar primero la normalizacion definida en `read-us.md`.

---

# Origenes soportados

La HU analizada puede provenir de:

- Jira
- Azure DevOps
- Planner
- Trello
- Excel
- texto manual
- archivo local
- contexto activo

El analisis debe conservar el origen en la trazabilidad y no asumir que todos los origenes tienen los mismos campos.

---

# Dependencias obligatorias

Antes de iniciar el analisis:

1. Verificar que exista una HU normalizada o una HU legible.
2. Validar que exista contexto suficiente del proyecto.
3. Validar que exista herramienta de gestion o fuente de HU.
4. Validar que la HU haya pasado por lectura/normalizacion de `read-us.md`.
5. Validar que la HU tenga contenido funcional util.
6. Resolver provider, ID y trazabilidad mediante `hu-service.md`.
7. Aplicar validaciones mediante `validation-service.md`.

Si la HU fue proporcionada manualmente sin normalizacion previa, no analizar directamente; ejecutar o solicitar primero `read-us.md` para registrar fuente, provider y trazabilidad.

---

# Si NO existe HU

Responder:

> No se encontro una Historia de Usuario valida para analizar.

Luego sugerir:

- ejecutar `/read-us`
- proporcionar HU manualmente
- indicar ID y fuente de la HU

No continuar el analisis.

---

# Validacion minima obligatoria

La HU debe contener, cuando aplique:

- rol
- accion
- beneficio

Formato esperado:

```text
Como [rol]
Quiero [accion]
Para [beneficio]
```

Si el origen no usa formato Scrum, validar como minimo:

- actor o usuario involucrado
- necesidad o funcionalidad esperada
- resultado o valor esperado
- descripcion funcional minima

---

# Analisis obligatorio

## 1. Suficiencia funcional

Evaluar:

- si la HU tiene informacion suficiente para QA
- si permite entender el flujo esperado
- si define resultado de negocio
- si contiene criterios verificables
- si requiere aclaraciones antes de continuar

Clasificar:

| Estado | Significado |
|---|---|
| `insufficient` | No permite analisis o enriquecimiento confiable |
| `sufficient_not_enriched` | Tiene base suficiente, pero requiere refinamiento |
| `already_enriched` | Ya tiene estructura y detalle adecuados |

---

## 2. Claridad funcional

Evaluar:

- intencion de la funcionalidad
- claridad del objetivo de negocio
- ambiguedades
- terminos genericos
- consistencia entre titulo, descripcion y criterios

---

## 3. Validacion INVEST

Evaluar:

| Criterio | Validacion |
|---|---|
| Independent | Puede desarrollarse independientemente |
| Negotiable | Permite discusion y refinamiento |
| Valuable | Entrega valor funcional o de negocio |
| Estimable | Puede estimarse con la informacion disponible |
| Small | Tiene alcance abordable |
| Testable | Puede validarse con pruebas claras |

---

## 4. Validacion QA

Evaluar:

- testeabilidad
- claridad de validacion
- posibilidad de automatizacion
- riesgos funcionales
- dependencias tecnicas o externas
- datos requeridos
- casos limite identificables

---

## 5. Criterios de aceptacion

Verificar:

- existencia
- claridad
- cobertura de flujo feliz
- cobertura de errores
- cobertura alterna
- consistencia funcional
- trazabilidad con reglas de negocio

---

## 6. Dependencias e integraciones

Identificar solo si estan documentadas:

- APIs involucradas
- integraciones
- modulos relacionados
- dependencias externas
- restricciones tecnicas
- permisos o roles

No inventar integraciones ausentes.

---

## 7. Riesgos QA

Identificar:

- ambiguedad
- dependencias no claras
- datos faltantes
- riesgo de validacion
- riesgo de cobertura
- riesgo de integracion
- riesgo de rendimiento
- riesgo de seguridad

---

# Resultado del analisis

La salida debe incluir:

## 1. Resumen general

Indicar estado de la HU:

- Excelente
- Aceptable
- Deficiente
- Critica

Tambien indicar:

- `sufficiency_status`
- origen
- provider
- ID de HU
- proyecto asociado
- version de HU fuente analizada
- fecha de lectura o analisis

Tambien debe conservar el estado inicial de la HU sin modificar:

- titulo original
- descripcion original o referencia al snapshot fuente
- criterios de aceptacion originales
- reglas de negocio originales, si existen
- dependencias originales, si existen
- estado/prioridad original, si existen
- campos faltantes detectados

---

## 2. Tabla de evaluacion

| Categoria | Estado | Observaciones | Impacto QA |
|---|---|---|---|

Categorias minimas:

- Claridad funcional
- Estructura HU
- Suficiencia funcional
- Criterios de aceptacion
- Testeabilidad
- Reglas de negocio
- Dependencias
- Riesgos QA
- Cobertura funcional
- Trazabilidad

---

## 3. Veredicto INVEST

| Criterio | Resultado | Observaciones |
|---|---|---|

---

## 4. Problemas encontrados

Listar:

- ambiguedades
- vacios
- riesgos
- informacion faltante
- inconsistencias

Cada problema debe explicar:

- evidencia encontrada
- impacto QA
- siguiente accion recomendada

---

## 5. Recomendaciones

Sugerir mejoras sobre:

- claridad
- alcance
- criterios de aceptacion
- reglas de negocio
- dependencias
- escenarios faltantes
- automatizacion futura

Las recomendaciones no deben agregar funcionalidades nuevas.

---

# Persistencia

El analisis no debe sobrescribir ni modificar la HU original.

El analisis inicial es un artefacto obligatorio del ciclo QA. Despues de leer y normalizar una HU, `analyze-us` debe persistir siempre una version del analisis en:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/analysis/vN/
```

Archivos obligatorios por version:

```text
analysis.md
metadata.json
summary.json
```

Contenido minimo de `analysis.md`:

- encabezado con proyecto, HU ID, titulo, provider, source y version
- estado inicial de la HU leida sin enriquecer
- clasificacion de suficiencia
- tabla de evaluacion QA
- veredicto INVEST
- problemas encontrados
- campos faltantes
- riesgos QA
- recomendaciones sin inventar funcionalidad
- siguiente paso recomendado

Contenido minimo de `metadata.json`:

```json
{
  "artifact_type": "analysis",
  "version": "vN",
  "project_name": "",
  "project_slug": "",
  "hu_id": "",
  "title": "",
  "source": "",
  "provider": "",
  "source_version": "",
  "sufficiency_status": "",
  "initial_state": {
    "status": "",
    "priority": "",
    "has_description": false,
    "acceptance_criteria_count": 0,
    "business_rules_count": 0,
    "dependencies_count": 0
  },
  "validation_status": "",
  "blocking_findings": [],
  "created_at": "",
  "generated_by": "analyze-us"
}
```

Contenido minimo de `summary.json` de la version:

- accion ejecutada
- resultado de suficiencia
- hallazgos principales
- riesgos principales
- ruta del artefacto generado
- siguiente paso recomendado

Ademas, actualizar `ai/projects/{project-slug}/artifacts/{hu-id}/summary.json` con `artifacts.analysis.latest_version`, ruta, estado y fecha.

Si ya existe un analisis previo, aplicar reglas de versionamiento mediante `versioning-service.md` y crear la siguiente version. Nunca dejar `analysis/` vacia despues de ejecutar este skill correctamente.

---

# Reglas anti-invencion

Este skill NO debe:

- modificar la HU
- inventar funcionalidades
- inventar reglas de negocio
- inventar comportamiento tecnico
- inventar integraciones
- asumir campos que no existen en el origen

Si falta informacion, debe declararla como faltante y pedir aclaracion.

---

# Relacion con otros skills

Este skill puede ejecutarse despues de:

- `read-us.md`

Este skill puede ejecutarse antes de:

- `enrich-us.md`
- `explain-requirements.md`
- `generate-test-plan.md`
- `generate-test-cases.md`
- `generate-test-matrix.md`

---

# Criterio de finalizacion

El skill finaliza correctamente cuando entrega:

- clasificacion de suficiencia
- evaluacion INVEST
- riesgos QA
- hallazgos trazables
- recomendaciones accionables
- siguiente paso recomendado
