# TEST DATA SERVICE

## Objetivo

Gestionar datos de prueba para automatizacion generada, separando datos validos, invalidos y utilidades reutilizables.

Este servicio es responsable de:

- definir datos validos;
- definir datos invalidos;
- promover reutilizacion;
- mantener aislamiento entre tests;
- orientar limpieza de datos cuando aplique;
- evitar datos quemados dentro de los specs.

Este servicio NO debe:

- ejecutar pruebas;
- crear datos en sistemas externos sin aprobacion;
- persistir secretos;
- inventar reglas de negocio no documentadas.

---

# Estructura esperada

Para Playwright TypeScript, generar datos bajo:

```text
fixtures/
  users.json
  companies.json
  test-data.ts
```

Los nombres concretos deben derivarse de la HU, casos y modulo funcional. No crear archivos vacios.

---

# Reglas de datos

- Separar datos del spec.
- Importar datos desde `fixtures/`.
- Mantener datos validos e invalidos diferenciados.
- Evitar datos reales o sensibles.
- Evitar valores quemados como `email = "test@test.com"` dentro del test.
- Usar sufijos o timestamps solo cuando el caso requiera unicidad.
- Documentar datos pendientes cuando negocio no los haya confirmado.
- Para API, derivar payloads validos e invalidos desde `api-analysis-service.md` cuando exista contrato OpenAPI/Swagger.

---

# Salida TypeScript recomendada

`fixtures/test-data.ts` debe exportar objetos tipados o constantes reutilizables:

```ts
import companies from './companies.json';

export const testData = {
  companies
};
```

Los specs deben consumir esos datos:

```ts
import { testData } from '../fixtures/test-data';
```

---

# Limpieza

Cuando un caso cree datos persistentes, registrar en metadata o README:

- datos creados;
- criterio de limpieza;
- si la limpieza es manual o automatizada;
- dependencia externa si existe.

No implementar limpieza destructiva sin aprobacion explicita.

---

# Datos para API Testing

Cuando exista analisis OpenAPI/Swagger:

- generar payload valido con campos requeridos;
- generar payload invalido omitiendo al menos un campo requerido;
- respetar tipos, formatos, enumeraciones y limites;
- separar datos por entidad o recurso;
- no inventar campos no presentes en el contrato.
