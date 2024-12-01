import uPath from '../helpers/uPath';
import type { BotConstructor } from '.bot/root/bot';
import autoImporter from '../helpers/autoImporter';
import type { DefineCommandReturn } from '.bot/types';
import userNotary from '.bot/helpers/userNotary';
import type { Context, NextFunction } from 'grammy';

const watchedDirectory = uPath.join(__dirname, '..', '..', 'src', 'commands');

export function autoImportCommands(bot: BotConstructor) {
  bot.getLogger().info('Loading commands files...');
  const commands = autoImporter<DefineCommandReturn>('command', watchedDirectory, true);
  const emptyMiddleware = async (_: Context, next: NextFunction) => await next();

  commands.forEach((command) => {
    const commandConfig = command.config;
    if (!commandConfig.command) commandConfig.command = command.name.snakeCase;
    const middlewares = commandConfig.middleware.map((middleware) => {
      const loadedMiddleware = bot.getMiddlewareByName(middleware)?.interceptor.bind(undefined, bot);

      if (loadedMiddleware) {
        return loadedMiddleware;
      } else {
        bot.getLogger().warn(`Middleware '${middleware}' in command '${command.name.camelCase}' was not found. It will be skipped.`);
        return emptyMiddleware;
      }
    });
    const handler = async (ctx: any, next: any) => {
      await userNotary(bot, ctx, commandConfig.isAuthRequired);
      await commandConfig.handler(bot, ctx, next);
    };

    if (typeof commandConfig.command === 'string') {
      bot.command(
        commandConfig.command,
        ...middlewares,
        handler
      );
    } else {
      bot.hears(
        commandConfig.command,
        ...middlewares,
        handler
      );
    }

    bot.addCommand(command.name.snakeCase, commandConfig);
  });

  bot.api.setMyCommands(
    commands
      .filter(command => command.config.addToMenu)
      .map(command => ({
        command: command.name.snakeCase,
        description: command.config.description
      }))
  ).then();
}
