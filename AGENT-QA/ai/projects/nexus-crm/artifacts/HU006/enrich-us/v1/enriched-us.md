# HU enriquecida - HU006: Administrar empresas

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| Metodologia / estrategia | clasica_scrum - Clasica Scrum |
| Contexto breve | Administrar empresas. |
| Prioridad | 2 |
| Version | v1 |
| Estado | Pendiente de aprobacion |

## Metadata tecnica

| Campo | Valor |
|---|---|
| Proyecto QA | Nexus CRM |
| Project slug | nexus-crm |
| HU ID | HU006 |
| Work Item Azure DevOps | 452 |
| Titulo origen | HU006 - Administrar empresas |
| Provider | Azure DevOps |
| Source | Azure DevOps |
| Estrategia aplicada | clasica_scrum - Clasica Scrum |
| Archivo de reglas | ai/config/enrichment-options/clasica-scrum.md |
| Version fuente | source/v1 |
| Version analisis | analysis/v1 |
| Version enriquecimiento | v1 |
| Estado sincronizacion | Sincronizada con Azure DevOps |

## Historia original

Como usuario comercial  
Quiero crear, consultar, actualizar y desactivar empresas  
Para mantener centralizada y actualizada la información de organizaciones con las que se tiene relación comercial.

## Historia enriquecida

Como usuario comercial  
Quiero crear, consultar, actualizar y desactivar empresas  
Para mantener centralizada y actualizada la información de organizaciones con las que se tiene relación comercial.  
Para mantener trazabilidad y control funcional dentro de Nexus CRM.

## Contexto funcional

La HU HU006 pertenece al backlog funcional de Nexus CRM y cubre la capacidad 'Administrar empresas'. La version enriquecida conserva la intencion original leida desde Azure DevOps y agrega criterios verificables para refinamiento, QA y validacion de negocio. El estado `Sin seguimiento` es la denominacion formal en el sistema y su umbral es parametrizable por Gerencia.

## Criterios de aceptacion

### CA-001 - Acceso a la funcionalidad

Dado que el usuario autorizado accede a Nexus CRM  
Cuando solicita administrar empresas  
Entonces el sistema presenta la funcionalidad disponible segun sus permisos.

### CA-002 - Ejecutar operacion principal

Dado que el usuario cuenta con permisos suficientes  
Cuando completa la informacion requerida para administrar empresas  
Entonces el sistema procesa la operacion  
Y confirma el resultado de forma clara.

### CA-003 - Validar informacion obligatoria

Dado que el usuario esta ejecutando administrar empresas  
Cuando omite informacion obligatoria o ingresa datos invalidos  
Entonces el sistema no completa la operacion  
Y muestra las validaciones correspondientes.

### CA-004 - Estado parametrizable por negocio

Dado que Gerencia configura los parametros de seguimiento de una empresa  
Cuando define el tiempo para pasar a estado `Sin seguimiento` o marca una empresa como `Prioritaria`  
Entonces el sistema debe guardar la configuracion aplicada  
Y reflejar el estado correspondiente segun la regla definida por negocio.

### CA-005 - Restringir usuario sin permiso

Dado que un usuario no autorizado intenta administrar empresas  
Cuando solicita la accion  
Entonces el sistema bloquea la operacion  
Y muestra un mensaje de permiso insuficiente.

### CA-006 - Mantener trazabilidad

Dado que la operacion administrar empresas se completa correctamente  
Cuando el sistema guarda el resultado  
Entonces registra la informacion necesaria para trazabilidad funcional o auditoria si negocio lo confirma.

### CA-007 - Validar alcance: Crear empresa

Dado que el alcance de la HU incluye crear empresa  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar crear empresa segun las reglas aprobadas por negocio.

### CA-008 - Validar alcance: Editar empresa

Dado que el alcance de la HU incluye editar empresa  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar editar empresa segun las reglas aprobadas por negocio.

### CA-009 - Validar alcance: Desactivar empresa

Dado que el alcance de la HU incluye desactivar empresa  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar desactivar empresa segun las reglas aprobadas por negocio.

### CA-010 - Validar alcance: Validaciones básicas

Dado que el alcance de la HU incluye validaciones básicas  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar validaciones básicas segun las reglas aprobadas por negocio.

## Reglas de negocio

### Reglas confirmadas por HU o contexto

- La HU fue leida desde Azure DevOps como Work Item 452.
- El titulo funcional es HU006 - Administrar empresas.
- El estado actual en Azure DevOps es New.
- La HU debe mantener trazabilidad con el proyecto Nexus.
- El alcance indicado incluye Crear empresa.
- El alcance indicado incluye Editar empresa.
- El alcance indicado incluye Desactivar empresa.
- El alcance indicado incluye Validaciones básicas.
- Los campos obligatorios iniciales para empresa son nombre, sector, estado, fuente de origen y responsable comercial.
- Los estados de empresa confirmados son Activa, Inactiva, Sin seguimiento y Prioritaria.
- `Sin seguimiento` es el termino formal del sistema y su calculo es parametrizable por Gerencia.
- Para el MVP, el umbral inicial de `Sin seguimiento` puede ser 30 dias sin actividad.
- `Prioritaria` es un estado o flag configurable por negocio y no debe quemarse como valor fijo.

### Reglas pendientes de validacion

- Confirmar criterios de aceptacion definitivos con negocio.
- Confirmar reglas de permisos y perfiles autorizados.
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
