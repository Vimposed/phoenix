import {
  BaseCommandInteraction,
  MessageActionRow,
  MessageActionRowOptions,
  MessageEmbed,
  MessageEmbedOptions,
  TextBasedChannel,
} from 'discord.js';

interface EmbedOptions {
  interaction?: BaseCommandInteraction,
  channel?: TextBasedChannel,
  content?: string,
  embed?: MessageEmbed | MessageEmbedOptions,
  components?: (MessageActionRow | MessageActionRowOptions)[] | undefined;
  hidden?: boolean
}

export function sendEmbed(interaction?: any, channel?: any, content?: any, embed?: any, components?: any, hidden?: any): EmbedOptions | void {
  const options: any = {
    embeds: [{ ...embed }],
    components,
  };

  try {
    if (content) options.content = content;
    if (channel) channel.send(options);

    if (interaction?.deferred || interaction?.replied) {
      return interaction.editReply({
        ...options,
        ...{ ephemeral: hidden }
      });
    } else {
      return interaction!.reply({
        ...options,
        ...{ ephemeral: hidden }
      });
    }
  } catch (e: any) {
    return console.error("sendEmbed", e.stack);
  }
}