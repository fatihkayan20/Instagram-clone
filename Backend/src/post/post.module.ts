import { FollowModule } from 'src/follow/follow.module';
import { UtilitiesModule } from './../utilities/utilities.module';
import { LikeModule } from './../like/like.module';
import { jwtConstants } from './../auth/constants';
import { ImageModule } from './../image/image.module';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    ImageModule,
    LikeModule,
    UtilitiesModule,
    FollowModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    PrismaModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
