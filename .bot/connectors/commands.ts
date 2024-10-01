import { join } from 'node:path';
import type { BotConstructor } from '.bot/root/bot';
import type { DefineCommandReturn } from '.bot/types';
import userNotary from '.bot/helpers/userNotary';
import filesReader from '.bot/helpers/filesReader';

const watchedDirectory = join(__dirname, '..', '..', 'src', 'commands');

export function autoImportCommands(bot: BotConstructor) {
  const commandsCache: string[] = [];

  const commands = filesReader(watchedDirectory, true)
    .map<[string, DefineCommandReturn | undefined]>((filePath) => {
      const fileLoaded = require(filePath).default as DefineCommandReturn;

      if (fileLoaded?.type !== 'command') return ['error_load', undefined];

      const prefix = filePath
        .slice(watchedDirectory.length + 1)
        .split('\\')
        .slice(0, -1)
        .map(directory => directory.toLowerCase())
        .join('_');
      let commandName = filePath
        .split('\\')
        .at(-1)!
        .split('.')
        .slice(0, -1)
        .join('.')
        .toLowerCase();

      if (commandName === 'index') commandName = prefix;
      else if (prefix) commandName = `${prefix}_${commandName}`;
      if (commandsCache.includes(commandName)) return ['name_duplicate', undefined];
      else commandsCache.push(commandName);

      bot.command(commandName, async (ctx, next) => {
        await userNotary(bot, ctx, fileLoaded.isAuthRequired);
        await fileLoaded.handler(bot, ctx, next);
      });

      return [commandName, fileLoaded];
    });

  bot.api.setMyCommands(
    commands
      .filter(config => config[1] && config[1].addToMenu)
      .map(config => ({
        command: config[0],
        description: config[1]!.description
      }))
  ).then();
}
