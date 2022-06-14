import { Automod } from "@prisma/client";
import { Phoenix } from "@structs/Client";
import { Guild, GuildMember } from "discord.js";

export async function createRole(
  client: Phoenix,
  member: GuildMember,
  guild: Guild,
  config: Automod
): Promise<unknown> {
  if (config && config.muteRole.length >= 1) return;

  const fetched = await guild?.members.fetch(member!.id);
  const position = fetched?.roles.highest.position;

  const findRole = guild?.roles.cache.find((x: any) => x.name === "Muted")!;

  const role = await guild?.roles.create({
    name: "Muted",
    position: position + 1,
    permissions: [],
    color: "DARK_NAVY",
  });

  let mutedRole = findRole ? findRole.id : role.id;

  guild.channels.cache.forEach((c: any) => {
    if (
      c.type === "GUILD_TEXT" &&
      c.permissionsFor(member.id).has("VIEW_CHANNEL") === true &&
      c.id !== config.muteChannel
    ) {
      let len = guild.channels.cache.map((c) => c).length;
      for (let i = 0; i < len; i++) {
        setTimeout(() => {
          c.permissionOverwrites.edit(mutedRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            USE_PUBLIC_THREADS: false,
            USE_PRIVATE_THREADS: false,
            SEND_MESSAGES_IN_THREADS: false,
            SPEAK: false,
            CONNECT: false,
          });
        }, 1000 * i);
      }
    }
  });

  return await client.prisma.automod.update({
    where: {
      id: config.id,
    },
    data: {
      muteRole: mutedRole,
    },
  });
}

export async function applyRole(
  client: Phoenix,
  member: GuildMember,
  guild: Guild,
  config: Automod
): Promise<unknown> {
  return await member.roles.add(config.muteRole);
}
