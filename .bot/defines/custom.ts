import type { DefineCustom, DefineCustomReturn } from '../types';

export function defineCustom(config: DefineCustom): DefineCustomReturn {
  return {
    type: 'custom',
    name: '',
    pathPrefix: true,
    fn: config
  };
}
