import { defineMiddleware } from '.bot/defines/middleware';

export default defineMiddleware({
  isGlobal: true,
  interceptor: async (bot, ctx, next) => {
    const startTime = Date.now();

    await next();

    const endTime = Date.now();

    bot.getLogger().info(`SpeedTest '${ctx.update.message?.text}' result: ${(endTime - startTime) / 1000} seconds.`);
  }
});
