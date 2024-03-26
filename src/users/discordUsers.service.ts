import { Injectable, Logger } from '@nestjs/common';
import { DiscordUser } from './discordUser.schema';

@Injectable()
export class DiscordUserService {
  private logger: Logger = new Logger(DiscordUserService.name);
  private users: DiscordUser[] = [];
  save(discordUser: DiscordUser) {
    this.users.push(discordUser);
  }

  findDiscordUser(id: string): DiscordUser {
    const foundUser = this.users.find((u) => u.userId == id);
    return foundUser;
  }
}
