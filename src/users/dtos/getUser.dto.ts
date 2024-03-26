import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  userId: number;
}
