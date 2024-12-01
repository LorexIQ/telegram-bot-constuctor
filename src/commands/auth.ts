import { defineCommand } from '.bot/defines/command';

export default defineCommand({
  description: 'Авторизация',
  handler: (bot, ctx) => console.log(bot.getMiddlewares())
});
