import { resolve } from 'path';
import { test, expect } from '../../fixtures/api.fixture';
import { LoggingService } from '../../services/logging-service';
import { TestExecutionService } from '../../services/test-execution-service';

const runApi = process.env.RUN_API === 'true' && !!process.env.API_BASE_URL;
const log = new LoggingService(resolve(__dirname, '../../../../executions/logs/openapi-generated.log'));

test.describe('Nexus API - generated OpenAPI coverage', () => {
  test('API-ANALYSIS-001 | analiza endpoints, metodos, parametros, headers, auth, body y responses', async ({
    apiAnalysisService
  }) => {
    const operations = apiAnalysisService.analyze();

    log.info('openapi analysis completed', {
      endpoints: operations.length,
      auth: [...new Set(operations.flatMap((operation) => operation.auth))]
    });

    expect(operations).toHaveLength(42);
    expect(operations.some((operation) => operation.hasRequestBody)).toBeTruthy();
    expect(operations.filter((operation) => operation.requiredParameters.length > 0)).toHaveLength(14);
  });

  test('API-CONTRACT-001 | escenarios exitosos GET sin parametros retornan response esperada', async ({
    request,
    apiAnalysisService
  }) => {
    test.skip(!runApi, 'Definir RUN_API=true y API_BASE_URL para ejecutar contra el backend real.');

    const executor = new TestExecutionService(request);
    const operations = apiAnalysisService
      .analyze()
      .filter((operation) => operation.method === 'get' && operation.requiredParameters.length === 0);

    for (const operation of operations) {
      const result = await executor.execute(operation);
      log.info('successful scenario executed', { method: operation.method, path: operation.path, status: result.response.status() });
      await executor.expectContractResponse(result, operation);
    }
  });

  test('API-VALIDATION-001 | validaciones obligatorias rechazan body sin campos requeridos', async ({
    request,
    apiAnalysisService,
    testDataService
  }) => {
    test.skip(!runApi, 'Definir RUN_API=true y API_BASE_URL para ejecutar contra el backend real.');

    const executor = new TestExecutionService(request);
    const operations = apiAnalysisService
      .analyze()
      .filter((operation) => ['post', 'put'].includes(operation.method) && operation.requiredBodyFields.length > 0);

    for (const operation of operations) {
      const result = await executor.execute(operation, testDataService.invalidBody(operation));
      log.info('required validation executed', { method: operation.method, path: operation.path, status: result.response.status() });
      await executor.expectHttpError(result, [400, 404, 405]);
    }
  });

  test('API-NEGATIVE-001 | datos invalidos en parametros id generan error HTTP esperado', async ({
    request,
    apiAnalysisService
  }) => {
    test.skip(!runApi, 'Definir RUN_API=true y API_BASE_URL para ejecutar contra el backend real.');

    const operations = apiAnalysisService
      .analyze()
      .filter((operation) => operation.requiredParameters.includes('path:id'));

    for (const operation of operations) {
      const response = await request.fetch(operation.path.replace('{id}', 'not-a-valid-id'), {
        method: operation.method.toUpperCase()
      });
      log.info('invalid id scenario executed', { method: operation.method, path: operation.path, status: response.status() });
      expect([400, 404, 405], `invalid id status for ${operation.method.toUpperCase()} ${operation.path}`).toContain(
        response.status()
      );
    }
  });
});
