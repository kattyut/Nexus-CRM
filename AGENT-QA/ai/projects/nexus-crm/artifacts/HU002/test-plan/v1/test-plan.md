# Plan de pruebas - HU002: Recuperar acceso a la cuenta

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| HU version base | enrich-us/v2 |
| Metodologia QA | basado_cobertura - Basado en Cobertura |
| Prioridad | 2 |
| Cobertura esperada | Solicitud de recuperacion, OTP, vencimiento, contrasena, correo y mensajes seguros |
| Version del plan | v1 |
| Estado | Pendiente de aprobacion |

## Objetivo

Validar que un usuario pueda recuperar acceso mediante correo electronico usando codigo OTP temporal, sin exponer si una cuenta existe y conservando condiciones minimas de seguridad.

## Alcance

### Incluye

- Solicitud de recuperacion con correo registrado.
- Solicitud con correo no registrado y mensaje generico.
- Envio, validacion e invalidacion de OTP.
- Vigencia de OTP de 30 minutos.
- Restablecimiento de nueva contrasena.
- Rechazo de OTP vencido, invalido o reutilizado.
- Manejo de falla de envio de correo.

### No incluye

- Login normal, cubierto por HU001.
- Definicion final de politica de contrasena, pendiente de negocio.
- Auditoria avanzada o notificaciones adicionales, pendientes de confirmacion.
- Proveedor de correo, plantillas y manejo de rebotes, no definidos.

## Estrategia de pruebas

La estrategia basada en cobertura prioriza trazabilidad por criterio de aceptacion, pruebas negativas de seguridad y validaciones de frontera sobre vigencia del OTP. Se recomienda separar pruebas UI, API y flujo E2E con inbox controlado.

## Tipos de prueba

- Funcionales: flujo completo de recuperacion.
- API: generacion, validacion e invalidacion de OTP.
- Integracion: servicio de correo y formulario de nueva contrasena.
- Seguridad: mensajes genericos para evitar enumeracion de cuentas.
- Boundary testing: OTP vigente, vencido a los 30 minutos, ya usado e invalido.
- Regresion: retorno al login y acceso posterior con nueva contrasena.

## Riesgos

- Riesgo de enumeracion de cuentas si los mensajes difieren.
- Riesgo de acceso indebido si el OTP no expira o no se invalida al usarse.
- Politica de contrasena no definida.
- Ambiente QA puede no tener servicio de correo o inbox controlado.
- Limites de solicitudes no definidos.

## Ambientes

Pendiente de definicion. Se requiere ambiente QA con servicio de correo controlado o mock verificable, cuentas registradas, correos no registrados y capacidad de manipular o simular vigencia de OTP.

## Dependencias

- Pantalla de inicio de sesion con opcion de recuperacion.
- Formulario de correo.
- Servicio de generacion y validacion OTP.
- Servicio de envio de correo.
- Formulario de nueva contrasena.
- Politica de contrasena.

## Criterios de entrada

- HU002 enriquecida disponible.
- Flujo de recuperacion desplegado en QA.
- Cuentas y correos de prueba disponibles.
- Inbox controlado o mecanismo de captura de OTP.
- Politica minima de contrasena documentada o marcada como pendiente.

## Criterios de salida

- 100% de CA-001 a CA-006 ejecutados.
- Sin defectos criticos o altos en generacion, expiracion, invalidacion o uso de OTP.
- Evidencia de que correo registrado y no registrado no revelan existencia de cuenta.
- Evidencia de falla controlada ante error de correo.

## Cobertura

| Area | Criterios | Cobertura esperada |
|---|---|---|
| Solicitud de recuperacion | CA-001, CA-002 | 100% funcional y seguridad de mensajes |
| OTP valido | CA-003 | 100% flujo E2E |
| OTP invalido/vencido/usado | CA-004 | 100% negativo y frontera |
| Nueva contrasena | CA-005 | 100% contra politica definida |
| Correo | CA-006 | 100% manejo de error documentado |

## Supuestos y pendientes

- Pendiente confirmar politica de contrasena.
- Pendiente confirmar limite de solicitudes por usuario, correo, IP o periodo.
- Pendiente definir proveedor, remitente y plantilla de correo.
- Supuesto QA: los mensajes deben evitar enumeracion de cuentas.
