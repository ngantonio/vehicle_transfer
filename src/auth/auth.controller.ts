import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
//import { ActiveUser } from 'src/common/decorators/active-user.decorator';
//import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from '../utils/enums';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

interface RequestWithUser extends Request {
  user: {
    email: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Auth(Role.ADMIN)
  @Get('profile')
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }
}
