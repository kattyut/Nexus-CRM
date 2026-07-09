# Ultima ejecucion - Swagger/OpenAPI

Version de casos ejecutada: `v1`

Casos ejecutados desde: `tests/test-cases.md`

Script ejecutado: `tests/openapi-contract.spec.ts`

Fecha de ejecucion: 2026-07-02

Comando:

```powershell
$env:RUN_API="true"
$env:API_BASE_URL="https://localhost:7167"
npm.cmd run test:openapi
```

Resultado:

| Estado | Cantidad |
| --- | ---: |
| Pasadas | 20 |
| Fallidas | 1 |
| Total | 21 |

## Detalle

| Caso | Endpoint | Estado | Observacion |
| --- | --- | --- | --- |
| SWG-CT-001 | `GET /swagger/v1/swagger.json` | Pasado | Swagger vivo disponible y rutas coinciden con la especificacion versionada. |
| SWG-CT-002 | `GET /Cities` | Pasado | Cumple contrato documentado. |
| SWG-CT-003 | `GET /Countries` | Pasado | Cumple contrato documentado. |
| SWG-CT-004 | `GET /companies` | Pasado | Cumple contrato documentado. |
| SWG-CT-005 | `GET /company-sectors` | Pasado | Cumple contrato documentado. |
| SWG-CT-006 | `GET /company-statuses` | Pasado | Cumple contrato documentado. |
| SWG-CT-007 | `GET /activity-levels` | Pasado | Cumple contrato documentado. |
| SWG-CT-008 | `GET /contacts` | Pasado | Cumple contrato documentado. |
| SWG-CT-009 | `GET /contact-sources` | Pasado | Cumple contrato documentado. |
| SWG-CT-010 | `GET /activity-types` | Pasado | Cumple contrato documentado. |
| SWG-CT-011 | `GET /activities` | Fallido | Swagger declara `200`, pero la API respondio `400`. |
| SWG-CRUD-001 | `Countries` | Pasado | Crea, actualiza y elimina pais. |
| SWG-CRUD-002 | `Cities` | Pasado | Crea pais dependiente, crea, actualiza y elimina ciudad. |
| SWG-CRUD-003 | `company-sectors` | Pasado | Crea, actualiza y elimina sector. |
| SWG-CRUD-004 | `company-statuses` | Pasado | Crea, actualiza y elimina estado. |
| SWG-CRUD-005 | `activity-levels` | Pasado | Crea, actualiza y elimina nivel de actividad. |
| SWG-CRUD-006 | `contact-sources` | Pasado | Crea, actualiza y elimina fuente de contacto. |
| SWG-CRUD-007 | `activity-types` | Pasado | Crea, actualiza y elimina tipo de actividad. |
| SWG-CRUD-008 | `companies` | Pasado | Crea dependencias, crea, actualiza y elimina compania. |
| SWG-CRUD-009 | `contacts` | Pasado | Crea dependencias, crea, actualiza y elimina contacto. |
| SWG-CRUD-010 | `activities` | Pasado | Crea dependencias, crea, actualiza y elimina actividad. |

## Evidencia tecnica

El detalle de Playwright queda bajo `test-results/` y el reporte HTML bajo `playwright-report/` despues de cada ejecucion.
