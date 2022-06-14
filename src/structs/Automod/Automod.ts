import { Phoenix } from "@structs/Client";
import { Guild, GuildMember } from "discord.js";
import { Automod as AutomodPrisma } from "@prisma/client";
import { createRole, mute } from "./index";

export class Automod {
  public client: Phoenix;
  public config: AutomodPrisma;
  constructor(client: Phoenix) {
    this.client = client;
    // @ts-ignore this doesn't matter
    this.config = {};
  }

  async getConfig() {
    const conf = (await this.client.prisma.automod.findFirst({
      where: {
        settingsId: this.client.settings.id,
      },
    })) as AutomodPrisma;

    if (!conf)
      await this.client.prisma.automod.create({
        data: {
          settingsId: this.client.settings.id,
        },
      });

    this.config = conf;

    return conf;
  }

  async createRole(guild: Guild, member: GuildMember) {
    await this.getConfig();
    return await createRole(this.client, member, guild, this.config);
  }

  async applyRole(member: GuildMember) {
    await this.getConfig();
    if (!this.config) return;

    return await member.roles.add(this.config.muteRole);
  }

  async mute(guild: Guild, member: GuildMember) {
    await this.getConfig();
    console.log(this.config);
    if (!this.config) return;

    return await mute(member, guild, this.config);
  }
}
