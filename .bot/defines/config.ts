import type { DefineConfig, DefineConfigEnv, DefineConfigReturn } from '../types';

function defineEnv(): DefineConfigEnv {
  return {
    token: process.env.BOT_TOKEN ?? ''
  };
}

export function defineConfig(config: DefineConfig): DefineConfigReturn {
  return {
    type: 'config',
    name: '',
    env: defineEnv(),
    admins: [],
    pathPrefix: false,

    ...config
  };
}
