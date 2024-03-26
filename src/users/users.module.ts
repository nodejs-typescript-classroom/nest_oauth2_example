import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalStrategy } from './strategies/local.strategy';
// import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.guard';
import { DiscordAuthGuard } from './guards/discord.guard';
import { DiscordStrategy } from './strategies/discord.strategy';
import { DiscordUserService } from './discordUsers.service';

@Module({
  // imports: [PassportModule],
  providers: [
    UsersService,
    LocalStrategy,
    LocalAuthGuard,
    DiscordAuthGuard,
    DiscordStrategy,
    DiscordUserService,
  ],
  exports: [
    UsersService,
    LocalStrategy,
    LocalAuthGuard,
    DiscordAuthGuard,
    DiscordStrategy,
  ],
})
export class UsersModule {}
