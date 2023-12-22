import { IsBoolean, IsString } from 'class-validator';

export class TodoDto {
  id: number;
  text: string;
  done: boolean;
  userId: number;
}

export class CreateTodoDto {
  @IsString()
  text: string;
}

export class UpdateTodoDto {
  @IsString()
  text?: string;

  @IsBoolean()
  done?: boolean;
}
