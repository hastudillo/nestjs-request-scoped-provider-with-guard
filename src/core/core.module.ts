import { Global, Module } from '@nestjs/common';
import { TenancyModule } from './tenancy/tenancy.module';
import { LoggerModule } from './logger/logger.module';

@Global()
@Module({
  imports: [LoggerModule, TenancyModule],
  exports: [LoggerModule, TenancyModule],
})
export class CoreModule {}
