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
