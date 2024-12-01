import type { PollingOptions } from 'grammy';
import { Bot } from 'grammy';
import type {
  AppCommands,
  AppCrones,
  AppCustoms,
  AppMiddlewares,
  AppViews,
  DefineCommandReturn,
  DefineConfigReturn,
  DefineCustomReturn,
  DefineMiddlewareReturn,
  DefineViewReturn
} from '.bot/types';
import { ContextConstructor } from '.bot/root/context';
import { autoImportConfig } from '.bot/autoImports/config';
import { autoImportMiddlewares } from '.bot/autoImports/middlewares';
import { autoImportCommands } from '.bot/autoImports/commands';
import { autoImportCrones } from '.bot/autoImports/crones';
import { autoImportViews } from '.bot/autoImports/views';
import { autoImportCustoms } from '.bot/autoImports/customs';
import { LoggerConstructor } from '.bot/root/logger';
import type { CronJob } from 'cron';

export class BotConstructor extends Bot {
  private readonly config: DefineConfigReturn;
  private readonly logger = new LoggerConstructor('Bot', 'all');
  private readonly env = process.env as any;

  private readonly middlewares: AppMiddlewares = {};
  private readonly commands: AppCommands = {};
  private readonly crones: AppCrones = {};
  private readonly views: AppViews = {};
  private readonly customs: AppCustoms = {};

  constructor() {
    const config = autoImportConfig();
    super(config.token, {
      ContextConstructor
    });
    this.config = config;

    autoImportMiddlewares(this);
    autoImportCommands(this);
    autoImportCrones(this);
    autoImportViews(this);
    autoImportCustoms(this);

    this.logger.info('Successfully started!');
  }

  /* System */

  async start(options?: PollingOptions): Promise<void> {
    for (const custom of Object.values(this.customs)) {
      await custom.fn(this);
    }

    await super.start(options);
  }

  getConfig() {
    return this.config;
  }

  getLogger() {
    return this.logger;
  }

  /* Middleware */

  addMiddleware(name: string, middleware: DefineMiddlewareReturn) {
    this.middlewares[name] = middleware;
  }

  getMiddlewares() {
    return this.middlewares;
  }

  getMiddlewareByName(name: string) {
    return this.middlewares[name];
  }

  /* Commands */

  addCommand(name: string, command: DefineCommandReturn) {
    this.commands[name] = command;
  }

  getCommands() {
    return this.commands;
  }

  getCommandByName(name: string) {
    return this.commands[name];
  }

  /* Crones */

  addCrone(name: string, crone: CronJob) {
    this.crones[name] = crone;
  }

  getCrones() {
    return this.crones;
  }

  getCroneByName(name: string) {
    return this.crones[name];
  }

  /* Views */

  addView(name: string, view: DefineViewReturn) {
    this.views[name] = view;
  }

  getViews() {
    return this.views;
  }

  getViewByName(name: string) {
    return this.views[name];
  }

  /* Customs */

  addCustom(name: string, custom: DefineCustomReturn) {
    this.customs[name] = custom;
  }

  getCustoms() {
    return this.customs;
  }

  getCustomByName(name: string) {
    return this.customs[name];
  }
}
