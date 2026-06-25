import { test as base } from '@playwright/test';
import { RoleAssignmentPage } from '../pages/role-assignment.page';

type Fixtures = { roleAssignmentPage: RoleAssignmentPage };

export const test = base.extend<Fixtures>({
  roleAssignmentPage: async ({ page }, use) => {
    await use(new RoleAssignmentPage(page));
  }
});

export { expect } from '@playwright/test';
