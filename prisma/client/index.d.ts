
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model Platform
 * 
 */
export type Platform = $Result.DefaultSelection<Prisma.$PlatformPayload>
/**
 * Model PlatformGame
 * 
 */
export type PlatformGame = $Result.DefaultSelection<Prisma.$PlatformGamePayload>
/**
 * Model UserGame
 * 
 */
export type UserGame = $Result.DefaultSelection<Prisma.$UserGamePayload>
/**
 * Model Deal
 * 
 */
export type Deal = $Result.DefaultSelection<Prisma.$DealPayload>
/**
 * Model Achievement
 * 
 */
export type Achievement = $Result.DefaultSelection<Prisma.$AchievementPayload>
/**
 * Model UserAchievement
 * 
 */
export type UserAchievement = $Result.DefaultSelection<Prisma.$UserAchievementPayload>
/**
 * Model Wishlist
 * 
 */
export type Wishlist = $Result.DefaultSelection<Prisma.$WishlistPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.platform`: Exposes CRUD operations for the **Platform** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Platforms
    * const platforms = await prisma.platform.findMany()
    * ```
    */
  get platform(): Prisma.PlatformDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.platformGame`: Exposes CRUD operations for the **PlatformGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlatformGames
    * const platformGames = await prisma.platformGame.findMany()
    * ```
    */
  get platformGame(): Prisma.PlatformGameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userGame`: Exposes CRUD operations for the **UserGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserGames
    * const userGames = await prisma.userGame.findMany()
    * ```
    */
  get userGame(): Prisma.UserGameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deal`: Exposes CRUD operations for the **Deal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deals
    * const deals = await prisma.deal.findMany()
    * ```
    */
  get deal(): Prisma.DealDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.achievement`: Exposes CRUD operations for the **Achievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievements
    * const achievements = await prisma.achievement.findMany()
    * ```
    */
  get achievement(): Prisma.AchievementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userAchievement`: Exposes CRUD operations for the **UserAchievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAchievements
    * const userAchievements = await prisma.userAchievement.findMany()
    * ```
    */
  get userAchievement(): Prisma.UserAchievementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wishlist`: Exposes CRUD operations for the **Wishlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wishlists
    * const wishlists = await prisma.wishlist.findMany()
    * ```
    */
  get wishlist(): Prisma.WishlistDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Game: 'Game',
    Platform: 'Platform',
    PlatformGame: 'PlatformGame',
    UserGame: 'UserGame',
    Deal: 'Deal',
    Achievement: 'Achievement',
    UserAchievement: 'UserAchievement',
    Wishlist: 'Wishlist'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "game" | "platform" | "platformGame" | "userGame" | "deal" | "achievement" | "userAchievement" | "wishlist"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      Platform: {
        payload: Prisma.$PlatformPayload<ExtArgs>
        fields: Prisma.PlatformFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          findFirst: {
            args: Prisma.PlatformFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          findMany: {
            args: Prisma.PlatformFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>[]
          }
          create: {
            args: Prisma.PlatformCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          createMany: {
            args: Prisma.PlatformCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlatformCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>[]
          }
          delete: {
            args: Prisma.PlatformDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          update: {
            args: Prisma.PlatformUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          deleteMany: {
            args: Prisma.PlatformDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlatformUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>[]
          }
          upsert: {
            args: Prisma.PlatformUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformPayload>
          }
          aggregate: {
            args: Prisma.PlatformAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatform>
          }
          groupBy: {
            args: Prisma.PlatformGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatformCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformCountAggregateOutputType> | number
          }
        }
      }
      PlatformGame: {
        payload: Prisma.$PlatformGamePayload<ExtArgs>
        fields: Prisma.PlatformGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload>
          }
          findFirst: {
            args: Prisma.PlatformGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload>
          }
          findMany: {
            args: Prisma.PlatformGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload>[]
          }
          create: {
            args: Prisma.PlatformGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload>
          }
          createMany: {
            args: Prisma.PlatformGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlatformGameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload>[]
          }
          delete: {
            args: Prisma.PlatformGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload>
          }
          update: {
            args: Prisma.PlatformGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload>
          }
          deleteMany: {
            args: Prisma.PlatformGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlatformGameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload>[]
          }
          upsert: {
            args: Prisma.PlatformGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformGamePayload>
          }
          aggregate: {
            args: Prisma.PlatformGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatformGame>
          }
          groupBy: {
            args: Prisma.PlatformGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformGameGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatformGameCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformGameCountAggregateOutputType> | number
          }
        }
      }
      UserGame: {
        payload: Prisma.$UserGamePayload<ExtArgs>
        fields: Prisma.UserGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          findFirst: {
            args: Prisma.UserGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          findMany: {
            args: Prisma.UserGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>[]
          }
          create: {
            args: Prisma.UserGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          createMany: {
            args: Prisma.UserGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserGameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>[]
          }
          delete: {
            args: Prisma.UserGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          update: {
            args: Prisma.UserGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          deleteMany: {
            args: Prisma.UserGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserGameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>[]
          }
          upsert: {
            args: Prisma.UserGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGamePayload>
          }
          aggregate: {
            args: Prisma.UserGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserGame>
          }
          groupBy: {
            args: Prisma.UserGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGameGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserGameCountArgs<ExtArgs>
            result: $Utils.Optional<UserGameCountAggregateOutputType> | number
          }
        }
      }
      Deal: {
        payload: Prisma.$DealPayload<ExtArgs>
        fields: Prisma.DealFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DealFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DealFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          findFirst: {
            args: Prisma.DealFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DealFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          findMany: {
            args: Prisma.DealFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          create: {
            args: Prisma.DealCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          createMany: {
            args: Prisma.DealCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DealCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          delete: {
            args: Prisma.DealDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          update: {
            args: Prisma.DealUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          deleteMany: {
            args: Prisma.DealDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DealUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DealUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          upsert: {
            args: Prisma.DealUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          aggregate: {
            args: Prisma.DealAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeal>
          }
          groupBy: {
            args: Prisma.DealGroupByArgs<ExtArgs>
            result: $Utils.Optional<DealGroupByOutputType>[]
          }
          count: {
            args: Prisma.DealCountArgs<ExtArgs>
            result: $Utils.Optional<DealCountAggregateOutputType> | number
          }
        }
      }
      Achievement: {
        payload: Prisma.$AchievementPayload<ExtArgs>
        fields: Prisma.AchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AchievementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AchievementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findFirst: {
            args: Prisma.AchievementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AchievementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findMany: {
            args: Prisma.AchievementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          create: {
            args: Prisma.AchievementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          createMany: {
            args: Prisma.AchievementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AchievementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          delete: {
            args: Prisma.AchievementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          update: {
            args: Prisma.AchievementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          deleteMany: {
            args: Prisma.AchievementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AchievementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AchievementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          upsert: {
            args: Prisma.AchievementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          aggregate: {
            args: Prisma.AchievementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAchievement>
          }
          groupBy: {
            args: Prisma.AchievementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AchievementCountArgs<ExtArgs>
            result: $Utils.Optional<AchievementCountAggregateOutputType> | number
          }
        }
      }
      UserAchievement: {
        payload: Prisma.$UserAchievementPayload<ExtArgs>
        fields: Prisma.UserAchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAchievementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAchievementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          findFirst: {
            args: Prisma.UserAchievementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAchievementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          findMany: {
            args: Prisma.UserAchievementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[]
          }
          create: {
            args: Prisma.UserAchievementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          createMany: {
            args: Prisma.UserAchievementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAchievementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[]
          }
          delete: {
            args: Prisma.UserAchievementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          update: {
            args: Prisma.UserAchievementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          deleteMany: {
            args: Prisma.UserAchievementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAchievementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserAchievementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[]
          }
          upsert: {
            args: Prisma.UserAchievementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          aggregate: {
            args: Prisma.UserAchievementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAchievement>
          }
          groupBy: {
            args: Prisma.UserAchievementGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAchievementCountArgs<ExtArgs>
            result: $Utils.Optional<UserAchievementCountAggregateOutputType> | number
          }
        }
      }
      Wishlist: {
        payload: Prisma.$WishlistPayload<ExtArgs>
        fields: Prisma.WishlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WishlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WishlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          findFirst: {
            args: Prisma.WishlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WishlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          findMany: {
            args: Prisma.WishlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>[]
          }
          create: {
            args: Prisma.WishlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          createMany: {
            args: Prisma.WishlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WishlistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>[]
          }
          delete: {
            args: Prisma.WishlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          update: {
            args: Prisma.WishlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          deleteMany: {
            args: Prisma.WishlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WishlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WishlistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>[]
          }
          upsert: {
            args: Prisma.WishlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          aggregate: {
            args: Prisma.WishlistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWishlist>
          }
          groupBy: {
            args: Prisma.WishlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<WishlistGroupByOutputType>[]
          }
          count: {
            args: Prisma.WishlistCountArgs<ExtArgs>
            result: $Utils.Optional<WishlistCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    game?: GameOmit
    platform?: PlatformOmit
    platformGame?: PlatformGameOmit
    userGame?: UserGameOmit
    deal?: DealOmit
    achievement?: AchievementOmit
    userAchievement?: UserAchievementOmit
    wishlist?: WishlistOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    userAchievements: number
    userGames: number
    wishlistItems: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAchievements?: boolean | UserCountOutputTypeCountUserAchievementsArgs
    userGames?: boolean | UserCountOutputTypeCountUserGamesArgs
    wishlistItems?: boolean | UserCountOutputTypeCountWishlistItemsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGameWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWishlistItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishlistWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    deals: number
    platformGames: number
    userGames: number
    wishlistedBy: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deals?: boolean | GameCountOutputTypeCountDealsArgs
    platformGames?: boolean | GameCountOutputTypeCountPlatformGamesArgs
    userGames?: boolean | GameCountOutputTypeCountUserGamesArgs
    wishlistedBy?: boolean | GameCountOutputTypeCountWishlistedByArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountDealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountPlatformGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformGameWhereInput
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountUserGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGameWhereInput
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountWishlistedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishlistWhereInput
  }


  /**
   * Count Type PlatformCountOutputType
   */

  export type PlatformCountOutputType = {
    platformGames: number
  }

  export type PlatformCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformGames?: boolean | PlatformCountOutputTypeCountPlatformGamesArgs
  }

  // Custom InputTypes
  /**
   * PlatformCountOutputType without action
   */
  export type PlatformCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformCountOutputType
     */
    select?: PlatformCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlatformCountOutputType without action
   */
  export type PlatformCountOutputTypeCountPlatformGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformGameWhereInput
  }


  /**
   * Count Type PlatformGameCountOutputType
   */

  export type PlatformGameCountOutputType = {
    deals: number
  }

  export type PlatformGameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deals?: boolean | PlatformGameCountOutputTypeCountDealsArgs
  }

  // Custom InputTypes
  /**
   * PlatformGameCountOutputType without action
   */
  export type PlatformGameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGameCountOutputType
     */
    select?: PlatformGameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlatformGameCountOutputType without action
   */
  export type PlatformGameCountOutputTypeCountDealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
  }


  /**
   * Count Type AchievementCountOutputType
   */

  export type AchievementCountOutputType = {
    userAchievements: number
  }

  export type AchievementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAchievements?: boolean | AchievementCountOutputTypeCountUserAchievementsArgs
  }

  // Custom InputTypes
  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AchievementCountOutputType
     */
    select?: AchievementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeCountUserAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    xp: number | null
    level: number | null
    credits: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    xp: number | null
    level: number | null
    credits: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    supabase_uid: string | null
    email: string | null
    display_name: string | null
    xp: number | null
    level: number | null
    credits: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    supabase_uid: string | null
    email: string | null
    display_name: string | null
    xp: number | null
    level: number | null
    credits: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    supabase_uid: number
    email: number
    display_name: number
    xp: number
    level: number
    credits: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    xp?: true
    level?: true
    credits?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    xp?: true
    level?: true
    credits?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    supabase_uid?: true
    email?: true
    display_name?: true
    xp?: true
    level?: true
    credits?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    supabase_uid?: true
    email?: true
    display_name?: true
    xp?: true
    level?: true
    credits?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    supabase_uid?: true
    email?: true
    display_name?: true
    xp?: true
    level?: true
    credits?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    supabase_uid: string
    email: string
    display_name: string | null
    xp: number
    level: number
    credits: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supabase_uid?: boolean
    email?: boolean
    display_name?: boolean
    xp?: boolean
    level?: boolean
    credits?: boolean
    userAchievements?: boolean | User$userAchievementsArgs<ExtArgs>
    userGames?: boolean | User$userGamesArgs<ExtArgs>
    wishlistItems?: boolean | User$wishlistItemsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supabase_uid?: boolean
    email?: boolean
    display_name?: boolean
    xp?: boolean
    level?: boolean
    credits?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supabase_uid?: boolean
    email?: boolean
    display_name?: boolean
    xp?: boolean
    level?: boolean
    credits?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    supabase_uid?: boolean
    email?: boolean
    display_name?: boolean
    xp?: boolean
    level?: boolean
    credits?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "supabase_uid" | "email" | "display_name" | "xp" | "level" | "credits", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAchievements?: boolean | User$userAchievementsArgs<ExtArgs>
    userGames?: boolean | User$userGamesArgs<ExtArgs>
    wishlistItems?: boolean | User$wishlistItemsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      userAchievements: Prisma.$UserAchievementPayload<ExtArgs>[]
      userGames: Prisma.$UserGamePayload<ExtArgs>[]
      wishlistItems: Prisma.$WishlistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      supabase_uid: string
      email: string
      display_name: string | null
      xp: number
      level: number
      credits: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userAchievements<T extends User$userAchievementsArgs<ExtArgs> = {}>(args?: Subset<T, User$userAchievementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userGames<T extends User$userGamesArgs<ExtArgs> = {}>(args?: Subset<T, User$userGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wishlistItems<T extends User$wishlistItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$wishlistItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly supabase_uid: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly display_name: FieldRef<"User", 'String'>
    readonly xp: FieldRef<"User", 'Int'>
    readonly level: FieldRef<"User", 'Int'>
    readonly credits: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.userAchievements
   */
  export type User$userAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    cursor?: UserAchievementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * User.userGames
   */
  export type User$userGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    where?: UserGameWhereInput
    orderBy?: UserGameOrderByWithRelationInput | UserGameOrderByWithRelationInput[]
    cursor?: UserGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGameScalarFieldEnum | UserGameScalarFieldEnum[]
  }

  /**
   * User.wishlistItems
   */
  export type User$wishlistItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    where?: WishlistWhereInput
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    cursor?: WishlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WishlistScalarFieldEnum | WishlistScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    id: number | null
  }

  export type GameSumAggregateOutputType = {
    id: number | null
  }

  export type GameMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    coverUrl: string | null
    releaseDate: Date | null
    developer: string | null
    publisher: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GameMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    coverUrl: string | null
    releaseDate: Date | null
    developer: string | null
    publisher: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    title: number
    description: number
    coverUrl: number
    releaseDate: number
    developer: number
    publisher: number
    genres: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    id?: true
  }

  export type GameSumAggregateInputType = {
    id?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    coverUrl?: true
    releaseDate?: true
    developer?: true
    publisher?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    coverUrl?: true
    releaseDate?: true
    developer?: true
    publisher?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    coverUrl?: true
    releaseDate?: true
    developer?: true
    publisher?: true
    genres?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: number
    title: string
    description: string | null
    coverUrl: string | null
    releaseDate: Date | null
    developer: string | null
    publisher: string | null
    genres: string[]
    createdAt: Date
    updatedAt: Date
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    coverUrl?: boolean
    releaseDate?: boolean
    developer?: boolean
    publisher?: boolean
    genres?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deals?: boolean | Game$dealsArgs<ExtArgs>
    platformGames?: boolean | Game$platformGamesArgs<ExtArgs>
    userGames?: boolean | Game$userGamesArgs<ExtArgs>
    wishlistedBy?: boolean | Game$wishlistedByArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    coverUrl?: boolean
    releaseDate?: boolean
    developer?: boolean
    publisher?: boolean
    genres?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    coverUrl?: boolean
    releaseDate?: boolean
    developer?: boolean
    publisher?: boolean
    genres?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    coverUrl?: boolean
    releaseDate?: boolean
    developer?: boolean
    publisher?: boolean
    genres?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "coverUrl" | "releaseDate" | "developer" | "publisher" | "genres" | "createdAt" | "updatedAt", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deals?: boolean | Game$dealsArgs<ExtArgs>
    platformGames?: boolean | Game$platformGamesArgs<ExtArgs>
    userGames?: boolean | Game$userGamesArgs<ExtArgs>
    wishlistedBy?: boolean | Game$wishlistedByArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      deals: Prisma.$DealPayload<ExtArgs>[]
      platformGames: Prisma.$PlatformGamePayload<ExtArgs>[]
      userGames: Prisma.$UserGamePayload<ExtArgs>[]
      wishlistedBy: Prisma.$WishlistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      coverUrl: string | null
      releaseDate: Date | null
      developer: string | null
      publisher: string | null
      genres: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deals<T extends Game$dealsArgs<ExtArgs> = {}>(args?: Subset<T, Game$dealsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    platformGames<T extends Game$platformGamesArgs<ExtArgs> = {}>(args?: Subset<T, Game$platformGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userGames<T extends Game$userGamesArgs<ExtArgs> = {}>(args?: Subset<T, Game$userGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wishlistedBy<T extends Game$wishlistedByArgs<ExtArgs> = {}>(args?: Subset<T, Game$wishlistedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'Int'>
    readonly title: FieldRef<"Game", 'String'>
    readonly description: FieldRef<"Game", 'String'>
    readonly coverUrl: FieldRef<"Game", 'String'>
    readonly releaseDate: FieldRef<"Game", 'DateTime'>
    readonly developer: FieldRef<"Game", 'String'>
    readonly publisher: FieldRef<"Game", 'String'>
    readonly genres: FieldRef<"Game", 'String[]'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
    readonly updatedAt: FieldRef<"Game", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.deals
   */
  export type Game$dealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    where?: DealWhereInput
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    cursor?: DealWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Game.platformGames
   */
  export type Game$platformGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    where?: PlatformGameWhereInput
    orderBy?: PlatformGameOrderByWithRelationInput | PlatformGameOrderByWithRelationInput[]
    cursor?: PlatformGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlatformGameScalarFieldEnum | PlatformGameScalarFieldEnum[]
  }

  /**
   * Game.userGames
   */
  export type Game$userGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    where?: UserGameWhereInput
    orderBy?: UserGameOrderByWithRelationInput | UserGameOrderByWithRelationInput[]
    cursor?: UserGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGameScalarFieldEnum | UserGameScalarFieldEnum[]
  }

  /**
   * Game.wishlistedBy
   */
  export type Game$wishlistedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    where?: WishlistWhereInput
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    cursor?: WishlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WishlistScalarFieldEnum | WishlistScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model Platform
   */

  export type AggregatePlatform = {
    _count: PlatformCountAggregateOutputType | null
    _avg: PlatformAvgAggregateOutputType | null
    _sum: PlatformSumAggregateOutputType | null
    _min: PlatformMinAggregateOutputType | null
    _max: PlatformMaxAggregateOutputType | null
  }

  export type PlatformAvgAggregateOutputType = {
    id: number | null
  }

  export type PlatformSumAggregateOutputType = {
    id: number | null
  }

  export type PlatformMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    iconUrl: string | null
    siteUrl: string | null
  }

  export type PlatformMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    iconUrl: string | null
    siteUrl: string | null
  }

  export type PlatformCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    iconUrl: number
    siteUrl: number
    _all: number
  }


  export type PlatformAvgAggregateInputType = {
    id?: true
  }

  export type PlatformSumAggregateInputType = {
    id?: true
  }

  export type PlatformMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    iconUrl?: true
    siteUrl?: true
  }

  export type PlatformMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    iconUrl?: true
    siteUrl?: true
  }

  export type PlatformCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    iconUrl?: true
    siteUrl?: true
    _all?: true
  }

  export type PlatformAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Platform to aggregate.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: PlatformOrderByWithRelationInput | PlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Platforms
    **/
    _count?: true | PlatformCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlatformAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlatformSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformMaxAggregateInputType
  }

  export type GetPlatformAggregateType<T extends PlatformAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatform]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatform[P]>
      : GetScalarType<T[P], AggregatePlatform[P]>
  }




  export type PlatformGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformWhereInput
    orderBy?: PlatformOrderByWithAggregationInput | PlatformOrderByWithAggregationInput[]
    by: PlatformScalarFieldEnum[] | PlatformScalarFieldEnum
    having?: PlatformScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformCountAggregateInputType | true
    _avg?: PlatformAvgAggregateInputType
    _sum?: PlatformSumAggregateInputType
    _min?: PlatformMinAggregateInputType
    _max?: PlatformMaxAggregateInputType
  }

  export type PlatformGroupByOutputType = {
    id: number
    name: string
    slug: string
    iconUrl: string | null
    siteUrl: string | null
    _count: PlatformCountAggregateOutputType | null
    _avg: PlatformAvgAggregateOutputType | null
    _sum: PlatformSumAggregateOutputType | null
    _min: PlatformMinAggregateOutputType | null
    _max: PlatformMaxAggregateOutputType | null
  }

  type GetPlatformGroupByPayload<T extends PlatformGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformGroupByOutputType[P]>
        }
      >
    >


  export type PlatformSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    iconUrl?: boolean
    siteUrl?: boolean
    platformGames?: boolean | Platform$platformGamesArgs<ExtArgs>
    _count?: boolean | PlatformCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platform"]>

  export type PlatformSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    iconUrl?: boolean
    siteUrl?: boolean
  }, ExtArgs["result"]["platform"]>

  export type PlatformSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    iconUrl?: boolean
    siteUrl?: boolean
  }, ExtArgs["result"]["platform"]>

  export type PlatformSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    iconUrl?: boolean
    siteUrl?: boolean
  }

  export type PlatformOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "iconUrl" | "siteUrl", ExtArgs["result"]["platform"]>
  export type PlatformInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformGames?: boolean | Platform$platformGamesArgs<ExtArgs>
    _count?: boolean | PlatformCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlatformIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlatformIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlatformPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Platform"
    objects: {
      platformGames: Prisma.$PlatformGamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      iconUrl: string | null
      siteUrl: string | null
    }, ExtArgs["result"]["platform"]>
    composites: {}
  }

  type PlatformGetPayload<S extends boolean | null | undefined | PlatformDefaultArgs> = $Result.GetResult<Prisma.$PlatformPayload, S>

  type PlatformCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlatformFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlatformCountAggregateInputType | true
    }

  export interface PlatformDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Platform'], meta: { name: 'Platform' } }
    /**
     * Find zero or one Platform that matches the filter.
     * @param {PlatformFindUniqueArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformFindUniqueArgs>(args: SelectSubset<T, PlatformFindUniqueArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Platform that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlatformFindUniqueOrThrowArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Platform that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformFindFirstArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformFindFirstArgs>(args?: SelectSubset<T, PlatformFindFirstArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Platform that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformFindFirstOrThrowArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Platforms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Platforms
     * const platforms = await prisma.platform.findMany()
     * 
     * // Get first 10 Platforms
     * const platforms = await prisma.platform.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformWithIdOnly = await prisma.platform.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformFindManyArgs>(args?: SelectSubset<T, PlatformFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Platform.
     * @param {PlatformCreateArgs} args - Arguments to create a Platform.
     * @example
     * // Create one Platform
     * const Platform = await prisma.platform.create({
     *   data: {
     *     // ... data to create a Platform
     *   }
     * })
     * 
     */
    create<T extends PlatformCreateArgs>(args: SelectSubset<T, PlatformCreateArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Platforms.
     * @param {PlatformCreateManyArgs} args - Arguments to create many Platforms.
     * @example
     * // Create many Platforms
     * const platform = await prisma.platform.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformCreateManyArgs>(args?: SelectSubset<T, PlatformCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Platforms and returns the data saved in the database.
     * @param {PlatformCreateManyAndReturnArgs} args - Arguments to create many Platforms.
     * @example
     * // Create many Platforms
     * const platform = await prisma.platform.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Platforms and only return the `id`
     * const platformWithIdOnly = await prisma.platform.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlatformCreateManyAndReturnArgs>(args?: SelectSubset<T, PlatformCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Platform.
     * @param {PlatformDeleteArgs} args - Arguments to delete one Platform.
     * @example
     * // Delete one Platform
     * const Platform = await prisma.platform.delete({
     *   where: {
     *     // ... filter to delete one Platform
     *   }
     * })
     * 
     */
    delete<T extends PlatformDeleteArgs>(args: SelectSubset<T, PlatformDeleteArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Platform.
     * @param {PlatformUpdateArgs} args - Arguments to update one Platform.
     * @example
     * // Update one Platform
     * const platform = await prisma.platform.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformUpdateArgs>(args: SelectSubset<T, PlatformUpdateArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Platforms.
     * @param {PlatformDeleteManyArgs} args - Arguments to filter Platforms to delete.
     * @example
     * // Delete a few Platforms
     * const { count } = await prisma.platform.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformDeleteManyArgs>(args?: SelectSubset<T, PlatformDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Platforms
     * const platform = await prisma.platform.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformUpdateManyArgs>(args: SelectSubset<T, PlatformUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Platforms and returns the data updated in the database.
     * @param {PlatformUpdateManyAndReturnArgs} args - Arguments to update many Platforms.
     * @example
     * // Update many Platforms
     * const platform = await prisma.platform.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Platforms and only return the `id`
     * const platformWithIdOnly = await prisma.platform.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlatformUpdateManyAndReturnArgs>(args: SelectSubset<T, PlatformUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Platform.
     * @param {PlatformUpsertArgs} args - Arguments to update or create a Platform.
     * @example
     * // Update or create a Platform
     * const platform = await prisma.platform.upsert({
     *   create: {
     *     // ... data to create a Platform
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Platform we want to update
     *   }
     * })
     */
    upsert<T extends PlatformUpsertArgs>(args: SelectSubset<T, PlatformUpsertArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformCountArgs} args - Arguments to filter Platforms to count.
     * @example
     * // Count the number of Platforms
     * const count = await prisma.platform.count({
     *   where: {
     *     // ... the filter for the Platforms we want to count
     *   }
     * })
    **/
    count<T extends PlatformCountArgs>(
      args?: Subset<T, PlatformCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Platform.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlatformAggregateArgs>(args: Subset<T, PlatformAggregateArgs>): Prisma.PrismaPromise<GetPlatformAggregateType<T>>

    /**
     * Group by Platform.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlatformGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformGroupByArgs['orderBy'] }
        : { orderBy?: PlatformGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlatformGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Platform model
   */
  readonly fields: PlatformFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Platform.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    platformGames<T extends Platform$platformGamesArgs<ExtArgs> = {}>(args?: Subset<T, Platform$platformGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Platform model
   */
  interface PlatformFieldRefs {
    readonly id: FieldRef<"Platform", 'Int'>
    readonly name: FieldRef<"Platform", 'String'>
    readonly slug: FieldRef<"Platform", 'String'>
    readonly iconUrl: FieldRef<"Platform", 'String'>
    readonly siteUrl: FieldRef<"Platform", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Platform findUnique
   */
  export type PlatformFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter, which Platform to fetch.
     */
    where: PlatformWhereUniqueInput
  }

  /**
   * Platform findUniqueOrThrow
   */
  export type PlatformFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter, which Platform to fetch.
     */
    where: PlatformWhereUniqueInput
  }

  /**
   * Platform findFirst
   */
  export type PlatformFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter, which Platform to fetch.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: PlatformOrderByWithRelationInput | PlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Platforms.
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Platforms.
     */
    distinct?: PlatformScalarFieldEnum | PlatformScalarFieldEnum[]
  }

  /**
   * Platform findFirstOrThrow
   */
  export type PlatformFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter, which Platform to fetch.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: PlatformOrderByWithRelationInput | PlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Platforms.
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Platforms.
     */
    distinct?: PlatformScalarFieldEnum | PlatformScalarFieldEnum[]
  }

  /**
   * Platform findMany
   */
  export type PlatformFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter, which Platforms to fetch.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: PlatformOrderByWithRelationInput | PlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Platforms.
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    distinct?: PlatformScalarFieldEnum | PlatformScalarFieldEnum[]
  }

  /**
   * Platform create
   */
  export type PlatformCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * The data needed to create a Platform.
     */
    data: XOR<PlatformCreateInput, PlatformUncheckedCreateInput>
  }

  /**
   * Platform createMany
   */
  export type PlatformCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Platforms.
     */
    data: PlatformCreateManyInput | PlatformCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Platform createManyAndReturn
   */
  export type PlatformCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * The data used to create many Platforms.
     */
    data: PlatformCreateManyInput | PlatformCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Platform update
   */
  export type PlatformUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * The data needed to update a Platform.
     */
    data: XOR<PlatformUpdateInput, PlatformUncheckedUpdateInput>
    /**
     * Choose, which Platform to update.
     */
    where: PlatformWhereUniqueInput
  }

  /**
   * Platform updateMany
   */
  export type PlatformUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Platforms.
     */
    data: XOR<PlatformUpdateManyMutationInput, PlatformUncheckedUpdateManyInput>
    /**
     * Filter which Platforms to update
     */
    where?: PlatformWhereInput
    /**
     * Limit how many Platforms to update.
     */
    limit?: number
  }

  /**
   * Platform updateManyAndReturn
   */
  export type PlatformUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * The data used to update Platforms.
     */
    data: XOR<PlatformUpdateManyMutationInput, PlatformUncheckedUpdateManyInput>
    /**
     * Filter which Platforms to update
     */
    where?: PlatformWhereInput
    /**
     * Limit how many Platforms to update.
     */
    limit?: number
  }

  /**
   * Platform upsert
   */
  export type PlatformUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * The filter to search for the Platform to update in case it exists.
     */
    where: PlatformWhereUniqueInput
    /**
     * In case the Platform found by the `where` argument doesn't exist, create a new Platform with this data.
     */
    create: XOR<PlatformCreateInput, PlatformUncheckedCreateInput>
    /**
     * In case the Platform was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformUpdateInput, PlatformUncheckedUpdateInput>
  }

  /**
   * Platform delete
   */
  export type PlatformDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
    /**
     * Filter which Platform to delete.
     */
    where: PlatformWhereUniqueInput
  }

  /**
   * Platform deleteMany
   */
  export type PlatformDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Platforms to delete
     */
    where?: PlatformWhereInput
    /**
     * Limit how many Platforms to delete.
     */
    limit?: number
  }

  /**
   * Platform.platformGames
   */
  export type Platform$platformGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    where?: PlatformGameWhereInput
    orderBy?: PlatformGameOrderByWithRelationInput | PlatformGameOrderByWithRelationInput[]
    cursor?: PlatformGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlatformGameScalarFieldEnum | PlatformGameScalarFieldEnum[]
  }

  /**
   * Platform without action
   */
  export type PlatformDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platform
     */
    omit?: PlatformOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformInclude<ExtArgs> | null
  }


  /**
   * Model PlatformGame
   */

  export type AggregatePlatformGame = {
    _count: PlatformGameCountAggregateOutputType | null
    _avg: PlatformGameAvgAggregateOutputType | null
    _sum: PlatformGameSumAggregateOutputType | null
    _min: PlatformGameMinAggregateOutputType | null
    _max: PlatformGameMaxAggregateOutputType | null
  }

  export type PlatformGameAvgAggregateOutputType = {
    id: number | null
    gameId: number | null
    platformId: number | null
  }

  export type PlatformGameSumAggregateOutputType = {
    id: number | null
    gameId: number | null
    platformId: number | null
  }

  export type PlatformGameMinAggregateOutputType = {
    id: number | null
    gameId: number | null
    platformId: number | null
    platformSpecificId: string | null
    url: string | null
  }

  export type PlatformGameMaxAggregateOutputType = {
    id: number | null
    gameId: number | null
    platformId: number | null
    platformSpecificId: string | null
    url: string | null
  }

  export type PlatformGameCountAggregateOutputType = {
    id: number
    gameId: number
    platformId: number
    platformSpecificId: number
    url: number
    _all: number
  }


  export type PlatformGameAvgAggregateInputType = {
    id?: true
    gameId?: true
    platformId?: true
  }

  export type PlatformGameSumAggregateInputType = {
    id?: true
    gameId?: true
    platformId?: true
  }

  export type PlatformGameMinAggregateInputType = {
    id?: true
    gameId?: true
    platformId?: true
    platformSpecificId?: true
    url?: true
  }

  export type PlatformGameMaxAggregateInputType = {
    id?: true
    gameId?: true
    platformId?: true
    platformSpecificId?: true
    url?: true
  }

  export type PlatformGameCountAggregateInputType = {
    id?: true
    gameId?: true
    platformId?: true
    platformSpecificId?: true
    url?: true
    _all?: true
  }

  export type PlatformGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformGame to aggregate.
     */
    where?: PlatformGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformGames to fetch.
     */
    orderBy?: PlatformGameOrderByWithRelationInput | PlatformGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlatformGames
    **/
    _count?: true | PlatformGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlatformGameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlatformGameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformGameMaxAggregateInputType
  }

  export type GetPlatformGameAggregateType<T extends PlatformGameAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatformGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatformGame[P]>
      : GetScalarType<T[P], AggregatePlatformGame[P]>
  }




  export type PlatformGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformGameWhereInput
    orderBy?: PlatformGameOrderByWithAggregationInput | PlatformGameOrderByWithAggregationInput[]
    by: PlatformGameScalarFieldEnum[] | PlatformGameScalarFieldEnum
    having?: PlatformGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformGameCountAggregateInputType | true
    _avg?: PlatformGameAvgAggregateInputType
    _sum?: PlatformGameSumAggregateInputType
    _min?: PlatformGameMinAggregateInputType
    _max?: PlatformGameMaxAggregateInputType
  }

  export type PlatformGameGroupByOutputType = {
    id: number
    gameId: number
    platformId: number
    platformSpecificId: string
    url: string | null
    _count: PlatformGameCountAggregateOutputType | null
    _avg: PlatformGameAvgAggregateOutputType | null
    _sum: PlatformGameSumAggregateOutputType | null
    _min: PlatformGameMinAggregateOutputType | null
    _max: PlatformGameMaxAggregateOutputType | null
  }

  type GetPlatformGameGroupByPayload<T extends PlatformGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformGameGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformGameGroupByOutputType[P]>
        }
      >
    >


  export type PlatformGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    platformId?: boolean
    platformSpecificId?: boolean
    url?: boolean
    deals?: boolean | PlatformGame$dealsArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
    platform?: boolean | PlatformDefaultArgs<ExtArgs>
    _count?: boolean | PlatformGameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platformGame"]>

  export type PlatformGameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    platformId?: boolean
    platformSpecificId?: boolean
    url?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    platform?: boolean | PlatformDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platformGame"]>

  export type PlatformGameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    platformId?: boolean
    platformSpecificId?: boolean
    url?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    platform?: boolean | PlatformDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platformGame"]>

  export type PlatformGameSelectScalar = {
    id?: boolean
    gameId?: boolean
    platformId?: boolean
    platformSpecificId?: boolean
    url?: boolean
  }

  export type PlatformGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "platformId" | "platformSpecificId" | "url", ExtArgs["result"]["platformGame"]>
  export type PlatformGameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deals?: boolean | PlatformGame$dealsArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
    platform?: boolean | PlatformDefaultArgs<ExtArgs>
    _count?: boolean | PlatformGameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlatformGameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    platform?: boolean | PlatformDefaultArgs<ExtArgs>
  }
  export type PlatformGameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    platform?: boolean | PlatformDefaultArgs<ExtArgs>
  }

  export type $PlatformGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlatformGame"
    objects: {
      deals: Prisma.$DealPayload<ExtArgs>[]
      game: Prisma.$GamePayload<ExtArgs>
      platform: Prisma.$PlatformPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      gameId: number
      platformId: number
      platformSpecificId: string
      url: string | null
    }, ExtArgs["result"]["platformGame"]>
    composites: {}
  }

  type PlatformGameGetPayload<S extends boolean | null | undefined | PlatformGameDefaultArgs> = $Result.GetResult<Prisma.$PlatformGamePayload, S>

  type PlatformGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlatformGameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlatformGameCountAggregateInputType | true
    }

  export interface PlatformGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlatformGame'], meta: { name: 'PlatformGame' } }
    /**
     * Find zero or one PlatformGame that matches the filter.
     * @param {PlatformGameFindUniqueArgs} args - Arguments to find a PlatformGame
     * @example
     * // Get one PlatformGame
     * const platformGame = await prisma.platformGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformGameFindUniqueArgs>(args: SelectSubset<T, PlatformGameFindUniqueArgs<ExtArgs>>): Prisma__PlatformGameClient<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlatformGame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlatformGameFindUniqueOrThrowArgs} args - Arguments to find a PlatformGame
     * @example
     * // Get one PlatformGame
     * const platformGame = await prisma.platformGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformGameFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformGameClient<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlatformGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformGameFindFirstArgs} args - Arguments to find a PlatformGame
     * @example
     * // Get one PlatformGame
     * const platformGame = await prisma.platformGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformGameFindFirstArgs>(args?: SelectSubset<T, PlatformGameFindFirstArgs<ExtArgs>>): Prisma__PlatformGameClient<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlatformGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformGameFindFirstOrThrowArgs} args - Arguments to find a PlatformGame
     * @example
     * // Get one PlatformGame
     * const platformGame = await prisma.platformGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformGameFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformGameClient<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlatformGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlatformGames
     * const platformGames = await prisma.platformGame.findMany()
     * 
     * // Get first 10 PlatformGames
     * const platformGames = await prisma.platformGame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformGameWithIdOnly = await prisma.platformGame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformGameFindManyArgs>(args?: SelectSubset<T, PlatformGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlatformGame.
     * @param {PlatformGameCreateArgs} args - Arguments to create a PlatformGame.
     * @example
     * // Create one PlatformGame
     * const PlatformGame = await prisma.platformGame.create({
     *   data: {
     *     // ... data to create a PlatformGame
     *   }
     * })
     * 
     */
    create<T extends PlatformGameCreateArgs>(args: SelectSubset<T, PlatformGameCreateArgs<ExtArgs>>): Prisma__PlatformGameClient<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlatformGames.
     * @param {PlatformGameCreateManyArgs} args - Arguments to create many PlatformGames.
     * @example
     * // Create many PlatformGames
     * const platformGame = await prisma.platformGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformGameCreateManyArgs>(args?: SelectSubset<T, PlatformGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlatformGames and returns the data saved in the database.
     * @param {PlatformGameCreateManyAndReturnArgs} args - Arguments to create many PlatformGames.
     * @example
     * // Create many PlatformGames
     * const platformGame = await prisma.platformGame.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlatformGames and only return the `id`
     * const platformGameWithIdOnly = await prisma.platformGame.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlatformGameCreateManyAndReturnArgs>(args?: SelectSubset<T, PlatformGameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlatformGame.
     * @param {PlatformGameDeleteArgs} args - Arguments to delete one PlatformGame.
     * @example
     * // Delete one PlatformGame
     * const PlatformGame = await prisma.platformGame.delete({
     *   where: {
     *     // ... filter to delete one PlatformGame
     *   }
     * })
     * 
     */
    delete<T extends PlatformGameDeleteArgs>(args: SelectSubset<T, PlatformGameDeleteArgs<ExtArgs>>): Prisma__PlatformGameClient<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlatformGame.
     * @param {PlatformGameUpdateArgs} args - Arguments to update one PlatformGame.
     * @example
     * // Update one PlatformGame
     * const platformGame = await prisma.platformGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformGameUpdateArgs>(args: SelectSubset<T, PlatformGameUpdateArgs<ExtArgs>>): Prisma__PlatformGameClient<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlatformGames.
     * @param {PlatformGameDeleteManyArgs} args - Arguments to filter PlatformGames to delete.
     * @example
     * // Delete a few PlatformGames
     * const { count } = await prisma.platformGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformGameDeleteManyArgs>(args?: SelectSubset<T, PlatformGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlatformGames
     * const platformGame = await prisma.platformGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformGameUpdateManyArgs>(args: SelectSubset<T, PlatformGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformGames and returns the data updated in the database.
     * @param {PlatformGameUpdateManyAndReturnArgs} args - Arguments to update many PlatformGames.
     * @example
     * // Update many PlatformGames
     * const platformGame = await prisma.platformGame.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlatformGames and only return the `id`
     * const platformGameWithIdOnly = await prisma.platformGame.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlatformGameUpdateManyAndReturnArgs>(args: SelectSubset<T, PlatformGameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlatformGame.
     * @param {PlatformGameUpsertArgs} args - Arguments to update or create a PlatformGame.
     * @example
     * // Update or create a PlatformGame
     * const platformGame = await prisma.platformGame.upsert({
     *   create: {
     *     // ... data to create a PlatformGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlatformGame we want to update
     *   }
     * })
     */
    upsert<T extends PlatformGameUpsertArgs>(args: SelectSubset<T, PlatformGameUpsertArgs<ExtArgs>>): Prisma__PlatformGameClient<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlatformGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformGameCountArgs} args - Arguments to filter PlatformGames to count.
     * @example
     * // Count the number of PlatformGames
     * const count = await prisma.platformGame.count({
     *   where: {
     *     // ... the filter for the PlatformGames we want to count
     *   }
     * })
    **/
    count<T extends PlatformGameCountArgs>(
      args?: Subset<T, PlatformGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlatformGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlatformGameAggregateArgs>(args: Subset<T, PlatformGameAggregateArgs>): Prisma.PrismaPromise<GetPlatformGameAggregateType<T>>

    /**
     * Group by PlatformGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformGameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlatformGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformGameGroupByArgs['orderBy'] }
        : { orderBy?: PlatformGameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlatformGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlatformGame model
   */
  readonly fields: PlatformGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlatformGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deals<T extends PlatformGame$dealsArgs<ExtArgs> = {}>(args?: Subset<T, PlatformGame$dealsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    platform<T extends PlatformDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlatformDefaultArgs<ExtArgs>>): Prisma__PlatformClient<$Result.GetResult<Prisma.$PlatformPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlatformGame model
   */
  interface PlatformGameFieldRefs {
    readonly id: FieldRef<"PlatformGame", 'Int'>
    readonly gameId: FieldRef<"PlatformGame", 'Int'>
    readonly platformId: FieldRef<"PlatformGame", 'Int'>
    readonly platformSpecificId: FieldRef<"PlatformGame", 'String'>
    readonly url: FieldRef<"PlatformGame", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PlatformGame findUnique
   */
  export type PlatformGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    /**
     * Filter, which PlatformGame to fetch.
     */
    where: PlatformGameWhereUniqueInput
  }

  /**
   * PlatformGame findUniqueOrThrow
   */
  export type PlatformGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    /**
     * Filter, which PlatformGame to fetch.
     */
    where: PlatformGameWhereUniqueInput
  }

  /**
   * PlatformGame findFirst
   */
  export type PlatformGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    /**
     * Filter, which PlatformGame to fetch.
     */
    where?: PlatformGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformGames to fetch.
     */
    orderBy?: PlatformGameOrderByWithRelationInput | PlatformGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformGames.
     */
    cursor?: PlatformGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformGames.
     */
    distinct?: PlatformGameScalarFieldEnum | PlatformGameScalarFieldEnum[]
  }

  /**
   * PlatformGame findFirstOrThrow
   */
  export type PlatformGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    /**
     * Filter, which PlatformGame to fetch.
     */
    where?: PlatformGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformGames to fetch.
     */
    orderBy?: PlatformGameOrderByWithRelationInput | PlatformGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformGames.
     */
    cursor?: PlatformGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformGames.
     */
    distinct?: PlatformGameScalarFieldEnum | PlatformGameScalarFieldEnum[]
  }

  /**
   * PlatformGame findMany
   */
  export type PlatformGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    /**
     * Filter, which PlatformGames to fetch.
     */
    where?: PlatformGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformGames to fetch.
     */
    orderBy?: PlatformGameOrderByWithRelationInput | PlatformGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlatformGames.
     */
    cursor?: PlatformGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformGames.
     */
    skip?: number
    distinct?: PlatformGameScalarFieldEnum | PlatformGameScalarFieldEnum[]
  }

  /**
   * PlatformGame create
   */
  export type PlatformGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    /**
     * The data needed to create a PlatformGame.
     */
    data: XOR<PlatformGameCreateInput, PlatformGameUncheckedCreateInput>
  }

  /**
   * PlatformGame createMany
   */
  export type PlatformGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlatformGames.
     */
    data: PlatformGameCreateManyInput | PlatformGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlatformGame createManyAndReturn
   */
  export type PlatformGameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * The data used to create many PlatformGames.
     */
    data: PlatformGameCreateManyInput | PlatformGameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlatformGame update
   */
  export type PlatformGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    /**
     * The data needed to update a PlatformGame.
     */
    data: XOR<PlatformGameUpdateInput, PlatformGameUncheckedUpdateInput>
    /**
     * Choose, which PlatformGame to update.
     */
    where: PlatformGameWhereUniqueInput
  }

  /**
   * PlatformGame updateMany
   */
  export type PlatformGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlatformGames.
     */
    data: XOR<PlatformGameUpdateManyMutationInput, PlatformGameUncheckedUpdateManyInput>
    /**
     * Filter which PlatformGames to update
     */
    where?: PlatformGameWhereInput
    /**
     * Limit how many PlatformGames to update.
     */
    limit?: number
  }

  /**
   * PlatformGame updateManyAndReturn
   */
  export type PlatformGameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * The data used to update PlatformGames.
     */
    data: XOR<PlatformGameUpdateManyMutationInput, PlatformGameUncheckedUpdateManyInput>
    /**
     * Filter which PlatformGames to update
     */
    where?: PlatformGameWhereInput
    /**
     * Limit how many PlatformGames to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlatformGame upsert
   */
  export type PlatformGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    /**
     * The filter to search for the PlatformGame to update in case it exists.
     */
    where: PlatformGameWhereUniqueInput
    /**
     * In case the PlatformGame found by the `where` argument doesn't exist, create a new PlatformGame with this data.
     */
    create: XOR<PlatformGameCreateInput, PlatformGameUncheckedCreateInput>
    /**
     * In case the PlatformGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformGameUpdateInput, PlatformGameUncheckedUpdateInput>
  }

  /**
   * PlatformGame delete
   */
  export type PlatformGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    /**
     * Filter which PlatformGame to delete.
     */
    where: PlatformGameWhereUniqueInput
  }

  /**
   * PlatformGame deleteMany
   */
  export type PlatformGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformGames to delete
     */
    where?: PlatformGameWhereInput
    /**
     * Limit how many PlatformGames to delete.
     */
    limit?: number
  }

  /**
   * PlatformGame.deals
   */
  export type PlatformGame$dealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    where?: DealWhereInput
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    cursor?: DealWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * PlatformGame without action
   */
  export type PlatformGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
  }


  /**
   * Model UserGame
   */

  export type AggregateUserGame = {
    _count: UserGameCountAggregateOutputType | null
    _avg: UserGameAvgAggregateOutputType | null
    _sum: UserGameSumAggregateOutputType | null
    _min: UserGameMinAggregateOutputType | null
    _max: UserGameMaxAggregateOutputType | null
  }

  export type UserGameAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    playtimeMinutes: number | null
    rating: number | null
  }

  export type UserGameSumAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    playtimeMinutes: number | null
    rating: number | null
  }

  export type UserGameMinAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    addedAt: Date | null
    playtimeMinutes: number | null
    lastPlayed: Date | null
    isInstalled: boolean | null
    notes: string | null
    rating: number | null
  }

  export type UserGameMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    addedAt: Date | null
    playtimeMinutes: number | null
    lastPlayed: Date | null
    isInstalled: boolean | null
    notes: string | null
    rating: number | null
  }

  export type UserGameCountAggregateOutputType = {
    id: number
    userId: number
    gameId: number
    addedAt: number
    playtimeMinutes: number
    lastPlayed: number
    isInstalled: number
    notes: number
    rating: number
    _all: number
  }


  export type UserGameAvgAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    playtimeMinutes?: true
    rating?: true
  }

  export type UserGameSumAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    playtimeMinutes?: true
    rating?: true
  }

  export type UserGameMinAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    addedAt?: true
    playtimeMinutes?: true
    lastPlayed?: true
    isInstalled?: true
    notes?: true
    rating?: true
  }

  export type UserGameMaxAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    addedAt?: true
    playtimeMinutes?: true
    lastPlayed?: true
    isInstalled?: true
    notes?: true
    rating?: true
  }

  export type UserGameCountAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    addedAt?: true
    playtimeMinutes?: true
    lastPlayed?: true
    isInstalled?: true
    notes?: true
    rating?: true
    _all?: true
  }

  export type UserGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGame to aggregate.
     */
    where?: UserGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGames to fetch.
     */
    orderBy?: UserGameOrderByWithRelationInput | UserGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserGames
    **/
    _count?: true | UserGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserGameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserGameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserGameMaxAggregateInputType
  }

  export type GetUserGameAggregateType<T extends UserGameAggregateArgs> = {
        [P in keyof T & keyof AggregateUserGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserGame[P]>
      : GetScalarType<T[P], AggregateUserGame[P]>
  }




  export type UserGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGameWhereInput
    orderBy?: UserGameOrderByWithAggregationInput | UserGameOrderByWithAggregationInput[]
    by: UserGameScalarFieldEnum[] | UserGameScalarFieldEnum
    having?: UserGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserGameCountAggregateInputType | true
    _avg?: UserGameAvgAggregateInputType
    _sum?: UserGameSumAggregateInputType
    _min?: UserGameMinAggregateInputType
    _max?: UserGameMaxAggregateInputType
  }

  export type UserGameGroupByOutputType = {
    id: number
    userId: number
    gameId: number
    addedAt: Date
    playtimeMinutes: number | null
    lastPlayed: Date | null
    isInstalled: boolean
    notes: string | null
    rating: number | null
    _count: UserGameCountAggregateOutputType | null
    _avg: UserGameAvgAggregateOutputType | null
    _sum: UserGameSumAggregateOutputType | null
    _min: UserGameMinAggregateOutputType | null
    _max: UserGameMaxAggregateOutputType | null
  }

  type GetUserGameGroupByPayload<T extends UserGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGameGroupByOutputType[P]>
            : GetScalarType<T[P], UserGameGroupByOutputType[P]>
        }
      >
    >


  export type UserGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    addedAt?: boolean
    playtimeMinutes?: boolean
    lastPlayed?: boolean
    isInstalled?: boolean
    notes?: boolean
    rating?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGame"]>

  export type UserGameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    addedAt?: boolean
    playtimeMinutes?: boolean
    lastPlayed?: boolean
    isInstalled?: boolean
    notes?: boolean
    rating?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGame"]>

  export type UserGameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    addedAt?: boolean
    playtimeMinutes?: boolean
    lastPlayed?: boolean
    isInstalled?: boolean
    notes?: boolean
    rating?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGame"]>

  export type UserGameSelectScalar = {
    id?: boolean
    userId?: boolean
    gameId?: boolean
    addedAt?: boolean
    playtimeMinutes?: boolean
    lastPlayed?: boolean
    isInstalled?: boolean
    notes?: boolean
    rating?: boolean
  }

  export type UserGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "gameId" | "addedAt" | "playtimeMinutes" | "lastPlayed" | "isInstalled" | "notes" | "rating", ExtArgs["result"]["userGame"]>
  export type UserGameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserGameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserGameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserGame"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      gameId: number
      addedAt: Date
      playtimeMinutes: number | null
      lastPlayed: Date | null
      isInstalled: boolean
      notes: string | null
      rating: number | null
    }, ExtArgs["result"]["userGame"]>
    composites: {}
  }

  type UserGameGetPayload<S extends boolean | null | undefined | UserGameDefaultArgs> = $Result.GetResult<Prisma.$UserGamePayload, S>

  type UserGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserGameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserGameCountAggregateInputType | true
    }

  export interface UserGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserGame'], meta: { name: 'UserGame' } }
    /**
     * Find zero or one UserGame that matches the filter.
     * @param {UserGameFindUniqueArgs} args - Arguments to find a UserGame
     * @example
     * // Get one UserGame
     * const userGame = await prisma.userGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserGameFindUniqueArgs>(args: SelectSubset<T, UserGameFindUniqueArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserGame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserGameFindUniqueOrThrowArgs} args - Arguments to find a UserGame
     * @example
     * // Get one UserGame
     * const userGame = await prisma.userGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserGameFindUniqueOrThrowArgs>(args: SelectSubset<T, UserGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameFindFirstArgs} args - Arguments to find a UserGame
     * @example
     * // Get one UserGame
     * const userGame = await prisma.userGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserGameFindFirstArgs>(args?: SelectSubset<T, UserGameFindFirstArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameFindFirstOrThrowArgs} args - Arguments to find a UserGame
     * @example
     * // Get one UserGame
     * const userGame = await prisma.userGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserGameFindFirstOrThrowArgs>(args?: SelectSubset<T, UserGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserGames
     * const userGames = await prisma.userGame.findMany()
     * 
     * // Get first 10 UserGames
     * const userGames = await prisma.userGame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userGameWithIdOnly = await prisma.userGame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserGameFindManyArgs>(args?: SelectSubset<T, UserGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserGame.
     * @param {UserGameCreateArgs} args - Arguments to create a UserGame.
     * @example
     * // Create one UserGame
     * const UserGame = await prisma.userGame.create({
     *   data: {
     *     // ... data to create a UserGame
     *   }
     * })
     * 
     */
    create<T extends UserGameCreateArgs>(args: SelectSubset<T, UserGameCreateArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserGames.
     * @param {UserGameCreateManyArgs} args - Arguments to create many UserGames.
     * @example
     * // Create many UserGames
     * const userGame = await prisma.userGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserGameCreateManyArgs>(args?: SelectSubset<T, UserGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserGames and returns the data saved in the database.
     * @param {UserGameCreateManyAndReturnArgs} args - Arguments to create many UserGames.
     * @example
     * // Create many UserGames
     * const userGame = await prisma.userGame.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserGames and only return the `id`
     * const userGameWithIdOnly = await prisma.userGame.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserGameCreateManyAndReturnArgs>(args?: SelectSubset<T, UserGameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserGame.
     * @param {UserGameDeleteArgs} args - Arguments to delete one UserGame.
     * @example
     * // Delete one UserGame
     * const UserGame = await prisma.userGame.delete({
     *   where: {
     *     // ... filter to delete one UserGame
     *   }
     * })
     * 
     */
    delete<T extends UserGameDeleteArgs>(args: SelectSubset<T, UserGameDeleteArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserGame.
     * @param {UserGameUpdateArgs} args - Arguments to update one UserGame.
     * @example
     * // Update one UserGame
     * const userGame = await prisma.userGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserGameUpdateArgs>(args: SelectSubset<T, UserGameUpdateArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserGames.
     * @param {UserGameDeleteManyArgs} args - Arguments to filter UserGames to delete.
     * @example
     * // Delete a few UserGames
     * const { count } = await prisma.userGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserGameDeleteManyArgs>(args?: SelectSubset<T, UserGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserGames
     * const userGame = await prisma.userGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserGameUpdateManyArgs>(args: SelectSubset<T, UserGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGames and returns the data updated in the database.
     * @param {UserGameUpdateManyAndReturnArgs} args - Arguments to update many UserGames.
     * @example
     * // Update many UserGames
     * const userGame = await prisma.userGame.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserGames and only return the `id`
     * const userGameWithIdOnly = await prisma.userGame.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserGameUpdateManyAndReturnArgs>(args: SelectSubset<T, UserGameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserGame.
     * @param {UserGameUpsertArgs} args - Arguments to update or create a UserGame.
     * @example
     * // Update or create a UserGame
     * const userGame = await prisma.userGame.upsert({
     *   create: {
     *     // ... data to create a UserGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserGame we want to update
     *   }
     * })
     */
    upsert<T extends UserGameUpsertArgs>(args: SelectSubset<T, UserGameUpsertArgs<ExtArgs>>): Prisma__UserGameClient<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameCountArgs} args - Arguments to filter UserGames to count.
     * @example
     * // Count the number of UserGames
     * const count = await prisma.userGame.count({
     *   where: {
     *     // ... the filter for the UserGames we want to count
     *   }
     * })
    **/
    count<T extends UserGameCountArgs>(
      args?: Subset<T, UserGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserGameAggregateArgs>(args: Subset<T, UserGameAggregateArgs>): Prisma.PrismaPromise<GetUserGameAggregateType<T>>

    /**
     * Group by UserGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGameGroupByArgs['orderBy'] }
        : { orderBy?: UserGameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserGame model
   */
  readonly fields: UserGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserGame model
   */
  interface UserGameFieldRefs {
    readonly id: FieldRef<"UserGame", 'Int'>
    readonly userId: FieldRef<"UserGame", 'Int'>
    readonly gameId: FieldRef<"UserGame", 'Int'>
    readonly addedAt: FieldRef<"UserGame", 'DateTime'>
    readonly playtimeMinutes: FieldRef<"UserGame", 'Int'>
    readonly lastPlayed: FieldRef<"UserGame", 'DateTime'>
    readonly isInstalled: FieldRef<"UserGame", 'Boolean'>
    readonly notes: FieldRef<"UserGame", 'String'>
    readonly rating: FieldRef<"UserGame", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserGame findUnique
   */
  export type UserGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    /**
     * Filter, which UserGame to fetch.
     */
    where: UserGameWhereUniqueInput
  }

  /**
   * UserGame findUniqueOrThrow
   */
  export type UserGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    /**
     * Filter, which UserGame to fetch.
     */
    where: UserGameWhereUniqueInput
  }

  /**
   * UserGame findFirst
   */
  export type UserGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    /**
     * Filter, which UserGame to fetch.
     */
    where?: UserGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGames to fetch.
     */
    orderBy?: UserGameOrderByWithRelationInput | UserGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGames.
     */
    cursor?: UserGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGames.
     */
    distinct?: UserGameScalarFieldEnum | UserGameScalarFieldEnum[]
  }

  /**
   * UserGame findFirstOrThrow
   */
  export type UserGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    /**
     * Filter, which UserGame to fetch.
     */
    where?: UserGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGames to fetch.
     */
    orderBy?: UserGameOrderByWithRelationInput | UserGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGames.
     */
    cursor?: UserGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGames.
     */
    distinct?: UserGameScalarFieldEnum | UserGameScalarFieldEnum[]
  }

  /**
   * UserGame findMany
   */
  export type UserGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    /**
     * Filter, which UserGames to fetch.
     */
    where?: UserGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGames to fetch.
     */
    orderBy?: UserGameOrderByWithRelationInput | UserGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserGames.
     */
    cursor?: UserGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGames.
     */
    skip?: number
    distinct?: UserGameScalarFieldEnum | UserGameScalarFieldEnum[]
  }

  /**
   * UserGame create
   */
  export type UserGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    /**
     * The data needed to create a UserGame.
     */
    data: XOR<UserGameCreateInput, UserGameUncheckedCreateInput>
  }

  /**
   * UserGame createMany
   */
  export type UserGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserGames.
     */
    data: UserGameCreateManyInput | UserGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGame createManyAndReturn
   */
  export type UserGameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * The data used to create many UserGames.
     */
    data: UserGameCreateManyInput | UserGameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGame update
   */
  export type UserGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    /**
     * The data needed to update a UserGame.
     */
    data: XOR<UserGameUpdateInput, UserGameUncheckedUpdateInput>
    /**
     * Choose, which UserGame to update.
     */
    where: UserGameWhereUniqueInput
  }

  /**
   * UserGame updateMany
   */
  export type UserGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserGames.
     */
    data: XOR<UserGameUpdateManyMutationInput, UserGameUncheckedUpdateManyInput>
    /**
     * Filter which UserGames to update
     */
    where?: UserGameWhereInput
    /**
     * Limit how many UserGames to update.
     */
    limit?: number
  }

  /**
   * UserGame updateManyAndReturn
   */
  export type UserGameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * The data used to update UserGames.
     */
    data: XOR<UserGameUpdateManyMutationInput, UserGameUncheckedUpdateManyInput>
    /**
     * Filter which UserGames to update
     */
    where?: UserGameWhereInput
    /**
     * Limit how many UserGames to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGame upsert
   */
  export type UserGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    /**
     * The filter to search for the UserGame to update in case it exists.
     */
    where: UserGameWhereUniqueInput
    /**
     * In case the UserGame found by the `where` argument doesn't exist, create a new UserGame with this data.
     */
    create: XOR<UserGameCreateInput, UserGameUncheckedCreateInput>
    /**
     * In case the UserGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserGameUpdateInput, UserGameUncheckedUpdateInput>
  }

  /**
   * UserGame delete
   */
  export type UserGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
    /**
     * Filter which UserGame to delete.
     */
    where: UserGameWhereUniqueInput
  }

  /**
   * UserGame deleteMany
   */
  export type UserGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGames to delete
     */
    where?: UserGameWhereInput
    /**
     * Limit how many UserGames to delete.
     */
    limit?: number
  }

  /**
   * UserGame without action
   */
  export type UserGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGame
     */
    select?: UserGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGame
     */
    omit?: UserGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameInclude<ExtArgs> | null
  }


  /**
   * Model Deal
   */

  export type AggregateDeal = {
    _count: DealCountAggregateOutputType | null
    _avg: DealAvgAggregateOutputType | null
    _sum: DealSumAggregateOutputType | null
    _min: DealMinAggregateOutputType | null
    _max: DealMaxAggregateOutputType | null
  }

  export type DealAvgAggregateOutputType = {
    id: number | null
    gameId: number | null
    platformGameId: number | null
    price: number | null
    discountPercent: number | null
    originalPrice: number | null
  }

  export type DealSumAggregateOutputType = {
    id: number | null
    gameId: number | null
    platformGameId: number | null
    price: number | null
    discountPercent: number | null
    originalPrice: number | null
  }

  export type DealMinAggregateOutputType = {
    id: number | null
    gameId: number | null
    platformGameId: number | null
    title: string | null
    storeName: string | null
    price: number | null
    discountPercent: number | null
    originalPrice: number | null
    url: string | null
    validFrom: Date | null
    validUntil: Date | null
    isFreebie: boolean | null
    discoveredAt: Date | null
    updatedAt: Date | null
  }

  export type DealMaxAggregateOutputType = {
    id: number | null
    gameId: number | null
    platformGameId: number | null
    title: string | null
    storeName: string | null
    price: number | null
    discountPercent: number | null
    originalPrice: number | null
    url: string | null
    validFrom: Date | null
    validUntil: Date | null
    isFreebie: boolean | null
    discoveredAt: Date | null
    updatedAt: Date | null
  }

  export type DealCountAggregateOutputType = {
    id: number
    gameId: number
    platformGameId: number
    title: number
    storeName: number
    price: number
    discountPercent: number
    originalPrice: number
    url: number
    validFrom: number
    validUntil: number
    isFreebie: number
    discoveredAt: number
    updatedAt: number
    _all: number
  }


  export type DealAvgAggregateInputType = {
    id?: true
    gameId?: true
    platformGameId?: true
    price?: true
    discountPercent?: true
    originalPrice?: true
  }

  export type DealSumAggregateInputType = {
    id?: true
    gameId?: true
    platformGameId?: true
    price?: true
    discountPercent?: true
    originalPrice?: true
  }

  export type DealMinAggregateInputType = {
    id?: true
    gameId?: true
    platformGameId?: true
    title?: true
    storeName?: true
    price?: true
    discountPercent?: true
    originalPrice?: true
    url?: true
    validFrom?: true
    validUntil?: true
    isFreebie?: true
    discoveredAt?: true
    updatedAt?: true
  }

  export type DealMaxAggregateInputType = {
    id?: true
    gameId?: true
    platformGameId?: true
    title?: true
    storeName?: true
    price?: true
    discountPercent?: true
    originalPrice?: true
    url?: true
    validFrom?: true
    validUntil?: true
    isFreebie?: true
    discoveredAt?: true
    updatedAt?: true
  }

  export type DealCountAggregateInputType = {
    id?: true
    gameId?: true
    platformGameId?: true
    title?: true
    storeName?: true
    price?: true
    discountPercent?: true
    originalPrice?: true
    url?: true
    validFrom?: true
    validUntil?: true
    isFreebie?: true
    discoveredAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DealAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deal to aggregate.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deals
    **/
    _count?: true | DealCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DealAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DealSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DealMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DealMaxAggregateInputType
  }

  export type GetDealAggregateType<T extends DealAggregateArgs> = {
        [P in keyof T & keyof AggregateDeal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeal[P]>
      : GetScalarType<T[P], AggregateDeal[P]>
  }




  export type DealGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
    orderBy?: DealOrderByWithAggregationInput | DealOrderByWithAggregationInput[]
    by: DealScalarFieldEnum[] | DealScalarFieldEnum
    having?: DealScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DealCountAggregateInputType | true
    _avg?: DealAvgAggregateInputType
    _sum?: DealSumAggregateInputType
    _min?: DealMinAggregateInputType
    _max?: DealMaxAggregateInputType
  }

  export type DealGroupByOutputType = {
    id: number
    gameId: number
    platformGameId: number | null
    title: string
    storeName: string
    price: number | null
    discountPercent: number | null
    originalPrice: number | null
    url: string
    validFrom: Date | null
    validUntil: Date | null
    isFreebie: boolean
    discoveredAt: Date
    updatedAt: Date
    _count: DealCountAggregateOutputType | null
    _avg: DealAvgAggregateOutputType | null
    _sum: DealSumAggregateOutputType | null
    _min: DealMinAggregateOutputType | null
    _max: DealMaxAggregateOutputType | null
  }

  type GetDealGroupByPayload<T extends DealGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DealGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DealGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DealGroupByOutputType[P]>
            : GetScalarType<T[P], DealGroupByOutputType[P]>
        }
      >
    >


  export type DealSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    platformGameId?: boolean
    title?: boolean
    storeName?: boolean
    price?: boolean
    discountPercent?: boolean
    originalPrice?: boolean
    url?: boolean
    validFrom?: boolean
    validUntil?: boolean
    isFreebie?: boolean
    discoveredAt?: boolean
    updatedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    platformGame?: boolean | Deal$platformGameArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    platformGameId?: boolean
    title?: boolean
    storeName?: boolean
    price?: boolean
    discountPercent?: boolean
    originalPrice?: boolean
    url?: boolean
    validFrom?: boolean
    validUntil?: boolean
    isFreebie?: boolean
    discoveredAt?: boolean
    updatedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    platformGame?: boolean | Deal$platformGameArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    platformGameId?: boolean
    title?: boolean
    storeName?: boolean
    price?: boolean
    discountPercent?: boolean
    originalPrice?: boolean
    url?: boolean
    validFrom?: boolean
    validUntil?: boolean
    isFreebie?: boolean
    discoveredAt?: boolean
    updatedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    platformGame?: boolean | Deal$platformGameArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectScalar = {
    id?: boolean
    gameId?: boolean
    platformGameId?: boolean
    title?: boolean
    storeName?: boolean
    price?: boolean
    discountPercent?: boolean
    originalPrice?: boolean
    url?: boolean
    validFrom?: boolean
    validUntil?: boolean
    isFreebie?: boolean
    discoveredAt?: boolean
    updatedAt?: boolean
  }

  export type DealOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "platformGameId" | "title" | "storeName" | "price" | "discountPercent" | "originalPrice" | "url" | "validFrom" | "validUntil" | "isFreebie" | "discoveredAt" | "updatedAt", ExtArgs["result"]["deal"]>
  export type DealInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    platformGame?: boolean | Deal$platformGameArgs<ExtArgs>
  }
  export type DealIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    platformGame?: boolean | Deal$platformGameArgs<ExtArgs>
  }
  export type DealIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    platformGame?: boolean | Deal$platformGameArgs<ExtArgs>
  }

  export type $DealPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Deal"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      platformGame: Prisma.$PlatformGamePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      gameId: number
      platformGameId: number | null
      title: string
      storeName: string
      price: number | null
      discountPercent: number | null
      originalPrice: number | null
      url: string
      validFrom: Date | null
      validUntil: Date | null
      isFreebie: boolean
      discoveredAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deal"]>
    composites: {}
  }

  type DealGetPayload<S extends boolean | null | undefined | DealDefaultArgs> = $Result.GetResult<Prisma.$DealPayload, S>

  type DealCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DealFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DealCountAggregateInputType | true
    }

  export interface DealDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Deal'], meta: { name: 'Deal' } }
    /**
     * Find zero or one Deal that matches the filter.
     * @param {DealFindUniqueArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DealFindUniqueArgs>(args: SelectSubset<T, DealFindUniqueArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Deal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DealFindUniqueOrThrowArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DealFindUniqueOrThrowArgs>(args: SelectSubset<T, DealFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindFirstArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DealFindFirstArgs>(args?: SelectSubset<T, DealFindFirstArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindFirstOrThrowArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DealFindFirstOrThrowArgs>(args?: SelectSubset<T, DealFindFirstOrThrowArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Deals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deals
     * const deals = await prisma.deal.findMany()
     * 
     * // Get first 10 Deals
     * const deals = await prisma.deal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dealWithIdOnly = await prisma.deal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DealFindManyArgs>(args?: SelectSubset<T, DealFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Deal.
     * @param {DealCreateArgs} args - Arguments to create a Deal.
     * @example
     * // Create one Deal
     * const Deal = await prisma.deal.create({
     *   data: {
     *     // ... data to create a Deal
     *   }
     * })
     * 
     */
    create<T extends DealCreateArgs>(args: SelectSubset<T, DealCreateArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Deals.
     * @param {DealCreateManyArgs} args - Arguments to create many Deals.
     * @example
     * // Create many Deals
     * const deal = await prisma.deal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DealCreateManyArgs>(args?: SelectSubset<T, DealCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Deals and returns the data saved in the database.
     * @param {DealCreateManyAndReturnArgs} args - Arguments to create many Deals.
     * @example
     * // Create many Deals
     * const deal = await prisma.deal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Deals and only return the `id`
     * const dealWithIdOnly = await prisma.deal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DealCreateManyAndReturnArgs>(args?: SelectSubset<T, DealCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Deal.
     * @param {DealDeleteArgs} args - Arguments to delete one Deal.
     * @example
     * // Delete one Deal
     * const Deal = await prisma.deal.delete({
     *   where: {
     *     // ... filter to delete one Deal
     *   }
     * })
     * 
     */
    delete<T extends DealDeleteArgs>(args: SelectSubset<T, DealDeleteArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Deal.
     * @param {DealUpdateArgs} args - Arguments to update one Deal.
     * @example
     * // Update one Deal
     * const deal = await prisma.deal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DealUpdateArgs>(args: SelectSubset<T, DealUpdateArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Deals.
     * @param {DealDeleteManyArgs} args - Arguments to filter Deals to delete.
     * @example
     * // Delete a few Deals
     * const { count } = await prisma.deal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DealDeleteManyArgs>(args?: SelectSubset<T, DealDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deals
     * const deal = await prisma.deal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DealUpdateManyArgs>(args: SelectSubset<T, DealUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deals and returns the data updated in the database.
     * @param {DealUpdateManyAndReturnArgs} args - Arguments to update many Deals.
     * @example
     * // Update many Deals
     * const deal = await prisma.deal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Deals and only return the `id`
     * const dealWithIdOnly = await prisma.deal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DealUpdateManyAndReturnArgs>(args: SelectSubset<T, DealUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Deal.
     * @param {DealUpsertArgs} args - Arguments to update or create a Deal.
     * @example
     * // Update or create a Deal
     * const deal = await prisma.deal.upsert({
     *   create: {
     *     // ... data to create a Deal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deal we want to update
     *   }
     * })
     */
    upsert<T extends DealUpsertArgs>(args: SelectSubset<T, DealUpsertArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealCountArgs} args - Arguments to filter Deals to count.
     * @example
     * // Count the number of Deals
     * const count = await prisma.deal.count({
     *   where: {
     *     // ... the filter for the Deals we want to count
     *   }
     * })
    **/
    count<T extends DealCountArgs>(
      args?: Subset<T, DealCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DealCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DealAggregateArgs>(args: Subset<T, DealAggregateArgs>): Prisma.PrismaPromise<GetDealAggregateType<T>>

    /**
     * Group by Deal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DealGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DealGroupByArgs['orderBy'] }
        : { orderBy?: DealGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DealGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDealGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Deal model
   */
  readonly fields: DealFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Deal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DealClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    platformGame<T extends Deal$platformGameArgs<ExtArgs> = {}>(args?: Subset<T, Deal$platformGameArgs<ExtArgs>>): Prisma__PlatformGameClient<$Result.GetResult<Prisma.$PlatformGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Deal model
   */
  interface DealFieldRefs {
    readonly id: FieldRef<"Deal", 'Int'>
    readonly gameId: FieldRef<"Deal", 'Int'>
    readonly platformGameId: FieldRef<"Deal", 'Int'>
    readonly title: FieldRef<"Deal", 'String'>
    readonly storeName: FieldRef<"Deal", 'String'>
    readonly price: FieldRef<"Deal", 'Float'>
    readonly discountPercent: FieldRef<"Deal", 'Float'>
    readonly originalPrice: FieldRef<"Deal", 'Float'>
    readonly url: FieldRef<"Deal", 'String'>
    readonly validFrom: FieldRef<"Deal", 'DateTime'>
    readonly validUntil: FieldRef<"Deal", 'DateTime'>
    readonly isFreebie: FieldRef<"Deal", 'Boolean'>
    readonly discoveredAt: FieldRef<"Deal", 'DateTime'>
    readonly updatedAt: FieldRef<"Deal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Deal findUnique
   */
  export type DealFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal findUniqueOrThrow
   */
  export type DealFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal findFirst
   */
  export type DealFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     */
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal findFirstOrThrow
   */
  export type DealFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     */
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal findMany
   */
  export type DealFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deals to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal create
   */
  export type DealCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The data needed to create a Deal.
     */
    data: XOR<DealCreateInput, DealUncheckedCreateInput>
  }

  /**
   * Deal createMany
   */
  export type DealCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Deals.
     */
    data: DealCreateManyInput | DealCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Deal createManyAndReturn
   */
  export type DealCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * The data used to create many Deals.
     */
    data: DealCreateManyInput | DealCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deal update
   */
  export type DealUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The data needed to update a Deal.
     */
    data: XOR<DealUpdateInput, DealUncheckedUpdateInput>
    /**
     * Choose, which Deal to update.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal updateMany
   */
  export type DealUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Deals.
     */
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyInput>
    /**
     * Filter which Deals to update
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to update.
     */
    limit?: number
  }

  /**
   * Deal updateManyAndReturn
   */
  export type DealUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * The data used to update Deals.
     */
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyInput>
    /**
     * Filter which Deals to update
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deal upsert
   */
  export type DealUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The filter to search for the Deal to update in case it exists.
     */
    where: DealWhereUniqueInput
    /**
     * In case the Deal found by the `where` argument doesn't exist, create a new Deal with this data.
     */
    create: XOR<DealCreateInput, DealUncheckedCreateInput>
    /**
     * In case the Deal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DealUpdateInput, DealUncheckedUpdateInput>
  }

  /**
   * Deal delete
   */
  export type DealDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter which Deal to delete.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal deleteMany
   */
  export type DealDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deals to delete
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to delete.
     */
    limit?: number
  }

  /**
   * Deal.platformGame
   */
  export type Deal$platformGameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformGame
     */
    select?: PlatformGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformGame
     */
    omit?: PlatformGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformGameInclude<ExtArgs> | null
    where?: PlatformGameWhereInput
  }

  /**
   * Deal without action
   */
  export type DealDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
  }


  /**
   * Model Achievement
   */

  export type AggregateAchievement = {
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  export type AchievementAvgAggregateOutputType = {
    id: number | null
    xpReward: number | null
    creditsReward: number | null
  }

  export type AchievementSumAggregateOutputType = {
    id: number | null
    xpReward: number | null
    creditsReward: number | null
  }

  export type AchievementMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    iconUrl: string | null
    criteria: string | null
    xpReward: number | null
    creditsReward: number | null
    createdAt: Date | null
  }

  export type AchievementMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    iconUrl: string | null
    criteria: string | null
    xpReward: number | null
    creditsReward: number | null
    createdAt: Date | null
  }

  export type AchievementCountAggregateOutputType = {
    id: number
    name: number
    description: number
    iconUrl: number
    criteria: number
    xpReward: number
    creditsReward: number
    createdAt: number
    _all: number
  }


  export type AchievementAvgAggregateInputType = {
    id?: true
    xpReward?: true
    creditsReward?: true
  }

  export type AchievementSumAggregateInputType = {
    id?: true
    xpReward?: true
    creditsReward?: true
  }

  export type AchievementMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    iconUrl?: true
    criteria?: true
    xpReward?: true
    creditsReward?: true
    createdAt?: true
  }

  export type AchievementMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    iconUrl?: true
    criteria?: true
    xpReward?: true
    creditsReward?: true
    createdAt?: true
  }

  export type AchievementCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    iconUrl?: true
    criteria?: true
    xpReward?: true
    creditsReward?: true
    createdAt?: true
    _all?: true
  }

  export type AchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievement to aggregate.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Achievements
    **/
    _count?: true | AchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AchievementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AchievementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AchievementMaxAggregateInputType
  }

  export type GetAchievementAggregateType<T extends AchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievement[P]>
      : GetScalarType<T[P], AggregateAchievement[P]>
  }




  export type AchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AchievementWhereInput
    orderBy?: AchievementOrderByWithAggregationInput | AchievementOrderByWithAggregationInput[]
    by: AchievementScalarFieldEnum[] | AchievementScalarFieldEnum
    having?: AchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AchievementCountAggregateInputType | true
    _avg?: AchievementAvgAggregateInputType
    _sum?: AchievementSumAggregateInputType
    _min?: AchievementMinAggregateInputType
    _max?: AchievementMaxAggregateInputType
  }

  export type AchievementGroupByOutputType = {
    id: number
    name: string
    description: string
    iconUrl: string | null
    criteria: string
    xpReward: number
    creditsReward: number
    createdAt: Date
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  type GetAchievementGroupByPayload<T extends AchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementGroupByOutputType[P]>
        }
      >
    >


  export type AchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    iconUrl?: boolean
    criteria?: boolean
    xpReward?: boolean
    creditsReward?: boolean
    createdAt?: boolean
    userAchievements?: boolean | Achievement$userAchievementsArgs<ExtArgs>
    _count?: boolean | AchievementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    iconUrl?: boolean
    criteria?: boolean
    xpReward?: boolean
    creditsReward?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    iconUrl?: boolean
    criteria?: boolean
    xpReward?: boolean
    creditsReward?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    iconUrl?: boolean
    criteria?: boolean
    xpReward?: boolean
    creditsReward?: boolean
    createdAt?: boolean
  }

  export type AchievementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "iconUrl" | "criteria" | "xpReward" | "creditsReward" | "createdAt", ExtArgs["result"]["achievement"]>
  export type AchievementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAchievements?: boolean | Achievement$userAchievementsArgs<ExtArgs>
    _count?: boolean | AchievementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AchievementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AchievementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Achievement"
    objects: {
      userAchievements: Prisma.$UserAchievementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string
      iconUrl: string | null
      criteria: string
      xpReward: number
      creditsReward: number
      createdAt: Date
    }, ExtArgs["result"]["achievement"]>
    composites: {}
  }

  type AchievementGetPayload<S extends boolean | null | undefined | AchievementDefaultArgs> = $Result.GetResult<Prisma.$AchievementPayload, S>

  type AchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AchievementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AchievementCountAggregateInputType | true
    }

  export interface AchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Achievement'], meta: { name: 'Achievement' } }
    /**
     * Find zero or one Achievement that matches the filter.
     * @param {AchievementFindUniqueArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AchievementFindUniqueArgs>(args: SelectSubset<T, AchievementFindUniqueArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Achievement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AchievementFindUniqueOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AchievementFindUniqueOrThrowArgs>(args: SelectSubset<T, AchievementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AchievementFindFirstArgs>(args?: SelectSubset<T, AchievementFindFirstArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AchievementFindFirstOrThrowArgs>(args?: SelectSubset<T, AchievementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievement.findMany()
     * 
     * // Get first 10 Achievements
     * const achievements = await prisma.achievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievementWithIdOnly = await prisma.achievement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AchievementFindManyArgs>(args?: SelectSubset<T, AchievementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Achievement.
     * @param {AchievementCreateArgs} args - Arguments to create a Achievement.
     * @example
     * // Create one Achievement
     * const Achievement = await prisma.achievement.create({
     *   data: {
     *     // ... data to create a Achievement
     *   }
     * })
     * 
     */
    create<T extends AchievementCreateArgs>(args: SelectSubset<T, AchievementCreateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Achievements.
     * @param {AchievementCreateManyArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AchievementCreateManyArgs>(args?: SelectSubset<T, AchievementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Achievements and returns the data saved in the database.
     * @param {AchievementCreateManyAndReturnArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AchievementCreateManyAndReturnArgs>(args?: SelectSubset<T, AchievementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Achievement.
     * @param {AchievementDeleteArgs} args - Arguments to delete one Achievement.
     * @example
     * // Delete one Achievement
     * const Achievement = await prisma.achievement.delete({
     *   where: {
     *     // ... filter to delete one Achievement
     *   }
     * })
     * 
     */
    delete<T extends AchievementDeleteArgs>(args: SelectSubset<T, AchievementDeleteArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Achievement.
     * @param {AchievementUpdateArgs} args - Arguments to update one Achievement.
     * @example
     * // Update one Achievement
     * const achievement = await prisma.achievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AchievementUpdateArgs>(args: SelectSubset<T, AchievementUpdateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Achievements.
     * @param {AchievementDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AchievementDeleteManyArgs>(args?: SelectSubset<T, AchievementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AchievementUpdateManyArgs>(args: SelectSubset<T, AchievementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements and returns the data updated in the database.
     * @param {AchievementUpdateManyAndReturnArgs} args - Arguments to update many Achievements.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AchievementUpdateManyAndReturnArgs>(args: SelectSubset<T, AchievementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Achievement.
     * @param {AchievementUpsertArgs} args - Arguments to update or create a Achievement.
     * @example
     * // Update or create a Achievement
     * const achievement = await prisma.achievement.upsert({
     *   create: {
     *     // ... data to create a Achievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievement we want to update
     *   }
     * })
     */
    upsert<T extends AchievementUpsertArgs>(args: SelectSubset<T, AchievementUpsertArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievement.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
    **/
    count<T extends AchievementCountArgs>(
      args?: Subset<T, AchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AchievementAggregateArgs>(args: Subset<T, AchievementAggregateArgs>): Prisma.PrismaPromise<GetAchievementAggregateType<T>>

    /**
     * Group by Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AchievementGroupByArgs['orderBy'] }
        : { orderBy?: AchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Achievement model
   */
  readonly fields: AchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Achievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userAchievements<T extends Achievement$userAchievementsArgs<ExtArgs> = {}>(args?: Subset<T, Achievement$userAchievementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Achievement model
   */
  interface AchievementFieldRefs {
    readonly id: FieldRef<"Achievement", 'Int'>
    readonly name: FieldRef<"Achievement", 'String'>
    readonly description: FieldRef<"Achievement", 'String'>
    readonly iconUrl: FieldRef<"Achievement", 'String'>
    readonly criteria: FieldRef<"Achievement", 'String'>
    readonly xpReward: FieldRef<"Achievement", 'Int'>
    readonly creditsReward: FieldRef<"Achievement", 'Int'>
    readonly createdAt: FieldRef<"Achievement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Achievement findUnique
   */
  export type AchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findUniqueOrThrow
   */
  export type AchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findFirst
   */
  export type AchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findFirstOrThrow
   */
  export type AchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findMany
   */
  export type AchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievements to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement create
   */
  export type AchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to create a Achievement.
     */
    data: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
  }

  /**
   * Achievement createMany
   */
  export type AchievementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Achievement createManyAndReturn
   */
  export type AchievementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Achievement update
   */
  export type AchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to update a Achievement.
     */
    data: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
    /**
     * Choose, which Achievement to update.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement updateMany
   */
  export type AchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to update.
     */
    limit?: number
  }

  /**
   * Achievement updateManyAndReturn
   */
  export type AchievementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to update.
     */
    limit?: number
  }

  /**
   * Achievement upsert
   */
  export type AchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The filter to search for the Achievement to update in case it exists.
     */
    where: AchievementWhereUniqueInput
    /**
     * In case the Achievement found by the `where` argument doesn't exist, create a new Achievement with this data.
     */
    create: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
    /**
     * In case the Achievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
  }

  /**
   * Achievement delete
   */
  export type AchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter which Achievement to delete.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement deleteMany
   */
  export type AchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievements to delete
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to delete.
     */
    limit?: number
  }

  /**
   * Achievement.userAchievements
   */
  export type Achievement$userAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    cursor?: UserAchievementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * Achievement without action
   */
  export type AchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
  }


  /**
   * Model UserAchievement
   */

  export type AggregateUserAchievement = {
    _count: UserAchievementCountAggregateOutputType | null
    _avg: UserAchievementAvgAggregateOutputType | null
    _sum: UserAchievementSumAggregateOutputType | null
    _min: UserAchievementMinAggregateOutputType | null
    _max: UserAchievementMaxAggregateOutputType | null
  }

  export type UserAchievementAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    achievementId: number | null
  }

  export type UserAchievementSumAggregateOutputType = {
    id: number | null
    userId: number | null
    achievementId: number | null
  }

  export type UserAchievementMinAggregateOutputType = {
    id: number | null
    userId: number | null
    achievementId: number | null
    unlockedAt: Date | null
  }

  export type UserAchievementMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    achievementId: number | null
    unlockedAt: Date | null
  }

  export type UserAchievementCountAggregateOutputType = {
    id: number
    userId: number
    achievementId: number
    unlockedAt: number
    _all: number
  }


  export type UserAchievementAvgAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
  }

  export type UserAchievementSumAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
  }

  export type UserAchievementMinAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    unlockedAt?: true
  }

  export type UserAchievementMaxAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    unlockedAt?: true
  }

  export type UserAchievementCountAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    unlockedAt?: true
    _all?: true
  }

  export type UserAchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAchievement to aggregate.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAchievements
    **/
    _count?: true | UserAchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAchievementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserAchievementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAchievementMaxAggregateInputType
  }

  export type GetUserAchievementAggregateType<T extends UserAchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAchievement[P]>
      : GetScalarType<T[P], AggregateUserAchievement[P]>
  }




  export type UserAchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithAggregationInput | UserAchievementOrderByWithAggregationInput[]
    by: UserAchievementScalarFieldEnum[] | UserAchievementScalarFieldEnum
    having?: UserAchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAchievementCountAggregateInputType | true
    _avg?: UserAchievementAvgAggregateInputType
    _sum?: UserAchievementSumAggregateInputType
    _min?: UserAchievementMinAggregateInputType
    _max?: UserAchievementMaxAggregateInputType
  }

  export type UserAchievementGroupByOutputType = {
    id: number
    userId: number
    achievementId: number
    unlockedAt: Date
    _count: UserAchievementCountAggregateOutputType | null
    _avg: UserAchievementAvgAggregateOutputType | null
    _sum: UserAchievementSumAggregateOutputType | null
    _min: UserAchievementMinAggregateOutputType | null
    _max: UserAchievementMaxAggregateOutputType | null
  }

  type GetUserAchievementGroupByPayload<T extends UserAchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAchievementGroupByOutputType[P]>
            : GetScalarType<T[P], UserAchievementGroupByOutputType[P]>
        }
      >
    >


  export type UserAchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAchievement"]>

  export type UserAchievementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAchievement"]>

  export type UserAchievementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAchievement"]>

  export type UserAchievementSelectScalar = {
    id?: boolean
    userId?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
  }

  export type UserAchievementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "achievementId" | "unlockedAt", ExtArgs["result"]["userAchievement"]>
  export type UserAchievementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserAchievementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserAchievementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserAchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAchievement"
    objects: {
      achievement: Prisma.$AchievementPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      achievementId: number
      unlockedAt: Date
    }, ExtArgs["result"]["userAchievement"]>
    composites: {}
  }

  type UserAchievementGetPayload<S extends boolean | null | undefined | UserAchievementDefaultArgs> = $Result.GetResult<Prisma.$UserAchievementPayload, S>

  type UserAchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserAchievementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserAchievementCountAggregateInputType | true
    }

  export interface UserAchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAchievement'], meta: { name: 'UserAchievement' } }
    /**
     * Find zero or one UserAchievement that matches the filter.
     * @param {UserAchievementFindUniqueArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAchievementFindUniqueArgs>(args: SelectSubset<T, UserAchievementFindUniqueArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserAchievement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAchievementFindUniqueOrThrowArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAchievementFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAchievementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAchievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindFirstArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAchievementFindFirstArgs>(args?: SelectSubset<T, UserAchievementFindFirstArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAchievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindFirstOrThrowArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAchievementFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAchievementFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserAchievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAchievements
     * const userAchievements = await prisma.userAchievement.findMany()
     * 
     * // Get first 10 UserAchievements
     * const userAchievements = await prisma.userAchievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAchievementWithIdOnly = await prisma.userAchievement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAchievementFindManyArgs>(args?: SelectSubset<T, UserAchievementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserAchievement.
     * @param {UserAchievementCreateArgs} args - Arguments to create a UserAchievement.
     * @example
     * // Create one UserAchievement
     * const UserAchievement = await prisma.userAchievement.create({
     *   data: {
     *     // ... data to create a UserAchievement
     *   }
     * })
     * 
     */
    create<T extends UserAchievementCreateArgs>(args: SelectSubset<T, UserAchievementCreateArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserAchievements.
     * @param {UserAchievementCreateManyArgs} args - Arguments to create many UserAchievements.
     * @example
     * // Create many UserAchievements
     * const userAchievement = await prisma.userAchievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAchievementCreateManyArgs>(args?: SelectSubset<T, UserAchievementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAchievements and returns the data saved in the database.
     * @param {UserAchievementCreateManyAndReturnArgs} args - Arguments to create many UserAchievements.
     * @example
     * // Create many UserAchievements
     * const userAchievement = await prisma.userAchievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAchievements and only return the `id`
     * const userAchievementWithIdOnly = await prisma.userAchievement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAchievementCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAchievementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserAchievement.
     * @param {UserAchievementDeleteArgs} args - Arguments to delete one UserAchievement.
     * @example
     * // Delete one UserAchievement
     * const UserAchievement = await prisma.userAchievement.delete({
     *   where: {
     *     // ... filter to delete one UserAchievement
     *   }
     * })
     * 
     */
    delete<T extends UserAchievementDeleteArgs>(args: SelectSubset<T, UserAchievementDeleteArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserAchievement.
     * @param {UserAchievementUpdateArgs} args - Arguments to update one UserAchievement.
     * @example
     * // Update one UserAchievement
     * const userAchievement = await prisma.userAchievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAchievementUpdateArgs>(args: SelectSubset<T, UserAchievementUpdateArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserAchievements.
     * @param {UserAchievementDeleteManyArgs} args - Arguments to filter UserAchievements to delete.
     * @example
     * // Delete a few UserAchievements
     * const { count } = await prisma.userAchievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAchievementDeleteManyArgs>(args?: SelectSubset<T, UserAchievementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAchievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAchievements
     * const userAchievement = await prisma.userAchievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAchievementUpdateManyArgs>(args: SelectSubset<T, UserAchievementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAchievements and returns the data updated in the database.
     * @param {UserAchievementUpdateManyAndReturnArgs} args - Arguments to update many UserAchievements.
     * @example
     * // Update many UserAchievements
     * const userAchievement = await prisma.userAchievement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserAchievements and only return the `id`
     * const userAchievementWithIdOnly = await prisma.userAchievement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserAchievementUpdateManyAndReturnArgs>(args: SelectSubset<T, UserAchievementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserAchievement.
     * @param {UserAchievementUpsertArgs} args - Arguments to update or create a UserAchievement.
     * @example
     * // Update or create a UserAchievement
     * const userAchievement = await prisma.userAchievement.upsert({
     *   create: {
     *     // ... data to create a UserAchievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAchievement we want to update
     *   }
     * })
     */
    upsert<T extends UserAchievementUpsertArgs>(args: SelectSubset<T, UserAchievementUpsertArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserAchievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementCountArgs} args - Arguments to filter UserAchievements to count.
     * @example
     * // Count the number of UserAchievements
     * const count = await prisma.userAchievement.count({
     *   where: {
     *     // ... the filter for the UserAchievements we want to count
     *   }
     * })
    **/
    count<T extends UserAchievementCountArgs>(
      args?: Subset<T, UserAchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAchievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAchievementAggregateArgs>(args: Subset<T, UserAchievementAggregateArgs>): Prisma.PrismaPromise<GetUserAchievementAggregateType<T>>

    /**
     * Group by UserAchievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserAchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAchievementGroupByArgs['orderBy'] }
        : { orderBy?: UserAchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserAchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAchievement model
   */
  readonly fields: UserAchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAchievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    achievement<T extends AchievementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AchievementDefaultArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserAchievement model
   */
  interface UserAchievementFieldRefs {
    readonly id: FieldRef<"UserAchievement", 'Int'>
    readonly userId: FieldRef<"UserAchievement", 'Int'>
    readonly achievementId: FieldRef<"UserAchievement", 'Int'>
    readonly unlockedAt: FieldRef<"UserAchievement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserAchievement findUnique
   */
  export type UserAchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement findUniqueOrThrow
   */
  export type UserAchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement findFirst
   */
  export type UserAchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAchievements.
     */
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * UserAchievement findFirstOrThrow
   */
  export type UserAchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAchievements.
     */
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * UserAchievement findMany
   */
  export type UserAchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievements to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * UserAchievement create
   */
  export type UserAchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAchievement.
     */
    data: XOR<UserAchievementCreateInput, UserAchievementUncheckedCreateInput>
  }

  /**
   * UserAchievement createMany
   */
  export type UserAchievementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAchievements.
     */
    data: UserAchievementCreateManyInput | UserAchievementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAchievement createManyAndReturn
   */
  export type UserAchievementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * The data used to create many UserAchievements.
     */
    data: UserAchievementCreateManyInput | UserAchievementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAchievement update
   */
  export type UserAchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAchievement.
     */
    data: XOR<UserAchievementUpdateInput, UserAchievementUncheckedUpdateInput>
    /**
     * Choose, which UserAchievement to update.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement updateMany
   */
  export type UserAchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAchievements.
     */
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyInput>
    /**
     * Filter which UserAchievements to update
     */
    where?: UserAchievementWhereInput
    /**
     * Limit how many UserAchievements to update.
     */
    limit?: number
  }

  /**
   * UserAchievement updateManyAndReturn
   */
  export type UserAchievementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * The data used to update UserAchievements.
     */
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyInput>
    /**
     * Filter which UserAchievements to update
     */
    where?: UserAchievementWhereInput
    /**
     * Limit how many UserAchievements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAchievement upsert
   */
  export type UserAchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAchievement to update in case it exists.
     */
    where: UserAchievementWhereUniqueInput
    /**
     * In case the UserAchievement found by the `where` argument doesn't exist, create a new UserAchievement with this data.
     */
    create: XOR<UserAchievementCreateInput, UserAchievementUncheckedCreateInput>
    /**
     * In case the UserAchievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAchievementUpdateInput, UserAchievementUncheckedUpdateInput>
  }

  /**
   * UserAchievement delete
   */
  export type UserAchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter which UserAchievement to delete.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement deleteMany
   */
  export type UserAchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAchievements to delete
     */
    where?: UserAchievementWhereInput
    /**
     * Limit how many UserAchievements to delete.
     */
    limit?: number
  }

  /**
   * UserAchievement without action
   */
  export type UserAchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
  }


  /**
   * Model Wishlist
   */

  export type AggregateWishlist = {
    _count: WishlistCountAggregateOutputType | null
    _avg: WishlistAvgAggregateOutputType | null
    _sum: WishlistSumAggregateOutputType | null
    _min: WishlistMinAggregateOutputType | null
    _max: WishlistMaxAggregateOutputType | null
  }

  export type WishlistAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
  }

  export type WishlistSumAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
  }

  export type WishlistMinAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    addedAt: Date | null
  }

  export type WishlistMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    addedAt: Date | null
  }

  export type WishlistCountAggregateOutputType = {
    id: number
    userId: number
    gameId: number
    addedAt: number
    _all: number
  }


  export type WishlistAvgAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
  }

  export type WishlistSumAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
  }

  export type WishlistMinAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    addedAt?: true
  }

  export type WishlistMaxAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    addedAt?: true
  }

  export type WishlistCountAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    addedAt?: true
    _all?: true
  }

  export type WishlistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wishlist to aggregate.
     */
    where?: WishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishlists to fetch.
     */
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wishlists
    **/
    _count?: true | WishlistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WishlistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WishlistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WishlistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WishlistMaxAggregateInputType
  }

  export type GetWishlistAggregateType<T extends WishlistAggregateArgs> = {
        [P in keyof T & keyof AggregateWishlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWishlist[P]>
      : GetScalarType<T[P], AggregateWishlist[P]>
  }




  export type WishlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishlistWhereInput
    orderBy?: WishlistOrderByWithAggregationInput | WishlistOrderByWithAggregationInput[]
    by: WishlistScalarFieldEnum[] | WishlistScalarFieldEnum
    having?: WishlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WishlistCountAggregateInputType | true
    _avg?: WishlistAvgAggregateInputType
    _sum?: WishlistSumAggregateInputType
    _min?: WishlistMinAggregateInputType
    _max?: WishlistMaxAggregateInputType
  }

  export type WishlistGroupByOutputType = {
    id: number
    userId: number
    gameId: number
    addedAt: Date
    _count: WishlistCountAggregateOutputType | null
    _avg: WishlistAvgAggregateOutputType | null
    _sum: WishlistSumAggregateOutputType | null
    _min: WishlistMinAggregateOutputType | null
    _max: WishlistMaxAggregateOutputType | null
  }

  type GetWishlistGroupByPayload<T extends WishlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WishlistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WishlistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WishlistGroupByOutputType[P]>
            : GetScalarType<T[P], WishlistGroupByOutputType[P]>
        }
      >
    >


  export type WishlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    addedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishlist"]>

  export type WishlistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    addedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishlist"]>

  export type WishlistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    addedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishlist"]>

  export type WishlistSelectScalar = {
    id?: boolean
    userId?: boolean
    gameId?: boolean
    addedAt?: boolean
  }

  export type WishlistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "gameId" | "addedAt", ExtArgs["result"]["wishlist"]>
  export type WishlistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WishlistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WishlistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WishlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wishlist"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      gameId: number
      addedAt: Date
    }, ExtArgs["result"]["wishlist"]>
    composites: {}
  }

  type WishlistGetPayload<S extends boolean | null | undefined | WishlistDefaultArgs> = $Result.GetResult<Prisma.$WishlistPayload, S>

  type WishlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WishlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WishlistCountAggregateInputType | true
    }

  export interface WishlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wishlist'], meta: { name: 'Wishlist' } }
    /**
     * Find zero or one Wishlist that matches the filter.
     * @param {WishlistFindUniqueArgs} args - Arguments to find a Wishlist
     * @example
     * // Get one Wishlist
     * const wishlist = await prisma.wishlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WishlistFindUniqueArgs>(args: SelectSubset<T, WishlistFindUniqueArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wishlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WishlistFindUniqueOrThrowArgs} args - Arguments to find a Wishlist
     * @example
     * // Get one Wishlist
     * const wishlist = await prisma.wishlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WishlistFindUniqueOrThrowArgs>(args: SelectSubset<T, WishlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wishlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistFindFirstArgs} args - Arguments to find a Wishlist
     * @example
     * // Get one Wishlist
     * const wishlist = await prisma.wishlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WishlistFindFirstArgs>(args?: SelectSubset<T, WishlistFindFirstArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wishlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistFindFirstOrThrowArgs} args - Arguments to find a Wishlist
     * @example
     * // Get one Wishlist
     * const wishlist = await prisma.wishlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WishlistFindFirstOrThrowArgs>(args?: SelectSubset<T, WishlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wishlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wishlists
     * const wishlists = await prisma.wishlist.findMany()
     * 
     * // Get first 10 Wishlists
     * const wishlists = await prisma.wishlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wishlistWithIdOnly = await prisma.wishlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WishlistFindManyArgs>(args?: SelectSubset<T, WishlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wishlist.
     * @param {WishlistCreateArgs} args - Arguments to create a Wishlist.
     * @example
     * // Create one Wishlist
     * const Wishlist = await prisma.wishlist.create({
     *   data: {
     *     // ... data to create a Wishlist
     *   }
     * })
     * 
     */
    create<T extends WishlistCreateArgs>(args: SelectSubset<T, WishlistCreateArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wishlists.
     * @param {WishlistCreateManyArgs} args - Arguments to create many Wishlists.
     * @example
     * // Create many Wishlists
     * const wishlist = await prisma.wishlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WishlistCreateManyArgs>(args?: SelectSubset<T, WishlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wishlists and returns the data saved in the database.
     * @param {WishlistCreateManyAndReturnArgs} args - Arguments to create many Wishlists.
     * @example
     * // Create many Wishlists
     * const wishlist = await prisma.wishlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wishlists and only return the `id`
     * const wishlistWithIdOnly = await prisma.wishlist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WishlistCreateManyAndReturnArgs>(args?: SelectSubset<T, WishlistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wishlist.
     * @param {WishlistDeleteArgs} args - Arguments to delete one Wishlist.
     * @example
     * // Delete one Wishlist
     * const Wishlist = await prisma.wishlist.delete({
     *   where: {
     *     // ... filter to delete one Wishlist
     *   }
     * })
     * 
     */
    delete<T extends WishlistDeleteArgs>(args: SelectSubset<T, WishlistDeleteArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wishlist.
     * @param {WishlistUpdateArgs} args - Arguments to update one Wishlist.
     * @example
     * // Update one Wishlist
     * const wishlist = await prisma.wishlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WishlistUpdateArgs>(args: SelectSubset<T, WishlistUpdateArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wishlists.
     * @param {WishlistDeleteManyArgs} args - Arguments to filter Wishlists to delete.
     * @example
     * // Delete a few Wishlists
     * const { count } = await prisma.wishlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WishlistDeleteManyArgs>(args?: SelectSubset<T, WishlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wishlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wishlists
     * const wishlist = await prisma.wishlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WishlistUpdateManyArgs>(args: SelectSubset<T, WishlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wishlists and returns the data updated in the database.
     * @param {WishlistUpdateManyAndReturnArgs} args - Arguments to update many Wishlists.
     * @example
     * // Update many Wishlists
     * const wishlist = await prisma.wishlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wishlists and only return the `id`
     * const wishlistWithIdOnly = await prisma.wishlist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WishlistUpdateManyAndReturnArgs>(args: SelectSubset<T, WishlistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wishlist.
     * @param {WishlistUpsertArgs} args - Arguments to update or create a Wishlist.
     * @example
     * // Update or create a Wishlist
     * const wishlist = await prisma.wishlist.upsert({
     *   create: {
     *     // ... data to create a Wishlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wishlist we want to update
     *   }
     * })
     */
    upsert<T extends WishlistUpsertArgs>(args: SelectSubset<T, WishlistUpsertArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wishlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistCountArgs} args - Arguments to filter Wishlists to count.
     * @example
     * // Count the number of Wishlists
     * const count = await prisma.wishlist.count({
     *   where: {
     *     // ... the filter for the Wishlists we want to count
     *   }
     * })
    **/
    count<T extends WishlistCountArgs>(
      args?: Subset<T, WishlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WishlistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wishlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WishlistAggregateArgs>(args: Subset<T, WishlistAggregateArgs>): Prisma.PrismaPromise<GetWishlistAggregateType<T>>

    /**
     * Group by Wishlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WishlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WishlistGroupByArgs['orderBy'] }
        : { orderBy?: WishlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WishlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWishlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wishlist model
   */
  readonly fields: WishlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wishlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WishlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wishlist model
   */
  interface WishlistFieldRefs {
    readonly id: FieldRef<"Wishlist", 'Int'>
    readonly userId: FieldRef<"Wishlist", 'Int'>
    readonly gameId: FieldRef<"Wishlist", 'Int'>
    readonly addedAt: FieldRef<"Wishlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wishlist findUnique
   */
  export type WishlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter, which Wishlist to fetch.
     */
    where: WishlistWhereUniqueInput
  }

  /**
   * Wishlist findUniqueOrThrow
   */
  export type WishlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter, which Wishlist to fetch.
     */
    where: WishlistWhereUniqueInput
  }

  /**
   * Wishlist findFirst
   */
  export type WishlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter, which Wishlist to fetch.
     */
    where?: WishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishlists to fetch.
     */
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wishlists.
     */
    cursor?: WishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wishlists.
     */
    distinct?: WishlistScalarFieldEnum | WishlistScalarFieldEnum[]
  }

  /**
   * Wishlist findFirstOrThrow
   */
  export type WishlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter, which Wishlist to fetch.
     */
    where?: WishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishlists to fetch.
     */
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wishlists.
     */
    cursor?: WishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wishlists.
     */
    distinct?: WishlistScalarFieldEnum | WishlistScalarFieldEnum[]
  }

  /**
   * Wishlist findMany
   */
  export type WishlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter, which Wishlists to fetch.
     */
    where?: WishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishlists to fetch.
     */
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wishlists.
     */
    cursor?: WishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishlists.
     */
    skip?: number
    distinct?: WishlistScalarFieldEnum | WishlistScalarFieldEnum[]
  }

  /**
   * Wishlist create
   */
  export type WishlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * The data needed to create a Wishlist.
     */
    data: XOR<WishlistCreateInput, WishlistUncheckedCreateInput>
  }

  /**
   * Wishlist createMany
   */
  export type WishlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wishlists.
     */
    data: WishlistCreateManyInput | WishlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wishlist createManyAndReturn
   */
  export type WishlistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * The data used to create many Wishlists.
     */
    data: WishlistCreateManyInput | WishlistCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wishlist update
   */
  export type WishlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * The data needed to update a Wishlist.
     */
    data: XOR<WishlistUpdateInput, WishlistUncheckedUpdateInput>
    /**
     * Choose, which Wishlist to update.
     */
    where: WishlistWhereUniqueInput
  }

  /**
   * Wishlist updateMany
   */
  export type WishlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wishlists.
     */
    data: XOR<WishlistUpdateManyMutationInput, WishlistUncheckedUpdateManyInput>
    /**
     * Filter which Wishlists to update
     */
    where?: WishlistWhereInput
    /**
     * Limit how many Wishlists to update.
     */
    limit?: number
  }

  /**
   * Wishlist updateManyAndReturn
   */
  export type WishlistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * The data used to update Wishlists.
     */
    data: XOR<WishlistUpdateManyMutationInput, WishlistUncheckedUpdateManyInput>
    /**
     * Filter which Wishlists to update
     */
    where?: WishlistWhereInput
    /**
     * Limit how many Wishlists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wishlist upsert
   */
  export type WishlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * The filter to search for the Wishlist to update in case it exists.
     */
    where: WishlistWhereUniqueInput
    /**
     * In case the Wishlist found by the `where` argument doesn't exist, create a new Wishlist with this data.
     */
    create: XOR<WishlistCreateInput, WishlistUncheckedCreateInput>
    /**
     * In case the Wishlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WishlistUpdateInput, WishlistUncheckedUpdateInput>
  }

  /**
   * Wishlist delete
   */
  export type WishlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter which Wishlist to delete.
     */
    where: WishlistWhereUniqueInput
  }

  /**
   * Wishlist deleteMany
   */
  export type WishlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wishlists to delete
     */
    where?: WishlistWhereInput
    /**
     * Limit how many Wishlists to delete.
     */
    limit?: number
  }

  /**
   * Wishlist without action
   */
  export type WishlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: WishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    supabase_uid: 'supabase_uid',
    email: 'email',
    display_name: 'display_name',
    xp: 'xp',
    level: 'level',
    credits: 'credits'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    coverUrl: 'coverUrl',
    releaseDate: 'releaseDate',
    developer: 'developer',
    publisher: 'publisher',
    genres: 'genres',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const PlatformScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    iconUrl: 'iconUrl',
    siteUrl: 'siteUrl'
  };

  export type PlatformScalarFieldEnum = (typeof PlatformScalarFieldEnum)[keyof typeof PlatformScalarFieldEnum]


  export const PlatformGameScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    platformId: 'platformId',
    platformSpecificId: 'platformSpecificId',
    url: 'url'
  };

  export type PlatformGameScalarFieldEnum = (typeof PlatformGameScalarFieldEnum)[keyof typeof PlatformGameScalarFieldEnum]


  export const UserGameScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    gameId: 'gameId',
    addedAt: 'addedAt',
    playtimeMinutes: 'playtimeMinutes',
    lastPlayed: 'lastPlayed',
    isInstalled: 'isInstalled',
    notes: 'notes',
    rating: 'rating'
  };

  export type UserGameScalarFieldEnum = (typeof UserGameScalarFieldEnum)[keyof typeof UserGameScalarFieldEnum]


  export const DealScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    platformGameId: 'platformGameId',
    title: 'title',
    storeName: 'storeName',
    price: 'price',
    discountPercent: 'discountPercent',
    originalPrice: 'originalPrice',
    url: 'url',
    validFrom: 'validFrom',
    validUntil: 'validUntil',
    isFreebie: 'isFreebie',
    discoveredAt: 'discoveredAt',
    updatedAt: 'updatedAt'
  };

  export type DealScalarFieldEnum = (typeof DealScalarFieldEnum)[keyof typeof DealScalarFieldEnum]


  export const AchievementScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    iconUrl: 'iconUrl',
    criteria: 'criteria',
    xpReward: 'xpReward',
    creditsReward: 'creditsReward',
    createdAt: 'createdAt'
  };

  export type AchievementScalarFieldEnum = (typeof AchievementScalarFieldEnum)[keyof typeof AchievementScalarFieldEnum]


  export const UserAchievementScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    achievementId: 'achievementId',
    unlockedAt: 'unlockedAt'
  };

  export type UserAchievementScalarFieldEnum = (typeof UserAchievementScalarFieldEnum)[keyof typeof UserAchievementScalarFieldEnum]


  export const WishlistScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    gameId: 'gameId',
    addedAt: 'addedAt'
  };

  export type WishlistScalarFieldEnum = (typeof WishlistScalarFieldEnum)[keyof typeof WishlistScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    supabase_uid?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    display_name?: StringNullableFilter<"User"> | string | null
    xp?: IntFilter<"User"> | number
    level?: IntFilter<"User"> | number
    credits?: IntFilter<"User"> | number
    userAchievements?: UserAchievementListRelationFilter
    userGames?: UserGameListRelationFilter
    wishlistItems?: WishlistListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    supabase_uid?: SortOrder
    email?: SortOrder
    display_name?: SortOrderInput | SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
    userAchievements?: UserAchievementOrderByRelationAggregateInput
    userGames?: UserGameOrderByRelationAggregateInput
    wishlistItems?: WishlistOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    supabase_uid?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    display_name?: StringNullableFilter<"User"> | string | null
    xp?: IntFilter<"User"> | number
    level?: IntFilter<"User"> | number
    credits?: IntFilter<"User"> | number
    userAchievements?: UserAchievementListRelationFilter
    userGames?: UserGameListRelationFilter
    wishlistItems?: WishlistListRelationFilter
  }, "id" | "supabase_uid" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    supabase_uid?: SortOrder
    email?: SortOrder
    display_name?: SortOrderInput | SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    supabase_uid?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    display_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    xp?: IntWithAggregatesFilter<"User"> | number
    level?: IntWithAggregatesFilter<"User"> | number
    credits?: IntWithAggregatesFilter<"User"> | number
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: IntFilter<"Game"> | number
    title?: StringFilter<"Game"> | string
    description?: StringNullableFilter<"Game"> | string | null
    coverUrl?: StringNullableFilter<"Game"> | string | null
    releaseDate?: DateTimeNullableFilter<"Game"> | Date | string | null
    developer?: StringNullableFilter<"Game"> | string | null
    publisher?: StringNullableFilter<"Game"> | string | null
    genres?: StringNullableListFilter<"Game">
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    deals?: DealListRelationFilter
    platformGames?: PlatformGameListRelationFilter
    userGames?: UserGameListRelationFilter
    wishlistedBy?: WishlistListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    releaseDate?: SortOrderInput | SortOrder
    developer?: SortOrderInput | SortOrder
    publisher?: SortOrderInput | SortOrder
    genres?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deals?: DealOrderByRelationAggregateInput
    platformGames?: PlatformGameOrderByRelationAggregateInput
    userGames?: UserGameOrderByRelationAggregateInput
    wishlistedBy?: WishlistOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    title?: StringFilter<"Game"> | string
    description?: StringNullableFilter<"Game"> | string | null
    coverUrl?: StringNullableFilter<"Game"> | string | null
    releaseDate?: DateTimeNullableFilter<"Game"> | Date | string | null
    developer?: StringNullableFilter<"Game"> | string | null
    publisher?: StringNullableFilter<"Game"> | string | null
    genres?: StringNullableListFilter<"Game">
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    deals?: DealListRelationFilter
    platformGames?: PlatformGameListRelationFilter
    userGames?: UserGameListRelationFilter
    wishlistedBy?: WishlistListRelationFilter
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    releaseDate?: SortOrderInput | SortOrder
    developer?: SortOrderInput | SortOrder
    publisher?: SortOrderInput | SortOrder
    genres?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Game"> | number
    title?: StringWithAggregatesFilter<"Game"> | string
    description?: StringNullableWithAggregatesFilter<"Game"> | string | null
    coverUrl?: StringNullableWithAggregatesFilter<"Game"> | string | null
    releaseDate?: DateTimeNullableWithAggregatesFilter<"Game"> | Date | string | null
    developer?: StringNullableWithAggregatesFilter<"Game"> | string | null
    publisher?: StringNullableWithAggregatesFilter<"Game"> | string | null
    genres?: StringNullableListFilter<"Game">
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
  }

  export type PlatformWhereInput = {
    AND?: PlatformWhereInput | PlatformWhereInput[]
    OR?: PlatformWhereInput[]
    NOT?: PlatformWhereInput | PlatformWhereInput[]
    id?: IntFilter<"Platform"> | number
    name?: StringFilter<"Platform"> | string
    slug?: StringFilter<"Platform"> | string
    iconUrl?: StringNullableFilter<"Platform"> | string | null
    siteUrl?: StringNullableFilter<"Platform"> | string | null
    platformGames?: PlatformGameListRelationFilter
  }

  export type PlatformOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    iconUrl?: SortOrderInput | SortOrder
    siteUrl?: SortOrderInput | SortOrder
    platformGames?: PlatformGameOrderByRelationAggregateInput
  }

  export type PlatformWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: PlatformWhereInput | PlatformWhereInput[]
    OR?: PlatformWhereInput[]
    NOT?: PlatformWhereInput | PlatformWhereInput[]
    iconUrl?: StringNullableFilter<"Platform"> | string | null
    siteUrl?: StringNullableFilter<"Platform"> | string | null
    platformGames?: PlatformGameListRelationFilter
  }, "id" | "name" | "slug">

  export type PlatformOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    iconUrl?: SortOrderInput | SortOrder
    siteUrl?: SortOrderInput | SortOrder
    _count?: PlatformCountOrderByAggregateInput
    _avg?: PlatformAvgOrderByAggregateInput
    _max?: PlatformMaxOrderByAggregateInput
    _min?: PlatformMinOrderByAggregateInput
    _sum?: PlatformSumOrderByAggregateInput
  }

  export type PlatformScalarWhereWithAggregatesInput = {
    AND?: PlatformScalarWhereWithAggregatesInput | PlatformScalarWhereWithAggregatesInput[]
    OR?: PlatformScalarWhereWithAggregatesInput[]
    NOT?: PlatformScalarWhereWithAggregatesInput | PlatformScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Platform"> | number
    name?: StringWithAggregatesFilter<"Platform"> | string
    slug?: StringWithAggregatesFilter<"Platform"> | string
    iconUrl?: StringNullableWithAggregatesFilter<"Platform"> | string | null
    siteUrl?: StringNullableWithAggregatesFilter<"Platform"> | string | null
  }

  export type PlatformGameWhereInput = {
    AND?: PlatformGameWhereInput | PlatformGameWhereInput[]
    OR?: PlatformGameWhereInput[]
    NOT?: PlatformGameWhereInput | PlatformGameWhereInput[]
    id?: IntFilter<"PlatformGame"> | number
    gameId?: IntFilter<"PlatformGame"> | number
    platformId?: IntFilter<"PlatformGame"> | number
    platformSpecificId?: StringFilter<"PlatformGame"> | string
    url?: StringNullableFilter<"PlatformGame"> | string | null
    deals?: DealListRelationFilter
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    platform?: XOR<PlatformScalarRelationFilter, PlatformWhereInput>
  }

  export type PlatformGameOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformId?: SortOrder
    platformSpecificId?: SortOrder
    url?: SortOrderInput | SortOrder
    deals?: DealOrderByRelationAggregateInput
    game?: GameOrderByWithRelationInput
    platform?: PlatformOrderByWithRelationInput
  }

  export type PlatformGameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    gameId_platformId?: PlatformGameGameIdPlatformIdCompoundUniqueInput
    platformId_platformSpecificId?: PlatformGamePlatformIdPlatformSpecificIdCompoundUniqueInput
    AND?: PlatformGameWhereInput | PlatformGameWhereInput[]
    OR?: PlatformGameWhereInput[]
    NOT?: PlatformGameWhereInput | PlatformGameWhereInput[]
    gameId?: IntFilter<"PlatformGame"> | number
    platformId?: IntFilter<"PlatformGame"> | number
    platformSpecificId?: StringFilter<"PlatformGame"> | string
    url?: StringNullableFilter<"PlatformGame"> | string | null
    deals?: DealListRelationFilter
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    platform?: XOR<PlatformScalarRelationFilter, PlatformWhereInput>
  }, "id" | "gameId_platformId" | "platformId_platformSpecificId" | "gameId_platformId" | "platformId_platformSpecificId">

  export type PlatformGameOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformId?: SortOrder
    platformSpecificId?: SortOrder
    url?: SortOrderInput | SortOrder
    _count?: PlatformGameCountOrderByAggregateInput
    _avg?: PlatformGameAvgOrderByAggregateInput
    _max?: PlatformGameMaxOrderByAggregateInput
    _min?: PlatformGameMinOrderByAggregateInput
    _sum?: PlatformGameSumOrderByAggregateInput
  }

  export type PlatformGameScalarWhereWithAggregatesInput = {
    AND?: PlatformGameScalarWhereWithAggregatesInput | PlatformGameScalarWhereWithAggregatesInput[]
    OR?: PlatformGameScalarWhereWithAggregatesInput[]
    NOT?: PlatformGameScalarWhereWithAggregatesInput | PlatformGameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PlatformGame"> | number
    gameId?: IntWithAggregatesFilter<"PlatformGame"> | number
    platformId?: IntWithAggregatesFilter<"PlatformGame"> | number
    platformSpecificId?: StringWithAggregatesFilter<"PlatformGame"> | string
    url?: StringNullableWithAggregatesFilter<"PlatformGame"> | string | null
  }

  export type UserGameWhereInput = {
    AND?: UserGameWhereInput | UserGameWhereInput[]
    OR?: UserGameWhereInput[]
    NOT?: UserGameWhereInput | UserGameWhereInput[]
    id?: IntFilter<"UserGame"> | number
    userId?: IntFilter<"UserGame"> | number
    gameId?: IntFilter<"UserGame"> | number
    addedAt?: DateTimeFilter<"UserGame"> | Date | string
    playtimeMinutes?: IntNullableFilter<"UserGame"> | number | null
    lastPlayed?: DateTimeNullableFilter<"UserGame"> | Date | string | null
    isInstalled?: BoolFilter<"UserGame"> | boolean
    notes?: StringNullableFilter<"UserGame"> | string | null
    rating?: IntNullableFilter<"UserGame"> | number | null
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserGameOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
    playtimeMinutes?: SortOrderInput | SortOrder
    lastPlayed?: SortOrderInput | SortOrder
    isInstalled?: SortOrder
    notes?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    game?: GameOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserGameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_gameId?: UserGameUserIdGameIdCompoundUniqueInput
    AND?: UserGameWhereInput | UserGameWhereInput[]
    OR?: UserGameWhereInput[]
    NOT?: UserGameWhereInput | UserGameWhereInput[]
    userId?: IntFilter<"UserGame"> | number
    gameId?: IntFilter<"UserGame"> | number
    addedAt?: DateTimeFilter<"UserGame"> | Date | string
    playtimeMinutes?: IntNullableFilter<"UserGame"> | number | null
    lastPlayed?: DateTimeNullableFilter<"UserGame"> | Date | string | null
    isInstalled?: BoolFilter<"UserGame"> | boolean
    notes?: StringNullableFilter<"UserGame"> | string | null
    rating?: IntNullableFilter<"UserGame"> | number | null
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_gameId" | "userId_gameId">

  export type UserGameOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
    playtimeMinutes?: SortOrderInput | SortOrder
    lastPlayed?: SortOrderInput | SortOrder
    isInstalled?: SortOrder
    notes?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    _count?: UserGameCountOrderByAggregateInput
    _avg?: UserGameAvgOrderByAggregateInput
    _max?: UserGameMaxOrderByAggregateInput
    _min?: UserGameMinOrderByAggregateInput
    _sum?: UserGameSumOrderByAggregateInput
  }

  export type UserGameScalarWhereWithAggregatesInput = {
    AND?: UserGameScalarWhereWithAggregatesInput | UserGameScalarWhereWithAggregatesInput[]
    OR?: UserGameScalarWhereWithAggregatesInput[]
    NOT?: UserGameScalarWhereWithAggregatesInput | UserGameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserGame"> | number
    userId?: IntWithAggregatesFilter<"UserGame"> | number
    gameId?: IntWithAggregatesFilter<"UserGame"> | number
    addedAt?: DateTimeWithAggregatesFilter<"UserGame"> | Date | string
    playtimeMinutes?: IntNullableWithAggregatesFilter<"UserGame"> | number | null
    lastPlayed?: DateTimeNullableWithAggregatesFilter<"UserGame"> | Date | string | null
    isInstalled?: BoolWithAggregatesFilter<"UserGame"> | boolean
    notes?: StringNullableWithAggregatesFilter<"UserGame"> | string | null
    rating?: IntNullableWithAggregatesFilter<"UserGame"> | number | null
  }

  export type DealWhereInput = {
    AND?: DealWhereInput | DealWhereInput[]
    OR?: DealWhereInput[]
    NOT?: DealWhereInput | DealWhereInput[]
    id?: IntFilter<"Deal"> | number
    gameId?: IntFilter<"Deal"> | number
    platformGameId?: IntNullableFilter<"Deal"> | number | null
    title?: StringFilter<"Deal"> | string
    storeName?: StringFilter<"Deal"> | string
    price?: FloatNullableFilter<"Deal"> | number | null
    discountPercent?: FloatNullableFilter<"Deal"> | number | null
    originalPrice?: FloatNullableFilter<"Deal"> | number | null
    url?: StringFilter<"Deal"> | string
    validFrom?: DateTimeNullableFilter<"Deal"> | Date | string | null
    validUntil?: DateTimeNullableFilter<"Deal"> | Date | string | null
    isFreebie?: BoolFilter<"Deal"> | boolean
    discoveredAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    platformGame?: XOR<PlatformGameNullableScalarRelationFilter, PlatformGameWhereInput> | null
  }

  export type DealOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformGameId?: SortOrderInput | SortOrder
    title?: SortOrder
    storeName?: SortOrder
    price?: SortOrderInput | SortOrder
    discountPercent?: SortOrderInput | SortOrder
    originalPrice?: SortOrderInput | SortOrder
    url?: SortOrder
    validFrom?: SortOrderInput | SortOrder
    validUntil?: SortOrderInput | SortOrder
    isFreebie?: SortOrder
    discoveredAt?: SortOrder
    updatedAt?: SortOrder
    game?: GameOrderByWithRelationInput
    platformGame?: PlatformGameOrderByWithRelationInput
  }

  export type DealWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DealWhereInput | DealWhereInput[]
    OR?: DealWhereInput[]
    NOT?: DealWhereInput | DealWhereInput[]
    gameId?: IntFilter<"Deal"> | number
    platformGameId?: IntNullableFilter<"Deal"> | number | null
    title?: StringFilter<"Deal"> | string
    storeName?: StringFilter<"Deal"> | string
    price?: FloatNullableFilter<"Deal"> | number | null
    discountPercent?: FloatNullableFilter<"Deal"> | number | null
    originalPrice?: FloatNullableFilter<"Deal"> | number | null
    url?: StringFilter<"Deal"> | string
    validFrom?: DateTimeNullableFilter<"Deal"> | Date | string | null
    validUntil?: DateTimeNullableFilter<"Deal"> | Date | string | null
    isFreebie?: BoolFilter<"Deal"> | boolean
    discoveredAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    platformGame?: XOR<PlatformGameNullableScalarRelationFilter, PlatformGameWhereInput> | null
  }, "id">

  export type DealOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformGameId?: SortOrderInput | SortOrder
    title?: SortOrder
    storeName?: SortOrder
    price?: SortOrderInput | SortOrder
    discountPercent?: SortOrderInput | SortOrder
    originalPrice?: SortOrderInput | SortOrder
    url?: SortOrder
    validFrom?: SortOrderInput | SortOrder
    validUntil?: SortOrderInput | SortOrder
    isFreebie?: SortOrder
    discoveredAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DealCountOrderByAggregateInput
    _avg?: DealAvgOrderByAggregateInput
    _max?: DealMaxOrderByAggregateInput
    _min?: DealMinOrderByAggregateInput
    _sum?: DealSumOrderByAggregateInput
  }

  export type DealScalarWhereWithAggregatesInput = {
    AND?: DealScalarWhereWithAggregatesInput | DealScalarWhereWithAggregatesInput[]
    OR?: DealScalarWhereWithAggregatesInput[]
    NOT?: DealScalarWhereWithAggregatesInput | DealScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Deal"> | number
    gameId?: IntWithAggregatesFilter<"Deal"> | number
    platformGameId?: IntNullableWithAggregatesFilter<"Deal"> | number | null
    title?: StringWithAggregatesFilter<"Deal"> | string
    storeName?: StringWithAggregatesFilter<"Deal"> | string
    price?: FloatNullableWithAggregatesFilter<"Deal"> | number | null
    discountPercent?: FloatNullableWithAggregatesFilter<"Deal"> | number | null
    originalPrice?: FloatNullableWithAggregatesFilter<"Deal"> | number | null
    url?: StringWithAggregatesFilter<"Deal"> | string
    validFrom?: DateTimeNullableWithAggregatesFilter<"Deal"> | Date | string | null
    validUntil?: DateTimeNullableWithAggregatesFilter<"Deal"> | Date | string | null
    isFreebie?: BoolWithAggregatesFilter<"Deal"> | boolean
    discoveredAt?: DateTimeWithAggregatesFilter<"Deal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Deal"> | Date | string
  }

  export type AchievementWhereInput = {
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    id?: IntFilter<"Achievement"> | number
    name?: StringFilter<"Achievement"> | string
    description?: StringFilter<"Achievement"> | string
    iconUrl?: StringNullableFilter<"Achievement"> | string | null
    criteria?: StringFilter<"Achievement"> | string
    xpReward?: IntFilter<"Achievement"> | number
    creditsReward?: IntFilter<"Achievement"> | number
    createdAt?: DateTimeFilter<"Achievement"> | Date | string
    userAchievements?: UserAchievementListRelationFilter
  }

  export type AchievementOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrderInput | SortOrder
    criteria?: SortOrder
    xpReward?: SortOrder
    creditsReward?: SortOrder
    createdAt?: SortOrder
    userAchievements?: UserAchievementOrderByRelationAggregateInput
  }

  export type AchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    description?: StringFilter<"Achievement"> | string
    iconUrl?: StringNullableFilter<"Achievement"> | string | null
    criteria?: StringFilter<"Achievement"> | string
    xpReward?: IntFilter<"Achievement"> | number
    creditsReward?: IntFilter<"Achievement"> | number
    createdAt?: DateTimeFilter<"Achievement"> | Date | string
    userAchievements?: UserAchievementListRelationFilter
  }, "id" | "name">

  export type AchievementOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrderInput | SortOrder
    criteria?: SortOrder
    xpReward?: SortOrder
    creditsReward?: SortOrder
    createdAt?: SortOrder
    _count?: AchievementCountOrderByAggregateInput
    _avg?: AchievementAvgOrderByAggregateInput
    _max?: AchievementMaxOrderByAggregateInput
    _min?: AchievementMinOrderByAggregateInput
    _sum?: AchievementSumOrderByAggregateInput
  }

  export type AchievementScalarWhereWithAggregatesInput = {
    AND?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    OR?: AchievementScalarWhereWithAggregatesInput[]
    NOT?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Achievement"> | number
    name?: StringWithAggregatesFilter<"Achievement"> | string
    description?: StringWithAggregatesFilter<"Achievement"> | string
    iconUrl?: StringNullableWithAggregatesFilter<"Achievement"> | string | null
    criteria?: StringWithAggregatesFilter<"Achievement"> | string
    xpReward?: IntWithAggregatesFilter<"Achievement"> | number
    creditsReward?: IntWithAggregatesFilter<"Achievement"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Achievement"> | Date | string
  }

  export type UserAchievementWhereInput = {
    AND?: UserAchievementWhereInput | UserAchievementWhereInput[]
    OR?: UserAchievementWhereInput[]
    NOT?: UserAchievementWhereInput | UserAchievementWhereInput[]
    id?: IntFilter<"UserAchievement"> | number
    userId?: IntFilter<"UserAchievement"> | number
    achievementId?: IntFilter<"UserAchievement"> | number
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string
    achievement?: XOR<AchievementScalarRelationFilter, AchievementWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserAchievementOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
    achievement?: AchievementOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserAchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_achievementId?: UserAchievementUserIdAchievementIdCompoundUniqueInput
    AND?: UserAchievementWhereInput | UserAchievementWhereInput[]
    OR?: UserAchievementWhereInput[]
    NOT?: UserAchievementWhereInput | UserAchievementWhereInput[]
    userId?: IntFilter<"UserAchievement"> | number
    achievementId?: IntFilter<"UserAchievement"> | number
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string
    achievement?: XOR<AchievementScalarRelationFilter, AchievementWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_achievementId" | "userId_achievementId">

  export type UserAchievementOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
    _count?: UserAchievementCountOrderByAggregateInput
    _avg?: UserAchievementAvgOrderByAggregateInput
    _max?: UserAchievementMaxOrderByAggregateInput
    _min?: UserAchievementMinOrderByAggregateInput
    _sum?: UserAchievementSumOrderByAggregateInput
  }

  export type UserAchievementScalarWhereWithAggregatesInput = {
    AND?: UserAchievementScalarWhereWithAggregatesInput | UserAchievementScalarWhereWithAggregatesInput[]
    OR?: UserAchievementScalarWhereWithAggregatesInput[]
    NOT?: UserAchievementScalarWhereWithAggregatesInput | UserAchievementScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserAchievement"> | number
    userId?: IntWithAggregatesFilter<"UserAchievement"> | number
    achievementId?: IntWithAggregatesFilter<"UserAchievement"> | number
    unlockedAt?: DateTimeWithAggregatesFilter<"UserAchievement"> | Date | string
  }

  export type WishlistWhereInput = {
    AND?: WishlistWhereInput | WishlistWhereInput[]
    OR?: WishlistWhereInput[]
    NOT?: WishlistWhereInput | WishlistWhereInput[]
    id?: IntFilter<"Wishlist"> | number
    userId?: IntFilter<"Wishlist"> | number
    gameId?: IntFilter<"Wishlist"> | number
    addedAt?: DateTimeFilter<"Wishlist"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WishlistOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
    game?: GameOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type WishlistWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_gameId?: WishlistUserIdGameIdCompoundUniqueInput
    AND?: WishlistWhereInput | WishlistWhereInput[]
    OR?: WishlistWhereInput[]
    NOT?: WishlistWhereInput | WishlistWhereInput[]
    userId?: IntFilter<"Wishlist"> | number
    gameId?: IntFilter<"Wishlist"> | number
    addedAt?: DateTimeFilter<"Wishlist"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_gameId" | "userId_gameId">

  export type WishlistOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
    _count?: WishlistCountOrderByAggregateInput
    _avg?: WishlistAvgOrderByAggregateInput
    _max?: WishlistMaxOrderByAggregateInput
    _min?: WishlistMinOrderByAggregateInput
    _sum?: WishlistSumOrderByAggregateInput
  }

  export type WishlistScalarWhereWithAggregatesInput = {
    AND?: WishlistScalarWhereWithAggregatesInput | WishlistScalarWhereWithAggregatesInput[]
    OR?: WishlistScalarWhereWithAggregatesInput[]
    NOT?: WishlistScalarWhereWithAggregatesInput | WishlistScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Wishlist"> | number
    userId?: IntWithAggregatesFilter<"Wishlist"> | number
    gameId?: IntWithAggregatesFilter<"Wishlist"> | number
    addedAt?: DateTimeWithAggregatesFilter<"Wishlist"> | Date | string
  }

  export type UserCreateInput = {
    supabase_uid: string
    email: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    userAchievements?: UserAchievementCreateNestedManyWithoutUserInput
    userGames?: UserGameCreateNestedManyWithoutUserInput
    wishlistItems?: WishlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    supabase_uid: string
    email: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    userAchievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutUserInput
    wishlistItems?: WishlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    supabase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    userAchievements?: UserAchievementUpdateManyWithoutUserNestedInput
    userGames?: UserGameUpdateManyWithoutUserNestedInput
    wishlistItems?: WishlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    userAchievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutUserNestedInput
    wishlistItems?: WishlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    supabase_uid: string
    email: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
  }

  export type UserUpdateManyMutationInput = {
    supabase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
  }

  export type GameCreateInput = {
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deals?: DealCreateNestedManyWithoutGameInput
    platformGames?: PlatformGameCreateNestedManyWithoutGameInput
    userGames?: UserGameCreateNestedManyWithoutGameInput
    wishlistedBy?: WishlistCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deals?: DealUncheckedCreateNestedManyWithoutGameInput
    platformGames?: PlatformGameUncheckedCreateNestedManyWithoutGameInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutGameInput
    wishlistedBy?: WishlistUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUpdateManyWithoutGameNestedInput
    platformGames?: PlatformGameUpdateManyWithoutGameNestedInput
    userGames?: UserGameUpdateManyWithoutGameNestedInput
    wishlistedBy?: WishlistUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUncheckedUpdateManyWithoutGameNestedInput
    platformGames?: PlatformGameUncheckedUpdateManyWithoutGameNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutGameNestedInput
    wishlistedBy?: WishlistUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformCreateInput = {
    name: string
    slug: string
    iconUrl?: string | null
    siteUrl?: string | null
    platformGames?: PlatformGameCreateNestedManyWithoutPlatformInput
  }

  export type PlatformUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    iconUrl?: string | null
    siteUrl?: string | null
    platformGames?: PlatformGameUncheckedCreateNestedManyWithoutPlatformInput
  }

  export type PlatformUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    platformGames?: PlatformGameUpdateManyWithoutPlatformNestedInput
  }

  export type PlatformUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    platformGames?: PlatformGameUncheckedUpdateManyWithoutPlatformNestedInput
  }

  export type PlatformCreateManyInput = {
    id?: number
    name: string
    slug: string
    iconUrl?: string | null
    siteUrl?: string | null
  }

  export type PlatformUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlatformUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlatformGameCreateInput = {
    platformSpecificId: string
    url?: string | null
    deals?: DealCreateNestedManyWithoutPlatformGameInput
    game: GameCreateNestedOneWithoutPlatformGamesInput
    platform: PlatformCreateNestedOneWithoutPlatformGamesInput
  }

  export type PlatformGameUncheckedCreateInput = {
    id?: number
    gameId: number
    platformId: number
    platformSpecificId: string
    url?: string | null
    deals?: DealUncheckedCreateNestedManyWithoutPlatformGameInput
  }

  export type PlatformGameUpdateInput = {
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deals?: DealUpdateManyWithoutPlatformGameNestedInput
    game?: GameUpdateOneRequiredWithoutPlatformGamesNestedInput
    platform?: PlatformUpdateOneRequiredWithoutPlatformGamesNestedInput
  }

  export type PlatformGameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    platformId?: IntFieldUpdateOperationsInput | number
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deals?: DealUncheckedUpdateManyWithoutPlatformGameNestedInput
  }

  export type PlatformGameCreateManyInput = {
    id?: number
    gameId: number
    platformId: number
    platformSpecificId: string
    url?: string | null
  }

  export type PlatformGameUpdateManyMutationInput = {
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlatformGameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    platformId?: IntFieldUpdateOperationsInput | number
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserGameCreateInput = {
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    notes?: string | null
    rating?: number | null
    game: GameCreateNestedOneWithoutUserGamesInput
    user: UserCreateNestedOneWithoutUserGamesInput
  }

  export type UserGameUncheckedCreateInput = {
    id?: number
    userId: number
    gameId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    notes?: string | null
    rating?: number | null
  }

  export type UserGameUpdateInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    game?: GameUpdateOneRequiredWithoutUserGamesNestedInput
    user?: UserUpdateOneRequiredWithoutUserGamesNestedInput
  }

  export type UserGameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserGameCreateManyInput = {
    id?: number
    userId: number
    gameId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    notes?: string | null
    rating?: number | null
  }

  export type UserGameUpdateManyMutationInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserGameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DealCreateInput = {
    title: string
    storeName: string
    price?: number | null
    discountPercent?: number | null
    originalPrice?: number | null
    url: string
    validFrom?: Date | string | null
    validUntil?: Date | string | null
    isFreebie?: boolean
    discoveredAt?: Date | string
    updatedAt?: Date | string
    game: GameCreateNestedOneWithoutDealsInput
    platformGame?: PlatformGameCreateNestedOneWithoutDealsInput
  }

  export type DealUncheckedCreateInput = {
    id?: number
    gameId: number
    platformGameId?: number | null
    title: string
    storeName: string
    price?: number | null
    discountPercent?: number | null
    originalPrice?: number | null
    url: string
    validFrom?: Date | string | null
    validUntil?: Date | string | null
    isFreebie?: boolean
    discoveredAt?: Date | string
    updatedAt?: Date | string
  }

  export type DealUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: StringFieldUpdateOperationsInput | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isFreebie?: BoolFieldUpdateOperationsInput | boolean
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutDealsNestedInput
    platformGame?: PlatformGameUpdateOneWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    platformGameId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: StringFieldUpdateOperationsInput | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isFreebie?: BoolFieldUpdateOperationsInput | boolean
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealCreateManyInput = {
    id?: number
    gameId: number
    platformGameId?: number | null
    title: string
    storeName: string
    price?: number | null
    discountPercent?: number | null
    originalPrice?: number | null
    url: string
    validFrom?: Date | string | null
    validUntil?: Date | string | null
    isFreebie?: boolean
    discoveredAt?: Date | string
    updatedAt?: Date | string
  }

  export type DealUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: StringFieldUpdateOperationsInput | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isFreebie?: BoolFieldUpdateOperationsInput | boolean
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    platformGameId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: StringFieldUpdateOperationsInput | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isFreebie?: BoolFieldUpdateOperationsInput | boolean
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementCreateInput = {
    name: string
    description: string
    iconUrl?: string | null
    criteria: string
    xpReward?: number
    creditsReward?: number
    createdAt?: Date | string
    userAchievements?: UserAchievementCreateNestedManyWithoutAchievementInput
  }

  export type AchievementUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    iconUrl?: string | null
    criteria: string
    xpReward?: number
    creditsReward?: number
    createdAt?: Date | string
    userAchievements?: UserAchievementUncheckedCreateNestedManyWithoutAchievementInput
  }

  export type AchievementUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    creditsReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAchievements?: UserAchievementUpdateManyWithoutAchievementNestedInput
  }

  export type AchievementUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    creditsReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAchievements?: UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput
  }

  export type AchievementCreateManyInput = {
    id?: number
    name: string
    description: string
    iconUrl?: string | null
    criteria: string
    xpReward?: number
    creditsReward?: number
    createdAt?: Date | string
  }

  export type AchievementUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    creditsReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    creditsReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementCreateInput = {
    unlockedAt?: Date | string
    achievement: AchievementCreateNestedOneWithoutUserAchievementsInput
    user: UserCreateNestedOneWithoutUserAchievementsInput
  }

  export type UserAchievementUncheckedCreateInput = {
    id?: number
    userId: number
    achievementId: number
    unlockedAt?: Date | string
  }

  export type UserAchievementUpdateInput = {
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    achievement?: AchievementUpdateOneRequiredWithoutUserAchievementsNestedInput
    user?: UserUpdateOneRequiredWithoutUserAchievementsNestedInput
  }

  export type UserAchievementUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    achievementId?: IntFieldUpdateOperationsInput | number
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementCreateManyInput = {
    id?: number
    userId: number
    achievementId: number
    unlockedAt?: Date | string
  }

  export type UserAchievementUpdateManyMutationInput = {
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    achievementId?: IntFieldUpdateOperationsInput | number
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistCreateInput = {
    addedAt?: Date | string
    game: GameCreateNestedOneWithoutWishlistedByInput
    user: UserCreateNestedOneWithoutWishlistItemsInput
  }

  export type WishlistUncheckedCreateInput = {
    id?: number
    userId: number
    gameId: number
    addedAt?: Date | string
  }

  export type WishlistUpdateInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutWishlistedByNestedInput
    user?: UserUpdateOneRequiredWithoutWishlistItemsNestedInput
  }

  export type WishlistUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistCreateManyInput = {
    id?: number
    userId: number
    gameId: number
    addedAt?: Date | string
  }

  export type WishlistUpdateManyMutationInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserAchievementListRelationFilter = {
    every?: UserAchievementWhereInput
    some?: UserAchievementWhereInput
    none?: UserAchievementWhereInput
  }

  export type UserGameListRelationFilter = {
    every?: UserGameWhereInput
    some?: UserGameWhereInput
    none?: UserGameWhereInput
  }

  export type WishlistListRelationFilter = {
    every?: WishlistWhereInput
    some?: WishlistWhereInput
    none?: WishlistWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserAchievementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserGameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WishlistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    supabase_uid?: SortOrder
    email?: SortOrder
    display_name?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    supabase_uid?: SortOrder
    email?: SortOrder
    display_name?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    supabase_uid?: SortOrder
    email?: SortOrder
    display_name?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DealListRelationFilter = {
    every?: DealWhereInput
    some?: DealWhereInput
    none?: DealWhereInput
  }

  export type PlatformGameListRelationFilter = {
    every?: PlatformGameWhereInput
    some?: PlatformGameWhereInput
    none?: PlatformGameWhereInput
  }

  export type DealOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlatformGameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    coverUrl?: SortOrder
    releaseDate?: SortOrder
    developer?: SortOrder
    publisher?: SortOrder
    genres?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    coverUrl?: SortOrder
    releaseDate?: SortOrder
    developer?: SortOrder
    publisher?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    coverUrl?: SortOrder
    releaseDate?: SortOrder
    developer?: SortOrder
    publisher?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PlatformCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    iconUrl?: SortOrder
    siteUrl?: SortOrder
  }

  export type PlatformAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PlatformMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    iconUrl?: SortOrder
    siteUrl?: SortOrder
  }

  export type PlatformMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    iconUrl?: SortOrder
    siteUrl?: SortOrder
  }

  export type PlatformSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type PlatformScalarRelationFilter = {
    is?: PlatformWhereInput
    isNot?: PlatformWhereInput
  }

  export type PlatformGameGameIdPlatformIdCompoundUniqueInput = {
    gameId: number
    platformId: number
  }

  export type PlatformGamePlatformIdPlatformSpecificIdCompoundUniqueInput = {
    platformId: number
    platformSpecificId: string
  }

  export type PlatformGameCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformId?: SortOrder
    platformSpecificId?: SortOrder
    url?: SortOrder
  }

  export type PlatformGameAvgOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformId?: SortOrder
  }

  export type PlatformGameMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformId?: SortOrder
    platformSpecificId?: SortOrder
    url?: SortOrder
  }

  export type PlatformGameMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformId?: SortOrder
    platformSpecificId?: SortOrder
    url?: SortOrder
  }

  export type PlatformGameSumOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserGameUserIdGameIdCompoundUniqueInput = {
    userId: number
    gameId: number
  }

  export type UserGameCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
    playtimeMinutes?: SortOrder
    lastPlayed?: SortOrder
    isInstalled?: SortOrder
    notes?: SortOrder
    rating?: SortOrder
  }

  export type UserGameAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    playtimeMinutes?: SortOrder
    rating?: SortOrder
  }

  export type UserGameMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
    playtimeMinutes?: SortOrder
    lastPlayed?: SortOrder
    isInstalled?: SortOrder
    notes?: SortOrder
    rating?: SortOrder
  }

  export type UserGameMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
    playtimeMinutes?: SortOrder
    lastPlayed?: SortOrder
    isInstalled?: SortOrder
    notes?: SortOrder
    rating?: SortOrder
  }

  export type UserGameSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    playtimeMinutes?: SortOrder
    rating?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type PlatformGameNullableScalarRelationFilter = {
    is?: PlatformGameWhereInput | null
    isNot?: PlatformGameWhereInput | null
  }

  export type DealCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformGameId?: SortOrder
    title?: SortOrder
    storeName?: SortOrder
    price?: SortOrder
    discountPercent?: SortOrder
    originalPrice?: SortOrder
    url?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    isFreebie?: SortOrder
    discoveredAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DealAvgOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformGameId?: SortOrder
    price?: SortOrder
    discountPercent?: SortOrder
    originalPrice?: SortOrder
  }

  export type DealMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformGameId?: SortOrder
    title?: SortOrder
    storeName?: SortOrder
    price?: SortOrder
    discountPercent?: SortOrder
    originalPrice?: SortOrder
    url?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    isFreebie?: SortOrder
    discoveredAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DealMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformGameId?: SortOrder
    title?: SortOrder
    storeName?: SortOrder
    price?: SortOrder
    discountPercent?: SortOrder
    originalPrice?: SortOrder
    url?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    isFreebie?: SortOrder
    discoveredAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DealSumOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    platformGameId?: SortOrder
    price?: SortOrder
    discountPercent?: SortOrder
    originalPrice?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type AchievementCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    criteria?: SortOrder
    xpReward?: SortOrder
    creditsReward?: SortOrder
    createdAt?: SortOrder
  }

  export type AchievementAvgOrderByAggregateInput = {
    id?: SortOrder
    xpReward?: SortOrder
    creditsReward?: SortOrder
  }

  export type AchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    criteria?: SortOrder
    xpReward?: SortOrder
    creditsReward?: SortOrder
    createdAt?: SortOrder
  }

  export type AchievementMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    criteria?: SortOrder
    xpReward?: SortOrder
    creditsReward?: SortOrder
    createdAt?: SortOrder
  }

  export type AchievementSumOrderByAggregateInput = {
    id?: SortOrder
    xpReward?: SortOrder
    creditsReward?: SortOrder
  }

  export type AchievementScalarRelationFilter = {
    is?: AchievementWhereInput
    isNot?: AchievementWhereInput
  }

  export type UserAchievementUserIdAchievementIdCompoundUniqueInput = {
    userId: number
    achievementId: number
  }

  export type UserAchievementCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
  }

  export type UserAchievementAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
  }

  export type UserAchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
  }

  export type UserAchievementMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
  }

  export type UserAchievementSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
  }

  export type WishlistUserIdGameIdCompoundUniqueInput = {
    userId: number
    gameId: number
  }

  export type WishlistCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
  }

  export type WishlistAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
  }

  export type WishlistMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
  }

  export type WishlistMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
  }

  export type WishlistSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
  }

  export type UserAchievementCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type UserGameCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGameCreateWithoutUserInput, UserGameUncheckedCreateWithoutUserInput> | UserGameCreateWithoutUserInput[] | UserGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutUserInput | UserGameCreateOrConnectWithoutUserInput[]
    createMany?: UserGameCreateManyUserInputEnvelope
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
  }

  export type WishlistCreateNestedManyWithoutUserInput = {
    create?: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput> | WishlistCreateWithoutUserInput[] | WishlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutUserInput | WishlistCreateOrConnectWithoutUserInput[]
    createMany?: WishlistCreateManyUserInputEnvelope
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
  }

  export type UserAchievementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type UserGameUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGameCreateWithoutUserInput, UserGameUncheckedCreateWithoutUserInput> | UserGameCreateWithoutUserInput[] | UserGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutUserInput | UserGameCreateOrConnectWithoutUserInput[]
    createMany?: UserGameCreateManyUserInputEnvelope
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
  }

  export type WishlistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput> | WishlistCreateWithoutUserInput[] | WishlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutUserInput | WishlistCreateOrConnectWithoutUserInput[]
    createMany?: WishlistCreateManyUserInputEnvelope
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserAchievementUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutUserInput | UserAchievementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutUserInput | UserAchievementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutUserInput | UserAchievementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type UserGameUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGameCreateWithoutUserInput, UserGameUncheckedCreateWithoutUserInput> | UserGameCreateWithoutUserInput[] | UserGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutUserInput | UserGameCreateOrConnectWithoutUserInput[]
    upsert?: UserGameUpsertWithWhereUniqueWithoutUserInput | UserGameUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGameCreateManyUserInputEnvelope
    set?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    disconnect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    delete?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    update?: UserGameUpdateWithWhereUniqueWithoutUserInput | UserGameUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGameUpdateManyWithWhereWithoutUserInput | UserGameUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGameScalarWhereInput | UserGameScalarWhereInput[]
  }

  export type WishlistUpdateManyWithoutUserNestedInput = {
    create?: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput> | WishlistCreateWithoutUserInput[] | WishlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutUserInput | WishlistCreateOrConnectWithoutUserInput[]
    upsert?: WishlistUpsertWithWhereUniqueWithoutUserInput | WishlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WishlistCreateManyUserInputEnvelope
    set?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    disconnect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    delete?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    update?: WishlistUpdateWithWhereUniqueWithoutUserInput | WishlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WishlistUpdateManyWithWhereWithoutUserInput | WishlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
  }

  export type UserAchievementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutUserInput | UserAchievementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutUserInput | UserAchievementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutUserInput | UserAchievementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type UserGameUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGameCreateWithoutUserInput, UserGameUncheckedCreateWithoutUserInput> | UserGameCreateWithoutUserInput[] | UserGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutUserInput | UserGameCreateOrConnectWithoutUserInput[]
    upsert?: UserGameUpsertWithWhereUniqueWithoutUserInput | UserGameUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGameCreateManyUserInputEnvelope
    set?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    disconnect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    delete?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    update?: UserGameUpdateWithWhereUniqueWithoutUserInput | UserGameUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGameUpdateManyWithWhereWithoutUserInput | UserGameUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGameScalarWhereInput | UserGameScalarWhereInput[]
  }

  export type WishlistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput> | WishlistCreateWithoutUserInput[] | WishlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutUserInput | WishlistCreateOrConnectWithoutUserInput[]
    upsert?: WishlistUpsertWithWhereUniqueWithoutUserInput | WishlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WishlistCreateManyUserInputEnvelope
    set?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    disconnect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    delete?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    update?: WishlistUpdateWithWhereUniqueWithoutUserInput | WishlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WishlistUpdateManyWithWhereWithoutUserInput | WishlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
  }

  export type GameCreategenresInput = {
    set: string[]
  }

  export type DealCreateNestedManyWithoutGameInput = {
    create?: XOR<DealCreateWithoutGameInput, DealUncheckedCreateWithoutGameInput> | DealCreateWithoutGameInput[] | DealUncheckedCreateWithoutGameInput[]
    connectOrCreate?: DealCreateOrConnectWithoutGameInput | DealCreateOrConnectWithoutGameInput[]
    createMany?: DealCreateManyGameInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type PlatformGameCreateNestedManyWithoutGameInput = {
    create?: XOR<PlatformGameCreateWithoutGameInput, PlatformGameUncheckedCreateWithoutGameInput> | PlatformGameCreateWithoutGameInput[] | PlatformGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PlatformGameCreateOrConnectWithoutGameInput | PlatformGameCreateOrConnectWithoutGameInput[]
    createMany?: PlatformGameCreateManyGameInputEnvelope
    connect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
  }

  export type UserGameCreateNestedManyWithoutGameInput = {
    create?: XOR<UserGameCreateWithoutGameInput, UserGameUncheckedCreateWithoutGameInput> | UserGameCreateWithoutGameInput[] | UserGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutGameInput | UserGameCreateOrConnectWithoutGameInput[]
    createMany?: UserGameCreateManyGameInputEnvelope
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
  }

  export type WishlistCreateNestedManyWithoutGameInput = {
    create?: XOR<WishlistCreateWithoutGameInput, WishlistUncheckedCreateWithoutGameInput> | WishlistCreateWithoutGameInput[] | WishlistUncheckedCreateWithoutGameInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutGameInput | WishlistCreateOrConnectWithoutGameInput[]
    createMany?: WishlistCreateManyGameInputEnvelope
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
  }

  export type DealUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<DealCreateWithoutGameInput, DealUncheckedCreateWithoutGameInput> | DealCreateWithoutGameInput[] | DealUncheckedCreateWithoutGameInput[]
    connectOrCreate?: DealCreateOrConnectWithoutGameInput | DealCreateOrConnectWithoutGameInput[]
    createMany?: DealCreateManyGameInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type PlatformGameUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<PlatformGameCreateWithoutGameInput, PlatformGameUncheckedCreateWithoutGameInput> | PlatformGameCreateWithoutGameInput[] | PlatformGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PlatformGameCreateOrConnectWithoutGameInput | PlatformGameCreateOrConnectWithoutGameInput[]
    createMany?: PlatformGameCreateManyGameInputEnvelope
    connect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
  }

  export type UserGameUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<UserGameCreateWithoutGameInput, UserGameUncheckedCreateWithoutGameInput> | UserGameCreateWithoutGameInput[] | UserGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutGameInput | UserGameCreateOrConnectWithoutGameInput[]
    createMany?: UserGameCreateManyGameInputEnvelope
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
  }

  export type WishlistUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<WishlistCreateWithoutGameInput, WishlistUncheckedCreateWithoutGameInput> | WishlistCreateWithoutGameInput[] | WishlistUncheckedCreateWithoutGameInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutGameInput | WishlistCreateOrConnectWithoutGameInput[]
    createMany?: WishlistCreateManyGameInputEnvelope
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type GameUpdategenresInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DealUpdateManyWithoutGameNestedInput = {
    create?: XOR<DealCreateWithoutGameInput, DealUncheckedCreateWithoutGameInput> | DealCreateWithoutGameInput[] | DealUncheckedCreateWithoutGameInput[]
    connectOrCreate?: DealCreateOrConnectWithoutGameInput | DealCreateOrConnectWithoutGameInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutGameInput | DealUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: DealCreateManyGameInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutGameInput | DealUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: DealUpdateManyWithWhereWithoutGameInput | DealUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type PlatformGameUpdateManyWithoutGameNestedInput = {
    create?: XOR<PlatformGameCreateWithoutGameInput, PlatformGameUncheckedCreateWithoutGameInput> | PlatformGameCreateWithoutGameInput[] | PlatformGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PlatformGameCreateOrConnectWithoutGameInput | PlatformGameCreateOrConnectWithoutGameInput[]
    upsert?: PlatformGameUpsertWithWhereUniqueWithoutGameInput | PlatformGameUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: PlatformGameCreateManyGameInputEnvelope
    set?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    disconnect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    delete?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    connect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    update?: PlatformGameUpdateWithWhereUniqueWithoutGameInput | PlatformGameUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: PlatformGameUpdateManyWithWhereWithoutGameInput | PlatformGameUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: PlatformGameScalarWhereInput | PlatformGameScalarWhereInput[]
  }

  export type UserGameUpdateManyWithoutGameNestedInput = {
    create?: XOR<UserGameCreateWithoutGameInput, UserGameUncheckedCreateWithoutGameInput> | UserGameCreateWithoutGameInput[] | UserGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutGameInput | UserGameCreateOrConnectWithoutGameInput[]
    upsert?: UserGameUpsertWithWhereUniqueWithoutGameInput | UserGameUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: UserGameCreateManyGameInputEnvelope
    set?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    disconnect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    delete?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    update?: UserGameUpdateWithWhereUniqueWithoutGameInput | UserGameUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: UserGameUpdateManyWithWhereWithoutGameInput | UserGameUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: UserGameScalarWhereInput | UserGameScalarWhereInput[]
  }

  export type WishlistUpdateManyWithoutGameNestedInput = {
    create?: XOR<WishlistCreateWithoutGameInput, WishlistUncheckedCreateWithoutGameInput> | WishlistCreateWithoutGameInput[] | WishlistUncheckedCreateWithoutGameInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutGameInput | WishlistCreateOrConnectWithoutGameInput[]
    upsert?: WishlistUpsertWithWhereUniqueWithoutGameInput | WishlistUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: WishlistCreateManyGameInputEnvelope
    set?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    disconnect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    delete?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    update?: WishlistUpdateWithWhereUniqueWithoutGameInput | WishlistUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: WishlistUpdateManyWithWhereWithoutGameInput | WishlistUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
  }

  export type DealUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<DealCreateWithoutGameInput, DealUncheckedCreateWithoutGameInput> | DealCreateWithoutGameInput[] | DealUncheckedCreateWithoutGameInput[]
    connectOrCreate?: DealCreateOrConnectWithoutGameInput | DealCreateOrConnectWithoutGameInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutGameInput | DealUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: DealCreateManyGameInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutGameInput | DealUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: DealUpdateManyWithWhereWithoutGameInput | DealUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type PlatformGameUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<PlatformGameCreateWithoutGameInput, PlatformGameUncheckedCreateWithoutGameInput> | PlatformGameCreateWithoutGameInput[] | PlatformGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PlatformGameCreateOrConnectWithoutGameInput | PlatformGameCreateOrConnectWithoutGameInput[]
    upsert?: PlatformGameUpsertWithWhereUniqueWithoutGameInput | PlatformGameUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: PlatformGameCreateManyGameInputEnvelope
    set?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    disconnect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    delete?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    connect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    update?: PlatformGameUpdateWithWhereUniqueWithoutGameInput | PlatformGameUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: PlatformGameUpdateManyWithWhereWithoutGameInput | PlatformGameUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: PlatformGameScalarWhereInput | PlatformGameScalarWhereInput[]
  }

  export type UserGameUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<UserGameCreateWithoutGameInput, UserGameUncheckedCreateWithoutGameInput> | UserGameCreateWithoutGameInput[] | UserGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutGameInput | UserGameCreateOrConnectWithoutGameInput[]
    upsert?: UserGameUpsertWithWhereUniqueWithoutGameInput | UserGameUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: UserGameCreateManyGameInputEnvelope
    set?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    disconnect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    delete?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
    update?: UserGameUpdateWithWhereUniqueWithoutGameInput | UserGameUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: UserGameUpdateManyWithWhereWithoutGameInput | UserGameUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: UserGameScalarWhereInput | UserGameScalarWhereInput[]
  }

  export type WishlistUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<WishlistCreateWithoutGameInput, WishlistUncheckedCreateWithoutGameInput> | WishlistCreateWithoutGameInput[] | WishlistUncheckedCreateWithoutGameInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutGameInput | WishlistCreateOrConnectWithoutGameInput[]
    upsert?: WishlistUpsertWithWhereUniqueWithoutGameInput | WishlistUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: WishlistCreateManyGameInputEnvelope
    set?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    disconnect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    delete?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    update?: WishlistUpdateWithWhereUniqueWithoutGameInput | WishlistUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: WishlistUpdateManyWithWhereWithoutGameInput | WishlistUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
  }

  export type PlatformGameCreateNestedManyWithoutPlatformInput = {
    create?: XOR<PlatformGameCreateWithoutPlatformInput, PlatformGameUncheckedCreateWithoutPlatformInput> | PlatformGameCreateWithoutPlatformInput[] | PlatformGameUncheckedCreateWithoutPlatformInput[]
    connectOrCreate?: PlatformGameCreateOrConnectWithoutPlatformInput | PlatformGameCreateOrConnectWithoutPlatformInput[]
    createMany?: PlatformGameCreateManyPlatformInputEnvelope
    connect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
  }

  export type PlatformGameUncheckedCreateNestedManyWithoutPlatformInput = {
    create?: XOR<PlatformGameCreateWithoutPlatformInput, PlatformGameUncheckedCreateWithoutPlatformInput> | PlatformGameCreateWithoutPlatformInput[] | PlatformGameUncheckedCreateWithoutPlatformInput[]
    connectOrCreate?: PlatformGameCreateOrConnectWithoutPlatformInput | PlatformGameCreateOrConnectWithoutPlatformInput[]
    createMany?: PlatformGameCreateManyPlatformInputEnvelope
    connect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
  }

  export type PlatformGameUpdateManyWithoutPlatformNestedInput = {
    create?: XOR<PlatformGameCreateWithoutPlatformInput, PlatformGameUncheckedCreateWithoutPlatformInput> | PlatformGameCreateWithoutPlatformInput[] | PlatformGameUncheckedCreateWithoutPlatformInput[]
    connectOrCreate?: PlatformGameCreateOrConnectWithoutPlatformInput | PlatformGameCreateOrConnectWithoutPlatformInput[]
    upsert?: PlatformGameUpsertWithWhereUniqueWithoutPlatformInput | PlatformGameUpsertWithWhereUniqueWithoutPlatformInput[]
    createMany?: PlatformGameCreateManyPlatformInputEnvelope
    set?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    disconnect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    delete?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    connect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    update?: PlatformGameUpdateWithWhereUniqueWithoutPlatformInput | PlatformGameUpdateWithWhereUniqueWithoutPlatformInput[]
    updateMany?: PlatformGameUpdateManyWithWhereWithoutPlatformInput | PlatformGameUpdateManyWithWhereWithoutPlatformInput[]
    deleteMany?: PlatformGameScalarWhereInput | PlatformGameScalarWhereInput[]
  }

  export type PlatformGameUncheckedUpdateManyWithoutPlatformNestedInput = {
    create?: XOR<PlatformGameCreateWithoutPlatformInput, PlatformGameUncheckedCreateWithoutPlatformInput> | PlatformGameCreateWithoutPlatformInput[] | PlatformGameUncheckedCreateWithoutPlatformInput[]
    connectOrCreate?: PlatformGameCreateOrConnectWithoutPlatformInput | PlatformGameCreateOrConnectWithoutPlatformInput[]
    upsert?: PlatformGameUpsertWithWhereUniqueWithoutPlatformInput | PlatformGameUpsertWithWhereUniqueWithoutPlatformInput[]
    createMany?: PlatformGameCreateManyPlatformInputEnvelope
    set?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    disconnect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    delete?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    connect?: PlatformGameWhereUniqueInput | PlatformGameWhereUniqueInput[]
    update?: PlatformGameUpdateWithWhereUniqueWithoutPlatformInput | PlatformGameUpdateWithWhereUniqueWithoutPlatformInput[]
    updateMany?: PlatformGameUpdateManyWithWhereWithoutPlatformInput | PlatformGameUpdateManyWithWhereWithoutPlatformInput[]
    deleteMany?: PlatformGameScalarWhereInput | PlatformGameScalarWhereInput[]
  }

  export type DealCreateNestedManyWithoutPlatformGameInput = {
    create?: XOR<DealCreateWithoutPlatformGameInput, DealUncheckedCreateWithoutPlatformGameInput> | DealCreateWithoutPlatformGameInput[] | DealUncheckedCreateWithoutPlatformGameInput[]
    connectOrCreate?: DealCreateOrConnectWithoutPlatformGameInput | DealCreateOrConnectWithoutPlatformGameInput[]
    createMany?: DealCreateManyPlatformGameInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type GameCreateNestedOneWithoutPlatformGamesInput = {
    create?: XOR<GameCreateWithoutPlatformGamesInput, GameUncheckedCreateWithoutPlatformGamesInput>
    connectOrCreate?: GameCreateOrConnectWithoutPlatformGamesInput
    connect?: GameWhereUniqueInput
  }

  export type PlatformCreateNestedOneWithoutPlatformGamesInput = {
    create?: XOR<PlatformCreateWithoutPlatformGamesInput, PlatformUncheckedCreateWithoutPlatformGamesInput>
    connectOrCreate?: PlatformCreateOrConnectWithoutPlatformGamesInput
    connect?: PlatformWhereUniqueInput
  }

  export type DealUncheckedCreateNestedManyWithoutPlatformGameInput = {
    create?: XOR<DealCreateWithoutPlatformGameInput, DealUncheckedCreateWithoutPlatformGameInput> | DealCreateWithoutPlatformGameInput[] | DealUncheckedCreateWithoutPlatformGameInput[]
    connectOrCreate?: DealCreateOrConnectWithoutPlatformGameInput | DealCreateOrConnectWithoutPlatformGameInput[]
    createMany?: DealCreateManyPlatformGameInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type DealUpdateManyWithoutPlatformGameNestedInput = {
    create?: XOR<DealCreateWithoutPlatformGameInput, DealUncheckedCreateWithoutPlatformGameInput> | DealCreateWithoutPlatformGameInput[] | DealUncheckedCreateWithoutPlatformGameInput[]
    connectOrCreate?: DealCreateOrConnectWithoutPlatformGameInput | DealCreateOrConnectWithoutPlatformGameInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutPlatformGameInput | DealUpsertWithWhereUniqueWithoutPlatformGameInput[]
    createMany?: DealCreateManyPlatformGameInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutPlatformGameInput | DealUpdateWithWhereUniqueWithoutPlatformGameInput[]
    updateMany?: DealUpdateManyWithWhereWithoutPlatformGameInput | DealUpdateManyWithWhereWithoutPlatformGameInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type GameUpdateOneRequiredWithoutPlatformGamesNestedInput = {
    create?: XOR<GameCreateWithoutPlatformGamesInput, GameUncheckedCreateWithoutPlatformGamesInput>
    connectOrCreate?: GameCreateOrConnectWithoutPlatformGamesInput
    upsert?: GameUpsertWithoutPlatformGamesInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutPlatformGamesInput, GameUpdateWithoutPlatformGamesInput>, GameUncheckedUpdateWithoutPlatformGamesInput>
  }

  export type PlatformUpdateOneRequiredWithoutPlatformGamesNestedInput = {
    create?: XOR<PlatformCreateWithoutPlatformGamesInput, PlatformUncheckedCreateWithoutPlatformGamesInput>
    connectOrCreate?: PlatformCreateOrConnectWithoutPlatformGamesInput
    upsert?: PlatformUpsertWithoutPlatformGamesInput
    connect?: PlatformWhereUniqueInput
    update?: XOR<XOR<PlatformUpdateToOneWithWhereWithoutPlatformGamesInput, PlatformUpdateWithoutPlatformGamesInput>, PlatformUncheckedUpdateWithoutPlatformGamesInput>
  }

  export type DealUncheckedUpdateManyWithoutPlatformGameNestedInput = {
    create?: XOR<DealCreateWithoutPlatformGameInput, DealUncheckedCreateWithoutPlatformGameInput> | DealCreateWithoutPlatformGameInput[] | DealUncheckedCreateWithoutPlatformGameInput[]
    connectOrCreate?: DealCreateOrConnectWithoutPlatformGameInput | DealCreateOrConnectWithoutPlatformGameInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutPlatformGameInput | DealUpsertWithWhereUniqueWithoutPlatformGameInput[]
    createMany?: DealCreateManyPlatformGameInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutPlatformGameInput | DealUpdateWithWhereUniqueWithoutPlatformGameInput[]
    updateMany?: DealUpdateManyWithWhereWithoutPlatformGameInput | DealUpdateManyWithWhereWithoutPlatformGameInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type GameCreateNestedOneWithoutUserGamesInput = {
    create?: XOR<GameCreateWithoutUserGamesInput, GameUncheckedCreateWithoutUserGamesInput>
    connectOrCreate?: GameCreateOrConnectWithoutUserGamesInput
    connect?: GameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUserGamesInput = {
    create?: XOR<UserCreateWithoutUserGamesInput, UserUncheckedCreateWithoutUserGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserGamesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type GameUpdateOneRequiredWithoutUserGamesNestedInput = {
    create?: XOR<GameCreateWithoutUserGamesInput, GameUncheckedCreateWithoutUserGamesInput>
    connectOrCreate?: GameCreateOrConnectWithoutUserGamesInput
    upsert?: GameUpsertWithoutUserGamesInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutUserGamesInput, GameUpdateWithoutUserGamesInput>, GameUncheckedUpdateWithoutUserGamesInput>
  }

  export type UserUpdateOneRequiredWithoutUserGamesNestedInput = {
    create?: XOR<UserCreateWithoutUserGamesInput, UserUncheckedCreateWithoutUserGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserGamesInput
    upsert?: UserUpsertWithoutUserGamesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserGamesInput, UserUpdateWithoutUserGamesInput>, UserUncheckedUpdateWithoutUserGamesInput>
  }

  export type GameCreateNestedOneWithoutDealsInput = {
    create?: XOR<GameCreateWithoutDealsInput, GameUncheckedCreateWithoutDealsInput>
    connectOrCreate?: GameCreateOrConnectWithoutDealsInput
    connect?: GameWhereUniqueInput
  }

  export type PlatformGameCreateNestedOneWithoutDealsInput = {
    create?: XOR<PlatformGameCreateWithoutDealsInput, PlatformGameUncheckedCreateWithoutDealsInput>
    connectOrCreate?: PlatformGameCreateOrConnectWithoutDealsInput
    connect?: PlatformGameWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameUpdateOneRequiredWithoutDealsNestedInput = {
    create?: XOR<GameCreateWithoutDealsInput, GameUncheckedCreateWithoutDealsInput>
    connectOrCreate?: GameCreateOrConnectWithoutDealsInput
    upsert?: GameUpsertWithoutDealsInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutDealsInput, GameUpdateWithoutDealsInput>, GameUncheckedUpdateWithoutDealsInput>
  }

  export type PlatformGameUpdateOneWithoutDealsNestedInput = {
    create?: XOR<PlatformGameCreateWithoutDealsInput, PlatformGameUncheckedCreateWithoutDealsInput>
    connectOrCreate?: PlatformGameCreateOrConnectWithoutDealsInput
    upsert?: PlatformGameUpsertWithoutDealsInput
    disconnect?: PlatformGameWhereInput | boolean
    delete?: PlatformGameWhereInput | boolean
    connect?: PlatformGameWhereUniqueInput
    update?: XOR<XOR<PlatformGameUpdateToOneWithWhereWithoutDealsInput, PlatformGameUpdateWithoutDealsInput>, PlatformGameUncheckedUpdateWithoutDealsInput>
  }

  export type UserAchievementCreateNestedManyWithoutAchievementInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type UserAchievementUncheckedCreateNestedManyWithoutAchievementInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type UserAchievementUpdateManyWithoutAchievementNestedInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutAchievementInput | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutAchievementInput | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutAchievementInput | UserAchievementUpdateManyWithWhereWithoutAchievementInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutAchievementInput | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutAchievementInput | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutAchievementInput | UserAchievementUpdateManyWithWhereWithoutAchievementInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type AchievementCreateNestedOneWithoutUserAchievementsInput = {
    create?: XOR<AchievementCreateWithoutUserAchievementsInput, AchievementUncheckedCreateWithoutUserAchievementsInput>
    connectOrCreate?: AchievementCreateOrConnectWithoutUserAchievementsInput
    connect?: AchievementWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUserAchievementsInput = {
    create?: XOR<UserCreateWithoutUserAchievementsInput, UserUncheckedCreateWithoutUserAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserAchievementsInput
    connect?: UserWhereUniqueInput
  }

  export type AchievementUpdateOneRequiredWithoutUserAchievementsNestedInput = {
    create?: XOR<AchievementCreateWithoutUserAchievementsInput, AchievementUncheckedCreateWithoutUserAchievementsInput>
    connectOrCreate?: AchievementCreateOrConnectWithoutUserAchievementsInput
    upsert?: AchievementUpsertWithoutUserAchievementsInput
    connect?: AchievementWhereUniqueInput
    update?: XOR<XOR<AchievementUpdateToOneWithWhereWithoutUserAchievementsInput, AchievementUpdateWithoutUserAchievementsInput>, AchievementUncheckedUpdateWithoutUserAchievementsInput>
  }

  export type UserUpdateOneRequiredWithoutUserAchievementsNestedInput = {
    create?: XOR<UserCreateWithoutUserAchievementsInput, UserUncheckedCreateWithoutUserAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserAchievementsInput
    upsert?: UserUpsertWithoutUserAchievementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserAchievementsInput, UserUpdateWithoutUserAchievementsInput>, UserUncheckedUpdateWithoutUserAchievementsInput>
  }

  export type GameCreateNestedOneWithoutWishlistedByInput = {
    create?: XOR<GameCreateWithoutWishlistedByInput, GameUncheckedCreateWithoutWishlistedByInput>
    connectOrCreate?: GameCreateOrConnectWithoutWishlistedByInput
    connect?: GameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWishlistItemsInput = {
    create?: XOR<UserCreateWithoutWishlistItemsInput, UserUncheckedCreateWithoutWishlistItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWishlistItemsInput
    connect?: UserWhereUniqueInput
  }

  export type GameUpdateOneRequiredWithoutWishlistedByNestedInput = {
    create?: XOR<GameCreateWithoutWishlistedByInput, GameUncheckedCreateWithoutWishlistedByInput>
    connectOrCreate?: GameCreateOrConnectWithoutWishlistedByInput
    upsert?: GameUpsertWithoutWishlistedByInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutWishlistedByInput, GameUpdateWithoutWishlistedByInput>, GameUncheckedUpdateWithoutWishlistedByInput>
  }

  export type UserUpdateOneRequiredWithoutWishlistItemsNestedInput = {
    create?: XOR<UserCreateWithoutWishlistItemsInput, UserUncheckedCreateWithoutWishlistItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWishlistItemsInput
    upsert?: UserUpsertWithoutWishlistItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWishlistItemsInput, UserUpdateWithoutWishlistItemsInput>, UserUncheckedUpdateWithoutWishlistItemsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserAchievementCreateWithoutUserInput = {
    unlockedAt?: Date | string
    achievement: AchievementCreateNestedOneWithoutUserAchievementsInput
  }

  export type UserAchievementUncheckedCreateWithoutUserInput = {
    id?: number
    achievementId: number
    unlockedAt?: Date | string
  }

  export type UserAchievementCreateOrConnectWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    create: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput>
  }

  export type UserAchievementCreateManyUserInputEnvelope = {
    data: UserAchievementCreateManyUserInput | UserAchievementCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserGameCreateWithoutUserInput = {
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    notes?: string | null
    rating?: number | null
    game: GameCreateNestedOneWithoutUserGamesInput
  }

  export type UserGameUncheckedCreateWithoutUserInput = {
    id?: number
    gameId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    notes?: string | null
    rating?: number | null
  }

  export type UserGameCreateOrConnectWithoutUserInput = {
    where: UserGameWhereUniqueInput
    create: XOR<UserGameCreateWithoutUserInput, UserGameUncheckedCreateWithoutUserInput>
  }

  export type UserGameCreateManyUserInputEnvelope = {
    data: UserGameCreateManyUserInput | UserGameCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WishlistCreateWithoutUserInput = {
    addedAt?: Date | string
    game: GameCreateNestedOneWithoutWishlistedByInput
  }

  export type WishlistUncheckedCreateWithoutUserInput = {
    id?: number
    gameId: number
    addedAt?: Date | string
  }

  export type WishlistCreateOrConnectWithoutUserInput = {
    where: WishlistWhereUniqueInput
    create: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput>
  }

  export type WishlistCreateManyUserInputEnvelope = {
    data: WishlistCreateManyUserInput | WishlistCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserAchievementUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    update: XOR<UserAchievementUpdateWithoutUserInput, UserAchievementUncheckedUpdateWithoutUserInput>
    create: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput>
  }

  export type UserAchievementUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    data: XOR<UserAchievementUpdateWithoutUserInput, UserAchievementUncheckedUpdateWithoutUserInput>
  }

  export type UserAchievementUpdateManyWithWhereWithoutUserInput = {
    where: UserAchievementScalarWhereInput
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyWithoutUserInput>
  }

  export type UserAchievementScalarWhereInput = {
    AND?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
    OR?: UserAchievementScalarWhereInput[]
    NOT?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
    id?: IntFilter<"UserAchievement"> | number
    userId?: IntFilter<"UserAchievement"> | number
    achievementId?: IntFilter<"UserAchievement"> | number
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string
  }

  export type UserGameUpsertWithWhereUniqueWithoutUserInput = {
    where: UserGameWhereUniqueInput
    update: XOR<UserGameUpdateWithoutUserInput, UserGameUncheckedUpdateWithoutUserInput>
    create: XOR<UserGameCreateWithoutUserInput, UserGameUncheckedCreateWithoutUserInput>
  }

  export type UserGameUpdateWithWhereUniqueWithoutUserInput = {
    where: UserGameWhereUniqueInput
    data: XOR<UserGameUpdateWithoutUserInput, UserGameUncheckedUpdateWithoutUserInput>
  }

  export type UserGameUpdateManyWithWhereWithoutUserInput = {
    where: UserGameScalarWhereInput
    data: XOR<UserGameUpdateManyMutationInput, UserGameUncheckedUpdateManyWithoutUserInput>
  }

  export type UserGameScalarWhereInput = {
    AND?: UserGameScalarWhereInput | UserGameScalarWhereInput[]
    OR?: UserGameScalarWhereInput[]
    NOT?: UserGameScalarWhereInput | UserGameScalarWhereInput[]
    id?: IntFilter<"UserGame"> | number
    userId?: IntFilter<"UserGame"> | number
    gameId?: IntFilter<"UserGame"> | number
    addedAt?: DateTimeFilter<"UserGame"> | Date | string
    playtimeMinutes?: IntNullableFilter<"UserGame"> | number | null
    lastPlayed?: DateTimeNullableFilter<"UserGame"> | Date | string | null
    isInstalled?: BoolFilter<"UserGame"> | boolean
    notes?: StringNullableFilter<"UserGame"> | string | null
    rating?: IntNullableFilter<"UserGame"> | number | null
  }

  export type WishlistUpsertWithWhereUniqueWithoutUserInput = {
    where: WishlistWhereUniqueInput
    update: XOR<WishlistUpdateWithoutUserInput, WishlistUncheckedUpdateWithoutUserInput>
    create: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput>
  }

  export type WishlistUpdateWithWhereUniqueWithoutUserInput = {
    where: WishlistWhereUniqueInput
    data: XOR<WishlistUpdateWithoutUserInput, WishlistUncheckedUpdateWithoutUserInput>
  }

  export type WishlistUpdateManyWithWhereWithoutUserInput = {
    where: WishlistScalarWhereInput
    data: XOR<WishlistUpdateManyMutationInput, WishlistUncheckedUpdateManyWithoutUserInput>
  }

  export type WishlistScalarWhereInput = {
    AND?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
    OR?: WishlistScalarWhereInput[]
    NOT?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
    id?: IntFilter<"Wishlist"> | number
    userId?: IntFilter<"Wishlist"> | number
    gameId?: IntFilter<"Wishlist"> | number
    addedAt?: DateTimeFilter<"Wishlist"> | Date | string
  }

  export type DealCreateWithoutGameInput = {
    title: string
    storeName: string
    price?: number | null
    discountPercent?: number | null
    originalPrice?: number | null
    url: string
    validFrom?: Date | string | null
    validUntil?: Date | string | null
    isFreebie?: boolean
    discoveredAt?: Date | string
    updatedAt?: Date | string
    platformGame?: PlatformGameCreateNestedOneWithoutDealsInput
  }

  export type DealUncheckedCreateWithoutGameInput = {
    id?: number
    platformGameId?: number | null
    title: string
    storeName: string
    price?: number | null
    discountPercent?: number | null
    originalPrice?: number | null
    url: string
    validFrom?: Date | string | null
    validUntil?: Date | string | null
    isFreebie?: boolean
    discoveredAt?: Date | string
    updatedAt?: Date | string
  }

  export type DealCreateOrConnectWithoutGameInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutGameInput, DealUncheckedCreateWithoutGameInput>
  }

  export type DealCreateManyGameInputEnvelope = {
    data: DealCreateManyGameInput | DealCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type PlatformGameCreateWithoutGameInput = {
    platformSpecificId: string
    url?: string | null
    deals?: DealCreateNestedManyWithoutPlatformGameInput
    platform: PlatformCreateNestedOneWithoutPlatformGamesInput
  }

  export type PlatformGameUncheckedCreateWithoutGameInput = {
    id?: number
    platformId: number
    platformSpecificId: string
    url?: string | null
    deals?: DealUncheckedCreateNestedManyWithoutPlatformGameInput
  }

  export type PlatformGameCreateOrConnectWithoutGameInput = {
    where: PlatformGameWhereUniqueInput
    create: XOR<PlatformGameCreateWithoutGameInput, PlatformGameUncheckedCreateWithoutGameInput>
  }

  export type PlatformGameCreateManyGameInputEnvelope = {
    data: PlatformGameCreateManyGameInput | PlatformGameCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type UserGameCreateWithoutGameInput = {
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    notes?: string | null
    rating?: number | null
    user: UserCreateNestedOneWithoutUserGamesInput
  }

  export type UserGameUncheckedCreateWithoutGameInput = {
    id?: number
    userId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    notes?: string | null
    rating?: number | null
  }

  export type UserGameCreateOrConnectWithoutGameInput = {
    where: UserGameWhereUniqueInput
    create: XOR<UserGameCreateWithoutGameInput, UserGameUncheckedCreateWithoutGameInput>
  }

  export type UserGameCreateManyGameInputEnvelope = {
    data: UserGameCreateManyGameInput | UserGameCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type WishlistCreateWithoutGameInput = {
    addedAt?: Date | string
    user: UserCreateNestedOneWithoutWishlistItemsInput
  }

  export type WishlistUncheckedCreateWithoutGameInput = {
    id?: number
    userId: number
    addedAt?: Date | string
  }

  export type WishlistCreateOrConnectWithoutGameInput = {
    where: WishlistWhereUniqueInput
    create: XOR<WishlistCreateWithoutGameInput, WishlistUncheckedCreateWithoutGameInput>
  }

  export type WishlistCreateManyGameInputEnvelope = {
    data: WishlistCreateManyGameInput | WishlistCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type DealUpsertWithWhereUniqueWithoutGameInput = {
    where: DealWhereUniqueInput
    update: XOR<DealUpdateWithoutGameInput, DealUncheckedUpdateWithoutGameInput>
    create: XOR<DealCreateWithoutGameInput, DealUncheckedCreateWithoutGameInput>
  }

  export type DealUpdateWithWhereUniqueWithoutGameInput = {
    where: DealWhereUniqueInput
    data: XOR<DealUpdateWithoutGameInput, DealUncheckedUpdateWithoutGameInput>
  }

  export type DealUpdateManyWithWhereWithoutGameInput = {
    where: DealScalarWhereInput
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyWithoutGameInput>
  }

  export type DealScalarWhereInput = {
    AND?: DealScalarWhereInput | DealScalarWhereInput[]
    OR?: DealScalarWhereInput[]
    NOT?: DealScalarWhereInput | DealScalarWhereInput[]
    id?: IntFilter<"Deal"> | number
    gameId?: IntFilter<"Deal"> | number
    platformGameId?: IntNullableFilter<"Deal"> | number | null
    title?: StringFilter<"Deal"> | string
    storeName?: StringFilter<"Deal"> | string
    price?: FloatNullableFilter<"Deal"> | number | null
    discountPercent?: FloatNullableFilter<"Deal"> | number | null
    originalPrice?: FloatNullableFilter<"Deal"> | number | null
    url?: StringFilter<"Deal"> | string
    validFrom?: DateTimeNullableFilter<"Deal"> | Date | string | null
    validUntil?: DateTimeNullableFilter<"Deal"> | Date | string | null
    isFreebie?: BoolFilter<"Deal"> | boolean
    discoveredAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
  }

  export type PlatformGameUpsertWithWhereUniqueWithoutGameInput = {
    where: PlatformGameWhereUniqueInput
    update: XOR<PlatformGameUpdateWithoutGameInput, PlatformGameUncheckedUpdateWithoutGameInput>
    create: XOR<PlatformGameCreateWithoutGameInput, PlatformGameUncheckedCreateWithoutGameInput>
  }

  export type PlatformGameUpdateWithWhereUniqueWithoutGameInput = {
    where: PlatformGameWhereUniqueInput
    data: XOR<PlatformGameUpdateWithoutGameInput, PlatformGameUncheckedUpdateWithoutGameInput>
  }

  export type PlatformGameUpdateManyWithWhereWithoutGameInput = {
    where: PlatformGameScalarWhereInput
    data: XOR<PlatformGameUpdateManyMutationInput, PlatformGameUncheckedUpdateManyWithoutGameInput>
  }

  export type PlatformGameScalarWhereInput = {
    AND?: PlatformGameScalarWhereInput | PlatformGameScalarWhereInput[]
    OR?: PlatformGameScalarWhereInput[]
    NOT?: PlatformGameScalarWhereInput | PlatformGameScalarWhereInput[]
    id?: IntFilter<"PlatformGame"> | number
    gameId?: IntFilter<"PlatformGame"> | number
    platformId?: IntFilter<"PlatformGame"> | number
    platformSpecificId?: StringFilter<"PlatformGame"> | string
    url?: StringNullableFilter<"PlatformGame"> | string | null
  }

  export type UserGameUpsertWithWhereUniqueWithoutGameInput = {
    where: UserGameWhereUniqueInput
    update: XOR<UserGameUpdateWithoutGameInput, UserGameUncheckedUpdateWithoutGameInput>
    create: XOR<UserGameCreateWithoutGameInput, UserGameUncheckedCreateWithoutGameInput>
  }

  export type UserGameUpdateWithWhereUniqueWithoutGameInput = {
    where: UserGameWhereUniqueInput
    data: XOR<UserGameUpdateWithoutGameInput, UserGameUncheckedUpdateWithoutGameInput>
  }

  export type UserGameUpdateManyWithWhereWithoutGameInput = {
    where: UserGameScalarWhereInput
    data: XOR<UserGameUpdateManyMutationInput, UserGameUncheckedUpdateManyWithoutGameInput>
  }

  export type WishlistUpsertWithWhereUniqueWithoutGameInput = {
    where: WishlistWhereUniqueInput
    update: XOR<WishlistUpdateWithoutGameInput, WishlistUncheckedUpdateWithoutGameInput>
    create: XOR<WishlistCreateWithoutGameInput, WishlistUncheckedCreateWithoutGameInput>
  }

  export type WishlistUpdateWithWhereUniqueWithoutGameInput = {
    where: WishlistWhereUniqueInput
    data: XOR<WishlistUpdateWithoutGameInput, WishlistUncheckedUpdateWithoutGameInput>
  }

  export type WishlistUpdateManyWithWhereWithoutGameInput = {
    where: WishlistScalarWhereInput
    data: XOR<WishlistUpdateManyMutationInput, WishlistUncheckedUpdateManyWithoutGameInput>
  }

  export type PlatformGameCreateWithoutPlatformInput = {
    platformSpecificId: string
    url?: string | null
    deals?: DealCreateNestedManyWithoutPlatformGameInput
    game: GameCreateNestedOneWithoutPlatformGamesInput
  }

  export type PlatformGameUncheckedCreateWithoutPlatformInput = {
    id?: number
    gameId: number
    platformSpecificId: string
    url?: string | null
    deals?: DealUncheckedCreateNestedManyWithoutPlatformGameInput
  }

  export type PlatformGameCreateOrConnectWithoutPlatformInput = {
    where: PlatformGameWhereUniqueInput
    create: XOR<PlatformGameCreateWithoutPlatformInput, PlatformGameUncheckedCreateWithoutPlatformInput>
  }

  export type PlatformGameCreateManyPlatformInputEnvelope = {
    data: PlatformGameCreateManyPlatformInput | PlatformGameCreateManyPlatformInput[]
    skipDuplicates?: boolean
  }

  export type PlatformGameUpsertWithWhereUniqueWithoutPlatformInput = {
    where: PlatformGameWhereUniqueInput
    update: XOR<PlatformGameUpdateWithoutPlatformInput, PlatformGameUncheckedUpdateWithoutPlatformInput>
    create: XOR<PlatformGameCreateWithoutPlatformInput, PlatformGameUncheckedCreateWithoutPlatformInput>
  }

  export type PlatformGameUpdateWithWhereUniqueWithoutPlatformInput = {
    where: PlatformGameWhereUniqueInput
    data: XOR<PlatformGameUpdateWithoutPlatformInput, PlatformGameUncheckedUpdateWithoutPlatformInput>
  }

  export type PlatformGameUpdateManyWithWhereWithoutPlatformInput = {
    where: PlatformGameScalarWhereInput
    data: XOR<PlatformGameUpdateManyMutationInput, PlatformGameUncheckedUpdateManyWithoutPlatformInput>
  }

  export type DealCreateWithoutPlatformGameInput = {
    title: string
    storeName: string
    price?: number | null
    discountPercent?: number | null
    originalPrice?: number | null
    url: string
    validFrom?: Date | string | null
    validUntil?: Date | string | null
    isFreebie?: boolean
    discoveredAt?: Date | string
    updatedAt?: Date | string
    game: GameCreateNestedOneWithoutDealsInput
  }

  export type DealUncheckedCreateWithoutPlatformGameInput = {
    id?: number
    gameId: number
    title: string
    storeName: string
    price?: number | null
    discountPercent?: number | null
    originalPrice?: number | null
    url: string
    validFrom?: Date | string | null
    validUntil?: Date | string | null
    isFreebie?: boolean
    discoveredAt?: Date | string
    updatedAt?: Date | string
  }

  export type DealCreateOrConnectWithoutPlatformGameInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutPlatformGameInput, DealUncheckedCreateWithoutPlatformGameInput>
  }

  export type DealCreateManyPlatformGameInputEnvelope = {
    data: DealCreateManyPlatformGameInput | DealCreateManyPlatformGameInput[]
    skipDuplicates?: boolean
  }

  export type GameCreateWithoutPlatformGamesInput = {
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deals?: DealCreateNestedManyWithoutGameInput
    userGames?: UserGameCreateNestedManyWithoutGameInput
    wishlistedBy?: WishlistCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutPlatformGamesInput = {
    id?: number
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deals?: DealUncheckedCreateNestedManyWithoutGameInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutGameInput
    wishlistedBy?: WishlistUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutPlatformGamesInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutPlatformGamesInput, GameUncheckedCreateWithoutPlatformGamesInput>
  }

  export type PlatformCreateWithoutPlatformGamesInput = {
    name: string
    slug: string
    iconUrl?: string | null
    siteUrl?: string | null
  }

  export type PlatformUncheckedCreateWithoutPlatformGamesInput = {
    id?: number
    name: string
    slug: string
    iconUrl?: string | null
    siteUrl?: string | null
  }

  export type PlatformCreateOrConnectWithoutPlatformGamesInput = {
    where: PlatformWhereUniqueInput
    create: XOR<PlatformCreateWithoutPlatformGamesInput, PlatformUncheckedCreateWithoutPlatformGamesInput>
  }

  export type DealUpsertWithWhereUniqueWithoutPlatformGameInput = {
    where: DealWhereUniqueInput
    update: XOR<DealUpdateWithoutPlatformGameInput, DealUncheckedUpdateWithoutPlatformGameInput>
    create: XOR<DealCreateWithoutPlatformGameInput, DealUncheckedCreateWithoutPlatformGameInput>
  }

  export type DealUpdateWithWhereUniqueWithoutPlatformGameInput = {
    where: DealWhereUniqueInput
    data: XOR<DealUpdateWithoutPlatformGameInput, DealUncheckedUpdateWithoutPlatformGameInput>
  }

  export type DealUpdateManyWithWhereWithoutPlatformGameInput = {
    where: DealScalarWhereInput
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyWithoutPlatformGameInput>
  }

  export type GameUpsertWithoutPlatformGamesInput = {
    update: XOR<GameUpdateWithoutPlatformGamesInput, GameUncheckedUpdateWithoutPlatformGamesInput>
    create: XOR<GameCreateWithoutPlatformGamesInput, GameUncheckedCreateWithoutPlatformGamesInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutPlatformGamesInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutPlatformGamesInput, GameUncheckedUpdateWithoutPlatformGamesInput>
  }

  export type GameUpdateWithoutPlatformGamesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUpdateManyWithoutGameNestedInput
    userGames?: UserGameUpdateManyWithoutGameNestedInput
    wishlistedBy?: WishlistUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutPlatformGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUncheckedUpdateManyWithoutGameNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutGameNestedInput
    wishlistedBy?: WishlistUncheckedUpdateManyWithoutGameNestedInput
  }

  export type PlatformUpsertWithoutPlatformGamesInput = {
    update: XOR<PlatformUpdateWithoutPlatformGamesInput, PlatformUncheckedUpdateWithoutPlatformGamesInput>
    create: XOR<PlatformCreateWithoutPlatformGamesInput, PlatformUncheckedCreateWithoutPlatformGamesInput>
    where?: PlatformWhereInput
  }

  export type PlatformUpdateToOneWithWhereWithoutPlatformGamesInput = {
    where?: PlatformWhereInput
    data: XOR<PlatformUpdateWithoutPlatformGamesInput, PlatformUncheckedUpdateWithoutPlatformGamesInput>
  }

  export type PlatformUpdateWithoutPlatformGamesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlatformUncheckedUpdateWithoutPlatformGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameCreateWithoutUserGamesInput = {
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deals?: DealCreateNestedManyWithoutGameInput
    platformGames?: PlatformGameCreateNestedManyWithoutGameInput
    wishlistedBy?: WishlistCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutUserGamesInput = {
    id?: number
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deals?: DealUncheckedCreateNestedManyWithoutGameInput
    platformGames?: PlatformGameUncheckedCreateNestedManyWithoutGameInput
    wishlistedBy?: WishlistUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutUserGamesInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutUserGamesInput, GameUncheckedCreateWithoutUserGamesInput>
  }

  export type UserCreateWithoutUserGamesInput = {
    supabase_uid: string
    email: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    userAchievements?: UserAchievementCreateNestedManyWithoutUserInput
    wishlistItems?: WishlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserGamesInput = {
    id?: number
    supabase_uid: string
    email: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    userAchievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    wishlistItems?: WishlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserGamesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserGamesInput, UserUncheckedCreateWithoutUserGamesInput>
  }

  export type GameUpsertWithoutUserGamesInput = {
    update: XOR<GameUpdateWithoutUserGamesInput, GameUncheckedUpdateWithoutUserGamesInput>
    create: XOR<GameCreateWithoutUserGamesInput, GameUncheckedCreateWithoutUserGamesInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutUserGamesInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutUserGamesInput, GameUncheckedUpdateWithoutUserGamesInput>
  }

  export type GameUpdateWithoutUserGamesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUpdateManyWithoutGameNestedInput
    platformGames?: PlatformGameUpdateManyWithoutGameNestedInput
    wishlistedBy?: WishlistUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutUserGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUncheckedUpdateManyWithoutGameNestedInput
    platformGames?: PlatformGameUncheckedUpdateManyWithoutGameNestedInput
    wishlistedBy?: WishlistUncheckedUpdateManyWithoutGameNestedInput
  }

  export type UserUpsertWithoutUserGamesInput = {
    update: XOR<UserUpdateWithoutUserGamesInput, UserUncheckedUpdateWithoutUserGamesInput>
    create: XOR<UserCreateWithoutUserGamesInput, UserUncheckedCreateWithoutUserGamesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserGamesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserGamesInput, UserUncheckedUpdateWithoutUserGamesInput>
  }

  export type UserUpdateWithoutUserGamesInput = {
    supabase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    userAchievements?: UserAchievementUpdateManyWithoutUserNestedInput
    wishlistItems?: WishlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    userAchievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    wishlistItems?: WishlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GameCreateWithoutDealsInput = {
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    platformGames?: PlatformGameCreateNestedManyWithoutGameInput
    userGames?: UserGameCreateNestedManyWithoutGameInput
    wishlistedBy?: WishlistCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutDealsInput = {
    id?: number
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    platformGames?: PlatformGameUncheckedCreateNestedManyWithoutGameInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutGameInput
    wishlistedBy?: WishlistUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutDealsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutDealsInput, GameUncheckedCreateWithoutDealsInput>
  }

  export type PlatformGameCreateWithoutDealsInput = {
    platformSpecificId: string
    url?: string | null
    game: GameCreateNestedOneWithoutPlatformGamesInput
    platform: PlatformCreateNestedOneWithoutPlatformGamesInput
  }

  export type PlatformGameUncheckedCreateWithoutDealsInput = {
    id?: number
    gameId: number
    platformId: number
    platformSpecificId: string
    url?: string | null
  }

  export type PlatformGameCreateOrConnectWithoutDealsInput = {
    where: PlatformGameWhereUniqueInput
    create: XOR<PlatformGameCreateWithoutDealsInput, PlatformGameUncheckedCreateWithoutDealsInput>
  }

  export type GameUpsertWithoutDealsInput = {
    update: XOR<GameUpdateWithoutDealsInput, GameUncheckedUpdateWithoutDealsInput>
    create: XOR<GameCreateWithoutDealsInput, GameUncheckedCreateWithoutDealsInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutDealsInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutDealsInput, GameUncheckedUpdateWithoutDealsInput>
  }

  export type GameUpdateWithoutDealsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platformGames?: PlatformGameUpdateManyWithoutGameNestedInput
    userGames?: UserGameUpdateManyWithoutGameNestedInput
    wishlistedBy?: WishlistUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutDealsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platformGames?: PlatformGameUncheckedUpdateManyWithoutGameNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutGameNestedInput
    wishlistedBy?: WishlistUncheckedUpdateManyWithoutGameNestedInput
  }

  export type PlatformGameUpsertWithoutDealsInput = {
    update: XOR<PlatformGameUpdateWithoutDealsInput, PlatformGameUncheckedUpdateWithoutDealsInput>
    create: XOR<PlatformGameCreateWithoutDealsInput, PlatformGameUncheckedCreateWithoutDealsInput>
    where?: PlatformGameWhereInput
  }

  export type PlatformGameUpdateToOneWithWhereWithoutDealsInput = {
    where?: PlatformGameWhereInput
    data: XOR<PlatformGameUpdateWithoutDealsInput, PlatformGameUncheckedUpdateWithoutDealsInput>
  }

  export type PlatformGameUpdateWithoutDealsInput = {
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    game?: GameUpdateOneRequiredWithoutPlatformGamesNestedInput
    platform?: PlatformUpdateOneRequiredWithoutPlatformGamesNestedInput
  }

  export type PlatformGameUncheckedUpdateWithoutDealsInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    platformId?: IntFieldUpdateOperationsInput | number
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserAchievementCreateWithoutAchievementInput = {
    unlockedAt?: Date | string
    user: UserCreateNestedOneWithoutUserAchievementsInput
  }

  export type UserAchievementUncheckedCreateWithoutAchievementInput = {
    id?: number
    userId: number
    unlockedAt?: Date | string
  }

  export type UserAchievementCreateOrConnectWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    create: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput>
  }

  export type UserAchievementCreateManyAchievementInputEnvelope = {
    data: UserAchievementCreateManyAchievementInput | UserAchievementCreateManyAchievementInput[]
    skipDuplicates?: boolean
  }

  export type UserAchievementUpsertWithWhereUniqueWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    update: XOR<UserAchievementUpdateWithoutAchievementInput, UserAchievementUncheckedUpdateWithoutAchievementInput>
    create: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput>
  }

  export type UserAchievementUpdateWithWhereUniqueWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    data: XOR<UserAchievementUpdateWithoutAchievementInput, UserAchievementUncheckedUpdateWithoutAchievementInput>
  }

  export type UserAchievementUpdateManyWithWhereWithoutAchievementInput = {
    where: UserAchievementScalarWhereInput
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyWithoutAchievementInput>
  }

  export type AchievementCreateWithoutUserAchievementsInput = {
    name: string
    description: string
    iconUrl?: string | null
    criteria: string
    xpReward?: number
    creditsReward?: number
    createdAt?: Date | string
  }

  export type AchievementUncheckedCreateWithoutUserAchievementsInput = {
    id?: number
    name: string
    description: string
    iconUrl?: string | null
    criteria: string
    xpReward?: number
    creditsReward?: number
    createdAt?: Date | string
  }

  export type AchievementCreateOrConnectWithoutUserAchievementsInput = {
    where: AchievementWhereUniqueInput
    create: XOR<AchievementCreateWithoutUserAchievementsInput, AchievementUncheckedCreateWithoutUserAchievementsInput>
  }

  export type UserCreateWithoutUserAchievementsInput = {
    supabase_uid: string
    email: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    userGames?: UserGameCreateNestedManyWithoutUserInput
    wishlistItems?: WishlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserAchievementsInput = {
    id?: number
    supabase_uid: string
    email: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    userGames?: UserGameUncheckedCreateNestedManyWithoutUserInput
    wishlistItems?: WishlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserAchievementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserAchievementsInput, UserUncheckedCreateWithoutUserAchievementsInput>
  }

  export type AchievementUpsertWithoutUserAchievementsInput = {
    update: XOR<AchievementUpdateWithoutUserAchievementsInput, AchievementUncheckedUpdateWithoutUserAchievementsInput>
    create: XOR<AchievementCreateWithoutUserAchievementsInput, AchievementUncheckedCreateWithoutUserAchievementsInput>
    where?: AchievementWhereInput
  }

  export type AchievementUpdateToOneWithWhereWithoutUserAchievementsInput = {
    where?: AchievementWhereInput
    data: XOR<AchievementUpdateWithoutUserAchievementsInput, AchievementUncheckedUpdateWithoutUserAchievementsInput>
  }

  export type AchievementUpdateWithoutUserAchievementsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    creditsReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateWithoutUserAchievementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: StringFieldUpdateOperationsInput | string
    xpReward?: IntFieldUpdateOperationsInput | number
    creditsReward?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutUserAchievementsInput = {
    update: XOR<UserUpdateWithoutUserAchievementsInput, UserUncheckedUpdateWithoutUserAchievementsInput>
    create: XOR<UserCreateWithoutUserAchievementsInput, UserUncheckedCreateWithoutUserAchievementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserAchievementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserAchievementsInput, UserUncheckedUpdateWithoutUserAchievementsInput>
  }

  export type UserUpdateWithoutUserAchievementsInput = {
    supabase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    userGames?: UserGameUpdateManyWithoutUserNestedInput
    wishlistItems?: WishlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserAchievementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    userGames?: UserGameUncheckedUpdateManyWithoutUserNestedInput
    wishlistItems?: WishlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GameCreateWithoutWishlistedByInput = {
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deals?: DealCreateNestedManyWithoutGameInput
    platformGames?: PlatformGameCreateNestedManyWithoutGameInput
    userGames?: UserGameCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutWishlistedByInput = {
    id?: number
    title: string
    description?: string | null
    coverUrl?: string | null
    releaseDate?: Date | string | null
    developer?: string | null
    publisher?: string | null
    genres?: GameCreategenresInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deals?: DealUncheckedCreateNestedManyWithoutGameInput
    platformGames?: PlatformGameUncheckedCreateNestedManyWithoutGameInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutWishlistedByInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutWishlistedByInput, GameUncheckedCreateWithoutWishlistedByInput>
  }

  export type UserCreateWithoutWishlistItemsInput = {
    supabase_uid: string
    email: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    userAchievements?: UserAchievementCreateNestedManyWithoutUserInput
    userGames?: UserGameCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWishlistItemsInput = {
    id?: number
    supabase_uid: string
    email: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    userAchievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWishlistItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWishlistItemsInput, UserUncheckedCreateWithoutWishlistItemsInput>
  }

  export type GameUpsertWithoutWishlistedByInput = {
    update: XOR<GameUpdateWithoutWishlistedByInput, GameUncheckedUpdateWithoutWishlistedByInput>
    create: XOR<GameCreateWithoutWishlistedByInput, GameUncheckedCreateWithoutWishlistedByInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutWishlistedByInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutWishlistedByInput, GameUncheckedUpdateWithoutWishlistedByInput>
  }

  export type GameUpdateWithoutWishlistedByInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUpdateManyWithoutGameNestedInput
    platformGames?: PlatformGameUpdateManyWithoutGameNestedInput
    userGames?: UserGameUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutWishlistedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    releaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    developer?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: GameUpdategenresInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUncheckedUpdateManyWithoutGameNestedInput
    platformGames?: PlatformGameUncheckedUpdateManyWithoutGameNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutGameNestedInput
  }

  export type UserUpsertWithoutWishlistItemsInput = {
    update: XOR<UserUpdateWithoutWishlistItemsInput, UserUncheckedUpdateWithoutWishlistItemsInput>
    create: XOR<UserCreateWithoutWishlistItemsInput, UserUncheckedCreateWithoutWishlistItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWishlistItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWishlistItemsInput, UserUncheckedUpdateWithoutWishlistItemsInput>
  }

  export type UserUpdateWithoutWishlistItemsInput = {
    supabase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    userAchievements?: UserAchievementUpdateManyWithoutUserNestedInput
    userGames?: UserGameUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWishlistItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    userAchievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserAchievementCreateManyUserInput = {
    id?: number
    achievementId: number
    unlockedAt?: Date | string
  }

  export type UserGameCreateManyUserInput = {
    id?: number
    gameId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    notes?: string | null
    rating?: number | null
  }

  export type WishlistCreateManyUserInput = {
    id?: number
    gameId: number
    addedAt?: Date | string
  }

  export type UserAchievementUpdateWithoutUserInput = {
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    achievement?: AchievementUpdateOneRequiredWithoutUserAchievementsNestedInput
  }

  export type UserAchievementUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    achievementId?: IntFieldUpdateOperationsInput | number
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    achievementId?: IntFieldUpdateOperationsInput | number
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGameUpdateWithoutUserInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    game?: GameUpdateOneRequiredWithoutUserGamesNestedInput
  }

  export type UserGameUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserGameUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WishlistUpdateWithoutUserInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutWishlistedByNestedInput
  }

  export type WishlistUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealCreateManyGameInput = {
    id?: number
    platformGameId?: number | null
    title: string
    storeName: string
    price?: number | null
    discountPercent?: number | null
    originalPrice?: number | null
    url: string
    validFrom?: Date | string | null
    validUntil?: Date | string | null
    isFreebie?: boolean
    discoveredAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformGameCreateManyGameInput = {
    id?: number
    platformId: number
    platformSpecificId: string
    url?: string | null
  }

  export type UserGameCreateManyGameInput = {
    id?: number
    userId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    notes?: string | null
    rating?: number | null
  }

  export type WishlistCreateManyGameInput = {
    id?: number
    userId: number
    addedAt?: Date | string
  }

  export type DealUpdateWithoutGameInput = {
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: StringFieldUpdateOperationsInput | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isFreebie?: BoolFieldUpdateOperationsInput | boolean
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platformGame?: PlatformGameUpdateOneWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    platformGameId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: StringFieldUpdateOperationsInput | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isFreebie?: BoolFieldUpdateOperationsInput | boolean
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    platformGameId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: StringFieldUpdateOperationsInput | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isFreebie?: BoolFieldUpdateOperationsInput | boolean
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformGameUpdateWithoutGameInput = {
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deals?: DealUpdateManyWithoutPlatformGameNestedInput
    platform?: PlatformUpdateOneRequiredWithoutPlatformGamesNestedInput
  }

  export type PlatformGameUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    platformId?: IntFieldUpdateOperationsInput | number
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deals?: DealUncheckedUpdateManyWithoutPlatformGameNestedInput
  }

  export type PlatformGameUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    platformId?: IntFieldUpdateOperationsInput | number
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserGameUpdateWithoutGameInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutUserGamesNestedInput
  }

  export type UserGameUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserGameUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WishlistUpdateWithoutGameInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWishlistItemsNestedInput
  }

  export type WishlistUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformGameCreateManyPlatformInput = {
    id?: number
    gameId: number
    platformSpecificId: string
    url?: string | null
  }

  export type PlatformGameUpdateWithoutPlatformInput = {
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deals?: DealUpdateManyWithoutPlatformGameNestedInput
    game?: GameUpdateOneRequiredWithoutPlatformGamesNestedInput
  }

  export type PlatformGameUncheckedUpdateWithoutPlatformInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    deals?: DealUncheckedUpdateManyWithoutPlatformGameNestedInput
  }

  export type PlatformGameUncheckedUpdateManyWithoutPlatformInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    platformSpecificId?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DealCreateManyPlatformGameInput = {
    id?: number
    gameId: number
    title: string
    storeName: string
    price?: number | null
    discountPercent?: number | null
    originalPrice?: number | null
    url: string
    validFrom?: Date | string | null
    validUntil?: Date | string | null
    isFreebie?: boolean
    discoveredAt?: Date | string
    updatedAt?: Date | string
  }

  export type DealUpdateWithoutPlatformGameInput = {
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: StringFieldUpdateOperationsInput | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isFreebie?: BoolFieldUpdateOperationsInput | boolean
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateWithoutPlatformGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: StringFieldUpdateOperationsInput | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isFreebie?: BoolFieldUpdateOperationsInput | boolean
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealUncheckedUpdateManyWithoutPlatformGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: StringFieldUpdateOperationsInput | string
    validFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isFreebie?: BoolFieldUpdateOperationsInput | boolean
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementCreateManyAchievementInput = {
    id?: number
    userId: number
    unlockedAt?: Date | string
  }

  export type UserAchievementUpdateWithoutAchievementInput = {
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserAchievementsNestedInput
  }

  export type UserAchievementUncheckedUpdateWithoutAchievementInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyWithoutAchievementInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}