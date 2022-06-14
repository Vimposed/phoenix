import { Phoenix, SlashCommand } from "@structs/index";
import { BaseCommandInteraction, MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';

export default class SetupCommand extends SlashCommand {
  constructor(client: Phoenix) {
    super({
      client,
      name: 'setup',
      description: 'Easily setup phoenix for your use case.',
      type: 'CHAT_INPUT',
      options: [],
      defaultPermission: true,
    });
  }

  public async run(client: Phoenix, interaction: BaseCommandInteraction): Promise<void> {
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
		);
    await interaction.reply({ components: [row] })
  }
}
