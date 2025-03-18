import uPath from '../helpers/uPath';
import type { BotConstructor } from '.bot/root/bot';
import autoImporter from '../helpers/autoImporter';
import type { DefineViewReturn } from '.bot/types';

const watchedDirectory = uPath.join(__dirname, '..', '..', 'src', 'views');

export function autoImportViews(bot: BotConstructor) {
  bot.getLogger().info('Loading views files...');
  const views = autoImporter<DefineViewReturn>('view', watchedDirectory, true);

  views.forEach((view) => {
    const viewConfig = view.config;
    viewConfig.name = view.name.snakeCase;
    bot.addView(viewConfig.name, viewConfig);
  });
}
