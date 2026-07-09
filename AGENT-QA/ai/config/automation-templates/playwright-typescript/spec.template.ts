import { test, expect } from '@playwright/test';
import { testData } from '../fixtures/test-data';
import { {{page_class_name}} } from '../pages/{{page_file_name}}';

test.describe('{{story_id}} - {{story_title}}', () => {
  test('{{test_case_id}} - {{test_case_title}}', async ({ page }) => {
    const {{page_object_name}} = new {{page_class_name}}(page);
    const data = testData.{{entity_collection_name}}[0];

    await test.step('Abrir funcionalidad objetivo', async () => {
      await {{page_object_name}}.goto();
      await {{page_object_name}}.expectLoaded();
    });

    await test.step('Ejecutar pasos del caso de prueba', async () => {
      await {{page_object_name}}.{{primary_action_method}}(data);
{{test_steps}}
    });

    await test.step('Validar resultado esperado', async () => {
      await {{page_object_name}}.expect{{expected_result_method}}(data);
{{expected_assertions}}
    });
  });
});
