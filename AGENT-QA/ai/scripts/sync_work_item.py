import os
import json
import requests
from dotenv import load_dotenv
from base64 import b64encode
from datetime import datetime


def load_connection_config():
    """
    Carga la configuración de Azure DevOps desde:
    ai/projects/nexus-crm/business-context/tool-connection.json
    """

    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    config_path = os.path.join(
        base_path,
        "projects",
        "nexus-crm",
        "business-context",
        "tool-connection.json"
    )

    if not os.path.exists(config_path):
        raise FileNotFoundError(
            f"No se encontró el archivo de configuración: {config_path}"
        )

    with open(config_path, "r", encoding="utf-8") as file:
        return json.load(file)


def get_project_artifact_path(project_slug, story_id):
    """
    Retorna la ruta oficial de artifacts para la HU.
    """

    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    return os.path.join(
        base_path,
        "projects",
        project_slug,
        "artifacts",
        story_id
    )


def create_structure(project_slug, story_id):
    """
    Crea la estructura mínima requerida.
    """

    artifact_path = get_project_artifact_path(
        project_slug,
        story_id
    )

    directories = [
        "source",
        "enrich-us",
        "test-plan",
        "test-cases",
        "test-automation",
        "logs"
    ]

    for directory in directories:
        os.makedirs(
            os.path.join(
                artifact_path,
                directory
            ),
            exist_ok=True
        )

    return artifact_path


def build_metadata(
    work_item_id,
    story_id,
    story_name,
    project_slug
):
    return {
        "provider": "azure-devops",
        "project": project_slug,
        "work_item_id": str(work_item_id),
        "story_id": story_id,
        "story_name": story_name,
        "sync_date": datetime.now().isoformat(),
        "source": "azure-devops"
    }


def create_summary(
    artifact_path,
    work_item_id,
    story_id,
    story_name
):
    summary_path = os.path.join(
        artifact_path,
        "summary.json"
    )

    if os.path.exists(summary_path):
        return

    summary = {
        "story_id": story_id,
        "story_name": story_name,
        "azure_work_item_id": str(work_item_id),
        "created_at": datetime.now().isoformat(),
        "last_update": datetime.now().isoformat(),
        "artifacts": []
    }

    with open(
        summary_path,
        "w",
        encoding="utf-8"
    ) as file:
        json.dump(
            summary,
            file,
            indent=4,
            ensure_ascii=False
        )


def clean_html(content):
    """
    Limpieza básica de HTML proveniente de Azure DevOps.
    """

    if not content:
        return ""

    replacements = {
        "<div>": "\n",
        "</div>": "",
        "<p>": "",
        "</p>": "\n",
        "<br>": "\n",
        "<br/>": "\n",
        "<br />": "\n",
        "&nbsp;": " "
    }

    for old, new in replacements.items():
        content = content.replace(old, new)

    return content.strip()


def sync_work_item(work_item_id):
    load_dotenv()

    config = load_connection_config()

    project_slug = "nexus-crm"

    org_url = os.getenv("AZURE_DEVOPS_ORG_URL")
    project = os.getenv("AZURE_DEVOPS_PROJECT")
    pat = os.getenv("AZURE_DEVOPS_PAT")

    if not org_url:
        raise Exception(
            "AZURE_DEVOPS_ORG_URL no configurado."
        )

    if not project:
        raise Exception(
            "AZURE_DEVOPS_PROJECT no configurado."
        )

    if not pat:
        raise Exception(
            "AZURE_DEVOPS_PAT no configurado."
        )

    auth = b64encode(
        f":{pat}".encode()
    ).decode()

    headers = {
        "Authorization": f"Basic {auth}",
        "Content-Type": "application/json"
    }

    url = (
        f"{org_url}/{project}"
        f"/_apis/wit/workitems/{work_item_id}"
        f"?$expand=all&api-version=7.1"
    )

    response = requests.get(
        url,
        headers=headers
    )

    if response.status_code != 200:
        raise Exception(
            f"Error Azure DevOps: "
            f"{response.status_code} - {response.text}"
        )

    data = response.json()

    fields = data.get("fields", {})

    story_name = fields.get(
        "System.Title",
        f"WorkItem-{work_item_id}"
    )

    story_id = fields.get(
        "Custom.StoryId",
        f"MCA-{work_item_id}"
    )

    description = clean_html(
        fields.get(
            "System.Description",
            ""
        )
    )

    acceptance_criteria = clean_html(
        fields.get(
            "Microsoft.VSTS.Common.AcceptanceCriteria",
            ""
        )
    )

    state = fields.get(
        "System.State",
        ""
    )

    tags = fields.get(
        "System.Tags",
        ""
    )

    artifact_path = create_structure(
        project_slug,
        story_id
    )

    source_path = os.path.join(
        artifact_path,
        "source",
        "work-item.md"
    )

    metadata_path = os.path.join(
        artifact_path,
        "source",
        "metadata.json"
    )

    content = f"""# {story_id} - {story_name}

## Azure Work Item

{work_item_id}

## Estado

{state}

## Tags

{tags}

## Descripción

{description}

## Criterios de Aceptación

{acceptance_criteria}
"""

    with open(
        source_path,
        "w",
        encoding="utf-8"
    ) as file:
        file.write(content)

    metadata = build_metadata(
        work_item_id,
        story_id,
        story_name,
        project_slug
    )

    with open(
        metadata_path,
        "w",
        encoding="utf-8"
    ) as file:
        json.dump(
            metadata,
            file,
            indent=4,
            ensure_ascii=False
        )

    create_summary(
        artifact_path,
        work_item_id,
        story_id,
        story_name
    )

    print("")
    print("===================================")
    print("SINCRONIZACIÓN EXITOSA")
    print("===================================")
    print(f"Proyecto      : {project_slug}")
    print(f"Work Item     : {work_item_id}")
    print(f"Story ID      : {story_id}")
    print(f"Story Name    : {story_name}")
    print(f"Artifact Path : {artifact_path}")
    print("===================================")


if __name__ == "__main__":

    work_item_id = input(
        "Ingrese el Work Item ID: "
    ).strip()

    sync_work_item(work_item_id)