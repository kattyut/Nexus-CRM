# Casos de prueba - HU004: Administrar roles

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| HU version base | enrich-us/v1 |
| Plan de pruebas base | test-plan/v1 |
| Metodologia QA | basado_cobertura - Basado en Cobertura |
| Prioridad | 2 |
| Cobertura | Positiva / Negativa / Alterna / Edge / Automatizable |
| Version de casos | v1 |
| Estado | Pendiente de aprobacion |

## Resumen de cobertura

| Tipo de cobertura | Cantidad | Observaciones |
|---|---:|---|
| Positiva | 4 | Crear, editar, consultar y configurar permisos |
| Negativa | 3 | Validaciones, acceso sin permiso y permiso no aplicado |
| Alterna | 1 | Desactivar rol |
| Edge | 1 | Rol en uso o rol base |
| Automatizable | 9 | UI/API segun implementacion |

## Casos de prueba

| ID | HU ID | Criterio asociado | Titulo | Objetivo | Precondiciones | Datos de prueba | Pasos | Resultado esperado | Prioridad | Tipo de prueba | Cobertura | Automatizable | Notas QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| TC-HU004-001 | HU004 | CA-001 | Acceso Gerencia a roles | Validar acceso de Gerencia a administracion de roles | Gerencia autenticada | Cuenta Gerencia | 1. Iniciar sesion. 2. Abrir administracion de roles. | La funcionalidad esta disponible segun permisos. | Alta | Seguridad / Funcional | Positiva | Si, UI/E2E | Gerencia super admin. |
| TC-HU004-002 | HU004 | CA-006 | Crear rol | Validar creacion de rol | Gerencia autenticada | Nombre de rol y permisos validos | 1. Abrir crear rol. 2. Completar datos. 3. Guardar. | El sistema crea el rol y confirma resultado. | Alta | Funcional | Positiva | Si, UI/API | Reglas de roles custom pendientes. |
| TC-HU004-003 | HU004 | CA-007 | Editar rol | Validar modificacion de rol | Rol existente editable | Datos/permisos nuevos | 1. Abrir rol. 2. Modificar informacion permitida. 3. Guardar. | El sistema guarda cambios y confirma resultado. | Alta | Funcional | Positiva | Si, UI/API | Roles base editables pendiente. |
| TC-HU004-004 | HU004 | CA-008 | Configurar permisos | Validar configuracion de permisos asociados | Rol existente | Permisos definidos | 1. Seleccionar rol. 2. Activar/desactivar permisos. 3. Guardar. 4. Validar acceso con usuario del rol. | Los permisos guardados se reflejan en acceso efectivo a funcionalidades. | Alta | Integracion / Seguridad | Positiva | Si, UI/E2E/API | Depende de matriz de permisos. |
| TC-HU004-005 | HU004 | CA-009 | Consultar roles | Validar consulta de roles existentes | Roles creados | Roles base y/o custom | 1. Abrir listado. 2. Consultar rol. | El sistema muestra roles y detalle permitido. | Media | Funcional | Positiva | Si, UI/API | Campos de detalle pendientes. |
| TC-HU004-006 | HU004 | CA-003 | Validar datos obligatorios | Validar rechazo de rol invalido | Formulario de rol disponible | Nombre vacio, permisos invalidos o duplicados si aplica | 1. Abrir formulario. 2. Ingresar datos invalidos. 3. Guardar. | No completa la operacion y muestra validaciones. | Media | Validacion | Negativa | Si, UI/API | Validaciones exactas pendientes. |
| TC-HU004-007 | HU004 | CA-004 | Bloquear Comercial/Analista | Validar restriccion para usuarios sin permiso | Comercial/Analista autenticado | Cuentas sin permiso | 1. Intentar abrir administracion de roles. 2. Intentar acceso directo si aplica. | El sistema bloquea la operacion y muestra permiso insuficiente. | Alta | Seguridad | Negativa | Si, UI/E2E/API | Validar UI y backend. |
| TC-HU004-008 | HU004 | Regla de alcance | Desactivar rol | Validar desactivacion de rol si la regla esta habilitada | Rol existente desactivable | Rol sin restriccion confirmada | 1. Seleccionar rol. 2. Ejecutar desactivar. 3. Confirmar. | El rol queda desactivado o el sistema informa restriccion segun regla aprobada. | Media | Funcional | Alterna | Si, UI/API | Alcance indica desactivar; regla final pendiente. |
| TC-HU004-009 | HU004 | Riesgo QA | Rol base o rol en uso | Validar comportamiento ante rol base/en uso | Rol Gerencia o rol asignado a usuario | Rol base/en uso | 1. Intentar editar/desactivar rol critico o en uso. | El sistema aplica la regla definida o bloquea accion con mensaje claro. | Alta | Seguridad / Edge | Edge | Pendiente | Reglas pendientes; no asumir comportamiento final. |

## Casos automatizables

- TC-HU004-001, TC-HU004-004 y TC-HU004-007 como regresion de permisos.
- TC-HU004-002, TC-HU004-003 y TC-HU004-005 como API/UI.
- TC-HU004-009 queda pendiente hasta definir reglas de roles base o en uso.

## Riesgos y pendientes

- Pendiente matriz detallada de permisos.
- Pendiente reglas sobre roles base, roles custom y roles en uso.
- Pendiente validaciones y auditoria.
