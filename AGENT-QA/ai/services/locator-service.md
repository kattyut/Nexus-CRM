# LOCATOR SERVICE

## Objetivo

Definir reglas estandar para generar selectores Playwright mantenibles, semanticos y estables.

Este servicio es responsable de:

- orientar la estrategia de locators antes de generar automatizacion;
- evitar selectores fragiles;
- mantener consistencia entre tests, Page Objects y templates;
- registrar pendientes cuando no exista informacion suficiente para un locator confiable.

Este servicio NO debe:

- generar tests;
- crear Page Objects;
- inventar nombres de controles;
- consultar aplicaciones reales;
- reemplazar validaciones del `validation-service.md`.

---

# Prioridad de locators

Usar esta prioridad al generar codigo Playwright:

1. `getByRole()`

```ts
page.getByRole('button', { name: 'Guardar' })
```

2. `getByTestId()`

```ts
page.getByTestId('save-button')
```

3. `getByLabel()`

```ts
page.getByLabel('Correo')
```

4. Locator semantico controlado

```ts
page.locator('[data-qa="company-name"]')
```

---

# Reglas

- Preferir locators accesibles basados en roles y nombres visibles.
- Usar `getByTestId()` cuando el caso, HU o contexto mencione identificadores de prueba.
- Usar `getByLabel()` para campos de formulario con etiqueta clara.
- Centralizar locators dentro de Page Objects, no dentro del spec.
- Si falta informacion, usar placeholders visibles y registrar el pendiente en README y metadata.

---

# Evitar

- xpath innecesario;
- clases CSS dinamicas;
- ids generados automaticamente;
- selectores por posicion;
- `nth()` sin justificacion;
- `waitForTimeout()`;
- textos inventados que no provienen de HU, caso de prueba o contexto.

---

# Integracion

El `test-automation-agent.md` y `generate-test-automation.md` deben consultar este servicio antes de generar automatizacion Playwright.

El `validation-service.md` debe validar que los Page Objects no concentren selectores fragiles cuando existan alternativas semanticas.
