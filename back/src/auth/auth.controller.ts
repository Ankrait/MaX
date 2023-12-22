import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto, SessionDto } from './dto';
import { CookieService } from './cookie.service';
import { Response, Request } from 'express';
import { SessionInfo } from './session.decorator';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, refresh } = await this.authService.login(body);

    this.cookieService.setTokens(res, refresh);
    return { token };
  }

  @Post('registration')
  async registration(
    @Body() body: RegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, refresh } = await this.authService.registration(body);

    this.cookieService.setTokens(res, refresh);
    return { token };
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  logout(
    @SessionInfo() session: SessionDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.cookieService.removeToken(res);
    this.usersService.deleteToken(session.id);
  }

  @Get('session')
  @UseGuards(AuthGuard)
  getSession(@SessionInfo() session: SessionDto) {
    return session;
  }

  @Get('refresh')
  async gerRefresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const refresh = req.cookies[CookieService.refreshKey];

    if (!refresh) {
      throw new UnauthorizedException();
    }

    const user = await this.jwtService.verifyAsync(refresh);
    const tokenFromDb = await this.usersService.findToken(refresh);
    if (!user || !tokenFromDb) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        login: user.login,
        email: user.email,
      },
      { expiresIn: '30m' },
    );

    const newRefresh = await this.jwtService.signAsync({
      id: user.id,
      login: user.login,
      email: user.email,
    });

    this.cookieService.setTokens(res, newRefresh);
    return { token };
  }
}
