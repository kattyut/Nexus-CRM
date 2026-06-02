# Enriquecimiento - HU002

## Historia enriquecida

Como usuario del sistema
Quiero recuperar mi contraseña mediante correo electrónico
Para restablecer el acceso cuando no recuerde mis credenciales.

## Contexto funcional

El usuario puede iniciar el flujo desde la pantalla de inicio de sesión seleccionando la opción "Olvidé mi contraseña". El sistema debe enviar un enlace de recuperación al correo registrado y permitir al usuario configurar una nueva contraseña desde una página segura.

## Criterios de aceptación

1. Dado que el usuario está en la pantalla de inicio de sesión y selecciona "Olvidé mi contraseña",
   cuando ingresa un correo electrónico válido registrado y confirma la solicitud,
   entonces el sistema envía un correo de recuperación con un enlace seguro de un solo uso que expira en 60 minutos.

2. Dado que el usuario ingresa un correo electrónico que no está registrado en el sistema,
   cuando solicita la recuperación de acceso,
   entonces el sistema muestra un mensaje genérico que no revela la existencia del correo y no indica si la cuenta existe.

3. Dado que el usuario recibe el enlace de recuperación en su correo electrónico y accede antes de la expiración,
   cuando ingresa una nueva contraseña válida y la confirma,
   entonces el sistema actualiza la contraseña y muestra un mensaje de éxito, permitiendo iniciar sesión con la nueva contraseña.

4. Dado que el usuario intenta usar un enlace de recuperación vencido o inválido,
   cuando accede desde el correo o pega el enlace en el navegador,
   entonces el sistema muestra un mensaje de error de enlace expirado/inválido y ofrece solicitar un nuevo enlace.

5. Dado que el usuario ha solicitado recuperación más de 5 veces en 24 horas,
   cuando intenta realizar una nueva solicitud,
   entonces el sistema bloquea temporalmente nuevas solicitudes y muestra un mensaje de límite de intentos, recomendando esperar o contactar al soporte.

## Reglas de negocio

- El correo utilizado para la recuperación debe pertenecer a una cuenta activa del sistema.
- El enlace de recuperación debe ser de un solo uso y expirar en un máximo de 60 minutos.
- El sistema no debe revelar si el correo existe en la base de datos para evitar enumeración de cuentas.
- Las cuentas inactivas o bloqueadas no deben poder completar el proceso de recuperación; se debe mostrar un mensaje que indique contactar al soporte.
- Se permite un máximo de 5 solicitudes de recuperación por cuenta en un periodo de 24 horas.
- Tras usar el enlace de recuperación, el token debe invalidarse inmediatamente.
- Si el envío de correo falla, el usuario recibe un mensaje genérico sobre el intento fallido y el equipo de soporte debe revisar el servicio de correo.
- El sistema debe aplicar los requisitos de seguridad de contraseña de la aplicación al aceptar la nueva contraseña.

## Dependencias

- Servicio de correo electrónico configurado y disponible para enviar notificaciones de recuperación.
- Plantilla de correo de recuperación con enlace seguro, instrucciones claras y datos de contacto de soporte.
- Interfaz de usuario para solicitar recuperación y formulario seguro de cambio de contraseña.
- Endpoint backend para generar tokens de recuperación, validar enlaces y actualizar contraseñas.
- Mecanismo de registro de intentos para limitar solicitudes y evitar abuso.

## Supuestos

- El usuario ya tiene una cuenta existente con correo electrónico registrado.
- El correo electrónico es accesible por el propietario de la cuenta.
- La contraseña nueva cumple con las políticas de seguridad de la aplicación.
- No se requiere verificación adicional de identidad fuera del correo electrónico para esta historia.
- El enlace incluido en el correo lleva a una página segura de restablecimiento de contraseña.

## Notas adicionales

- El mensaje al usuario cuando el correo no exista debe ser genérico: "Si el correo existe, recibirás instrucciones para restablecer tu contraseña.".
- El flujo de recuperación debe ser compatible con correos corporativos y personales.
- El procedimiento de recuperación debe documentarse en pruebas E2E para validar enlace válido, enlace expirado, correo no registrado y límite de solicitudes.
