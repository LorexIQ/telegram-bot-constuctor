import uPath from '../helpers/uPath';
import type { BotConstructor } from '.bot/root/bot';
import autoImporter from '../helpers/autoImporter';
import type { DefineCronReturn } from '.bot/types';
import { CronJob } from 'cron';

const watchedDirectory = uPath.join(__dirname, '..', '..', 'src', 'cron');

export function autoImportCrones(bot: BotConstructor) {
  bot.getLogger().info('Loading crones files...');
  const crones = autoImporter<DefineCronReturn>('cron', watchedDirectory, true);

  crones.forEach((cron) => {
    const cronConfig = cron.config;

    cronConfig.name = cron.name.snakeCase;
    bot.addCrone(cronConfig.name, CronJob.from({
      cronTime: cronConfig.time,
      runOnInit: cronConfig.runOnInit,
      onTick: async () => await cronConfig.handler(bot),
      start: true
    }));
  });
}
