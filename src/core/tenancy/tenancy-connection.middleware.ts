import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import * as mongoose from 'mongoose';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class TenancyConnectionMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}
  /**
   * Mandatory function of a class implementing NestMiddleware
   * It handles the requests and returns a connection to a MongoDB, creating one if it desn't exist yet
   * For the sake of simplicity, the connection uri matches the env variable MONGO_URL
   * @param _req Http request
   * @param _res Http response
   * @param next the next middleware, etc., to be executed
   */
  async use(_req: Request, _res: Response, next: NextFunction): Promise<void> {
    const uri: string = process.env.MONGO_URL;
    const connection: mongoose.Connection = mongoose.connections.find(
      (con: mongoose.Connection) =>
        con['_connectionString'] === uri && con.readyState === 1,
    );
    if (!connection) {
      try {
        this.createConnection(uri);
        const hostAndPort: string[] | undefined = uri
          .split('/')[2]
          .split('@')
          .pop()
          ?.split(':');
        this.logger.log(
          `Connecting to database on host: '${hostAndPort?.[0]}' and port: '${
            hostAndPort?.[1] || 27017
          }'`,
        );
      } catch (err) {
        this.logger.error(err);
        throw new InternalServerErrorException(
          'Impossible to create connection to MongoDB',
        );
      }
    }
    next();
  }

  /**
   * Create and return a new mongo connection
   * @private
   * @param uri string
   * @returns mongoose Connection
   */
  private createConnection(uri: string): mongoose.Connection {
    return mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 1,
    });
  }
}
