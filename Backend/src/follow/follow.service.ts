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

  async getFollowings(follower) {
    const followings = await this.prisma.follow
      .findMany({
        where: {
          followerId: follower,
        },
        include: {
          following: true,
        },
      })
      .then((followings) => followings.map((following) => following.following));

    return followings;
  }

  async isFollowing(follower, following) {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followerId: follower,
        followingId: following,
      },
    });
    console.log({ follow, follower, following });

    return follow != null;
  }
}
