import { test as base } from '@playwright/test';
import { ApiAnalysisService } from '../services/api-analysis-service';
import { TestDataService } from '../services/test-data-service';

export const test = base.extend<{
  apiAnalysisService: ApiAnalysisService;
  testDataService: TestDataService;
}>({
  apiAnalysisService: async ({}, use) => use(new ApiAnalysisService()),
  testDataService: async ({}, use) => use(new TestDataService())
});

export { expect } from '@playwright/test';
