import { test as base } from '@playwright/test';
import { {{page_class_name}} } from '../pages/{{page_file_name}}';

type Fixtures = {
  {{page_fixture_name}}: {{page_class_name}};
};

export const test = base.extend<Fixtures>({
  {{page_fixture_name}}: async ({ page }, use) => {
    await use(new {{page_class_name}}(page));
  }
});

export { expect } from '@playwright/test';
