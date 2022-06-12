import { SuccessDataResult } from './../core/result/SuccessDataResult';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeUtilitiesService } from 'src/utilities/like-utilities.service';
import { FollowService } from 'src/follow/follow.service';
import { ITokenData } from 'src/auth/entities/token-data.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LikeService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private prisma: PrismaService,
    private likeUtilities: LikeUtilitiesService,
    private followService: FollowService,
    private userService: UserService,
  ) {}

  async getPostLikes(postId: string, page: number) {
    const tokenData: ITokenData = this.request.user as ITokenData;

    const likes = await this.prisma.like.findMany({
      where: {
        postId,
      },
      include: {
        post: {
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        user: {
          include: {
            profileUrl: true,
          },
        },
      },
      skip: (page - 1) * 20,
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const hasNext =
      (await this.prisma.like.count({
        where: {
          postId,
        },
      })) >
      page * 10;

    const likesWithFollowStatus = await Promise.all(
      likes.map(async (like) => {
        const user = like.user;
        const isFollowing = await this.followService.isFollowing(
          tokenData.id,
          user.id,
        );
        const isOwnUser = await this.userService.isOwnUser(user.id);

        return {
          ...like,
          user: {
            ...like.user,
            isFollowing,
            isOwnUser,
          },
        };
      }),
    );

    return new SuccessDataResult(
      {
        likes: likesWithFollowStatus,
        hasNext,
      },
      'Likes fetched successfully',
    );
  }

  async likePost({ userId, postId }) {
    const result = await this.likeUtilities.isLikeValid(userId, postId);

    console.log({ result, userId, postId });
    if (result.success) {
      const likedPost = await this.prisma.like.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });

      return new SuccessDataResult(likedPost, 'Post liked successfully');
    }
    throw new BadRequestException(result);
  }

  async unlikePost({ userId, postId }) {
    const result = await this.likeUtilities.isUnlikeValid(userId, postId);

    if (result.success) {
      const unlikedPost = await this.prisma.like.deleteMany({
        where: {
          userId,
          postId,
        },
      });

      return new SuccessDataResult(unlikedPost, 'Post unliked successfully');
    }
    throw new BadRequestException(result);
  }

  async isLikedPost({ userId, postId }) {
    const isLiked = await this.prisma.like.findMany({
      where: {
        userId,
        postId,
      },
    });

    return isLiked.length > 0;
  }

  async getLikeCount(postId: string) {
    const likeCount = await this.prisma.like.count({
      where: {
        postId,
      },
    });

    return likeCount;
  }
}
