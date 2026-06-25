# Casos de prueba - HU006: Administrar empresas

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
| Positiva | 4 | Crear, consultar, editar y desactivar empresa |
| Negativa | 2 | Validaciones y acceso sin permiso |
| Alterna | 2 | Estados Sin seguimiento y Prioritaria |
| Edge | 1 | Parametro de 30 dias sin actividad |
| Automatizable | 9 | UI/API/E2E |

## Casos de prueba

| ID | HU ID | Criterio asociado | Titulo | Objetivo | Precondiciones | Datos de prueba | Pasos | Resultado esperado | Prioridad | Tipo de prueba | Cobertura | Automatizable | Notas QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| TC-HU006-001 | HU006 | CA-001 | Acceso a administrar empresas | Validar que usuario autorizado acceda al modulo | Usuario autorizado autenticado | Usuario Comercial o rol autorizado | 1. Iniciar sesion. 2. Abrir administracion de empresas. | El sistema presenta funcionalidad segun permisos. | Alta | Funcional / Seguridad | Positiva | Si, UI/E2E | Perfiles autorizados pendientes de confirmacion. |
| TC-HU006-002 | HU006 | CA-007 | Crear empresa | Validar alta de empresa con datos validos | Usuario autorizado | Nombre, sector, estado, fuente, responsable | 1. Abrir crear empresa. 2. Completar campos validos. 3. Guardar. | La empresa se crea y se confirma resultado. | Alta | Funcional / Smoke | Positiva | Si, UI/API | Campos obligatorios iniciales confirmados. |
| TC-HU006-003 | HU006 | CA-008 | Editar empresa | Validar actualizacion de informacion | Empresa existente | Datos actualizados validos | 1. Abrir empresa. 2. Modificar campos permitidos. 3. Guardar. | El sistema actualiza informacion y confirma resultado. | Alta | Funcional | Positiva | Si, UI/API | Campos editables pendientes. |
| TC-HU006-004 | HU006 | CA-009 | Desactivar empresa | Validar cambio a estado inactivo o desactivacion | Empresa activa existente | Empresa activa | 1. Seleccionar empresa. 2. Ejecutar desactivar. 3. Confirmar. | La empresa queda desactivada/inactiva segun regla definida. | Alta | Funcional | Positiva | Si, UI/API | Comportamiento exacto pendiente. |
| TC-HU006-005 | HU006 | CA-002 | Consultar empresa | Validar consulta de empresa centralizada | Empresa existente | Empresa creada previamente | 1. Abrir listado/busqueda. 2. Consultar empresa. 3. Abrir detalle. | El sistema muestra informacion registrada de la empresa. | Media | Funcional | Positiva | Si, UI/API | Busqueda/filtros dependen de UI final. |
| TC-HU006-006 | HU006 | CA-003, CA-010 | Validar campos obligatorios | Validar rechazo de datos incompletos o invalidos | Formulario disponible | Nombre, sector, estado, fuente o responsable vacios | 1. Abrir crear/editar empresa. 2. Omitir campo requerido. 3. Guardar. | No completa operacion y muestra validaciones correspondientes. | Alta | Validacion | Negativa | Si, UI/API | Mensajes exactos pendientes. |
| TC-HU006-007 | HU006 | CA-004 | Configurar Sin seguimiento | Validar parametro de estado Sin seguimiento | Gerencia con acceso a parametros | Umbral 30 dias sin actividad | 1. Configurar umbral de seguimiento. 2. Tener empresa sin actividad por periodo definido o simulado. 3. Consultar estado. | El sistema refleja estado `Sin seguimiento` segun regla parametrizada. | Alta | Integracion / Boundary | Edge | Si, API/E2E | Requiere control de fechas. |
| TC-HU006-008 | HU006 | CA-004 | Marcar empresa Prioritaria | Validar estado o flag Prioritaria | Gerencia o usuario autorizado segun regla | Empresa existente | 1. Abrir empresa/configuracion. 2. Marcar Prioritaria. 3. Guardar. | El sistema guarda configuracion y refleja prioridad segun regla definida. | Media | Funcional | Alterna | Si, UI/API | Pendiente confirmar si es estado o flag. |
| TC-HU006-009 | HU006 | CA-005 | Bloquear usuario sin permiso | Validar restriccion de administracion de empresas | Usuario no autorizado autenticado | Rol sin permiso | 1. Intentar abrir modulo de empresas. 2. Intentar accion directa si aplica. | El sistema bloquea operacion y muestra permiso insuficiente. | Alta | Seguridad | Negativa | Si, UI/API | Depende de matriz de permisos. |

## Casos automatizables

- TC-HU006-002, TC-HU006-003, TC-HU006-004 y TC-HU006-005 como regresion CRUD.
- TC-HU006-006 como validacion repetitiva de formulario.
- TC-HU006-007 requiere control de fecha o API para parametrizacion.

## Riesgos y pendientes

- Pendiente matriz de permisos para empresas.
- Pendiente mensajes y validaciones exactas.
- Pendiente definir si `Prioritaria` es estado, flag o configuracion independiente.
- Duplicados, contactos e importacion masiva quedan fuera de esta HU.
