# HU enriquecida - HU001: Gestionar autenticacion de usuarios

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| Work Item | 433 |
| Metodologia / estrategia | clasica_scrum - Clasica Scrum |
| Contexto breve | Acceso seguro al CRM para usuarios internos segun funcionalidades autorizadas. |
| Prioridad | 2 |
| Version | v2 |
| Estado | Pendiente de aprobacion |

## Metadata tecnica

| Campo | Valor |
|---|---|
| Proyecto QA | Nexus CRM |
| Project slug | nexus-crm |
| HU ID | HU001 |
| Titulo | HU001 - Gestionar autenticacion de usuarios |
| Provider | Azure DevOps |
| Source | Azure DevOps |
| Work Item ID | 433 |
| Source version | source/v2 |
| Analysis version | analysis/v2 |
| Estrategia aplicada | clasica_scrum |
| Archivo de regla aplicado | ai/config/enrichment-options/clasica-scrum.md |
| Estado de sincronizacion | No sincronizado con Azure DevOps |
| Fecha de generacion | 2026-06-01T14:25:23.4250110-05:00 |

## Historia original

Como usuario del sistema  
Quiero iniciar y cerrar sesion de forma segura  
Para acceder unicamente a las funcionalidades autorizadas y proteger mi informacion.

Alcance indicado en Azure DevOps:

- Login.
- Logout.
- Validacion de credenciales.
- Manejo de sesion.
- Mensajes de error basicos.

## Historia enriquecida

Como usuario interno del CRM  
Quiero iniciar sesion, mantener una sesion activa controlada y cerrar sesion de forma segura  
Para acceder unicamente a las funcionalidades autorizadas de Nexus CRM y proteger la informacion comercial del sistema.

## Contexto funcional

La autenticacion es parte del modulo de Seguridad y acceso del MVP de Nexus CRM. Esta HU habilita el ingreso controlado de usuarios internos con roles Gerencia, Comercial o Analista. Gerencia actua como super admin del sistema. El objetivo funcional es permitir acceso al sistema solo a usuarios validos y ofrecer salida segura mediante cierre de sesion. La HU debe conservar trazabilidad con el Work Item 433 de Azure DevOps.

## Alcance funcional enriquecido

Incluye:

- Inicio de sesion de usuarios internos.
- Validacion de credenciales.
- Manejo de sesion activa.
- Cierre de sesion.
- Mensajes basicos ante errores de autenticacion.
- Bloqueo temporal por intentos fallidos.
- Restriccion de acceso a funcionalidades no autorizadas, segun reglas de permisos que deben ser confirmadas.

No incluye, salvo confirmacion del negocio:

- Recuperacion de contrasena.
- Autenticacion multifactor.
- Administracion completa de roles y permisos.
- Registro detallado de auditoria de accesos.

## Criterios de aceptacion

### CA-001 - Login exitoso

Dado que existe un usuario interno registrado y habilitado en Nexus CRM  
Cuando ingresa credenciales validas en el formulario de inicio de sesion  
Entonces el sistema debe permitir el acceso al CRM  
Y debe iniciar una sesion activa para el usuario autenticado.

### CA-002 - Acceso segun funcionalidades autorizadas

Dado que un usuario interno inicio sesion correctamente  
Cuando intenta acceder a funcionalidades del CRM  
Entonces el sistema debe permitir solo las funcionalidades autorizadas para su perfil o rol  
Y debe impedir el acceso a funcionalidades no autorizadas.

### CA-003 - Credenciales invalidas

Dado que un usuario intenta iniciar sesion  
Cuando ingresa credenciales invalidas  
Entonces el sistema no debe permitir el acceso  
Y debe mostrar un mensaje de error basico sin exponer informacion sensible sobre cual dato fue incorrecto.

### CA-004 - Campos obligatorios en login

Dado que un usuario se encuentra en el formulario de inicio de sesion  
Cuando intenta enviar el formulario sin completar los campos obligatorios  
Entonces el sistema debe impedir el envio  
Y debe indicar que la informacion requerida debe ser completada.

### CA-005 - Logout exitoso

Dado que un usuario tiene una sesion activa  
Cuando selecciona la opcion de cerrar sesion  
Entonces el sistema debe finalizar la sesion activa  
Y debe impedir el acceso posterior a areas protegidas sin autenticarse nuevamente.

### CA-006 - Acceso sin sesion activa

Dado que no existe una sesion activa valida  
Cuando un usuario intenta acceder directamente a una funcionalidad protegida del CRM  
Entonces el sistema debe impedir el acceso  
Y debe solicitar autenticacion.

### CA-007 - Sesion no valida o expirada

Dado que la sesion del usuario no es valida o ya expiro segun la politica definida  
Cuando el usuario intenta continuar usando el sistema  
Entonces el sistema debe impedir la operacion protegida  
Y debe solicitar un nuevo inicio de sesion.

### CA-008 - Bloqueo por intentos fallidos

Dado que un usuario intenta iniciar sesion con credenciales invalidas  
Cuando acumula 5 intentos fallidos consecutivos  
Entonces el sistema debe bloquear temporalmente nuevos intentos de inicio de sesion para esa cuenta durante 15 minutos  
Y debe mostrar un mensaje de bloqueo sin exponer informacion sensible.

## Reglas de negocio

- La autenticacion aplica a usuarios internos del CRM.
- El sistema debe validar credenciales antes de permitir acceso a funcionalidades protegidas.
- El sistema debe permitir cerrar sesion cuando exista una sesion activa.
- El sistema debe impedir acceso a areas protegidas cuando no exista sesion activa valida.
- Los mensajes de error de autenticacion deben ser basicos y no deben exponer informacion sensible.
- Los roles confirmados para Nexus CRM son Gerencia, Comercial y Analista.
- No existe un rol Administrador separado.
- Gerencia actua como super admin y tiene todos los permisos del sistema.
- Comercial tiene acceso limitado a funcionalidades esenciales para su cargo.
- Analista tiene permisos orientados a carga de datos, importacion de Excel y validacion operativa de datos importados; no debe acceder a dashboards ni insights.
- El sistema debe bloquear temporalmente la cuenta durante 15 minutos cuando se acumulen 5 intentos fallidos consecutivos.
- Las funcionalidades autorizadas dependen de roles o permisos; la matriz detallada de permisos por modulo esta pendiente de definicion.
- La politica de expiracion de sesion esta pendiente de definicion.
- MFA no esta confirmado para el MVP.
- Recuperacion de contrasena se gestiona en HU002.

## Dependencias

Dependencias documentadas:

- Modulo de Seguridad y acceso.
- Usuarios internos del CRM.
- Definicion de roles o permisos para Gerencia, Comercial y Analista.

Dependencias pendientes de confirmar:

- Mecanismo tecnico de autenticacion.
- Politica de sesion y expiracion.
- Fuente de datos de usuarios.
- Pantalla o ruta destino posterior al login.
- Comportamiento esperado ante usuario inactivo o no habilitado.
- Selectores, URLs y datos de prueba para automatizacion futura.

## Supuestos y dudas

- Regla confirmada: los roles del CRM son Gerencia, Comercial y Analista.
- Supuesto: esta HU cubre login, logout, validacion de credenciales, manejo de sesion y mensajes basicos, porque ese alcance viene de Azure DevOps.
- Pendiente de validacion: confirmar si MFA pertenece al MVP.
- Pendiente de validacion: definir mensajes exactos para credenciales invalidas, campos requeridos, usuario inactivo y sesion expirada.
- Duda funcional: cual es la pantalla destino luego de un login exitoso.
- Duda funcional: que funcionalidades iniciales puede ver Comercial sobre empresas/contactos, porque la regla de visibilidad todavia requiere refinamiento.

## Riesgos QA

- Riesgo alto de seguridad si no se definen reglas minimas de sesion y acceso.
- Riesgo de cobertura incompleta si los criterios de aceptacion no se validan con negocio.
- Riesgo de ambiguedad por falta de matriz de permisos.
- Riesgo de inconsistencias UX si no se definen mensajes de error.
- Riesgo de automatizacion prematura porque aun faltan URLs, selectores, datos de prueba y ambiente.

## Validacion QA posterior

El enriquecimiento mejora claridad, estructura y testeabilidad de la HU. Ya quedan confirmados los roles base, el alcance de Gerencia como super admin y el bloqueo por 5 intentos fallidos durante 15 minutos. No debe sincronizarse con Azure DevOps como definicion final hasta que negocio confirme matriz detallada de permisos, politica de sesion y mensajes esperados.
