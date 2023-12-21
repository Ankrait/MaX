import { Sex } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SetUserInfoDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  age: number | null;

  @IsString()
  city: string | null;

  @IsEnum(Sex)
  sex: Sex;
}
