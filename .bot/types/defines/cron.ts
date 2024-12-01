import type { OmitMultiple, RootDefinePathPrefix, RootDefinePathPrefixReturn } from '.bot/types';
import type { BotConstructor } from '.bot/root/bot';
import type { CronJob } from 'cron';

export type DefineCron =
  & RootDefinePathPrefix
  & {
    time: string;
    handler: (bot: BotConstructor) => any;
    runOnInit?: boolean;
  };
export type DefineCronReturn =
  & RootDefinePathPrefixReturn
  & OmitMultiple<DefineCron, []>
  & {
    type: 'cron';
    runOnInit: boolean;
  };

export type AppCrones = { [name: string]: CronJob };
