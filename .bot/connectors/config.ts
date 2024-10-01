import { join } from 'node:path';
import * as fs from 'node:fs';
import type { DefineConfigReturn } from '.bot/types';

const watchedDirectory = join(__dirname, '..', '..');

export function autoImportConfig(): DefineConfigReturn {
  const resultConfig = fs.readdirSync(watchedDirectory)
    .filter(fileName => fileName.endsWith('.js'))
    .map((fileName) => {
      const filePath = join(watchedDirectory, fileName);
      const fileLoaded = require(filePath);
      return fileLoaded.default;
    });

  if (!resultConfig.length) {
    process.exit(1);
  }

  return resultConfig.at(-1)!;
}
