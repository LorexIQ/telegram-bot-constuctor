import type { DefineCommandReturn, DefineConfigReturn, DefineCronReturn, DefineMiddlewareReturn, DefineViewReturn } from '.bot/types';

import type { XOR } from '.bot/types/utils';

export type RootDefinePathPrefix = {
  pathPrefix?: boolean;
};
export type RootDefinePathPrefixReturn = {
  type: string;
  pathPrefix: boolean;
};

type AutoImporterErrors =
  | 'file_is_not_found'
  | 'dir_is_not_found'
  | 'root_index_is_not_supported'
  | 'name_duplicate'
  | 'define_is_not_found';

export type AutoImporterLoadedReturn<T extends RootDefinePathPrefixReturn> = {
  id: string;
  path: string;
  fileName: string;
  name: {
    snakeCase: string;
    camelCase: string;
  };
  config: T;
};
export type AutoImporterErrorReturn = {
  path: string;
  error: AutoImporterErrors;
};
export type AutoImporterReturn<T extends RootDefinePathPrefixReturn> = XOR<AutoImporterLoadedReturn<T>, AutoImporterErrorReturn>;

export type DefineTypes =
  | DefineConfigReturn['type']
  | DefineCommandReturn['type']
  | DefineCronReturn['type']
  | DefineMiddlewareReturn['type']
  | DefineViewReturn['type'];
