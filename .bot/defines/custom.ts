import type { DefineCustom, DefineCustomReturn } from '.bot/types';

export function defineCustom(config: DefineCustom): DefineCustomReturn {
  return {
    type: 'custom',
    pathPrefix: true,
    fn: config
  };
}
