import type { BotConstructor } from '.bot/root/bot';
import type { CommandContext, NextFunction } from 'grammy';
import type { ContextConstructor } from '.bot/root/context';
import type { RootDefinePathPrefix, RootDefinePathPrefixReturn } from '.bot/types/root';

export type DefineCommand =
  & RootDefinePathPrefix
  & {
    description: string;
    handler: (bot: BotConstructor, ctx: CommandContext<ContextConstructor>, next: NextFunction) => any;
    addToMenu?: boolean;
    isAuthRequired?: boolean;
  };
export type DefineCommandReturn =
  & RootDefinePathPrefixReturn
  & DefineCommand
  & {
    type: 'command';
    addToMenu: boolean;
    isAuthRequired: boolean;
  };
