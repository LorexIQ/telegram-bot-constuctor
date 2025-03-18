import type { DefineCron, DefineCronReturn } from '../types';

export function defineCron(config: DefineCron): DefineCronReturn {
  return {
    type: 'cron',
    name: '',
    pathPrefix: true,
    runOnInit: false,

    ...config
  };
}
