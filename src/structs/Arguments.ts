import { GuildMember, Message } from "discord.js";

export async function parseArgs(msg: Message, args?: any) {
  if (msg.mentions.users.first()) return msg.guild?.members.cache.get(msg.mentions.users.first()!.id);

  if (/^\d+$/.test(args[0])) {
    if (msg.guild?.members.cache.get(args[0]) == null) return msg.channel.send("test.")

    return msg.guild.members.cache.get(args[0]);
  }

  // @TODO: get everyone from guild with name given.
}
