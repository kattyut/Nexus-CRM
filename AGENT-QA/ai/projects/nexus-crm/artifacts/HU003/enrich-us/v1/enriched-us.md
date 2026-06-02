# HU enriquecida - HU003: Administrar usuarios

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| Metodologia / estrategia | clasica_scrum - Clasica Scrum |
| Contexto breve | Administracion de usuarios para controlar el acceso al CRM. |
| Prioridad | 2 |
| Version | v1 |
| Estado | Pendiente de aprobacion |

## Metadata tecnica

| Campo | Valor |
|---|---|
| Proyecto QA | Nexus CRM |
| Project slug | nexus-crm |
| HU ID | HU003 |
| Work Item Azure DevOps | 441 |
| Titulo origen | HU003 - Administrar usuarios |
| Provider | Azure DevOps |
| Source | Azure DevOps |
| Estrategia aplicada | clasica_scrum - Clasica Scrum |
| Archivo de reglas | ai/config/enrichment-options/clasica-scrum.md |
| Version fuente | source/v1 |
| Version analisis | analysis/v1 |
| Version enriquecimiento | v1 |
| Estado sincronizacion | No sincronizada |

## Historia original

Como administrador  
Quiero crear, consultar, editar, activar y desactivar usuarios  
Para gestionar el acceso al sistema.

## Historia enriquecida

Como administrador del CRM  
Quiero crear, consultar, editar, activar y desactivar usuarios del sistema  
Para gestionar el acceso de los usuarios internos y mantener control operativo sobre quienes pueden usar Nexus CRM.

## Contexto funcional

La HU permite que un administrador gestione usuarios internos del CRM desde el modulo de seguridad y acceso. El alcance incluye operaciones basicas de administracion: alta, consulta, edicion, activacion y desactivacion. Como impacta directamente el acceso al sistema, requiere reglas claras de permisos, estados, validaciones y trazabilidad antes de pruebas definitivas.

## Criterios de aceptacion

### CA-001 - Crear usuario

Dado que el administrador tiene permiso para administrar usuarios  
Cuando registra un nuevo usuario con la informacion obligatoria definida por negocio  
Entonces el sistema crea el usuario  
Y deja el usuario disponible con el estado inicial confirmado para el proyecto.

### CA-002 - Validar datos obligatorios al crear usuario

Dado que el administrador esta creando un usuario  
Cuando omite informacion obligatoria o ingresa datos con formato invalido  
Entonces el sistema no crea el usuario  
Y muestra las validaciones correspondientes sin guardar informacion incompleta.

### CA-003 - Consultar usuarios

Dado que el administrador accede al modulo de administracion de usuarios  
Cuando consulta la lista o detalle de usuarios  
Entonces el sistema muestra la informacion disponible de los usuarios segun los permisos del administrador  
Y permite identificar el estado de cada usuario.

### CA-004 - Editar usuario existente

Dado que existe un usuario registrado en el sistema  
Y el administrador tiene permiso para modificarlo  
Cuando actualiza datos editables del usuario  
Entonces el sistema guarda los cambios permitidos  
Y conserva trazabilidad de la modificacion si la auditoria es requerida por negocio.

### CA-005 - Activar usuario

Dado que existe un usuario desactivado  
Y el administrador tiene permiso para activar usuarios  
Cuando solicita activar el usuario  
Entonces el sistema cambia el estado del usuario a activo  
Y permite que el usuario pueda acceder al sistema segun las reglas de autenticacion vigentes.

### CA-006 - Desactivar usuario

Dado que existe un usuario activo  
Y el administrador tiene permiso para desactivar usuarios  
Cuando solicita desactivar el usuario  
Entonces el sistema cambia el estado del usuario a desactivado  
Y el usuario desactivado no puede iniciar sesion en el sistema.

### CA-007 - Restringir acciones sin permiso

Dado que un usuario sin permisos de administracion intenta crear, editar, activar o desactivar usuarios  
Cuando intenta ejecutar cualquiera de esas acciones  
Entonces el sistema bloquea la accion  
Y muestra un mensaje de acceso no autorizado o permiso insuficiente.

## Reglas de negocio

### Reglas confirmadas por HU o contexto

- La administracion de usuarios pertenece al modulo de seguridad y acceso de Nexus CRM.
- El actor principal de la HU es el administrador.
- El administrador necesita crear, consultar, editar, activar y desactivar usuarios.
- La finalidad funcional es gestionar el acceso al sistema.
- El proyecto contempla usuarios internos con roles como administrador, comercial, gerencial y analista dentro del contexto de negocio.

### Reglas pendientes de validacion

- Confirmar campos obligatorios para crear usuario.
- Confirmar campos editables y campos restringidos.
- Confirmar si el correo o identificador de usuario debe ser unico.
- Confirmar roles disponibles y permisos asociados.
- Confirmar estado inicial de un usuario creado.
- Confirmar reglas exactas de activacion y desactivacion.
- Confirmar si desactivar un usuario invalida sesiones activas.
- Confirmar si se puede editar o desactivar al ultimo administrador activo.
- Confirmar si se requiere auditoria obligatoria para creacion, edicion, activacion y desactivacion.
- Confirmar mensajes exactos para errores, permisos insuficientes y validaciones.

## Dependencias

- Modulo de autenticacion y acceso.
- Catalogo o definicion de roles/permisos.
- Interfaz de administracion de usuarios.
- Persistencia de usuarios y estados.
- Reglas de validacion de datos de usuario.
- Mecanismo de control de permisos para acciones administrativas.
- Auditoria de cambios administrativos, si negocio la confirma como obligatoria.

## Supuestos y dudas

- Pendiente de validacion: no existen criterios de aceptacion originales en Azure DevOps.
- Pendiente de validacion: la HU agrupa cinco operaciones; debe confirmarse si se mantiene como una sola historia o si se divide por capacidad.
- Pendiente de validacion: no estan definidos campos obligatorios ni formatos de datos.
- Pendiente de validacion: no estan definidos roles, permisos ni restricciones por rol.
- Pendiente de validacion: no esta definido si la administracion aplica solo a usuarios internos o tambien a otros tipos de cuenta.
- Supuesto QA: por tratarse de seguridad, las acciones administrativas deben validarse con permisos y escenarios negativos.

## Riesgos QA

- Riesgo alto de seguridad si usuarios sin permiso pueden administrar cuentas.
- Riesgo de acceso indebido si la desactivacion no bloquea el inicio de sesion.
- Riesgo de perdida de trazabilidad si no se auditan cambios administrativos.
- Riesgo de datos duplicados si no se define unicidad de correo o identificador.
- Riesgo de alcance excesivo por incluir cinco operaciones en una sola HU.
- Riesgo de cobertura incompleta si se generan casos definitivos sin confirmar campos, permisos y estados.

## Validacion de consistencia

- El enriquecimiento conserva la intencion original de la HU.
- Las reglas no documentadas en Azure DevOps se registran como pendientes de validacion.
- La HU queda preparada para refinamiento funcional y posterior generacion de plan/casos una vez confirmadas las reglas pendientes.
