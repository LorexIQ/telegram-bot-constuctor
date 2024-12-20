import uPath from '../helpers/uPath';
import type { DefineConfigReturn } from '.bot/types';
import autoImporter from '.bot/helpers/autoImporter';

const watchedDirectory = uPath.join(__dirname, '..', '..');

export function autoImportConfig(): DefineConfigReturn {
  const configs = autoImporter<DefineConfigReturn>('config', watchedDirectory, false)
    .filter(config => config.path.endsWith('bot.config.js'));

  if (!configs.length) {
    process.exit(1);
  }

  return configs.at(-1)!.config!;
}
