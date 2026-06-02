# CONNECTION SERVICE

## Objetivo

Centralizar toda la lógica de integración con herramientas externas de gestión, sincronización de Historias de Usuario y actualización de artefactos QA.

Este servicio actúa como capa de abstracción entre los agentes QA y las plataformas externas.

---

# Responsabilidades

Este servicio debe:

* Detectar la herramienta configurada.
* Gestionar autenticación.
* Validar conexiones.
* Leer Historias de Usuario.
* Crear Historias de Usuario.
* Actualizar Historias de Usuario.
* Actualizar metadata QA.
* Sincronizar artefactos locales.
* Resolver diferencias entre proveedores.
* Mantener seguridad de credenciales.

---

# Herramientas soportadas

## Jira

Capacidades:

* Leer Issues
* Crear Issues
* Actualizar Issues
* Actualizar Summary
* Actualizar Description
* Agregar Labels
* Agregar Comentarios

---

## Azure DevOps

Capacidades:

* Leer Work Items
* Crear User Stories
* Actualizar Work Items
* Actualizar Título
* Actualizar Descripción
* Agregar Tags
* Agregar Comentarios

---

## Trello

Capacidades:

* Leer Cards
* Crear Cards
* Actualizar Cards
* Actualizar Descripción
* Agregar Labels

---

## Planner

Capacidades:

* Leer Tasks
* Crear Tasks
* Actualizar Tasks
* Actualizar Detalles
* Actualizar Categorías

---

# Configuración

Las configuraciones deben almacenarse en:

```text
ai/config/
```

---

# Archivos soportados

## Jira

```text
jira-config.json
```

---

## Azure DevOps

```text
azure-config.json
```

---

## Trello

```text
trello-config.json
```

---

## Planner

```text
planner-config.json
```

---

# Variables de entorno

Las credenciales deben obtenerse desde:

```text
.env
```

---

# Variables soportadas

## Jira

* JIRA_URL
* JIRA_USER
* JIRA_TOKEN

---

## Azure DevOps

* AZURE_DEVOPS_ORG_URL
* AZURE_DEVOPS_PROJECT
* AZURE_DEVOPS_PAT

---

## Trello

* TRELLO_API_KEY
* TRELLO_TOKEN

---

## Planner

* MICROSOFT_CLIENT_ID
* MICROSOFT_TENANT_ID
* MICROSOFT_CLIENT_SECRET

---

# Seguridad

NUNCA:

* Mostrar tokens.
* Persistir secretos en artefactos.
* Guardar PATs en summaries.
* Imprimir credenciales en logs.

SIEMPRE:

* Enmascarar secretos.
* Validar permisos mínimos.
* Solicitar aprobación antes de guardar configuraciones.

---

# Resolución del proveedor

El proveedor activo puede obtenerse desde:

* Configuración explícita.
* Configuración del proyecto.
* Selección del usuario.
* Contexto activo.

---

# Flujo principal

## PASO 1 - Resolver proveedor

Identificar herramienta activa.

---

## PASO 2 - Validar configuración

Validar:

* Configuración existente.
* Variables de entorno.
* Permisos mínimos.

---

## PASO 3 - Validar conexión

Validar:

* Autenticación.
* Acceso al proyecto.
* Acceso a Work Items o Issues.

---

## PASO 4 - Resolver HU

Resolver mediante:

* Story ID.
* Work Item ID.
* Nombre funcional.
* Referencia contextual.

---

## PASO 5 - Ejecutar operación

Operaciones soportadas:

* READ
* CREATE
* UPDATE
* COMMENT
* LABEL
* TAG

---

## PASO 6 - Registrar resultado

Delegar en:

* logging-service
* summary-service

---

# Azure DevOps Sync Mode

## Objetivo

Permitir que todos los modelos trabajen sobre la misma fuente local.

Esto garantiza compatibilidad entre:

* Codex
* Gemini
* Copilot
* Claude

---

# Principio arquitectónico

Los agentes NO deben depender directamente de Azure DevOps.

Deben trabajar sobre artefactos locales.

---

# Flujo Azure DevOps

```text
Azure DevOps
      ↓
sync_work_item.py
      ↓
projects/{project_slug}/artifacts/{story_id}/source/
      ↓
QA Skills
```

---

# Sincronización automática

Cuando el usuario solicite:

* Leer HU MCA-1
* Leer Work Item 4
* Analizar HU MCA-1
* Enriquecer HU MCA-1
* Generar Plan de Pruebas
* Generar Casos de Prueba

El sistema debe:

## 1

Verificar si existe:

```text
projects/{project_slug}/artifacts/{story_id}/source/work-item.md
```

---

## 2

Si NO existe:

Invocar:

```text
ai/scripts/sync_work_item.py
```

---

## 3

Sincronizar Azure DevOps.

---

## 4

Crear estructura local.

---

## 5

Continuar procesamiento normalmente.

---

# Estructura generada

```text
projects/
└── nexus-crm/
    └── artifacts/
        └── MCA-1/
            ├── source/
            │   ├── work-item.md
            │   └── metadata.json
            │
            ├── enrich-us/
            ├── test-plan/
            ├── test-cases/
            ├── test-automation/
            ├── logs/
            └── summary.json
```

---

# Reglas de sincronización

SIEMPRE:

* Sincronizar antes de procesar.
* Trabajar sobre artefactos locales.
* Mantener metadata actualizada.
* Mantener trazabilidad.

NUNCA:

* Trabajar directamente sobre Azure.
* Modificar Azure automáticamente.
* Perder la versión local.

---

# Actualización Azure DevOps

Cuando se apruebe una modificación:

## HU enriquecida

Actualizar:

* Descripción
* Acceptance Criteria
* Tags QA

---

## Plan de pruebas

Agregar:

* Comentario
* Metadata QA

---

## Casos de prueba

Agregar:

* Comentario
* Metadata QA

---

## Automatización

Agregar:

* Comentario
* Metadata QA

---

# Metadata QA

El sistema debe abstraer diferencias entre plataformas.

## Jira

labels

---

## Azure DevOps

tags

---

## Planner

categories

---

# Interfaz unificada

Los agentes deben utilizar:

```text
add_qa_metadata()
```

El connection-service resolverá la implementación correcta.

---

# Metadata soportada

* QA Enriched
* Test Plan Generated
* Test Cases Generated
* Automation Ready
* Ready For QA
* Reviewed
* Approved

---

# Persistencia

Toda actualización debe reflejarse también en:

```text
summary.json
```

---

# Logging obligatorio

Registrar:

* proveedor
* proyecto
* operación
* story_id
* work_item_id
* timestamp
* resultado
* errores

---

# Manejo de errores

Si una integración falla:

1. Explicar el error.
2. Explicar la posible causa.
3. Proponer solución.
4. Mantener contexto activo.

---

# Restricciones

NUNCA:

* Eliminar Work Items.
* Sobrescribir información sin aprobación.
* Modificar estados críticos automáticamente.
* Actualizar producción.

---

# Resultado esperado

Permitir que todos los agentes:

* Trabajen igual independientemente del modelo IA.
* Mantengan trazabilidad.
* Sincronicen artefactos.
* Soporten múltiples proveedores.
* Mantengan seguridad.
* Mantengan arquitectura desacoplada.
* Utilicen Azure DevOps, Jira, Planner o Trello de forma transparente.
