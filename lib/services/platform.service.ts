import { PrismaClient } from '~/prisma/client';
const prisma = new PrismaClient();
export namespace PlatformService {
  export interface PlatformData {
    name: string;
    slug: string;
    iconUrl?: string;
    siteUrl?: string;
  }
  /**
   * Hole Platform nach Slug
   */
  export async function getPlatformBySlug(slug: string) {
    return await prisma.platform.findUnique({
      where: { slug }
    });
  }
  /**
   * Hole Steam Platform ID
   */
  export async function getSteamPlatformId(): Promise<number> {
    const platform = await getPlatformBySlug('steam');
    if (!platform) {
      throw new Error('Steam Platform konnte nicht gefunden werden');
    }
    return platform.id;
  }
  /**
   * Hole Epic Games Platform ID
   */
  export async function getEpicPlatformId(): Promise<number> {
    const platform = await getPlatformBySlug('epic');
    if (!platform) {
      throw new Error('Epic Games Platform konnte nicht gefunden werden');
    }
    return platform.id;
  }
  /**
   * Hole Epic Games Platform ID
   */
  export async function getGOGPlatformId(): Promise<number> {
    const platform = await getPlatformBySlug('gog');
    if (!platform) {
      throw new Error('GOG Platform konnte nicht gefunden werden');
    }
    return platform.id;
  }
}
