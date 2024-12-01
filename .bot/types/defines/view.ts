import type { OmitMultiple, RootDefinePathPrefix, RootDefinePathPrefixReturn } from '.bot/types';

export type DefineView =
  & RootDefinePathPrefix
  & {
  };
export type DefineViewReturn =
  & RootDefinePathPrefixReturn
  & OmitMultiple<DefineView, []>
  & {
    type: 'view';
  };

export type AppViews = { [name: string]: DefineViewReturn };
