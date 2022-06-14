import { parseArgs } from "@structs/Arguments";
import { Phoenix } from "@structs/Client";
import { Command } from "@structs/Command";
import { Message, MessageEmbed } from "discord.js";

export default class FindCommand extends Command {
  constructor(client: Phoenix) {
    super({
      client,
      name: "find",
      alias: [],
      description: "Find a user in the guild by username, id, or mention.",
    });
  }

  async run(client: Phoenix, msg: Message, args?: any): Promise<unknown> {
    const mem = await parseArgs(msg, args);
    const user = msg.guild?.members.cache.get(mem!.id);

    if (!user) {
      return msg.channel.send("Please provide a member!");
    }
  }
}
