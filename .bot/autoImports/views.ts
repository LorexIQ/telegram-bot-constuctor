import { join } from 'node:path';
import type { BotConstructor } from '.bot/root/bot';
import autoImporter from '../helpers/autoImporter';
import type { DefineViewReturn } from '.bot/types';

const watchedDirectory = join(__dirname, '..', '..', 'src', 'views');

export function autoImportViews(bot: BotConstructor) {
  const views = autoImporter<DefineViewReturn>('view', watchedDirectory);

  console.log(views);
}
