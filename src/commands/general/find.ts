import { parseArgs } from "@structs/Arguments";
import { Phoenix } from "@structs/Client";
import { Command } from "@structs/Command";
import { Message } from "discord.js";

export default class FndCommand extends Command {
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
    return console.log(await parseArgs(msg, args) as any);
  }
}