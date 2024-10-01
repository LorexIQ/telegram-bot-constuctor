import { defineCommand } from '.bot/builders/command';

export default defineCommand({
  description: 'Стартовая команда',
  isAuthRequired: true,
  addToMenu: true,
  handler: (bot, ctx) => console.log(bot.getConfig(), ctx.authUser, 1)
});
