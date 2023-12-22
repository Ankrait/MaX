import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  static accessKey = 'access-token';
  static refreshKey = 'refresh-token';

  setTokens(res: Response, refresh: string) {
    res.cookie(CookieService.refreshKey, refresh, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });
  }

  removeToken(res: Response) {
    res.clearCookie(CookieService.refreshKey);
  }
}
