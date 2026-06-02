# Workflow QA

## Flujo General

```mermaid
flowchart LR

    A[HU desde Jira o manual]
    B[QA Master Agent]
    C[read-us]
    D[analyze-us]
    E[enrich-us]
    F[generate-test-plan]
    G[generate-test-cases]
    H[generate-test-matrix]

    I[artifact-service]
    J[versioning-service]
    K[summary-service]

    L[(Projects)]

    A --> B

    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H

    E --> I
    F --> I
    G --> I
    H --> I

    I --> J
    J --> K

    K --> L
```

---

# Etapas del flujo

## 1. Lectura de HU

La HU puede venir desde:

- Jira
- Azure DevOps
- Planner
- Trello
- entrada manual

---

## 2. Análisis

Se valida:

- estructura
- claridad
- INVEST
- criterios
- dependencias

---

## 3. Enriquecimiento

Se agregan:

- criterios de aceptación
- reglas de negocio
- edge cases
- escenarios alternativos

---

## 4. Generación de plan

Se aplica metodología QA:

- Scrum
- Dragonfly
- Risk Based
- IEEE
- híbridas

---

## 5. Generación de casos

Se generan:

- funcionales
- negativos
- API
- E2E
- edge cases

---

## 6. Matriz de trazabilidad

Se conecta:

- HU
- criterios
- planes
- casos

---

## 7. Persistencia

Todos los artefactos:

- se versionan
- generan metadata
- actualizan summary
- registran auditoría