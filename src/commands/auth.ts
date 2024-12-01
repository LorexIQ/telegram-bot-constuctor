import { defineCommand } from '.bot/defines/command';

export default defineCommand({
  command: /\/name .*/,
  description: 'Авторизация',
  handler: (bot, ctx) => console.log(ctx.match)
});
