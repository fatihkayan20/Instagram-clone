import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    // check if token is valid
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return request;

      // if token is not valid, return false
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class SecondaryAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    // check if token is valid
    try {
      const decoded = this.jwtService.decode(token);
      request.user = decoded;
      return request;

      // if token is not valid, return false
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class GetUserInfo implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    try {
      const decoded = this.jwtService.decode(token);
      request.user = decoded;
      return request;
    } catch (err) {
      return request;
    }
  }
}
