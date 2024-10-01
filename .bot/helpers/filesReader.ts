import fs from 'node:fs';
import { join } from 'node:path';

export default function filesReader(path: string, deep = false): string[] {
  const paths: string[] = [];

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
