import { test, expect } from '../fixtures/{{fixture_file_name}}';

test.describe('{{story_id}} - {{story_title}}', () => {
  test('{{test_case_id}} - {{test_case_title}}', async ({ page, {{page_fixture_name}} }) => {
    await test.step('Abrir funcionalidad objetivo', async () => {
      await {{page_fixture_name}}.goto();
      await {{page_fixture_name}}.expectLoaded();
    });

    await test.step('Ejecutar pasos del caso de prueba', async () => {
{{test_steps}}
    });

    await test.step('Validar resultado esperado', async () => {
{{expected_assertions}}
    });
  });
});
