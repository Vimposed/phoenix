import { Phoenix } from "./index";
import { BaseCommandInteraction, Message, Permissions } from "discord.js";

interface PermType {
  name?: string;
  command?: string;
  role?: string;
  perms?: string[];
  parent?: string;
}

let values: any = {}
values = Permissions.FLAGS;
values = Object.keys(values);

export async function createPermission(client: Phoenix, msg: Message | BaseCommandInteraction, options: PermType) {
  let findRole;
  let perms;

  if(options.role !== undefined) {
    findRole = msg.guild!.roles.cache.find(x => x.name === options.role);
  }
  
  if(typeof options.perms === "object" && options.perms !== undefined ? (options.perms as any).every((x: any) => values.includes(x)) : values.includes(options.perms)) {
    perms = options.perms;
  }

  const find = await client.prisma.customPerms.findFirst({
    where: {
      guildId: msg.guild!.id,
      name: options.name
    }
  });

  if(find) {
    return await client.prisma.customPerms.create({
      data: {
        name: options.name!,
        command: options.command!,
        role: find.role,
        perms: find.perms,
        parent: find.name,
        guildId: msg.guild!.id
      }
    });
  }

  await client.prisma.customPerms.create({
    data: {
      name: options.name!,
      command: options.command!,
      role: findRole?.id || "",
      perms: perms || [],
      parent: options.parent! || "",
      guildId: msg.guild!.id
    }
  });
}
