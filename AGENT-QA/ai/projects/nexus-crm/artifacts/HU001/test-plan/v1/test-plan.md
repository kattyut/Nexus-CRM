# Plan de pruebas - HU001: Gestionar autenticacion de usuarios

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| HU version base | enrich-us/v2 |
| Metodologia QA | basado_cobertura - Basado en Cobertura |
| Prioridad | 2 |
| Cobertura esperada | Login, logout, sesion, acceso protegido, errores y bloqueo por intentos fallidos |
| Version del plan | v1 |
| Estado | Pendiente de aprobacion |

## Objetivo

Validar que los usuarios internos de Nexus CRM puedan iniciar sesion, mantener una sesion activa controlada y cerrar sesion de forma segura, accediendo solo a funcionalidades autorizadas y protegiendo informacion comercial.

## Alcance

### Incluye

- Login exitoso con usuario interno registrado y habilitado.
- Validacion de credenciales invalidas y campos obligatorios.
- Acceso a funcionalidades segun rol o permisos.
- Restriccion de acceso sin sesion activa o con sesion expirada.
- Logout exitoso y bloqueo posterior de areas protegidas.
- Bloqueo temporal por 5 intentos fallidos consecutivos durante 15 minutos.

### No incluye

- Recuperacion de contrasena, cubierta por HU002.
- MFA, no confirmado para MVP.
- Administracion completa de roles y permisos, cubierta por HU003, HU004 y HU005.
- Auditoria detallada de accesos, pendiente de confirmacion.

## Estrategia de pruebas

Se aplicara una estrategia basada en cobertura funcional y de requisitos, priorizando seguridad de acceso, sesiones y permisos. La cobertura se trazara contra los criterios CA-001 a CA-008 de la HU enriquecida y contra reglas confirmadas del contexto de negocio.

## Tipos de prueba

- Funcionales: validacion de flujos de login, logout, sesion y errores.
- Integracion: validacion entre frontend, servicio de autenticacion y fuente de usuarios, cuando esten definidos.
- API: sugerida para endpoints de login, logout, sesion y bloqueo.
- Regresion: acceso protegido y permisos por rol.
- Seguridad: sugerida para mensajes no reveladores, acceso directo a rutas protegidas y bloqueo por intentos.
- Boundary testing: intentos fallidos 4, 5 y posterior desbloqueo.

## Riesgos

- Matriz detallada de permisos pendiente de definicion.
- Politica de expiracion de sesion pendiente.
- Mensajes exactos de error no definidos.
- Fuente tecnica de usuarios no confirmada.
- Riesgo alto si el sistema revela informacion sensible en errores de autenticacion.

## Ambientes

Pendiente de definicion. Se requiere al menos un ambiente QA con usuarios Gerencia, Comercial y Analista, cuentas habilitadas e inhabilitadas, y control de tiempo o configuracion para validar bloqueo temporal y expiracion.

## Dependencias

- Modulo de Seguridad y acceso.
- Usuarios internos con roles Gerencia, Comercial y Analista.
- Fuente de datos de usuarios.
- Politica de sesion y expiracion.
- Definicion de permisos por rol.

## Criterios de entrada

- HU001 enriquecida disponible y aprobable por negocio.
- Pantalla o API de autenticacion disponible en ambiente QA.
- Datos de prueba de usuarios validos, invalidos, sin permiso y bloqueados.
- Mensajes esperados documentados o aceptados como pendientes.

## Criterios de salida

- 100% de criterios de aceptacion CA-001 a CA-008 ejecutados.
- Sin defectos criticos o altos abiertos en login, logout, sesion o acceso protegido.
- Evidencia de bloqueo por intentos fallidos.
- Evidencia de que rutas protegidas no son accesibles sin sesion valida.

## Cobertura

| Area | Criterios | Cobertura esperada |
|---|---|---|
| Login exitoso | CA-001 | 100% funcional |
| Permisos | CA-002 | 100% sobre roles definidos; pendiente matriz final |
| Errores de autenticacion | CA-003, CA-004 | 100% funcional y mensajes no sensibles |
| Logout y sesion | CA-005, CA-006, CA-007 | 100% funcional |
| Bloqueo temporal | CA-008 | 100% regla 5 intentos / 15 minutos |

## Supuestos y pendientes

- Pendiente definir pantalla destino posterior al login.
- Pendiente definir politica exacta de expiracion de sesion.
- Pendiente confirmar mensajes exactos de error.
- Pendiente matriz final de permisos por modulo.
