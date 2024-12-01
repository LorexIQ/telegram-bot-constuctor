import { join } from 'node:path';
import type { BotConstructor } from '.bot/root/bot';
import autoImporter from '../helpers/autoImporter';
import type { DefineCommandReturn } from '.bot/types';
import userNotary from '.bot/helpers/userNotary';
import type { Context, NextFunction } from 'grammy';

const watchedDirectory = join(__dirname, '..', '..', 'src', 'commands');

export function autoImportCommands(bot: BotConstructor) {
  const commands = autoImporter<DefineCommandReturn>('command', watchedDirectory);
  const emptyMiddleware = async (_: Context, next: NextFunction) => await next();

  commands.forEach((command) => {
    const commandConfig = command.config;

    bot.command(
      command.name,
      ...commandConfig.middleware.map(middleware => bot.getMiddlewareByName(middleware)?.interceptor.bind(undefined, bot) ?? emptyMiddleware),
      async (ctx, next) => {
        await userNotary(bot, ctx, commandConfig.isAuthRequired);
        await commandConfig.handler(bot, ctx, next);
      }
    );
  });

  bot.api.setMyCommands(
    commands
      .filter(command => command.config.addToMenu)
      .map(command => ({
        command: command.name,
        description: command.config.description
      }))
  ).then();
}
