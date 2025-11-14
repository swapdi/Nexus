
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
 * Model Wishlist
 * 
 */
export type Wishlist = $Result.DefaultSelection<Prisma.$WishlistPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model wishlist_deal_notifications
 * 
 */
export type wishlist_deal_notifications = $Result.DefaultSelection<Prisma.$wishlist_deal_notificationsPayload>

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
   * `prisma.wishlist`: Exposes CRUD operations for the **Wishlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wishlists
    * const wishlists = await prisma.wishlist.findMany()
    * ```
    */
  get wishlist(): Prisma.WishlistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wishlist_deal_notifications`: Exposes CRUD operations for the **wishlist_deal_notifications** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wishlist_deal_notifications
    * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.findMany()
    * ```
    */
  get wishlist_deal_notifications(): Prisma.wishlist_deal_notificationsDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
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
    UserGame: 'UserGame',
    Deal: 'Deal',
    Wishlist: 'Wishlist',
    Message: 'Message',
    wishlist_deal_notifications: 'wishlist_deal_notifications'
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
      modelProps: "user" | "game" | "platform" | "userGame" | "deal" | "wishlist" | "message" | "wishlist_deal_notifications"
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
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      wishlist_deal_notifications: {
        payload: Prisma.$wishlist_deal_notificationsPayload<ExtArgs>
        fields: Prisma.wishlist_deal_notificationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.wishlist_deal_notificationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.wishlist_deal_notificationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload>
          }
          findFirst: {
            args: Prisma.wishlist_deal_notificationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.wishlist_deal_notificationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload>
          }
          findMany: {
            args: Prisma.wishlist_deal_notificationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload>[]
          }
          create: {
            args: Prisma.wishlist_deal_notificationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload>
          }
          createMany: {
            args: Prisma.wishlist_deal_notificationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.wishlist_deal_notificationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload>[]
          }
          delete: {
            args: Prisma.wishlist_deal_notificationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload>
          }
          update: {
            args: Prisma.wishlist_deal_notificationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload>
          }
          deleteMany: {
            args: Prisma.wishlist_deal_notificationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.wishlist_deal_notificationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.wishlist_deal_notificationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload>[]
          }
          upsert: {
            args: Prisma.wishlist_deal_notificationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wishlist_deal_notificationsPayload>
          }
          aggregate: {
            args: Prisma.Wishlist_deal_notificationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWishlist_deal_notifications>
          }
          groupBy: {
            args: Prisma.wishlist_deal_notificationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Wishlist_deal_notificationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.wishlist_deal_notificationsCountArgs<ExtArgs>
            result: $Utils.Optional<Wishlist_deal_notificationsCountAggregateOutputType> | number
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
    userGame?: UserGameOmit
    deal?: DealOmit
    wishlist?: WishlistOmit
    message?: MessageOmit
    wishlist_deal_notifications?: wishlist_deal_notificationsOmit
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
    receivedMessages: number
    sentMessages: number
    userGames: number
    wishlist_deal_notifications: number
    wishlistItems: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receivedMessages?: boolean | UserCountOutputTypeCountReceivedMessagesArgs
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs
    userGames?: boolean | UserCountOutputTypeCountUserGamesArgs
    wishlist_deal_notifications?: boolean | UserCountOutputTypeCountWishlist_deal_notificationsArgs
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
  export type UserCountOutputTypeCountReceivedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
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
  export type UserCountOutputTypeCountWishlist_deal_notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: wishlist_deal_notificationsWhereInput
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
    userGames: number
    wishlist_deal_notifications: number
    wishlistedBy: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deals?: boolean | GameCountOutputTypeCountDealsArgs
    userGames?: boolean | GameCountOutputTypeCountUserGamesArgs
    wishlist_deal_notifications?: boolean | GameCountOutputTypeCountWishlist_deal_notificationsArgs
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
  export type GameCountOutputTypeCountUserGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGameWhereInput
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountWishlist_deal_notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: wishlist_deal_notificationsWhereInput
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountWishlistedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishlistWhereInput
  }


  /**
   * Count Type DealCountOutputType
   */

  export type DealCountOutputType = {
    wishlist_deal_notifications: number
  }

  export type DealCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wishlist_deal_notifications?: boolean | DealCountOutputTypeCountWishlist_deal_notificationsArgs
  }

  // Custom InputTypes
  /**
   * DealCountOutputType without action
   */
  export type DealCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealCountOutputType
     */
    select?: DealCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DealCountOutputType without action
   */
  export type DealCountOutputTypeCountWishlist_deal_notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: wishlist_deal_notificationsWhereInput
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
    display_name: string | null
    xp: number | null
    level: number | null
    credits: number | null
    steamId: string | null
    epicConnect: boolean | null
    gogConnect: boolean | null
    emailNotifications: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    supabase_uid: string | null
    display_name: string | null
    xp: number | null
    level: number | null
    credits: number | null
    steamId: string | null
    epicConnect: boolean | null
    gogConnect: boolean | null
    emailNotifications: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    supabase_uid: number
    display_name: number
    xp: number
    level: number
    credits: number
    steamId: number
    epicConnect: number
    gogConnect: number
    emailNotifications: number
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
    display_name?: true
    xp?: true
    level?: true
    credits?: true
    steamId?: true
    epicConnect?: true
    gogConnect?: true
    emailNotifications?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    supabase_uid?: true
    display_name?: true
    xp?: true
    level?: true
    credits?: true
    steamId?: true
    epicConnect?: true
    gogConnect?: true
    emailNotifications?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    supabase_uid?: true
    display_name?: true
    xp?: true
    level?: true
    credits?: true
    steamId?: true
    epicConnect?: true
    gogConnect?: true
    emailNotifications?: true
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
    display_name: string | null
    xp: number
    level: number
    credits: number
    steamId: string | null
    epicConnect: boolean | null
    gogConnect: boolean | null
    emailNotifications: boolean
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
    display_name?: boolean
    xp?: boolean
    level?: boolean
    credits?: boolean
    steamId?: boolean
    epicConnect?: boolean
    gogConnect?: boolean
    emailNotifications?: boolean
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    userGames?: boolean | User$userGamesArgs<ExtArgs>
    wishlist_deal_notifications?: boolean | User$wishlist_deal_notificationsArgs<ExtArgs>
    wishlistItems?: boolean | User$wishlistItemsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supabase_uid?: boolean
    display_name?: boolean
    xp?: boolean
    level?: boolean
    credits?: boolean
    steamId?: boolean
    epicConnect?: boolean
    gogConnect?: boolean
    emailNotifications?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supabase_uid?: boolean
    display_name?: boolean
    xp?: boolean
    level?: boolean
    credits?: boolean
    steamId?: boolean
    epicConnect?: boolean
    gogConnect?: boolean
    emailNotifications?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    supabase_uid?: boolean
    display_name?: boolean
    xp?: boolean
    level?: boolean
    credits?: boolean
    steamId?: boolean
    epicConnect?: boolean
    gogConnect?: boolean
    emailNotifications?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "supabase_uid" | "display_name" | "xp" | "level" | "credits" | "steamId" | "epicConnect" | "gogConnect" | "emailNotifications", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    userGames?: boolean | User$userGamesArgs<ExtArgs>
    wishlist_deal_notifications?: boolean | User$wishlist_deal_notificationsArgs<ExtArgs>
    wishlistItems?: boolean | User$wishlistItemsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      receivedMessages: Prisma.$MessagePayload<ExtArgs>[]
      sentMessages: Prisma.$MessagePayload<ExtArgs>[]
      userGames: Prisma.$UserGamePayload<ExtArgs>[]
      wishlist_deal_notifications: Prisma.$wishlist_deal_notificationsPayload<ExtArgs>[]
      wishlistItems: Prisma.$WishlistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      supabase_uid: string
      display_name: string | null
      xp: number
      level: number
      credits: number
      steamId: string | null
      epicConnect: boolean | null
      gogConnect: boolean | null
      emailNotifications: boolean
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
    receivedMessages<T extends User$receivedMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentMessages<T extends User$sentMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userGames<T extends User$userGamesArgs<ExtArgs> = {}>(args?: Subset<T, User$userGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wishlist_deal_notifications<T extends User$wishlist_deal_notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$wishlist_deal_notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly display_name: FieldRef<"User", 'String'>
    readonly xp: FieldRef<"User", 'Int'>
    readonly level: FieldRef<"User", 'Int'>
    readonly credits: FieldRef<"User", 'Int'>
    readonly steamId: FieldRef<"User", 'String'>
    readonly epicConnect: FieldRef<"User", 'Boolean'>
    readonly gogConnect: FieldRef<"User", 'Boolean'>
    readonly emailNotifications: FieldRef<"User", 'Boolean'>
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
   * User.receivedMessages
   */
  export type User$receivedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.sentMessages
   */
  export type User$sentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
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
   * User.wishlist_deal_notifications
   */
  export type User$wishlist_deal_notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    where?: wishlist_deal_notificationsWhereInput
    orderBy?: wishlist_deal_notificationsOrderByWithRelationInput | wishlist_deal_notificationsOrderByWithRelationInput[]
    cursor?: wishlist_deal_notificationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Wishlist_deal_notificationsScalarFieldEnum | Wishlist_deal_notificationsScalarFieldEnum[]
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
    igdbId: number | null
    totalRating: number | null
  }

  export type GameSumAggregateOutputType = {
    id: number | null
    igdbId: number | null
    totalRating: number | null
  }

  export type GameMinAggregateOutputType = {
    id: number | null
    igdbId: number | null
    name: string | null
    slug: string | null
    summary: string | null
    storyline: string | null
    firstReleaseDate: Date | null
    coverUrl: string | null
    totalRating: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastSyncedAt: Date | null
  }

  export type GameMaxAggregateOutputType = {
    id: number | null
    igdbId: number | null
    name: string | null
    slug: string | null
    summary: string | null
    storyline: string | null
    firstReleaseDate: Date | null
    coverUrl: string | null
    totalRating: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastSyncedAt: Date | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    igdbId: number
    name: number
    slug: number
    summary: number
    storyline: number
    firstReleaseDate: number
    coverUrl: number
    screenshots: number
    totalRating: number
    genres: number
    developers: number
    publishers: number
    websites: number
    createdAt: number
    updatedAt: number
    lastSyncedAt: number
    videos: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    id?: true
    igdbId?: true
    totalRating?: true
  }

  export type GameSumAggregateInputType = {
    id?: true
    igdbId?: true
    totalRating?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    igdbId?: true
    name?: true
    slug?: true
    summary?: true
    storyline?: true
    firstReleaseDate?: true
    coverUrl?: true
    totalRating?: true
    createdAt?: true
    updatedAt?: true
    lastSyncedAt?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    igdbId?: true
    name?: true
    slug?: true
    summary?: true
    storyline?: true
    firstReleaseDate?: true
    coverUrl?: true
    totalRating?: true
    createdAt?: true
    updatedAt?: true
    lastSyncedAt?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    igdbId?: true
    name?: true
    slug?: true
    summary?: true
    storyline?: true
    firstReleaseDate?: true
    coverUrl?: true
    screenshots?: true
    totalRating?: true
    genres?: true
    developers?: true
    publishers?: true
    websites?: true
    createdAt?: true
    updatedAt?: true
    lastSyncedAt?: true
    videos?: true
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
    igdbId: number | null
    name: string
    slug: string | null
    summary: string | null
    storyline: string | null
    firstReleaseDate: Date | null
    coverUrl: string | null
    screenshots: string[]
    totalRating: number | null
    genres: string[]
    developers: string[]
    publishers: string[]
    websites: JsonValue | null
    createdAt: Date
    updatedAt: Date
    lastSyncedAt: Date | null
    videos: string[]
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
    igdbId?: boolean
    name?: boolean
    slug?: boolean
    summary?: boolean
    storyline?: boolean
    firstReleaseDate?: boolean
    coverUrl?: boolean
    screenshots?: boolean
    totalRating?: boolean
    genres?: boolean
    developers?: boolean
    publishers?: boolean
    websites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncedAt?: boolean
    videos?: boolean
    deals?: boolean | Game$dealsArgs<ExtArgs>
    userGames?: boolean | Game$userGamesArgs<ExtArgs>
    wishlist_deal_notifications?: boolean | Game$wishlist_deal_notificationsArgs<ExtArgs>
    wishlistedBy?: boolean | Game$wishlistedByArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    igdbId?: boolean
    name?: boolean
    slug?: boolean
    summary?: boolean
    storyline?: boolean
    firstReleaseDate?: boolean
    coverUrl?: boolean
    screenshots?: boolean
    totalRating?: boolean
    genres?: boolean
    developers?: boolean
    publishers?: boolean
    websites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncedAt?: boolean
    videos?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    igdbId?: boolean
    name?: boolean
    slug?: boolean
    summary?: boolean
    storyline?: boolean
    firstReleaseDate?: boolean
    coverUrl?: boolean
    screenshots?: boolean
    totalRating?: boolean
    genres?: boolean
    developers?: boolean
    publishers?: boolean
    websites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncedAt?: boolean
    videos?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    igdbId?: boolean
    name?: boolean
    slug?: boolean
    summary?: boolean
    storyline?: boolean
    firstReleaseDate?: boolean
    coverUrl?: boolean
    screenshots?: boolean
    totalRating?: boolean
    genres?: boolean
    developers?: boolean
    publishers?: boolean
    websites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncedAt?: boolean
    videos?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "igdbId" | "name" | "slug" | "summary" | "storyline" | "firstReleaseDate" | "coverUrl" | "screenshots" | "totalRating" | "genres" | "developers" | "publishers" | "websites" | "createdAt" | "updatedAt" | "lastSyncedAt" | "videos", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deals?: boolean | Game$dealsArgs<ExtArgs>
    userGames?: boolean | Game$userGamesArgs<ExtArgs>
    wishlist_deal_notifications?: boolean | Game$wishlist_deal_notificationsArgs<ExtArgs>
    wishlistedBy?: boolean | Game$wishlistedByArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      deals: Prisma.$DealPayload<ExtArgs>[]
      userGames: Prisma.$UserGamePayload<ExtArgs>[]
      wishlist_deal_notifications: Prisma.$wishlist_deal_notificationsPayload<ExtArgs>[]
      wishlistedBy: Prisma.$WishlistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      igdbId: number | null
      name: string
      slug: string | null
      summary: string | null
      storyline: string | null
      firstReleaseDate: Date | null
      coverUrl: string | null
      screenshots: string[]
      totalRating: number | null
      genres: string[]
      developers: string[]
      publishers: string[]
      websites: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      lastSyncedAt: Date | null
      videos: string[]
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
    userGames<T extends Game$userGamesArgs<ExtArgs> = {}>(args?: Subset<T, Game$userGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wishlist_deal_notifications<T extends Game$wishlist_deal_notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Game$wishlist_deal_notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly igdbId: FieldRef<"Game", 'Int'>
    readonly name: FieldRef<"Game", 'String'>
    readonly slug: FieldRef<"Game", 'String'>
    readonly summary: FieldRef<"Game", 'String'>
    readonly storyline: FieldRef<"Game", 'String'>
    readonly firstReleaseDate: FieldRef<"Game", 'DateTime'>
    readonly coverUrl: FieldRef<"Game", 'String'>
    readonly screenshots: FieldRef<"Game", 'String[]'>
    readonly totalRating: FieldRef<"Game", 'Float'>
    readonly genres: FieldRef<"Game", 'String[]'>
    readonly developers: FieldRef<"Game", 'String[]'>
    readonly publishers: FieldRef<"Game", 'String[]'>
    readonly websites: FieldRef<"Game", 'Json'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
    readonly updatedAt: FieldRef<"Game", 'DateTime'>
    readonly lastSyncedAt: FieldRef<"Game", 'DateTime'>
    readonly videos: FieldRef<"Game", 'String[]'>
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
   * Game.wishlist_deal_notifications
   */
  export type Game$wishlist_deal_notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    where?: wishlist_deal_notificationsWhereInput
    orderBy?: wishlist_deal_notificationsOrderByWithRelationInput | wishlist_deal_notificationsOrderByWithRelationInput[]
    cursor?: wishlist_deal_notificationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Wishlist_deal_notificationsScalarFieldEnum | Wishlist_deal_notificationsScalarFieldEnum[]
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

  export type $PlatformPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Platform"
    objects: {}
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
    platformDRMs: number | null
  }

  export type UserGameSumAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    playtimeMinutes: number | null
    platformDRMs: number[]
  }

  export type UserGameMinAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    addedAt: Date | null
    playtimeMinutes: number | null
    lastPlayed: Date | null
    isInstalled: boolean | null
    isFavorite: boolean | null
    notes: string | null
  }

  export type UserGameMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    addedAt: Date | null
    playtimeMinutes: number | null
    lastPlayed: Date | null
    isInstalled: boolean | null
    isFavorite: boolean | null
    notes: string | null
  }

  export type UserGameCountAggregateOutputType = {
    id: number
    userId: number
    gameId: number
    addedAt: number
    playtimeMinutes: number
    lastPlayed: number
    isInstalled: number
    isFavorite: number
    notes: number
    platformDRMs: number
    _all: number
  }


  export type UserGameAvgAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    playtimeMinutes?: true
    platformDRMs?: true
  }

  export type UserGameSumAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    playtimeMinutes?: true
    platformDRMs?: true
  }

  export type UserGameMinAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    addedAt?: true
    playtimeMinutes?: true
    lastPlayed?: true
    isInstalled?: true
    isFavorite?: true
    notes?: true
  }

  export type UserGameMaxAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    addedAt?: true
    playtimeMinutes?: true
    lastPlayed?: true
    isInstalled?: true
    isFavorite?: true
    notes?: true
  }

  export type UserGameCountAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    addedAt?: true
    playtimeMinutes?: true
    lastPlayed?: true
    isInstalled?: true
    isFavorite?: true
    notes?: true
    platformDRMs?: true
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
    isFavorite: boolean
    notes: string | null
    platformDRMs: number[]
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
    isFavorite?: boolean
    notes?: boolean
    platformDRMs?: boolean
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
    isFavorite?: boolean
    notes?: boolean
    platformDRMs?: boolean
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
    isFavorite?: boolean
    notes?: boolean
    platformDRMs?: boolean
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
    isFavorite?: boolean
    notes?: boolean
    platformDRMs?: boolean
  }

  export type UserGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "gameId" | "addedAt" | "playtimeMinutes" | "lastPlayed" | "isInstalled" | "isFavorite" | "notes" | "platformDRMs", ExtArgs["result"]["userGame"]>
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
      isFavorite: boolean
      notes: string | null
      platformDRMs: number[]
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
    readonly isFavorite: FieldRef<"UserGame", 'Boolean'>
    readonly notes: FieldRef<"UserGame", 'String'>
    readonly platformDRMs: FieldRef<"UserGame", 'Int[]'>
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
    price: number | null
    discountPercent: number | null
    originalPrice: number | null
    rating: number | null
  }

  export type DealSumAggregateOutputType = {
    id: number | null
    gameId: number | null
    price: number | null
    discountPercent: number | null
    originalPrice: number | null
    rating: number | null
  }

  export type DealMinAggregateOutputType = {
    id: number | null
    gameId: number | null
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
    externalId: string | null
    source: string | null
    thumb: string | null
    rating: number | null
  }

  export type DealMaxAggregateOutputType = {
    id: number | null
    gameId: number | null
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
    externalId: string | null
    source: string | null
    thumb: string | null
    rating: number | null
  }

  export type DealCountAggregateOutputType = {
    id: number
    gameId: number
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
    externalId: number
    source: number
    thumb: number
    rating: number
    _all: number
  }


  export type DealAvgAggregateInputType = {
    id?: true
    gameId?: true
    price?: true
    discountPercent?: true
    originalPrice?: true
    rating?: true
  }

  export type DealSumAggregateInputType = {
    id?: true
    gameId?: true
    price?: true
    discountPercent?: true
    originalPrice?: true
    rating?: true
  }

  export type DealMinAggregateInputType = {
    id?: true
    gameId?: true
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
    externalId?: true
    source?: true
    thumb?: true
    rating?: true
  }

  export type DealMaxAggregateInputType = {
    id?: true
    gameId?: true
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
    externalId?: true
    source?: true
    thumb?: true
    rating?: true
  }

  export type DealCountAggregateInputType = {
    id?: true
    gameId?: true
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
    externalId?: true
    source?: true
    thumb?: true
    rating?: true
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
    gameId: number | null
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
    externalId: string | null
    source: string | null
    thumb: string | null
    rating: number | null
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
    externalId?: boolean
    source?: boolean
    thumb?: boolean
    rating?: boolean
    game?: boolean | Deal$gameArgs<ExtArgs>
    wishlist_deal_notifications?: boolean | Deal$wishlist_deal_notificationsArgs<ExtArgs>
    _count?: boolean | DealCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
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
    externalId?: boolean
    source?: boolean
    thumb?: boolean
    rating?: boolean
    game?: boolean | Deal$gameArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
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
    externalId?: boolean
    source?: boolean
    thumb?: boolean
    rating?: boolean
    game?: boolean | Deal$gameArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectScalar = {
    id?: boolean
    gameId?: boolean
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
    externalId?: boolean
    source?: boolean
    thumb?: boolean
    rating?: boolean
  }

  export type DealOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "title" | "storeName" | "price" | "discountPercent" | "originalPrice" | "url" | "validFrom" | "validUntil" | "isFreebie" | "discoveredAt" | "updatedAt" | "externalId" | "source" | "thumb" | "rating", ExtArgs["result"]["deal"]>
  export type DealInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | Deal$gameArgs<ExtArgs>
    wishlist_deal_notifications?: boolean | Deal$wishlist_deal_notificationsArgs<ExtArgs>
    _count?: boolean | DealCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DealIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | Deal$gameArgs<ExtArgs>
  }
  export type DealIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | Deal$gameArgs<ExtArgs>
  }

  export type $DealPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Deal"
    objects: {
      game: Prisma.$GamePayload<ExtArgs> | null
      wishlist_deal_notifications: Prisma.$wishlist_deal_notificationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      gameId: number | null
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
      externalId: string | null
      source: string | null
      thumb: string | null
      rating: number | null
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
    game<T extends Deal$gameArgs<ExtArgs> = {}>(args?: Subset<T, Deal$gameArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    wishlist_deal_notifications<T extends Deal$wishlist_deal_notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Deal$wishlist_deal_notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly externalId: FieldRef<"Deal", 'String'>
    readonly source: FieldRef<"Deal", 'String'>
    readonly thumb: FieldRef<"Deal", 'String'>
    readonly rating: FieldRef<"Deal", 'Float'>
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
   * Deal.game
   */
  export type Deal$gameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: GameWhereInput
  }

  /**
   * Deal.wishlist_deal_notifications
   */
  export type Deal$wishlist_deal_notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    where?: wishlist_deal_notificationsWhereInput
    orderBy?: wishlist_deal_notificationsOrderByWithRelationInput | wishlist_deal_notificationsOrderByWithRelationInput[]
    cursor?: wishlist_deal_notificationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Wishlist_deal_notificationsScalarFieldEnum | Wishlist_deal_notificationsScalarFieldEnum[]
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
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
  }

  export type MessageSumAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
    text: string | null
    media: string | null
    createdAt: Date | null
    isRead: boolean | null
  }

  export type MessageMaxAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
    text: string | null
    media: string | null
    createdAt: Date | null
    isRead: boolean | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    senderId: number
    receiverId: number
    text: number
    media: number
    createdAt: number
    isRead: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
  }

  export type MessageSumAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    text?: true
    media?: true
    createdAt?: true
    isRead?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    text?: true
    media?: true
    createdAt?: true
    isRead?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    text?: true
    media?: true
    createdAt?: true
    isRead?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: number
    senderId: number | null
    receiverId: number
    text: string
    media: string | null
    createdAt: Date
    isRead: boolean
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    text?: boolean
    media?: boolean
    createdAt?: boolean
    isRead?: boolean
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    sender?: boolean | Message$senderArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    text?: boolean
    media?: boolean
    createdAt?: boolean
    isRead?: boolean
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    sender?: boolean | Message$senderArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    text?: boolean
    media?: boolean
    createdAt?: boolean
    isRead?: boolean
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    sender?: boolean | Message$senderArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    text?: boolean
    media?: boolean
    createdAt?: boolean
    isRead?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "senderId" | "receiverId" | "text" | "media" | "createdAt" | "isRead", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    sender?: boolean | Message$senderArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    sender?: boolean | Message$senderArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    sender?: boolean | Message$senderArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      receiver: Prisma.$UserPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      senderId: number | null
      receiverId: number
      text: string
      media: string | null
      createdAt: Date
      isRead: boolean
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
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
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
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
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends Message$senderArgs<ExtArgs> = {}>(args?: Subset<T, Message$senderArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'Int'>
    readonly senderId: FieldRef<"Message", 'Int'>
    readonly receiverId: FieldRef<"Message", 'Int'>
    readonly text: FieldRef<"Message", 'String'>
    readonly media: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly isRead: FieldRef<"Message", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message.sender
   */
  export type Message$senderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model wishlist_deal_notifications
   */

  export type AggregateWishlist_deal_notifications = {
    _count: Wishlist_deal_notificationsCountAggregateOutputType | null
    _avg: Wishlist_deal_notificationsAvgAggregateOutputType | null
    _sum: Wishlist_deal_notificationsSumAggregateOutputType | null
    _min: Wishlist_deal_notificationsMinAggregateOutputType | null
    _max: Wishlist_deal_notificationsMaxAggregateOutputType | null
  }

  export type Wishlist_deal_notificationsAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    dealId: number | null
  }

  export type Wishlist_deal_notificationsSumAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    dealId: number | null
  }

  export type Wishlist_deal_notificationsMinAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    dealId: number | null
    notificationSent: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Wishlist_deal_notificationsMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    dealId: number | null
    notificationSent: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Wishlist_deal_notificationsCountAggregateOutputType = {
    id: number
    userId: number
    gameId: number
    dealId: number
    notificationSent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Wishlist_deal_notificationsAvgAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    dealId?: true
  }

  export type Wishlist_deal_notificationsSumAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    dealId?: true
  }

  export type Wishlist_deal_notificationsMinAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    dealId?: true
    notificationSent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Wishlist_deal_notificationsMaxAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    dealId?: true
    notificationSent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Wishlist_deal_notificationsCountAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    dealId?: true
    notificationSent?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Wishlist_deal_notificationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which wishlist_deal_notifications to aggregate.
     */
    where?: wishlist_deal_notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wishlist_deal_notifications to fetch.
     */
    orderBy?: wishlist_deal_notificationsOrderByWithRelationInput | wishlist_deal_notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: wishlist_deal_notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wishlist_deal_notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wishlist_deal_notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned wishlist_deal_notifications
    **/
    _count?: true | Wishlist_deal_notificationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Wishlist_deal_notificationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Wishlist_deal_notificationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Wishlist_deal_notificationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Wishlist_deal_notificationsMaxAggregateInputType
  }

  export type GetWishlist_deal_notificationsAggregateType<T extends Wishlist_deal_notificationsAggregateArgs> = {
        [P in keyof T & keyof AggregateWishlist_deal_notifications]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWishlist_deal_notifications[P]>
      : GetScalarType<T[P], AggregateWishlist_deal_notifications[P]>
  }




  export type wishlist_deal_notificationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: wishlist_deal_notificationsWhereInput
    orderBy?: wishlist_deal_notificationsOrderByWithAggregationInput | wishlist_deal_notificationsOrderByWithAggregationInput[]
    by: Wishlist_deal_notificationsScalarFieldEnum[] | Wishlist_deal_notificationsScalarFieldEnum
    having?: wishlist_deal_notificationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Wishlist_deal_notificationsCountAggregateInputType | true
    _avg?: Wishlist_deal_notificationsAvgAggregateInputType
    _sum?: Wishlist_deal_notificationsSumAggregateInputType
    _min?: Wishlist_deal_notificationsMinAggregateInputType
    _max?: Wishlist_deal_notificationsMaxAggregateInputType
  }

  export type Wishlist_deal_notificationsGroupByOutputType = {
    id: number
    userId: number
    gameId: number
    dealId: number
    notificationSent: boolean
    createdAt: Date
    updatedAt: Date
    _count: Wishlist_deal_notificationsCountAggregateOutputType | null
    _avg: Wishlist_deal_notificationsAvgAggregateOutputType | null
    _sum: Wishlist_deal_notificationsSumAggregateOutputType | null
    _min: Wishlist_deal_notificationsMinAggregateOutputType | null
    _max: Wishlist_deal_notificationsMaxAggregateOutputType | null
  }

  type GetWishlist_deal_notificationsGroupByPayload<T extends wishlist_deal_notificationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Wishlist_deal_notificationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Wishlist_deal_notificationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Wishlist_deal_notificationsGroupByOutputType[P]>
            : GetScalarType<T[P], Wishlist_deal_notificationsGroupByOutputType[P]>
        }
      >
    >


  export type wishlist_deal_notificationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    dealId?: boolean
    notificationSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deals?: boolean | DealDefaultArgs<ExtArgs>
    games?: boolean | GameDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishlist_deal_notifications"]>

  export type wishlist_deal_notificationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    dealId?: boolean
    notificationSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deals?: boolean | DealDefaultArgs<ExtArgs>
    games?: boolean | GameDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishlist_deal_notifications"]>

  export type wishlist_deal_notificationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    dealId?: boolean
    notificationSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deals?: boolean | DealDefaultArgs<ExtArgs>
    games?: boolean | GameDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishlist_deal_notifications"]>

  export type wishlist_deal_notificationsSelectScalar = {
    id?: boolean
    userId?: boolean
    gameId?: boolean
    dealId?: boolean
    notificationSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type wishlist_deal_notificationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "gameId" | "dealId" | "notificationSent" | "createdAt" | "updatedAt", ExtArgs["result"]["wishlist_deal_notifications"]>
  export type wishlist_deal_notificationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deals?: boolean | DealDefaultArgs<ExtArgs>
    games?: boolean | GameDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type wishlist_deal_notificationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deals?: boolean | DealDefaultArgs<ExtArgs>
    games?: boolean | GameDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type wishlist_deal_notificationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deals?: boolean | DealDefaultArgs<ExtArgs>
    games?: boolean | GameDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $wishlist_deal_notificationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "wishlist_deal_notifications"
    objects: {
      deals: Prisma.$DealPayload<ExtArgs>
      games: Prisma.$GamePayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      gameId: number
      dealId: number
      notificationSent: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wishlist_deal_notifications"]>
    composites: {}
  }

  type wishlist_deal_notificationsGetPayload<S extends boolean | null | undefined | wishlist_deal_notificationsDefaultArgs> = $Result.GetResult<Prisma.$wishlist_deal_notificationsPayload, S>

  type wishlist_deal_notificationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<wishlist_deal_notificationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Wishlist_deal_notificationsCountAggregateInputType | true
    }

  export interface wishlist_deal_notificationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['wishlist_deal_notifications'], meta: { name: 'wishlist_deal_notifications' } }
    /**
     * Find zero or one Wishlist_deal_notifications that matches the filter.
     * @param {wishlist_deal_notificationsFindUniqueArgs} args - Arguments to find a Wishlist_deal_notifications
     * @example
     * // Get one Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends wishlist_deal_notificationsFindUniqueArgs>(args: SelectSubset<T, wishlist_deal_notificationsFindUniqueArgs<ExtArgs>>): Prisma__wishlist_deal_notificationsClient<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wishlist_deal_notifications that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {wishlist_deal_notificationsFindUniqueOrThrowArgs} args - Arguments to find a Wishlist_deal_notifications
     * @example
     * // Get one Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends wishlist_deal_notificationsFindUniqueOrThrowArgs>(args: SelectSubset<T, wishlist_deal_notificationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__wishlist_deal_notificationsClient<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wishlist_deal_notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wishlist_deal_notificationsFindFirstArgs} args - Arguments to find a Wishlist_deal_notifications
     * @example
     * // Get one Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends wishlist_deal_notificationsFindFirstArgs>(args?: SelectSubset<T, wishlist_deal_notificationsFindFirstArgs<ExtArgs>>): Prisma__wishlist_deal_notificationsClient<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wishlist_deal_notifications that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wishlist_deal_notificationsFindFirstOrThrowArgs} args - Arguments to find a Wishlist_deal_notifications
     * @example
     * // Get one Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends wishlist_deal_notificationsFindFirstOrThrowArgs>(args?: SelectSubset<T, wishlist_deal_notificationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__wishlist_deal_notificationsClient<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wishlist_deal_notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wishlist_deal_notificationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.findMany()
     * 
     * // Get first 10 Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wishlist_deal_notificationsWithIdOnly = await prisma.wishlist_deal_notifications.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends wishlist_deal_notificationsFindManyArgs>(args?: SelectSubset<T, wishlist_deal_notificationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wishlist_deal_notifications.
     * @param {wishlist_deal_notificationsCreateArgs} args - Arguments to create a Wishlist_deal_notifications.
     * @example
     * // Create one Wishlist_deal_notifications
     * const Wishlist_deal_notifications = await prisma.wishlist_deal_notifications.create({
     *   data: {
     *     // ... data to create a Wishlist_deal_notifications
     *   }
     * })
     * 
     */
    create<T extends wishlist_deal_notificationsCreateArgs>(args: SelectSubset<T, wishlist_deal_notificationsCreateArgs<ExtArgs>>): Prisma__wishlist_deal_notificationsClient<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wishlist_deal_notifications.
     * @param {wishlist_deal_notificationsCreateManyArgs} args - Arguments to create many Wishlist_deal_notifications.
     * @example
     * // Create many Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends wishlist_deal_notificationsCreateManyArgs>(args?: SelectSubset<T, wishlist_deal_notificationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wishlist_deal_notifications and returns the data saved in the database.
     * @param {wishlist_deal_notificationsCreateManyAndReturnArgs} args - Arguments to create many Wishlist_deal_notifications.
     * @example
     * // Create many Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wishlist_deal_notifications and only return the `id`
     * const wishlist_deal_notificationsWithIdOnly = await prisma.wishlist_deal_notifications.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends wishlist_deal_notificationsCreateManyAndReturnArgs>(args?: SelectSubset<T, wishlist_deal_notificationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wishlist_deal_notifications.
     * @param {wishlist_deal_notificationsDeleteArgs} args - Arguments to delete one Wishlist_deal_notifications.
     * @example
     * // Delete one Wishlist_deal_notifications
     * const Wishlist_deal_notifications = await prisma.wishlist_deal_notifications.delete({
     *   where: {
     *     // ... filter to delete one Wishlist_deal_notifications
     *   }
     * })
     * 
     */
    delete<T extends wishlist_deal_notificationsDeleteArgs>(args: SelectSubset<T, wishlist_deal_notificationsDeleteArgs<ExtArgs>>): Prisma__wishlist_deal_notificationsClient<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wishlist_deal_notifications.
     * @param {wishlist_deal_notificationsUpdateArgs} args - Arguments to update one Wishlist_deal_notifications.
     * @example
     * // Update one Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends wishlist_deal_notificationsUpdateArgs>(args: SelectSubset<T, wishlist_deal_notificationsUpdateArgs<ExtArgs>>): Prisma__wishlist_deal_notificationsClient<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wishlist_deal_notifications.
     * @param {wishlist_deal_notificationsDeleteManyArgs} args - Arguments to filter Wishlist_deal_notifications to delete.
     * @example
     * // Delete a few Wishlist_deal_notifications
     * const { count } = await prisma.wishlist_deal_notifications.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends wishlist_deal_notificationsDeleteManyArgs>(args?: SelectSubset<T, wishlist_deal_notificationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wishlist_deal_notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wishlist_deal_notificationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends wishlist_deal_notificationsUpdateManyArgs>(args: SelectSubset<T, wishlist_deal_notificationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wishlist_deal_notifications and returns the data updated in the database.
     * @param {wishlist_deal_notificationsUpdateManyAndReturnArgs} args - Arguments to update many Wishlist_deal_notifications.
     * @example
     * // Update many Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wishlist_deal_notifications and only return the `id`
     * const wishlist_deal_notificationsWithIdOnly = await prisma.wishlist_deal_notifications.updateManyAndReturn({
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
    updateManyAndReturn<T extends wishlist_deal_notificationsUpdateManyAndReturnArgs>(args: SelectSubset<T, wishlist_deal_notificationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wishlist_deal_notifications.
     * @param {wishlist_deal_notificationsUpsertArgs} args - Arguments to update or create a Wishlist_deal_notifications.
     * @example
     * // Update or create a Wishlist_deal_notifications
     * const wishlist_deal_notifications = await prisma.wishlist_deal_notifications.upsert({
     *   create: {
     *     // ... data to create a Wishlist_deal_notifications
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wishlist_deal_notifications we want to update
     *   }
     * })
     */
    upsert<T extends wishlist_deal_notificationsUpsertArgs>(args: SelectSubset<T, wishlist_deal_notificationsUpsertArgs<ExtArgs>>): Prisma__wishlist_deal_notificationsClient<$Result.GetResult<Prisma.$wishlist_deal_notificationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wishlist_deal_notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wishlist_deal_notificationsCountArgs} args - Arguments to filter Wishlist_deal_notifications to count.
     * @example
     * // Count the number of Wishlist_deal_notifications
     * const count = await prisma.wishlist_deal_notifications.count({
     *   where: {
     *     // ... the filter for the Wishlist_deal_notifications we want to count
     *   }
     * })
    **/
    count<T extends wishlist_deal_notificationsCountArgs>(
      args?: Subset<T, wishlist_deal_notificationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Wishlist_deal_notificationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wishlist_deal_notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Wishlist_deal_notificationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Wishlist_deal_notificationsAggregateArgs>(args: Subset<T, Wishlist_deal_notificationsAggregateArgs>): Prisma.PrismaPromise<GetWishlist_deal_notificationsAggregateType<T>>

    /**
     * Group by Wishlist_deal_notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wishlist_deal_notificationsGroupByArgs} args - Group by arguments.
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
      T extends wishlist_deal_notificationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: wishlist_deal_notificationsGroupByArgs['orderBy'] }
        : { orderBy?: wishlist_deal_notificationsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, wishlist_deal_notificationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWishlist_deal_notificationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the wishlist_deal_notifications model
   */
  readonly fields: wishlist_deal_notificationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for wishlist_deal_notifications.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__wishlist_deal_notificationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deals<T extends DealDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DealDefaultArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    games<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the wishlist_deal_notifications model
   */
  interface wishlist_deal_notificationsFieldRefs {
    readonly id: FieldRef<"wishlist_deal_notifications", 'Int'>
    readonly userId: FieldRef<"wishlist_deal_notifications", 'Int'>
    readonly gameId: FieldRef<"wishlist_deal_notifications", 'Int'>
    readonly dealId: FieldRef<"wishlist_deal_notifications", 'Int'>
    readonly notificationSent: FieldRef<"wishlist_deal_notifications", 'Boolean'>
    readonly createdAt: FieldRef<"wishlist_deal_notifications", 'DateTime'>
    readonly updatedAt: FieldRef<"wishlist_deal_notifications", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * wishlist_deal_notifications findUnique
   */
  export type wishlist_deal_notificationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    /**
     * Filter, which wishlist_deal_notifications to fetch.
     */
    where: wishlist_deal_notificationsWhereUniqueInput
  }

  /**
   * wishlist_deal_notifications findUniqueOrThrow
   */
  export type wishlist_deal_notificationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    /**
     * Filter, which wishlist_deal_notifications to fetch.
     */
    where: wishlist_deal_notificationsWhereUniqueInput
  }

  /**
   * wishlist_deal_notifications findFirst
   */
  export type wishlist_deal_notificationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    /**
     * Filter, which wishlist_deal_notifications to fetch.
     */
    where?: wishlist_deal_notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wishlist_deal_notifications to fetch.
     */
    orderBy?: wishlist_deal_notificationsOrderByWithRelationInput | wishlist_deal_notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for wishlist_deal_notifications.
     */
    cursor?: wishlist_deal_notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wishlist_deal_notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wishlist_deal_notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of wishlist_deal_notifications.
     */
    distinct?: Wishlist_deal_notificationsScalarFieldEnum | Wishlist_deal_notificationsScalarFieldEnum[]
  }

  /**
   * wishlist_deal_notifications findFirstOrThrow
   */
  export type wishlist_deal_notificationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    /**
     * Filter, which wishlist_deal_notifications to fetch.
     */
    where?: wishlist_deal_notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wishlist_deal_notifications to fetch.
     */
    orderBy?: wishlist_deal_notificationsOrderByWithRelationInput | wishlist_deal_notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for wishlist_deal_notifications.
     */
    cursor?: wishlist_deal_notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wishlist_deal_notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wishlist_deal_notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of wishlist_deal_notifications.
     */
    distinct?: Wishlist_deal_notificationsScalarFieldEnum | Wishlist_deal_notificationsScalarFieldEnum[]
  }

  /**
   * wishlist_deal_notifications findMany
   */
  export type wishlist_deal_notificationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    /**
     * Filter, which wishlist_deal_notifications to fetch.
     */
    where?: wishlist_deal_notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wishlist_deal_notifications to fetch.
     */
    orderBy?: wishlist_deal_notificationsOrderByWithRelationInput | wishlist_deal_notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing wishlist_deal_notifications.
     */
    cursor?: wishlist_deal_notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wishlist_deal_notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wishlist_deal_notifications.
     */
    skip?: number
    distinct?: Wishlist_deal_notificationsScalarFieldEnum | Wishlist_deal_notificationsScalarFieldEnum[]
  }

  /**
   * wishlist_deal_notifications create
   */
  export type wishlist_deal_notificationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    /**
     * The data needed to create a wishlist_deal_notifications.
     */
    data: XOR<wishlist_deal_notificationsCreateInput, wishlist_deal_notificationsUncheckedCreateInput>
  }

  /**
   * wishlist_deal_notifications createMany
   */
  export type wishlist_deal_notificationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many wishlist_deal_notifications.
     */
    data: wishlist_deal_notificationsCreateManyInput | wishlist_deal_notificationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * wishlist_deal_notifications createManyAndReturn
   */
  export type wishlist_deal_notificationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * The data used to create many wishlist_deal_notifications.
     */
    data: wishlist_deal_notificationsCreateManyInput | wishlist_deal_notificationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * wishlist_deal_notifications update
   */
  export type wishlist_deal_notificationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    /**
     * The data needed to update a wishlist_deal_notifications.
     */
    data: XOR<wishlist_deal_notificationsUpdateInput, wishlist_deal_notificationsUncheckedUpdateInput>
    /**
     * Choose, which wishlist_deal_notifications to update.
     */
    where: wishlist_deal_notificationsWhereUniqueInput
  }

  /**
   * wishlist_deal_notifications updateMany
   */
  export type wishlist_deal_notificationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update wishlist_deal_notifications.
     */
    data: XOR<wishlist_deal_notificationsUpdateManyMutationInput, wishlist_deal_notificationsUncheckedUpdateManyInput>
    /**
     * Filter which wishlist_deal_notifications to update
     */
    where?: wishlist_deal_notificationsWhereInput
    /**
     * Limit how many wishlist_deal_notifications to update.
     */
    limit?: number
  }

  /**
   * wishlist_deal_notifications updateManyAndReturn
   */
  export type wishlist_deal_notificationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * The data used to update wishlist_deal_notifications.
     */
    data: XOR<wishlist_deal_notificationsUpdateManyMutationInput, wishlist_deal_notificationsUncheckedUpdateManyInput>
    /**
     * Filter which wishlist_deal_notifications to update
     */
    where?: wishlist_deal_notificationsWhereInput
    /**
     * Limit how many wishlist_deal_notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * wishlist_deal_notifications upsert
   */
  export type wishlist_deal_notificationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    /**
     * The filter to search for the wishlist_deal_notifications to update in case it exists.
     */
    where: wishlist_deal_notificationsWhereUniqueInput
    /**
     * In case the wishlist_deal_notifications found by the `where` argument doesn't exist, create a new wishlist_deal_notifications with this data.
     */
    create: XOR<wishlist_deal_notificationsCreateInput, wishlist_deal_notificationsUncheckedCreateInput>
    /**
     * In case the wishlist_deal_notifications was found with the provided `where` argument, update it with this data.
     */
    update: XOR<wishlist_deal_notificationsUpdateInput, wishlist_deal_notificationsUncheckedUpdateInput>
  }

  /**
   * wishlist_deal_notifications delete
   */
  export type wishlist_deal_notificationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
    /**
     * Filter which wishlist_deal_notifications to delete.
     */
    where: wishlist_deal_notificationsWhereUniqueInput
  }

  /**
   * wishlist_deal_notifications deleteMany
   */
  export type wishlist_deal_notificationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which wishlist_deal_notifications to delete
     */
    where?: wishlist_deal_notificationsWhereInput
    /**
     * Limit how many wishlist_deal_notifications to delete.
     */
    limit?: number
  }

  /**
   * wishlist_deal_notifications without action
   */
  export type wishlist_deal_notificationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wishlist_deal_notifications
     */
    select?: wishlist_deal_notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wishlist_deal_notifications
     */
    omit?: wishlist_deal_notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wishlist_deal_notificationsInclude<ExtArgs> | null
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
    display_name: 'display_name',
    xp: 'xp',
    level: 'level',
    credits: 'credits',
    steamId: 'steamId',
    epicConnect: 'epicConnect',
    gogConnect: 'gogConnect',
    emailNotifications: 'emailNotifications'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    igdbId: 'igdbId',
    name: 'name',
    slug: 'slug',
    summary: 'summary',
    storyline: 'storyline',
    firstReleaseDate: 'firstReleaseDate',
    coverUrl: 'coverUrl',
    screenshots: 'screenshots',
    totalRating: 'totalRating',
    genres: 'genres',
    developers: 'developers',
    publishers: 'publishers',
    websites: 'websites',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastSyncedAt: 'lastSyncedAt',
    videos: 'videos'
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


  export const UserGameScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    gameId: 'gameId',
    addedAt: 'addedAt',
    playtimeMinutes: 'playtimeMinutes',
    lastPlayed: 'lastPlayed',
    isInstalled: 'isInstalled',
    isFavorite: 'isFavorite',
    notes: 'notes',
    platformDRMs: 'platformDRMs'
  };

  export type UserGameScalarFieldEnum = (typeof UserGameScalarFieldEnum)[keyof typeof UserGameScalarFieldEnum]


  export const DealScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
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
    updatedAt: 'updatedAt',
    externalId: 'externalId',
    source: 'source',
    thumb: 'thumb',
    rating: 'rating'
  };

  export type DealScalarFieldEnum = (typeof DealScalarFieldEnum)[keyof typeof DealScalarFieldEnum]


  export const WishlistScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    gameId: 'gameId',
    addedAt: 'addedAt'
  };

  export type WishlistScalarFieldEnum = (typeof WishlistScalarFieldEnum)[keyof typeof WishlistScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    receiverId: 'receiverId',
    text: 'text',
    media: 'media',
    createdAt: 'createdAt',
    isRead: 'isRead'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const Wishlist_deal_notificationsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    gameId: 'gameId',
    dealId: 'dealId',
    notificationSent: 'notificationSent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Wishlist_deal_notificationsScalarFieldEnum = (typeof Wishlist_deal_notificationsScalarFieldEnum)[keyof typeof Wishlist_deal_notificationsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    supabase_uid?: StringFilter<"User"> | string
    display_name?: StringNullableFilter<"User"> | string | null
    xp?: IntFilter<"User"> | number
    level?: IntFilter<"User"> | number
    credits?: IntFilter<"User"> | number
    steamId?: StringNullableFilter<"User"> | string | null
    epicConnect?: BoolNullableFilter<"User"> | boolean | null
    gogConnect?: BoolNullableFilter<"User"> | boolean | null
    emailNotifications?: BoolFilter<"User"> | boolean
    receivedMessages?: MessageListRelationFilter
    sentMessages?: MessageListRelationFilter
    userGames?: UserGameListRelationFilter
    wishlist_deal_notifications?: Wishlist_deal_notificationsListRelationFilter
    wishlistItems?: WishlistListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    supabase_uid?: SortOrder
    display_name?: SortOrderInput | SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
    steamId?: SortOrderInput | SortOrder
    epicConnect?: SortOrderInput | SortOrder
    gogConnect?: SortOrderInput | SortOrder
    emailNotifications?: SortOrder
    receivedMessages?: MessageOrderByRelationAggregateInput
    sentMessages?: MessageOrderByRelationAggregateInput
    userGames?: UserGameOrderByRelationAggregateInput
    wishlist_deal_notifications?: wishlist_deal_notificationsOrderByRelationAggregateInput
    wishlistItems?: WishlistOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    supabase_uid?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    display_name?: StringNullableFilter<"User"> | string | null
    xp?: IntFilter<"User"> | number
    level?: IntFilter<"User"> | number
    credits?: IntFilter<"User"> | number
    steamId?: StringNullableFilter<"User"> | string | null
    epicConnect?: BoolNullableFilter<"User"> | boolean | null
    gogConnect?: BoolNullableFilter<"User"> | boolean | null
    emailNotifications?: BoolFilter<"User"> | boolean
    receivedMessages?: MessageListRelationFilter
    sentMessages?: MessageListRelationFilter
    userGames?: UserGameListRelationFilter
    wishlist_deal_notifications?: Wishlist_deal_notificationsListRelationFilter
    wishlistItems?: WishlistListRelationFilter
  }, "id" | "supabase_uid">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    supabase_uid?: SortOrder
    display_name?: SortOrderInput | SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
    steamId?: SortOrderInput | SortOrder
    epicConnect?: SortOrderInput | SortOrder
    gogConnect?: SortOrderInput | SortOrder
    emailNotifications?: SortOrder
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
    display_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    xp?: IntWithAggregatesFilter<"User"> | number
    level?: IntWithAggregatesFilter<"User"> | number
    credits?: IntWithAggregatesFilter<"User"> | number
    steamId?: StringNullableWithAggregatesFilter<"User"> | string | null
    epicConnect?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    gogConnect?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    emailNotifications?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: IntFilter<"Game"> | number
    igdbId?: IntNullableFilter<"Game"> | number | null
    name?: StringFilter<"Game"> | string
    slug?: StringNullableFilter<"Game"> | string | null
    summary?: StringNullableFilter<"Game"> | string | null
    storyline?: StringNullableFilter<"Game"> | string | null
    firstReleaseDate?: DateTimeNullableFilter<"Game"> | Date | string | null
    coverUrl?: StringNullableFilter<"Game"> | string | null
    screenshots?: StringNullableListFilter<"Game">
    totalRating?: FloatNullableFilter<"Game"> | number | null
    genres?: StringNullableListFilter<"Game">
    developers?: StringNullableListFilter<"Game">
    publishers?: StringNullableListFilter<"Game">
    websites?: JsonNullableFilter<"Game">
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    lastSyncedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    videos?: StringNullableListFilter<"Game">
    deals?: DealListRelationFilter
    userGames?: UserGameListRelationFilter
    wishlist_deal_notifications?: Wishlist_deal_notificationsListRelationFilter
    wishlistedBy?: WishlistListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    igdbId?: SortOrderInput | SortOrder
    name?: SortOrder
    slug?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    storyline?: SortOrderInput | SortOrder
    firstReleaseDate?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    screenshots?: SortOrder
    totalRating?: SortOrderInput | SortOrder
    genres?: SortOrder
    developers?: SortOrder
    publishers?: SortOrder
    websites?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    videos?: SortOrder
    deals?: DealOrderByRelationAggregateInput
    userGames?: UserGameOrderByRelationAggregateInput
    wishlist_deal_notifications?: wishlist_deal_notificationsOrderByRelationAggregateInput
    wishlistedBy?: WishlistOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    igdbId?: number
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    name?: StringFilter<"Game"> | string
    slug?: StringNullableFilter<"Game"> | string | null
    summary?: StringNullableFilter<"Game"> | string | null
    storyline?: StringNullableFilter<"Game"> | string | null
    firstReleaseDate?: DateTimeNullableFilter<"Game"> | Date | string | null
    coverUrl?: StringNullableFilter<"Game"> | string | null
    screenshots?: StringNullableListFilter<"Game">
    totalRating?: FloatNullableFilter<"Game"> | number | null
    genres?: StringNullableListFilter<"Game">
    developers?: StringNullableListFilter<"Game">
    publishers?: StringNullableListFilter<"Game">
    websites?: JsonNullableFilter<"Game">
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    lastSyncedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    videos?: StringNullableListFilter<"Game">
    deals?: DealListRelationFilter
    userGames?: UserGameListRelationFilter
    wishlist_deal_notifications?: Wishlist_deal_notificationsListRelationFilter
    wishlistedBy?: WishlistListRelationFilter
  }, "id" | "igdbId">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    igdbId?: SortOrderInput | SortOrder
    name?: SortOrder
    slug?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    storyline?: SortOrderInput | SortOrder
    firstReleaseDate?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    screenshots?: SortOrder
    totalRating?: SortOrderInput | SortOrder
    genres?: SortOrder
    developers?: SortOrder
    publishers?: SortOrder
    websites?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    videos?: SortOrder
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
    igdbId?: IntNullableWithAggregatesFilter<"Game"> | number | null
    name?: StringWithAggregatesFilter<"Game"> | string
    slug?: StringNullableWithAggregatesFilter<"Game"> | string | null
    summary?: StringNullableWithAggregatesFilter<"Game"> | string | null
    storyline?: StringNullableWithAggregatesFilter<"Game"> | string | null
    firstReleaseDate?: DateTimeNullableWithAggregatesFilter<"Game"> | Date | string | null
    coverUrl?: StringNullableWithAggregatesFilter<"Game"> | string | null
    screenshots?: StringNullableListFilter<"Game">
    totalRating?: FloatNullableWithAggregatesFilter<"Game"> | number | null
    genres?: StringNullableListFilter<"Game">
    developers?: StringNullableListFilter<"Game">
    publishers?: StringNullableListFilter<"Game">
    websites?: JsonNullableWithAggregatesFilter<"Game">
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    lastSyncedAt?: DateTimeNullableWithAggregatesFilter<"Game"> | Date | string | null
    videos?: StringNullableListFilter<"Game">
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
  }

  export type PlatformOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    iconUrl?: SortOrderInput | SortOrder
    siteUrl?: SortOrderInput | SortOrder
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
    isFavorite?: BoolFilter<"UserGame"> | boolean
    notes?: StringNullableFilter<"UserGame"> | string | null
    platformDRMs?: IntNullableListFilter<"UserGame">
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
    isFavorite?: SortOrder
    notes?: SortOrderInput | SortOrder
    platformDRMs?: SortOrder
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
    isFavorite?: BoolFilter<"UserGame"> | boolean
    notes?: StringNullableFilter<"UserGame"> | string | null
    platformDRMs?: IntNullableListFilter<"UserGame">
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
    isFavorite?: SortOrder
    notes?: SortOrderInput | SortOrder
    platformDRMs?: SortOrder
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
    isFavorite?: BoolWithAggregatesFilter<"UserGame"> | boolean
    notes?: StringNullableWithAggregatesFilter<"UserGame"> | string | null
    platformDRMs?: IntNullableListFilter<"UserGame">
  }

  export type DealWhereInput = {
    AND?: DealWhereInput | DealWhereInput[]
    OR?: DealWhereInput[]
    NOT?: DealWhereInput | DealWhereInput[]
    id?: IntFilter<"Deal"> | number
    gameId?: IntNullableFilter<"Deal"> | number | null
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
    externalId?: StringNullableFilter<"Deal"> | string | null
    source?: StringNullableFilter<"Deal"> | string | null
    thumb?: StringNullableFilter<"Deal"> | string | null
    rating?: FloatNullableFilter<"Deal"> | number | null
    game?: XOR<GameNullableScalarRelationFilter, GameWhereInput> | null
    wishlist_deal_notifications?: Wishlist_deal_notificationsListRelationFilter
  }

  export type DealOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrderInput | SortOrder
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
    externalId?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    thumb?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    game?: GameOrderByWithRelationInput
    wishlist_deal_notifications?: wishlist_deal_notificationsOrderByRelationAggregateInput
  }

  export type DealWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    deal_external_unique?: DealDeal_external_uniqueCompoundUniqueInput
    AND?: DealWhereInput | DealWhereInput[]
    OR?: DealWhereInput[]
    NOT?: DealWhereInput | DealWhereInput[]
    gameId?: IntNullableFilter<"Deal"> | number | null
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
    externalId?: StringNullableFilter<"Deal"> | string | null
    source?: StringNullableFilter<"Deal"> | string | null
    thumb?: StringNullableFilter<"Deal"> | string | null
    rating?: FloatNullableFilter<"Deal"> | number | null
    game?: XOR<GameNullableScalarRelationFilter, GameWhereInput> | null
    wishlist_deal_notifications?: Wishlist_deal_notificationsListRelationFilter
  }, "id" | "deal_external_unique">

  export type DealOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrderInput | SortOrder
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
    externalId?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    thumb?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
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
    gameId?: IntNullableWithAggregatesFilter<"Deal"> | number | null
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
    externalId?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    source?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    thumb?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    rating?: FloatNullableWithAggregatesFilter<"Deal"> | number | null
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

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: IntFilter<"Message"> | number
    senderId?: IntNullableFilter<"Message"> | number | null
    receiverId?: IntFilter<"Message"> | number
    text?: StringFilter<"Message"> | string
    media?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    isRead?: BoolFilter<"Message"> | boolean
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
    sender?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrderInput | SortOrder
    receiverId?: SortOrder
    text?: SortOrder
    media?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isRead?: SortOrder
    receiver?: UserOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    senderId?: IntNullableFilter<"Message"> | number | null
    receiverId?: IntFilter<"Message"> | number
    text?: StringFilter<"Message"> | string
    media?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    isRead?: BoolFilter<"Message"> | boolean
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
    sender?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrderInput | SortOrder
    receiverId?: SortOrder
    text?: SortOrder
    media?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isRead?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Message"> | number
    senderId?: IntNullableWithAggregatesFilter<"Message"> | number | null
    receiverId?: IntWithAggregatesFilter<"Message"> | number
    text?: StringWithAggregatesFilter<"Message"> | string
    media?: StringNullableWithAggregatesFilter<"Message"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    isRead?: BoolWithAggregatesFilter<"Message"> | boolean
  }

  export type wishlist_deal_notificationsWhereInput = {
    AND?: wishlist_deal_notificationsWhereInput | wishlist_deal_notificationsWhereInput[]
    OR?: wishlist_deal_notificationsWhereInput[]
    NOT?: wishlist_deal_notificationsWhereInput | wishlist_deal_notificationsWhereInput[]
    id?: IntFilter<"wishlist_deal_notifications"> | number
    userId?: IntFilter<"wishlist_deal_notifications"> | number
    gameId?: IntFilter<"wishlist_deal_notifications"> | number
    dealId?: IntFilter<"wishlist_deal_notifications"> | number
    notificationSent?: BoolFilter<"wishlist_deal_notifications"> | boolean
    createdAt?: DateTimeFilter<"wishlist_deal_notifications"> | Date | string
    updatedAt?: DateTimeFilter<"wishlist_deal_notifications"> | Date | string
    deals?: XOR<DealScalarRelationFilter, DealWhereInput>
    games?: XOR<GameScalarRelationFilter, GameWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type wishlist_deal_notificationsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    dealId?: SortOrder
    notificationSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deals?: DealOrderByWithRelationInput
    games?: GameOrderByWithRelationInput
    users?: UserOrderByWithRelationInput
  }

  export type wishlist_deal_notificationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_dealId?: wishlist_deal_notificationsUserIdDealIdCompoundUniqueInput
    AND?: wishlist_deal_notificationsWhereInput | wishlist_deal_notificationsWhereInput[]
    OR?: wishlist_deal_notificationsWhereInput[]
    NOT?: wishlist_deal_notificationsWhereInput | wishlist_deal_notificationsWhereInput[]
    userId?: IntFilter<"wishlist_deal_notifications"> | number
    gameId?: IntFilter<"wishlist_deal_notifications"> | number
    dealId?: IntFilter<"wishlist_deal_notifications"> | number
    notificationSent?: BoolFilter<"wishlist_deal_notifications"> | boolean
    createdAt?: DateTimeFilter<"wishlist_deal_notifications"> | Date | string
    updatedAt?: DateTimeFilter<"wishlist_deal_notifications"> | Date | string
    deals?: XOR<DealScalarRelationFilter, DealWhereInput>
    games?: XOR<GameScalarRelationFilter, GameWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_dealId">

  export type wishlist_deal_notificationsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    dealId?: SortOrder
    notificationSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: wishlist_deal_notificationsCountOrderByAggregateInput
    _avg?: wishlist_deal_notificationsAvgOrderByAggregateInput
    _max?: wishlist_deal_notificationsMaxOrderByAggregateInput
    _min?: wishlist_deal_notificationsMinOrderByAggregateInput
    _sum?: wishlist_deal_notificationsSumOrderByAggregateInput
  }

  export type wishlist_deal_notificationsScalarWhereWithAggregatesInput = {
    AND?: wishlist_deal_notificationsScalarWhereWithAggregatesInput | wishlist_deal_notificationsScalarWhereWithAggregatesInput[]
    OR?: wishlist_deal_notificationsScalarWhereWithAggregatesInput[]
    NOT?: wishlist_deal_notificationsScalarWhereWithAggregatesInput | wishlist_deal_notificationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"wishlist_deal_notifications"> | number
    userId?: IntWithAggregatesFilter<"wishlist_deal_notifications"> | number
    gameId?: IntWithAggregatesFilter<"wishlist_deal_notifications"> | number
    dealId?: IntWithAggregatesFilter<"wishlist_deal_notifications"> | number
    notificationSent?: BoolWithAggregatesFilter<"wishlist_deal_notifications"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"wishlist_deal_notifications"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"wishlist_deal_notifications"> | Date | string
  }

  export type UserCreateInput = {
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    userGames?: UserGameCreateNestedManyWithoutUserInput
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutUsersInput
    wishlistItems?: WishlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutUserInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutUsersInput
    wishlistItems?: WishlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    userGames?: UserGameUpdateManyWithoutUserNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutUsersNestedInput
    wishlistItems?: WishlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutUserNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutUsersNestedInput
    wishlistItems?: WishlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
  }

  export type UserUpdateManyMutationInput = {
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GameCreateInput = {
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
    deals?: DealCreateNestedManyWithoutGameInput
    userGames?: UserGameCreateNestedManyWithoutGameInput
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutGamesInput
    wishlistedBy?: WishlistCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: number
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
    deals?: DealUncheckedCreateNestedManyWithoutGameInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutGameInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutGamesInput
    wishlistedBy?: WishlistUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
    deals?: DealUpdateManyWithoutGameNestedInput
    userGames?: UserGameUpdateManyWithoutGameNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutGamesNestedInput
    wishlistedBy?: WishlistUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
    deals?: DealUncheckedUpdateManyWithoutGameNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutGameNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutGamesNestedInput
    wishlistedBy?: WishlistUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: number
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
  }

  export type GameUpdateManyMutationInput = {
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
  }

  export type GameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
  }

  export type PlatformCreateInput = {
    name: string
    slug: string
    iconUrl?: string | null
    siteUrl?: string | null
  }

  export type PlatformUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    iconUrl?: string | null
    siteUrl?: string | null
  }

  export type PlatformUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlatformUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type UserGameCreateInput = {
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    isFavorite?: boolean
    notes?: string | null
    platformDRMs?: UserGameCreateplatformDRMsInput | number[]
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
    isFavorite?: boolean
    notes?: string | null
    platformDRMs?: UserGameCreateplatformDRMsInput | number[]
  }

  export type UserGameUpdateInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    platformDRMs?: UserGameUpdateplatformDRMsInput | number[]
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
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    platformDRMs?: UserGameUpdateplatformDRMsInput | number[]
  }

  export type UserGameCreateManyInput = {
    id?: number
    userId: number
    gameId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    isFavorite?: boolean
    notes?: string | null
    platformDRMs?: UserGameCreateplatformDRMsInput | number[]
  }

  export type UserGameUpdateManyMutationInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    platformDRMs?: UserGameUpdateplatformDRMsInput | number[]
  }

  export type UserGameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    platformDRMs?: UserGameUpdateplatformDRMsInput | number[]
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
    externalId?: string | null
    source?: string | null
    thumb?: string | null
    rating?: number | null
    game?: GameCreateNestedOneWithoutDealsInput
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutDealsInput
  }

  export type DealUncheckedCreateInput = {
    id?: number
    gameId?: number | null
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
    externalId?: string | null
    source?: string | null
    thumb?: string | null
    rating?: number | null
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutDealsInput
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
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    thumb?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    game?: GameUpdateOneWithoutDealsNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: NullableIntFieldUpdateOperationsInput | number | null
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
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    thumb?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutDealsNestedInput
  }

  export type DealCreateManyInput = {
    id?: number
    gameId?: number | null
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
    externalId?: string | null
    source?: string | null
    thumb?: string | null
    rating?: number | null
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
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    thumb?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type DealUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: NullableIntFieldUpdateOperationsInput | number | null
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
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    thumb?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
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

  export type MessageCreateInput = {
    text: string
    media?: string | null
    createdAt?: Date | string
    isRead?: boolean
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
    sender?: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: number
    senderId?: number | null
    receiverId: number
    text: string
    media?: string | null
    createdAt?: Date | string
    isRead?: boolean
  }

  export type MessageUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
    sender?: UserUpdateOneWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: NullableIntFieldUpdateOperationsInput | number | null
    receiverId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageCreateManyInput = {
    id?: number
    senderId?: number | null
    receiverId: number
    text: string
    media?: string | null
    createdAt?: Date | string
    isRead?: boolean
  }

  export type MessageUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: NullableIntFieldUpdateOperationsInput | number | null
    receiverId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type wishlist_deal_notificationsCreateInput = {
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    deals: DealCreateNestedOneWithoutWishlist_deal_notificationsInput
    games: GameCreateNestedOneWithoutWishlist_deal_notificationsInput
    users: UserCreateNestedOneWithoutWishlist_deal_notificationsInput
  }

  export type wishlist_deal_notificationsUncheckedCreateInput = {
    id?: number
    userId: number
    gameId: number
    dealId: number
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type wishlist_deal_notificationsUpdateInput = {
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput
    games?: GameUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput
    users?: UserUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput
  }

  export type wishlist_deal_notificationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    dealId?: IntFieldUpdateOperationsInput | number
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type wishlist_deal_notificationsCreateManyInput = {
    id?: number
    userId: number
    gameId: number
    dealId: number
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type wishlist_deal_notificationsUpdateManyMutationInput = {
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type wishlist_deal_notificationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    dealId?: IntFieldUpdateOperationsInput | number
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type UserGameListRelationFilter = {
    every?: UserGameWhereInput
    some?: UserGameWhereInput
    none?: UserGameWhereInput
  }

  export type Wishlist_deal_notificationsListRelationFilter = {
    every?: wishlist_deal_notificationsWhereInput
    some?: wishlist_deal_notificationsWhereInput
    none?: wishlist_deal_notificationsWhereInput
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

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserGameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type wishlist_deal_notificationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WishlistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    supabase_uid?: SortOrder
    display_name?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
    steamId?: SortOrder
    epicConnect?: SortOrder
    gogConnect?: SortOrder
    emailNotifications?: SortOrder
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
    display_name?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
    steamId?: SortOrder
    epicConnect?: SortOrder
    gogConnect?: SortOrder
    emailNotifications?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    supabase_uid?: SortOrder
    display_name?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    credits?: SortOrder
    steamId?: SortOrder
    epicConnect?: SortOrder
    gogConnect?: SortOrder
    emailNotifications?: SortOrder
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type DealOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    igdbId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    storyline?: SortOrder
    firstReleaseDate?: SortOrder
    coverUrl?: SortOrder
    screenshots?: SortOrder
    totalRating?: SortOrder
    genres?: SortOrder
    developers?: SortOrder
    publishers?: SortOrder
    websites?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncedAt?: SortOrder
    videos?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    id?: SortOrder
    igdbId?: SortOrder
    totalRating?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    igdbId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    storyline?: SortOrder
    firstReleaseDate?: SortOrder
    coverUrl?: SortOrder
    totalRating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncedAt?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    igdbId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    storyline?: SortOrder
    firstReleaseDate?: SortOrder
    coverUrl?: SortOrder
    totalRating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncedAt?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    id?: SortOrder
    igdbId?: SortOrder
    totalRating?: SortOrder
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
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
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

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
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
    isFavorite?: SortOrder
    notes?: SortOrder
    platformDRMs?: SortOrder
  }

  export type UserGameAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    playtimeMinutes?: SortOrder
    platformDRMs?: SortOrder
  }

  export type UserGameMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
    playtimeMinutes?: SortOrder
    lastPlayed?: SortOrder
    isInstalled?: SortOrder
    isFavorite?: SortOrder
    notes?: SortOrder
  }

  export type UserGameMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    addedAt?: SortOrder
    playtimeMinutes?: SortOrder
    lastPlayed?: SortOrder
    isInstalled?: SortOrder
    isFavorite?: SortOrder
    notes?: SortOrder
  }

  export type UserGameSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    playtimeMinutes?: SortOrder
    platformDRMs?: SortOrder
  }

  export type GameNullableScalarRelationFilter = {
    is?: GameWhereInput | null
    isNot?: GameWhereInput | null
  }

  export type DealDeal_external_uniqueCompoundUniqueInput = {
    externalId: string
    source: string
  }

  export type DealCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
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
    externalId?: SortOrder
    source?: SortOrder
    thumb?: SortOrder
    rating?: SortOrder
  }

  export type DealAvgOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    price?: SortOrder
    discountPercent?: SortOrder
    originalPrice?: SortOrder
    rating?: SortOrder
  }

  export type DealMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
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
    externalId?: SortOrder
    source?: SortOrder
    thumb?: SortOrder
    rating?: SortOrder
  }

  export type DealMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
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
    externalId?: SortOrder
    source?: SortOrder
    thumb?: SortOrder
    rating?: SortOrder
  }

  export type DealSumOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    price?: SortOrder
    discountPercent?: SortOrder
    originalPrice?: SortOrder
    rating?: SortOrder
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

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    text?: SortOrder
    media?: SortOrder
    createdAt?: SortOrder
    isRead?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    text?: SortOrder
    media?: SortOrder
    createdAt?: SortOrder
    isRead?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    text?: SortOrder
    media?: SortOrder
    createdAt?: SortOrder
    isRead?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
  }

  export type DealScalarRelationFilter = {
    is?: DealWhereInput
    isNot?: DealWhereInput
  }

  export type wishlist_deal_notificationsUserIdDealIdCompoundUniqueInput = {
    userId: number
    dealId: number
  }

  export type wishlist_deal_notificationsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    dealId?: SortOrder
    notificationSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type wishlist_deal_notificationsAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    dealId?: SortOrder
  }

  export type wishlist_deal_notificationsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    dealId?: SortOrder
    notificationSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type wishlist_deal_notificationsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    dealId?: SortOrder
    notificationSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type wishlist_deal_notificationsSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    dealId?: SortOrder
  }

  export type MessageCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type UserGameCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGameCreateWithoutUserInput, UserGameUncheckedCreateWithoutUserInput> | UserGameCreateWithoutUserInput[] | UserGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutUserInput | UserGameCreateOrConnectWithoutUserInput[]
    createMany?: UserGameCreateManyUserInputEnvelope
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
  }

  export type wishlist_deal_notificationsCreateNestedManyWithoutUsersInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutUsersInput, wishlist_deal_notificationsUncheckedCreateWithoutUsersInput> | wishlist_deal_notificationsCreateWithoutUsersInput[] | wishlist_deal_notificationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutUsersInput | wishlist_deal_notificationsCreateOrConnectWithoutUsersInput[]
    createMany?: wishlist_deal_notificationsCreateManyUsersInputEnvelope
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
  }

  export type WishlistCreateNestedManyWithoutUserInput = {
    create?: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput> | WishlistCreateWithoutUserInput[] | WishlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutUserInput | WishlistCreateOrConnectWithoutUserInput[]
    createMany?: WishlistCreateManyUserInputEnvelope
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type UserGameUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGameCreateWithoutUserInput, UserGameUncheckedCreateWithoutUserInput> | UserGameCreateWithoutUserInput[] | UserGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutUserInput | UserGameCreateOrConnectWithoutUserInput[]
    createMany?: UserGameCreateManyUserInputEnvelope
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
  }

  export type wishlist_deal_notificationsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutUsersInput, wishlist_deal_notificationsUncheckedCreateWithoutUsersInput> | wishlist_deal_notificationsCreateWithoutUsersInput[] | wishlist_deal_notificationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutUsersInput | wishlist_deal_notificationsCreateOrConnectWithoutUsersInput[]
    createMany?: wishlist_deal_notificationsCreateManyUsersInputEnvelope
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
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

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MessageUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
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

  export type wishlist_deal_notificationsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutUsersInput, wishlist_deal_notificationsUncheckedCreateWithoutUsersInput> | wishlist_deal_notificationsCreateWithoutUsersInput[] | wishlist_deal_notificationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutUsersInput | wishlist_deal_notificationsCreateOrConnectWithoutUsersInput[]
    upsert?: wishlist_deal_notificationsUpsertWithWhereUniqueWithoutUsersInput | wishlist_deal_notificationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: wishlist_deal_notificationsCreateManyUsersInputEnvelope
    set?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    disconnect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    delete?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    update?: wishlist_deal_notificationsUpdateWithWhereUniqueWithoutUsersInput | wishlist_deal_notificationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: wishlist_deal_notificationsUpdateManyWithWhereWithoutUsersInput | wishlist_deal_notificationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: wishlist_deal_notificationsScalarWhereInput | wishlist_deal_notificationsScalarWhereInput[]
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

  export type MessageUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
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

  export type wishlist_deal_notificationsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutUsersInput, wishlist_deal_notificationsUncheckedCreateWithoutUsersInput> | wishlist_deal_notificationsCreateWithoutUsersInput[] | wishlist_deal_notificationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutUsersInput | wishlist_deal_notificationsCreateOrConnectWithoutUsersInput[]
    upsert?: wishlist_deal_notificationsUpsertWithWhereUniqueWithoutUsersInput | wishlist_deal_notificationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: wishlist_deal_notificationsCreateManyUsersInputEnvelope
    set?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    disconnect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    delete?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    update?: wishlist_deal_notificationsUpdateWithWhereUniqueWithoutUsersInput | wishlist_deal_notificationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: wishlist_deal_notificationsUpdateManyWithWhereWithoutUsersInput | wishlist_deal_notificationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: wishlist_deal_notificationsScalarWhereInput | wishlist_deal_notificationsScalarWhereInput[]
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

  export type GameCreatescreenshotsInput = {
    set: string[]
  }

  export type GameCreategenresInput = {
    set: string[]
  }

  export type GameCreatedevelopersInput = {
    set: string[]
  }

  export type GameCreatepublishersInput = {
    set: string[]
  }

  export type GameCreatevideosInput = {
    set: string[]
  }

  export type DealCreateNestedManyWithoutGameInput = {
    create?: XOR<DealCreateWithoutGameInput, DealUncheckedCreateWithoutGameInput> | DealCreateWithoutGameInput[] | DealUncheckedCreateWithoutGameInput[]
    connectOrCreate?: DealCreateOrConnectWithoutGameInput | DealCreateOrConnectWithoutGameInput[]
    createMany?: DealCreateManyGameInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type UserGameCreateNestedManyWithoutGameInput = {
    create?: XOR<UserGameCreateWithoutGameInput, UserGameUncheckedCreateWithoutGameInput> | UserGameCreateWithoutGameInput[] | UserGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutGameInput | UserGameCreateOrConnectWithoutGameInput[]
    createMany?: UserGameCreateManyGameInputEnvelope
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
  }

  export type wishlist_deal_notificationsCreateNestedManyWithoutGamesInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutGamesInput, wishlist_deal_notificationsUncheckedCreateWithoutGamesInput> | wishlist_deal_notificationsCreateWithoutGamesInput[] | wishlist_deal_notificationsUncheckedCreateWithoutGamesInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutGamesInput | wishlist_deal_notificationsCreateOrConnectWithoutGamesInput[]
    createMany?: wishlist_deal_notificationsCreateManyGamesInputEnvelope
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
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

  export type UserGameUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<UserGameCreateWithoutGameInput, UserGameUncheckedCreateWithoutGameInput> | UserGameCreateWithoutGameInput[] | UserGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: UserGameCreateOrConnectWithoutGameInput | UserGameCreateOrConnectWithoutGameInput[]
    createMany?: UserGameCreateManyGameInputEnvelope
    connect?: UserGameWhereUniqueInput | UserGameWhereUniqueInput[]
  }

  export type wishlist_deal_notificationsUncheckedCreateNestedManyWithoutGamesInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutGamesInput, wishlist_deal_notificationsUncheckedCreateWithoutGamesInput> | wishlist_deal_notificationsCreateWithoutGamesInput[] | wishlist_deal_notificationsUncheckedCreateWithoutGamesInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutGamesInput | wishlist_deal_notificationsCreateOrConnectWithoutGamesInput[]
    createMany?: wishlist_deal_notificationsCreateManyGamesInputEnvelope
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
  }

  export type WishlistUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<WishlistCreateWithoutGameInput, WishlistUncheckedCreateWithoutGameInput> | WishlistCreateWithoutGameInput[] | WishlistUncheckedCreateWithoutGameInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutGameInput | WishlistCreateOrConnectWithoutGameInput[]
    createMany?: WishlistCreateManyGameInputEnvelope
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type GameUpdatescreenshotsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameUpdategenresInput = {
    set?: string[]
    push?: string | string[]
  }

  export type GameUpdatedevelopersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type GameUpdatepublishersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GameUpdatevideosInput = {
    set?: string[]
    push?: string | string[]
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

  export type wishlist_deal_notificationsUpdateManyWithoutGamesNestedInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutGamesInput, wishlist_deal_notificationsUncheckedCreateWithoutGamesInput> | wishlist_deal_notificationsCreateWithoutGamesInput[] | wishlist_deal_notificationsUncheckedCreateWithoutGamesInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutGamesInput | wishlist_deal_notificationsCreateOrConnectWithoutGamesInput[]
    upsert?: wishlist_deal_notificationsUpsertWithWhereUniqueWithoutGamesInput | wishlist_deal_notificationsUpsertWithWhereUniqueWithoutGamesInput[]
    createMany?: wishlist_deal_notificationsCreateManyGamesInputEnvelope
    set?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    disconnect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    delete?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    update?: wishlist_deal_notificationsUpdateWithWhereUniqueWithoutGamesInput | wishlist_deal_notificationsUpdateWithWhereUniqueWithoutGamesInput[]
    updateMany?: wishlist_deal_notificationsUpdateManyWithWhereWithoutGamesInput | wishlist_deal_notificationsUpdateManyWithWhereWithoutGamesInput[]
    deleteMany?: wishlist_deal_notificationsScalarWhereInput | wishlist_deal_notificationsScalarWhereInput[]
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

  export type wishlist_deal_notificationsUncheckedUpdateManyWithoutGamesNestedInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutGamesInput, wishlist_deal_notificationsUncheckedCreateWithoutGamesInput> | wishlist_deal_notificationsCreateWithoutGamesInput[] | wishlist_deal_notificationsUncheckedCreateWithoutGamesInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutGamesInput | wishlist_deal_notificationsCreateOrConnectWithoutGamesInput[]
    upsert?: wishlist_deal_notificationsUpsertWithWhereUniqueWithoutGamesInput | wishlist_deal_notificationsUpsertWithWhereUniqueWithoutGamesInput[]
    createMany?: wishlist_deal_notificationsCreateManyGamesInputEnvelope
    set?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    disconnect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    delete?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    update?: wishlist_deal_notificationsUpdateWithWhereUniqueWithoutGamesInput | wishlist_deal_notificationsUpdateWithWhereUniqueWithoutGamesInput[]
    updateMany?: wishlist_deal_notificationsUpdateManyWithWhereWithoutGamesInput | wishlist_deal_notificationsUpdateManyWithWhereWithoutGamesInput[]
    deleteMany?: wishlist_deal_notificationsScalarWhereInput | wishlist_deal_notificationsScalarWhereInput[]
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

  export type UserGameCreateplatformDRMsInput = {
    set: number[]
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

  export type UserGameUpdateplatformDRMsInput = {
    set?: number[]
    push?: number | number[]
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

  export type wishlist_deal_notificationsCreateNestedManyWithoutDealsInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutDealsInput, wishlist_deal_notificationsUncheckedCreateWithoutDealsInput> | wishlist_deal_notificationsCreateWithoutDealsInput[] | wishlist_deal_notificationsUncheckedCreateWithoutDealsInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutDealsInput | wishlist_deal_notificationsCreateOrConnectWithoutDealsInput[]
    createMany?: wishlist_deal_notificationsCreateManyDealsInputEnvelope
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
  }

  export type wishlist_deal_notificationsUncheckedCreateNestedManyWithoutDealsInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutDealsInput, wishlist_deal_notificationsUncheckedCreateWithoutDealsInput> | wishlist_deal_notificationsCreateWithoutDealsInput[] | wishlist_deal_notificationsUncheckedCreateWithoutDealsInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutDealsInput | wishlist_deal_notificationsCreateOrConnectWithoutDealsInput[]
    createMany?: wishlist_deal_notificationsCreateManyDealsInputEnvelope
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
  }

  export type GameUpdateOneWithoutDealsNestedInput = {
    create?: XOR<GameCreateWithoutDealsInput, GameUncheckedCreateWithoutDealsInput>
    connectOrCreate?: GameCreateOrConnectWithoutDealsInput
    upsert?: GameUpsertWithoutDealsInput
    disconnect?: GameWhereInput | boolean
    delete?: GameWhereInput | boolean
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutDealsInput, GameUpdateWithoutDealsInput>, GameUncheckedUpdateWithoutDealsInput>
  }

  export type wishlist_deal_notificationsUpdateManyWithoutDealsNestedInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutDealsInput, wishlist_deal_notificationsUncheckedCreateWithoutDealsInput> | wishlist_deal_notificationsCreateWithoutDealsInput[] | wishlist_deal_notificationsUncheckedCreateWithoutDealsInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutDealsInput | wishlist_deal_notificationsCreateOrConnectWithoutDealsInput[]
    upsert?: wishlist_deal_notificationsUpsertWithWhereUniqueWithoutDealsInput | wishlist_deal_notificationsUpsertWithWhereUniqueWithoutDealsInput[]
    createMany?: wishlist_deal_notificationsCreateManyDealsInputEnvelope
    set?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    disconnect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    delete?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    update?: wishlist_deal_notificationsUpdateWithWhereUniqueWithoutDealsInput | wishlist_deal_notificationsUpdateWithWhereUniqueWithoutDealsInput[]
    updateMany?: wishlist_deal_notificationsUpdateManyWithWhereWithoutDealsInput | wishlist_deal_notificationsUpdateManyWithWhereWithoutDealsInput[]
    deleteMany?: wishlist_deal_notificationsScalarWhereInput | wishlist_deal_notificationsScalarWhereInput[]
  }

  export type wishlist_deal_notificationsUncheckedUpdateManyWithoutDealsNestedInput = {
    create?: XOR<wishlist_deal_notificationsCreateWithoutDealsInput, wishlist_deal_notificationsUncheckedCreateWithoutDealsInput> | wishlist_deal_notificationsCreateWithoutDealsInput[] | wishlist_deal_notificationsUncheckedCreateWithoutDealsInput[]
    connectOrCreate?: wishlist_deal_notificationsCreateOrConnectWithoutDealsInput | wishlist_deal_notificationsCreateOrConnectWithoutDealsInput[]
    upsert?: wishlist_deal_notificationsUpsertWithWhereUniqueWithoutDealsInput | wishlist_deal_notificationsUpsertWithWhereUniqueWithoutDealsInput[]
    createMany?: wishlist_deal_notificationsCreateManyDealsInputEnvelope
    set?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    disconnect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    delete?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    connect?: wishlist_deal_notificationsWhereUniqueInput | wishlist_deal_notificationsWhereUniqueInput[]
    update?: wishlist_deal_notificationsUpdateWithWhereUniqueWithoutDealsInput | wishlist_deal_notificationsUpdateWithWhereUniqueWithoutDealsInput[]
    updateMany?: wishlist_deal_notificationsUpdateManyWithWhereWithoutDealsInput | wishlist_deal_notificationsUpdateManyWithWhereWithoutDealsInput[]
    deleteMany?: wishlist_deal_notificationsScalarWhereInput | wishlist_deal_notificationsScalarWhereInput[]
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

  export type UserCreateNestedOneWithoutReceivedMessagesInput = {
    create?: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutReceivedMessagesNestedInput = {
    create?: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput
    upsert?: UserUpsertWithoutReceivedMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedMessagesInput, UserUpdateWithoutReceivedMessagesInput>, UserUncheckedUpdateWithoutReceivedMessagesInput>
  }

  export type UserUpdateOneWithoutSentMessagesNestedInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    upsert?: UserUpsertWithoutSentMessagesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentMessagesInput, UserUpdateWithoutSentMessagesInput>, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type DealCreateNestedOneWithoutWishlist_deal_notificationsInput = {
    create?: XOR<DealCreateWithoutWishlist_deal_notificationsInput, DealUncheckedCreateWithoutWishlist_deal_notificationsInput>
    connectOrCreate?: DealCreateOrConnectWithoutWishlist_deal_notificationsInput
    connect?: DealWhereUniqueInput
  }

  export type GameCreateNestedOneWithoutWishlist_deal_notificationsInput = {
    create?: XOR<GameCreateWithoutWishlist_deal_notificationsInput, GameUncheckedCreateWithoutWishlist_deal_notificationsInput>
    connectOrCreate?: GameCreateOrConnectWithoutWishlist_deal_notificationsInput
    connect?: GameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWishlist_deal_notificationsInput = {
    create?: XOR<UserCreateWithoutWishlist_deal_notificationsInput, UserUncheckedCreateWithoutWishlist_deal_notificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWishlist_deal_notificationsInput
    connect?: UserWhereUniqueInput
  }

  export type DealUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput = {
    create?: XOR<DealCreateWithoutWishlist_deal_notificationsInput, DealUncheckedCreateWithoutWishlist_deal_notificationsInput>
    connectOrCreate?: DealCreateOrConnectWithoutWishlist_deal_notificationsInput
    upsert?: DealUpsertWithoutWishlist_deal_notificationsInput
    connect?: DealWhereUniqueInput
    update?: XOR<XOR<DealUpdateToOneWithWhereWithoutWishlist_deal_notificationsInput, DealUpdateWithoutWishlist_deal_notificationsInput>, DealUncheckedUpdateWithoutWishlist_deal_notificationsInput>
  }

  export type GameUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput = {
    create?: XOR<GameCreateWithoutWishlist_deal_notificationsInput, GameUncheckedCreateWithoutWishlist_deal_notificationsInput>
    connectOrCreate?: GameCreateOrConnectWithoutWishlist_deal_notificationsInput
    upsert?: GameUpsertWithoutWishlist_deal_notificationsInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutWishlist_deal_notificationsInput, GameUpdateWithoutWishlist_deal_notificationsInput>, GameUncheckedUpdateWithoutWishlist_deal_notificationsInput>
  }

  export type UserUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput = {
    create?: XOR<UserCreateWithoutWishlist_deal_notificationsInput, UserUncheckedCreateWithoutWishlist_deal_notificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWishlist_deal_notificationsInput
    upsert?: UserUpsertWithoutWishlist_deal_notificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWishlist_deal_notificationsInput, UserUpdateWithoutWishlist_deal_notificationsInput>, UserUncheckedUpdateWithoutWishlist_deal_notificationsInput>
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type MessageCreateWithoutReceiverInput = {
    text: string
    media?: string | null
    createdAt?: Date | string
    isRead?: boolean
    sender?: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateWithoutReceiverInput = {
    id?: number
    senderId?: number | null
    text: string
    media?: string | null
    createdAt?: Date | string
    isRead?: boolean
  }

  export type MessageCreateOrConnectWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageCreateManyReceiverInputEnvelope = {
    data: MessageCreateManyReceiverInput | MessageCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutSenderInput = {
    text: string
    media?: string | null
    createdAt?: Date | string
    isRead?: boolean
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: number
    receiverId: number
    text: string
    media?: string | null
    createdAt?: Date | string
    isRead?: boolean
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type UserGameCreateWithoutUserInput = {
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    isFavorite?: boolean
    notes?: string | null
    platformDRMs?: UserGameCreateplatformDRMsInput | number[]
    game: GameCreateNestedOneWithoutUserGamesInput
  }

  export type UserGameUncheckedCreateWithoutUserInput = {
    id?: number
    gameId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    isFavorite?: boolean
    notes?: string | null
    platformDRMs?: UserGameCreateplatformDRMsInput | number[]
  }

  export type UserGameCreateOrConnectWithoutUserInput = {
    where: UserGameWhereUniqueInput
    create: XOR<UserGameCreateWithoutUserInput, UserGameUncheckedCreateWithoutUserInput>
  }

  export type UserGameCreateManyUserInputEnvelope = {
    data: UserGameCreateManyUserInput | UserGameCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type wishlist_deal_notificationsCreateWithoutUsersInput = {
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    deals: DealCreateNestedOneWithoutWishlist_deal_notificationsInput
    games: GameCreateNestedOneWithoutWishlist_deal_notificationsInput
  }

  export type wishlist_deal_notificationsUncheckedCreateWithoutUsersInput = {
    id?: number
    gameId: number
    dealId: number
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type wishlist_deal_notificationsCreateOrConnectWithoutUsersInput = {
    where: wishlist_deal_notificationsWhereUniqueInput
    create: XOR<wishlist_deal_notificationsCreateWithoutUsersInput, wishlist_deal_notificationsUncheckedCreateWithoutUsersInput>
  }

  export type wishlist_deal_notificationsCreateManyUsersInputEnvelope = {
    data: wishlist_deal_notificationsCreateManyUsersInput | wishlist_deal_notificationsCreateManyUsersInput[]
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

  export type MessageUpsertWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
  }

  export type MessageUpdateManyWithWhereWithoutReceiverInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutReceiverInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: IntFilter<"Message"> | number
    senderId?: IntNullableFilter<"Message"> | number | null
    receiverId?: IntFilter<"Message"> | number
    text?: StringFilter<"Message"> | string
    media?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    isRead?: BoolFilter<"Message"> | boolean
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
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
    isFavorite?: BoolFilter<"UserGame"> | boolean
    notes?: StringNullableFilter<"UserGame"> | string | null
    platformDRMs?: IntNullableListFilter<"UserGame">
  }

  export type wishlist_deal_notificationsUpsertWithWhereUniqueWithoutUsersInput = {
    where: wishlist_deal_notificationsWhereUniqueInput
    update: XOR<wishlist_deal_notificationsUpdateWithoutUsersInput, wishlist_deal_notificationsUncheckedUpdateWithoutUsersInput>
    create: XOR<wishlist_deal_notificationsCreateWithoutUsersInput, wishlist_deal_notificationsUncheckedCreateWithoutUsersInput>
  }

  export type wishlist_deal_notificationsUpdateWithWhereUniqueWithoutUsersInput = {
    where: wishlist_deal_notificationsWhereUniqueInput
    data: XOR<wishlist_deal_notificationsUpdateWithoutUsersInput, wishlist_deal_notificationsUncheckedUpdateWithoutUsersInput>
  }

  export type wishlist_deal_notificationsUpdateManyWithWhereWithoutUsersInput = {
    where: wishlist_deal_notificationsScalarWhereInput
    data: XOR<wishlist_deal_notificationsUpdateManyMutationInput, wishlist_deal_notificationsUncheckedUpdateManyWithoutUsersInput>
  }

  export type wishlist_deal_notificationsScalarWhereInput = {
    AND?: wishlist_deal_notificationsScalarWhereInput | wishlist_deal_notificationsScalarWhereInput[]
    OR?: wishlist_deal_notificationsScalarWhereInput[]
    NOT?: wishlist_deal_notificationsScalarWhereInput | wishlist_deal_notificationsScalarWhereInput[]
    id?: IntFilter<"wishlist_deal_notifications"> | number
    userId?: IntFilter<"wishlist_deal_notifications"> | number
    gameId?: IntFilter<"wishlist_deal_notifications"> | number
    dealId?: IntFilter<"wishlist_deal_notifications"> | number
    notificationSent?: BoolFilter<"wishlist_deal_notifications"> | boolean
    createdAt?: DateTimeFilter<"wishlist_deal_notifications"> | Date | string
    updatedAt?: DateTimeFilter<"wishlist_deal_notifications"> | Date | string
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
    externalId?: string | null
    source?: string | null
    thumb?: string | null
    rating?: number | null
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutDealsInput
  }

  export type DealUncheckedCreateWithoutGameInput = {
    id?: number
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
    externalId?: string | null
    source?: string | null
    thumb?: string | null
    rating?: number | null
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutDealsInput
  }

  export type DealCreateOrConnectWithoutGameInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutGameInput, DealUncheckedCreateWithoutGameInput>
  }

  export type DealCreateManyGameInputEnvelope = {
    data: DealCreateManyGameInput | DealCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type UserGameCreateWithoutGameInput = {
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    isFavorite?: boolean
    notes?: string | null
    platformDRMs?: UserGameCreateplatformDRMsInput | number[]
    user: UserCreateNestedOneWithoutUserGamesInput
  }

  export type UserGameUncheckedCreateWithoutGameInput = {
    id?: number
    userId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    isFavorite?: boolean
    notes?: string | null
    platformDRMs?: UserGameCreateplatformDRMsInput | number[]
  }

  export type UserGameCreateOrConnectWithoutGameInput = {
    where: UserGameWhereUniqueInput
    create: XOR<UserGameCreateWithoutGameInput, UserGameUncheckedCreateWithoutGameInput>
  }

  export type UserGameCreateManyGameInputEnvelope = {
    data: UserGameCreateManyGameInput | UserGameCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type wishlist_deal_notificationsCreateWithoutGamesInput = {
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    deals: DealCreateNestedOneWithoutWishlist_deal_notificationsInput
    users: UserCreateNestedOneWithoutWishlist_deal_notificationsInput
  }

  export type wishlist_deal_notificationsUncheckedCreateWithoutGamesInput = {
    id?: number
    userId: number
    dealId: number
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type wishlist_deal_notificationsCreateOrConnectWithoutGamesInput = {
    where: wishlist_deal_notificationsWhereUniqueInput
    create: XOR<wishlist_deal_notificationsCreateWithoutGamesInput, wishlist_deal_notificationsUncheckedCreateWithoutGamesInput>
  }

  export type wishlist_deal_notificationsCreateManyGamesInputEnvelope = {
    data: wishlist_deal_notificationsCreateManyGamesInput | wishlist_deal_notificationsCreateManyGamesInput[]
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
    gameId?: IntNullableFilter<"Deal"> | number | null
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
    externalId?: StringNullableFilter<"Deal"> | string | null
    source?: StringNullableFilter<"Deal"> | string | null
    thumb?: StringNullableFilter<"Deal"> | string | null
    rating?: FloatNullableFilter<"Deal"> | number | null
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

  export type wishlist_deal_notificationsUpsertWithWhereUniqueWithoutGamesInput = {
    where: wishlist_deal_notificationsWhereUniqueInput
    update: XOR<wishlist_deal_notificationsUpdateWithoutGamesInput, wishlist_deal_notificationsUncheckedUpdateWithoutGamesInput>
    create: XOR<wishlist_deal_notificationsCreateWithoutGamesInput, wishlist_deal_notificationsUncheckedCreateWithoutGamesInput>
  }

  export type wishlist_deal_notificationsUpdateWithWhereUniqueWithoutGamesInput = {
    where: wishlist_deal_notificationsWhereUniqueInput
    data: XOR<wishlist_deal_notificationsUpdateWithoutGamesInput, wishlist_deal_notificationsUncheckedUpdateWithoutGamesInput>
  }

  export type wishlist_deal_notificationsUpdateManyWithWhereWithoutGamesInput = {
    where: wishlist_deal_notificationsScalarWhereInput
    data: XOR<wishlist_deal_notificationsUpdateManyMutationInput, wishlist_deal_notificationsUncheckedUpdateManyWithoutGamesInput>
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

  export type GameCreateWithoutUserGamesInput = {
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
    deals?: DealCreateNestedManyWithoutGameInput
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutGamesInput
    wishlistedBy?: WishlistCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutUserGamesInput = {
    id?: number
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
    deals?: DealUncheckedCreateNestedManyWithoutGameInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutGamesInput
    wishlistedBy?: WishlistUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutUserGamesInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutUserGamesInput, GameUncheckedCreateWithoutUserGamesInput>
  }

  export type UserCreateWithoutUserGamesInput = {
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutUsersInput
    wishlistItems?: WishlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserGamesInput = {
    id?: number
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutUsersInput
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
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
    deals?: DealUpdateManyWithoutGameNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutGamesNestedInput
    wishlistedBy?: WishlistUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutUserGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
    deals?: DealUncheckedUpdateManyWithoutGameNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutGamesNestedInput
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
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutUsersNestedInput
    wishlistItems?: WishlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutUsersNestedInput
    wishlistItems?: WishlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GameCreateWithoutDealsInput = {
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
    userGames?: UserGameCreateNestedManyWithoutGameInput
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutGamesInput
    wishlistedBy?: WishlistCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutDealsInput = {
    id?: number
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
    userGames?: UserGameUncheckedCreateNestedManyWithoutGameInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutGamesInput
    wishlistedBy?: WishlistUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutDealsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutDealsInput, GameUncheckedCreateWithoutDealsInput>
  }

  export type wishlist_deal_notificationsCreateWithoutDealsInput = {
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    games: GameCreateNestedOneWithoutWishlist_deal_notificationsInput
    users: UserCreateNestedOneWithoutWishlist_deal_notificationsInput
  }

  export type wishlist_deal_notificationsUncheckedCreateWithoutDealsInput = {
    id?: number
    userId: number
    gameId: number
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type wishlist_deal_notificationsCreateOrConnectWithoutDealsInput = {
    where: wishlist_deal_notificationsWhereUniqueInput
    create: XOR<wishlist_deal_notificationsCreateWithoutDealsInput, wishlist_deal_notificationsUncheckedCreateWithoutDealsInput>
  }

  export type wishlist_deal_notificationsCreateManyDealsInputEnvelope = {
    data: wishlist_deal_notificationsCreateManyDealsInput | wishlist_deal_notificationsCreateManyDealsInput[]
    skipDuplicates?: boolean
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
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
    userGames?: UserGameUpdateManyWithoutGameNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutGamesNestedInput
    wishlistedBy?: WishlistUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutDealsInput = {
    id?: IntFieldUpdateOperationsInput | number
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
    userGames?: UserGameUncheckedUpdateManyWithoutGameNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutGamesNestedInput
    wishlistedBy?: WishlistUncheckedUpdateManyWithoutGameNestedInput
  }

  export type wishlist_deal_notificationsUpsertWithWhereUniqueWithoutDealsInput = {
    where: wishlist_deal_notificationsWhereUniqueInput
    update: XOR<wishlist_deal_notificationsUpdateWithoutDealsInput, wishlist_deal_notificationsUncheckedUpdateWithoutDealsInput>
    create: XOR<wishlist_deal_notificationsCreateWithoutDealsInput, wishlist_deal_notificationsUncheckedCreateWithoutDealsInput>
  }

  export type wishlist_deal_notificationsUpdateWithWhereUniqueWithoutDealsInput = {
    where: wishlist_deal_notificationsWhereUniqueInput
    data: XOR<wishlist_deal_notificationsUpdateWithoutDealsInput, wishlist_deal_notificationsUncheckedUpdateWithoutDealsInput>
  }

  export type wishlist_deal_notificationsUpdateManyWithWhereWithoutDealsInput = {
    where: wishlist_deal_notificationsScalarWhereInput
    data: XOR<wishlist_deal_notificationsUpdateManyMutationInput, wishlist_deal_notificationsUncheckedUpdateManyWithoutDealsInput>
  }

  export type GameCreateWithoutWishlistedByInput = {
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
    deals?: DealCreateNestedManyWithoutGameInput
    userGames?: UserGameCreateNestedManyWithoutGameInput
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutGamesInput
  }

  export type GameUncheckedCreateWithoutWishlistedByInput = {
    id?: number
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
    deals?: DealUncheckedCreateNestedManyWithoutGameInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutGameInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutGamesInput
  }

  export type GameCreateOrConnectWithoutWishlistedByInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutWishlistedByInput, GameUncheckedCreateWithoutWishlistedByInput>
  }

  export type UserCreateWithoutWishlistItemsInput = {
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    userGames?: UserGameCreateNestedManyWithoutUserInput
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutWishlistItemsInput = {
    id?: number
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutUserInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutUsersInput
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
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
    deals?: DealUpdateManyWithoutGameNestedInput
    userGames?: UserGameUpdateManyWithoutGameNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutGamesNestedInput
  }

  export type GameUncheckedUpdateWithoutWishlistedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
    deals?: DealUncheckedUpdateManyWithoutGameNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutGameNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutGamesNestedInput
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
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    userGames?: UserGameUpdateManyWithoutUserNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutWishlistItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutUserNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateWithoutReceivedMessagesInput = {
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    userGames?: UserGameCreateNestedManyWithoutUserInput
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutUsersInput
    wishlistItems?: WishlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReceivedMessagesInput = {
    id?: number
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutUserInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutUsersInput
    wishlistItems?: WishlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReceivedMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
  }

  export type UserCreateWithoutSentMessagesInput = {
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    userGames?: UserGameCreateNestedManyWithoutUserInput
    wishlist_deal_notifications?: wishlist_deal_notificationsCreateNestedManyWithoutUsersInput
    wishlistItems?: WishlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: number
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutUserInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedCreateNestedManyWithoutUsersInput
    wishlistItems?: WishlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
  }

  export type UserUpsertWithoutReceivedMessagesInput = {
    update: XOR<UserUpdateWithoutReceivedMessagesInput, UserUncheckedUpdateWithoutReceivedMessagesInput>
    create: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedMessagesInput, UserUncheckedUpdateWithoutReceivedMessagesInput>
  }

  export type UserUpdateWithoutReceivedMessagesInput = {
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    userGames?: UserGameUpdateManyWithoutUserNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutUsersNestedInput
    wishlistItems?: WishlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutUserNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutUsersNestedInput
    wishlistItems?: WishlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutSentMessagesInput = {
    update: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateWithoutSentMessagesInput = {
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    userGames?: UserGameUpdateManyWithoutUserNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutUsersNestedInput
    wishlistItems?: WishlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutUserNestedInput
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutUsersNestedInput
    wishlistItems?: WishlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DealCreateWithoutWishlist_deal_notificationsInput = {
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
    externalId?: string | null
    source?: string | null
    thumb?: string | null
    rating?: number | null
    game?: GameCreateNestedOneWithoutDealsInput
  }

  export type DealUncheckedCreateWithoutWishlist_deal_notificationsInput = {
    id?: number
    gameId?: number | null
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
    externalId?: string | null
    source?: string | null
    thumb?: string | null
    rating?: number | null
  }

  export type DealCreateOrConnectWithoutWishlist_deal_notificationsInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutWishlist_deal_notificationsInput, DealUncheckedCreateWithoutWishlist_deal_notificationsInput>
  }

  export type GameCreateWithoutWishlist_deal_notificationsInput = {
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
    deals?: DealCreateNestedManyWithoutGameInput
    userGames?: UserGameCreateNestedManyWithoutGameInput
    wishlistedBy?: WishlistCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutWishlist_deal_notificationsInput = {
    id?: number
    igdbId?: number | null
    name: string
    slug?: string | null
    summary?: string | null
    storyline?: string | null
    firstReleaseDate?: Date | string | null
    coverUrl?: string | null
    screenshots?: GameCreatescreenshotsInput | string[]
    totalRating?: number | null
    genres?: GameCreategenresInput | string[]
    developers?: GameCreatedevelopersInput | string[]
    publishers?: GameCreatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    videos?: GameCreatevideosInput | string[]
    deals?: DealUncheckedCreateNestedManyWithoutGameInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutGameInput
    wishlistedBy?: WishlistUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutWishlist_deal_notificationsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutWishlist_deal_notificationsInput, GameUncheckedCreateWithoutWishlist_deal_notificationsInput>
  }

  export type UserCreateWithoutWishlist_deal_notificationsInput = {
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    userGames?: UserGameCreateNestedManyWithoutUserInput
    wishlistItems?: WishlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWishlist_deal_notificationsInput = {
    id?: number
    supabase_uid: string
    display_name?: string | null
    xp?: number
    level?: number
    credits?: number
    steamId?: string | null
    epicConnect?: boolean | null
    gogConnect?: boolean | null
    emailNotifications?: boolean
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    userGames?: UserGameUncheckedCreateNestedManyWithoutUserInput
    wishlistItems?: WishlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWishlist_deal_notificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWishlist_deal_notificationsInput, UserUncheckedCreateWithoutWishlist_deal_notificationsInput>
  }

  export type DealUpsertWithoutWishlist_deal_notificationsInput = {
    update: XOR<DealUpdateWithoutWishlist_deal_notificationsInput, DealUncheckedUpdateWithoutWishlist_deal_notificationsInput>
    create: XOR<DealCreateWithoutWishlist_deal_notificationsInput, DealUncheckedCreateWithoutWishlist_deal_notificationsInput>
    where?: DealWhereInput
  }

  export type DealUpdateToOneWithWhereWithoutWishlist_deal_notificationsInput = {
    where?: DealWhereInput
    data: XOR<DealUpdateWithoutWishlist_deal_notificationsInput, DealUncheckedUpdateWithoutWishlist_deal_notificationsInput>
  }

  export type DealUpdateWithoutWishlist_deal_notificationsInput = {
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
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    thumb?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    game?: GameUpdateOneWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateWithoutWishlist_deal_notificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: NullableIntFieldUpdateOperationsInput | number | null
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
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    thumb?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type GameUpsertWithoutWishlist_deal_notificationsInput = {
    update: XOR<GameUpdateWithoutWishlist_deal_notificationsInput, GameUncheckedUpdateWithoutWishlist_deal_notificationsInput>
    create: XOR<GameCreateWithoutWishlist_deal_notificationsInput, GameUncheckedCreateWithoutWishlist_deal_notificationsInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutWishlist_deal_notificationsInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutWishlist_deal_notificationsInput, GameUncheckedUpdateWithoutWishlist_deal_notificationsInput>
  }

  export type GameUpdateWithoutWishlist_deal_notificationsInput = {
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
    deals?: DealUpdateManyWithoutGameNestedInput
    userGames?: UserGameUpdateManyWithoutGameNestedInput
    wishlistedBy?: WishlistUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutWishlist_deal_notificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    igdbId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    storyline?: NullableStringFieldUpdateOperationsInput | string | null
    firstReleaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    screenshots?: GameUpdatescreenshotsInput | string[]
    totalRating?: NullableFloatFieldUpdateOperationsInput | number | null
    genres?: GameUpdategenresInput | string[]
    developers?: GameUpdatedevelopersInput | string[]
    publishers?: GameUpdatepublishersInput | string[]
    websites?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    videos?: GameUpdatevideosInput | string[]
    deals?: DealUncheckedUpdateManyWithoutGameNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutGameNestedInput
    wishlistedBy?: WishlistUncheckedUpdateManyWithoutGameNestedInput
  }

  export type UserUpsertWithoutWishlist_deal_notificationsInput = {
    update: XOR<UserUpdateWithoutWishlist_deal_notificationsInput, UserUncheckedUpdateWithoutWishlist_deal_notificationsInput>
    create: XOR<UserCreateWithoutWishlist_deal_notificationsInput, UserUncheckedCreateWithoutWishlist_deal_notificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWishlist_deal_notificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWishlist_deal_notificationsInput, UserUncheckedUpdateWithoutWishlist_deal_notificationsInput>
  }

  export type UserUpdateWithoutWishlist_deal_notificationsInput = {
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    userGames?: UserGameUpdateManyWithoutUserNestedInput
    wishlistItems?: WishlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWishlist_deal_notificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabase_uid?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    steamId?: NullableStringFieldUpdateOperationsInput | string | null
    epicConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gogConnect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    userGames?: UserGameUncheckedUpdateManyWithoutUserNestedInput
    wishlistItems?: WishlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MessageCreateManyReceiverInput = {
    id?: number
    senderId?: number | null
    text: string
    media?: string | null
    createdAt?: Date | string
    isRead?: boolean
  }

  export type MessageCreateManySenderInput = {
    id?: number
    receiverId: number
    text: string
    media?: string | null
    createdAt?: Date | string
    isRead?: boolean
  }

  export type UserGameCreateManyUserInput = {
    id?: number
    gameId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    isFavorite?: boolean
    notes?: string | null
    platformDRMs?: UserGameCreateplatformDRMsInput | number[]
  }

  export type wishlist_deal_notificationsCreateManyUsersInput = {
    id?: number
    gameId: number
    dealId: number
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type WishlistCreateManyUserInput = {
    id?: number
    gameId: number
    addedAt?: Date | string
  }

  export type MessageUpdateWithoutReceiverInput = {
    text?: StringFieldUpdateOperationsInput | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    sender?: UserUpdateOneWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: NullableIntFieldUpdateOperationsInput | number | null
    text?: StringFieldUpdateOperationsInput | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: NullableIntFieldUpdateOperationsInput | number | null
    text?: StringFieldUpdateOperationsInput | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUpdateWithoutSenderInput = {
    text?: StringFieldUpdateOperationsInput | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserGameUpdateWithoutUserInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    platformDRMs?: UserGameUpdateplatformDRMsInput | number[]
    game?: GameUpdateOneRequiredWithoutUserGamesNestedInput
  }

  export type UserGameUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    platformDRMs?: UserGameUpdateplatformDRMsInput | number[]
  }

  export type UserGameUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    platformDRMs?: UserGameUpdateplatformDRMsInput | number[]
  }

  export type wishlist_deal_notificationsUpdateWithoutUsersInput = {
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput
    games?: GameUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput
  }

  export type wishlist_deal_notificationsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    dealId?: IntFieldUpdateOperationsInput | number
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type wishlist_deal_notificationsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    dealId?: IntFieldUpdateOperationsInput | number
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    externalId?: string | null
    source?: string | null
    thumb?: string | null
    rating?: number | null
  }

  export type UserGameCreateManyGameInput = {
    id?: number
    userId: number
    addedAt?: Date | string
    playtimeMinutes?: number | null
    lastPlayed?: Date | string | null
    isInstalled?: boolean
    isFavorite?: boolean
    notes?: string | null
    platformDRMs?: UserGameCreateplatformDRMsInput | number[]
  }

  export type wishlist_deal_notificationsCreateManyGamesInput = {
    id?: number
    userId: number
    dealId: number
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
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
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    thumb?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    wishlist_deal_notifications?: wishlist_deal_notificationsUpdateManyWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
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
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    thumb?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    wishlist_deal_notifications?: wishlist_deal_notificationsUncheckedUpdateManyWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
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
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    thumb?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UserGameUpdateWithoutGameInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    platformDRMs?: UserGameUpdateplatformDRMsInput | number[]
    user?: UserUpdateOneRequiredWithoutUserGamesNestedInput
  }

  export type UserGameUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    platformDRMs?: UserGameUpdateplatformDRMsInput | number[]
  }

  export type UserGameUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playtimeMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    lastPlayed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isInstalled?: BoolFieldUpdateOperationsInput | boolean
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    platformDRMs?: UserGameUpdateplatformDRMsInput | number[]
  }

  export type wishlist_deal_notificationsUpdateWithoutGamesInput = {
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput
    users?: UserUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput
  }

  export type wishlist_deal_notificationsUncheckedUpdateWithoutGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    dealId?: IntFieldUpdateOperationsInput | number
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type wishlist_deal_notificationsUncheckedUpdateManyWithoutGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    dealId?: IntFieldUpdateOperationsInput | number
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type wishlist_deal_notificationsCreateManyDealsInput = {
    id?: number
    userId: number
    gameId: number
    notificationSent?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type wishlist_deal_notificationsUpdateWithoutDealsInput = {
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    games?: GameUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput
    users?: UserUpdateOneRequiredWithoutWishlist_deal_notificationsNestedInput
  }

  export type wishlist_deal_notificationsUncheckedUpdateWithoutDealsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type wishlist_deal_notificationsUncheckedUpdateManyWithoutDealsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
