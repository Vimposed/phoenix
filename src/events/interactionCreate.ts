import { Phoenix } from "@structs/index";
import { BaseCommandInteraction } from "discord.js";

exports.run = async function (client: Phoenix, interaction: BaseCommandInteraction) {
  if (interaction.isCommand()) {
    const slashCommand = client.slashCommands.find(c => c.name === interaction.commandName);

    if (!slashCommand) {
      await interaction.reply({
        content: 'An error has occurred',
        ephemeral: true,
      });
      client.logger("error", "events:interactionCreate", `interactionCreate ${interaction.commandName}: Not a registered command`);
      return false;
    }

    slashCommand.run(client, (interaction as any));
  }
}
