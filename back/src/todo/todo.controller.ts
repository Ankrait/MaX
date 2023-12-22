import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session.decorator';
import { SessionDto } from 'src/auth/dto';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getByUser(@SessionInfo() session: SessionDto) {
    return await this.todoService.getByUser(session.id);
  }

  @Post()
  async create(
    @SessionInfo() session: SessionDto,
    @Body() body: CreateTodoDto,
  ) {
    return await this.todoService.create(session.id, body);
  }

  @Put('/:id')
  async update(
    @SessionInfo() session: SessionDto,
    @Body() body: UpdateTodoDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const todo = await this.todoService.get(id);

    if (todo?.userId !== session.id) {
      throw new BadRequestException('Запись не найдена');
    }

    return await this.todoService.update(id, body);
  }
}
