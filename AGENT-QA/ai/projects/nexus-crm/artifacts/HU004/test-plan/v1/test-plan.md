# Plan de pruebas - HU004: Administrar roles

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| HU version base | enrich-us/v1 |
| Metodologia QA | basado_cobertura - Basado en Cobertura |
| Prioridad | 2 |
| Cobertura esperada | Crear, editar, consultar, configurar permisos y desactivar roles |
| Version del plan | v1 |
| Estado | Pendiente de aprobacion |

## Objetivo

Validar que Gerencia pueda administrar roles y permisos asociados para controlar que funcionalidades puede utilizar cada tipo de usuario en Nexus CRM.

## Alcance

### Incluye

- Acceso de Gerencia a administracion de roles.
- Crear rol, editar rol, consultar roles y configurar permisos.
- Desactivar roles, documentado como alcance indicado.
- Validaciones obligatorias o de datos invalidos.
- Bloqueo de Comercial y Analista.
- Trazabilidad funcional o auditoria si negocio lo confirma.

### No incluye

- Asignar roles a usuarios, cubierto por HU005.
- Matriz detallada de permisos por modulo, pendiente de definicion.
- Administracion de usuarios, cubierta por HU003.

## Estrategia de pruebas

Se priorizara cobertura por operacion y por impacto en permisos. Las pruebas deben validar que cambios de rol/permisos tengan efecto consistente en acceso a modulos, sin asumir una matriz no aprobada.

## Tipos de prueba

- Funcionales: administracion de roles y permisos.
- Integracion: efecto de permisos en modulos del CRM.
- API: sugerida para operaciones de rol y permisos.
- Regresion: acceso por roles Gerencia, Comercial y Analista.
- Seguridad: acceso restringido a administracion de roles.
- Boundary testing: nombres duplicados, permisos vacios o desactivacion de rol en uso, si negocio define reglas.

## Riesgos

- Matriz de permisos pendiente.
- Reglas de roles editables o roles base no definidas.
- Riesgo de bloquear accesos criticos si se modifica Gerencia.
- Riesgo de inconsistencias entre permisos configurados y permisos aplicados.
- Auditoria pendiente.

## Ambientes

Pendiente de definicion. Se requiere ambiente QA con roles base Gerencia, Comercial y Analista, modulos con permisos verificables y datos de prueba para roles custom si negocio los permite.

## Dependencias

- Modelo de roles y permisos.
- Modulos protegidos por permisos.
- Persistencia de roles.
- Usuarios asociados a roles.
- Reglas de roles base.

## Criterios de entrada

- HU004 enriquecida disponible.
- Pantalla o API de roles disponible.
- Roles base configurados.
- Al menos un modulo o accion protegida para validar permisos.
- Matriz preliminar de permisos o lista de permisos disponible.

## Criterios de salida

- 100% de CA-001 a CA-009 ejecutados o marcados como bloqueados por pendiente funcional.
- Permisos creados/editados reflejados en acceso efectivo.
- Comercial y Analista bloqueados para administracion de roles.
- Sin defectos criticos o altos en control de permisos.

## Cobertura

| Area | Criterios | Cobertura esperada |
|---|---|---|
| Acceso Gerencia | CA-001 | 100% funcional |
| Operacion principal | CA-002 | 100% segun reglas definidas |
| Validaciones | CA-003 | 100% sobre campos confirmados |
| Restriccion por rol | CA-004 | 100% Comercial y Analista |
| Trazabilidad | CA-005 | Sugerida hasta confirmacion |
| Alcance funcional | CA-006 a CA-009 | 100% crear, editar, configurar permisos, consultar |

## Supuestos y pendientes

- Pendiente confirmar matriz detallada de permisos por modulo.
- Pendiente definir si roles base pueden editarse o desactivarse.
- Pendiente confirmar validaciones de nombres duplicados y permisos vacios.
- Pendiente confirmar auditoria.
