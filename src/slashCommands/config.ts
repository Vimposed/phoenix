import { createPermission, Phoenix, SlashCommand } from "@structs/index";
import { sendEmbed } from "@types";
import { BaseCommandInteraction, Channel, MessageEmbed } from "discord.js";

export default class ConfigCommand extends SlashCommand {
  constructor(client: Phoenix) {
    super({
      client,
      name: "config",
      description: "Configure your server.",
      type: "CHAT_INPUT",
      options: [
        {
          type: "STRING",
          name: "option",
          description: "Configure automod or logs",
          required: false,
        },
        {
          type: "CHANNEL",
          name: "channel",
          description: "Select the channel for automod or logs.",
          required: false,
        },
      ],
      defaultPermission: true,
    });
  }

  public async run(
    client: Phoenix,
    interaction: BaseCommandInteraction
  ): Promise<void> {
    const option = interaction.options.get("option")?.value as string;
    const channel = interaction.options.get("channel")?.value as string;

    if (option === "automod") {
      return interaction.reply({ content: channel });
    }

    const embed = new MessageEmbed()
      .setTitle("About me")
      .setDescription("Hello my name is Pheonix.");

    interaction.reply({ embeds: [embed] });
  }
}
