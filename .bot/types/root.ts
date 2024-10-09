import type { DefineCommandReturn } from '.bot/types/command';
import type { DefineViewReturn } from '.bot/types/view';
import type { DefineConfigReturn } from '.bot/types/config';
import type { XOR } from '.bot/types/utils';

export type RootDefinePathPrefix = {
  pathPrefix?: boolean;
};
export type RootDefinePathPrefixReturn = {
  type: string;
  pathPrefix: boolean;
};

type AutoImporterLoadedReturn<T extends RootDefinePathPrefixReturn> = {
  name: string;
  path: string;
  config: T;
};
type AutoImporterErrorReturn = {
  path: string;
  error: string;
};
export type AutoImporterReturn<T extends RootDefinePathPrefixReturn> = XOR<AutoImporterLoadedReturn<T>, AutoImporterErrorReturn>;

export type DefineTypes =
  | DefineConfigReturn['type']
  | DefineCommandReturn['type']
  | DefineViewReturn['type'];
