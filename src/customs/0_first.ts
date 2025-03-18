import { defineCustom } from '.bot/defines/custom';

export default defineCustom(async (bot) => {
  bot.on('pre_checkout_query', (ctx) => {
    ctx.answerPreCheckoutQuery(true);
    console.log(ctx);
  });
  // @ts-ignore
  bot.on(':successful_payment', async (ctx, next) => {
    console.log('Успешно!');
    await ctx.reply('SuccessfulPayment');
  });
});
