# HU enriquecida - HU008: Administrar contactos

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| Metodologia / estrategia | clasica_scrum - Clasica Scrum |
| Contexto breve | Administrar contactos. |
| Prioridad | 2 |
| Version | v1 |
| Estado | Pendiente de aprobacion |

## Metadata tecnica

| Campo | Valor |
|---|---|
| Proyecto QA | Nexus CRM |
| Project slug | nexus-crm |
| HU ID | HU008 |
| Work Item Azure DevOps | 460 |
| Titulo origen | HU008 - Administrar contactos |
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
Quiero crear, consultar, actualizar y desactivar contactos  
Para mantener actualizada la información de las personas relacionadas con las empresas registradas.

## Historia enriquecida

Como usuario comercial  
Quiero crear, consultar, actualizar y desactivar contactos  
Para mantener actualizada la información de las personas relacionadas con las empresas registradas.  
Para mantener trazabilidad y control funcional dentro de Nexus CRM.

## Contexto funcional

La HU HU008 pertenece al backlog funcional de Nexus CRM y cubre la capacidad 'Administrar contactos'. La version enriquecida conserva la intencion original leida desde Azure DevOps y agrega criterios verificables para refinamiento, QA y validacion de negocio.

## Criterios de aceptacion

### CA-001 - Acceso a la funcionalidad

Dado que el usuario autorizado accede a Nexus CRM  
Cuando solicita administrar contactos  
Entonces el sistema presenta la funcionalidad disponible segun sus permisos.

### CA-002 - Ejecutar operacion principal

Dado que el usuario cuenta con permisos suficientes  
Cuando completa la informacion requerida para administrar contactos  
Entonces el sistema procesa la operacion  
Y confirma el resultado de forma clara.

### CA-003 - Validar informacion obligatoria

Dado que el usuario esta ejecutando administrar contactos  
Cuando omite informacion obligatoria o ingresa datos invalidos  
Entonces el sistema no completa la operacion  
Y muestra las validaciones correspondientes.

### CA-004 - Reglas de asociacion obligatoria

Dado que Gerencia o Comercial registra o edita un contacto  
Cuando intenta guardar el contacto sin empresa asociada  
Entonces el sistema debe impedir el guardado  
Y debe exigir la asociacion a una sola empresa.

### CA-005 - Restringir usuario sin permiso

Dado que un usuario no autorizado intenta administrar contactos  
Cuando solicita la accion  
Entonces el sistema bloquea la operacion  
Y muestra un mensaje de permiso insuficiente.

### CA-006 - Mantener trazabilidad

Dado que la operacion administrar contactos se completa correctamente  
Cuando el sistema guarda el resultado  
Entonces registra la informacion necesaria para trazabilidad funcional o auditoria si negocio lo confirma.

### CA-007 - Validar alcance: Crear contacto

Dado que el alcance de la HU incluye crear contacto  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar crear contacto segun las reglas aprobadas por negocio.

### CA-008 - Validar alcance: Editar contacto

Dado que el alcance de la HU incluye editar contacto  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar editar contacto segun las reglas aprobadas por negocio.

### CA-009 - Validar alcance: Desactivar contacto

Dado que el alcance de la HU incluye desactivar contacto  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar desactivar contacto segun las reglas aprobadas por negocio.

### CA-010 - Validar alcance: Consulta básica

Dado que el alcance de la HU incluye consulta básica  
Cuando el usuario ejecuta el flujo correspondiente  
Entonces el sistema permite validar consulta básica segun las reglas aprobadas por negocio.

## Reglas de negocio

### Reglas confirmadas por HU o contexto

- La HU fue leida desde Azure DevOps como Work Item 460.
- El titulo funcional es HU008 - Administrar contactos.
- El estado actual en Azure DevOps es New.
- La HU debe mantener trazabilidad con el proyecto Nexus.
- El alcance indicado incluye Crear contacto.
- El alcance indicado incluye Editar contacto.
- El alcance indicado incluye Desactivar contacto.
- El alcance indicado incluye Consulta básica.
- Los campos obligatorios iniciales para contacto son nombre, cargo, empresa asociada, correo o telefono al menos uno, fuente de contacto y estado opcional al inicio.
- Un contacto debe estar asociado a una sola empresa en el MVP.
- No se permite que un contacto pertenezca a dos o mas empresas al mismo tiempo.
- El correo corporativo y el correo personal deben distinguirse por dominio.
- El contacto puede existir sin estado obligatorio al inicio si el negocio lo permite por configuracion.

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
