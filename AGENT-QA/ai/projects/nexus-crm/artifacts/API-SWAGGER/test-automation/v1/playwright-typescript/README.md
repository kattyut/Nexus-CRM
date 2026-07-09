# Nexus API - Swagger/OpenAPI Playwright TypeScript

Suite generada a partir de la especificacion Swagger/OpenAPI de Nexus.

## Flujo QA

1. Casos de prueba documentados: `tests/test-cases.md`.
2. Scripts automatizados: `tests/openapi-contract.spec.ts` y `tests/openapi-crud.spec.ts`.
3. Evidencia de ejecucion: `reports/latest-execution.md`, `test-results/` y `playwright-report/`.

Nota: `node_modules/`, `test-results/` y `playwright-report/` son carpetas generadas. No son parte de la definicion de la suite y se pueden borrar; se crean de nuevo al instalar dependencias o ejecutar pruebas.

## Ejecucion

```powershell
npm install
$env:RUN_API="true"
$env:API_BASE_URL="https://localhost:7167"
npm.cmd run test:openapi
```

Para ejecutar tambien los flujos CRUD:

```powershell
npm.cmd run test:swagger
```

Variables soportadas:

- `API_BASE_URL`: URL base del backend.
- `RUN_API=true`: habilita las pruebas reales.
- `API_RESPONSE_SLA_MS`: umbral de tiempo de respuesta, por defecto `2000`.

## Cobertura

- Disponibilidad del Swagger JSON vivo en `/swagger/v1/swagger.json`.
- Comparacion de rutas documentadas contra la especificacion versionada en `openapi/nexus.openapi.json`.
- Smoke contract para endpoints `GET` sin parametros de ruta.
- Status code segun respuestas declaradas en OpenAPI.
- Headers `content-type`.
- Tiempo de respuesta.
- Flujos CRUD para catalogos y entidades principales: crear, actualizar y eliminar.

## Trazabilidad

Version actual de casos: `v1`.

Cada prueba automatizada incluye un ID `SWG-CT-*` que corresponde a un caso en `tests/test-cases.md`.

La trazabilidad queda asi:

| Nivel | Archivo |
| --- | --- |
| Casos y version | `tests/test-cases.md` |
| Scripts automatizados | `tests/openapi-contract.spec.ts`, `tests/openapi-crud.spec.ts` |
| Contrato Swagger versionado | `openapi/nexus.openapi.json` |
| Resultado de ejecucion | `reports/latest-execution.md` |
