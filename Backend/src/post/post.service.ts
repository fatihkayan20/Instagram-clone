import { SuccessDataResult } from './../core/result/SuccessDataResult';
import { ImageService } from './../image/image.service';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ITokenData } from 'src/auth/entities/token-data.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeService } from 'src/like/like.service';
import { FollowService } from 'src/follow/follow.service';

@Injectable({ scope: Scope.REQUEST })
export class PostService {
  constructor(
    private imageService: ImageService,
    @Inject(REQUEST) private request: Request,
    private prisma: PrismaService,
    private likeService: LikeService,
    private followService: FollowService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    images: Array<Express.Multer.File>,
  ) {
    const tokenData: ITokenData = (await this.request.user) as ITokenData;

    const savedImages = await this.imageService.upload(images);

    const savedPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        user: {
          connect: {
            id: tokenData.id,
          },
        },
        images: {
          create: savedImages.map((image) => ({
            url: image.url,
          })),
        },
      },
      include: {
        user: true,
        images: true,
      },
    });

    return new SuccessDataResult(
      savedPost,

      'Post created successfully',
    );
  }

  async findAll() {
    const tokenData: ITokenData = this.request.user as ITokenData;
    const followingUsers = await this.followService.getFollowings(tokenData.id);

    const followingIds = followingUsers.map((user) => user.id);

    const posts = await this.prisma.post.findMany({
      where: {
        userId: {
          in: [...followingIds, tokenData.id],
        },
      },
      include: {
        user: true,
        images: true,
        likes: true,
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new SuccessDataResult(posts, 'Posts fetched successfully');
  }
  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    // .populate('user')
    // .populate('comments')
    // .populate('likes')
    // .populate('images');
    return new SuccessDataResult(post, 'Post fetched successfully');
  }

  async likePost(id: string) {
    const tokenData: ITokenData = this.request.user as ITokenData;

    const likedPost = await this.likeService.likePost({
      userId: tokenData?.id,
      postId: id,
    });
    return likedPost;
  }

  async unlikePost(id: string) {
    const tokenData: ITokenData = this.request.user as ITokenData;

    const likedPost = await this.likeService.unlikePost({
      userId: tokenData?.id,
      postId: id,
    });
    return likedPost;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
