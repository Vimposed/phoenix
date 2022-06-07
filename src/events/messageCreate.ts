import { Phoenix } from "@structs/Client";
import { Message } from "discord.js";

exports.run = async function (client: Phoenix, msg: Message): Promise<void> {
  if (msg.author.bot || msg.author.id === this.client.user.id || msg.channel.type === "DM") return;
}