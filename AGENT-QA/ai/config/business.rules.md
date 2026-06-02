# Business Rules - QA Master Agent

## Objetivo

Definir las reglas funcionales y de negocio que gobiernan el ecosistema QA AI para:

- lectura y analisis de HU
- enriquecimiento de HU
- explicacion funcional de requerimientos
- generacion de planes de prueba
- generacion de casos de prueba
- generacion de matrices individuales y globales
- validacion de consistencia QA

Estas reglas complementan las reglas globales definidas en:

```text
ai/config/agent-rules.md
```

---

# Alcance QA

Estas reglas aplican a:

- Historias de Usuario
- Requerimientos funcionales
- Planes de prueba
- Casos de prueba
- Matrices de prueba
- Explicaciones funcionales
- Estrategias de enriquecimiento
- Metodologias QA
- Artefactos versionados

---

# Configuracion obligatoria previa

Antes de ejecutar cualquier proceso QA, el agente debe validar contexto minimo suficiente.

El contexto se gestiona por proyecto mediante `context-service.md` y debe persistirse bajo:

```text
ai/projects/{project-slug}/business-context/
```

Tambien debe validar y registrar la herramienta de gestion o fuente oficial de las HU mediante `connection-service.md` cuando aplique.

---

# Contexto minimo requerido

El contexto debe incluir como minimo:

1. Dominio de negocio.
2. Objetivo del proyecto.
3. Usuarios involucrados.
4. Funcionalidades principales.
5. Flujo funcional principal.
6. Restricciones conocidas.
7. Integraciones relevantes.
8. Criticidad del sistema.
9. Herramienta de gestion o fuente de HU.

Si falta contexto:

1. Detener ejecucion.
2. Informar que informacion falta.
3. Ejecutar onboarding guiado.
4. Re-evaluar suficiencia antes de continuar.

Herramientas o fuentes validas:

- Jira
- Azure DevOps
- Planner
- Trello
- Excel
- archivo local
- texto manual
- otra fuente indicada por el usuario

Si la HU sera suministrada manualmente, la fuente debe registrarse como `texto manual`; no se debe dejar vacia.

Si la herramienta es Planner:

- debe existir conexion MCP externa
- debe usarse login por navegador
- debe registrarse `provider: planner` y `auth_mode: browser_oauth_mcp`
- debe validarse usuario conectado antes de leer o modificar tareas
- no se deben guardar tokens ni secretos

Si la herramienta es Azure DevOps:

- debe existir configuracion por proyecto en `ai/projects/{project-slug}/config/tool-connection.json`
- debe registrarse `provider: azure-devops` y `auth_mode: pat_env`
- debe validarse `organization_url`, `project` y referencias a variables de entorno
- debe validarse permiso de lectura antes de leer Work Items
- debe validarse permiso de escritura antes de crear o actualizar Work Items
- no se deben guardar PATs ni secretos
- no se debe inventar HU si el Work Item no existe o no es accesible

---

# Ciclo obligatorio para HU

El agente debe respetar este ciclo:

1. Contexto de negocio del proyecto.
2. Herramienta de gestion o fuente de HU.
3. Lectura y normalizacion con `read-us.md`.
4. Analisis con `analyze-us.md`.
5. Enriquecimiento con `enrich-us.md`, solo si aplica y con estrategia confirmada.

Si el usuario solicita solo entender una HU:

- se permite explicar con `explain-requirements.md`
- primero debe existir contexto de negocio suficiente
- primero debe existir herramienta o fuente definida
- no se debe enriquecer ni modificar la HU
- se deben separar hechos, vacios y preguntas abiertas

---

# Reglas de suficiencia para HU

El agente NO debe enriquecer automaticamente cualquier historia leida.

Debe ejecutar esta secuencia:

1. Leer historia original.
2. Normalizar HU.
3. Evaluar suficiencia.
4. Clasificar estado.
5. Informar resultado.
6. Solicitar aprobacion antes de modificar o enriquecer.

La evaluacion y clasificacion de suficiencia debe persistirse obligatoriamente como analisis inicial en:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/analysis/vN/
```

Archivos obligatorios:

- `analysis.md`
- `metadata.json`
- `summary.json`

La carpeta `analysis/` no debe quedar vacia si la HU fue leida y analizada correctamente.

---

# Estados validos de clasificacion

| Estado | Significado |
|---|---|
| `insufficient` | No tiene suficiente informacion para analisis o enriquecimiento confiable |
| `sufficient_not_enriched` | Tiene base suficiente pero requiere enriquecimiento |
| `already_enriched` | Ya cumple estructura y nivel de detalle esperado |

---

# Checklist minimo de suficiencia

La historia debe cubrir minimo:

1. Problema u objetivo de negocio.
2. Actor o rol principal.
3. Resultado esperado.
4. Alcance funcional.
5. Criterios iniciales de validacion.

Si el origen no usa formato Scrum, validar que exista informacion equivalente.

---

# Comportamiento por clasificacion

## `insufficient`

El agente debe:

- explicar vacios
- explicar impacto QA
- solicitar aclaraciones
- no enriquecer hasta resolver informacion critica

## `sufficient_not_enriched`

El agente debe:

- proponer estrategia de enriquecimiento
- mostrar estrategia default
- solicitar confirmacion explicita antes de enriquecer

## `already_enriched`

El agente debe:

- informar que la HU ya esta enriquecida
- ofrecer mejoras incrementales:
  - mas detalle funcional
  - mas detalle tecnico
  - NFR
  - mas escenarios
  - mas cobertura QA

---

# Reglas de enriquecimiento

El enriquecimiento debe:

- mejorar claridad
- mejorar testeabilidad
- mejorar trazabilidad
- mejorar entendimiento funcional
- mejorar cobertura QA
- conservar informacion original util
- incluir encabezado visible con estrategia, contexto breve, prioridad y version
- persistirse como version en la carpeta de la HU

El enriquecimiento NO debe:

- inventar funcionalidades
- inventar reglas
- inventar validaciones
- inventar integraciones
- inventar decisiones tecnicas

---

# Catalogo de estrategias de enriquecimiento

Catalogo oficial:

```text
ai/config/enrichment-options/strategy-catalog.json
```

Reglas:

- si el usuario especifica estrategia, validar que exista
- si no especifica, mostrar default y pedir aprobacion
- si solicita opciones, mostrar `id`, `name`, `summary`, `preview`
- si la estrategia no existe, mostrar opciones y preguntar de nuevo
- no aplicar fallback silencioso
- leer dinamicamente el `rule_file`

---

# Catalogo de metodologias QA

Catalogo oficial:

```text
ai/config/qa-testplan-options/strategytest-catalog.json
```

Reglas:

- si el usuario especifica metodologia, validar que exista
- si no especifica, mostrar default y pedir aprobacion
- si solicita opciones, mostrar `id`, `name`, `summary`, `preview`
- si la metodologia no existe, mostrar opciones y preguntar de nuevo
- no aplicar fallback silencioso
- leer dinamicamente el `rule_file`

---

# Uso obligatorio del contexto

El agente debe buscar informacion en este orden:

1. HU o requerimiento.
2. HU enriquecida, si existe.
3. Analisis previo, si existe.
4. Explicacion funcional, si existe.
5. Contexto del proyecto.
6. `business.rules.md`.
7. Estrategia o metodologia seleccionada.
8. Preguntar al usuario.

Nunca asumir informacion inexistente.

---

# Validaciones QA obligatorias

Todo artefacto generado debe validar:

1. Claridad funcional.
2. Trazabilidad.
3. Cobertura funcional.
4. Cobertura negativa.
5. Cobertura edge cases.
6. Consistencia funcional.
7. Testeabilidad.
8. Aplicabilidad real.
9. Ausencia de informacion inventada.

---

# Reglas para criterios de aceptacion

Los criterios deben ser:

- claros
- verificables
- medibles cuando aplique
- trazables

Deben cubrir:

- flujo feliz
- escenarios alternos
- escenarios negativos
- validaciones
- errores

---

# Reglas para planes de prueba

Todo plan debe incluir minimo:

- encabezado visible
- objetivo
- alcance
- metodologia QA
- tipos de prueba
- riesgos
- dependencias
- cobertura
- ambientes o pendientes de ambiente
- criterios de entrada
- criterios de salida
- supuestos y pendientes

---

# Reglas para casos de prueba

Todo caso debe incluir:

- ID
- HU ID
- criterio asociado
- titulo
- objetivo
- precondiciones
- datos de prueba
- pasos
- resultado esperado
- prioridad
- tipo de prueba
- cobertura
- automatizable
- notas QA

---

# Reglas para matrices de prueba

Toda matriz debe incluir:

- proyecto
- HU relacionada
- versiones fuente
- casos asociados
- cobertura funcional
- prioridad
- automatizable
- resultado esperado
- dependencias
- estado
- observaciones

La matriz puede ser:

- individual por HU
- global por proyecto

La matriz global debe usar ultimas versiones y ordenar por HU.

---

# Persistencia de artefactos

El agente debe:

1. Crear carpetas inexistentes mediante `artifact-service.md`.
2. Crear artefactos solo con aprobacion cuando aplique.
3. Versionar mediante `versioning-service.md`.
4. Validar existencia previa.
5. Mantener estructura consistente.
6. Actualizar summaries mediante `summary-service.md`.

Para el artefacto `analysis`:

- debe crearse durante `analyze-us`
- debe capturar el estado inicial de la HU antes de enriquecer
- debe incluir completitud, vacios, suficiencia, INVEST, riesgos y siguiente paso
- debe tener metadata por version
- debe actualizar el `summary.json` raiz de la HU

Rutas base:

```text
ai/projects/{project-slug}/artifacts/{hu-id}/
ai/projects/{project-slug}/artifacts/global/
```

---

# Actualizacion de herramientas externas

La HU enriquecida puede actualizarse en herramienta origen solo si:

1. Existe version local persistida.
2. El usuario aprueba explicitamente.
3. Se validan conexion y permisos.
4. Se muestran campos a actualizar.

No actualizar Jira, Azure DevOps, Planner, Trello o Excel sin aprobacion.

## Planner

Planner permite crear o editar tareas solo con aprobacion explicita.

Para crear una tarea:

1. Debe existir solicitud explicita del usuario.
2. Deben existir `plan_id`, `bucket_id` y titulo.
3. Debe validarse permiso `Tasks.ReadWrite`.
4. Deben mostrarse los campos a crear.
5. Debe aprobarse la creacion antes de llamar al MCP.

Para editar una tarea:

1. Debe existir tarea leida previamente.
2. Deben leerse detalles actuales.
3. Deben mostrarse campos actuales y propuestos.
4. Debe usarse ETag/`If-Match`.
5. No se debe reemplazar descripcion original sin confirmacion.

La HU enriquecida puede agregarse a Planner como seccion/anexo en la descripcion o como checklist, segun aprobacion del usuario y compatibilidad del campo.

---

# Conversacion iterativa

Despues de cada generacion, el agente debe ofrecer ajustes relevantes:

- mas detalle
- ampliar cobertura
- agregar escenarios negativos
- agregar edge cases
- agregar automatizacion
- generar siguiente artefacto del flujo

---

# Comandos conversacionales esperados

El agente debe entender variaciones de:

- leer HU
- analizar historia
- enriquecer historia
- explicar requerimiento
- generar plan de pruebas
- generar casos de prueba
- generar matriz individual
- generar matriz global
- mostrar estrategias
- mostrar metodologias QA

---

# Reglas de salida

Todas las respuestas deben:

- ser claras
- ser accionables
- ser aplicables
- mantener consistencia QA
- mantener trazabilidad
- evitar ambiguedad
- separar hechos, supuestos y pendientes

---

# Regla final

Si existe conflicto entre:

- regla global
- regla de negocio
- estrategia
- metodologia
- skill
- comando

Las reglas definidas en `ai/config/agent-rules.md` tienen prioridad.
