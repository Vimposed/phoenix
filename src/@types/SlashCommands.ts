import { Role } from "@prisma/client";
import { Phoenix } from "@structs/index";
import { ApplicationCommandOptionData, ApplicationCommandType, PermissionString } from 'discord.js';

export interface SlashCommands {
  client: Phoenix;
  name: string;
  description: string;
  type: ApplicationCommandType;
  options: Array<ApplicationCommandOptionData>;
  defaultPermission: boolean;
  userPermission?: Role;
  permission?: PermissionString;
  cooldown?: number;
}
