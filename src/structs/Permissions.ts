import { Phoenix } from "./index";
import { Message, Permissions } from "discord.js";

interface PermType {
  name?: string;
  role?: string;
  perms?: string[];
  inherit?: boolean;
}

let values: any = {}
values = Permissions.FLAGS;
values = Object.keys(values);

export async function createPermission(client: Phoenix, msg: Message, options: PermType) {
  let findRole;
  let perms;

  if(options.role !== undefined) {
    findRole = msg.guild!.roles.cache.find(x => x.name === options.role);
  }
  
  if(typeof options.perms === "object" ? (options.perms as any).every((x: any) => values.includes(x)) : values.includes(options.perms)) {
    perms = options.perms;
  } else {
    return msg.channel.send({ content: `I was unable to find the ${typeof options.perms === "object" ? "permissions" : "permission"} provided.` });
  }

  await client.prisma.customPerms.create({
    data: {
      name: options.name!,
      role: findRole?.id || "",
      perms: perms || [],
      inherit: options.inherit || false,
      guildId: msg.guild!.id
    }
  })
}
