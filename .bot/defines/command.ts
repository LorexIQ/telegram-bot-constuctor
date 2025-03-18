import type { DefineCommand, DefineCommandReturn } from '../types';

export function defineCommand(config: DefineCommand): DefineCommandReturn {
  const middleware = config.middleware;

  return {
    type: 'command',
    name: '',
    command: '',
    addToMenu: false,
    isAuthRequired: false,
    pathPrefix: true,

    ...config,

    middleware: middleware ? Array.isArray(middleware) ? middleware : [middleware] : []
  };
}
