import { SuccessDataResult } from './../core/result/SuccessDataResult';
import { ErrorResult } from './../core/result/ErrorResult';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const createdUser = await this.userService.create(registerDto);
    const token = await this.createJwtToken(createdUser.data);

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

    const isValid = await this.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isValid) {
      return new ErrorResult('Invalid credentials');
    }

    const token = await this.createJwtToken(user);

    return new SuccessDataResult({
      user,
      ...token,
    });
  }

  async createJwtToken(user: any) {
    const payload = {
      username: user.username,
      email: user.email,
      id: user.id,
    };

    return {
      expiresIn: 3600,
      token: await this.jwtService.sign(payload),
    };
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
