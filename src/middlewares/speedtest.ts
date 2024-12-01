import { defineMiddleware } from '.bot/defines/middleware';

export default defineMiddleware({
  interceptor: async (bot, ctx, next) => {
    const startTime = Date.now();

    await next();

    const endTime = Date.now();

    bot.getLogger().info(`SpeedTest result: ${(endTime - startTime) / 1000} seconds.`);
  }
});
