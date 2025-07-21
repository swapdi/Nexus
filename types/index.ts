import type { Deal, Game } from '~/prisma/client';

export interface DealWithGame extends Deal {
  game: Game | null; // Game kann null sein für Bundles/DLCs ohne direktes Game
}
export interface DealCreateInput {
  gameId?: number | null; // gameId ist optional für Bundles/DLCs ohne direktes Game
  title: string;
  storeName: string;
  price?: number;
  discountPercent?: number;
  originalPrice?: number;
  url: string;
  validFrom?: Date;
  validUntil?: Date;
  isFreebie?: boolean;
  externalId?: string;
  source?: string;
  thumb?: string; // Thumbnail URL hinzugefügt
  rating?: number; // Deal Rating aus CheapShark API (0.0 - 10.0)
}
export interface DealSearchFilters {
  gameId?: number;
  storeName?: string;
  priceMax?: number;
  priceMin?: number;
  discountMin?: number;
  isFreebie?: boolean;
  isActive?: boolean;
  source?: string;
  limit?: number;
  offset?: number;
}
