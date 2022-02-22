import { Controller, Get, UseGuards } from '@nestjs/common';
import { Guard } from 'src/auth.guard';
import { LoggerService } from 'src/core/logger/logger.service';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(new Guard(new LoggerService()))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {
    this.logger.log('controller constructor');
  }

  @Get()
  async get(): Promise<UserDocument[]> {
    this.logger.log('controller get');
    return this.userService.getAll();
  }
}
