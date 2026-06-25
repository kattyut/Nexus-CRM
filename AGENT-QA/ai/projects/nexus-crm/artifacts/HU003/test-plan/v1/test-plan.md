# Plan de pruebas - HU003: Administrar usuarios

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| HU version base | enrich-us/v1 |
| Metodologia QA | basado_cobertura - Basado en Cobertura |
| Prioridad | 2 |
| Cobertura esperada | Crear, consultar, editar, activar, desactivar usuarios y restringir acceso por rol |
| Version del plan | v1 |
| Estado | Pendiente de aprobacion |

## Objetivo

Validar que Gerencia pueda administrar usuarios internos de Nexus CRM y que Comercial o Analista no puedan ejecutar operaciones de administracion de usuarios.

## Alcance

### Incluye

- Acceso de Gerencia a administracion de usuarios.
- Creacion, consulta, edicion, activacion y desactivacion de usuarios.
- Validacion de informacion obligatoria o invalida.
- Restriccion para Comercial y Analista.
- Confirmacion clara de operaciones completadas.
- Trazabilidad funcional o auditoria si negocio lo confirma.

### No incluye

- Configuracion de roles y permisos, cubierta por HU004.
- Asignacion o cambio de roles, cubierta por HU005.
- Auditoria detallada, pendiente de confirmacion.

## Estrategia de pruebas

Se cubrira cada operacion CRUD/estado y cada criterio de aceptacion con casos positivos, negativos y de permisos. La estrategia prioriza funciones criticas de seguridad administrativa y consistencia de datos de usuarios.

## Tipos de prueba

- Funcionales: operaciones de administracion de usuarios.
- Regresion: impacto en login y permisos.
- API: sugerida para crear, actualizar, activar y desactivar usuarios.
- Integracion: persistencia de usuarios y reflejo en autenticacion.
- Seguridad: restriccion por rol.
- Exploratoria: validaciones de campos y estados.

## Riesgos

- Campos obligatorios no definidos.
- Mensajes y validaciones pendientes.
- Auditoria pendiente de confirmacion.
- Riesgo de que usuarios sin permiso accedan a administracion.
- Riesgo de inconsistencias si un usuario desactivado conserva sesion activa.

## Ambientes

Pendiente de definicion. Se requiere ambiente QA con usuarios Gerencia, Comercial y Analista, y datos de usuarios internos editables sin afectar informacion productiva.

## Dependencias

- Modulo de Seguridad y acceso.
- Modelo de usuarios.
- Modelo de permisos y roles.
- Persistencia de usuarios.
- Validaciones frontend y backend.

## Criterios de entrada

- HU003 enriquecida disponible.
- Pantalla o API de administracion de usuarios disponible.
- Datos de prueba para crear, editar, activar y desactivar usuarios.
- Roles Gerencia, Comercial y Analista configurados.

## Criterios de salida

- 100% de CA-001 a CA-006 ejecutados.
- Todas las operaciones principales validadas para Gerencia.
- Comercial y Analista bloqueados en UI y backend/API cuando aplique.
- Sin defectos criticos o altos en permisos o persistencia.

## Cobertura

| Area | Criterios | Cobertura esperada |
|---|---|---|
| Acceso Gerencia | CA-001 | 100% funcional |
| Operaciones de usuario | CA-002, CA-006 | 100% crear, consultar, editar, activar, desactivar |
| Validaciones | CA-003 | 100% campos definidos; pendiente detalle final |
| Restriccion por rol | CA-004 | 100% Comercial y Analista |
| Trazabilidad | CA-005 | Sugerida hasta confirmacion de auditoria |

## Supuestos y pendientes

- Pendiente confirmar campos obligatorios y reglas por tipo de usuario.
- Pendiente confirmar si desactivar usuario invalida sesiones existentes.
- Pendiente confirmar auditoria o historial de cambios.
- Pendiente definir mensajes esperados.
