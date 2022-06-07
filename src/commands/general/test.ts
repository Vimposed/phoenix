import { Phoenix, SlashCommand } from "@structs/index";
import { sendEmbed } from "@types";
import { BaseCommandInteraction } from 'discord.js';

export default class TestCommand extends SlashCommand {
  constructor(client: Phoenix) {
    super({
      client,
      name: 'test',
      description: 'testing command',
      type: 'CHAT_INPUT',
      options: [],
      defaultPermission: true,
    });
  }

  public async run(client: Phoenix, interaction: BaseCommandInteraction): Promise<boolean> {
    sendEmbed({
      embed: {
        description: "Testing",
        color: "#000000",
      },
      hidden: true,
      interaction
    });
    return true;
  }
}