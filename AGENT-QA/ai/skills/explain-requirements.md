---
name: explain-requirements
description: Skill especializado en explicar requerimientos funcionales y tecnicos en lenguaje claro para QA, negocio y desarrollo.
---

# SKILL - EXPLAIN REQUIREMENTS

## Objetivo

Explicar requerimientos funcionales y tecnicos de manera clara, estructurada y comprensible, usando informacion validada del flujo de HU.

Este skill debe ayudar a:

- entender funcionalidades
- aclarar comportamiento esperado
- reducir ambiguedad
- facilitar refinamiento
- mejorar entendimiento QA
- apoyar onboarding funcional
- preparar conversaciones entre negocio, QA y desarrollo

Este skill NO debe enriquecer la HU ni crear nuevas reglas de negocio.

---

# Principio de arquitectura

Este skill NO debe concentrar logica pesada ni duplicar validaciones.

Debe apoyarse en:

| Responsabilidad | Servicio |
|---|---|
| Validar contexto del proyecto | `ai/services/context-service.md` |
| Resolver HU, provider e ID | `ai/services/hu-service.md` |
| Validar suficiencia y consistencia | `ai/services/validation-service.md` |
| Construir explicacion con contexto | `ai/services/prompt-service.md` |
| Persistir explicacion si el usuario lo aprueba | `ai/services/artifact-service.md` |
| Versionar si ya existe explicacion previa | `ai/services/versioning-service.md` |
| Registrar resumen historico | `ai/services/summary-service.md` |
| Registrar eventos y errores | `ai/services/logging-service.md` |

---

# Entradas esperadas

Este skill puede recibir:

- HU normalizada desde `read-us.md`
- analisis generado por `analyze-us.md`
- HU enriquecida generada por `enrich-us.md`
- contexto del proyecto
- reglas de negocio
- informacion funcional disponible

La HU o requerimiento puede provenir de:

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

Antes de iniciar:

1. Verificar que exista HU, requerimiento o artefacto funcional valido.
2. Verificar contexto suficiente del proyecto.
3. Verificar herramienta de gestion o fuente de HU.
4. Verificar existencia de informacion funcional util.
5. Resolver ID, titulo, provider y trazabilidad mediante `hu-service.md`.
6. Validar suficiencia mediante `validation-service.md`.

Este skill puede usarse para entender una HU sin enriquecerla, pero no puede ejecutarse sin contexto de negocio ni herramienta/fuente definida.

---

# Si NO existe HU o requerimiento

Responder:

> No se encontro una Historia de Usuario o requerimiento valido para explicar.

Sugerir:

- ejecutar `/read-us`
- ejecutar `/analyze-us`
- ejecutar `/enrich-us`
- proporcionar el requerimiento manualmente

No continuar.

---

# Si NO existe contexto

Responder:

> No existe suficiente contexto funcional para explicar correctamente el requerimiento.

Solicitar:

- flujo funcional
- objetivo de negocio
- usuarios involucrados
- comportamiento esperado
- reglas de negocio
- restricciones
- integraciones conocidas

No inventar informacion.

---

# Si NO existe herramienta o fuente

Responder:

> No existe una herramienta de gestion o fuente definida para este proyecto. Antes de explicar la HU necesito saber si viene de Jira, Azure DevOps, Planner, Trello, Excel, archivo local, texto manual u otra fuente.

No continuar hasta registrar la herramienta o fuente.

---

# Uso de suficiencia

Si existe `sufficiency_status`, actuar asi:

| Estado | Accion |
|---|---|
| `insufficient` | Explicar solo lo disponible y listar vacios criticos |
| `sufficient_not_enriched` | Explicar el requerimiento y recomendar enriquecimiento |
| `already_enriched` | Explicar usando la HU enriquecida como fuente principal |

Si no existe `sufficiency_status`, usar `validation-service.md` para clasificar antes de explicar.

---

# Objetivo de la explicacion

La explicacion debe permitir entender:

- que hace la funcionalidad
- para que existe
- quien la usa
- como deberia comportarse
- que reglas aplica
- que validaciones son importantes
- que dudas o vacios siguen pendientes
- que impacto tiene para QA

---

# Orden obligatorio de busqueda

Antes de asumir algo:

1. Revisar HU normalizada.
2. Revisar HU enriquecida, si existe.
3. Revisar analisis previo, si existe.
4. Revisar contexto del proyecto.
5. Revisar reglas de negocio.
6. Preguntar al usuario.

---

# Estructura obligatoria

La explicacion debe incluir:

## 1. Metadata

- Proyecto
- HU ID o identificador del requerimiento
- Titulo
- Origen
- Provider
- Estado de suficiencia

## 2. Resumen funcional

Explicar:

- objetivo principal
- problema que resuelve
- valor funcional o de negocio

## 3. Usuarios involucrados

Identificar solo si esta documentado:

- roles
- actores
- permisos
- responsabilidades

Si no esta documentado, marcarlo como pendiente.

## 4. Flujo funcional

Explicar paso a paso:

- entrada
- acciones del usuario o sistema
- procesamiento esperado
- validaciones
- resultado esperado

No inventar pasos ausentes.

## 5. Reglas de negocio

Explicar:

- restricciones
- validaciones
- condiciones
- comportamiento esperado

Si una regla no esta confirmada, marcarla como:

- `Pendiente de validacion`
- `Duda funcional`

## 6. Escenarios importantes

Identificar con base en la informacion disponible:

- flujo feliz
- errores
- escenarios alternativos
- edge cases relevantes

## 7. Riesgos funcionales y QA

Identificar:

- ambiguedades
- dependencias
- validaciones criticas
- riesgos de cobertura
- riesgos de datos
- riesgos de integracion

## 8. Explicacion tecnica opcional

Solo si existe contexto tecnico suficiente:

- APIs involucradas
- integraciones
- modulos relacionados
- dependencias externas
- validaciones tecnicas
- restricciones tecnicas

No inventar arquitectura ni endpoints.

## 9. Preguntas abiertas

Listar preguntas necesarias para cerrar vacios funcionales o tecnicos.

---

# Reglas importantes

NO:

- inventar funcionalidades
- inventar integraciones
- inventar comportamiento tecnico
- asumir reglas inexistentes
- convertir dudas en reglas confirmadas
- modificar la HU original

SI:

- explicar con lenguaje claro
- separar hechos de supuestos
- mantener trazabilidad
- indicar vacios
- recomendar siguiente paso QA

---

# Formato de salida

La explicacion debe ser:

- clara
- estructurada
- entendible para negocio
- util para QA
- util para desarrollo
- funcionalmente consistente
- trazable con la HU o requerimiento

---

# Persistencia opcional

La explicacion solo se guarda si el usuario lo solicita o lo aprueba.

Si se aprueba guardar:

1. Usar `artifact-service.md`.
2. Crear estructura faltante automaticamente.
3. Usar `versioning-service.md` si ya existe una explicacion previa.
4. Registrar resumen mediante `summary-service.md`.

Ruta objetivo:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/requirements-explanation/
```

Nunca sobrescribir explicaciones existentes sin aprobacion explicita.

---

# Relacion con otros skills

Este skill puede trabajar despues de:

- `read-us.md`
- `analyze-us.md`
- `enrich-us.md`

Este skill puede alimentar:

- `generate-test-plan.md`
- `generate-test-cases.md`
- `generate-test-matrix.md`

---

# Criterio de finalizacion

El skill finaliza correctamente cuando entrega:

- explicacion funcional clara
- actores y flujo documentados
- reglas y validaciones separadas de dudas
- riesgos QA identificados
- preguntas abiertas
- siguiente paso recomendado
