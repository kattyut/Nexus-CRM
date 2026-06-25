# Casos de prueba - HU003: Administrar usuarios

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
| Positiva | 5 | Crear, consultar, editar, activar y desactivar usuarios |
| Negativa | 2 | Validaciones y acceso sin permiso |
| Alterna | 1 | Trazabilidad funcional |
| Edge | 1 | Usuario desactivado intentando acceder |
| Automatizable | 9 | UI/API cuando existan endpoints |

## Casos de prueba

| ID | HU ID | Criterio asociado | Titulo | Objetivo | Precondiciones | Datos de prueba | Pasos | Resultado esperado | Prioridad | Tipo de prueba | Cobertura | Automatizable | Notas QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| TC-HU003-001 | HU003 | CA-001 | Acceso Gerencia | Validar que Gerencia accede a administracion de usuarios | Usuario Gerencia autenticado | Cuenta Gerencia | 1. Iniciar sesion como Gerencia. 2. Abrir administracion de usuarios. | La funcionalidad se presenta disponible segun permisos. | Alta | Seguridad / Funcional | Positiva | Si, UI/E2E | Gerencia actua como super admin. |
| TC-HU003-002 | HU003 | CA-002 | Crear usuario | Validar creacion de usuario interno | Gerencia autenticada | Datos requeridos de usuario | 1. Abrir crear usuario. 2. Completar datos validos. 3. Guardar. | El sistema crea el usuario y confirma resultado. | Alta | Funcional | Positiva | Si, UI/API | Campos exactos pendientes. |
| TC-HU003-003 | HU003 | CA-006 | Consultar usuario | Validar consulta de usuarios existentes | Existen usuarios registrados | Usuario existente | 1. Abrir listado/busqueda. 2. Buscar usuario. 3. Ver detalle. | El sistema muestra informacion del usuario consultado. | Media | Funcional | Positiva | Si, UI/API | Criterios de busqueda segun UI final. |
| TC-HU003-004 | HU003 | CA-006 | Editar usuario | Validar actualizacion de usuario | Usuario existente editable | Datos nuevos validos | 1. Abrir detalle. 2. Modificar campos permitidos. 3. Guardar. | El sistema actualiza informacion y confirma resultado. | Alta | Funcional | Positiva | Si, UI/API | Campos editables pendientes. |
| TC-HU003-005 | HU003 | CA-006 | Desactivar usuario | Validar desactivacion de usuario | Usuario activo existente | Usuario activo | 1. Seleccionar usuario. 2. Ejecutar desactivar. 3. Confirmar. | El usuario queda desactivado y no debe mantener acceso activo segun regla definida. | Alta | Funcional / Seguridad | Edge | Si, UI/API | Comportamiento de sesion activa pendiente. |
| TC-HU003-006 | HU003 | CA-006 | Activar usuario | Validar activacion de usuario desactivado | Usuario desactivado existente | Usuario desactivado | 1. Seleccionar usuario desactivado. 2. Ejecutar activar. 3. Confirmar. | El usuario queda activo y disponible segun permisos asignados. | Media | Funcional | Positiva | Si, UI/API | Depende de estado de usuario. |
| TC-HU003-007 | HU003 | CA-003 | Validar datos obligatorios | Validar rechazo de datos faltantes o invalidos | Gerencia en formulario de usuario | Campos vacios/invalidos | 1. Abrir formulario. 2. Omitir datos requeridos. 3. Guardar. | No completa la operacion y muestra validaciones. | Media | Validacion | Negativa | Si, UI/API | Campos y mensajes pendientes. |
| TC-HU003-008 | HU003 | CA-004 | Bloquear Comercial/Analista | Validar que usuarios sin permiso no administren usuarios | Usuarios Comercial y Analista existentes | Cuentas sin permiso | 1. Iniciar sesion como Comercial o Analista. 2. Intentar abrir administracion de usuarios. | El sistema bloquea la operacion y muestra permiso insuficiente. | Alta | Seguridad | Negativa | Si, UI/E2E/API | Validar tambien acceso directo a ruta/API. |
| TC-HU003-009 | HU003 | CA-005 | Trazabilidad de cambio | Validar registro minimo si negocio lo confirma | Operacion completada por Gerencia | Cambio de usuario | 1. Editar/activar/desactivar usuario. 2. Consultar evidencia de trazabilidad disponible. | Se registra informacion necesaria para trazabilidad funcional o auditoria si esta habilitada. | Media | Auditoria / Integracion | Alterna | Pendiente | Auditoria pendiente de confirmacion. |

## Casos automatizables

- TC-HU003-001, TC-HU003-002, TC-HU003-004, TC-HU003-005 y TC-HU003-008 como regresion prioritaria.
- Operaciones CRUD son buenas candidatas API.
- TC-HU003-009 queda pendiente hasta confirmar auditoria.

## Riesgos y pendientes

- Pendiente campos obligatorios, campos editables y mensajes.
- Pendiente definir efecto de desactivar usuario con sesion activa.
- Pendiente confirmar auditoria o historial de cambios.
