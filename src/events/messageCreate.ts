import { Phoenix } from "@structs/Client";
import { createPermission } from "@structs/Permissions";
import { Message, MessageEmbedOptions } from "discord.js";

exports.run = async function (client: Phoenix, msg: Message): Promise<void> {
  if (msg.author.bot || msg.author.id === client.user!.id || msg.channel.type === "DM") return;

  await client.phoenixUser.findUser(msg.member!);
  await client.phoenixGuild.findGuild(msg.guild!);

  // await createPermission(client, msg, {
  //   name: "test",
  //   command: "find",
  //   role: "Mods",
  //   perms: ["CHANGE_NICKNAME", "KICK_MEMBERS"]
  // });

  await createPermission(client, msg, {
    name: "testers",
    command: "ping",
    parent: "test"
  });

  const command = msg.content.slice(client.config.prefix.length).toLowerCase().split(/\s+/)[0];
  const cmd = client.commands.get(command);
  const args = msg.content.split(' ').splice(1);

  if(cmd?.userPermission) {
    if(client.phoenixUser.role !== "DEV" && cmd.userPermission === "DEV") {
      return client.logger("warn", "events:messageCreate", "Command was trying to be executed without permission.");
    }
  }

  const permissions = await client.prisma.customPerms.findFirst({
    where: {
      guildId: msg.guild!.id,
      command: cmd?.name
    }
  });

  if(cmd?.name === permissions?.command && permissions?.role || cmd?.name === permissions?.command && permissions?.perms) {
      if(permissions?.perms && !msg.member?.permissions.has(permissions?.perms as any)) {
        return msg.channel.send({ content: "You are missing the required permissions." }) as any;
      }

    if(permissions?.role && !(msg as any).guild.members.cache.get(msg.member!.id).roles.cache.get(permissions.role!)) {
      return msg.channel.send({ content: "You do not have that role." }) as any;
    }
  }

  cmd?.run(client, (msg as any), args);
}
