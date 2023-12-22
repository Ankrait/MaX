import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto, SessionDto } from './dto';
import { CookieService } from './cookie.service';
import { Response } from 'express';
import { SessionInfo } from './session.decorator';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token } = await this.authService.login(body);

    this.cookieService.setTokens(res, token);
  }

  @Post('registration')
  async registration(
    @Body() body: RegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token } = await this.authService.registration(body);

    this.cookieService.setTokens(res, token);
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get('session')
  @UseGuards(AuthGuard)
  getSession(@SessionInfo() session: SessionDto) {
    return session;
  }
}
