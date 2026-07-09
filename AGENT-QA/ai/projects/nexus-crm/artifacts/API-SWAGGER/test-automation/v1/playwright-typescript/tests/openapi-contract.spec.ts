import { expect, test } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { NexusApiClient } from '../clients/nexus-api.client';

type OpenApiOperation = {
  tags?: string[];
  responses?: Record<string, unknown>;
};

type OpenApiDocument = {
  openapi: string;
  info: {
    title: string;
    version: string;
  };
  paths: Record<string, Partial<Record<string, OpenApiOperation>>>;
};

const runApi = process.env.RUN_API === 'true' && !!process.env.API_BASE_URL;
const openApiPath = resolve(__dirname, '../openapi/nexus.openapi.json');
const openApi = JSON.parse(readFileSync(openApiPath, 'utf-8')) as OpenApiDocument;
const caseIdsByPath: Record<string, string> = {
  '/Cities': 'SWG-CT-002',
  '/Countries': 'SWG-CT-003',
  '/companies': 'SWG-CT-004',
  '/company-sectors': 'SWG-CT-005',
  '/company-statuses': 'SWG-CT-006',
  '/activity-levels': 'SWG-CT-007',
  '/contacts': 'SWG-CT-008',
  '/contact-sources': 'SWG-CT-009',
  '/activity-types': 'SWG-CT-010',
  '/activities': 'SWG-CT-011'
};
const documentedGetEndpoints = Object.entries(openApi.paths)
  .filter(([path, operations]) => operations.get && !path.includes('{'))
  .map(([path, operations]) => ({
    caseId: caseIdsByPath[path] ?? 'SWG-CT-AUTO',
    path,
    tag: operations.get?.tags?.[0] ?? 'OpenAPI',
    expectedStatuses: Object.keys(operations.get?.responses ?? {}).map(Number)
  }));

test.describe('Nexus API - contrato desde OpenAPI Swagger', () => {
  test.beforeEach(() => {
    test.skip(!runApi, 'Definir RUN_API=true y API_BASE_URL=https://localhost:7167 para ejecutar contra el backend real.');
  });

  test('SWG-CT-001 | swagger json vivo coincide con la API documentada localmente', async ({ request }) => {
    const response = await request.get('/swagger/v1/swagger.json');

    expect(response.status(), 'swagger json debe estar disponible').toBe(200);
    expect(response.headers()['content-type'] ?? '', 'swagger debe responder json').toContain('application/json');

    const liveOpenApi = (await response.json()) as OpenApiDocument;
    expect(liveOpenApi.info.title).toBe(openApi.info.title);
    expect(Object.keys(liveOpenApi.paths).sort()).toEqual(Object.keys(openApi.paths).sort());
  });

  for (const endpoint of documentedGetEndpoints) {
    test(`${endpoint.caseId} | GET ${endpoint.path} responde segun contrato (${endpoint.tag})`, async ({ request }) => {
      const api = new NexusApiClient(request);
      const allowedStatuses = endpoint.expectedStatuses.length > 0 ? endpoint.expectedStatuses : [200];
      const result = await api.get(endpoint.path);

      await api.expectJsonResponse(result, allowedStatuses);

      if (result.response.status() !== 204) {
        const payload = await api.parseJson(result.response);
        expect(Array.isArray(payload), `${endpoint.path} debe responder una lista`).toBeTruthy();
      }
    });
  }
});
