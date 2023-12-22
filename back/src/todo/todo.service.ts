import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private readonly dbService: DbService) {}

  async get(id: number) {
    return await this.dbService.todo.findUnique({ where: { id } });
  }

  async getByUser(userId: number) {
    return await this.dbService.todo.findMany({ where: { userId } });
  }

  async create(userId: number, dto: CreateTodoDto) {
    return await this.dbService.todo.create({ data: { userId, ...dto } });
  }

  async update(id: number, dto: UpdateTodoDto) {
    return await this.dbService.todo.update({ where: { id }, data: dto });
  }

  async delete(id: number) {
    await this.dbService.todo.delete({ where: { id } });
  }
}
