import { expect, type APIRequestContext } from '@playwright/test';
import { NexusApiClient, type TimedResponse } from '../clients/nexus-api.client';
import type { OpenApiOperationAnalysis } from './api-analysis-service';

export class TestExecutionService {
  private readonly api: NexusApiClient;

  constructor(request: APIRequestContext) {
    this.api = new NexusApiClient(request);
  }

  async execute(operation: OpenApiOperationAnalysis, body?: Record<string, unknown>): Promise<TimedResponse> {
    const path = operation.path.replace('{id}', '00000000-0000-0000-0000-000000000001');

    return this.api.send(operation.method.toUpperCase() as any, path, body);
  }

  async expectContractResponse(result: TimedResponse, operation: OpenApiOperationAnalysis) {
    const allowed = operation.responseCodes.length ? operation.responseCodes : [200];
    await this.api.expectJsonResponse(result, allowed);
  }

  async expectHttpError(result: TimedResponse, expectedStatuses = [400, 404, 405]) {
    expect(expectedStatuses, `status ${result.response.status()} must be expected HTTP error`).toContain(
      result.response.status()
    );
  }
}
