import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SessionDto } from './dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.headers.authorization;

    if (!token) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    try {
      const sessionInfo = await this.jwtService.verifyAsync<SessionDto>(
        token.toString(),
        {
          secret: process.env.JWT_SECRET,
        },
      );

      req['session'] = sessionInfo;
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
