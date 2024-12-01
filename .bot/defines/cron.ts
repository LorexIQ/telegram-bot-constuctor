import type { DefineCron, DefineCronReturn } from '.bot/types';

export function defineCron(config: DefineCron): DefineCronReturn {
  return {
    type: 'cron',
    pathPrefix: true,
    runOnInit: false,

    ...config
  };
}
