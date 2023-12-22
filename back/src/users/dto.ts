import { Sex } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class SetUserInfoDto {
  @IsNumber()
  age: number | null;

  @IsString()
  city: string | null;

  @IsEnum(Sex)
  sex: Sex | null;
}

export class UserInfoDto {
  id: number;
  age: number | null;
  city: string | null;
  sex: Sex | null;
}
