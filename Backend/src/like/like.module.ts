import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UtilitiesModule } from 'src/utilities/utilities.module';

@Module({
  imports: [PrismaModule, UtilitiesModule],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
