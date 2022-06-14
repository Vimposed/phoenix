import { GuildMember, Guild } from "discord.js";
import { Automod } from "@prisma/client";

export async function mute(
  member: GuildMember,
  guild: Guild,
  config: Automod
): Promise<unknown> {
  return console.log(config);
}
