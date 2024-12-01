import type { BotConstructor } from '.bot/root/bot';
import type { CommandContext, NextFunction } from 'grammy';
import type { ContextConstructor } from '.bot/root/context';
import type { OmitPartial, RootDefinePathPrefix, RootDefinePathPrefixReturn } from '.bot/types';

export type DefineCommand =
  & RootDefinePathPrefix
  & {
    description: string;
    handler: (bot: BotConstructor, ctx: CommandContext<ContextConstructor>, next: NextFunction) => any;
    command?: string | RegExp;
    addToMenu?: boolean;
    isAuthRequired?: boolean;
    middleware?: string | string[];
  };
export type DefineCommandReturn =
  & RootDefinePathPrefixReturn
  & OmitPartial<DefineCommand>
  & {
    type: 'command';
    command: string | RegExp;
    addToMenu: boolean;
    isAuthRequired: boolean;
    middleware: string[];
  };

export type AppCommands = { [name: string]: DefineCommandReturn };
