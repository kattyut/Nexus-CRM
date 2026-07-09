# Reporte de analisis - Coleccion Postman Nexus

Fecha: 2026-06-25

## Resumen

Se analizaron 10 grupos funcionales y 34 endpoints declarados en la coleccion Postman `Nexus`.

La suite automatizada queda en:

`AGENT-QA/ai/projects/nexus-crm/artifacts/API-POSTMAN/test-automation/v1/playwright-typescript`

## Endpoints y trazabilidad por modulo

| Grupo | Funcionalidad | HU relacionada | Escenarios cubiertos |
|---|---|---|---|
| Countries | Catalogo de paises para ubicacion | HU006 | GET, POST, PUT, DELETE inexistente, obligatorio `name`, payload vacio |
| Cities | Catalogo de ciudades por pais | HU006 | GET, POST, PUT, DELETE inexistente, obligatorio `name`, payload vacio |
| Activity Types | Tipos de actividad comercial | HU010 | GET, POST, PUT, DELETE inexistente, obligatorio `name`, payload vacio |
| Activity Levels | Nivel o temperatura comercial | HU006 | GET, POST, PUT, DELETE inexistente, obligatorio `Code`, payload vacio |
| Company Sectors | Segmentacion por sector | HU006 | GET, POST, PUT, DELETE inexistente, obligatorio `name`, payload vacio |
| Company Statuses | Estados de empresa | HU006 | GET, POST, PUT, DELETE inexistente, obligatorio `name`, payload vacio |
| Companies | Administracion y consulta de empresas | HU006, HU007 | GET, POST, PUT, DELETE inexistente, obligatorios y relaciones de catalogo |
| Contact Sources | Fuentes de contacto | HU008 | GET, POST, PUT, DELETE inexistente, obligatorio `name`, payload vacio |
| Contacts | Administracion y asociacion de contactos | HU008, HU009 | GET, POST, obligatorios, email, empresa unica, fuente existente |
| Activities | Registro e historial comercial | HU010, HU011 | GET, POST, obligatorios, fecha ISO, contacto y tipo existentes |

## Cobertura endpoint por endpoint

| Metodo | Endpoint | Funcionalidad | HU | Positivos | Negativos | Edge cases |
|---|---|---|---|---|---|---|
| GET | `/Countries` | Consultar paises | HU006 | Status 200/204, lista JSON, schema `id/name` | Header no JSON o status inesperado | Ruta equivalente `/countries` queda documentada por inconsistencia |
| POST | `/Countries` | Crear pais | HU006 | Pais con `name` valido | Sin `name`, payload vacio, duplicado esperado 409 | Nombre con espacios, mayusculas/minusculas, caracteres limite |
| PUT | `/countries` | Actualizar pais | HU006 | Actualizar con `id` real del creado | `id` inexistente, `name` vacio | Inconsistencia de casing frente a POST `/Countries` |
| DELETE | `/countries/{id}` | Eliminar pais | HU006 | Eliminar registro creado en prueba | GUID inexistente | Eliminacion de pais referenciado por ciudad debe bloquearse |
| GET | `/cities` | Consultar ciudades | HU006 | Lista JSON, schema `id/name/countryId` | Status inesperado | Ciudad sin pais asociado en respuesta |
| POST | `/cities` | Crear ciudad | HU006 | Ciudad con `name` y `countryId` existente | Sin `name`, sin `countryId`, pais inexistente | Duplicada en el mismo pais |
| PUT | `/cities` | Actualizar ciudad | HU006 | Actualizar con `id` real | GUID inexistente | Cambio a pais inexistente |
| DELETE | `/cities/{id}` | Eliminar ciudad | HU006 | Eliminar registro creado | GUID inexistente | Ciudad referenciada por empresa debe bloquearse |
| GET | `/activity-types` | Consultar tipos de actividad | HU010 | Lista JSON | Status inesperado | Lista vacia permitida con schema no verificable |
| POST | `/activity-types` | Crear tipo de actividad | HU010 | `name` y `description` validos | Sin `name`, payload vacio | Nombre duplicado |
| PUT | `/activity-types` | Actualizar tipo de actividad | HU010 | Actualizar con `id` real | GUID inexistente | Tipo referenciado por actividades historicas |
| DELETE | `/activity-types/{id}` | Eliminar tipo de actividad | HU010 | Eliminar registro creado | GUID inexistente | Eliminacion con actividades asociadas debe bloquearse |
| GET | `/activity-levels` | Consultar niveles de actividad | HU006 | Lista JSON | Status inesperado | Validar casing `code/description` vs `Code/Description` |
| POST | `/activity-levels` | Crear nivel | HU006 | `Code` y `Description` validos | Sin `Code`, payload vacio | Codigo duplicado o longitud maxima |
| PUT | `/activity-levels` | Actualizar nivel | HU006 | Actualizar con `id` real | GUID inexistente | Payload usa `name` aunque create usa `Code/Description` |
| DELETE | `/activity-levels/{id}` | Eliminar nivel | HU006 | Eliminar registro creado | GUID inexistente | Nivel usado por empresa debe bloquearse |
| GET | `/company-sectors` | Consultar sectores | HU006 | Lista JSON | Status inesperado | Lista vacia |
| POST | `/company-sectors` | Crear sector | HU006 | `name` valido | Sin `name`, payload vacio | Sector duplicado normalizado |
| PUT | `/company-sectors` | Actualizar sector | HU006 | Actualizar con `id` real | GUID inexistente | Sector usado por empresa |
| DELETE | `/company-sectors/{id}` | Eliminar sector | HU006 | Eliminar registro creado | GUID inexistente | Integridad referencial |
| GET | `/company-statuses` | Consultar estados de empresa | HU006 | Lista JSON | Status inesperado | Debe contemplar `Sin seguimiento` |
| POST | `/company-statuses` | Crear estado | HU006 | `name` valido | Sin `name`, payload vacio | Estado duplicado |
| PUT | `/company-statuses` | Actualizar estado | HU006 | Actualizar con `id` real | GUID inexistente | Renombrar estado sistemico |
| DELETE | `/company-statuses/{id}` | Eliminar estado | HU006 | Eliminar registro creado | GUID inexistente | Estado usado por empresa |
| GET | `/companies` | Consultar empresas | HU007 | Lista JSON, schema base | Status inesperado | Filtros/paginacion pendientes si existen |
| POST | `/companies` | Crear empresa | HU006 | Empresa con catalogos relacionados | Sin `name`, catalogos inexistentes, website invalido | Duplicado por nombre o website |
| PUT | `/companies` | Actualizar empresa | HU006 | Actualizar con `id` real | GUID inexistente | Cambio parcial solo `name/website` |
| DELETE | `/companies/{id}` | Eliminar empresa | HU006 | Eliminar registro creado | GUID inexistente | Empresa con contactos/actividades debe bloquearse o desactivarse |
| GET | `/contact-sources` | Consultar fuentes de contacto | HU008 | Lista JSON | Status inesperado | Fuentes vacias |
| POST | `/contact-sources` | Crear fuente | HU008 | `name` valido | Sin `name`, payload vacio | Fuente duplicada |
| PUT | `/contact-sources` | Actualizar fuente | HU008 | Actualizar con `id` real | GUID inexistente | Fuente usada por contacto |
| DELETE | `/contact-sources/{id}` | Eliminar fuente | HU008 | Eliminar registro creado | GUID inexistente | Integridad referencial |
| GET | `/contatcts` | Consultar contactos segun coleccion | HU008 | No aplica, endpoint tiene typo | Debe retornar 404/400 y no aceptarse silenciosamente | Se recomienda corregir a `/Contacts` o `/contacts` |
| POST | `/Contacts` | Crear contacto | HU008, HU009 | Contacto con empresa y fuente existentes | Sin nombre/email/empresa/fuente, email invalido | Contacto asociado a mas de una empresa no permitido |
| GET | `/Activities` | Consultar actividades | HU010, HU011 | Lista JSON | Status inesperado | Actividades sin contacto deben rechazarse |
| POST | `/Activities` | Crear actividad | HU010 | Actividad con fecha ISO, contacto y tipo | Sin descripcion, fecha invalida, contacto/tipo inexistente | Fecha futura/pasada segun regla de negocio |

## Hallazgos tecnicos de la coleccion

- `Countries` usa `/Countries` para GET/POST y `/countries` para PUT/DELETE.
- `Contacts` define `GET {{URL}}/contatcts`, con typo. La suite usa `/Contacts` como ruta esperada y cubre `/contatcts` como edge tecnico.
- Hay mezcla de nombres `PascalCase` y `camelCase` en payloads.
- La variable `URL` esta vacia.
- No hay ejemplos de respuesta, headers esperados ni scripts Postman de validacion.

## Reglas de negocio validadas

- Campos obligatorios por entidad.
- Relaciones obligatorias: ciudad-pais, empresa-catalogos, contacto-empresa, actividad-contacto/tipo.
- Un contacto pertenece a una sola empresa en el MVP.
- Estados de empresa deben soportar el termino formal `Sin seguimiento`.
- Fecha de actividad en formato ISO 8601.
- Formato valido para website y email cuando se informen.
- Errores deben devolver estructura explicita con `error`, `errors`, `message`, `title`, `detail` o `status`.

## Resultado de ejecucion

Ejecucion actualizada el 2026-06-25.

Se ejecuto:

```bash
npm run test:api
```

Resultado:

- 57 pruebas ejecutadas.
- 17 pruebas pasaron.
- 36 pruebas fallaron por incumplimientos de contrato/API.
- 4 pruebas quedaron omitidas porque el backend no devolvio `id` en la creacion y no era posible continuar el flujo CRUD.
- Log: `reports/api-test-run-20260625-120149.log`.

Correcciones aplicadas durante la ejecucion:

- Se ajusto `setup-and-run-api-tests.ps1` para detectar Node.js en `C:\Program Files\nodejs` cuando no este en `PATH`.
- Se corrigio una interpolacion PowerShell incompatible con `:` despues de `$LASTEXITCODE`.
- Se habilito `ignoreHTTPSErrors: true` en Playwright porque `http://localhost:5070` redirige a `https://localhost:7167` con certificado local autofirmado.

Principales fallos que requieren intervencion de backend/datos:

- Payloads invalidos o sin campos obligatorios estan siendo aceptados con `201` en algunos endpoints, por ejemplo `Countries`.
- Respuestas de error devuelven `text/plain; charset=utf-8` en vez de `application/json`, incumpliendo el contrato esperado para manejo de errores.
- Algunos `DELETE` o `PUT` responden `405 Method Not Allowed`, aunque la coleccion Postman declara esos metodos.
- Algunos endpoints de creacion retornan `400` con datos de referencia de la coleccion, lo que sugiere IDs semilla inexistentes o payload divergente frente al backend real.
- En algunos POST el backend no retorna `id`; sin ese identificador no se puede completar el flujo automatizado crear-actualizar-eliminar.

Comando recomendado:

```bash
cd AGENT-QA/ai/projects/nexus-crm/artifacts/API-POSTMAN/test-automation/v1/playwright-typescript
powershell -NoProfile -ExecutionPolicy Bypass -File ./setup-and-run-api-tests.ps1
```

Estado actual: suite ejecuta correctamente a nivel tooling y deja hallazgos reales de contrato/API para correccion.
