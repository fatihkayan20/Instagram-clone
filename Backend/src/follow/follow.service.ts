import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FollowUtilitiesService } from 'src/utilities/follow-utilities.service';

@Injectable()
export class FollowService {
  constructor(
    private followUtilities: FollowUtilitiesService,
    private prisma: PrismaService,
  ) {}

  async followUser({ follower, following }) {
    const result = await this.followUtilities.isFollowValid(
      follower,
      following,
    );
    if (result.success) {
      return this.prisma.follow.create({
        data: {
          follower: {
            connect: {
              id: follower,
            },
          },
          following: {
            connect: {
              id: following,
            },
          },
        },
      });
    }
    throw new BadRequestException(result);
  }

  async unFollowUser({ follower, following }) {
    const result = await this.followUtilities.isUnFollowValid(
      follower,
      following,
    );
    if (result.success) {
      return this.prisma.follow.deleteMany({
        where: {
          followerId: follower,
          followingId: following,
        },
      });
    }
    throw new BadRequestException(result);
  }
}
