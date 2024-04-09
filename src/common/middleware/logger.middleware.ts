import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request...', new Date().toDateString());
    next();
  }
}
