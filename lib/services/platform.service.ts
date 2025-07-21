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
   * Hole oder erstelle Gaming-Plattformen basierend auf Store-Utils
   */
  export async function initializePlatforms() {
    // Definiere die DRM-Plattformen die wir unterstützen
    const platformsToCreate: PlatformData[] = [
      {
        name: 'Steam',
        slug: 'steam',
        iconUrl: '/img/stores/icons/0.png',
        siteUrl: 'https://store.steampowered.com'
      },
      {
        name: 'Epic Games Store',
        slug: 'epic',
        iconUrl: '/img/stores/icons/24.png',
        siteUrl: 'https://store.epicgames.com'
      },
      {
        name: 'GOG',
        slug: 'gog',
        iconUrl: '/img/stores/icons/6.png',
        siteUrl: 'https://www.gog.com'
      }
    ];

    const createdPlatforms = [];

    for (const platformData of platformsToCreate) {
      const existingPlatform = await prisma.platform.findUnique({
        where: { slug: platformData.slug }
      });

      if (!existingPlatform) {
        const newPlatform = await prisma.platform.create({
          data: platformData
        });
        createdPlatforms.push(newPlatform);
        console.log(`Platform "${platformData.name}" erstellt`);
      } else {
        createdPlatforms.push(existingPlatform);
      }
    }

    return createdPlatforms;
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
      const platforms = await initializePlatforms();
      const steam = platforms.find(p => p.slug === 'steam');
      if (!steam)
        throw new Error('Steam Platform konnte nicht erstellt werden');
      return steam.id;
    }
    return platform.id;
  }

  /**
   * Hole Epic Games Platform ID
   */
  export async function getEpicPlatformId(): Promise<number> {
    const platform = await getPlatformBySlug('epic');
    if (!platform) {
      const platforms = await initializePlatforms();
      const epic = platforms.find(p => p.slug === 'epic');
      if (!epic)
        throw new Error('Epic Games Platform konnte nicht erstellt werden');
      return epic.id;
    }
    return platform.id;
  }
}
