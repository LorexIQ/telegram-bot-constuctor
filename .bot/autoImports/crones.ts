import { join } from 'node:path';
import type { BotConstructor } from '.bot/root/bot';
import autoImporter from '../helpers/autoImporter';
import type { DefineCronReturn } from '.bot/types';
import { CronJob } from 'cron';

const watchedDirectory = join(__dirname, '..', '..', 'src', 'cron');

export function autoImportCrones(bot: BotConstructor) {
  const crones = autoImporter<DefineCronReturn>('cron', watchedDirectory);

  crones.forEach((cron) => {
    const cronConfig = cron.config;

    CronJob.from({
      cronTime: cronConfig.time,
      runOnInit: cronConfig.runOnInit,
      onTick: async () => await cronConfig.handler(bot),
      start: true
    });
  });
}
