import { Bot } from 'grammy';
import type { DefineConfigReturn } from '.bot/types';
import { ContextConstructor } from '.bot/root/context';
import { autoImportConfig } from '.bot/autoImports/config';
import { autoImportCommands } from '.bot/autoImports/commands';
import { autoImportViews } from '.bot/autoImports/views';
import { LoggerConstructor } from '.bot/root/logger';

export class BotConstructor extends Bot {
  private readonly config: DefineConfigReturn;
  private readonly logger = new LoggerConstructor('Bot');

  constructor() {
    const config = autoImportConfig();
    super(config.token, {
      ContextConstructor
    });
    this.config = config;

    autoImportCommands(this);
    autoImportViews(this);

    this.createEvents();
  }

  private createEvents() {
  }

  getConfig() {
    return this.config;
  }
}
