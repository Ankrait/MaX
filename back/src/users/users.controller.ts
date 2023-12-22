import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session.decorator';
import { SessionDto } from 'src/auth/dto';
import { SetUserInfoDto, UserInfoDto } from './dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUser(@SessionInfo() session: SessionDto) {
    return await this.userService.getUserInfo(session.id);
  }

  @Put()
  async setUserInfo(
    @SessionInfo() session: SessionDto,
    @Body() body: SetUserInfoDto,
  ): Promise<UserInfoDto> {
    const updatedUser = await this.userService.setUserInfo(session.id, body);
    return {
      id: updatedUser.id,
      age: updatedUser.age,
      city: updatedUser.city,
      sex: updatedUser.sex,
    };
  }
}
