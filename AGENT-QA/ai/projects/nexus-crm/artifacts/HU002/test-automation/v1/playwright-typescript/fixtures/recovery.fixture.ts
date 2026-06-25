import { test as base } from '@playwright/test';
import { RecoveryPage } from '../pages/recovery.page';

type Fixtures = { recoveryPage: RecoveryPage };

export const test = base.extend<Fixtures>({
  recoveryPage: async ({ page }, use) => {
    await use(new RecoveryPage(page));
  }
});

export { expect } from '@playwright/test';
