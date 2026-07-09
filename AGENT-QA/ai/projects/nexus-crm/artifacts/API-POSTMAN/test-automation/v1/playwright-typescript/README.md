# Nexus API - Playwright TypeScript

Suite generada a partir de `Nexus.postman_collection.json`.

## Ejecucion

```bash
npm install
RUN_API=true API_BASE_URL=https://host-api npm run test:api
```

Variables soportadas:

- `API_BASE_URL`: URL base del backend.
- `RUN_API=true`: habilita las pruebas reales.
- `API_RESPONSE_SLA_MS`: umbral de tiempo de respuesta, por defecto `2000`.

## Cobertura

- Status code.
- Schema de listas y objetos.
- Campos obligatorios.
- Reglas de negocio derivadas de HU y contexto funcional.
- Manejo de errores.
- Headers `content-type`.
- Tiempo de respuesta.
- Edge cases por payload vacio, campos faltantes, id inexistente y rutas inconsistentes.
