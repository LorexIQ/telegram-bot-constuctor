import type { DefineCommand, DefineCommandReturn } from '.bot/types';

export function defineCommand(config: DefineCommand): DefineCommandReturn {
  const middleware = config.middleware;

  return {
    type: 'command',
    command: '',
    addToMenu: false,
    isAuthRequired: false,
    pathPrefix: true,

    ...config,

    middleware: middleware ? Array.isArray(middleware) ? middleware : [middleware] : []
  };
}
