# API ANALYSIS SERVICE

## Objetivo

Analizar contratos OpenAPI/Swagger para producir una estructura entendible por los skills de generacion de casos y automatizacion API.

Este servicio es responsable de:

- leer contratos `openapi.json`, `swagger.json`, `openapi.yaml` y `swagger.yaml`;
- identificar endpoints y metodos HTTP;
- identificar parametros, headers, autenticacion, payloads y responses;
- detectar codigos HTTP esperados;
- extraer campos requeridos, tipos de datos, limites y reglas obligatorias;
- producir insumos para generar casos API positivos, negativos y validaciones de contrato.

Este servicio NO debe:

- ejecutar pruebas;
- generar specs Playwright directamente;
- modificar contratos;
- inventar endpoints, payloads o codigos HTTP;
- reemplazar `test-data-service.md`, `strategy-service.md` ni `validation-service.md`.

---

# Entradas soportadas

Archivos locales dentro del proyecto o artefacto:

```text
openapi.json
swagger.json
openapi.yaml
swagger.yaml
```

Tambien puede analizar contratos referenciados por metadata, siempre que el archivo exista localmente o haya sido leido por un flujo aprobado.

---

# Salida esperada

El resultado debe ser una estructura serializable para otros skills:

```json
{
  "contract_file": "openapi.json",
  "api_title": "Nexus API",
  "api_version": "1.0.0",
  "base_path": "/api",
  "auth": {
    "required": true,
    "schemes": ["bearerAuth"]
  },
  "endpoints": [
    {
      "path": "/companies",
      "method": "post",
      "operation_id": "createCompany",
      "parameters": [],
      "headers": [],
      "request_body": {
        "required": true,
        "schema_ref": "#/components/schemas/Company"
      },
      "responses": {
        "201": { "description": "Created" },
        "400": { "description": "Bad Request" }
      },
      "required_fields": ["name"],
      "rules": ["name is required"]
    }
  ]
}
```

---

# Estrategia de casos API

## Casos positivos

Generar cobertura cuando el contrato lo permita:

- `200 OK`
- `201 Created`
- `204 No Content`

## Casos negativos

Generar cobertura cuando el contrato, seguridad o validaciones lo permitan:

- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `500 Internal Server Error`

---

# Validaciones obligatorias

El analisis debe identificar oportunidades para validar:

- campos requeridos;
- tipos de datos;
- limites minimos y maximos;
- enumeraciones;
- formatos como email, uuid, date-time;
- headers requeridos;
- autenticacion;
- contratos de response;
- errores esperados.

---

# Integracion

- `generate-test-automation.md` consulta este servicio cuando el tipo sea `playwright-api` o `playwright-e2e`.
- `test-data-service.md` usa el analisis para derivar payloads validos e invalidos.
- `strategy-service.md` valida capacidades de contrato API declaradas en el catalogo.
- `logging-service.md` registra contrato analizado, endpoints encontrados y errores.
- `summary-service.md` registra `api_tests_generated`, `endpoints_covered`, `contract_validated` y `api_execution_status`.

---

# Bloqueos

Bloquear generacion API si:

- el archivo de contrato no existe;
- el contrato no puede parsearse;
- no existen paths;
- un endpoint requerido por el caso no existe en el contrato;
- falta informacion critica para generar una prueba sin inventar comportamiento.

Cuando el contrato sea parcial pero util, continuar solo con endpoints verificables y registrar pendientes.
