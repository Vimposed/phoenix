import { createPermission, Phoenix, SlashCommand } from "@structs/index";
import { sendEmbed } from "@types";
import { BaseCommandInteraction, MessageEmbed } from 'discord.js';

export default class PermCommand extends SlashCommand {
  constructor(client: Phoenix) {
    super({
      client,
      name: 'perms',
      description: 'Configure custom permissions for your commands.',
      type: 'CHAT_INPUT',
      options: [
        {
            type: 'BOOLEAN',
            name: 'create',
            description: 'Create a new permission node.',
            required: false,
        },
        {
            type: 'ROLE',
            name: 'role',
            description: 'Select the role that is required for the custom permission.',
            required: false,
        },
        {
            type: 'STRING',
            name: 'name',
            description: 'The name of your permission node.',
            required: false,
        },
        {
          type: 'STRING',
          name: 'parent',
          description: 'The name of your permission node.',
          required: false,
      },
    ],
      defaultPermission: true,
    });
  }

  public async run(client: Phoenix, interaction: BaseCommandInteraction): Promise<void> {
    const create  = interaction.options.get('create')?.value as boolean;
    const role = interaction.options.get('role')?.value as string;
    const name = interaction.options.get('name')?.value as string;
    const parent = interaction.options.get('parent')?.value as string;

    if(create === true && role && name) {
      await createPermission(client, interaction, {
        name: name,
        role: "Mods",
        command: "ping"
      });
    }

    const embed = new MessageEmbed()
    .setTitle("About me")
    .setDescription("Hello my name is Pheonix.");
    
    interaction.reply({ embeds: [embed] })
  }
}