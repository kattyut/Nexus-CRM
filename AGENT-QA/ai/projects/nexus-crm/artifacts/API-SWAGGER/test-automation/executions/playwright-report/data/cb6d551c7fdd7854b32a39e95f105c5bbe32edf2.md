# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\openapi-generated.spec.ts >> Nexus API - generated OpenAPI coverage >> API-CONTRACT-001 | escenarios exitosos GET sin parametros retornan response esperada
- Location: tests\api\openapi-generated.spec.ts:25:7

# Error details

```
Error: status 400 must be expected

expect(received).toContain(expected) // indexOf

Expected value: 400
Received array: [200]
```

# Test source

```ts
  1  | import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
  2  | 
  3  | type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  4  | 
  5  | export type TimedResponse = {
  6  |   response: APIResponse;
  7  |   elapsedMs: number;
  8  | };
  9  | 
  10 | export class NexusApiClient {
  11 |   constructor(private readonly request: APIRequestContext) {}
  12 | 
  13 |   async send(method: HttpMethod, path: string, body?: Record<string, unknown>): Promise<TimedResponse> {
  14 |     const startedAt = Date.now();
  15 |     const response = await this.request.fetch(path, {
  16 |       method,
  17 |       data: body,
  18 |       headers: body ? { 'Content-Type': 'application/json' } : undefined
  19 |     });
  20 | 
  21 |     return {
  22 |       response,
  23 |       elapsedMs: Date.now() - startedAt
  24 |     };
  25 |   }
  26 | 
  27 |   async get(path: string) {
  28 |     return this.send('GET', path);
  29 |   }
  30 | 
  31 |   async post(path: string, body: Record<string, unknown>) {
  32 |     return this.send('POST', path, body);
  33 |   }
  34 | 
  35 |   async put(path: string, body: Record<string, unknown>) {
  36 |     return this.send('PUT', path, body);
  37 |   }
  38 | 
  39 |   async delete(path: string) {
  40 |     return this.send('DELETE', path);
  41 |   }
  42 | 
  43 |   async expectJsonResponse({ response, elapsedMs }: TimedResponse, allowedStatuses: number[] = [200]) {
> 44 |     expect(allowedStatuses, `status ${response.status()} must be expected`).toContain(response.status());
     |                                                                             ^ Error: status 400 must be expected
  45 |     expect(elapsedMs, 'response time must stay under API_RESPONSE_SLA_MS').toBeLessThanOrEqual(
  46 |       Number(process.env.API_RESPONSE_SLA_MS ?? 2000)
  47 |     );
  48 | 
  49 |     const headers = response.headers();
  50 |     expect(headers, 'response headers should be present').toBeTruthy();
  51 | 
  52 |     if (response.status() !== 204) {
  53 |       expect(headers['content-type'] ?? '', 'content-type must be json for body responses').toContain('application/json');
  54 |     }
  55 |   }
  56 | 
  57 |   async expectStatusResponse({ response, elapsedMs }: TimedResponse, allowedStatuses: number[] = [200]) {
  58 |     expect(allowedStatuses, `status ${response.status()} must be expected`).toContain(response.status());
  59 |     expect(elapsedMs, 'response time must stay under API_RESPONSE_SLA_MS').toBeLessThanOrEqual(
  60 |       Number(process.env.API_RESPONSE_SLA_MS ?? 2000)
  61 |     );
  62 |     expect(response.headers(), 'response headers should be present').toBeTruthy();
  63 |   }
  64 | 
  65 |   async parseJson(response: APIResponse): Promise<unknown> {
  66 |     const text = await response.text();
  67 |     expect(text, 'response body must not be empty').not.toEqual('');
  68 |     return JSON.parse(text);
  69 |   }
  70 | 
  71 |   async parseOptionalJson(response: APIResponse): Promise<unknown | undefined> {
  72 |     const text = await response.text();
  73 |     return text ? JSON.parse(text) : undefined;
  74 |   }
  75 | }
  76 | 
```