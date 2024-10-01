export type DefineConfig = {
  token: string;
  admins?: number[];
};

export type DefineConfigEnv = {
  token?: string;
};

export type DefineConfigReturn = DefineConfig & {
  type: 'config';
  env: DefineConfigEnv;
  admins: number[];
};
