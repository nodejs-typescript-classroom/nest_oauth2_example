export class User {
  constructor(
    readonly userId: number,
    readonly email: string,
    public passwd: string,
    readonly age: number,
  ) {}
}

export type UserResponseDto = Omit<User, 'passwd'>;
