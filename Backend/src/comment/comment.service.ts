import { REQUEST } from '@nestjs/core';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SuccessDataResult } from './../core/result/SuccessDataResult';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { ITokenData } from 'src/auth/entities/token-data.entity';

@Injectable({ scope: Scope.REQUEST })
export class CommentService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private request: Request,
  ) {}

  async create(comment: CreateCommentDto) {
    const tokenData: ITokenData = (await this.request.user) as ITokenData;

    const createdComment = await this.prisma.comment.create({
      data: {
        content: comment.content,
        user: {
          connect: {
            id: tokenData.id,
          },
        },
        post: {
          connect: {
            id: comment.postId,
          },
        },
      },
    });
    return new SuccessDataResult(
      createdComment,
      'Comment created successfully',
    );
  }

  findAll() {
    return "this.comment.find().populate('user').populate('post');";
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
