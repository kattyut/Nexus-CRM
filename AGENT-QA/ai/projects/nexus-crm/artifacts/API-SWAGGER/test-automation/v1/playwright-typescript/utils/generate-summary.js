const { mkdirSync, readFileSync, writeFileSync } = require('fs');
const { dirname, resolve } = require('path');

const base = resolve(__dirname, '..');
const openApiPath = resolve(base, 'openapi/nexus.openapi.json');
const resultsPath = resolve(base, '../../executions/results.json');
const summaryPath = resolve(base, '../../executions/summary.json');

function readJson(path, fallback) {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return fallback;
  }
}

function collectTests(suites = []) {
  return suites.flatMap((suite) => [
    ...(suite.specs ?? []).flatMap((spec) =>
      (spec.tests ?? []).map((test) => ({ title: spec.title, outcome: test.outcome ?? 'unknown' }))
    ),
    ...collectTests(suite.suites ?? [])
  ]);
}

const openApi = readJson(openApiPath, { paths: {} });
const results = readJson(resultsPath, { suites: [], stats: {}, errors: [] });
const endpoints = Object.entries(openApi.paths).flatMap(([path, operations]) =>
  Object.keys(operations).map((method) => `${method.toUpperCase()} ${path}`)
);
const tests = collectTests(results.suites);
const failed = tests.filter((test) => test.outcome === 'unexpected');

mkdirSync(dirname(summaryPath), { recursive: true });
writeFileSync(
  summaryPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      project: 'nexus-crm',
      storyId: 'API-SWAGGER',
      source: 'v1/playwright-typescript/openapi/nexus.openapi.json',
      endpointsProbados: endpoints,
      pruebasEjecutadas: tests.length,
      pruebasExitosas: results.stats?.expected ?? tests.filter((test) => test.outcome === 'expected').length,
      pruebasFallidas: results.stats?.unexpected ?? failed.length,
      pruebasOmitidas: results.stats?.skipped ?? tests.filter((test) => test.outcome === 'skipped').length,
      erroresEncontrados: failed.map((test) => test.title).concat((results.errors ?? []).map((error) => error.message))
    },
    null,
    2
  ),
  'utf-8'
);
