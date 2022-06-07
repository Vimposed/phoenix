import { Role } from "@prisma/client";
import { Phoenix } from "@structs/index";
import { PermissionString } from 'discord.js';

export interface Commands {
  client: Phoenix;
  name: string;
  alias: string[];
  description: string;
  defaultPermission: boolean;
  userPermission?: Role;
  permission?: PermissionString;
  cooldown?: number;
}
