import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async storeToken(token: string, userId: string) {
    const savedToken = await this.prisma.token.findFirst({
      where: {
        userId,
      },
    });

    if (savedToken) {
      await this.prisma.token.update({
        where: {
          id: savedToken.id,
        },
        data: {
          token,
        },
      });
    } else {
      await this.prisma.token.create({
        data: {
          token,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
  }

  async getToken(userId: string) {
    const token = await this.prisma.token.findFirst({
      where: {
        userId,
      },
    });

    return token.token;
  }

  async refreshToken(bearerToken: string, user: any) {
    const token = bearerToken.split(' ')[1];
    const savedToken = await this.prisma.token.findFirst({
      where: {
        token,
        userId: user.id,
      },
    });

    if (savedToken) {
      const newToken = await this.createJwtToken(user);

      return await this.prisma.token.update({
        where: {
          id: savedToken.id,
        },
        data: {
          token: newToken.token,
        },
      });
    }
    throw new UnauthorizedException();
  }

  async createJwtToken(user: any) {
    const payload = {
      username: user.username,
      email: user.email,
      id: user.id,
    };

    return {
      expiresIn: 3600,
      token: await this.jwtService.sign(payload),
    };
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
