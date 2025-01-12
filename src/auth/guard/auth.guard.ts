import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RolesService } from '../../roles/roles.service';
//import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../../utils/interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: TokenPayload = await this.jwtService.verifyAsync(token, {
        secret: 'secret',
      });

      /**
       * Se obtienen los permisos bajo el rol del usuario
       * y se insertan en el request para poder accederlos en
       * el resto de la app y los guards
       */
      const permissions = await this.rolesService.findOneByName(payload.role);
      request.user = payload;
      request.permissions = permissions[0].permissions || [];

      /** Se establece la cookie */
      response.cookie('Authentication', payload, {
        secure: true,
        httpOnly: true,
        expires: payload.exp,
      });
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
