# Plan de pruebas - HU006: Administrar empresas

| Campo | Valor |
|---|---|
| Proyecto | Nexus CRM |
| Origen | Azure DevOps |
| HU version base | enrich-us/v1 |
| Metodologia QA | basado_cobertura - Basado en Cobertura |
| Prioridad | 2 |
| Cobertura esperada | Crear, consultar, actualizar, desactivar empresas, estados y validaciones basicas |
| Version del plan | v1 |
| Estado | Pendiente de aprobacion |

## Objetivo

Validar que el usuario comercial autorizado pueda administrar empresas y mantener centralizada, actualizada y trazable la informacion de organizaciones con relacion comercial en Nexus CRM.

## Alcance

### Incluye

- Acceso a administracion de empresas segun permisos.
- Crear, consultar, actualizar y desactivar empresas.
- Validaciones basicas de campos obligatorios.
- Campos obligatorios iniciales: nombre, sector, estado, fuente de origen y responsable comercial.
- Estados Activa, Inactiva, Sin seguimiento y Prioritaria.
- Parametrizacion por Gerencia del estado `Sin seguimiento` y marca `Prioritaria`.
- Restriccion para usuario no autorizado.
- Trazabilidad funcional o auditoria si negocio lo confirma.

### No incluye

- Gestion de contactos asociados en detalle.
- Deteccion y fusion de duplicados.
- Importacion masiva de empresas.
- Auditoria avanzada, pendiente de confirmacion.

## Estrategia de pruebas

Se cubrira el ciclo funcional de empresa y las reglas de estado documentadas. La estrategia basada en cobertura prioriza campos obligatorios, estados, permisos, persistencia y reglas parametrizables de seguimiento.

## Tipos de prueba

- Funcionales: crear, consultar, actualizar y desactivar empresas.
- Integracion: persistencia, responsable comercial y fuente de origen.
- API: sugerida para operaciones CRUD y estado.
- Regresion: permisos y visibilidad de empresas.
- Boundary testing: campos vacios, estado invalido, sector no permitido si existe catalogo.
- Exploratoria: filtros o busqueda si aparecen en la pantalla.

## Riesgos

- Reglas de permisos y perfiles autorizados pendientes.
- Validaciones y mensajes exactos pendientes.
- Reglas de duplicados no incluidas en esta HU.
- Estado `Prioritaria` puede ser estado o flag configurable; no debe quemarse sin definicion.
- Riesgo de inconsistencias si `Sin seguimiento` no se calcula con parametro vigente.

## Ambientes

Pendiente de definicion. Se requiere ambiente QA con usuarios autorizados y no autorizados, catalogos de sector/fuente si existen, responsables comerciales y datos de empresas de prueba.

## Dependencias

- Modulo de Empresas.
- Modelo de permisos y roles.
- Catalogos o listas de sector, estado y fuente de origen, si aplican.
- Responsable comercial.
- Parametros configurables por Gerencia.
- Persistencia de empresas.

## Criterios de entrada

- HU006 enriquecida disponible.
- Pantalla o API de empresas disponible.
- Datos de prueba para empresas nuevas, existentes, inactivas y sin seguimiento.
- Parametro de `Sin seguimiento` definido o disponible como pendiente.
- Usuario autorizado y usuario no autorizado disponibles.

## Criterios de salida

- 100% de CA-001 a CA-010 ejecutados.
- Operaciones crear, consultar, actualizar y desactivar validadas.
- Campos obligatorios y estados validados.
- Restriccion de usuario sin permiso verificada.
- Sin defectos criticos o altos en persistencia o permisos.

## Cobertura

| Area | Criterios | Cobertura esperada |
|---|---|---|
| Acceso | CA-001, CA-005 | 100% permisos |
| Operacion principal | CA-002, CA-007, CA-008, CA-009 | 100% crear, editar, desactivar |
| Validaciones | CA-003, CA-010 | 100% campos obligatorios iniciales |
| Estados parametrizables | CA-004 | 100% Sin seguimiento y Prioritaria segun definicion |
| Trazabilidad | CA-006 | Sugerida hasta confirmacion |

## Supuestos y pendientes

- Pendiente confirmar matriz de permisos para empresas.
- Pendiente definir mensajes y reglas de validacion exactas.
- Pendiente confirmar si `Prioritaria` es estado, flag o configuracion independiente.
- Pendiente definir reglas de duplicados y asociacion con contactos en historias relacionadas.
