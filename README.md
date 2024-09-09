# local-regexp-notifier

local-regexp-notifier is a simple library which can be hosted in docker to notify you via telegram when something appears/disappears from the page (local in your network or world wide web).

## Installation

1. Clone the repository
   ```bash
   git clone git@github.com:armata007/local-regexp-notifier.git
   ```
1. cd into the repository
   ```bash
   cd local-regexp-notifier
   ```
1. Copy `.env.example` file to `.env`
   ```bash
   cp .env.example .env
   ```
1. Change values in `.env`
   1. `TELEGRAM_TOKEN` - Create a bot at @botfather in Telegram with `/newbot` command and put generated token here
   1. `TELEGRAM_USER_ID` - This is your user id in telegram
   1. `CRON_TIME` - crontab string (how often you want the checks to run)
   1. `TIMEZONE` - set to your timezone
   1. `ALL_GOOD_CRON_TIME` - crontab string which sends telegram message `All good - local notifier is working in background`. If you want it disabled set it to empty string, for example `ALL_GOOD_CRON_TIME=""`.
1. Copy `config.ts.example` to `config.ts`
   ```bash
   cp config.ts.example config.ts
   ```
1. Change values in `config.ts`. Config is an array of items. Each item consists of:
   1. `url` - url which should be checked
   2. `regexps` - array of items to check against page. Each item consists of:
      1. `regexp` - regexp which will trigger Telegram message. If regexp find something it is considered an error.
      2. `message` - user friendly message which will be sent to Telegram

## Usage

To start this run:

```bash
docker-compose up --build
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
