import type { DefineCommandReturn, DefineConfigReturn, DefineCronReturn, DefineMiddlewareReturn, DefineViewReturn } from '.bot/types';

import type { XOR } from '.bot/types/utils';

export type RootDefinePathPrefix = {
  pathPrefix?: boolean;
};
export type RootDefinePathPrefixReturn = {
  type: string;
  pathPrefix: boolean;
};

export type AutoImporterLoadedReturn<T extends RootDefinePathPrefixReturn> = {
  name: string;
  path: string;
  config: T;
};
export type AutoImporterErrorReturn = {
  path: string;
  error: string;
};
export type AutoImporterReturn<T extends RootDefinePathPrefixReturn> = XOR<AutoImporterLoadedReturn<T>, AutoImporterErrorReturn>;

export type DefineTypes =
  | DefineConfigReturn['type']
  | DefineCommandReturn['type']
  | DefineCronReturn['type']
  | DefineMiddlewareReturn['type']
  | DefineViewReturn['type'];
