import type { BotConstructor } from '.bot/root/bot';
import type { ContextConstructor } from '.bot/root/context';
import type {
  DefineCommandReturn,
  DefineConfigReturn,
  DefineCronReturn,
  DefineCustomReturn,
  DefineMiddlewareReturn,
  DefineViewReturn
} from '.bot/types';

import type { XOR } from '.bot/types/utils';

export type RootHandler<T = any> = (bot: BotConstructor, ctx: ContextConstructor) => T;

export type RootDefinePathPrefix = {
  pathPrefix?: boolean;
};
export type RootDefinePathPrefixReturn = {
  type: string;
  name: string;
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
  | DefineCustomReturn['type']
  | DefineMiddlewareReturn['type']
  | DefineViewReturn['type'];
