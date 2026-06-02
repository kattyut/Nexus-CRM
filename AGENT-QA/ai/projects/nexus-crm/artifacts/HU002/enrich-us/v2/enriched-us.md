# HU enriquecida - HU002: Recuperar acceso a la cuenta

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| Metodologia / estrategia | clasica_scrum - Clasica Scrum |
| Contexto breve | Recuperacion de acceso de usuario mediante correo electronico cuando no recuerda sus credenciales. |
| Prioridad | 2 |
| Version | v2 |
| Estado | Pendiente de aprobacion |

## Metadata tecnica

| Campo | Valor |
|---|---|
| Proyecto QA | Nexus CRM |
| Project slug | nexus-crm |
| HU ID | HU002 |
| Work Item Azure DevOps | 434 |
| Titulo origen | HU002 - Recuperar acceso a la cuenta |
| Provider | Azure DevOps |
| Source | Azure DevOps |
| Estrategia aplicada | clasica_scrum - Clasica Scrum |
| Archivo de reglas | ai/config/enrichment-options/clasica-scrum.md |
| Version fuente | source/v1 |
| Version analisis | analysis/v1 |
| Version enriquecimiento | v2 |
| Estado sincronizacion | No sincronizada |

## Historia original

Como usuario del sistema  
Quiero recuperar mi contrasena mediante correo electronico  
Para restablecer el acceso cuando no recuerde mis credenciales.

## Historia enriquecida

Como usuario del sistema  
Quiero solicitar la recuperacion de acceso mediante el correo electronico registrado  
Para poder restablecer mis credenciales y volver a ingresar al CRM cuando no recuerde mi contrasena.

## Contexto funcional

La HU permite que un usuario del CRM inicie un flujo de recuperacion desde el inicio de sesion cuando no recuerda su contrasena. La solicitud se realiza usando correo electronico y debe conservar seguridad, trazabilidad y mensajes que no expongan informacion sensible. El mecanismo exacto de recuperacion no esta confirmado en Azure DevOps, por lo que se deja como pendiente si sera enlace, codigo o token.

## Criterios de aceptacion

### CA-001 - Solicitud de recuperacion con correo registrado

Dado que el usuario se encuentra en la pantalla de inicio de sesion  
Y selecciona la opcion de recuperacion de acceso  
Cuando ingresa un correo electronico registrado y solicita recuperar su cuenta  
Entonces el sistema registra la solicitud de recuperacion  
Y envia las instrucciones de recuperacion al correo registrado segun el mecanismo confirmado por negocio.

### CA-002 - Solicitud con correo no registrado

Dado que el usuario se encuentra en la pantalla de recuperacion de acceso  
Cuando ingresa un correo electronico que no corresponde a una cuenta registrada  
Entonces el sistema muestra un mensaje generico de confirmacion de solicitud  
Y no revela si el correo existe o no existe en el CRM.

### CA-003 - Recuperacion con mecanismo valido

Dado que el usuario recibio las instrucciones de recuperacion en su correo  
Y el mecanismo de recuperacion sigue vigente segun la regla confirmada por negocio  
Cuando completa el flujo de restablecimiento de credenciales correctamente  
Entonces el sistema permite definir una nueva contrasena  
Y confirma que el acceso fue restablecido.

### CA-004 - Mecanismo de recuperacion vencido o invalido

Dado que el usuario intenta usar un mecanismo de recuperacion vencido, invalido o ya utilizado  
Cuando intenta continuar con el restablecimiento de credenciales  
Entonces el sistema no permite cambiar la contrasena  
Y muestra un mensaje de error que permita solicitar una nueva recuperacion sin exponer informacion sensible.

### CA-005 - Nueva contrasena no cumple politica

Dado que el usuario esta en el paso de definicion de nueva contrasena  
Cuando ingresa una contrasena que no cumple la politica de seguridad vigente del sistema  
Entonces el sistema rechaza el cambio  
Y muestra las condiciones de validacion aplicables sin guardar la contrasena invalida.

### CA-006 - Falla en envio de correo

Dado que el usuario solicita recuperar acceso mediante correo electronico  
Cuando el servicio de correo no puede procesar o enviar la notificacion  
Entonces el sistema informa que la solicitud no pudo completarse en ese momento  
Y conserva trazabilidad operativa del intento para revision tecnica o soporte.

## Reglas de negocio

### Reglas confirmadas por HU o contexto

- La recuperacion de acceso debe realizarse mediante correo electronico.
- El usuario objetivo es un usuario del sistema CRM.
- El objetivo funcional es restablecer acceso cuando el usuario no recuerda sus credenciales.
- La funcionalidad pertenece al modulo de seguridad y acceso de Nexus CRM.

### Reglas pendientes de validacion

- Confirmar si el mecanismo de recuperacion sera enlace, codigo, token u otro metodo.
- Confirmar vigencia del mecanismo de recuperacion.
- Confirmar si el mecanismo sera de un solo uso.
- Confirmar politica de contrasena vigente para el restablecimiento.
- Confirmar comportamiento para usuarios inactivos, bloqueados o sin correo verificado.
- Confirmar limite de solicitudes permitidas por usuario, correo, IP o periodo de tiempo.
- Confirmar mensajes exactos para correo registrado, correo no registrado, mecanismo invalido, mecanismo vencido y falla de correo.
- Confirmar si se requiere auditoria o notificacion adicional ante recuperaciones exitosas.

## Dependencias

- Pantalla o componente de inicio de sesion con opcion de recuperacion de acceso.
- Formulario para ingresar correo electronico.
- Servicio o proceso de envio de correo electronico.
- Mecanismo backend para generar y validar la recuperacion de acceso.
- Formulario seguro para definir nueva contrasena.
- Politica de contrasena definida para el sistema.
- Ambiente de pruebas con cuentas y correos controlados.

## Supuestos y dudas

- Pendiente de validacion: el flujo exacto posterior al correo todavia no esta documentado en Azure DevOps.
- Pendiente de validacion: no existe criterio de aceptacion original en el campo correspondiente de Azure DevOps.
- Pendiente de validacion: no estan definidos proveedor de correo, plantilla, remitente ni manejo de rebotes.
- Pendiente de validacion: no esta definido si el mensaje para correo no registrado debe ser exactamente el mismo que para correo registrado.
- Supuesto QA: para evitar enumeracion de cuentas, los mensajes no deben revelar si el correo esta registrado.

## Riesgos QA

- Riesgo de seguridad si el flujo permite enumerar cuentas mediante mensajes distintos.
- Riesgo de acceso indebido si no se define vigencia, uso unico o invalidacion del mecanismo de recuperacion.
- Riesgo de cobertura incompleta si se generan casos definitivos sin confirmar reglas de contrasena, correo y expiracion.
- Riesgo de bloqueo E2E si el ambiente de pruebas no cuenta con servicio de correo o inbox controlado.
- Riesgo de inconsistencias UX si los mensajes de error y exito no se definen antes del desarrollo.

## Validacion de consistencia

- El enriquecimiento conserva la intencion original de la HU.
- No se sincronizaron reglas no confirmadas como reglas definitivas.
- Los criterios propuestos son base de refinamiento y deben ser aprobados por negocio antes de generar pruebas definitivas o actualizar Azure DevOps.
