import { FilesInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const res = await this.postService.create(createPostDto, images);
    if (!res.success) {
      throw new BadRequestException(res);
    }
    return res;
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    const res = await this.postService.findAll();
    if (!res.success) {
      throw new BadRequestException(res);
    }
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.postService.findOne(id);
    if (!res.success) {
      throw new BadRequestException(res);
    }
    return res;
  }

  @UseGuards(AuthGuard)
  @Get(':id/like')
  async likePost(@Param('id') id: string) {
    const res = await this.postService.likePost(id);
    if (!res.success) {
      throw new BadRequestException(res);
    }
    return res;
  }

  @UseGuards(AuthGuard)
  @Get(':id/unlike')
  async unlikePost(@Param('id') id: string) {
    const res = await this.postService.unlikePost(id);
    if (!res.success) {
      throw new BadRequestException(res);
    }
    return res;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
