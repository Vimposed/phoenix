import { Phoenix } from "@structs/Client";
import { Command } from "@structs/Command";
import { Message } from "discord.js";

export default class PingCommand extends Command {
  constructor(client: Phoenix) {
    super({
      client,
      name: "ping",
      alias: [],
      description:
        "Get the current latency of the bot, from the bot to discord in MS.",
    });
  }

  async run(
    client: Phoenix,
    msg: Message<boolean>,
    args?: any
  ): Promise<unknown> {
    const timestamp = (await msg.channel!.send("Pinging...")) as Message;
    // prettier-ignore
    return timestamp.edit(`Pong!\nBOT: ${timestamp.createdTimestamp - msg.createdTimestamp}ms \nWS: ${client.ws.ping} ms`);
  }
}
