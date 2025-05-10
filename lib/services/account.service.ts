import { ACCOUNT_ACCESS } from '~~/prisma/account-access-enum';
import prisma_client from '~~/prisma/prisma.client';
import {
  accountWithMembers,
  type AccountWithMembers,
  membershipWithAccount,
  type MembershipWithAccount,
  membershipWithUser,
  type MembershipWithUser
} from './service.types';
import generator from 'generate-password-ts';
import { UtilService } from './util.service';
import { AccountLimitError } from './errors';

const config = useRuntimeConfig();

export namespace AccountService {
  export async function getAccountById(
    account_id: number
  ): Promise<AccountWithMembers> {
    return prisma_client.account.findFirstOrThrow({
      where: { id: account_id },
      ...accountWithMembers
    });
  }

  export async function getAccountByJoinPassword(
    join_password: string
  ): Promise<AccountWithMembers> {
    return prisma_client.account.findFirstOrThrow({
      where: { join_password },
      ...accountWithMembers
    });
  }

  export async function getAccountMembers(
    account_id: number
  ): Promise<MembershipWithUser[]> {
    return prisma_client.membership.findMany({
      where: { account_id },
      ...membershipWithUser
    });
  }

  export async function acceptPendingMembership(
    account_id: number,
    membership_id: number
  ): Promise<MembershipWithAccount> {
    const membership = await prisma_client.membership.findFirstOrThrow({
      where: {
        id: membership_id
      }
    });

    if (membership.account_id != account_id) {
      throw new Error(`Membership does not belong to current account`);
    }

    return await prisma_client.membership.update({
      where: {
        id: membership_id
      },
      data: {
        pending: false
      },
      ...membershipWithAccount
    });
  }

  export async function deleteMembership(
    account_id: number,
    membership_id: number
  ): Promise<MembershipWithAccount> {
    const membership = await prisma_client.membership.findFirstOrThrow({
      where: {
        id: membership_id
      }
    });

    if (membership.account_id != account_id) {
      throw new Error(`Membership does not belong to current account`);
    }

    return await prisma_client.membership.delete({
      where: {
        id: membership_id
      },
      ...membershipWithAccount
    });
  }

  export async function changeAccountName(
    account_id: number,
    new_name: string
  ) {
    return prisma_client.account.update({
      where: { id: account_id },
      data: {
        name: new_name
      }
    });
  }

  export async function changeAccountPlan(account_id: number, plan_id: number) {
    const plan = await prisma_client.plan.findFirstOrThrow({
      where: { id: plan_id }
    });
    return prisma_client.account.update({
      where: { id: account_id },
      data: {
        plan_id: plan_id,
        features: plan.features
      }
    });
  }

  export async function rotateJoinPassword(account_id: number) {
    const join_password: string = generator.generate({
      length: 10,
      numbers: true
    });
    return await prisma_client.account.update({
      where: { id: account_id },
      data: { join_password }
    });
  }

  // Claim ownership of an account.
  // User must already be an ADMIN for the Account
  // Existing OWNER memberships are downgraded to ADMIN
  // In future, some sort of Billing/Stripe tie in here e.g. changing email details on the Account, not sure.
  export async function claimOwnershipOfAccount(
    user_id: number,
    account_id: number
  ): Promise<MembershipWithUser[]> {
    const membership = await prisma_client.membership.findUniqueOrThrow({
      where: {
        user_id_account_id: {
          user_id: user_id,
          account_id: account_id
        }
      }
    });

    if (membership.access === ACCOUNT_ACCESS.OWNER) {
      throw new Error('BADREQUEST: user is already owner');
    } else if (membership.access !== ACCOUNT_ACCESS.ADMIN) {
      throw new Error('UNAUTHORISED: only Admins can claim ownership');
    }

    const existing_owner_memberships = await prisma_client.membership.findMany({
      where: {
        account_id: account_id,
        access: ACCOUNT_ACCESS.OWNER
      }
    });

    for (const existing_owner_membership of existing_owner_memberships) {
      await prisma_client.membership.update({
        where: {
          user_id_account_id: {
            user_id: existing_owner_membership.user_id,
            account_id: account_id
          }
        },
        data: {
          access: ACCOUNT_ACCESS.ADMIN // Downgrade OWNER to ADMIN
        }
      });
    }

    // finally update the ADMIN member to OWNER
    await prisma_client.membership.update({
      where: {
        user_id_account_id: {
          user_id: user_id,
          account_id: account_id
        }
      },
      data: {
        access: ACCOUNT_ACCESS.OWNER
      }
    });

    // return the full membership list because 2 members have changed.
    return prisma_client.membership.findMany({
      where: { account_id },
      ...membershipWithUser
    });
  }

  // Upgrade access of a membership.  Cannot use this method to upgrade to or downgrade from OWNER access
  export async function changeUserAccessWithinAccount(
    user_id: number,
    account_id: number,
    access: ACCOUNT_ACCESS
  ) {
    if (access === ACCOUNT_ACCESS.OWNER) {
      throw new Error(
        'UNABLE TO UPDATE MEMBERSHIP: use claimOwnershipOfAccount method to change ownership'
      );
    }

    const membership = await prisma_client.membership.findUniqueOrThrow({
      where: {
        user_id_account_id: {
          user_id: user_id,
          account_id: account_id
        }
      }
    });

    if (membership.access === ACCOUNT_ACCESS.OWNER) {
      throw new Error(
        'UNABLE TO UPDATE MEMBERSHIP: use claimOwnershipOfAccount method to change ownership'
      );
    }

    return prisma_client.membership.update({
      where: {
        user_id_account_id: {
          user_id: user_id,
          account_id: account_id
        }
      },
      data: {
        access: access
      },
      include: {
        account: true
      }
    });
  }
}
