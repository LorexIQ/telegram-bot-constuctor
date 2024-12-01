import { join } from 'node:path';
import type { BotConstructor } from '.bot/root/bot';
import autoImporter from '../helpers/autoImporter';
import type { DefineMiddlewareReturn } from '.bot/types';

const watchedDirectory = join(__dirname, '..', '..', 'src', 'middlewares');

export function autoImportMiddlewares(bot: BotConstructor) {
  const middlewares = autoImporter<DefineMiddlewareReturn>('middleware', watchedDirectory);

  middlewares.forEach((middleware) => {
    const middlewareConfig = middleware.config;

    if (middlewareConfig.isGlobal) bot.use(middlewareConfig.interceptor.bind(undefined, bot));

    bot.addMiddleware(middleware.name, middlewareConfig);
  });
}
