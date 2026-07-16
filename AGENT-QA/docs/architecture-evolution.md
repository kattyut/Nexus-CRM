# Evolucion Arquitectonica - AGENT-QA

## Proposito

Este documento define como debe evolucionar AGENT-QA sin romper la arquitectura actual. Su objetivo es evitar duplicidades, mantener compatibilidad y asegurar que cada nueva capacidad tenga una ubicacion correcta.

## Arquitectura Vigente

La arquitectura activa vive bajo `ai/`:

```text
ai/
  agents/
  commands/
  skills/
  services/
  config/
  projects/
  scripts/
```

Los documentos de gobierno viven bajo `docs/`. Los proyectos concretos y artefactos operativos viven bajo `ai/projects/{project-slug}/`.

## Principios de Evolucion

- No cambiar rutas oficiales sin migracion explicita.
- No duplicar logica entre agent, command, skill y service.
- No guardar secretos en documentos, summaries, logs ni configuracion de proyecto.
- No introducir capacidades nuevas sin entrada en roadmap, capabilities y backlog.
- Mantener compatibilidad con artefactos versionados existentes.
- Preservar comportamiento actual salvo cambio aprobado y documentado.

## Cuando Crear un Nuevo Agent

Crear un agent nuevo solo cuando exista una responsabilidad especializada de alto nivel que coordine varios commands, skills o services, tenga ciclo propio distinto del QA Master y requiera identidad, restricciones y validaciones propias.

No crear un agent para una sola transformacion documental. En ese caso usar skill.

## Cuando Crear un Nuevo Command

Crear un command cuando se necesite un punto de entrada conversacional o accion ejecutable que pueda mapearse desde lenguaje natural, valide precondiciones especificas, delegue a skills/services y represente una operacion del usuario.

No poner logica pesada en commands. El command debe orquestar y delegar.

## Cuando Crear un Nuevo Skill

Crear un skill cuando exista una capacidad QA especializada que transforme entradas funcionales en un artefacto o resultado QA, tenga reglas propias de contenido, dependa de contexto/HU/artefactos/catalogos y deba versionarse o persistirse.

Ejemplos validos: analisis de cobertura, analisis de impacto, generacion de estrategia de regresion.

## Cuando Crear un Nuevo Service

Crear un service cuando la logica sea transversal, reutilizable o tecnica: persistencia, versionamiento, summaries, logs, validaciones comunes, conexiones externas, resolucion de catalogos, ejecucion, evidencia o calculo compartido.

Si una logica sera usada por mas de un skill o command, debe vivir en service.

## Cuando Extender un Componente Existente

Extender antes de crear algo nuevo cuando la responsabilidad ya pertenece a un componente existente, solo se agrega una regla/provider/tipo soportado, el cambio puede mantenerse por catalogo o no se introduce un ciclo conversacional independiente.

Ejemplos:

- Nuevo framework de automatizacion: extender `automation-catalog.json` y agregar reglas/templates.
- Nueva metodologia QA: extender `qa-testplan-options`.
- Nueva estrategia de enriquecimiento: extender `enrichment-options`.
- Nueva validacion comun: extender `validation-service.md`.

## Como Evitar Duplicidades

Antes de crear componente:

1. Revisar `docs/capabilities.md`.
2. Revisar services existentes.
3. Revisar si un catalogo puede resolverlo.
4. Revisar si un skill actual puede extenderse.
5. Crear nuevo componente solo si la responsabilidad no existe.

Los agents no deben duplicar reglas de services. Los skills no deben duplicar persistencia ni versionamiento. Los commands no deben duplicar contenido QA.

## Compatibilidad

Toda evolucion debe mantener:

- estructura `ai/projects/{project-slug}/artifacts/{hu-id}/...`;
- versionamiento `vN`;
- summaries existentes;
- logs historicos;
- reglas anti-invencion;
- aprobacion explicita para sincronizar herramientas externas;
- lectura dinamica de catalogos.

Si una migracion es inevitable, debe documentarse primero en `docs/releases.md` y planificarse en `docs/backlog.md`.

## Criterio de Aprobacion Arquitectonica

Una propuesta tecnica esta lista para implementarse cuando tiene capacidad asociada, version del roadmap, epica/feature/tareas en backlog, decision de crear o extender componente, dependencias claras y compatibilidad declarada.

