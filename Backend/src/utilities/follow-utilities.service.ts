import { PrismaService } from 'src/prisma/prisma.service';
import { SuccessResult } from '../core/result/SuccessResult';
import { ErrorResult } from '../core/result/ErrorResult';
import { Result } from '../core/result/Result';
import { Injectable } from '@nestjs/common';
import { Run } from 'src/core/BusinessRules';

@Injectable()
export class FollowUtilitiesService {
  constructor(private prisma: PrismaService) {}

  private async checkIsUserOwn(follower): Promise<Result> {
    const userData = await this.prisma.user.findFirst({
      where: { id: follower },
    });
    if (!userData) {
      return new ErrorResult('You cannot follow/unfollow yourself');
    }
    return new SuccessResult();
  }

  private async checkIsAlreadyFollowed(
    follower: string,
    following: string,
  ): Promise<Result> {
    const followData = await this.prisma.follow.findFirst({
      where: { followerId: follower, followingId: following },
    });
    if (followData) {
      return new ErrorResult('You already followed this user');
    }
    return new SuccessResult();
  }

  private async checkIsAlreadyUnFollowed(
    follower: string,
    following: string,
  ): Promise<Result> {
    const followData = await this.prisma.follow.findFirst({
      where: { followerId: follower, followingId: following },
    });
    if (!followData) {
      return new ErrorResult('You already unfollowed this user');
    }
    return new SuccessResult();
  }

  public async isFollowValid(
    follower: string,
    following: string,
  ): Promise<Result> {
    const result = await Run([
      this.checkIsUserOwn(follower),
      this.checkIsAlreadyFollowed(follower, following),
    ]);

    return result;
  }

  public async isUnFollowValid(
    follower: string,
    following: string,
  ): Promise<Result> {
    const result = await Run([
      this.checkIsUserOwn(follower),
      this.checkIsAlreadyUnFollowed(follower, following),
    ]);

    return result;
  }
}
