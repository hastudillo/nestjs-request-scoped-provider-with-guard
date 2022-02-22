import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { UserSchema } from '../../user/schemas/user.schema';
import { TENANT_CONNECTION } from './tenancy-connection.provider';

/**
 * Since the tenant models depends on the connection,
 * the models have to be defined through a provider,
 * then included inside the module where you initialise them
 */
export const USER_MODEL: string = 'USER_MODEL';

export const TenancyUserProvider: Provider = {
  provide: USER_MODEL,
  useFactory: (connection: Connection) => connection.model('User', UserSchema),
  inject: [TENANT_CONNECTION],
};
