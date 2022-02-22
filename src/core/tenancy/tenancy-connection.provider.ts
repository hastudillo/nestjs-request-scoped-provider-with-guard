import { Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as mongoose from 'mongoose';
import { LoggerService } from '../logger/logger.service';

export const TENANT_CONNECTION: string = 'TENANT_CONNECTION';

export const TenantConnectionProvider: Provider = {
  provide: TENANT_CONNECTION,
  inject: [REQUEST, LoggerService],
  scope: Scope.REQUEST,
  /**
   * Checks the pool of connections and gets one
   * For the sake of simplicity, the connection which uri matches with the env variable MONGO_URL
   * The status must be connected (1) or at least connecting (2)
   * @param req the Http request
   * @param logger
   * @returns an opened or opening connection
   */
  useFactory: async (
    _req: Request,
    logger: LoggerService,
  ): Promise<mongoose.Connection> => {
    const uri: string = process.env.MONGO_URL;
    const hostAndPort: string[] | undefined = uri
      .split('/')[2]
      .split('@')
      .pop()
      ?.split(':');
    logger.log(
      `Using connection to database on host: '${hostAndPort?.[0]}' and port: '${
        hostAndPort?.[1] || 27017
      }'`,
    );
    return mongoose.connections.find(
      (con: mongoose.Connection) =>
        con['_connectionString'] === uri &&
        (con.readyState === 1 || con.readyState === 2),
    );
  },
};
