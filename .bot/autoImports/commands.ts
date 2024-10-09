import { join } from 'node:path';
import type { BotConstructor } from '.bot/root/bot';
import autoImporter from '../helpers/autoImporter';
import type { DefineCommandReturn } from '.bot/types';
import userNotary from '.bot/helpers/userNotary';

const watchedDirectory = join(__dirname, '..', '..', 'src', 'commands');

export function autoImportCommands(bot: BotConstructor) {
  const commands = autoImporter<DefineCommandReturn>('command', watchedDirectory);

  commands.forEach(command => bot.command(command.name!, async (ctx, next) => {
    await userNotary(bot, ctx, command.config!.isAuthRequired);
    await command.config!.handler(bot, ctx, next);
  }));

  bot.api.setMyCommands(
    commands
      .filter(command => command.config!.addToMenu)
      .map(command => ({
        command: command.name!,
        description: command.config!.description
      }))
  ).then();
}
