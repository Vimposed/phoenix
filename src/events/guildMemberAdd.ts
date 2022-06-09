import { Phoenix } from "@structs/Client";
import { GuildMember } from "discord.js";

exports.run = async function(client: Phoenix, member: GuildMember): Promise<void> {
  const guild = member.guild;

  if (member.user.bot) return;

  await client.phoenixUser.findUser(member!);
}