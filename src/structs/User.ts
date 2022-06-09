import { Users, Role } from "@prisma/client";
import { Phoenix } from "@structs/index";
import { GuildMember } from "discord.js";
import client from "../index";
import { log, prisma } from "./Logger";

export interface User {
  id: string;
}

export class User {
  public client: Phoenix;
  public id: string;
  public role: Role;
  constructor() {
    this.client = client;
    this.id = "";
    this.role = Role.NORMAL;
  }

  async createUser(user: GuildMember): Promise<unknown> {
    const has = await client.prisma.users.findFirst({
      where: {
        id: user.id
      }
    });

    if(has) return;

    prisma("prisma:createUser", `Creating new user with ID: ${user.id}`);
    await client.prisma.users.create({
      data: {
        id: user.id
      }
    })
  }

  async findUser(user: GuildMember): Promise<unknown> {
    const mem = await client.prisma.users.findFirst({
      where: {
        id: user.id
      }
    }) as Users;

    if(!mem) return this.createUser(user);

    this.id = mem.id;
    this.role = mem.role as Role;

    return mem;
  }
}

