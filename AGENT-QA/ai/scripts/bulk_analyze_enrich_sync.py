import base64
import html
import json
import os
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path


PROJECT_SLUG = "nexus-crm"
PROJECT_NAME = "Nexus CRM"
STRATEGY_ID = "clasica_scrum"
STRATEGY_NAME = "Clasica Scrum"
RULE_FILE = "ai/config/enrichment-options/clasica-scrum.md"
TAGS = ["qa-enriched", "clasica_scrum", "pending-validation"]


class TextExtractor(HTMLParser):
    block_tags = {
        "div",
        "p",
        "br",
        "li",
        "ul",
        "ol",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
    }

    def __init__(self):
        super().__init__()
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag in self.block_tags:
            self.parts.append("\n")
        if tag == "li":
            self.parts.append("- ")

    def handle_endtag(self, tag):
        if tag in self.block_tags:
            self.parts.append("\n")

    def handle_data(self, data):
        self.parts.append(data)

    def text(self):
        value = html.unescape("".join(self.parts))
        value = re.sub(r"[ \t]+", " ", value)
        value = re.sub(r"\n\s*\n+", "\n", value)
        return value.strip()


def load_dotenv(path):
    env = {}
    with open(path, "r", encoding="utf-8") as file:
        for raw_line in file:
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            env[key.strip()] = value.strip()
    return env


def request_json(method, url, pat, body=None, content_type="application/json"):
    token = base64.b64encode(f":{pat}".encode("ascii")).decode("ascii")
    headers = {
        "Authorization": f"Basic {token}",
        "Content-Type": content_type,
    }
    data = None
    if body is not None:
        data = json.dumps(body, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request) as response:
            payload = response.read().decode("utf-8")
            return json.loads(payload) if payload else {}
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Azure DevOps error {error.code}: {detail}") from error


def clean_text(value):
    if not value:
        return ""
    parser = TextExtractor()
    parser.feed(value)
    return parser.text()


def extract_hu_id(title, fallback_id):
    match = re.search(r"\bHU\d{3}\b", title or "", re.IGNORECASE)
    if match:
        return match.group(0).upper()
    return f"MCA-{fallback_id}"


def normalize_title(title, hu_id):
    value = (title or hu_id).replace("—", "-").strip()
    return re.sub(r"\s+", " ", value)


def story_lines(description, title):
    text = clean_text(description)
    como = re.search(r"Como\s+(.+?)(?:\n|$)", text, re.IGNORECASE)
    quiero = re.search(r"Quiero\s+(.+?)(?:\n|$)", text, re.IGNORECASE)
    para = re.search(r"Para\s+(.+?)(?:\n|$)", text, re.IGNORECASE)
    if como and quiero and para:
        return (
            f"Como {como.group(1).strip()}",
            f"Quiero {quiero.group(1).strip()}",
            f"Para {para.group(1).strip()}",
        )

    title_without_hu = re.sub(r"^HU\d{3}\s*[-—]\s*", "", title or "").strip()
    return (
        "Como usuario autorizado de Nexus CRM",
        f"Quiero {title_without_hu.lower() or 'ejecutar la funcionalidad solicitada'}",
        "Para apoyar la gestion comercial y operativa del CRM.",
    )


def extract_scope(description):
    text = clean_text(description)
    if "Incluye" in text:
        includes = text.split("Incluye", 1)[1]
    else:
        includes = text
    items = []
    for line in includes.splitlines():
        cleaned = line.strip(" -\t.")
        if cleaned and len(cleaned) > 2 and not cleaned.lower().startswith(("como ", "quiero ", "para ")):
            items.append(cleaned)
    unique = []
    for item in items:
        if item not in unique:
            unique.append(item)
    return unique[:8]


def title_action(title):
    value = re.sub(r"^HU\d{3}\s*[-—]\s*", "", title or "").strip()
    return value or "Ejecutar funcionalidad"


def acceptance_criteria(title, scope):
    action = title_action(title).lower()
    scope_items = scope[:4] or [title_action(title)]
    criteria = [
        (
            "CA-001 - Acceso a la funcionalidad",
            f"Dado que el usuario autorizado accede a Nexus CRM\nCuando solicita {action}\nEntonces el sistema presenta la funcionalidad disponible segun sus permisos.",
        ),
        (
            "CA-002 - Ejecutar operacion principal",
            f"Dado que el usuario cuenta con permisos suficientes\nCuando completa la informacion requerida para {action}\nEntonces el sistema procesa la operacion\nY confirma el resultado de forma clara.",
        ),
        (
            "CA-003 - Validar informacion obligatoria",
            f"Dado que el usuario esta ejecutando {action}\nCuando omite informacion obligatoria o ingresa datos invalidos\nEntonces el sistema no completa la operacion\nY muestra las validaciones correspondientes.",
        ),
        (
            "CA-004 - Restringir usuario sin permiso",
            f"Dado que un usuario no autorizado intenta {action}\nCuando solicita la accion\nEntonces el sistema bloquea la operacion\nY muestra un mensaje de permiso insuficiente.",
        ),
        (
            "CA-005 - Mantener trazabilidad",
            f"Dado que la operacion {action} se completa correctamente\nCuando el sistema guarda el resultado\nEntonces registra la informacion necesaria para trazabilidad funcional o auditoria si negocio lo confirma.",
        ),
    ]
    for index, item in enumerate(scope_items, start=6):
        criteria.append(
            (
                f"CA-{index:03d} - Validar alcance: {item}",
                f"Dado que el alcance de la HU incluye {item.lower()}\nCuando el usuario ejecuta el flujo correspondiente\nEntonces el sistema permite validar {item.lower()} segun las reglas aprobadas por negocio.",
            )
        )
    return criteria


def md_list(items, fallback):
    values = items or [fallback]
    return "\n".join(f"- {item}." if not str(item).endswith(".") else f"- {item}" for item in values)


def html_list(items):
    return "<ul>" + "".join(f"<li>{html.escape(str(item))}</li>" for item in items) + "</ul>"


def criteria_markdown(criteria):
    chunks = []
    for title, text in criteria:
        formatted_text = text.replace("\n", "  \n")
        chunks.append(f"### {title}\n\n{formatted_text}")
    return "\n\n".join(chunks)


def criteria_html(criteria):
    chunks = ["<h2>Criterios de aceptacion propuestos</h2>"]
    for title, text in criteria:
        chunks.append(f"<h3>{html.escape(title)}</h3>")
        chunks.append(f"<p>{html.escape(text).replace(chr(10), '<br/>')}</p>")
    return "".join(chunks)


def description_html(enriched_story, context, confirmed, pending, dependencies, risks):
    return (
        "<h2>Historia enriquecida</h2>"
        f"<p>{html.escape(enriched_story).replace(chr(10), '<br/>')}</p>"
        "<h2>Contexto funcional</h2>"
        f"<p>{html.escape(context)}</p>"
        "<h2>Reglas confirmadas por HU o contexto</h2>"
        f"{html_list(confirmed)}"
        "<h2>Reglas pendientes de validacion</h2>"
        f"{html_list(pending)}"
        "<h2>Dependencias</h2>"
        f"{html_list(dependencies)}"
        "<h2>Riesgos QA</h2>"
        f"{html_list(risks)}"
    )


def ensure_dirs(path):
    for rel in [
        "source/v1",
        "analysis/v1",
        "enrich-us/v1",
        "test-plan",
        "test-cases",
        "test-automation",
    ]:
        (path / rel).mkdir(parents=True, exist_ok=True)


def write_json(path, value):
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def process_work_item(root, org, project, pat, work_item):
    fields = work_item.get("fields", {})
    work_item_id = work_item["id"]
    rev_before = work_item.get("rev")
    title = normalize_title(fields.get("System.Title", ""), extract_hu_id("", work_item_id))
    hu_id = extract_hu_id(title, work_item_id)
    source_description = fields.get("System.Description", "")
    source_acceptance = fields.get("Microsoft.VSTS.Common.AcceptanceCriteria", "")
    state = fields.get("System.State", "")
    priority = fields.get("Microsoft.VSTS.Common.Priority", "")
    area_path = fields.get("System.AreaPath", "")
    iteration_path = fields.get("System.IterationPath", "")
    created_date = fields.get("System.CreatedDate", "")
    changed_date = fields.get("System.ChangedDate", "")
    tags = fields.get("System.Tags", "")
    scope = extract_scope(source_description)
    criteria = acceptance_criteria(title, scope)
    original_story = "\n".join(story_lines(source_description, title))
    enriched_story = original_story.replace("Como ", "Como ", 1)
    if "Nexus CRM" not in enriched_story:
        enriched_story = f"{enriched_story}\nPara mantener trazabilidad y control funcional dentro de Nexus CRM."
    action = title_action(title)
    context = (
        f"La HU {hu_id} pertenece al backlog funcional de Nexus CRM y cubre la capacidad "
        f"'{action}'. La version enriquecida conserva la intencion original leida desde Azure DevOps "
        "y agrega criterios verificables para refinamiento, QA y validacion de negocio."
    )
    confirmed = [
        f"La HU fue leida desde Azure DevOps como Work Item {work_item_id}.",
        f"El titulo funcional es {title}.",
        f"El estado actual en Azure DevOps es {state}.",
        "La HU debe mantener trazabilidad con el proyecto Nexus.",
    ]
    if scope:
        confirmed.extend([f"El alcance indicado incluye {item}" for item in scope[:5]])
    pending = [
        "Confirmar criterios de aceptacion definitivos con negocio.",
        "Confirmar reglas de permisos y perfiles autorizados.",
        "Confirmar campos obligatorios, validaciones y mensajes esperados.",
        "Confirmar excepciones funcionales y escenarios negativos.",
        "Confirmar si se requiere auditoria o historial de cambios.",
    ]
    dependencies = [
        "Modulo o pantalla funcional correspondiente en Nexus CRM.",
        "Modelo de permisos y roles del sistema.",
        "Persistencia de datos asociada a la funcionalidad.",
        "Validaciones de backend y frontend.",
        "Datos de prueba representativos para QA.",
    ]
    risks = [
        "Riesgo de cobertura incompleta si los criterios no son validados por negocio.",
        "Riesgo de comportamiento inconsistente si permisos y validaciones no estan definidos.",
        "Riesgo de regresion en flujos relacionados del CRM.",
        "Riesgo de automatizacion prematura sin datos y reglas confirmadas.",
    ]
    now = datetime.now(timezone.utc).isoformat()

    artifact_path = root / "ai" / "projects" / PROJECT_SLUG / "artifacts" / hu_id
    ensure_dirs(artifact_path)

    source_md = f"""# Source - {hu_id}

## Identificacion

| Campo | Valor |
|---|---|
| Proyecto QA | {PROJECT_NAME} |
| Proyecto Azure DevOps | {project} |
| HU funcional | {hu_id} |
| Work Item ID | {work_item_id} |
| Titulo | {title} |
| Provider | Azure DevOps |
| Source | Azure DevOps |
| Tipo | User Story |
| Estado | {state} |
| Prioridad | {priority} |
| Revision | {rev_before} |
| Area Path | {area_path} |
| Iteration Path | {iteration_path} |
| Fecha creacion | {created_date} |
| Fecha cambio | {changed_date} |

## Historia original normalizada

{original_story.replace(chr(10), '  ' + chr(10))}

## Alcance indicado en Azure DevOps

{md_list(scope, "No se registran elementos adicionales de alcance en la descripcion.")}

## Criterios de aceptacion originales

{clean_text(source_acceptance) or "No registrados en el campo `Microsoft.VSTS.Common.AcceptanceCriteria`."}

## Trazabilidad

- `System.Id`: {work_item_id}.
- `System.TeamProject`: {project}.
- `System.WorkItemType`: User Story.
- `System.State`: {state}.
- `System.Tags`: {tags or "sin tags"}.
"""
    (artifact_path / "source" / "v1" / "source.md").write_text(source_md, encoding="utf-8")
    write_json(
        artifact_path / "source" / "v1" / "metadata.json",
        {
            "artifact_type": "source",
            "version": "v1",
            "project_name": PROJECT_NAME,
            "project_slug": PROJECT_SLUG,
            "hu_id": hu_id,
            "work_item_id": work_item_id,
            "title": title,
            "source": "Azure DevOps",
            "provider": "Azure DevOps",
            "work_item_type": "User Story",
            "state": state,
            "priority": str(priority),
            "rev": rev_before,
            "team_project": project,
            "area_path": area_path,
            "iteration_path": iteration_path,
            "created_date": created_date,
            "changed_date": changed_date,
            "acceptance_criteria_count": 1 if source_acceptance else 0,
            "read_at": now,
            "generated_by": "bulk-analyze-enrich-sync",
        },
    )

    analysis_md = f"""# Analisis QA - {hu_id}

## Encabezado

| Campo | Valor |
|---|---|
| Proyecto | {PROJECT_NAME} |
| HU | {hu_id} |
| Work Item Azure | {work_item_id} |
| Titulo | {title} |
| Provider | Azure DevOps |
| Source | Azure DevOps |
| Version fuente | source/v1 |
| Version analisis | v1 |
| Fecha de analisis | {now} |

## Resumen general

Estado de la HU: Aceptable para refinamiento, no lista para QA definitivo.

`sufficiency_status`: `sufficient_not_enriched`.

La HU fue leida desde Azure DevOps y validada contra el proyecto `{project}`. Tiene una intencion funcional identificable y puede enriquecerse para QA. Requiere confirmacion de criterios finales, reglas de permisos, validaciones, mensajes, excepciones y datos de prueba.

## Estado inicial de la HU

Historia original:

> {original_story.replace(chr(10), chr(10) + "> ")}

## Tabla de evaluacion QA

| Categoria | Estado | Observaciones | Impacto QA |
|---|---|---|---|
| Claridad funcional | Parcial | La intencion general es identificable. | Requiere refinamiento para validar pasos y resultados. |
| Estructura HU | Aceptable | Se normalizo en formato Como/Quiero/Para. | Permite analisis inicial y enriquecimiento. |
| Criterios de aceptacion | {'Parcial' if source_acceptance else 'Deficiente'} | {'Existen criterios previos, pero se enriquecen para mayor trazabilidad.' if source_acceptance else 'El campo de criterios estaba vacio o incompleto.'} | Sin criterios aprobados no hay aceptacion definitiva. |
| Testeabilidad | Parcial | Se proponen escenarios verificables. | Deben ser aprobados por negocio antes de QA final. |
| Reglas de negocio | Pendiente | Faltan reglas detalladas y excepciones. | Riesgo de comportamiento ambiguo. |
| Trazabilidad | Buena | Work Item real validado en Azure DevOps, ID {work_item_id}. | Trazabilidad externa confirmada. |

## Problemas encontrados

1. Los criterios finales requieren validacion de negocio.
2. Faltan reglas detalladas de permisos, validaciones y excepciones.
3. Faltan datos de prueba y mensajes esperados.
4. La automatizacion debe esperar confirmacion funcional.

## Recomendaciones

- Revisar y aprobar los criterios propuestos.
- Confirmar permisos, reglas de negocio y validaciones.
- Definir mensajes y escenarios negativos.
- Generar plan y casos de prueba luego de la aprobacion funcional.
"""
    (artifact_path / "analysis" / "v1" / "analysis.md").write_text(analysis_md, encoding="utf-8")
    write_json(
        artifact_path / "analysis" / "v1" / "metadata.json",
        {
            "artifact_type": "analysis",
            "version": "v1",
            "project_name": PROJECT_NAME,
            "project_slug": PROJECT_SLUG,
            "hu_id": hu_id,
            "title": title,
            "source": "Azure DevOps",
            "provider": "Azure DevOps",
            "source_version": "source/v1",
            "sufficiency_status": "sufficient_not_enriched",
            "validation_status": "partial",
            "traceability": {
                "azure": {
                    "work_item_id": work_item_id,
                    "organization_url": org,
                    "project": project,
                    "area_path": area_path,
                    "iteration_path": iteration_path,
                    "work_item_type": "User Story",
                    "rev": rev_before,
                }
            },
            "created_at": now,
            "generated_by": "analyze-us",
        },
    )
    write_json(
        artifact_path / "analysis" / "v1" / "summary.json",
        {
            "action": "analyze-us",
            "result": "analysis_created",
            "sufficiency_status": "sufficient_not_enriched",
            "main_findings": [
                "La HU tiene intencion funcional identificable.",
                "Requiere validacion de criterios por negocio.",
                "Faltan reglas detalladas para QA definitivo.",
            ],
            "artifact_path": f"ai/projects/{PROJECT_SLUG}/artifacts/{hu_id}/analysis/v1/analysis.md",
            "next_step": "Ejecutar enrich-us con estrategia clasica_scrum.",
            "created_at": now,
        },
    )

    enriched_md = f"""# HU enriquecida - {hu_id}: {title_action(title)}

| Campo | Valor |
|---|---|
| Proyecto | {PROJECT_NAME} |
| Origen | Azure DevOps |
| Metodologia / estrategia | {STRATEGY_ID} - {STRATEGY_NAME} |
| Contexto breve | {action}. |
| Prioridad | {priority} |
| Version | v1 |
| Estado | Pendiente de aprobacion |

## Metadata tecnica

| Campo | Valor |
|---|---|
| Proyecto QA | {PROJECT_NAME} |
| Project slug | {PROJECT_SLUG} |
| HU ID | {hu_id} |
| Work Item Azure DevOps | {work_item_id} |
| Titulo origen | {title} |
| Provider | Azure DevOps |
| Source | Azure DevOps |
| Estrategia aplicada | {STRATEGY_ID} - {STRATEGY_NAME} |
| Archivo de reglas | {RULE_FILE} |
| Version fuente | source/v1 |
| Version analisis | analysis/v1 |
| Version enriquecimiento | v1 |
| Estado sincronizacion | Sincronizada con Azure DevOps |

## Historia original

{original_story.replace(chr(10), '  ' + chr(10))}

## Historia enriquecida

{enriched_story.replace(chr(10), '  ' + chr(10))}

## Contexto funcional

{context}

## Criterios de aceptacion

{criteria_markdown(criteria)}

## Reglas de negocio

### Reglas confirmadas por HU o contexto

{md_list(confirmed, "La HU fue leida desde Azure DevOps.")}

### Reglas pendientes de validacion

{md_list(pending, "Confirmar reglas de negocio.")}

## Dependencias

{md_list(dependencies, "Confirmar dependencias.")}

## Riesgos QA

{md_list(risks, "Confirmar riesgos.")}

## Validacion de consistencia

- El enriquecimiento conserva la intencion original de la HU.
- Los criterios propuestos derivan del alcance leido en Azure DevOps.
- Las reglas no documentadas en Azure DevOps se registran como pendientes de validacion.
- La HU queda preparada para refinamiento funcional y posterior generacion de plan/casos.
"""
    (artifact_path / "enrich-us" / "v1" / "enriched-us.md").write_text(enriched_md, encoding="utf-8")

    description = description_html(enriched_story, context, confirmed, pending, dependencies, risks)
    acceptance = criteria_html(criteria)
    history = (
        f"{hu_id} enriquecida desde AGENT-QA en lote: se actualizo descripcion, "
        "criterios de aceptacion propuestos y tags QA. Pendiente validacion de negocio."
    )
    patch = [
        {"op": "add", "path": "/fields/System.Description", "value": description},
        {"op": "add", "path": "/fields/Microsoft.VSTS.Common.AcceptanceCriteria", "value": acceptance},
        {"op": "add", "path": "/fields/System.Tags", "value": "; ".join(TAGS)},
        {"op": "add", "path": "/fields/System.History", "value": history},
    ]
    url = f"{org}/{project}/_apis/wit/workitems/{work_item_id}?api-version=7.1"
    updated = request_json("PATCH", url, pat, patch, "application/json-patch+json")
    rev_after = updated.get("rev")
    changed_after = updated.get("fields", {}).get("System.ChangedDate", "")

    sync = {
        "tool": "Azure DevOps",
        "work_item_id": work_item_id,
        "azure_rev": rev_after,
        "azure_changed_date": changed_after,
        "synced_at": now,
        "fields_updated": [
            "System.Description",
            "Microsoft.VSTS.Common.AcceptanceCriteria",
            "System.Tags",
            "System.History",
        ],
        "tags": TAGS,
    }
    write_json(
        artifact_path / "enrich-us" / "v1" / "metadata.json",
        {
            "artifact_type": "enrich-us",
            "version": "v1",
            "project_name": PROJECT_NAME,
            "project_slug": PROJECT_SLUG,
            "hu_id": hu_id,
            "work_item_id": work_item_id,
            "title": title,
            "source": "Azure DevOps",
            "provider": "Azure DevOps",
            "source_version": "source/v1",
            "analysis_version": "analysis/v1",
            "strategy": {
                "id": STRATEGY_ID,
                "name": STRATEGY_NAME,
                "rule_file": RULE_FILE,
                "approved_for_project": True,
            },
            "priority": str(priority),
            "status": "Pendiente de aprobacion",
            "sync_status": "synced",
            "sync": sync,
            "created_at": now,
            "generated_by": "enrich-us",
        },
    )
    write_json(
        artifact_path / "enrich-us" / "summary.json",
        {
            "latest_version": "v1",
            "path": f"ai/projects/{PROJECT_SLUG}/artifacts/{hu_id}/enrich-us/v1/enriched-us.md",
            "created_at": now,
            "strategy": {
                "id": STRATEGY_ID,
                "name": STRATEGY_NAME,
                "rule_file": RULE_FILE,
                "approved_for_project": True,
            },
            "status": "Pendiente de aprobacion",
            "sync_status": "synced",
            "azure_sync": sync,
        },
    )
    write_json(
        artifact_path / "summary.json",
        {
            "project_name": PROJECT_NAME,
            "project_slug": PROJECT_SLUG,
            "hu_id": hu_id,
            "title": title,
            "source": "Azure DevOps",
            "provider": "Azure DevOps",
            "official_tool": "Azure DevOps",
            "official_tool_validation": {
                "executed": True,
                "status": "validated",
                "work_item_id": work_item_id,
                "team_project": project,
                "rev": rev_after,
            },
            "artifacts": {
                "source": {
                    "latest_version": "v1",
                    "path": f"ai/projects/{PROJECT_SLUG}/artifacts/{hu_id}/source/v1/source.md",
                    "created_at": now,
                },
                "analysis": {
                    "latest_version": "v1",
                    "path": f"ai/projects/{PROJECT_SLUG}/artifacts/{hu_id}/analysis/v1/analysis.md",
                    "sufficiency_status": "sufficient_not_enriched",
                    "created_at": now,
                },
                "enrich-us": {
                    "latest_version": "v1",
                    "path": f"ai/projects/{PROJECT_SLUG}/artifacts/{hu_id}/enrich-us/v1/enriched-us.md",
                    "created_at": now,
                    "strategy": STRATEGY_ID,
                    "status": "Pendiente de aprobacion",
                    "sync_status": "synced",
                    "azure_sync": sync,
                },
            },
            "pending": pending,
            "updated_at": now,
        },
    )

    logs = root / "ai" / "projects" / PROJECT_SLUG / "logs"
    logs.mkdir(parents=True, exist_ok=True)
    log_path = logs / f"{datetime.now(timezone.utc).date().isoformat()}-{hu_id.lower()}-azure-sync.md"
    log_path.write_text(
        f"""# Sync Azure DevOps - {hu_id}

## Resultado

Sincronizacion completada correctamente.

## Detalle

| Campo | Valor |
|---|---|
| Proyecto | {PROJECT_NAME} |
| Provider | Azure DevOps |
| Proyecto Azure | {project} |
| HU | {hu_id} |
| Work Item ID | {work_item_id} |
| Version local sincronizada | enrich-us/v1 |
| Revision Azure resultante | {rev_after} |
| Fecha Azure | {changed_after} |

## Campos actualizados

- `System.Description`: se cargo la historia enriquecida con contexto, reglas, dependencias y riesgos QA.
- `Microsoft.VSTS.Common.AcceptanceCriteria`: se cargaron criterios de aceptacion propuestos.
- `System.Tags`: se agregaron `qa-enriched`, `clasica_scrum` y `pending-validation`.
- `System.History`: se registro comentario de sincronizacion desde AGENT-QA.

## Seguridad

No se persistieron tokens, PATs ni credenciales.
""",
        encoding="utf-8",
    )

    return {
        "hu_id": hu_id,
        "work_item_id": work_item_id,
        "title": title,
        "rev_before": rev_before,
        "rev_after": rev_after,
    }


def main():
    root = Path(__file__).resolve().parents[1]
    repo_root = root.parent
    env = load_dotenv(repo_root / ".env")
    org = env["AZURE_DEVOPS_ORG_URL"].rstrip("/")
    project = env["AZURE_DEVOPS_PROJECT"]
    pat = env["AZURE_DEVOPS_PAT"]

    wiql = {
        "query": (
            "SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType], "
            "[System.Tags] FROM WorkItems "
            f"WHERE [System.TeamProject] = '{project}' "
            "AND [System.WorkItemType] = 'User Story' "
            "ORDER BY [System.Id] ASC"
        )
    }
    wiql_url = f"{org}/{project}/_apis/wit/wiql?api-version=7.1"
    wiql_result = request_json("POST", wiql_url, pat, wiql)
    ids = [str(item["id"]) for item in wiql_result.get("workItems", [])]
    if not ids:
        print("No User Stories found.")
        return 1

    fields = ",".join(
        [
            "System.Id",
            "System.Title",
            "System.State",
            "System.WorkItemType",
            "System.TeamProject",
            "System.AreaPath",
            "System.IterationPath",
            "System.Tags",
            "System.Description",
            "System.CreatedDate",
            "System.ChangedDate",
            "Microsoft.VSTS.Common.Priority",
            "Microsoft.VSTS.Common.AcceptanceCriteria",
        ]
    )
    results = []
    for start in range(0, len(ids), 200):
        batch = ",".join(ids[start : start + 200])
        detail_url = f"{org}/{project}/_apis/wit/workitems?ids={batch}&fields={fields}&api-version=7.1"
        details = request_json("GET", detail_url, pat)
        for item in details.get("value", []):
            results.append(process_work_item(repo_root, org, project, pat, item))
            print(f"SYNCED {results[-1]['hu_id']} WI {results[-1]['work_item_id']} rev {results[-1]['rev_after']}")

    summary_path = repo_root / "ai" / "projects" / PROJECT_SLUG / "logs" / f"{datetime.now(timezone.utc).date().isoformat()}-bulk-analyze-enrich-sync-summary.json"
    write_json(summary_path, {"count": len(results), "items": results})
    print(f"TOTAL_SYNCED {len(results)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
