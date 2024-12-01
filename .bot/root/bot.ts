import { Bot } from 'grammy';
import type { AppMiddlewares, DefineConfigReturn, DefineMiddlewareReturn } from '.bot/types';
import { ContextConstructor } from '.bot/root/context';
import { autoImportConfig } from '.bot/autoImports/config';
import { autoImportMiddlewares } from '.bot/autoImports/middlewares';
import { autoImportCommands } from '.bot/autoImports/commands';
import { autoImportCrones } from '.bot/autoImports/crones';
import { autoImportViews } from '.bot/autoImports/views';
import { LoggerConstructor } from '.bot/root/logger';

export class BotConstructor extends Bot {
  private readonly config: DefineConfigReturn;
  private readonly logger = new LoggerConstructor('Bot', 'all');
  private readonly env = process.env as any;

  private readonly middlewares: AppMiddlewares = {};

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

    this.createEvents();

    this.logger.info('Bot successfully started!');
  }

  private createEvents() {
  }

  getConfig() {
    return this.config;
  }

  getLogger() {
    return this.logger;
  }

  addMiddleware(name: string, middleware: DefineMiddlewareReturn) {
    this.middlewares[name] = middleware;
  }

  getMiddlewares() {
    return this.middlewares;
  }

  getMiddlewareByName(name: string) {
    return this.middlewares[name];
  }
}
