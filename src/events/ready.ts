import { Phoenix } from "@structs/Client";

exports.run = async function (client: Phoenix) {
  client.logger("info", "client", `Pheonix is online and ready, connected to ${client.guilds.cache.size} guil${client.guilds.cache.size <= 2 ? "d" : "ds"}`);

  client.user!.setActivity({ name: "?help" });
  client.guilds.cache.forEach((g) => g.members.fetch());

  const cmds = client.slashCommands.map(c => c);

  client.application!.commands
    .set(cmds)
    .then(() => client.logger("info", "Interactions", "Loaded application commands successfully"))
    .catch(e => client.logger("error", "Interactions", e.stack));

  client.application!.commands.fetch().then(async commands => {
    await commands.reduce(async (a, command) => {
      await a;
      if (command.name === 'reload') {
        client.application!.commands.delete(command.id);
        client.logger("info", "Interactions", `Deleting command ${command.name} - ${command.id}`);
      }
    }, Promise.resolve());
  });
}
