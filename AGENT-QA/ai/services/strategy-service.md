# STRATEGY SERVICE

## Objetivo

Gestionar dinamicamente estrategias de enriquecimiento, metodologias QA, frameworks y reglas utilizadas por el sistema QA multiagente.

Este servicio es responsable de:

- cargar estrategias
- cargar metodologias
- resolver defaults
- validar configuraciones
- centralizar rules
- evitar hardcoding
- mantener extensibilidad

Este servicio NO debe:

- generar artefactos QA
- ejecutar logica de negocio
- generar contenido funcional
- manejar persistencia

---

# Catalogos oficiales

## Enriquecimiento

```text
ai/config/enrichment-options/strategy-catalog.json
```

## Planes de prueba

```text
ai/config/qa-testplan-options/strategytest-catalog.json
```

---

# Responsabilidades

- leer catalogos
- validar `default_strategy_id`
- validar `strategies`
- validar existencia de `rule_file`
- resolver estrategia activa
- resolver metodologia activa
- mostrar opciones cuando el usuario no sepa cual elegir
- evitar fallback silencioso

---

# Arquitectura objetivo

```text
ai/config/
  enrichment-options/
    strategy-catalog.json
    clasica-scrum.md
    valor3-preguntas.md
    escenarios-gherkin.md
    tecnico-funcional-nfr.md
    dor-lista-refinamiento.md
  qa-testplan-options/
    strategytest-catalog.json
    agile.md
    tradicional-IEEE.md
    basado-cobertura.md
    exploratorio.md
    orientado-automatizacion.md
```

---

# Reglas

- Si el usuario no selecciona estrategia/metodologia, mostrar default y pedir aprobacion.
- Si el usuario pide opciones, mostrar `id`, `name`, `summary`, `preview`.
- Si una estrategia/metodologia no existe, mostrar opciones y preguntar de nuevo.
- No aplicar default sin aprobacion.

---

# Automatizacion ejecutable

El servicio tambien debe resolver frameworks desde:

```text
ai/config/automation-options/automation-catalog.json
```

Debe validar:

- `default_framework` y `default_framework_id`;
- `framework_id`;
- `framework_name`;
- `framework_type`;
- `rule_file`;
- `templates_path` cuando el framework use plantillas;
- `output_path` con placeholders `{project_slug}`, `{story_id}` y `{version}`;
- comando de ejecucion y dependencias.

Para `playwright-typescript`, el `templates_path` oficial es:

```text
ai/config/automation-templates/playwright-typescript
```

El servicio no debe generar archivos ni persistir artefactos; solo resuelve y valida la estrategia tecnica seleccionada.
