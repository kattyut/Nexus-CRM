# Casos de prueba - Nexus API Swagger/OpenAPI

Version del documento: `v1`

Fecha de creacion: `2026-07-02`

Fuente funcional: `../openapi/nexus.openapi.json`

Script automatizado: `openapi-contract.spec.ts`

Ambiente objetivo: `https://localhost:7167`

## Alcance

Estos casos validan que la API publicada cumpla el contrato Swagger/OpenAPI versionado en la suite. La primera iteracion cubre disponibilidad del contrato y smoke tests de lectura para endpoints `GET` sin parametros de ruta.

## Casos

### Contrato y listados

| ID | Nombre | Endpoint | Precondicion | Pasos | Resultado esperado | Script |
| --- | --- | --- | --- | --- | --- | --- |
| SWG-CT-001 | Validar disponibilidad del Swagger JSON vivo | `GET /swagger/v1/swagger.json` | API local levantada | Enviar solicitud GET al Swagger JSON. Comparar titulo y rutas contra `../openapi/nexus.openapi.json`. | Responde `200`, `content-type` JSON, titulo y rutas coinciden con la especificacion versionada. | `openapi-contract.spec.ts` |
| SWG-CT-002 | Validar contrato de listado de ciudades | `GET /Cities` | API local levantada | Enviar solicitud GET al endpoint. Validar status, headers, SLA y tipo de respuesta. | Responde segun Swagger, contiene JSON y retorna una lista. | `openapi-contract.spec.ts` |
| SWG-CT-003 | Validar contrato de listado de paises | `GET /Countries` | API local levantada | Enviar solicitud GET al endpoint. Validar status, headers, SLA y tipo de respuesta. | Responde segun Swagger, contiene JSON y retorna una lista. | `openapi-contract.spec.ts` |
| SWG-CT-004 | Validar contrato de listado de companias | `GET /companies` | API local levantada | Enviar solicitud GET al endpoint. Validar status, headers, SLA y tipo de respuesta. | Responde segun Swagger, contiene JSON y retorna una lista. | `openapi-contract.spec.ts` |
| SWG-CT-005 | Validar contrato de listado de sectores de compania | `GET /company-sectors` | API local levantada | Enviar solicitud GET al endpoint. Validar status, headers, SLA y tipo de respuesta. | Responde segun Swagger, contiene JSON y retorna una lista. | `openapi-contract.spec.ts` |
| SWG-CT-006 | Validar contrato de listado de estados de compania | `GET /company-statuses` | API local levantada | Enviar solicitud GET al endpoint. Validar status, headers, SLA y tipo de respuesta. | Responde segun Swagger, contiene JSON y retorna una lista. | `openapi-contract.spec.ts` |
| SWG-CT-007 | Validar contrato de listado de niveles de actividad | `GET /activity-levels` | API local levantada | Enviar solicitud GET al endpoint. Validar status, headers, SLA y tipo de respuesta. | Responde segun Swagger, contiene JSON y retorna una lista. | `openapi-contract.spec.ts` |
| SWG-CT-008 | Validar contrato de listado de contactos | `GET /contacts` | API local levantada | Enviar solicitud GET al endpoint. Validar status, headers, SLA y tipo de respuesta. | Responde segun Swagger, contiene JSON y retorna una lista. | `openapi-contract.spec.ts` |
| SWG-CT-009 | Validar contrato de listado de fuentes de contacto | `GET /contact-sources` | API local levantada | Enviar solicitud GET al endpoint. Validar status, headers, SLA y tipo de respuesta. | Responde segun Swagger, contiene JSON y retorna una lista. | `openapi-contract.spec.ts` |
| SWG-CT-010 | Validar contrato de listado de tipos de actividad | `GET /activity-types` | API local levantada | Enviar solicitud GET al endpoint. Validar status, headers, SLA y tipo de respuesta. | Responde segun Swagger, contiene JSON y retorna una lista. | `openapi-contract.spec.ts` |
| SWG-CT-011 | Validar contrato de listado de actividades | `GET /activities` | API local levantada | Enviar solicitud GET al endpoint. Validar status, headers, SLA y tipo de respuesta. | Responde segun Swagger, contiene JSON y retorna una lista. | `openapi-contract.spec.ts` |

### CRUD funcional

| ID | Nombre | Endpoints | Precondicion | Pasos | Resultado esperado | Script |
| --- | --- | --- | --- | --- | --- | --- |
| SWG-CRUD-001 | Validar CRUD de paises | `POST /Countries`, `PUT /Countries/{id}`, `DELETE /Countries/{id}` | API local levantada | Crear pais con nombre unico. Actualizar nombre. Eliminar registro creado. | Cada operacion responde con status exitoso declarado o aceptado por la API. El registro creado queda eliminado al final. | `openapi-crud.spec.ts` |
| SWG-CRUD-002 | Validar CRUD de ciudades | `POST /Countries`, `POST /Cities`, `PUT /Cities/{id}`, `DELETE /Cities/{id}` | API local levantada | Crear pais dependiente. Crear ciudad con `countryId`. Actualizar ciudad. Eliminar ciudad y pais. | Ciudad se crea, actualiza y elimina correctamente usando una relacion valida con pais. | `openapi-crud.spec.ts` |
| SWG-CRUD-003 | Validar CRUD de sectores de compania | `POST /company-sectors`, `PUT /company-sectors`, `DELETE /company-sectors/{id}` | API local levantada | Crear sector con nombre unico. Actualizar por body con `id`. Eliminar registro. | Sector se crea, actualiza y elimina correctamente. | `openapi-crud.spec.ts` |
| SWG-CRUD-004 | Validar CRUD de estados de compania | `POST /company-statuses`, `PUT /company-statuses`, `DELETE /company-statuses/{id}` | API local levantada | Crear estado con nombre unico. Actualizar por body con `id`. Eliminar registro. | Estado se crea, actualiza y elimina correctamente. | `openapi-crud.spec.ts` |
| SWG-CRUD-005 | Validar CRUD de niveles de actividad | `POST /activity-levels`, `PUT /activity-levels`, `DELETE /activity-levels/{id}` | API local levantada | Crear nivel con `code` unico. Actualizar `code` y descripcion. Eliminar registro. | Nivel de actividad se crea, actualiza y elimina correctamente. | `openapi-crud.spec.ts` |
| SWG-CRUD-006 | Validar CRUD de fuentes de contacto | `POST /contact-sources`, `PUT /contact-sources`, `DELETE /contact-sources/{id}` | API local levantada | Crear fuente con nombre unico. Actualizar por body con `id`. Eliminar registro. | Fuente de contacto se crea, actualiza y elimina correctamente. | `openapi-crud.spec.ts` |
| SWG-CRUD-007 | Validar CRUD de tipos de actividad | `POST /activity-types`, `PUT /activity-types`, `DELETE /activity-types/{id}` | API local levantada | Crear tipo con nombre unico. Actualizar nombre y descripcion. Eliminar registro. | Tipo de actividad se crea, actualiza y elimina correctamente. | `openapi-crud.spec.ts` |
| SWG-CRUD-008 | Validar CRUD de companias con catalogos relacionados | `POST /companies`, `PUT /companies`, `DELETE /companies/{id}` | API local levantada | Crear pais, ciudad, sector, estado y nivel. Crear compania con esas relaciones. Actualizar compania. Eliminar compania y dependencias creadas. | Compania se crea, actualiza y elimina con relaciones validas. | `openapi-crud.spec.ts` |
| SWG-CRUD-009 | Validar CRUD de contactos con compania y fuente | `POST /contacts`, `PUT /contacts`, `DELETE /contacts/{id}` | API local levantada | Crear dependencias de compania y fuente. Crear contacto. Actualizar contacto. Eliminar contacto y dependencias. | Contacto se crea, actualiza y elimina con compania y fuente validas. | `openapi-crud.spec.ts` |
| SWG-CRUD-010 | Validar CRUD de actividades con contacto y tipo | `POST /activities`, `PUT /activities`, `DELETE /activities/{id}` | API local levantada | Crear dependencias de compania, contacto y tipo de actividad. Crear actividad. Actualizar descripcion. Eliminar actividad y dependencias. | Actividad se crea, actualiza y elimina con contacto y tipo validos. | `openapi-crud.spec.ts` |

## Criterios comunes de aceptacion

- El status HTTP real debe estar declarado en Swagger.
- Las respuestas con cuerpo deben usar `content-type: application/json`.
- El tiempo de respuesta debe ser menor o igual a `API_RESPONSE_SLA_MS`; por defecto `2000` ms.
- Los endpoints de listado deben retornar un arreglo JSON.
- Los casos CRUD deben crear datos con valores unicos y limpiar los registros creados al finalizar.
- Los casos con relaciones deben crear primero sus dependencias para evitar depender de datos preexistentes.

## Trazabilidad

Los IDs `SWG-CT-*` se usan en los nombres de las pruebas automatizadas para conectar este documento con el script y con los reportes de Playwright.

| Artefacto | Ubicacion | Proposito |
| --- | --- | --- |
| Casos de prueba | `tests/test-cases.md` | Define alcance, pasos y resultado esperado por caso. |
| Scripts automatizados | `tests/openapi-contract.spec.ts`, `tests/openapi-crud.spec.ts` | Ejecutan los casos `SWG-CT-*` y `SWG-CRUD-*` contra la API. |
| Contrato OpenAPI | `openapi/nexus.openapi.json` | Fuente versionada del contrato esperado. |
| Resumen de ejecucion | `reports/latest-execution.md` | Guarda resultado y observaciones de la ultima corrida. |

## Historial de version

| Version | Fecha | Cambio |
| --- | --- | --- |
| v1 | 2026-07-02 | Creacion de casos de contrato Swagger para endpoints `GET` sin parametros de ruta y flujos CRUD principales. |
