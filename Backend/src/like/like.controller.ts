import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GetUserInfo } from 'src/guards/auth.guard';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get(':postId/:page')
  @UseGuards(GetUserInfo)
  async getLikes(@Param('postId') postId: string, @Param('page') page: string) {
    const res = await this.likeService.getPostLikes(postId, +page);
    if (!res.success) {
      throw new BadRequestException(res);
    }
    return res;
  }
}
