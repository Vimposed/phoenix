import { parseArgs } from "@structs/Arguments";
import { Phoenix } from "@structs/Client";
import { Command } from "@structs/Command";
import { Message } from "discord.js";

export default class FindCommand extends Command {
  constructor(client: Phoenix) {
    super({
      client,
      name: "find",
      alias: [],
      description: "Find a user in the guild by username, id, or mention.",
      defaultPermission: true,
    });
  }
  
  async run(client: Phoenix, msg: Message, args?: any): Promise<unknown> {
    const mem = await parseArgs(msg, args);
    const cached = msg.guild?.members.cache.get(mem!.id);
    return msg.channel.send({ content: `${cached?.user.tag} ${cached?.user.id}` })
  }
}