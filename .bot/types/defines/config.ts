import type { OmitMultiple, RootDefinePathPrefixReturn } from '.bot/types';

export type DefineConfig = {
  token: string;
  admins?: number[];
};

export type DefineConfigEnv = {
  token: string;
};

export type DefineConfigReturn =
  & RootDefinePathPrefixReturn
  & OmitMultiple<DefineConfig, []>
  & {
    type: 'config';
    env: DefineConfigEnv;
    admins: number[];
  };
