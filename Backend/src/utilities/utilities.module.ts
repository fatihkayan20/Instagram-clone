import { PrismaModule } from 'src/prisma/prisma.module';
import { FollowUtilitiesService } from './follow-utilities.service';
import { Module } from '@nestjs/common';
import { UserUtilitiesService } from './user-utilities.service';
import { LikeUtilitiesService } from './like-utilities.service';

@Module({
  imports: [PrismaModule],
  providers: [
    UserUtilitiesService,
    FollowUtilitiesService,
    LikeUtilitiesService,
  ],
  exports: [UserUtilitiesService, FollowUtilitiesService, LikeUtilitiesService],
})
export class UtilitiesModule {}
