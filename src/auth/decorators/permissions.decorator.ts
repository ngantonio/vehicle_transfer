import { SetMetadata } from '@nestjs/common';
import { TransferModulePermissions } from '../../utils/enums';

export const PERMISSION_KEY = 'permission';
export const RequiresPermission = (permission: TransferModulePermissions) =>
  SetMetadata(PERMISSION_KEY, permission);
