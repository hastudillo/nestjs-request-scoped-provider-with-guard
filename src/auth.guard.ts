import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';

@Injectable()
export class Guard implements CanActivate {
  constructor(private readonly logger: LoggerService) {
    this.logger.log('guard constructor');
  }

  canActivate(_context: ExecutionContext): boolean {
    this.logger.log('guard canActivate');
    return true;
  }

  handleRequest(err: unknown, user: any, info: unknown): any {
    this.logger.log('guard handleRequest');
    if (err) {
      throw new UnauthorizedException(err);
    }
    if (info) {
      throw new UnauthorizedException(info);
    }
    return user;
  }
}
