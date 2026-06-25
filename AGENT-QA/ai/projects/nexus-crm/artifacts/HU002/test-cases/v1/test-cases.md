# Casos de prueba - HU002: Recuperar acceso a la cuenta

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| HU version base | enrich-us/v2 |
| Plan de pruebas base | test-plan/v1 |
| Metodologia QA | basado_cobertura - Basado en Cobertura |
| Prioridad | 2 |
| Cobertura | Positiva / Negativa / Alterna / Edge / Automatizable |
| Version de casos | v1 |
| Estado | Pendiente de aprobacion |

## Resumen de cobertura

| Tipo de cobertura | Cantidad | Observaciones |
|---|---:|---|
| Positiva | 2 | Solicitud con correo registrado y cambio exitoso |
| Negativa | 4 | Correo no registrado, OTP invalido, contrasena invalida y falla de correo |
| Alterna | 1 | Solicitud generica sin revelar existencia |
| Edge | 2 | OTP vencido y OTP reutilizado |
| Automatizable | 9 | UI/E2E, API y mock de correo |

## Casos de prueba

| ID | HU ID | Criterio asociado | Titulo | Objetivo | Precondiciones | Datos de prueba | Pasos | Resultado esperado | Prioridad | Tipo de prueba | Cobertura | Automatizable | Notas QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| TC-HU002-001 | HU002 | CA-001 | Solicitud con correo registrado | Validar envio de OTP a correo registrado | Cuenta activa con correo registrado | Correo registrado | 1. Abrir recuperacion. 2. Ingresar correo registrado. 3. Solicitar recuperacion. | El sistema registra solicitud y envia OTP al correo. | Alta | Funcional / Integracion | Positiva | Si, UI/E2E | Requiere inbox controlado. |
| TC-HU002-002 | HU002 | CA-002 | Solicitud con correo no registrado | Validar mensaje generico sin enumeracion | Flujo disponible | Correo no registrado | 1. Abrir recuperacion. 2. Ingresar correo no registrado. 3. Solicitar. | Muestra confirmacion generica y no revela si el correo existe. | Alta | Seguridad | Alterna | Si, UI/API | Comparar mensaje con caso de correo registrado. |
| TC-HU002-003 | HU002 | CA-003 | Restablecimiento con OTP vigente | Validar cambio de contrasena con OTP valido | OTP generado y vigente | OTP valido, nueva contrasena valida | 1. Solicitar recuperacion. 2. Ingresar OTP vigente. 3. Definir nueva contrasena. 4. Confirmar. | Permite definir nueva contrasena y confirma acceso restablecido. | Alta | Funcional / E2E | Positiva | Si, UI/E2E/API | Politica de contrasena debe estar disponible. |
| TC-HU002-004 | HU002 | CA-004 | OTP invalido | Validar rechazo de codigo incorrecto | Solicitud creada | OTP incorrecto | 1. Ingresar OTP invalido. 2. Continuar flujo. | No permite cambiar contrasena y muestra error no sensible. | Alta | Seguridad / Validacion | Negativa | Si, UI/API | Mensaje exacto pendiente. |
| TC-HU002-005 | HU002 | CA-004 | OTP vencido | Validar expiracion despues de 30 minutos | OTP generado hace mas de 30 minutos | OTP vencido | 1. Generar OTP. 2. Simular tiempo mayor a 30 minutos. 3. Usar OTP. | Rechaza el OTP y permite solicitar una nueva recuperacion. | Alta | Boundary / Seguridad | Edge | Si, API | Requiere control de tiempo en QA. |
| TC-HU002-006 | HU002 | CA-004 | OTP reutilizado | Validar invalidacion despues de uso correcto | OTP usado exitosamente | Mismo OTP usado | 1. Completar cambio con OTP valido. 2. Intentar usar el mismo OTP otra vez. | El sistema rechaza el OTP reutilizado. | Alta | Seguridad | Edge | Si, API/E2E | Critico para evitar reutilizacion. |
| TC-HU002-007 | HU002 | CA-005 | Nueva contrasena invalida | Validar politica de contrasena | OTP valido | Contrasena que no cumple politica | 1. Ingresar OTP valido. 2. Escribir contrasena invalida. 3. Confirmar. | Rechaza cambio y muestra condiciones aplicables sin guardar la contrasena. | Media | Validacion | Negativa | Si, UI/API | Politica exacta pendiente. |
| TC-HU002-008 | HU002 | CA-006 | Falla en envio de correo | Validar manejo de error de servicio de correo | Servicio de correo no disponible o mock con error | Correo registrado | 1. Simular falla de correo. 2. Solicitar recuperacion. | Informa que no pudo completarse en ese momento y conserva trazabilidad operativa. | Alta | Integracion / Manejo de errores | Negativa | Si, API | Proveedor de correo pendiente. |
| TC-HU002-009 | HU002 | CA-003 | Login con nueva contrasena | Validar acceso posterior al restablecimiento | Cambio de contrasena exitoso | Nueva contrasena valida | 1. Ir a login. 2. Ingresar usuario y nueva contrasena. | El sistema permite iniciar sesion con la nueva contrasena. | Alta | Regresion / E2E | Positiva | Si, UI/E2E | Cruza con HU001. |

## Casos automatizables

- TC-HU002-003 y TC-HU002-009 como E2E critico.
- TC-HU002-004, TC-HU002-005 y TC-HU002-006 como API de seguridad.
- TC-HU002-001 y TC-HU002-008 requieren inbox controlado o mock de correo.

## Riesgos y pendientes

- Pendiente politica de contrasena.
- Pendiente proveedor, remitente, plantilla y manejo de rebotes.
- Pendiente limite de solicitudes por usuario, correo, IP o periodo.
