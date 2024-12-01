import fs from 'node:fs';
import { join } from 'node:path';
import type { AutoImporterLoadedReturn, AutoImporterReturn, DefineTypes, RootDefinePathPrefixReturn } from '.bot/types';

function filesReader(path: string, deep = false): string[] {
  const paths: string[] = [];

  if (!fs.existsSync(path)) return [];

  paths.push(...fs
    .readdirSync(path)
    .map(fileName => join(path, fileName))
    .filter((filePath) => {
      if (filePath.endsWith('.js')) {
        return true;
      } else if (fs.lstatSync(filePath).isDirectory()) {
        if (deep) paths.push(...filesReader(filePath, deep));
        return true;
      }

      return false;
    }));

  return paths.filter(filePath => filePath.endsWith('.js'));
}

export default function test<
  T extends RootDefinePathPrefixReturn,
  WE extends boolean = false
>(defineType: DefineTypes, path: string, withErrors?: WE) {
  const namesCache: string[] = [];

  return filesReader(path, true).map((filePath) => {
    const fileLoaded = require(filePath).default as T;

    if (fileLoaded?.type !== defineType) return { path: filePath, error: 'connector_is_not_found' };

    const prefix = filePath
      .slice(path.length + 1)
      .split(/[/\\]/)
      .slice(0, -1)
      .map(directory => directory.toLowerCase());
    let name = filePath
      .split(/[/\\]/)
      .at(-1)!
      .split('.')
      .slice(0, 1)[0]
      .toLowerCase();

    if (name === 'index') {
      if (!prefix.length) return { path: filePath, error: 'index_cannot_be_root' };
      else if (fileLoaded.pathPrefix) name = prefix.join('_');
      else name = prefix.at(-1)!;
    } else if (prefix.length && fileLoaded.pathPrefix) {
      name = `${prefix.join('_')}_${name}`;
    }

    if (namesCache.includes(name)) return { path: filePath, error: 'name_duplicate' };
    else namesCache.push(name);

    return { name, path: filePath, config: fileLoaded };
  }).filter(segment => withErrors || !segment.error) as WE extends true ? AutoImporterReturn<T>[] : AutoImporterLoadedReturn<T>[];
}
