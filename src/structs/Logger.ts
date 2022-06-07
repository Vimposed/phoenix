import chalk from "chalk";
import dayjs from "dayjs";

interface Options {
  timestamp?: boolean;
}

export async function log(level: string, title: string, msg: string, options?: Options) {
  let timestamp;

  if (level === undefined) {
    return console.error(chalk.red("Level argument is required for Logger."));
  }

  if (title === undefined) {
    return console.error(chalk.red("Title argument is required for Logger."));
  }

  if (msg === undefined) {
    return console.error(chalk.red("Message argument is required for Logger."));
  }

  if (options?.timestamp) {
    timestamp = dayjs(Date.now()).format("HH:mm:ss");
  }

  switch (level) {
    case "info": {
      console.log(chalk.green(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
    case "warn": {
      console.log(chalk.yellow(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
    case "error": {
      console.log(chalk.red(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
    case "debug": {
      console.log(chalk.cyan(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
    case "prisma": {
      console.log(chalk.magenta(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
  }
}

export async function prisma(title: string, msg: string, timestamp?: boolean) {
  return log("prisma", title, msg, { timestamp: timestamp ? timestamp : false });
}
