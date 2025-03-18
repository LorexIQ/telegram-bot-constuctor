import type { DefineMiddleware, DefineMiddlewareReturn } from '.bot/types';

export function defineMiddleware(config: DefineMiddleware): DefineMiddlewareReturn {
  return {
    type: 'middleware',
    name: '',
    pathPrefix: true,
    isGlobal: false,

    ...config
  };
}
