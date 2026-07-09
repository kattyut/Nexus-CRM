import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { ApiAnalysisService } from './api-analysis-service';

type PlaywrightJson = {
  suites?: any[];
  stats?: { expected?: number; unexpected?: number; skipped?: number; flaky?: number };
  errors?: { message?: string }[];
};

export class SummaryService {
  constructor(
    private readonly summaryPath = resolve(__dirname, '../../../executions/summary.json'),
    private readonly resultsPath = resolve(__dirname, '../../../executions/results.json')
  ) {}

  writeFromResults() {
    const analysis = new ApiAnalysisService();
    const results = this.readResults();
    const tests = this.collectTests(results.suites ?? []);
    const failed = tests.filter((test) => test.outcome === 'unexpected');

    mkdirSync(dirname(this.summaryPath), { recursive: true });
    writeFileSync(
      this.summaryPath,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          project: 'nexus-crm',
          storyId: 'API-SWAGGER',
          source: 'v1/playwright-typescript/openapi/nexus.openapi.json',
          endpointsProbados: analysis.listEndpoints(),
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
  }

  private readResults(): PlaywrightJson {
    try {
      return JSON.parse(readFileSync(this.resultsPath, 'utf-8')) as PlaywrightJson;
    } catch {
      return { suites: [], stats: { expected: 0, unexpected: 0, skipped: 0, flaky: 0 }, errors: [] };
    }
  }

  private collectTests(suites: any[]): { title: string; outcome: string }[] {
    return suites.flatMap((suite) => [
      ...(suite.specs ?? []).flatMap((spec: any) =>
        (spec.tests ?? []).map((test: any) => ({ title: spec.title, outcome: test.outcome ?? 'unknown' }))
      ),
      ...this.collectTests(suite.suites ?? [])
    ]);
  }
}
