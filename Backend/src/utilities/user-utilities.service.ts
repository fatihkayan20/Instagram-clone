import { PrismaService } from 'src/prisma/prisma.service';
import { Run } from 'src/core/BusinessRules';
import { Injectable } from '@nestjs/common';
import {
  ErrorResult,
  Result,
  SuccessDataResult,
  SuccessResult,
} from 'src/core/result';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class UserUtilitiesService {
  constructor(private prisma: PrismaService) {}

  private isPasswordsMatching = (
    password: string,
    confirmPassword: string,
  ): Result => {
    if (password !== confirmPassword) {
      return new ErrorResult('Password and confirm password does not match');
    }
    return new SuccessResult();
  };

  private isEmailAlreadyExists = async (email: string): Promise<Result> => {
    const filteredUser = await this.prisma.user.findFirst({ where: { email } });
    if (filteredUser) {
      return new ErrorResult('Email already exists');
    }
    return new SuccessResult();
  };

  private isUsernameAlreadyExists = async (
    username: string,
  ): Promise<Result> => {
    const filteredUser = await this.prisma.user.findFirst({
      where: { username },
    });
    if (filteredUser) {
      return new ErrorResult('Username already exists');
    }
    return new SuccessResult();
  };

  private isEmailValid = (email: string): Result => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      return new ErrorResult('Email is not valid');
    }
    return new SuccessResult();
  };

  private hashPassword = (pw: string): Result => {
    const password = bcrypt.hashSync(pw, 10);
    return new SuccessDataResult({ password });
  };

  public isUserValid = async (user: CreateUserDto): Promise<Result> => {
    const result = await Run([
      this.isPasswordsMatching(user.password, user.passwordConfirm),
      this.isEmailAlreadyExists(user.email),
      this.isUsernameAlreadyExists(user.username),
      this.isEmailValid(user.email),
    ]);
    if (result.success) {
      return this.hashPassword(user.password);
    }
    return result;
  };
}
