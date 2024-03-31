import * as bcrypt from 'bcrypt';
import {
  ClassSerializerInterceptor,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.schema';
import { LoginUserDto } from './dtos/loginUser.dto';
import { GetUserDto } from './dtos/getUser.dto';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);
  private users: User[] = [];
  private usesCount = 0;
  async save(user: CreateUserDto) {
    // this.logger.debug({ user });
    const userId = this.usesCount;
    this.usesCount++;
    const passwd = await bcrypt.hash(user.passwd, 10);
    this.users.push({
      userId: userId,
      email: user.email,
      passwd: passwd,
      age: user.age,
    });
    return userId;
  }
  @UseInterceptors(ClassSerializerInterceptor)
  async validUser(user: LoginUserDto): Promise<User> {
    const foundUser = this.users.find((u) => u.email == user.email);
    if (!foundUser) {
      throw new NotFoundException({
        message: `user with email ${user.email} not found`,
        email: user.email,
      });
    }
    const isMatchPasswd = await bcrypt.compare(user.passwd, foundUser.passwd);
    if (!isMatchPasswd) {
      throw new UnauthorizedException({
        message: 'credential is not authorization',
      });
    }
    return new User(foundUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): User[] {
    return this.users.map((u) => {
      const user = new User(u);
      return user;
    });
  }
  @UseInterceptors(ClassSerializerInterceptor)
  findUser(dto: GetUserDto): User {
    const foundUser = this.users.find((u) => u.userId == dto.userId);
    if (!foundUser) {
      throw new NotFoundException({
        message: `user with userId ${dto.userId} not found`,
        userId: dto.userId,
      });
    }
    return new User(foundUser);
  }
}
