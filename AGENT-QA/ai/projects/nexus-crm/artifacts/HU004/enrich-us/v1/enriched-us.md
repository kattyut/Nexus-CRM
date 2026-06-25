# HU enriquecida - HU004: Administrar roles

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| Metodologia / estrategia | clasica_scrum - Clasica Scrum |
| Contexto breve | Administrar roles. |
| Prioridad | 2 |
| Version | v1 |
| Estado | Pendiente de aprobacion |

## Metadata tecnica

| Campo | Valor |
|---|---|
| Proyecto QA | Nexus CRM |
| Project slug | nexus-crm |
| HU ID | HU004 |
| Work Item Azure DevOps | 446 |
| Titulo origen | HU004 - Administrar roles |
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
Quiero crear, modificar y configurar roles junto con sus permisos asociados  
Para controlar qué funcionalidades puede utilizar cada tipo de usuario dentro del sistema.

## Historia enriquecida

Como usuario de Gerencia  
Quiero crear, modificar y configurar roles junto con sus permisos asociados  
Para controlar qué funcionalidades puede utilizar cada tipo de usuario dentro del sistema.  
Para mantener trazabilidad y control funcional dentro de Nexus CRM.

## Contexto funcional

La HU HU004 pertenece al backlog funcional de Nexus CRM y cubre la capacidad 'Administrar roles'. La administracion de roles queda reservada al rol Gerencia, que actua como super admin del sistema. No existe un rol Administrador separado en Nexus CRM.

## Criterios de aceptacion

### CA-001 - Acceso a la funcionalidad

Dados que un usuario con rol Gerencia accede a Nexus CRM  
Cuando solicita administrar roles  
Entonces el sistema presenta la funcionalidad disponible segun sus permisos.

### CA-002 - Ejecutar operacion principal

Dados que el usuario cuenta con rol Gerencia  
Cuando completa la informacion requerida para administrar roles  
Entonces el sistema procesa la operacion  
Y confirma el resultado de forma clara.

### CA-003 - Validar informacion obligatoria

Dado que el usuario esta ejecutando administrar roles  
Cuando omite informacion obligatoria o ingresa datos invalidos  
Entonces el sistema no completa la operacion  
Y muestra las validaciones correspondientes.

### CA-004 - Restringir usuario sin permiso

Dados que un usuario con rol Comercial o Analista intenta administrar roles  
Cuando solicita la accion  
Entonces el sistema bloquea la operacion  
Y muestra un mensaje de permiso insuficiente.

### CA-005 - Mantener trazabilidad

Dado que la operacion administrar roles se completa correctamente  
Cuando el sistema guarda el resultado  
Entonces registra la informacion necesaria para trazabilidad funcional o auditoria si negocio lo confirma.

### CA-006 - Validar alcance: Crear rol

Dado que el alcance de la HU incluye crear rol  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar crear rol segun las reglas aprobadas por negocio.

### CA-007 - Validar alcance: Editar rol

Dado que el alcance de la HU incluye editar rol  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar editar rol segun las reglas aprobadas por negocio.

### CA-008 - Validar alcance: Configurar permisos

Dado que el alcance de la HU incluye configurar permisos  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar configurar permisos segun las reglas aprobadas por negocio.

### CA-009 - Validar alcance: Consultar roles

Dado que el alcance de la HU incluye consultar roles  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar consultar roles segun las reglas aprobadas por negocio.

## Reglas de negocio

### Reglas confirmadas por HU o contexto

- La HU fue leida desde Azure DevOps como Work Item 446.
- El titulo funcional es HU004 - Administrar roles.
- El estado actual en Azure DevOps es New.
- La HU debe mantener trazabilidad con el proyecto Nexus.
- El alcance indicado incluye Crear rol.
- El alcance indicado incluye Editar rol.
- El alcance indicado incluye Configurar permisos.
- El alcance indicado incluye Consultar roles.
- El alcance indicado incluye Desactivar roles.
- Solo Gerencia puede crear, modificar, consultar, configurar o desactivar roles.
- No existe un rol Administrador separado para Nexus CRM.
- Los roles confirmados del sistema son Gerencia, Comercial y Analista.
- Gerencia actua como super admin y tiene todos los permisos.
- Comercial tiene acceso limitado a funcionalidades esenciales para el cargo comercial.
- Analista tiene permisos orientados a carga/importacion de datos y validacion operativa de informacion importada; no debe acceder a dashboards ni insights.

### Reglas pendientes de validacion

- Confirmar criterios de aceptacion definitivos con negocio.
- Confirmar matriz detallada de permisos por modulo.
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
