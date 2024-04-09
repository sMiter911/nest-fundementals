import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(@Inject('CONFIG') private config: { port: string }) {
    console.log(config);
  }

  getHello(): string {
    return `Hello I am learning Nest.js Fundamentals ${this.config.port}`;
  }
}
