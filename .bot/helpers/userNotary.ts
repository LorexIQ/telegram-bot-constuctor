import type { BotConstructor } from '.bot/root/bot';
import type { CommandContext } from 'grammy';
import type { ContextConstructor } from '.bot/root/context';
import { container } from 'tsyringe';
import { PrismaConstructor } from '.bot/root/prisma';
import type { Prisma, User } from '@prisma/client';

function userDBCompareCtx(user: User, ctx: CommandContext<ContextConstructor>): boolean {
  const ctxUser = ctx.from!;

  return !(
    user.firstName !== ctxUser.first_name
    || user.languageCode !== ctxUser.language_code
    || user.isPremium != ctxUser.is_premium
    || user.lastName != ctxUser.last_name
    || user.username != ctxUser.username
  );
}
function userDataBuilder(bot: BotConstructor, ctx: CommandContext<ContextConstructor>): Prisma.UserCreateInput {
  const ctxUser = ctx.from!;

  return {
    id: ctxUser.id,
    firstName: ctxUser.first_name,
    languageCode: 'ru',
    role: bot.getConfig().admins.includes(ctxUser.id) ? 'admin' : 'user',
    isBot: ctxUser.is_bot,
    isPremium: !!ctxUser.is_premium,
    lastName: ctxUser.last_name ?? null,
    username: ctxUser.username ?? null
  };
}

export default async function (bot: BotConstructor, ctx: CommandContext<ContextConstructor>, ifNullCreate: boolean) {
  const ctxUser = ctx.from;

  if (!ctxUser) return;

  const prisma = container.resolve(PrismaConstructor);

  let user = await prisma.user.findUnique({
    where: {
      id: ctxUser.id
    }
  });

  if (!user && ifNullCreate) {
    user = await prisma.user.create({ data: userDataBuilder(bot, ctx) });
  } else if (user && !userDBCompareCtx(user, ctx)) {
    user = await prisma.user.update({
      where: { id: ctxUser.id },
      data: userDataBuilder(bot, ctx)
    });
  }

  if (user) {
    ctx.authUser = user;
  }
}
