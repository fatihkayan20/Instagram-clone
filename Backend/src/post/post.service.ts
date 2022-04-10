import { SuccessDataResult } from './../core/result/SuccessDataResult';
import { ImageService } from './../image/image.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ITokenData } from 'src/auth/entities/token-data.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(
    private imageService: ImageService,
    @Inject(REQUEST) private request: Request,
    private prisma: PrismaService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    images: Array<Express.Multer.File>,
  ) {
    const tokenData: ITokenData = (await this.request.user) as ITokenData;
    console.log({ tokenData });

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

  findAll() {
    return this.prisma.post.findMany({
      include: {
        user: true,
        images: true,
      },
    });
  }
  findOne(id: string) {
    return this.prisma.post.findUnique({ where: { id } });
    // .populate('user')
    // .populate('comments')
    // .populate('likes')
    // .populate('images');
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
