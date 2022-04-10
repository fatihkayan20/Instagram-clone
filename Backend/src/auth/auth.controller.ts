import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SerializeOptions({
    excludePrefixes: ['password'],
  })
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const res = await this.authService.register(registerDto);
    if (!res.success) {
      throw new BadRequestException(res);
    }
    return res;
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const res = await this.authService.login(loginDto);
    if (!res.success) {
      throw new BadRequestException(res);
    }
    return res;
  }
}
