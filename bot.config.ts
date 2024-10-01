import { defineConfig } from '.bot/builders/config';

const env = {
  token: process.env.BOT_TOKEN
};

export default defineConfig({
  token: env.token!,
  admins: [
    1363116532
  ]
});
