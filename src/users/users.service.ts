import * as bcrypt from 'bcrypt';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserResponseDto } from './user.schema';
import { LoginUserDto } from './dtos/loginUser.dto';
import { GetUserDto } from './dtos/getUser.dto';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);
  private users: User[] = [];
  private usesCount = 0;
  async save(user: CreateUserDto) {
    this.logger.debug({ user });
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
  async validUser(user: LoginUserDto): Promise<UserResponseDto> {
    this.logger.debug({ user, test: 2 });
    const foundUser = this.users.find((u) => u.email == user.email);
    this.logger.log({ foundUser, user });
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
    delete foundUser.passwd;
    const filteredResult = foundUser as UserResponseDto;
    return filteredResult;
  }
  findAll(): UserResponseDto[] {
    // const result = this.users as UserResponseDto[];
    // return result;
    return this.users.map((u) => ({
      userId: u.userId,
      age: u.age,
      email: u.email,
    }));
  }
  findUser(dto: GetUserDto): UserResponseDto {
    const foundUser = this.users.find((u) => u.userId == dto.userId);
    if (!foundUser) {
      throw new NotFoundException({
        message: `user with userId ${dto.userId} not found`,
        userId: dto.userId,
      });
    }
    const filteredResult = foundUser as UserResponseDto;
    delete foundUser.passwd;
    return filteredResult;
  }
}
