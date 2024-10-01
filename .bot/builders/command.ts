import type { DefineCommand, DefineCommandReturn } from '.bot/types';

export function defineCommand(config: DefineCommand): DefineCommandReturn {
  return {
    type: 'command',
    addToMenu: false,
    isAuthRequired: false,
    pathPrefix: true,

    ...config
  };
}
