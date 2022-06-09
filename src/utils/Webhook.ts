import { MessageEmbed, MessageEmbedOptions, TextChannel } from "discord.js";
import { Phoenix } from "@structs/Client";
import client from "../index";

export class Webhook {
    public client: Phoenix;
    constructor() {
        this.client = client;
    }

    private create(channel: TextChannel, name: string, avatar: string, reason?: string) {
      channel.createWebhook(name, {
        avatar: avatar,
        reason: "Webhook created for logging."
      });
    }

    public async send(embed?: MessageEmbed | MessageEmbedOptions, type?: string, channels?: string, message?: string) {
      const channel = client.channels.cache.get(channels as string) as TextChannel;
      const webhooks = await channel.fetchWebhooks();
      if(!webhooks.first()) return this.create(channel, client.user!.username, client.user!.avatarURL() as string)
      const webhook = webhooks.first();
      switch(type) {
        case "embed":
          await webhook!.send({
            embeds: [embed as MessageEmbed | MessageEmbedOptions]
          });
        case "message":
          await webhook!.send({ content: message as string });
      }
    }
}