import type { BotConstructor } from '.bot/root/bot';
import type { RootDefinePathPrefixReturn } from '.bot/types';

export type DefineCustom = (bot: BotConstructor) => any;
export type DefineCustomReturn =
  & RootDefinePathPrefixReturn
  & {
    type: 'custom';
    fn: DefineCustom;
  };

export type AppCustoms = { [name: string]: DefineCustomReturn };
