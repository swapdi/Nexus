import { PrismaClient } from '~/prisma/client';
const prisma = new PrismaClient();
import { accountWithUser, type AccountWithUser } from './service.types';
import type { Account } from '~/prisma/client';

export namespace AccountService {
  export async function getAccountById(
    account_id: number
  ): Promise<AccountWithUser> {
    return prisma.account.findFirstOrThrow({
      where: { id: account_id },
      ...accountWithUser
    });
  }

  export async function changeAccountName(
    account_id: number,
    new_name: string
  ): Promise<Account> {
    return prisma.account.update({
      where: { id: account_id },
      data: {
        name: new_name
      }
    });
  }
}
