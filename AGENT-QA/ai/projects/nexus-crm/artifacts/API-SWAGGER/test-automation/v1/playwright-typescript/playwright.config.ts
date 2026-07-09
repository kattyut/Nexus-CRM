import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: '../../executions/test-results',
  timeout: 45_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: '../../executions/results.json' }],
    ['html', { outputFolder: '../../executions/playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: process.env.API_BASE_URL ?? 'http://localhost:3000',
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: {
      Accept: 'application/json'
    },
    trace: 'retain-on-failure'
  }
});
