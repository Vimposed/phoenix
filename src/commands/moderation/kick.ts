import { parseArgs } from "@structs/Arguments";
import { Phoenix } from "@structs/Client";
import { Command } from "@structs/Command";
import { Message } from "discord.js";

export default class KickCommand extends Command {
  constructor(client: Phoenix) {
    super({
      client,
      name: "kick",
      alias: ["boot"],
      description:
        "Kicks a user with the reason specified (and logs it, if set)",
    });
  }

  async run(client: Phoenix, msg: Message, args?: any): Promise<unknown> {
    const member = await parseArgs(msg, args);
    const doneMsg = await msg.channel.send("Processing, please wait...");
    const user = msg.guild?.members.cache.get(member!.id);
    const reason = args[1] ? args[1] : "No reason was provided";

    if (!user) {
      return msg.channel.send("Please provide a member!");
    }

    try {
      await user.kick(reason);
      return doneMsg.edit(
        `Successfully kicked ${user!.user.tag} for ${reason}`
      );
    } catch (e) {
      return doneMsg.edit(`An error occurred. Stack: ${e}`);
    }
  }
}
