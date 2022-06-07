import { Phoenix, SlashCommand } from "@structs/index";
import { sendEmbed } from "@types";
import { BaseCommandInteraction, MessageEmbed } from 'discord.js';

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

  public async run(client: Phoenix, interaction: BaseCommandInteraction): Promise<void> {
    const embed = new MessageEmbed()
    .setTitle("About me")
    .setDescription("Hello my name is Pheonix.");
    
    interaction.reply({ embeds: [embed] })
  }
}