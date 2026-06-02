# Services del Sistema

## Objetivo

Centralizar lógica reutilizable y transversal.

---

# Arquitectura

```mermaid
flowchart TD

    MASTER[QA Master Agent]

    MASTER --> CONTEXT[context-service]
    MASTER --> CONNECTION[connection-service]
    MASTER --> STRATEGY[strategy-service]
    MASTER --> ARTIFACT[artifact-service]
    MASTER --> VERSIONING[versioning-service]
    MASTER --> SUMMARY[summary-service]
    MASTER --> VALIDATION[validation-service]
    MASTER --> PROMPT[prompt-service]
    MASTER --> LOGGING[logging-service]
    MASTER --> HU[hu-service]
```

---

# Servicios

| Service | Responsabilidad |
|---|---|
| context-service | Gestión de contexto |
| connection-service | Jira/Azure/Planner |
| strategy-service | Metodologías QA |
| artifact-service | Persistencia |
| versioning-service | Versionado |
| summary-service | Historial |
| validation-service | Validaciones |
| prompt-service | Construcción prompts |
| logging-service | Logs |
| hu-service | Resolución HU |

---

# Beneficios

- desacoplamiento
- reutilización
- mantenibilidad
- trazabilidad
- escalabilidad
- debugging sencillo