import { Guild } from "discord.js";
import { Phoenix } from "./index";

export class Settings {
  public client: Phoenix;
  public guildId: string;
  public id: string;
  constructor(client: Phoenix) {
    this.client = client;
    this.id = "";
    this.guildId = "";
  }

  async getSettings(guild: Guild): Promise<unknown> {
    const find = await this.client.prisma.settings.findFirst({
      where: {
        guildId: guild.id,
      },
    });

    if (!find)
      await this.client.prisma.settings.create({
        data: {
          guildId: guild.id,
        },
      });

    this.guildId = guild.id;
    this.id = find!.id;

    return find!;
  }
}
