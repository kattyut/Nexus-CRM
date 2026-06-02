# Analisis HU - HU001: Login

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| HU ID | HU001 |
| Titulo | Login |
| Provider | Manual |
| Source | Texto manual |
| Version analisis | v1 |
| Fecha | 2026-05-28 |
| Estado de suficiencia | sufficient_not_enriched |

## Estado inicial de la HU

### Historia original

Como usuario  
Quiero iniciar sesion con mi correo y contrasena  
Para acceder al sistema de manera segura

### Campos originales

| Campo | Estado |
|---|---|
| Rol | Presente: usuario |
| Accion | Presente: iniciar sesion con correo y contrasena |
| Beneficio | Presente: acceder al sistema de manera segura |
| Criterios de aceptacion | Faltantes |
| Reglas de negocio | Faltantes |
| Dependencias | Faltantes |
| Prioridad | Pendiente de definicion |
| Estado en herramienta | No validado |

## Resumen general

La HU tiene estructura Scrum minima y expresa una necesidad funcional clara. Sin embargo, esta incompleta para QA definitivo porque no define criterios de aceptacion, reglas de autenticacion, mensajes esperados, manejo de errores, roles, politicas de sesion ni restricciones de seguridad.

Clasificacion general: Deficiente para pruebas definitivas, pero suficiente como base para enriquecimiento controlado.

## Tabla de evaluacion QA

| Categoria | Estado | Observaciones | Impacto QA |
|---|---|---|---|
| Claridad funcional | Parcial | Se entiende que el usuario debe iniciar sesion con correo y contrasena. | Permite identificar el flujo principal, pero no cubre variaciones. |
| Estructura HU | Aceptable | Tiene rol, accion y beneficio. | Puede pasar a refinamiento. |
| Suficiencia funcional | Parcial | No define comportamiento detallado del login. | Limita casos positivos, negativos y edge cases. |
| Criterios de aceptacion | Critico | No fueron proporcionados. | No hay base verificable para validacion QA. |
| Testeabilidad | Parcial | El flujo principal es testeable, pero faltan resultados esperados. | Requiere criterios antes de pruebas finales. |
| Reglas de negocio | Critico | No hay reglas de credenciales, bloqueo, sesion o permisos. | Alto riesgo de interpretaciones distintas. |
| Dependencias | Pendiente | No se especifica mecanismo de autenticacion ni modulo de usuarios. | Puede afectar alcance tecnico y pruebas de integracion. |
| Riesgos QA | Alto | Seguridad, errores y estados no estan definidos. | Riesgo alto de cobertura incompleta. |
| Cobertura funcional | Baja | Solo cubre la intencion general. | Faltan flujo feliz, errores y validaciones. |
| Trazabilidad | Parcial | Trazable a HU manual, no a Azure DevOps. | Falta validar Work Item real cuando la conexion este lista. |

## Veredicto INVEST

| Criterio | Resultado | Observaciones |
|---|---|---|
| Independent | Parcial | Puede trabajarse como capacidad base, pero depende de usuarios, roles y autenticacion. |
| Negotiable | Cumple | La HU permite refinamiento con negocio y desarrollo. |
| Valuable | Cumple | Habilita acceso seguro al sistema. |
| Estimable | Parcial | Se puede estimar de forma gruesa, pero faltan reglas de seguridad y alcance. |
| Small | Cumple | El alcance base es acotado si se limita al login con correo y contrasena. |
| Testable | Parcial | Requiere criterios de aceptacion para validacion completa. |

## Problemas encontrados

| Problema | Evidencia | Impacto QA | Siguiente accion |
|---|---|---|---|
| No hay criterios de aceptacion | La HU solo contiene Como/Quiero/Para. | No hay validaciones esperadas ni resultado verificable formal. | Definir criterios en Gherkin. |
| Seguridad no detallada | Solo se menciona "de manera segura". | Puede haber interpretaciones sobre sesion, errores y proteccion de acceso. | Aclarar reglas minimas de seguridad. |
| Usuario generico | El rol es "usuario". | No se sabe si aplica a gerencia, comercial, analista y administrador por igual. | Confirmar perfiles habilitados para login. |
| Dependencias no definidas | No se menciona modulo de usuarios, autenticacion externa ni repositorio de credenciales. | Riesgo para pruebas de integracion y datos. | Definir mecanismo de autenticacion o marcar pendiente. |
| Fuente externa no validada | No se leyo Work Item en Azure DevOps. | No hay trazabilidad externa completa. | Validar con Azure DevOps cuando se configure conexion. |

## Riesgos QA

- Riesgo de seguridad por mensajes de error, manejo de sesion y acceso no autenticado no definidos.
- Riesgo de cobertura incompleta por ausencia de criterios de aceptacion.
- Riesgo de alcance por no definir si incluye recuperacion de contrasena, MFA, bloqueo de cuenta o expiracion de sesion.
- Riesgo de datos por no definir usuarios validos, contrasenas validas y estados de cuenta.

## Recomendaciones

- Enriquecer la HU con criterios de aceptacion para flujo feliz, credenciales invalidas, campos obligatorios y acceso protegido.
- Marcar como pendientes las reglas no confirmadas: bloqueo de cuenta, MFA, recuperacion de contrasena, expiracion de sesion y politicas de contrasena.
- Validar posteriormente la HU real en Azure DevOps para mantener trazabilidad oficial.

## Siguiente paso recomendado

Ejecutar enriquecimiento con estrategia `clasica_scrum`, manteniendo supuestos y dudas como pendientes de validacion.

