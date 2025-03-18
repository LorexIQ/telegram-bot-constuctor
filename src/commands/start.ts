import { defineCommand } from '.bot/defines/command';
import callView from '.bot/composables/callView';

export default defineCommand({
  description: 'Стартовая команда',
  addToMenu: true,
  isAuthRequired: true,
  handler: async (bot, ctx) => {
    callView(ctx, 'user_info', {
      vars: {
        name: ctx.from?.first_name ?? 'UNKNOWN'
      }
    });
  }
});
