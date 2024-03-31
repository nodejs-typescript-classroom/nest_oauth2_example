import { Exclude } from 'class-transformer';

export class User {
  userId: number;
  email: string;
  age: number;
  @Exclude()
  passwd: string;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
