import { Phoenix } from "@structs/Client";
import { Message } from "discord.js";

exports.run = async function (client: Phoenix, msg: Message): Promise<void> {
  if (msg.author.bot || msg.author.id === client.user!.id || msg.channel.type === "DM") return;

  const command = msg.content.slice(client.config.prefix.length).toLowerCase().split(/\s+/)[0];
  const cmd = client.commands.get(command);
  const args = msg.content.split(' ').splice(1);
  cmd?.run(client, (msg as any), args);
}