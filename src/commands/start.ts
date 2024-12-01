import { defineCommand } from '.bot/defines/command';

export default defineCommand({
  description: 'Стартовая команда',
  addToMenu: true,
  isAuthRequired: true,
  middleware: 'speedtest',
  handler: (bot, ctx) => console.log(bot.getMiddlewares())
});
