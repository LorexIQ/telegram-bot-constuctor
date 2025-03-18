import type { DefineView, DefineViewReturn } from '.bot/types';

export function defineView(config: DefineView): DefineViewReturn {
  return {
    type: 'view',
    name: '',
    pathPrefix: true,
    parseMode: 'Markdown',

    ...config,

    inlineKeyboard: (config.inlineKeyboard ?? []).map(row => row.map(col => ({
      ...col,
      isVisible: col.isVisible ?? (() => true)
    })))
  };
}
