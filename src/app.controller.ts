import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './users/dtos/createUser.dto';
import { UsersService } from './users/users.service';
import { LocalAuthGuard } from './users/guards/local.guard';
import { DiscordAuthGuard } from './users/guards/discord.guard';

@Controller()
export class AppController {
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
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
  @Post('auth/register')
  async register(@Body() dto: CreateUserDto) {
    return this.userService.save(dto);
  }
}
