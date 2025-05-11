import { Prisma } from '@prisma/client';

// Membership-bezogene Typen sind nicht mehr notwendig und werden entfernt.

export const fullDBUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    account: true // Entspricht dem Feld 'account' im User-Modell
  }
});
export type FullDBUser = Prisma.UserGetPayload<typeof fullDBUser>;

export const accountWithUser = Prisma.validator<Prisma.AccountDefaultArgs>()({
  include: {
    user: true // Entspricht dem Feld 'user' im Account-Modell
  }
});
export type AccountWithUser = Prisma.AccountGetPayload<typeof accountWithUser>;
