import { defineCommand } from '.bot/defines/command';

export default defineCommand({
  description: 'Стартовая команда',
  addToMenu: true,
  isAuthRequired: true,
  handler: (bot, ctx) => console.log(bot.getConfig(), ctx)
});
