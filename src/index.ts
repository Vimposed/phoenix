import { owners, Phoenix } from "./structs";

const client = new Phoenix({
  owners, token: process.env.TOKEN
});

client.init();

const main = async () => {
  await client.loadCommands(__dirname + "/commands");
  await client.loadEvents(__dirname + "/events");
}

main();

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

process.on("uncaughtException", err => {
  console.error("Unhandled Exception: ", err);
});

export default client;