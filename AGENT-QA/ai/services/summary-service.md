# SUMMARY SERVICE

## Objetivo

Gestionar trazabilidad, auditoria y resumen historico de cambios realizados por el sistema QA multiagente.

Este servicio es responsable de:

- registrar cambios
- mantener historial completo
- generar `summary.json`
- consolidar metadata
- mantener trazabilidad entre versiones
- registrar agents, commands y skills ejecutados
- registrar metodologias y estrategias utilizadas
- registrar acciones realizadas

Este servicio NO debe:

- generar artefactos QA
- modificar contenido funcional
- ejecutar logica QA
- generar contenido de pruebas

---

# Responsabilidades principales

Registrar historial de:

- lecturas de HU
- analisis
- enriquecimientos
- explicaciones
- planes
- casos
- matrices
- contextos
- configuraciones
- sincronizaciones externas

---

# Arquitectura objetivo

```text
ai/projects/{project-slug}/artifacts/{hu-id}/summary.json
ai/projects/{project-slug}/artifacts/{hu-id}/{artifact-type}/summary.json
ai/projects/{project-slug}/artifacts/global/summary.json
```

---

# Metadata recomendada

- version
- artifact_type
- project
- project_slug
- hu_id
- action
- command
- skill
- strategy
- methodology
- source_versions
- created_at
- updated_at
- status
- source_provider
- source_status
- initial_sufficiency_status
- latest_analysis_version
- blocking_errors

---

# Reglas

- Registrar cada version creada.
- Registrar cada analisis inicial creado en `analysis/vN/`.
- Registrar artefactos fuente usados.
- Registrar aprobaciones relevantes.
- Registrar HU excluidas en matriz global cuando no tengan casos.
- Registrar cada ejecucion por HU en `ai/projects/{project-slug}/artifacts/{hu-id}/summary.json`.
- Cuando se cree un analisis, actualizar `artifacts.analysis.latest_version`, `path`, `status`, `sufficiency_status` y `updated_at` en el summary raiz de la HU.
- Cada `analysis/vN/summary.json` debe resumir estado inicial, suficiencia, hallazgos, riesgos y siguiente paso.
- Registrar lecturas fallidas de herramientas externas como eventos bloqueados, sin generar artefactos QA sustitutos.

---

# Summary de automatizacion ejecutable

Cuando se genere automatizacion, actualizar el summary raiz de la HU con:

- `automation_generated`
- `framework`
- `framework_version`
- `automation_version`
- `generated_at`
- `artifacts.test_automation.latest_version`
- `artifacts.test_automation.path`
- `artifacts.test_automation.latest_path`
- `artifacts.test_automation.status`
- `artifacts.test_automation.framework`

Tambien registrar las versiones fuente usadas: HU enriquecida, plan de pruebas y casos de prueba.
