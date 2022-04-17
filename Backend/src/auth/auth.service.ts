import { TokenService } from './../token/token.service';
import { SuccessDataResult } from './../core/result/SuccessDataResult';
import { ErrorResult } from './../core/result/ErrorResult';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ITokenData } from './entities/token-data.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    @Inject(REQUEST) private request: Request,
  ) {}

  async register(registerDto: RegisterDto) {
    const createdUser = await this.userService.create(registerDto);
    const token = await this.tokenService.createJwtToken(createdUser.data);
    await this.tokenService.storeToken(token.token, createdUser.data.id);

    return new SuccessDataResult(
      {
        user: createdUser.data,
        ...token,
      },
      'Registration successful',
    );
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUsernameOrEmail(
      loginDto.usernameOrEmail,
    );

    if (!user) {
      return new ErrorResult('Invalid credentials');
    }

    const isValid = await this.tokenService.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isValid) {
      return new ErrorResult('Invalid credentials');
    }

    const token = await this.tokenService.createJwtToken(user);
    await this.tokenService.storeToken(token.token, user.id);

    return new SuccessDataResult({
      user,
      ...token,
    });
  }

  async refreshToken() {
    const tokenData = this.request.user as ITokenData;
    const newToken = await this.tokenService.refreshToken(
      this.request.headers.authorization,
      tokenData,
    );
    return new SuccessDataResult(newToken, 'Token refreshed');
  }
}
