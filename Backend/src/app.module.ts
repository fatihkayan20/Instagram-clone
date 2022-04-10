import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { FollowModule } from './follow/follow.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:HzDiqH2kJS4dS9Vm@cluster0.s2yox.mongodb.net/db?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot(),
    PostModule,
    CommentModule,
    LikeModule,
    UserModule,
    ImageModule,
    AuthModule,
    UtilitiesModule,
    FollowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
