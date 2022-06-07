import {
  BaseCommandInteraction,
  MessageActionRow,
  MessageActionRowOptions,
  MessageEmbed,
  MessageEmbedOptions,
  TextBasedChannel,
} from 'discord.js';

interface EmbedOptions {
  channel?: TextBasedChannel,
  content?: string,
  embed?: MessageEmbed | MessageEmbedOptions,
  components?: (MessageActionRow | MessageActionRowOptions)[] | undefined;
  hidden?: boolean
  interaction?: BaseCommandInteraction,
}

export async function sendEmbed(channel?: any, content?: any, embed?: any, components?: any, hidden?: any, interaction?: any): Promise<EmbedOptions> {
  const options: any = {
    embeds: [{ ...embed }],
    components
  };

  if (content) options.content = content;
  if (channel) channel.send(options);

  if (interaction?.deferred || interaction?.replied) {
    return await interaction.editReply({
      ...options,
      ...{ ephemeral: hidden }
    });
  } else {
    return await interaction!.reply({
      ...options,
      ...{ ephemeral: hidden }
    });
  }
}