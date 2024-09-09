import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

import config from "./config";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
if (typeof TELEGRAM_TOKEN !== "string") {
  console.error("There is no TELEGRAM_TOKEN");
  process.exit(1);
}
const USER_ID = process.env.USER_ID;

if (typeof USER_ID !== "number") {
  console.error("There is no USER_ID");
  process.exit(1);
}

const start = async () => {
  const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });
  for (let i = 0; i < config.length; i += 1) {
    const check = config[i];
    try {
      const response = await fetch(check.url);
      const responseText = await response.text();
      const errors: string[] = [];
      for (let j = 0; j < check.regexps.length; j += 1) {
        if (check.regexps[j].regexp.test(responseText)) {
          errors.push(check.regexps[j].message);
        }
      }
      if (errors.length > 0) {
        bot.sendMessage(
          USER_ID,
          `Regexp failed. Errors: ${errors
            .map((error) => `"${error}"`)
            .join(", ")}.`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        bot.sendMessage(
          USER_ID,
          `Automatic check failed. Error: "${error.message}".`
        );
      }
    }
  }
};

start();
