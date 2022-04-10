import { SuccessDataResult } from './../core/result/SuccessDataResult';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserUtilitiesService } from 'src/utilities/user-utilities.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { FollowService } from 'src/follow/follow.service';
import { ITokenData } from 'src/auth/entities/token-data.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private UserUtilities: UserUtilitiesService,
    @Inject(REQUEST) private request: Request,
    private followService: FollowService,
    private prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.UserUtilities.isUserValid(createUserDto);
    if (result.success) {
      const { email, username } = createUserDto;
      const userForCreate: Prisma.UserCreateInput = {
        email,
        username,

        profileUrl: undefined,
        ...result.data,
      };

      const createdUser = await this.prisma.user.create({
        data: userForCreate,
      });

      return new SuccessDataResult(createdUser);
    }

    throw new BadRequestException(result);
  }

  async follow(id: string) {
    const tokenData: ITokenData = this.request.user as ITokenData;

    const followed = await this.followService.followUser({
      follower: tokenData?.id,
      following: id,
    });
    return new SuccessDataResult(followed, 'User followed successfully');
  }

  async unFollow(id: string) {
    const tokenData: ITokenData = this.request.user as ITokenData;

    const unfollowed = await this.followService.unFollowUser({
      follower: tokenData?.id,
      following: id,
    });
    return new SuccessDataResult(unfollowed, 'User unfollowed successfully');
  }

  async findByUsernameOrEmail(usernameOrEmail: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
    if (user) {
      return user;
    }

    return null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
