# Plan de pruebas - HU005: Asignar/restringir roles

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| HU version base | enrich-us/v1 |
| Metodologia QA | basado_cobertura - Basado en Cobertura |
| Prioridad | 2 |
| Cobertura esperada | Asignacion, modificacion, rechazo de roles invalidos y aplicacion de restricciones |
| Version del plan | v1 |
| Estado | Pendiente de aprobacion |

## Objetivo

Validar que Gerencia pueda asignar y modificar roles de usuarios internos, garantizando que cada usuario acceda solo a funcionalidades autorizadas segun su responsabilidad.

## Alcance

### Incluye

- Acceso de Gerencia a asignacion/restriccion de roles.
- Asignar rol valido a usuario interno.
- Modificar rol existente.
- Rechazar usuario sin rol o con rol invalido.
- Aplicar restricciones efectivas por rol.
- Bloquear Comercial y Analista.
- Conservar trazabilidad minima del cambio de rol.

### No incluye

- Crear o editar definiciones de rol, cubierto por HU004.
- Crear, editar o desactivar usuarios como operacion principal, cubierto por HU003.
- Matriz completa de permisos, pendiente de definicion.

## Estrategia de pruebas

La cobertura se enfocara en cambios de rol y efecto real en permisos. Cada asignacion debe validarse tanto en persistencia como en acceso posterior a funcionalidades permitidas o restringidas.

## Tipos de prueba

- Funcionales: asignar, modificar y validar roles.
- Integracion: cambio de rol reflejado en sesion y modulos protegidos.
- API: sugerida para endpoint de actualizacion de rol.
- Regresion: acceso de Gerencia, Comercial y Analista.
- Seguridad: prevencion de escalamiento de privilegios.
- Boundary testing: rol vacio, rol inexistente, usuario inexistente, cambio hacia Gerencia.

## Riesgos

- Matriz de permisos pendiente.
- Regla de visibilidad de Comercial sobre empresas/contactos pendiente.
- Riesgo de que cambios de rol no invaliden permisos en sesion activa.
- Riesgo de escalamiento indebido si un usuario sin permiso modifica roles.
- Auditoria minima debe confirmarse.

## Ambientes

Pendiente de definicion. Se requiere ambiente QA con usuarios editables de cada rol, roles validos Gerencia, Comercial y Analista, y modulos protegidos para verificar restricciones.

## Dependencias

- Modulo de usuarios.
- Modelo de roles y permisos.
- Persistencia de usuarios y roles.
- Modulos con autorizacion por rol.
- Trazabilidad de cambios.

## Criterios de entrada

- HU005 enriquecida disponible.
- Roles validos configurados.
- Usuarios internos de prueba disponibles.
- Al menos una funcionalidad restringida por rol disponible.
- Acceso de Gerencia al flujo.

## Criterios de salida

- 100% de CA-001 a CA-009 ejecutados.
- Roles validos guardados y aplicados correctamente.
- Roles invalidos rechazados.
- Cambios de rol trazados segun informacion minima definida.
- Sin defectos criticos o altos de permisos.

## Cobertura

| Area | Criterios | Cobertura esperada |
|---|---|---|
| Acceso Gerencia | CA-001 | 100% funcional |
| Operacion principal | CA-002, CA-006 | 100% asignacion y modificacion |
| Validaciones | CA-003, CA-007 | 100% rol vacio o invalido |
| Restriccion por rol | CA-004, CA-008 | 100% en modulos definidos |
| Trazabilidad | CA-005, CA-009 | 100% informacion minima del cambio |

## Supuestos y pendientes

- Pendiente confirmar matriz detallada de permisos por modulo.
- Pendiente definir comportamiento de sesiones activas tras cambio de rol.
- Pendiente confirmar regla de visibilidad del rol Comercial.
- Pendiente definir mensajes esperados.
