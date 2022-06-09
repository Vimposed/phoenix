import { Phoenix } from "@structs/Client";
import { Guild } from "discord.js";

exports.run = async function(client: Phoenix, guild: Guild) {
  await client.phoenixGuild.deleteGuild(guild!);
}