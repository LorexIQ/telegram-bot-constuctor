import { defineCommand } from '.bot/defines/command';

export default defineCommand({
  description: 'Вывести экземпляр бота',
  addToMenu: true,
  handler: bot => console.log(bot)
});
