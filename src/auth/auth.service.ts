import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { Role } from '../utils/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const { user, role } = await this.usersService.create(registerDto);

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: role[0].name,
      };
      const token = await this.jwtService.signAsync(payload);
      return {
        user,
        token,
      };
    } catch (error) {
      return error;
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      /*if (user.roles[0].name === Role.USER)
        throw new UnauthorizedException('Unauthorized');*/

      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid)
        throw new UnauthorizedException('Invalid credentials');

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.roles[0].name,
      };
      const token = await this.jwtService.signAsync(payload);

      return {
        user,
        token,
      };
    } catch (error) {
      return error;
    }
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findByEmail(email);
  }
}
