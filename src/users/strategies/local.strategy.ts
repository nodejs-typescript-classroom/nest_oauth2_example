import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger: Logger = new Logger(LocalStrategy.name);
  constructor(private userService: UsersService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, passwd: string): Promise<any> {
    this.logger.debug({ email, passwd });
    const user = await this.userService.validUser({
      email: email,
      passwd: passwd,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
