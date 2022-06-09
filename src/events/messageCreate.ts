import { Phoenix } from "@structs/Client";
import { createPermission } from "@structs/Permissions";
import { Message, MessageEmbedOptions } from "discord.js";

exports.run = async function (client: Phoenix, msg: Message): Promise<void> {
  if (msg.author.bot || msg.author.id === client.user!.id || msg.channel.type === "DM") return;

  await client.phoenixUser.findUser(msg.member!);
  await client.phoenixGuild.findGuild(msg.guild!);

  const command = msg.content.slice(client.config.prefix.length).toLowerCase().split(/\s+/)[0];
  const cmd = client.commands.get(command);
  const args = msg.content.split(' ').splice(1);

  if(cmd?.userPermission) {
    if(client.phoenixUser.role !== "DEV" && cmd.userPermission === "DEV") {
      return client.logger("warn", "events:messageCreate", "Command was trying to be executed without permission.");
    }
  }

  cmd?.run(client, (msg as any), args);
}
