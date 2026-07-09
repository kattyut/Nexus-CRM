import { test, expect } from '@playwright/test';
import { testData } from '../fixtures/test-data';

test.describe('{{story_id}} - {{story_title}} API', () => {
  test('{{test_case_id}} - {{test_case_title}} - contrato positivo', async ({ request }) => {
    const payload = testData.{{entity_collection_name}}[0];

    const response = await request.{{http_method}}('{{api_path}}', {
      headers: {
{{request_headers}}
      },
      data: payload
    });

    expect(response.status()).toBe({{expected_status}});
{{empty_response_guard}}
    const body = await response.json();
{{api_assertions}}
  });

  test('{{negative_test_case_id}} - contrato negativo', async ({ request }) => {
    const invalidPayload = testData.invalid{{entity_pascal_name}}[0];

    const response = await request.{{http_method}}('{{api_path}}', {
      headers: {
{{request_headers}}
      },
      data: invalidPayload
    });

    expect([400, 401, 403, 404, 409, 500]).toContain(response.status());
{{negative_api_assertions}}
  });
});
