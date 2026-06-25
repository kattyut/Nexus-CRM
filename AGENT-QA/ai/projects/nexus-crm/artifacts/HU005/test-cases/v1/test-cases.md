# Casos de prueba - HU005: Asignar/restringir roles

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
| Positiva | 3 | Acceso Gerencia, asignacion y modificacion de rol |
| Negativa | 3 | Rol invalido, usuario sin permiso y acceso restringido |
| Alterna | 1 | Cambio de rol aplicado a funcionalidades |
| Edge | 1 | Cambio de rol con sesion activa |
| Automatizable | 8 | UI/API/E2E |

## Casos de prueba

| ID | HU ID | Criterio asociado | Titulo | Objetivo | Precondiciones | Datos de prueba | Pasos | Resultado esperado | Prioridad | Tipo de prueba | Cobertura | Automatizable | Notas QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| TC-HU005-001 | HU005 | CA-001 | Acceso Gerencia a asignacion | Validar acceso de Gerencia al flujo | Gerencia autenticada | Cuenta Gerencia | 1. Iniciar sesion. 2. Abrir asignacion/restriccion de roles. | La funcionalidad se presenta disponible segun permisos. | Alta | Seguridad / Funcional | Positiva | Si, UI/E2E | Gerencia es super admin. |
| TC-HU005-002 | HU005 | CA-006 | Asignar rol valido | Validar asignacion de rol permitido | Usuario interno existente | Rol Gerencia, Comercial o Analista | 1. Seleccionar usuario. 2. Elegir rol valido. 3. Guardar. | El rol se guarda y aplica permisos correspondientes. | Alta | Funcional / Integracion | Positiva | Si, UI/API | Roles validos confirmados. |
| TC-HU005-003 | HU005 | CA-002 | Modificar rol de usuario | Validar cambio de rol existente | Usuario con rol asignado | Rol anterior y rol nuevo | 1. Abrir usuario. 2. Cambiar rol. 3. Guardar. | El sistema procesa cambio y confirma resultado. | Alta | Funcional | Positiva | Si, UI/API | Validar persistencia. |
| TC-HU005-004 | HU005 | CA-007 | Rechazar rol invalido o vacio | Validar validacion de rol requerido | Gerencia editando usuario | Rol vacio/no valido | 1. Seleccionar usuario. 2. Dejar rol vacio o enviar rol invalido. 3. Guardar. | El sistema impide guardar y muestra validacion clara. | Alta | Validacion | Negativa | Si, UI/API | Mensajes pendientes. |
| TC-HU005-005 | HU005 | CA-008 | Aplicar restricciones por rol | Validar acceso posterior segun rol asignado | Usuario con rol asignado | Usuario Comercial/Analista | 1. Asignar rol. 2. Iniciar sesion con usuario modificado. 3. Intentar acceder a funcionalidad permitida y no permitida. | Permite solo funcionalidades autorizadas y restringe las no autorizadas. | Alta | Seguridad / E2E | Alterna | Si, UI/E2E | Depende de matriz de permisos. |
| TC-HU005-006 | HU005 | CA-004 | Bloquear usuario sin permiso | Validar que Comercial/Analista no cambien roles | Comercial/Analista autenticado | Cuentas sin permiso | 1. Intentar abrir asignacion de roles. 2. Intentar cambio directo si aplica. | El sistema bloquea operacion y muestra permiso insuficiente. | Alta | Seguridad | Negativa | Si, UI/API | Validar backend. |
| TC-HU005-007 | HU005 | CA-009 | Trazabilidad del cambio de rol | Validar registro minimo del cambio | Cambio de rol exitoso | Usuario, rol anterior, rol nuevo | 1. Cambiar rol. 2. Consultar evidencia de trazabilidad disponible. | Registra usuario modificado, rol anterior, rol nuevo, usuario que realizo el cambio y fecha. | Media | Auditoria / Integracion | Positiva | Pendiente | Mecanismo de trazabilidad pendiente. |
| TC-HU005-008 | HU005 | Riesgo QA | Cambio de rol con sesion activa | Validar efecto sobre sesion vigente | Usuario autenticado mientras Gerencia cambia su rol | Usuario con sesion activa | 1. Iniciar sesion con usuario. 2. Cambiar rol desde Gerencia. 3. Intentar usar funcionalidad afectada. | El sistema aplica regla definida para permisos vigentes o solicita nueva sesion, segun definicion. | Alta | Seguridad / Edge | Edge | Pendiente | Regla pendiente; documentar resultado observado. |

## Casos automatizables

- TC-HU005-002, TC-HU005-003 y TC-HU005-004 como API/UI repetitivos.
- TC-HU005-005 y TC-HU005-006 como regresion de seguridad.
- TC-HU005-008 queda pendiente hasta definir comportamiento con sesion activa.

## Riesgos y pendientes

- Pendiente matriz de permisos por modulo.
- Pendiente regla de visibilidad del rol Comercial.
- Pendiente comportamiento ante sesion activa y mensajes esperados.
