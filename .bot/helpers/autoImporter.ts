import fs from 'node:fs';
import uPath from './uPath';
import type { AutoImporterLoadedReturn, AutoImporterReturn, DefineTypes, RootDefinePathPrefixReturn } from '.bot/types';
import { textToSplitParts, toFirstUpper } from '.bot/helpers/utils';

function filesReader(path: string, deep = false): string[] {
  const paths: string[] = [];

  if (!fs.existsSync(path)) return [];

  paths.push(...fs
    .readdirSync(path)
    .map(fileName => uPath.join(path, fileName))
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

export default function<
  T extends RootDefinePathPrefixReturn,
  WE extends boolean = false
>(defineType: DefineTypes, path: string, deep: boolean, withErrors?: WE) {
  const cache: string[] = [];

  return filesReader(path, deep).map((filePath) => {
    const fileName = filePath.slice(path.length + 1);
    const prefix = fileName.split('/').slice(0, -1).map(part => textToSplitParts(part));
    const name = textToSplitParts(fileName.split('/').at(-1)!.slice(0, -3));
    const fileLoaded = require(filePath).default as T;

    if (!fileLoaded) return { path: filePath, error: 'file_is_not_found' };
    if (fileLoaded?.type !== defineType) return { path: filePath, error: 'define_is_not_found' };
    if (name.length === 1 && name[0] === 'index') {
      if (prefix.length) {
        name.splice(0);
      } else {
        return { path: filePath, error: 'root_index_is_not_supported' };
      }
    }

    const snakeCaseName = (fileLoaded.pathPrefix ? [...prefix, ...name] : name).flat().join('_');
    const camelCaseName = (fileLoaded.pathPrefix ? [...prefix, ...name] : name).flat().map((part, i) => i ? toFirstUpper(part) : part).join('');

    if (cache.includes(snakeCaseName)) return { path: filePath, error: 'name_duplicate' };
    else cache.push(snakeCaseName);

    return {
      id: `AI${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      name: {
        snakeCase: snakeCaseName,
        camelCase: camelCaseName
      },
      config: fileLoaded,
      fileName,
      path: filePath
    };
  }).filter(segment => withErrors || !segment.error) as WE extends true ? AutoImporterReturn<T>[] : AutoImporterLoadedReturn<T>[];
}
