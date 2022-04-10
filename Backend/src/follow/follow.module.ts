import { PrismaModule } from 'src/prisma/prisma.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';

@Module({
  imports: [PrismaModule, UtilitiesModule],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
