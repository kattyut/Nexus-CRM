import { expect } from '@playwright/test';

export function expectObjectSchema(payload: unknown, expectedFields: string[]) {
  expect(payload, 'payload must be an object').toBeTruthy();
  expect(Array.isArray(payload), 'payload must not be an array').toBeFalsy();
  expect(typeof payload, 'payload type').toBe('object');

  const record = payload as Record<string, unknown>;
  for (const field of expectedFields) {
    const hasField = Object.prototype.hasOwnProperty.call(record, field);
    const hasCaseInsensitiveField = Object.keys(record).some((key) => key.toLowerCase() === field.toLowerCase());
    expect(hasField || hasCaseInsensitiveField, `field ${field} must exist`).toBeTruthy();
  }
}

export function expectListSchema(payload: unknown, expectedFields: string[]) {
  expect(Array.isArray(payload), 'payload must be a list').toBeTruthy();

  const list = payload as unknown[];
  if (list.length === 0) {
    return;
  }

  expectObjectSchema(list[0], expectedFields);
}

export function expectValidationErrorSchema(payload: unknown) {
  expect(payload, 'error payload must exist').toBeTruthy();
  expect(typeof payload, 'error payload type').toBe('object');

  const keys = Object.keys(payload as Record<string, unknown>).map((key) => key.toLowerCase());
  expect(
    keys.some((key) => ['error', 'errors', 'message', 'title', 'detail', 'status'].includes(key)),
    'error payload must expose error details'
  ).toBeTruthy();
}

export function withoutRequiredField(body: Record<string, unknown>, field: string) {
  const clone = { ...body };
  delete clone[field];
  return clone;
}
