import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { CronJob } from "cron";

import config from "./config";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
if (typeof TELEGRAM_TOKEN !== "string") {
  console.error("There is no TELEGRAM_TOKEN");
  process.exit(1);
}
const TELEGRAM_USER_ID = Number(process.env.TELEGRAM_USER_ID);
if (TELEGRAM_USER_ID === 0) {
  console.error("There is no TELEGRAM_USER_ID");
  process.exit(1);
}

const CRON_TIME = process.env.CRON_TIME;
if (typeof CRON_TIME !== "string") {
  console.error("There is no CRON_TIME");
  process.exit(1);
}

const start = async () => {
  console.log("Running check");
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
          TELEGRAM_USER_ID,
          `Regexp failed. Errors: ${errors
            .map((error) => `"${error}"`)
            .join(", ")}.`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        bot.sendMessage(
          TELEGRAM_USER_ID,
          `Automatic check failed. Error: "${error.message}".`
        );
      }
    }
    console.log("Check finished");
  }
};

const job = new CronJob(CRON_TIME, function () {
  start();
});

job.start();
