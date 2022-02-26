
import { SetMetadata } from '@nestjs/common';
import { TypeEnum } from './types';

export const UserTypes = (...userTypes: TypeEnum[]) =>
  SetMetadata('userTypes', userTypes);
