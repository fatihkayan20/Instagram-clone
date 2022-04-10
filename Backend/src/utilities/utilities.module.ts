import { PrismaModule } from 'src/prisma/prisma.module';
import { FollowUtilitiesService } from './follow-utilities.service';
import { Module } from '@nestjs/common';
import { UserUtilitiesService } from './user-utilities.service';

@Module({
  imports: [PrismaModule],
  providers: [UserUtilitiesService, FollowUtilitiesService],
  exports: [UserUtilitiesService, FollowUtilitiesService],
})
export class UtilitiesModule {}
