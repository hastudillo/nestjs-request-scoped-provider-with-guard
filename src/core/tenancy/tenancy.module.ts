import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TenantConnectionProvider } from './tenancy-connection.provider';
import { TenancyConnectionMiddleware } from './tenancy-connection.middleware';
import { TenancyUserProvider } from './tenancy-models.provider';

@Module({
  imports: [HttpModule],
  providers: [TenantConnectionProvider, TenancyUserProvider],
  exports: [TenantConnectionProvider, TenancyUserProvider],
})
export class TenancyModule {
  /**
   * Method for applying our defined middleware to all routes
   * @param consumer the consumer of a request applying the middleware
   */
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TenancyConnectionMiddleware).forRoutes('*');
  }
}
