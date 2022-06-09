import { Phoenix } from "@structs/index";
import { Guild } from "discord.js";
import client from "../index";
import { prisma } from "./Logger";

export interface GuildType {
  id: string;
}

export class PhoenixGuild {
  public client: Phoenix;
  public id: string;
  constructor() {
    this.client = client;
    this.id = "";
  }

  async createGuild(guild: Guild): Promise<unknown> {
    const has = await client.prisma.guild.findFirst({
      where: {
        id: guild.id
      }
    });

    if(has) return;

    prisma("prisma:createGuild", `Creating new guild with ID: ${guild.id}`);
    await client.prisma.guild.create({
      data: {
        id: guild.id
      }
    })
  }

  async deleteGuild(guild: Guild): Promise<unknown> {
    const has = await client.prisma.guild.findFirst({
      where: {
        id: guild.id
      }
    });

    if(!has) return;

    prisma("prisma:guildDelete", `Deleting entry for guild ID: ${guild.id}`);
    await client.prisma.guild.delete({
      where: {
        id: guild.id
      }
    })
  }

  async findGuild(guild: Guild): Promise<unknown> {
    const g = await client.prisma.guild.findFirst({
      where: {
        id: guild.id
      }
    });

    if(!g) return this.createGuild(guild);

    this.id = g.id;

    return g;
  }
}

