import type { Api } from 'grammy';
import { Context } from 'grammy';
import type { Update, UserFromGetMe } from 'grammy/types';
import type { User } from '@prisma/client';

export class ContextConstructor extends Context {
  authUser?: User;

  constructor(update: Update, api: Api, me: UserFromGetMe) {
    super(update, api, me);
  }
}
