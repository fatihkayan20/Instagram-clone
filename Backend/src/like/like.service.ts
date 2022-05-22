import { SuccessDataResult } from './../core/result/SuccessDataResult';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeUtilitiesService } from 'src/utilities/like-utilities.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikeService {
  constructor(
    private prisma: PrismaService,
    private likeUtilities: LikeUtilitiesService,
  ) {}

  async likePost({ userId, postId }) {
    const result = await this.likeUtilities.isLikeValid(userId, postId);

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

  create(createLikeDto: CreateLikeDto) {
    return 'This action adds a new like';
  }

  findAll() {
    return `This action returns all like`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
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
