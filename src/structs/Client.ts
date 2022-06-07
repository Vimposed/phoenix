
require("dotenv").config();

import { PrismaClient } from "@prisma/client";
import { Client, Collection, Intents } from "discord.js";
import { log, prisma as prismaLog, SlashCommand } from "@structs/index";

import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import { Command } from "./Command";

interface Config {
  owners: string | string[],
  prefix: string,
  token: string
}

export class Phoenix extends Client {
  prisma: PrismaClient;
  logger: typeof log;
  prismaLog: typeof prismaLog;
  config: Config;
  owners: string | string[];
  slashCommands: Collection<string, SlashCommand>;
  commands: Collection<string, Command>;
  events: Collection<string, Event>;
  constructor(config: Config) {
    super({
      intents: [Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_WEBHOOKS,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      ],
      partials: ["CHANNEL", "USER", "GUILD_MEMBER"]
    });

    this.prisma = new PrismaClient();
    this.logger = log;
    this.prismaLog = prismaLog;
    this.config = config as Config;
    this.owners = this.config.owners;
    this.slashCommands = new Collection();
    this.commands = new Collection();
    this.events = new Collection();
  }

  async loadCommands(dir: string): Promise<void> {
    const items = await fsPromise.readdir(dir);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const stat = await fsPromise.stat(path.join(dir, item));

      if (stat.isDirectory()) {
        await this.loadCommands(path.join(dir, item));
      } else if (stat.isFile()) {
        delete require.cache[require.resolve(path.join(dir, item))];
        const commandFile = require(path.join(dir, item));
        const command = new commandFile.default(this);
        this.logger("info", "commands", `Loaded command: ${item.split('.')[0]}`);
        this.commands.set(command.name, command);
      }
    }
  }

  async loadSlashCommands(dir: string): Promise<void> {
    const items = await fsPromise.readdir(dir);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const stat = await fsPromise.stat(path.join(dir, item));

      if (stat.isDirectory()) {
        await this.loadCommands(path.join(dir, item));
      } else if (stat.isFile()) {
        delete require.cache[require.resolve(path.join(dir, item))];
        const commandFile = require(path.join(dir, item));
        const command = new commandFile.default(this);
        this.logger("info", "commands", `Loaded slash command: ${item.split('.')[0]}`);
        this.slashCommands.set(command.name, command);
      }
    }
  }

  async loadEvents(dir: string): Promise<void> {
    fs.readdir(`${dir}`, (err, files) => {
      if (err) return console.error(err);
      files.forEach(file => {
        let eventFunction = require(path.join(dir, file));
        let eventName = file.split('.')[0];
        this.logger("debug", "events", `Loaded event: ${eventName}`);
        this.on(eventName, (...args) => eventFunction.run(this, ...args));
      });
    });
  }


  async init() {
    return await this.login(this.config.token);
  }
}

