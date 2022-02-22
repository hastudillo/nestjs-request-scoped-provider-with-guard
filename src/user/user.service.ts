import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { LoggerService } from 'src/core/logger/logger.service';
import { USER_MODEL } from 'src/core/tenancy/tenancy-models.provider';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL) private readonly userModel: Model<UserDocument>,
    private readonly logger: LoggerService,
  ) {
    this.logger.log('service constructor');
  }

  async getAll(): Promise<UserDocument[]> {
    return this.userModel.find().lean();
  }
}
