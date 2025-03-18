import type { ComposableCallViewConfig } from '.bot/types';
import { container } from 'tsyringe';
import { BotConstructor } from '../root/bot';
import type { ContextConstructor } from '../root/context';

setTimeout(() => {
  const bot = container.resolve(BotConstructor);
  bot.on('callback_query:data', async (ctx) => {
    const parts = ctx.callbackQuery.data.split('::');
    if (parts.length !== 3 || parts[0] !== 'button') return;

    const partsIndexes = parts[2].split(':');
    if (partsIndexes.length !== 2) return;

    const viewName = parts[1];
    const rowIndex = parseInt(partsIndexes[0]);
    const columnIndex = parseInt(partsIndexes[1]);

    const view = bot.getViewByName(viewName);
    if (!view) return;

    try {
      await view.inlineKeyboard[rowIndex][columnIndex].handler(bot, ctx);
    } finally {
      await ctx.answerCallbackQuery();
    }
  });
});

export default function (ctx: ContextConstructor, name: string, config?: ComposableCallViewConfig) {
  const bot = container.resolve(BotConstructor);
  const view = bot.getViewByName(name);
  const _config = {
    vars: {},

    ...config
  } as Required<ComposableCallViewConfig>;

  if (!view) {
    bot.getLogger().info(`View ${name} not found`);
    return;
  }

  let content = Array.isArray(view.content) ? view.content.join('\n') : view.content;
  Object.keys(_config.vars).forEach(key => content = content.replaceAll(`{{${key}}}`, _config.vars[key] as string));

  ctx.reply(content, {
    parse_mode: view.parseMode,
    reply_markup: {
      inline_keyboard: view.inlineKeyboard
        .map(row => row.filter(col => col.isVisible(bot, ctx)))
        .filter(row => row.length)
        .map((row, rI) => row.map((button, cI) => ({
          text: button.text,
          callback_data: `button::${name}::${rI}:${cI}`
        })))
    }
  });
}
