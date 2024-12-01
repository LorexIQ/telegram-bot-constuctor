import { BotConstructor } from './root/bot';
import { container } from 'tsyringe';
import { PrismaConstructor } from '.bot/root/prisma';
import { LoggerConstructor } from '.bot/root/logger';

export async function main() {
  const bot = new BotConstructor();
  const prisma = new PrismaConstructor();
  const logger = new LoggerConstructor('App');

  container.register(BotConstructor, { useValue: bot });
  container.register(PrismaConstructor, { useValue: prisma });
  container.register(LoggerConstructor, { useValue: logger });

  return new Promise(async (resolve, reject) => {
    try {
      const botRun = await bot.start();
      await prisma.$disconnect();
      resolve(botRun);
    } catch (e) {
      await prisma.$disconnect();
      reject(e);
    }
  });
}
