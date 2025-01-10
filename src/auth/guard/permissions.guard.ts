import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TransferModulePermissions } from '../../utils/enums';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission =
      this.reflector.getAllAndOverride<TransferModulePermissions>(
        PERMISSION_KEY,
        [context.getHandler(), context.getClass()],
      );

    if (!permission) {
      return false;
    }

    const { permissions } = context.switchToHttp().getRequest();
    const found = permissions.find((p) => p.name === permission);
    if (found) return true;

    return false;
  }
}
