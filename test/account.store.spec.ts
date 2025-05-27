import { describe, expect, beforeEach, it, vi } from 'vitest';
import { useAccountStore } from '../stores/account.store';
import { setActivePinia, createPinia } from 'pinia';
import type { User } from '~/prisma/client';

const fakeInitAccountStore = (accountStore: any) => {
  const user: User = {
    id: 1,
    supabase_uid: 'test-uid',
    email: 'john@example.com',
    display_name: 'John Doe',
    xp: 100,
    level: 2,
    credits: 50
  } as any;
  accountStore.user = user;
};

describe('Account Store', async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize the store', async () => {
    // stub the useNuxtApp function with a mock client
    vi.stubGlobal('useNuxtApp', () => ({
      $client: {
        auth: {
          getDBUser: {
            query: () => ({
              dbUser: {
                id: 1,
                supabase_uid: 'test-uid',
                email: 'john@example.com',
                display_name: 'John Doe',
                xp: 100,
                level: 2,
                credits: 50
              }
            })
          }
        }
      }
    }));

    const accountStore = useAccountStore();

    // method under test
    await accountStore.init();

    expect(accountStore.user).toEqual({
      id: 1,
      supabase_uid: 'test-uid',
      email: 'john@example.com',
      display_name: 'John Doe',
      xp: 100,
      level: 2,
      credits: 50
    });
  });

  it('should handle missing user data gracefully', async () => {
    // stub the useNuxtApp function with a mock client that returns no user
    vi.stubGlobal('useNuxtApp', () => ({
      $client: {
        auth: {
          getDBUser: {
            query: () => ({
              dbUser: null
            })
          }
        }
      }
    }));

    const accountStore = useAccountStore();

    // method under test
    await accountStore.init();

    expect(accountStore.user).toBeNull();
  });

  it('should signout', async () => {
    const accountStore = useAccountStore();
    fakeInitAccountStore(accountStore);

    await accountStore.signout();

    expect(accountStore.user).toBeNull();
  });
});
