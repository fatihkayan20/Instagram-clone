import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { FollowModule } from 'src/follow/follow.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PrismaModule,
    UtilitiesModule,
    FollowModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
