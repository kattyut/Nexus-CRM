import { expect, test } from '@playwright/test';
import { NexusApiClient } from '../clients/nexus-api.client';

const runApi = process.env.RUN_API === 'true' && !!process.env.API_BASE_URL;
const successStatuses = [200, 201, 202, 204];

function unique(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function tryGetId(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return undefined;
  }

  const record = payload as Record<string, unknown>;
  const id = record.id ?? record.Id ?? record.ID;
  return typeof id === 'string' ? id : undefined;
}

function getId(payload: unknown): string {
  expect(payload, 'created payload must exist').toBeTruthy();
  expect(typeof payload, 'created payload type').toBe('object');

  const id = tryGetId(payload);
  expect(typeof id, 'created payload must expose id').toBe('string');
  return id!;
}

async function createEntity(api: NexusApiClient, path: string, body: Record<string, unknown>) {
  const result = await api.post(path, body);
  await api.expectJsonResponse(result, successStatuses);

  const createdPayload = await api.parseOptionalJson(result.response);
  const createdId = tryGetId(createdPayload);
  if (createdId) {
    return createdId;
  }

  const list = await api.get(path);
  await api.expectJsonResponse(list, successStatuses);
  const listPayload = await api.parseJson(list.response);
  expect(Array.isArray(listPayload), `${path} list must be available to find created id`).toBeTruthy();

  const lookupKeys = Object.keys(body).filter((key) => ['name', 'code', 'description', 'firstName'].includes(key));
  const createdRecord = (listPayload as Record<string, unknown>[]).find((item) =>
    lookupKeys.every((key) => item[key] === body[key])
  );

  return getId(createdRecord);
}

async function deleteIfCreated(api: NexusApiClient, path: string, id?: string) {
  if (!id) {
    return;
  }

  const result = await api.delete(`${path}/${id}`);
  await api.expectStatusResponse(result, [...successStatuses, 404]);
}

test.describe('Nexus API - CRUD desde OpenAPI Swagger', () => {
  test.beforeEach(() => {
    test.skip(!runApi, 'Definir RUN_API=true y API_BASE_URL=https://localhost:7167 para ejecutar contra el backend real.');
  });

  test('SWG-CRUD-001 | Countries - crear, actualizar y eliminar', async ({ request }) => {
    const api = new NexusApiClient(request);
    const createdId = await createEntity(api, '/Countries', { name: unique('Country') });

    const update = await api.put(`/Countries/${createdId}`, { name: unique('Country Updated') });
    await api.expectStatusResponse(update, successStatuses);

    await deleteIfCreated(api, '/Countries', createdId);
  });

  test('SWG-CRUD-002 | Cities - crear, actualizar y eliminar', async ({ request }) => {
    const api = new NexusApiClient(request);
    let countryId: string | undefined;
    let cityId: string | undefined;

    try {
      countryId = await createEntity(api, '/Countries', { name: unique('Country City') });
      cityId = await createEntity(api, '/Cities', { name: unique('City'), countryId });

      const update = await api.put(`/Cities/${cityId}`, { name: unique('City Updated'), countryId });
      await api.expectStatusResponse(update, successStatuses);
    } finally {
      await deleteIfCreated(api, '/Cities', cityId);
      await deleteIfCreated(api, '/Countries', countryId);
    }
  });

  test('SWG-CRUD-003 | Company sectors - crear, actualizar y eliminar', async ({ request }) => {
    const api = new NexusApiClient(request);
    const createdId = await createEntity(api, '/company-sectors', { name: unique('Sector') });

    const update = await api.put('/company-sectors', { id: createdId, name: unique('Sector Updated') });
    await api.expectStatusResponse(update, successStatuses);

    await deleteIfCreated(api, '/company-sectors', createdId);
  });

  test('SWG-CRUD-004 | Company statuses - crear, actualizar y eliminar', async ({ request }) => {
    const api = new NexusApiClient(request);
    const createdId = await createEntity(api, '/company-statuses', { name: unique('Status') });

    const update = await api.put('/company-statuses', { id: createdId, name: unique('Status Updated') });
    await api.expectStatusResponse(update, successStatuses);

    await deleteIfCreated(api, '/company-statuses', createdId);
  });

  test('SWG-CRUD-005 | Activity levels - crear, actualizar y eliminar', async ({ request }) => {
    const api = new NexusApiClient(request);
    const createdId = await createEntity(api, '/activity-levels', {
      code: unique('LEVEL'),
      description: 'Created by Swagger CRUD automation'
    });

    const update = await api.put('/activity-levels', {
      id: createdId,
      code: unique('LEVEL-UPD'),
      description: 'Updated by Swagger CRUD automation'
    });
    await api.expectStatusResponse(update, successStatuses);

    await deleteIfCreated(api, '/activity-levels', createdId);
  });

  test('SWG-CRUD-006 | Contact sources - crear, actualizar y eliminar', async ({ request }) => {
    const api = new NexusApiClient(request);
    const createdId = await createEntity(api, '/contact-sources', { name: unique('Source') });

    const update = await api.put('/contact-sources', { id: createdId, name: unique('Source Updated') });
    await api.expectStatusResponse(update, successStatuses);

    await deleteIfCreated(api, '/contact-sources', createdId);
  });

  test('SWG-CRUD-007 | Activity types - crear, actualizar y eliminar', async ({ request }) => {
    const api = new NexusApiClient(request);
    const createdId = await createEntity(api, '/activity-types', {
      name: unique('Activity Type'),
      description: 'Created by Swagger CRUD automation'
    });

    const update = await api.put('/activity-types', {
      id: createdId,
      name: unique('Activity Type Updated'),
      description: 'Updated by Swagger CRUD automation'
    });
    await api.expectStatusResponse(update, successStatuses);

    await deleteIfCreated(api, '/activity-types', createdId);
  });

  test('SWG-CRUD-008 | Companies - crear, actualizar y eliminar con catalogos relacionados', async ({ request }) => {
    const api = new NexusApiClient(request);
    const created: Record<string, string | undefined> = {};

    try {
      created.countryId = await createEntity(api, '/Countries', { name: unique('Country Company') });
      created.cityId = await createEntity(api, '/Cities', { name: unique('City Company'), countryId: created.countryId });
      created.sectorId = await createEntity(api, '/company-sectors', { name: unique('Sector Company') });
      created.statusId = await createEntity(api, '/company-statuses', { name: unique('Status Company') });
      created.activityLevelId = await createEntity(api, '/activity-levels', {
        code: unique('LEVEL-COMPANY'),
        description: 'Company dependency'
      });
      created.companyId = await createEntity(api, '/companies', {
        name: unique('Company'),
        website: 'https://example.com',
        responsible: 'QA Automation',
        sectorId: created.sectorId,
        statusId: created.statusId,
        activityLevelId: created.activityLevelId,
        cityId: created.cityId
      });

      const update = await api.put('/companies', {
        id: created.companyId,
        name: unique('Company Updated'),
        website: 'https://updated.example.com',
        responsible: 'QA Automation Updated',
        sectorId: created.sectorId,
        statusId: created.statusId,
        activityLevelId: created.activityLevelId,
        cityId: created.cityId
      });
      await api.expectStatusResponse(update, successStatuses);
    } finally {
      await deleteIfCreated(api, '/companies', created.companyId);
      await deleteIfCreated(api, '/activity-levels', created.activityLevelId);
      await deleteIfCreated(api, '/company-statuses', created.statusId);
      await deleteIfCreated(api, '/company-sectors', created.sectorId);
      await deleteIfCreated(api, '/Cities', created.cityId);
      await deleteIfCreated(api, '/Countries', created.countryId);
    }
  });

  test('SWG-CRUD-009 | Contacts - crear, actualizar y eliminar con compania y fuente', async ({ request }) => {
    const api = new NexusApiClient(request);
    const created: Record<string, string | undefined> = {};

    try {
      created.countryId = await createEntity(api, '/Countries', { name: unique('Country Contact') });
      created.cityId = await createEntity(api, '/Cities', { name: unique('City Contact'), countryId: created.countryId });
      created.sectorId = await createEntity(api, '/company-sectors', { name: unique('Sector Contact') });
      created.statusId = await createEntity(api, '/company-statuses', { name: unique('Status Contact') });
      created.activityLevelId = await createEntity(api, '/activity-levels', {
        code: unique('LEVEL-CONTACT'),
        description: 'Contact dependency'
      });
      created.companyId = await createEntity(api, '/companies', {
        name: unique('Company Contact'),
        responsible: 'QA Automation',
        sectorId: created.sectorId,
        statusId: created.statusId,
        activityLevelId: created.activityLevelId,
        cityId: created.cityId
      });
      created.sourceId = await createEntity(api, '/contact-sources', { name: unique('Source Contact') });
      created.contactId = await createEntity(api, '/contacts', {
        firstName: unique('First'),
        lastName: 'Contact',
        position: 'QA',
        emails: ['qa@example.com'],
        phones: ['3000000000'],
        status: 1,
        companyId: created.companyId,
        sourceId: created.sourceId
      });

      const update = await api.put('/contacts', {
        id: created.contactId,
        firstName: unique('First Updated'),
        lastName: 'Contact Updated',
        position: 'QA Lead',
        emails: ['qa.updated@example.com'],
        phones: ['3000000001'],
        status: 1,
        companyId: created.companyId,
        sourceId: created.sourceId
      });
      await api.expectStatusResponse(update, successStatuses);
    } finally {
      await deleteIfCreated(api, '/contacts', created.contactId);
      await deleteIfCreated(api, '/contact-sources', created.sourceId);
      await deleteIfCreated(api, '/companies', created.companyId);
      await deleteIfCreated(api, '/activity-levels', created.activityLevelId);
      await deleteIfCreated(api, '/company-statuses', created.statusId);
      await deleteIfCreated(api, '/company-sectors', created.sectorId);
      await deleteIfCreated(api, '/Cities', created.cityId);
      await deleteIfCreated(api, '/Countries', created.countryId);
    }
  });

  test('SWG-CRUD-010 | Activities - crear, actualizar y eliminar con contacto y tipo', async ({ request }) => {
    const api = new NexusApiClient(request);
    const created: Record<string, string | undefined> = {};

    try {
      created.countryId = await createEntity(api, '/Countries', { name: unique('Country Activity') });
      created.cityId = await createEntity(api, '/Cities', { name: unique('City Activity'), countryId: created.countryId });
      created.sectorId = await createEntity(api, '/company-sectors', { name: unique('Sector Activity') });
      created.statusId = await createEntity(api, '/company-statuses', { name: unique('Status Activity') });
      created.activityLevelId = await createEntity(api, '/activity-levels', {
        code: unique('LEVEL-ACTIVITY'),
        description: 'Activity dependency'
      });
      created.companyId = await createEntity(api, '/companies', {
        name: unique('Company Activity'),
        responsible: 'QA Automation',
        sectorId: created.sectorId,
        statusId: created.statusId,
        activityLevelId: created.activityLevelId,
        cityId: created.cityId
      });
      created.sourceId = await createEntity(api, '/contact-sources', { name: unique('Source Activity') });
      created.contactId = await createEntity(api, '/contacts', {
        firstName: unique('First Activity'),
        lastName: 'Contact',
        status: 1,
        companyId: created.companyId,
        sourceId: created.sourceId
      });
      created.activityTypeId = await createEntity(api, '/activity-types', {
        name: unique('Activity Type Flow'),
        description: 'Activity dependency'
      });
      created.activityId = await createEntity(api, '/activities', {
        description: 'Created by Swagger CRUD automation',
        contactId: created.contactId,
        activityTypeId: created.activityTypeId
      });

      const update = await api.put('/activities', {
        id: created.activityId,
        description: 'Updated by Swagger CRUD automation'
      });
      await api.expectStatusResponse(update, successStatuses);
    } finally {
      await deleteIfCreated(api, '/activities', created.activityId);
      await deleteIfCreated(api, '/activity-types', created.activityTypeId);
      await deleteIfCreated(api, '/contacts', created.contactId);
      await deleteIfCreated(api, '/contact-sources', created.sourceId);
      await deleteIfCreated(api, '/companies', created.companyId);
      await deleteIfCreated(api, '/activity-levels', created.activityLevelId);
      await deleteIfCreated(api, '/company-statuses', created.statusId);
      await deleteIfCreated(api, '/company-sectors', created.sectorId);
      await deleteIfCreated(api, '/Cities', created.cityId);
      await deleteIfCreated(api, '/Countries', created.countryId);
    }
  });
});
