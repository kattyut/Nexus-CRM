# HU enriquecida - HU001: Login

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Manual - texto proporcionado en conversacion |
| Metodologia / estrategia | clasica_scrum - Clasica Scrum |
| Contexto breve | Inicio de sesion con correo y contrasena para acceder al CRM. |
| Prioridad | Pendiente de definicion |
| Version | v1 |
| Estado | Pendiente de aprobacion |

## Metadata tecnica

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| HU ID | HU001 |
| Titulo | Login |
| Provider | Manual |
| Source | Texto manual |
| Estrategia aplicada | clasica_scrum - Clasica Scrum |
| Archivo de reglas | ai/config/enrichment-options/clasica-scrum.md |
| Sincronizacion Azure DevOps | No sincronizada |

## Historia original

Como usuario  
Quiero iniciar sesion con mi correo y contrasena  
Para acceder al sistema de manera segura

## Historia enriquecida

Como usuario del sistema Nexus CRM  
Quiero iniciar sesion con mi correo y contrasena  
Para acceder de manera segura a las funcionalidades del CRM segun mi perfil autorizado

## Contexto funcional

El login permite que los usuarios autorizados accedan al sistema Nexus CRM usando credenciales basicas: correo y contrasena. Esta capacidad protege la informacion comercial del sistema y habilita el acceso inicial a funcionalidades como gestion de empresas, contactos, actividades y dashboards, segun el perfil que tenga cada usuario.

El detalle de roles, permisos, politicas de contrasena, bloqueo de cuenta, recuperacion de contrasena y autenticacion multifactor queda pendiente de validacion funcional.

## Criterios de aceptacion

### CA-001 - Inicio de sesion exitoso

Dado que el usuario tiene una cuenta registrada y activa en Nexus CRM  
Y cuenta con correo y contrasena validos  
Cuando ingresa sus credenciales y solicita iniciar sesion  
Entonces el sistema debe permitir el acceso al CRM  
Y debe dirigir al usuario a la pantalla inicial correspondiente segun el comportamiento definido para su perfil.

### CA-002 - Correo requerido

Dado que el usuario esta en la pantalla de login  
Cuando intenta iniciar sesion sin ingresar correo  
Entonces el sistema debe impedir el inicio de sesion  
Y debe informar que el correo es obligatorio.

### CA-003 - Contrasena requerida

Dado que el usuario esta en la pantalla de login  
Cuando intenta iniciar sesion sin ingresar contrasena  
Entonces el sistema debe impedir el inicio de sesion  
Y debe informar que la contrasena es obligatoria.

### CA-004 - Credenciales invalidas

Dado que el usuario esta en la pantalla de login  
Cuando ingresa un correo o contrasena que no corresponde a una cuenta valida  
Entonces el sistema debe impedir el acceso  
Y debe mostrar un mensaje de error sin exponer informacion sensible sobre la cuenta o la contrasena.

### CA-005 - Acceso protegido sin autenticacion

Dado que una persona no ha iniciado sesion en Nexus CRM  
Cuando intenta acceder a una funcionalidad interna del sistema  
Entonces el sistema debe impedir el acceso directo  
Y debe solicitar autenticacion antes de permitir la navegacion interna.

### CA-006 - Formato basico de correo

Dado que el usuario esta en la pantalla de login  
Cuando ingresa un valor que no corresponde a un formato de correo valido  
Entonces el sistema debe impedir el inicio de sesion  
Y debe informar que el correo ingresado no tiene un formato valido.

## Reglas de negocio

- Solo usuarios autorizados deben poder acceder a las funcionalidades internas de Nexus CRM.
- El login se realiza con correo y contrasena, segun la HU original.
- El sistema no debe permitir acceso a funcionalidades internas sin autenticacion previa.
- Los mensajes de error no deben revelar informacion sensible sobre existencia de cuentas, estado de cuenta o contrasenas.

## Dependencias

- Modulo o mecanismo de gestion de usuarios.
- Definicion de perfiles y permisos del sistema.
- Definicion del destino posterior al login para cada perfil o para el flujo inicial comun.
- Definicion de datos de prueba: usuarios validos, usuarios invalidos y estados de cuenta.

## Supuestos y dudas

- Supuesto: todos los perfiles identificados para Nexus CRM pueden usar el login, salvo que negocio defina restricciones.
- Pendiente de validacion: si el login debe diferenciar gerencia, equipo comercial, analistas y administrador desde el acceso inicial.
- Pendiente de validacion: si existen cuentas inactivas, bloqueadas o pendientes de activacion.
- Pendiente de validacion: si se requiere recuperacion de contrasena en el MVP.
- Pendiente de validacion: si se requiere autenticacion multifactor.
- Pendiente de validacion: si existe politica de expiracion de sesion.
- Pendiente de validacion: si existe politica de bloqueo por intentos fallidos.

## Riesgos QA

- Riesgo alto de seguridad si no se definen reglas de sesion, bloqueo, mensajes y acceso no autenticado.
- Riesgo de alcance si negocio espera recuperacion de contrasena, MFA o politicas avanzadas dentro del MVP.
- Riesgo de pruebas incompletas si no se definen estados de usuario y roles permitidos.
- Riesgo de trazabilidad porque esta version fue generada desde texto manual y no desde Work Item validado en Azure DevOps.

## Validacion posterior

Esta HU enriquecida mejora claridad, criterios verificables y cobertura QA inicial sin sincronizar cambios en Azure DevOps. Para aprobacion final se recomienda validar los pendientes funcionales y asociar esta version al Work Item real cuando la conexion este configurada.

