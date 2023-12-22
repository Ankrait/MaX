import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SetUserInfoDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async getByEmail(email: string) {
    return await this.dbService.user.findUnique({ where: { email } });
  }

  async getByLogin(login: string) {
    return await this.dbService.user.findUnique({ where: { login } });
  }

  async getUserInfo(id: number) {
    return await this.dbService.user.findUnique({ where: { id } });
  }

  async setUserInfo(id: number, data: SetUserInfoDto) {
    return await this.dbService.user.update({ where: { id }, data });
  }

  async create(data: {
    email: string;
    login: string;
    hash: string;
    salt: string;
  }) {
    return await this.dbService.user.create({ data });
  }

  async addToken(id: number, token: string) {
    const tok = await this.dbService.token.findUnique({
      where: { userId: id },
    });
    if (!tok) {
      await this.dbService.token.create({
        data: { userId: id, token },
      });
    } else {
      await this.dbService.token.update({
        where: { userId: id },
        data: { token },
      });
    }
  }

  async findToken(token: string) {
    return await this.dbService.token.findFirst({ where: { token } });
  }

  async deleteToken(id: number) {
    await this.dbService.token.delete({ where: { userId: id } });
  }
}
