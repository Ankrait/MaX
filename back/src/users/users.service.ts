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

  async getAllBySubLogin(subString: string) {
    return (await this.dbService.user.findMany()).filter(u =>
      u.login.includes(subString),
    );
  }

  async setUserInfo(data: SetUserInfoDto) {
    const { id, ...info } = data;
    return await this.dbService.user.update({ where: { id }, data: info });
  }

  async create(data: {
    email: string;
    login: string;
    hash: string;
    salt: string;
  }) {
    return await this.dbService.user.create({ data });
  }
}
