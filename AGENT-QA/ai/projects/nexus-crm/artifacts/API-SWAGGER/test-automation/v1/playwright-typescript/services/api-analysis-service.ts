import { readFileSync } from 'fs';
import { resolve } from 'path';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type OpenApiOperationAnalysis = {
  path: string;
  method: HttpMethod;
  operationId?: string;
  tags: string[];
  requiredParameters: string[];
  headers: string[];
  auth: string[];
  hasRequestBody: boolean;
  requestSchemaRef?: string;
  requiredBodyFields: string[];
  responseCodes: number[];
};

type OpenApiDocument = {
  openapi: string;
  info: { title: string; version: string };
  paths: Record<string, Partial<Record<HttpMethod, any>>>;
  components?: {
    securitySchemes?: Record<string, unknown>;
    schemas?: Record<string, { required?: string[]; properties?: Record<string, unknown> }>;
  };
  security?: Record<string, string[]>[];
};

const methods = new Set(['get', 'post', 'put', 'delete', 'patch']);

export class ApiAnalysisService {
  readonly document: OpenApiDocument;

  constructor(openApiPath = resolve(__dirname, '../openapi/nexus.openapi.json')) {
    this.document = JSON.parse(readFileSync(openApiPath, 'utf-8')) as OpenApiDocument;
  }

  analyze(): OpenApiOperationAnalysis[] {
    return Object.entries(this.document.paths).flatMap(([path, operations]) =>
      Object.entries(operations)
        .filter(([method]) => methods.has(method))
        .map(([method, operation]) => this.mapOperation(path, method as HttpMethod, operation))
    );
  }

  listEndpoints() {
    return this.analyze().map(({ method, path }) => `${method.toUpperCase()} ${path}`);
  }

  private mapOperation(path: string, method: HttpMethod, operation: any): OpenApiOperationAnalysis {
    const parameters = operation.parameters ?? [];
    const schemaRef = operation.requestBody?.content?.['application/json']?.schema?.$ref as string | undefined;
    const schemaName = schemaRef?.split('/').pop();
    const schema = schemaName ? this.document.components?.schemas?.[schemaName] : undefined;
    const security = operation.security ?? this.document.security ?? [];

    return {
      path,
      method,
      operationId: operation.operationId,
      tags: operation.tags ?? [],
      requiredParameters: parameters.filter((p: any) => p.required).map((p: any) => `${p.in}:${p.name}`),
      headers: ['Accept: application/json'].concat(operation.requestBody ? ['Content-Type: application/json'] : []),
      auth: Object.keys(this.document.components?.securitySchemes ?? {}).concat(
        security.flatMap((entry: Record<string, string[]>) => Object.keys(entry))
      ),
      hasRequestBody: Boolean(operation.requestBody),
      requestSchemaRef: schemaRef,
      requiredBodyFields: schema?.required ?? [],
      responseCodes: Object.keys(operation.responses ?? {}).map(Number)
    };
  }
}
