import { Bot } from 'grammy';
import { autoImportConfig } from '.bot/connectors/config';
import { autoImportCommands } from '.bot/connectors/commands';
import type { DefineConfigReturn } from '.bot/types';
import { ContextConstructor } from '.bot/root/context';

export class BotConstructor extends Bot {
  private readonly config: DefineConfigReturn;

  constructor() {
    const config = autoImportConfig();
    super(config.token, {
      ContextConstructor
    });
    this.config = config;

    autoImportCommands(this);

    this.createEvents();
  }

  private saveConfigInBot() {

  }

  private createEvents() {
  }

  getConfig() {
    return this.config;
  }
}
