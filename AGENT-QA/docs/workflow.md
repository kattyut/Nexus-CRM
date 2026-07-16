# Workflow QA

## Flujo General

```mermaid
flowchart LR
    A[Usuario]
    B[QA Master Agent]
    C[Command]
    D[Skill]
    E[Services]
    F[Artifacts]
    G[Versioning]
    H[Summary]
    I[Logging]
    J[Resultado final]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
```

## Flujo Funcional de HU

```mermaid
flowchart LR
    HU[HU desde fuente definida]
    READ[read-us]
    ANALYZE[analyze-us]
    ENRICH[enrich-us]
    EXPLAIN[explain-requirements]
    PLAN[generate-test-plan]
    CASES[generate-test-cases]
    MATRIX[generate-test-matrix]
    ART[artifact-service]
    VER[versioning-service]
    SUM[summary-service]
    LOG[logging-service]

    HU --> READ
    READ --> ANALYZE
    ANALYZE --> ENRICH
    ENRICH --> EXPLAIN
    ENRICH --> PLAN
    PLAN --> CASES
    CASES --> MATRIX

    READ --> ART
    ANALYZE --> ART
    ENRICH --> ART
    PLAN --> ART
    CASES --> ART
    MATRIX --> ART
    ART --> VER
    VER --> SUM
    SUM --> LOG
```

## Flujo de Automatizacion

```mermaid
flowchart LR
    HU[HU enriquecida]
    PLAN[Test plan]
    CASES[Test cases]
    AUTO[generate-test-automation]
    FRAMEWORK[automation-catalog]
    SERVICES[locator/test-data/api-analysis services]
    PW[Playwright project]
    EXEC[test-execution-service]
    SUMMARY[summary-service]
    LOGGING[logging-service]

    HU --> AUTO
    PLAN --> AUTO
    CASES --> AUTO
    FRAMEWORK --> AUTO
    AUTO --> SERVICES
    SERVICES --> PW
    PW --> EXEC
    EXEC --> SUMMARY
    SUMMARY --> LOGGING
```

## Etapas

1. Validar contexto de proyecto y fuente de HU.
2. Leer y normalizar HU.
3. Analizar suficiencia y riesgos.
4. Enriquecer solo con estrategia aprobada.
5. Explicar requerimiento cuando se necesita alineacion.
6. Generar plan con metodologia aprobada.
7. Generar casos con trazabilidad.
8. Generar matriz individual o global.
9. Generar automatizacion solo si existen HU enriquecida, plan y casos.
10. Ejecutar automatizacion solo bajo solicitud explicita y con precondiciones de ambiente.

## Persistencia

Todos los artefactos deben:

- tener ubicacion bajo `ai/projects/{project-slug}/artifacts/`;
- versionarse como `vN`;
- mantener metadata cuando el artefacto sea versionado;
- actualizar summary;
- registrar logs o evidencias de auditoria.

