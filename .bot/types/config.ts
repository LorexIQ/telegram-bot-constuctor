import type { RootDefinePathPrefixReturn } from '.bot/types/root';

export type DefineConfig = {
  token: string;
  admins?: number[];
};

export type DefineConfigEnv = {
  token?: string;
};

export type DefineConfigReturn =
  & RootDefinePathPrefixReturn
  & DefineConfig
  & {
    type: 'config';
    env: DefineConfigEnv;
    admins: number[];
  };
