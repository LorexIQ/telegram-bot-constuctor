import uPath from '../helpers/uPath';
import type { BotConstructor } from '.bot/root/bot';
import autoImporter from '../helpers/autoImporter';
import type { DefineCustomReturn } from '.bot/types';

const watchedDirectory = uPath.join(__dirname, '..', '..', 'src', 'customs');

export function autoImportCustoms(bot: BotConstructor) {
  bot.getLogger().info('Loading customs files...');
  const customs = autoImporter<DefineCustomReturn>('custom', watchedDirectory, true);

  customs.forEach((custom) => {
    const customConfig = custom.config;
    customConfig.name = custom.name.snakeCase;
    bot.addCustom(customConfig.name, customConfig);
  });
}
