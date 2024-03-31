import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './users/dtos/createUser.dto';
import { UsersService } from './users/users.service';
import { LocalAuthGuard } from './users/guards/local.guard';
import { DiscordAuthGuard } from './users/guards/discord.guard';
import { User } from './users/user.schema';

@Controller()
export class AppController {
  private logger: Logger = new Logger(AppController.name);
  constructor(private readonly userService: UsersService) {}
  @UseGuards(DiscordAuthGuard)
  @Get('api/auth/discord')
  async discordAuth() {
    console.log('test');
  }
  @UseGuards(DiscordAuthGuard)
  @Get('api/auth/discord/redirect')
  async redirect(@Request() req) {
    console.log({ user: req.user });
    return req.user;
  }
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('auth/login')
  async login(@Request() req): Promise<User> {
    const result = req.user as User;
    const user = new User(result);
    // this.logger.log({ user });
    return user;
  }
  @Post('auth/register')
  async register(@Body() dto: CreateUserDto) {
    return this.userService.save(dto);
  }
}
