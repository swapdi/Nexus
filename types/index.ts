import type {
  Deal,
  Game,
  Message,
  User,
  UserGame,
  Wishlist
} from '@prisma/client';
export type PrismaDeal = Deal;
export type PrismaGame = Game;
export type PrismaMessage = Message;
export type PrismaUser = User;
export type PrismaUserGame = UserGame;
export type PrismaWishlist = Wishlist;

// ============================================================================
// DEALS TYPES
// ============================================================================
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
export type DealSortOptions =
  | 'discount-desc'
  | 'price-asc'
  | 'recent'
  | 'ending-soon'
  | 'rating-desc'
  | 'rating-asc';

// ============================================================================
// GAMES TYPES
// ============================================================================
export interface GameSearchOptions {
  searchTerm?: string;
  genres?: string[];
  developers?: string[];
  publishers?: string[];
  minRating?: number;
  limit?: number;
  offset?: number;
}
export interface GameImportResult {
  success: boolean;
  game: Game;
  isNew: boolean;
  message?: string;
}
export interface UserGameWithDetails extends UserGame {
  game: Game;
  platforms?: Array<{
    id: number;
    name: string;
    slug: string;
    iconUrl: string | null;
  }>;
}
export interface GameData {
  // IGDB Fields
  id?: number;
  name: string;
  summary?: string;
  developers?: string[];
  publishers?: string[];
  firstReleaseDate?: Date | string;
  totalRating?: number;
  coverUrl?: string;
  screenshots?: string[];
  genres?: string[];
  themes?: string[];
  gameModes?: string[];
  keywords?: string[];
  // Common Fields
  platforms?: string[];
  isFavorite?: boolean;
  playtimeMinutes?: number;
}
export interface GameStats {
  totalGames: number;
  totalPlaytimeHours: number;
  averageRating: number;
  topGenres: Array<{ genre: string; count: number }>;
  platformDistribution: Record<string, number>;
  completionStats: {
    completed: number;
    inProgress: number;
    notStarted: number;
  };
}
export interface PlatformStats {
  name: string;
  gameCount: number;
  totalPlaytime: number;
  averagePlaytime: number;
  topGames: Array<{
    name: string;
    playtime: number;
  }>;
}

// ============================================================================
// USER TYPES
// ============================================================================
export interface FullUser extends User {
  userGames: Array<{
    id: number;
    gameId: number;
    playtimeMinutes: number | null;
    lastPlayed: Date | null;
    notes: string | null;
    isInstalled: boolean;
    isFavorite: boolean;
    addedAt: Date;
    game: {
      id: number;
      name: string;
      coverUrl: string | null;
    };
  }>;
  wishlistItems: Array<{
    id: number;
    gameId: number;
    addedAt: Date;
    game: {
      id: number;
      name: string;
      coverUrl: string | null;
    };
  }>;
}
export interface UserUpdateData {
  display_name?: string;
  email?: string;
  steamId?: string | null;
  epicConnect?: boolean;
  gogConnect?: boolean;
}
export interface UserStats {
  totalGames: number;
  totalPlaytimeHours: number;
}

// ============================================================================
// MESSAGES TYPES
// ============================================================================
export interface FullMessage extends Message {
  sender: {
    id: number;
    display_name: string | null;
  } | null;
  receiver: {
    id: number;
    display_name: string | null;
  };
}
export interface CreateMessageData {
  senderId?: number | null; // null für Server-Nachrichten
  receiverId: number;
  text: string;
  media?: string;
}

// ============================================================================
// WISHLIST TYPES
// ============================================================================
export interface FullWishlistItem extends Wishlist {
  game: {
    id: number;
    name: string;
    coverUrl: string | null;
    slug: string | null; // Geändert zu string | null um kompatibel zu sein
  };
}
export interface WishlistDealNotification {
  // Alternative Structure für Service-interne Verwendung
  gameName?: string;
  deals?: Array<{
    id: number;
    title: string;
    storeName: string;
    price: number | null;
    discountPercent: number | null;
    originalPrice: number | null;
    url: string;
  }>;
}

// ============================================================================
// IGDB TYPES
// ============================================================================
export interface IGDBGame {
  id: number;
  name: string;
  summary?: string;
  cover?: {
    id: number;
    url: string;
  };
  screenshots?: Array<{
    id: number;
    url: string;
  }>;
  videos?: Array<{
    id: number;
    name?: string;
    video_id: string;
    checksum?: string;
  }>;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  platforms?: Array<{
    id: number;
    name: string;
    abbreviation?: string;
  }>;
  involved_companies?: Array<{
    id: number;
    company: {
      id: number;
      name: string;
    };
    developer: boolean;
    publisher: boolean;
  }>;
  release_dates?: Array<{
    id: number;
    date: number;
    platform: number;
  }>;
  rating?: number;
  rating_count?: number;
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  first_release_date?: number;
  total_rating?: number;
  total_rating_count?: number;
}
export interface IGDBSearchResult {
  id: number;
  name: string;
  first_release_date?: number;
  platforms?: Array<{
    id: number;
    name: string;
  }>;
}
export interface IGDBGameData {
  id: number;
  name: string;
  summary?: string;
  storyline?: string;
  coverUrl?: string;
  screenshotUrls?: string[];
  videoUrls?: string[];
  websites?: Array<{ category: number; url: string }>;
  genres?: string[];
  developers?: string[];
  publishers?: string[];
  firstReleaseDate?: Date;
  totalRating?: number;
  platforms?: string[];
}

// ============================================================================
// CHEAPSHARK TYPES
// ============================================================================
export interface CheapSharkDeal {
  internalName: string;
  title: string;
  metacriticLink?: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText?: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID?: string;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb: string;
}
export interface CheapSharkStore {
  storeID: string;
  storeName: string;
  isActive: number;
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
}
export interface CheapSharkGameSearch {
  gameID: string;
  steamAppID: string | null;
  cheapest: string;
  cheapestDealID: string;
  external: string;
  internalName: string;
  thumb: string;
}
export interface CheapSharkGameDeal {
  storeID: string;
  dealID: string;
  price: string;
  retailPrice: string;
  savings: string;
}
export interface CheapSharkGameInfo {
  deals: CheapSharkGameDeal[];
  info: {
    title: string;
    steamAppID: string | null;
    thumb: string;
  };
  cheapestPriceEver?: {
    price: string;
    date: number;
  };
}
export interface CheapSharkDealDetails {
  gameInfo: {
    storeID: string;
    gameID: string;
    name: string;
    steamAppID: string;
    salePrice: string;
    retailPrice: string;
    steamRatingText: string;
    steamRatingPercent: string;
    steamRatingCount: string;
    metacriticScore: string;
    metacriticLink: string;
    releaseDate: number;
    publisher: string;
    steamworks: string;
    thumb: string;
  };
  cheaperStores: Array<{
    dealID: string;
    storeID: string;
    salePrice: string;
    retailPrice: string;
  }>;
  cheapestPrice: {
    price: string;
    date: number;
  };
}

// ============================================================================
// ITAD TYPES
// ============================================================================
export interface ITADGame {
  id: string;
  slug: string;
  title: string;
  type: 'game' | 'dlc' | 'bundle';
  mature: boolean;
  assets?: {
    boxart?: string;
    banner145?: string;
    banner300?: string;
    banner400?: string;
    banner600?: string;
  };
}
export interface ITADGameSearch {
  id: string;
  slug: string;
  title: string;
  type: 'game' | 'dlc' | 'bundle';
  mature: boolean;
  assets?: {
    boxart?: string;
    banner145?: string;
    banner300?: string;
  };
}
export interface ITADDeal {
  shop: {
    id: number;
    name: string;
  };
  price: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  regular: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  cut: number;
  voucher?: string;
  flag?: string;
  url: string;
  expiry?: string; // ISO date string
}
export interface ITADPrice {
  price: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  regular?: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  cut?: number;
  shop: {
    id: number;
    name: string;
  };
  url: string;
}
export interface ITADGamePrices {
  id: string;
  historyLow?: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  deals: ITADDeal[];
}
export interface ITADPriceOverview {
  prices: ITADGamePrices[];
  bundles: Array<{
    id: number;
    title: string;
    url: string;
    price: {
      amount: number;
      currency: string;
    };
    games: number;
  }>;
}
export interface ITADDealsListResponse {
  nextOffset?: number;
  hasMore: boolean;
  list: Array<{
    id: string;
    slug: string;
    title: string;
    type: 'game' | 'dlc';
    mature: boolean;
    shop: {
      id: number;
      name: string;
    };
    price: {
      amount: number;
      currency: string;
    };
    regular: {
      amount: number;
      currency: string;
    };
    cut: number;
    url: string;
    assets?: {
      boxart?: string;
    };
  }>;
}
export interface ITADWaitlistGame {
  id: string;
  slug: string;
  title: string;
  type: 'game' | 'dlc';
  mature: boolean;
  added: string; // ISO date string
  assets?: {
    boxart?: string;
  };
}
export interface ITADShop {
  id: number;
  title: string;
  deals: number;
  games: number;
  update: string | null;
}

// ============================================================================
// STEAM TYPES
// ============================================================================

export interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  rtime_last_played?: number;
  img_icon_url?: string;
  img_logo_url?: string;
}
export interface SteamLibraryResponse {
  response: {
    game_count: number;
    games: SteamGame[];
  };
}
export interface SteamResolveResponse {
  response: {
    steamid?: string;
    success: number;
  };
}
// Steam Import Interfaces
export interface SteamImportOptions {
  userId: number;
  platformId: number;
  withIGDBEnrichment?: boolean;
  batchSize?: number;
  operationId?: string;
}
export interface SteamImportProgress {
  current: number;
  total: number;
  phase: 'validation' | 'fetching' | 'importing' | 'enriching' | 'completed';
  message: string;
}
export interface SteamImportResult {
  success: boolean;
  totalGames: number;
  imported: number;
  updated: number;
  skipped: number;
  errors: number;
  enriched?: number;
  enrichmentErrors?: number;
  message?: string;
}

// ============================================================================
// EMAIL TYPES
// ============================================================================

export interface EmailDeal {
  storeName: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  url: string;
}

export interface EmailUser {
  id: number;
  supabase_uid: string;
  display_name?: string | null;
}

export interface EmailTemplateData {
  gameName: string;
  deals: EmailDeal[];
  userEmail: string;
  userName?: string;
}
