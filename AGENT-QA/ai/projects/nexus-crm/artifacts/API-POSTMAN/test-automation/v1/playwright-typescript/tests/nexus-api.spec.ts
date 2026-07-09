import { test, expect } from '@playwright/test';
import { NexusApiClient } from '../clients/nexus-api.client';
import { collectionIssues, endpointContracts } from '../test-data/endpoints.data';
import { expectListSchema, expectObjectSchema, expectValidationErrorSchema, withoutRequiredField } from '../schemas/schema.assertions';

const runApi = process.env.RUN_API === 'true' && !!process.env.API_BASE_URL;
const successStatuses = [200, 201, 202, 204];
const clientErrorStatuses = [400, 401, 403, 404, 409, 422];

function getId(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return undefined;
  }

  const record = payload as Record<string, unknown>;
  const id = record.id ?? record.Id ?? record.ID;
  return typeof id === 'string' ? id : undefined;
}

test.describe('Nexus API - Cobertura desde coleccion Postman', () => {
  test.beforeEach(() => {
    test.skip(!runApi, 'Definir RUN_API=true y API_BASE_URL para ejecutar contra el backend real.');
  });

  for (const contract of endpointContracts) {
    test.describe(`${contract.hu} | ${contract.name}`, () => {
      test(`positivo - ${contract.functionality}`, async ({ request }) => {
        const api = new NexusApiClient(request);
        const result = await api.get(contract.path);

        await api.expectJsonResponse(result, successStatuses);
        if (result.response.status() !== 204) {
          const payload = await api.parseJson(result.response);
          expectListSchema(payload, contract.expectedListFields);
        }
      });

      if (contract.positiveBody) {
        test(`positivo - crear ${contract.feature}`, async ({ request }) => {
          const api = new NexusApiClient(request);
          const result = await api.post(contract.path, contract.positiveBody!);

          await api.expectJsonResponse(result, successStatuses);
          if (result.response.status() !== 204) {
            const payload = await api.parseJson(result.response);
            expectObjectSchema(payload, contract.expectedObjectFields);
          }
        });

        test(`negativo - rechaza campos obligatorios faltantes en ${contract.feature}`, async ({ request }) => {
          const api = new NexusApiClient(request);
          const missingFieldPayload = withoutRequiredField(contract.positiveBody!, contract.requiredFields[0]);
          const result = await api.post(contract.path, missingFieldPayload);

          await api.expectJsonResponse(result, clientErrorStatuses);
          const payload = await api.parseJson(result.response);
          expectValidationErrorSchema(payload);
        });

        test(`edge - rechaza payload vacio en ${contract.feature}`, async ({ request }) => {
          const api = new NexusApiClient(request);
          const result = await api.post(contract.path, {});

          await api.expectJsonResponse(result, clientErrorStatuses);
          const payload = await api.parseJson(result.response);
          expectValidationErrorSchema(payload);
        });
      }

      if (contract.updateBody) {
        test(`positivo - crear, actualizar y eliminar ${contract.feature}`, async ({ request }) => {
          const api = new NexusApiClient(request);
          test.skip(!contract.positiveBody, 'El flujo CRUD requiere payload de creacion.');

          const createResult = await api.post(contract.path, contract.positiveBody!);
          await api.expectJsonResponse(createResult, successStatuses);

          if (createResult.response.status() === 204) {
            test.skip(true, 'El backend no devolvio cuerpo para extraer id.');
          }

          const createPayload = await api.parseJson(createResult.response);
          const createdId = getId(createPayload);
          test.skip(!createdId, 'El backend no devolvio id para continuar flujo CRUD.');

          const updatePayload = { ...contract.updateBody!, id: createdId };
          const updateResult = await api.put(contract.path, updatePayload);

          await api.expectJsonResponse(updateResult, successStatuses);
          if (updateResult.response.status() !== 204) {
            const payload = await api.parseJson(updateResult.response);
            expectObjectSchema(payload, contract.expectedObjectFields);
          }

          const deleteResult = await api.delete(`${contract.path}/${createdId}`);
          await api.expectJsonResponse(deleteResult, successStatuses);
        });
      }

      if (contract.idPlaceholder) {
        test(`negativo - eliminar id inexistente en ${contract.feature}`, async ({ request }) => {
          const api = new NexusApiClient(request);
          const result = await api.delete(`${contract.path}/00000000-0000-0000-0000-000000000000`);

          await api.expectJsonResponse(result, clientErrorStatuses);
          if (result.response.status() !== 204) {
            const payload = await api.parseJson(result.response);
            expectValidationErrorSchema(payload);
          }
        });
      }
    });
  }

  test('edge tecnico - rutas inconsistentes documentadas en la coleccion', async ({ request }) => {
    const api = new NexusApiClient(request);

    const typoContacts = await api.get('/contatcts');
    expect(clientErrorStatuses, 'GET /contatcts should not be accepted silently').toContain(typoContacts.response.status());

    const lowerCountries = await api.get('/countries');
    expect([...successStatuses, ...clientErrorStatuses], 'GET /countries behavior must be explicit').toContain(lowerCountries.response.status());

    expect(collectionIssues.length, 'collection analysis must include technical findings').toBeGreaterThan(0);
  });
});
