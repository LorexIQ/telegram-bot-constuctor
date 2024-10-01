import type { BotConstructor } from '.bot/root/bot';
import type { CommandContext, NextFunction } from 'grammy';
import type { ContextConstructor } from '.bot/root/context';

export type DefineCommand = {
  description: string;
  handler: (bot: BotConstructor, ctx: CommandContext<ContextConstructor>, next: NextFunction) => any;
  addToMenu?: boolean;
  isAuthRequired?: boolean;
  pathPrefix?: boolean;
};
export type DefineCommandReturn = DefineCommand & {
  type: 'command';
  addToMenu: boolean;
  isAuthRequired: boolean;
  pathPrefix: boolean;
};
