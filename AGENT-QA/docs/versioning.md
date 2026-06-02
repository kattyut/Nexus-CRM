# Sistema de Versionamiento

## Objetivo

Mantener trazabilidad completa de todos los artefactos QA.

---

# Estructura

```mermaid
flowchart TD

    PROJECT[Proyecto]

    PROJECT --> CONTEXT[business-context]

    PROJECT --> ARTIFACTS[artifacts]

    ARTIFACTS --> HU[MCA-1__Login]

    HU --> ENRICH[enrich-us]
    HU --> PLAN[test-plan]
    HU --> CASES[test-cases]
    HU --> MATRIX[test-matrix]

    ENRICH --> V1[v1]
    ENRICH --> V2[v2]

    PLAN --> PV1[v1]

    CASES --> CV1[v1]
    CASES --> CV2[v2]

    HU --> SUMMARY[summary.json]
```

---

# Versionamiento

Cada artefacto:

- mantiene versiones
- conserva historial
- registra metadata
- genera summary

---

# Metadata registrada

- fecha
- hora
- usuario
- agente
- estrategia
- metodología
- summary de cambios

---

# Beneficios

- auditoría
- trazabilidad
- recuperación
- control de cambios
- mantenimiento histórico