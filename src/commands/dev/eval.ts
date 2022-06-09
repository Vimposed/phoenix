import { parseArgs } from "@structs/Arguments";
import { Phoenix } from "@structs/Client";
import { Command } from "@structs/Command";
import { Message } from "discord.js";

export default class EvalCommand extends Command {
  constructor(client: Phoenix) {
    super({
      client,
      name: "eval",
      alias: [],
      description: "Execute javascript code from discord.",
      defaultPermission: true,
      userPermission: "DEV"
    });
  }
  
  async run(client: Phoenix, msg: Message, args?: any): Promise<unknown> {
    try {
      let toEval = await eval(args[0]);
      if (typeof toEval !== "string") toEval = require("util").inspect(toEval);
      const clean = toEval.replaceAll(client.token, "[REDACTED]");
      return msg.channel.send(`${clean}`);
    } catch (err) {
      return msg.channel.send(`${err}`);
    }
  }
}