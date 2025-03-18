import type { OmitMultiple, RootDefinePathPrefix, RootDefinePathPrefixReturn } from '.bot/types';
import type { BotConstructor } from '.bot/root/bot';
import type { ContextConstructor } from '.bot/root/context';

export type DefineMiddleware =
  & RootDefinePathPrefix
  & {
    interceptor: (bot: BotConstructor, ctx: ContextConstructor, next: () => Promise<void>) => any;
    isGlobal?: boolean;
  };
export type DefineMiddlewareReturn =
  & RootDefinePathPrefixReturn
  & OmitMultiple<DefineMiddleware, []>
  & {
    type: 'middleware';
    isGlobal: boolean;
  };

export type AppMiddlewares = { [name: string]: DefineMiddlewareReturn };
