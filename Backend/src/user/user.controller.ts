import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const res = this.userService.create(createUserDto);
    return res;
  }

  @Get(':id/follow')
  @UseGuards(AuthGuard)
  async follow(@Param('id') id: string) {
    const res = await this.userService.follow(id);
    if (!res.success) {
      throw new BadRequestException(res);
    }
    return res;
  }

  @Get(':id/unfollow')
  @UseGuards(AuthGuard)
  async unFollow(@Param('id') id: string) {
    const res = await this.userService.unFollow(id);
    if (!res.success) {
      throw new BadRequestException(res);
    }
    return res;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
