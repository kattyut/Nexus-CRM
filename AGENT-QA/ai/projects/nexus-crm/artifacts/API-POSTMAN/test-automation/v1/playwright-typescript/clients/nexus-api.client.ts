import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import type { HttpMethod } from '../test-data/endpoints.data';

export type TimedResponse = {
  response: APIResponse;
  elapsedMs: number;
};

export class NexusApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async send(method: HttpMethod, path: string, body?: Record<string, unknown>): Promise<TimedResponse> {
    const startedAt = Date.now();
    const response = await this.request.fetch(path, {
      method,
      data: body,
      headers: body ? { 'Content-Type': 'application/json' } : undefined
    });

    return {
      response,
      elapsedMs: Date.now() - startedAt
    };
  }

  async get(path: string) {
    return this.send('GET', path);
  }

  async post(path: string, body: Record<string, unknown>) {
    return this.send('POST', path, body);
  }

  async put(path: string, body: Record<string, unknown>) {
    return this.send('PUT', path, body);
  }

  async delete(path: string) {
    return this.send('DELETE', path);
  }

  async expectJsonResponse({ response, elapsedMs }: TimedResponse, allowedStatuses: number[] = [200]) {
    expect(allowedStatuses, `status ${response.status()} must be expected`).toContain(response.status());
    expect(elapsedMs, 'response time must stay under API_RESPONSE_SLA_MS').toBeLessThanOrEqual(
      Number(process.env.API_RESPONSE_SLA_MS ?? 2000)
    );

    const headers = response.headers();
    expect(headers, 'response headers should be present').toBeTruthy();

    if (response.status() !== 204) {
      expect(headers['content-type'] ?? '', 'content-type must be json for body responses').toContain('application/json');
    }
  }

  async parseJson(response: APIResponse): Promise<unknown> {
    const text = await response.text();
    expect(text, 'response body must not be empty').not.toEqual('');
    return JSON.parse(text);
  }
}
