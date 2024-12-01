import type { BotConstructor } from '.bot/root/bot';
import type { CommandContext, NextFunction } from 'grammy';
import type { ContextConstructor } from '.bot/root/context';
import type { OmitMultiple, RootDefinePathPrefix, RootDefinePathPrefixReturn } from '.bot/types';

export type DefineCommand =
  & RootDefinePathPrefix
  & {
    description: string;
    handler: (bot: BotConstructor, ctx: CommandContext<ContextConstructor>, next: NextFunction) => any;
    addToMenu?: boolean;
    isAuthRequired?: boolean;
    middleware?: string | string[];
  };
export type DefineCommandReturn =
  & RootDefinePathPrefixReturn
  & OmitMultiple<DefineCommand, ['middleware']>
  & {
    type: 'command';
    addToMenu: boolean;
    isAuthRequired: boolean;
    middleware: string[];
  };
