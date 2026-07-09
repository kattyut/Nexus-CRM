import { appendFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

export class LoggingService {
  constructor(private readonly logPath: string) {
    mkdirSync(dirname(logPath), { recursive: true });
  }

  info(message: string, details?: unknown) {
    const payload = details === undefined ? '' : ` ${JSON.stringify(details)}`;
    appendFileSync(this.logPath, `[${new Date().toISOString()}] ${message}${payload}\n`, 'utf-8');
  }
}
