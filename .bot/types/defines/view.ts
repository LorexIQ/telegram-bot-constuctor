import type { OmitMultiple, RootDefinePathPrefix, RootDefinePathPrefixReturn, RootHandler } from '.bot/types';

export type DefineViewInlineKeyboard = {
  text: string;
  handler: RootHandler;
  isVisible?: RootHandler<boolean>;
};

export type DefineView =
  & RootDefinePathPrefix
  & {
    content: string | string[];
    parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2';
    inlineKeyboard?: DefineViewInlineKeyboard[][];
  };
export type DefineViewReturn =
  & RootDefinePathPrefixReturn
  & OmitMultiple<DefineView, ['parseMode', 'inlineKeyboard']>
  & {
    type: 'view';
    parseMode: 'HTML' | 'Markdown' | 'MarkdownV2';
    inlineKeyboard: Required<DefineViewInlineKeyboard>[][];
  };

export type AppViews = { [name: string]: DefineViewReturn };
