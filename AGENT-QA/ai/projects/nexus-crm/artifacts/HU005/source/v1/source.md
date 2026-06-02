# Source - HU005

## Identificacion

| Campo | Valor |
|---|---|
| Proyecto QA | Nexus CRM |
| Proyecto Azure DevOps | Nexus |
| HU funcional | HU005 |
| Work Item ID | 447 |
| Titulo | HU005 - Asignar/restringir roles |
| Provider | Azure DevOps |
| Source | Azure DevOps |
| Tipo | User Story |
| Estado | New |
| Prioridad | 2 |
| Revision | 6 |
| Area Path | Nexus |
| Iteration Path | Nexus\Sprint 1 |
| Fecha creacion | 2026-05-29T18:22:59.12Z |
| Fecha cambio | 2026-06-02T21:19:05.76Z |

## Historia original normalizada

Como administrador del CRM  
Quiero asignar y modificar roles de los usuarios internos  
Para garantizar que cada usuario acceda solo a las funcionalidades autorizadas segun sus responsabilidades dentro de Nexus CRM.

## Alcance indicado en Azure DevOps

- Historia enriquecida.
- Contexto funcional.
- La HU pertenece al modulo de seguridad y acceso de Nexus CRM. Permite controlar autorizaciones mediante roles, evitando que usuarios internos accedan a funcionalidades que no corresponden a su perfil. El alcance indicado en Azure DevOps incluye asignacion de rol, cambio de rol, restriccion de acceso y validacion de permisos. Por tratarse de una HU sensible de seguridad, las reglas propuestas deben ser confirmadas antes de generar pruebas definitivas.
- Reglas confirmadas por HU o contexto.
- La HU pertenece al modulo de seguridad y acceso de Nexus CRM.
- El actor principal es el administrador.
- El administrador necesita asignar y modificar roles de usuarios.
- El objetivo funcional es limitar el acceso a funcionalidades segun el rol.

## Criterios de aceptacion originales

Criterios de aceptacion propuestos 
CA-001 - Asignar rol a usuario 
Dado que el administrador tiene permiso para gestionar roles
Y existe un usuario registrado en el sistema
Cuando asigna un rol permitido al usuario
Entonces el sistema guarda la asignacion
Y el usuario queda asociado al rol seleccionado. 
CA-002 - Cambiar rol de usuario 
Dado que existe un usuario con un rol asignado
Y el administrador tiene permiso para modificar roles
Cuando cambia el rol del usuario por otro rol permitido
Entonces el sistema actualiza el rol del usuario
Y conserva la informacion necesaria para trazabilidad si auditoria es requerida por negocio. 
CA-003 - Validar rol obligatorio 
Dado que el administrador esta asignando o modificando el rol de un usuario
Cuando intenta guardar sin seleccionar un rol valido
Entonces el sistema no guarda el cambio
Y muestra una validacion que indique que el rol es obligatorio o invalido. 
CA-004 - Restringir funcionalidades por rol 
Dado que un usuario tiene un rol asignado
Cuando intenta acceder a una funcionalidad no permitida para su rol
Entonces el sistema bloquea el acceso
Y muestra un mensaje de acceso no autorizado o permiso insuficiente. 
CA-005 - Permitir funcionalidades autorizadas por rol 
Dado que un usuario tiene un rol asignado
Cuando accede a una funcionalidad permitida para ese rol
Entonces el sistema permite la operacion
Y mantiene la experiencia segun los permisos configurados. 
CA-006 - Bloquear cambios de rol sin permiso 
Dado que un usuario sin permiso de administracion intenta asignar o cambiar roles
Cuando ejecuta la accion
Entonces el sistema bloquea la operacion
Y no modifica el rol del usuario afectado. 
CA-007 - Aplicar cambio de permisos 
Dado que el rol de un usuario fue modificado
Cuando el usuario intenta acceder a funcionalidades del sistema
Entonces el sistema evalua los permisos vigentes del rol actualizado
Y permite o restringe el acceso segun la regla confirmada de aplicacion del cambio. 
CA-008 - Evitar asignaciones no permitidas 
Dado que existen roles con restricciones especiales
Cuando el administrador intenta asignar un rol que no puede otorgar o modificar
Entonces el sistema bloquea la asignacion
Y mantiene el rol anterior del usuario.

## Trazabilidad

- `System.Id`: 447.
- `System.TeamProject`: Nexus.
- `System.WorkItemType`: User Story.
- `System.State`: New.
- `System.Tags`: clasica_scrum; pending-validation; qa-enriched.
