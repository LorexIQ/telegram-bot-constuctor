import type { DefineView, DefineViewReturn } from '.bot/types';

export function defineView(config: DefineView): DefineViewReturn {
  return {
    type: 'view',
    pathPrefix: true,

    ...config
  };
}
