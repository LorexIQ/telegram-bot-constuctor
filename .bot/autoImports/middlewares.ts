import uPath from '../helpers/uPath';
import type { BotConstructor } from '.bot/root/bot';
import autoImporter from '../helpers/autoImporter';
import type { DefineMiddlewareReturn } from '.bot/types';

const watchedDirectory = uPath.join(__dirname, '..', '..', 'src', 'middlewares');

export function autoImportMiddlewares(bot: BotConstructor) {
  bot.getLogger().info('Loading middlewares files...');
  const middlewares = autoImporter<DefineMiddlewareReturn>('middleware', watchedDirectory, true);

  middlewares.forEach((middleware) => {
    const middlewareConfig = middleware.config;

    if (middlewareConfig.isGlobal) bot.use(middlewareConfig.interceptor.bind(undefined, bot));

    bot.addMiddleware(middleware.name.snakeCase, middlewareConfig);
  });
}
