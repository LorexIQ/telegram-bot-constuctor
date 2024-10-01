import { BotConstructor } from './root/bot';
import { container } from 'tsyringe';
import { PrismaConstructor } from '.bot/root/prisma';

export function main() {
  const bot = new BotConstructor();
  const prisma = new PrismaConstructor();

  container.register(BotConstructor, { useValue: bot });
  container.register(PrismaConstructor, { useValue: prisma });

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
