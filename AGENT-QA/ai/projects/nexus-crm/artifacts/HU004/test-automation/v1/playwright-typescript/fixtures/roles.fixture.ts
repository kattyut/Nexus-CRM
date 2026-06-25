import { test as base } from '@playwright/test';
import { RolesPage } from '../pages/roles.page';

type Fixtures = { rolesPage: RolesPage };

export const test = base.extend<Fixtures>({
  rolesPage: async ({ page }, use) => {
    await use(new RolesPage(page));
  }
});

export { expect } from '@playwright/test';
