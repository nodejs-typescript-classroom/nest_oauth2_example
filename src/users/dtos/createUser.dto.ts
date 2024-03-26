import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  passwd: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  age: number;
}
