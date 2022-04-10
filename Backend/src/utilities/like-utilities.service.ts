import { PrismaService } from 'src/prisma/prisma.service';
import { SuccessResult } from '../core/result/SuccessResult';
import { ErrorResult } from '../core/result/ErrorResult';
import { Result } from '../core/result/Result';
import { Injectable } from '@nestjs/common';
import { Run } from 'src/core/BusinessRules';

@Injectable()
export class LikeUtilitiesService {
  constructor(private prisma: PrismaService) {}

  private async checkIsLikedAlready(
    userId: string,
    postId: string,
  ): Promise<Result> {
    const followData = await this.prisma.like.findFirst({
      where: { userId, postId },
    });
    if (followData) {
      return new ErrorResult('You already liked this post');
    }
    return new SuccessResult();
  }

  private async checkIsUnLikedAlready(
    userId: string,
    postId: string,
  ): Promise<Result> {
    const followData = await this.prisma.like.findFirst({
      where: { userId, postId },
    });
    if (!followData) {
      return new ErrorResult('You have not liked this post');
    }
    return new SuccessResult();
  }

  public async isLikeValid(userId: string, postId: string): Promise<Result> {
    const result = await Run([this.checkIsLikedAlready(userId, postId)]);

    return result;
  }

  public async isUnlikeValid(userId: string, postId: string): Promise<Result> {
    const result = await Run([this.checkIsUnLikedAlready(userId, postId)]);

    return result;
  }
}
