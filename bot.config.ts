import { defineConfig } from '.bot/defines/config';

const env = {
  token: process.env.BOT_TOKEN
};

export default defineConfig({
  token: env.token!,
  admins: [
    1363116532
  ]
});
