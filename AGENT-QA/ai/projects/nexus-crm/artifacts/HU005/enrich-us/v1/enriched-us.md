# HU enriquecida - HU005: Asignar/restringir roles

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| Metodologia / estrategia | clasica_scrum - Clasica Scrum |
| Contexto breve | Asignar/restringir roles. |
| Prioridad | 2 |
| Version | v1 |
| Estado | Pendiente de aprobacion |

## Metadata tecnica

| Campo | Valor |
|---|---|
| Proyecto QA | Nexus CRM |
| Project slug | nexus-crm |
| HU ID | HU005 |
| Work Item Azure DevOps | 447 |
| Titulo origen | HU005 - Asignar/restringir roles |
| Provider | Azure DevOps |
| Source | Azure DevOps |
| Estrategia aplicada | clasica_scrum - Clasica Scrum |
| Archivo de reglas | ai/config/enrichment-options/clasica-scrum.md |
| Version fuente | source/v1 |
| Version analisis | analysis/v1 |
| Version enriquecimiento | v1 |
| Estado sincronizacion | Sincronizada con Azure DevOps |

## Historia original

Como usuario de Gerencia  
Quiero asignar y modificar roles de los usuarios internos  
Para garantizar que cada usuario acceda solo a las funcionalidades autorizadas segun sus responsabilidades dentro de Nexus CRM.

## Historia enriquecida

Como usuario de Gerencia  
Quiero asignar y modificar roles de los usuarios internos  
Para garantizar que cada usuario acceda solo a las funcionalidades autorizadas segun sus responsabilidades dentro de Nexus CRM.

## Contexto funcional

La HU HU005 pertenece al backlog funcional de Nexus CRM y cubre la capacidad 'Asignar/restringir roles'. La asignacion y modificacion de roles queda reservada al rol Gerencia, que actua como super admin del sistema. No existe un rol Administrador separado en Nexus CRM.

## Criterios de aceptacion

### CA-001 - Acceso a la funcionalidad

Dados que un usuario con rol Gerencia accede a Nexus CRM  
Cuando solicita asignar/restringir roles  
Entonces el sistema presenta la funcionalidad disponible segun sus permisos.

### CA-002 - Ejecutar operacion principal

Dados que el usuario cuenta con rol Gerencia  
Cuando completa la informacion requerida para asignar/restringir roles  
Entonces el sistema procesa la operacion  
Y confirma el resultado de forma clara.

### CA-003 - Validar informacion obligatoria

Dado que el usuario esta ejecutando asignar/restringir roles  
Cuando omite informacion obligatoria o ingresa datos invalidos  
Entonces el sistema no completa la operacion  
Y muestra las validaciones correspondientes.

### CA-004 - Restringir usuario sin permiso

Dados que un usuario con rol Comercial o Analista intenta asignar/restringir roles  
Cuando solicita la accion  
Entonces el sistema bloquea la operacion  
Y muestra un mensaje de permiso insuficiente.

### CA-005 - Mantener trazabilidad

Dado que la operacion asignar/restringir roles se completa correctamente  
Cuando el sistema guarda el resultado  
Entonces registra la informacion necesaria para trazabilidad funcional o auditoria si negocio lo confirma.

### CA-006 - Asignar rol valido

Dados que Gerencia esta editando un usuario interno  
Cuando selecciona uno de los roles validos del sistema  
Entonces el sistema permite guardar el rol asignado  
Y aplica los permisos correspondientes al usuario.

### CA-007 - Rechazar rol invalido

Dados que Gerencia esta editando un usuario interno  
Cuando intenta guardar un usuario sin rol o con un rol no valido  
Entonces el sistema impide guardar el cambio  
Y muestra una validacion clara sobre el rol requerido.

### CA-008 - Aplicar restricciones por rol

Dados que un usuario tiene asignado un rol especifico  
Cuando intenta acceder a una funcionalidad del CRM  
Entonces el sistema permite solo las funcionalidades autorizadas para ese rol  
Y restringe las funcionalidades no autorizadas.

### CA-009 - Mantener trazabilidad del cambio de rol

Dados que Gerencia modifica el rol de un usuario interno  
Cuando el cambio se guarda correctamente  
Entonces el sistema conserva trazabilidad minima del usuario modificado, rol anterior, rol nuevo, usuario que realizo el cambio y fecha del cambio.

## Reglas de negocio

### Reglas confirmadas por HU o contexto

- La HU fue leida desde Azure DevOps como Work Item 447.
- El titulo funcional es HU005 - Asignar/restringir roles.
- El estado actual en Azure DevOps es New.
- La HU debe mantener trazabilidad con el proyecto Nexus.
- Solo Gerencia puede asignar y modificar roles de usuarios internos.
- No existe un rol Administrador separado para Nexus CRM.
- Los roles validos del sistema son Gerencia, Comercial y Analista.
- Gerencia actua como super admin y tiene todos los permisos.
- Comercial tiene acceso limitado a funcionalidades esenciales para su cargo.
- Analista tiene permisos orientados a carga/importacion de datos y validacion operativa de informacion importada; no debe acceder a dashboards ni insights.
- El sistema debe conservar trazabilidad minima de cambios de rol.

### Reglas pendientes de validacion

- Confirmar criterios de aceptacion definitivos con negocio.
- Confirmar matriz detallada de permisos por modulo.
- Confirmar regla de visibilidad del rol Comercial sobre empresas y contactos.
- Confirmar campos obligatorios, validaciones y mensajes esperados.
- Confirmar excepciones funcionales y escenarios negativos.
- Confirmar si se requiere auditoria o historial de cambios.

## Dependencias

- Modulo o pantalla funcional correspondiente en Nexus CRM.
- Modelo de permisos y roles del sistema.
- Persistencia de datos asociada a la funcionalidad.
- Validaciones de backend y frontend.
- Datos de prueba representativos para QA.

## Riesgos QA

- Riesgo de cobertura incompleta si los criterios no son validados por negocio.
- Riesgo de comportamiento inconsistente si permisos y validaciones no estan definidos.
- Riesgo de regresion en flujos relacionados del CRM.
- Riesgo de automatizacion prematura sin datos y reglas confirmadas.

## Validacion de consistencia

- El enriquecimiento conserva la intencion original de la HU.
- Los criterios propuestos derivan del alcance leido en Azure DevOps.
- Las reglas no documentadas en Azure DevOps se registran como pendientes de validacion.
- La HU queda preparada para refinamiento funcional y posterior generacion de plan/casos.
