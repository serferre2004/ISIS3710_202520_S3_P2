/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NestMiddleware } from '@nestjs/common';

function redact(headers: Record<string, string | string[]>) {
  const copy = { ...headers };
  if (copy['api-key']) {
    copy['api-key'] = 'REDACTED';
  }
  return copy;
}

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: Function) {
    const start = Date.now();
    const inMsg = {
      method: req.method,
      url: req.originalUrl,
      headers: redact(req.headers),
    };
    console.log('[IN]', JSON.stringify(inMsg));
    res.on('finish', () => {
      const outMsg = {
        statusCode: res.statusCode,
        durationMs: Date.now() - start,
        method: req.method,
        url: req.originalUrl,
      };
      console.log('[OUT]', JSON.stringify(outMsg));
    });
    next();
  }
}
