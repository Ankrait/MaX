import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsersByName(@Query('name') name: string) {
    const user = await this.userService.getByLogin(name);

    if (!user) throw new BadRequestException('Нет пользователя');

    return user.id;
  }
}
