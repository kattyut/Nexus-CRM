# Analisis QA - HU003

## Encabezado

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| HU | HU003 |
| Work Item Azure | 441 |
| Titulo | HU003 - Administrar usuarios |
| Provider | Azure DevOps |
| Source | Azure DevOps |
| Version fuente | source/v1 |
| Version analisis | v1 |
| Fecha de analisis | 2026-06-01T15:44:35.7570929-05:00 |

## Resumen general

Estado de la HU: Aceptable para refinamiento, no lista para QA definitivo.

`sufficiency_status`: `sufficient_not_enriched`.

La HU fue leida desde Azure DevOps y validada contra el proyecto `Nexus`. Tiene actor, necesidad y beneficio funcional. Sin embargo, su alcance es amplio porque agrupa crear, consultar, editar, activar y desactivar usuarios en una sola historia sin criterios de aceptacion, reglas de permisos, campos obligatorios, validaciones, estados ni restricciones de seguridad.

## Estado inicial de la HU

Historia original:

> Como administrador  
> Quiero crear, consultar, editar, activar y desactivar usuarios  
> Para gestionar el acceso al sistema.

Campos de origen:

- Estado: New.
- Prioridad: 2.
- Criterios de aceptacion: no registrados.
- Reglas de negocio: no registradas explicitamente.
- Dependencias: no registradas explicitamente.
- Tags: sin tags.
- Relaciones: 1 relacion registrada.

## Clasificacion de suficiencia

La HU tiene informacion minima para iniciar enriquecimiento funcional porque expresa:

- Actor: administrador.
- Necesidad: administrar usuarios.
- Beneficio: gestionar el acceso al sistema.

No esta lista para plan o casos definitivos porque faltan reglas verificables sobre roles, permisos, campos de usuario, estados, restricciones de edicion, activacion, desactivacion, auditoria, busqueda, errores y comportamiento ante usuarios asociados a procesos existentes.

## Tabla de evaluacion QA

| Categoria | Estado | Observaciones | Impacto QA |
|---|---|---|---|
| Claridad funcional | Parcial | La intencion general es clara, pero el flujo de administracion no esta detallado. | QA no puede validar pasos, restricciones ni resultados esperados con precision. |
| Estructura HU | Aceptable | Tiene formato Como/Quiero/Para. | Permite analisis inicial y enriquecimiento. |
| Suficiencia funcional | Parcial | Cubre varias operaciones en una sola HU sin alcance detallado. | Riesgo de alcance grande y criterios incompletos. |
| Criterios de aceptacion | Deficiente | El campo de criterios esta vacio en Azure DevOps. | No hay condiciones verificables de aceptacion. |
| Testeabilidad | Parcial | Se pueden derivar escenarios base, pero no estan confirmados. | Alto riesgo de inventar validaciones si se generan casos sin enriquecer. |
| Reglas de negocio | Deficiente | No hay reglas de permisos, roles, campos obligatorios ni restricciones de estados. | Riesgo alto en seguridad y control de acceso. |
| Dependencias | Pendiente | No se documenta modulo de roles, autenticacion, auditoria o notificaciones. | Riesgo de dependencias no preparadas para pruebas. |
| Riesgos QA | Alto | La administracion de usuarios afecta seguridad, acceso y trazabilidad. | Requiere cobertura positiva, negativa, permisos y edge cases. |
| Cobertura funcional | Baja | Solo define la intencion general. | Faltan flujos para crear, consultar, editar, activar y desactivar. |
| Trazabilidad | Buena | Work Item real validado en Azure DevOps, ID 441, proyecto Nexus. | Trazabilidad externa confirmada. |

## Veredicto INVEST

| Criterio | Resultado | Observaciones |
|---|---|---|
| Independent | Parcial | Puede depender de autenticacion, roles, permisos y catalogo de usuarios. |
| Negotiable | Cumple | La HU permite refinamiento con negocio y seguridad. |
| Valuable | Cumple | Entrega valor claro: gestionar acceso al sistema. |
| Estimable | Parcial | Falta definir campos, restricciones, permisos y reglas por operacion. |
| Small | Parcial | Agrupa cinco capacidades; podria ser demasiado amplia para un solo sprint si se profundizan reglas. |
| Testable | Parcial | Es testeable a nivel conceptual, pero faltan criterios concretos. |

## Problemas encontrados

1. No existen criterios de aceptacion.
   - Evidencia: `Microsoft.VSTS.Common.AcceptanceCriteria` esta vacio.
   - Impacto QA: no hay base verificable para aceptar la HU.
   - Accion recomendada: definir criterios para crear, consultar, editar, activar, desactivar y validar permisos.

2. Alcance amplio en una sola HU.
   - Evidencia: la HU agrupa cinco operaciones funcionales.
   - Impacto QA: aumenta riesgo de estimacion incorrecta y cobertura incompleta.
   - Accion recomendada: confirmar si debe mantenerse como HU unica o dividirse en historias por operacion.

3. No estan definidos roles ni permisos.
   - Evidencia: solo se menciona el actor administrador.
   - Impacto QA: riesgo alto de accesos indebidos o falta de pruebas negativas por permisos.
   - Accion recomendada: definir quien puede administrar usuarios y que restricciones aplican.

4. No estan definidos campos de usuario ni validaciones.
   - Evidencia: no se especifican datos obligatorios, formato de correo, rol, estado u otros campos.
   - Impacto QA: no se pueden definir datos de prueba ni validaciones esperadas.
   - Accion recomendada: confirmar campos minimos, unicidad y reglas de edicion.

5. No hay reglas de activacion/desactivacion.
   - Evidencia: se mencionan activar y desactivar, pero no se define impacto en login, sesiones o usuarios con actividad.
   - Impacto QA: riesgo funcional y de seguridad.
   - Accion recomendada: definir comportamiento de usuario activo, inactivo y sesiones existentes.

## Campos faltantes

- Criterios de aceptacion.
- Campos obligatorios para crear usuario.
- Reglas de unicidad de correo o identificador.
- Roles disponibles y permisos asociados.
- Reglas para editar usuarios existentes.
- Reglas para activar/desactivar usuarios.
- Comportamiento de sesiones activas al desactivar.
- Restricciones para editar o desactivar administradores.
- Mensajes esperados.
- Auditoria o trazabilidad de cambios.
- Busqueda, filtros o paginacion para consulta de usuarios.

## Riesgos QA

- Riesgo alto de seguridad por falta de reglas de permisos.
- Riesgo de acceso indebido si usuarios desactivados pueden iniciar sesion.
- Riesgo de datos duplicados si no se define unicidad.
- Riesgo de trazabilidad insuficiente si no se auditan cambios administrativos.
- Riesgo de alcance excesivo si la HU no se divide o refina.
- Riesgo de automatizacion prematura sin campos, roles, URLs, selectores ni datos de prueba definidos.

## Recomendaciones

- Enriquecer la HU antes de generar plan o casos definitivos.
- Confirmar si la HU se mantiene como una sola historia o si se divide por operacion.
- Definir roles, permisos y restricciones del administrador.
- Definir campos obligatorios, validaciones y reglas de unicidad.
- Definir estados de usuario y efecto de activar/desactivar.
- Definir necesidades de auditoria para cambios de administracion.
- Mantener HU003 alineada al modulo de seguridad y acceso de Nexus CRM.

## Siguiente paso recomendado

Proponer estrategia de enriquecimiento desde `ai/config/enrichment-options/strategy-catalog.json` y solicitar aprobacion antes de enriquecer HU003.
