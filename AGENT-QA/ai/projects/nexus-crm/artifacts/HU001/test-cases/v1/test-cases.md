# Casos de prueba - HU001: Gestionar autenticacion de usuarios

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| HU version base | enrich-us/v2 |
| Plan de pruebas base | test-plan/v1 |
| Metodologia QA | basado_cobertura - Basado en Cobertura |
| Prioridad | 2 |
| Cobertura | Positiva / Negativa / Alterna / Edge / Automatizable |
| Version de casos | v1 |
| Estado | Pendiente de aprobacion |

## Resumen de cobertura

| Tipo de cobertura | Cantidad | Observaciones |
|---|---:|---|
| Positiva | 2 | Login y logout exitosos |
| Negativa | 3 | Credenciales invalidas, campos obligatorios y acceso sin sesion |
| Alterna | 2 | Permisos por rol y sesion expirada |
| Edge | 1 | Bloqueo por 5 intentos fallidos |
| Automatizable | 8 | UI/E2E y API cuando existan endpoints |

## Casos de prueba

| ID | HU ID | Criterio asociado | Titulo | Objetivo | Precondiciones | Datos de prueba | Pasos | Resultado esperado | Prioridad | Tipo de prueba | Cobertura | Automatizable | Notas QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| TC-HU001-001 | HU001 | CA-001 | Login exitoso | Validar acceso con credenciales validas | Usuario interno registrado y habilitado | Usuario Gerencia/Comercial/Analista valido | 1. Abrir login. 2. Ingresar credenciales validas. 3. Enviar formulario. | El sistema permite acceso e inicia sesion activa. | Alta | Funcional / Smoke | Positiva | Si, UI/E2E/API | Pantalla destino pendiente de definicion. |
| TC-HU001-002 | HU001 | CA-002 | Acceso segun rol | Validar que cada rol vea solo funcionalidades autorizadas | Usuario autenticado por rol | Usuarios Gerencia, Comercial, Analista | 1. Iniciar sesion con cada rol. 2. Intentar acceder a funcionalidades protegidas. | Se permiten funcionalidades autorizadas y se bloquean las no autorizadas. | Alta | Seguridad / Regresion | Alterna | Si, UI/E2E | Depende de matriz final de permisos. |
| TC-HU001-003 | HU001 | CA-003 | Credenciales invalidas | Validar rechazo de credenciales erroneas | Login disponible | Usuario o contrasena invalida | 1. Abrir login. 2. Ingresar credenciales invalidas. 3. Enviar. | No permite acceso y muestra mensaje basico sin exponer que dato fallo. | Alta | Seguridad / Funcional | Negativa | Si, UI/API | Mensaje exacto pendiente. |
| TC-HU001-004 | HU001 | CA-004 | Campos obligatorios vacios | Validar obligatoriedad en login | Login disponible | Campos vacios o incompletos | 1. Abrir login. 2. Dejar campos requeridos vacios. 3. Enviar. | El sistema impide envio e indica que la informacion requerida debe completarse. | Media | Validacion | Negativa | Si, UI | Campos exactos segun formulario final. |
| TC-HU001-005 | HU001 | CA-005 | Logout exitoso | Validar cierre seguro de sesion | Usuario autenticado | Usuario valido | 1. Iniciar sesion. 2. Seleccionar cerrar sesion. | La sesion finaliza y el usuario sale del area protegida. | Alta | Funcional / Smoke | Positiva | Si, UI/E2E | Validar limpieza de sesion segun implementacion. |
| TC-HU001-006 | HU001 | CA-006 | Acceso directo sin sesion | Validar bloqueo de ruta protegida sin autenticacion | No existe sesion activa | URL/ruta protegida | 1. Cerrar sesion o limpiar sesion. 2. Intentar abrir ruta protegida. | El sistema impide acceso y solicita autenticacion. | Alta | Seguridad | Negativa | Si, UI/E2E/API | Ruta protegida pendiente de definicion. |
| TC-HU001-007 | HU001 | CA-007 | Sesion expirada | Validar comportamiento ante sesion no valida o expirada | Usuario con sesion expirada o token invalido | Sesion manipulada/expirada | 1. Iniciar sesion. 2. Forzar expiracion o invalidacion. 3. Intentar operar. | El sistema bloquea la operacion protegida y solicita nuevo login. | Alta | Seguridad / Integracion | Alterna | Si, API/E2E | Politica de expiracion pendiente. |
| TC-HU001-008 | HU001 | CA-008 | Bloqueo por intentos fallidos | Validar bloqueo temporal al quinto intento fallido | Cuenta habilitada | 5 intentos con credenciales invalidas | 1. Intentar login invalido 4 veces. 2. Intentar quinta vez. 3. Intentar nuevamente durante 15 minutos. | La cuenta queda bloqueada temporalmente durante 15 minutos y muestra mensaje no sensible. | Alta | Seguridad / Boundary | Edge | Si, API/E2E | Requiere controlar tiempo o configuracion en QA. |

## Casos automatizables

- TC-HU001-001, TC-HU001-005 y TC-HU001-006 como smoke E2E.
- TC-HU001-003, TC-HU001-007 y TC-HU001-008 como API/regresion de seguridad.
- TC-HU001-002 como regresion por roles cuando exista matriz final.

## Riesgos y pendientes

- Pendiente matriz final de permisos.
- Pendiente politica exacta de expiracion de sesion.
- Pendiente mensajes exactos y pantalla destino posterior al login.
