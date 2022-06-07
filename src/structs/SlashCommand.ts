import {
  ApplicationCommandOptionData,
  BaseCommandInteraction,
  ApplicationCommandType,
  PermissionString,
} from 'discord.js';

import { Role } from "@prisma/client";

import client from "../index";
import { Phoenix } from "@structs/index";
import { SlashCommands } from "@types";

export class SlashCommand implements SlashCommands {
  public client: Phoenix;
  public name: string;
  public description: string;
  public type: ApplicationCommandType;
  public options: ApplicationCommandOptionData[];
  public defaultPermission: boolean;
  public userPermission?: Role;
  public permission?: PermissionString;
  public cooldown?: number;
  constructor(options: SlashCommands) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.type = options.type;
    this.options = options.options;
    this.defaultPermission = options.defaultPermission;
    this.userPermission = options.userPermission;
    this.permission = options.permission;
    this.cooldown = options.cooldown;
  }

  // @ts-ignore
  public async run(client: Phoenix, interaction: BaseCommandInteraction): Promise<boolean>;
}