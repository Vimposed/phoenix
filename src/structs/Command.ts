import { Role } from "@prisma/client";

import client from "../index";
import { Phoenix } from "./index";
import { Commands } from "@types";
import { Message, PermissionString } from "discord.js";

export abstract class Command implements Commands {
  public client: Phoenix;
  public name: string;
  public alias: string[];
  public description: string;
  public defaultPermission: boolean;
  public userPermission?: Role;
  public permission?: PermissionString;
  public cooldown?: number;
  constructor(options: Commands) {
    this.client = client;
    this.name = options.name;
    this.alias = options.alias;
    this.description = options.description;
    this.defaultPermission = options.defaultPermission;
    this.userPermission = options.userPermission;
    this.permission = options.permission;
    this.cooldown = options.cooldown;
  }

  abstract run(client: Phoenix, msg: Message, args?: any): Promise<unknown>;
}