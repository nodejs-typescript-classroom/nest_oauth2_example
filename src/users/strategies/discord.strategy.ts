import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-discord';
import { DiscordUserService } from '../discordUsers.service';
import { DiscordUser } from '../discordUser.schema';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  private logger: Logger = new Logger(DiscordStrategy.name);
  constructor(
    configService: ConfigService,
    public discordUserService: DiscordUserService,
  ) {
    super({
      clientID: configService.get<string>('DISCORD_CLIENT_ID'),
      clientSecret: configService.get<string>('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get<string>('DISCORD_CALLBACK_URL'),
      scope: ['identify'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: Error, user: any) => void,
  ): Promise<any> {
    this.logger.debug({ accessToken, refreshToken, profile });
    let findUser: DiscordUser | undefined;
    try {
      findUser = this.discordUserService.findDiscordUser(profile.id);
    } catch (error) {
      return done(error, null);
    }
    try {
      if (!findUser) {
        const newUser = new DiscordUser(profile.id, profile.username);
        this.discordUserService.save(newUser);
        return done(null, newUser);
      } else {
        return done(null, findUser);
      }
    } catch (error) {
      this.logger.error({ error });
      return done(error, null);
    }
  }
}
