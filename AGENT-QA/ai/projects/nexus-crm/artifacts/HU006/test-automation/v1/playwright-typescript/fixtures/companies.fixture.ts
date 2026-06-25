import { test as base } from '@playwright/test';
import { CompaniesPage } from '../pages/companies.page';

type Fixtures = { companiesPage: CompaniesPage };

export const test = base.extend<Fixtures>({
  companiesPage: async ({ page }, use) => {
    await use(new CompaniesPage(page));
  }
});

export { expect } from '@playwright/test';
