import type { RootDefinePathPrefix, RootDefinePathPrefixReturn } from '.bot/types/root';

export type DefineView =
  & RootDefinePathPrefix
  & {
  };
export type DefineViewReturn =
  & RootDefinePathPrefixReturn
  & DefineView
  & {
    type: 'view';
  };
