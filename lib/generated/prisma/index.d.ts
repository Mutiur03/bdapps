
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
 * Model Investor
 * 
 */
export type Investor = $Result.DefaultSelection<Prisma.$InvestorPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectMember
 * 
 */
export type ProjectMember = $Result.DefaultSelection<Prisma.$ProjectMemberPayload>
/**
 * Model ProjectInvestor
 * 
 */
export type ProjectInvestor = $Result.DefaultSelection<Prisma.$ProjectInvestorPayload>
/**
 * Model Investment
 * 
 */
export type Investment = $Result.DefaultSelection<Prisma.$InvestmentPayload>
/**
 * Model Milestone
 * 
 */
export type Milestone = $Result.DefaultSelection<Prisma.$MilestonePayload>

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
   * `prisma.investor`: Exposes CRUD operations for the **Investor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Investors
    * const investors = await prisma.investor.findMany()
    * ```
    */
  get investor(): Prisma.InvestorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectMember`: Exposes CRUD operations for the **ProjectMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectMembers
    * const projectMembers = await prisma.projectMember.findMany()
    * ```
    */
  get projectMember(): Prisma.ProjectMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectInvestor`: Exposes CRUD operations for the **ProjectInvestor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectInvestors
    * const projectInvestors = await prisma.projectInvestor.findMany()
    * ```
    */
  get projectInvestor(): Prisma.ProjectInvestorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.investment`: Exposes CRUD operations for the **Investment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Investments
    * const investments = await prisma.investment.findMany()
    * ```
    */
  get investment(): Prisma.InvestmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.milestone`: Exposes CRUD operations for the **Milestone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Milestones
    * const milestones = await prisma.milestone.findMany()
    * ```
    */
  get milestone(): Prisma.MilestoneDelegate<ExtArgs, ClientOptions>;
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
    Investor: 'Investor',
    Project: 'Project',
    ProjectMember: 'ProjectMember',
    ProjectInvestor: 'ProjectInvestor',
    Investment: 'Investment',
    Milestone: 'Milestone'
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
      modelProps: "user" | "investor" | "project" | "projectMember" | "projectInvestor" | "investment" | "milestone"
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
      Investor: {
        payload: Prisma.$InvestorPayload<ExtArgs>
        fields: Prisma.InvestorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvestorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvestorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>
          }
          findFirst: {
            args: Prisma.InvestorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvestorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>
          }
          findMany: {
            args: Prisma.InvestorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>[]
          }
          create: {
            args: Prisma.InvestorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>
          }
          createMany: {
            args: Prisma.InvestorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvestorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>[]
          }
          delete: {
            args: Prisma.InvestorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>
          }
          update: {
            args: Prisma.InvestorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>
          }
          deleteMany: {
            args: Prisma.InvestorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvestorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvestorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>[]
          }
          upsert: {
            args: Prisma.InvestorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>
          }
          aggregate: {
            args: Prisma.InvestorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvestor>
          }
          groupBy: {
            args: Prisma.InvestorGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvestorGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvestorCountArgs<ExtArgs>
            result: $Utils.Optional<InvestorCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectMember: {
        payload: Prisma.$ProjectMemberPayload<ExtArgs>
        fields: Prisma.ProjectMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          findFirst: {
            args: Prisma.ProjectMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          findMany: {
            args: Prisma.ProjectMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>[]
          }
          create: {
            args: Prisma.ProjectMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          createMany: {
            args: Prisma.ProjectMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>[]
          }
          delete: {
            args: Prisma.ProjectMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          update: {
            args: Prisma.ProjectMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          deleteMany: {
            args: Prisma.ProjectMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>[]
          }
          upsert: {
            args: Prisma.ProjectMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          aggregate: {
            args: Prisma.ProjectMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectMember>
          }
          groupBy: {
            args: Prisma.ProjectMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectMemberCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectMemberCountAggregateOutputType> | number
          }
        }
      }
      ProjectInvestor: {
        payload: Prisma.$ProjectInvestorPayload<ExtArgs>
        fields: Prisma.ProjectInvestorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectInvestorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectInvestorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload>
          }
          findFirst: {
            args: Prisma.ProjectInvestorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectInvestorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload>
          }
          findMany: {
            args: Prisma.ProjectInvestorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload>[]
          }
          create: {
            args: Prisma.ProjectInvestorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload>
          }
          createMany: {
            args: Prisma.ProjectInvestorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectInvestorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload>[]
          }
          delete: {
            args: Prisma.ProjectInvestorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload>
          }
          update: {
            args: Prisma.ProjectInvestorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload>
          }
          deleteMany: {
            args: Prisma.ProjectInvestorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectInvestorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectInvestorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload>[]
          }
          upsert: {
            args: Prisma.ProjectInvestorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvestorPayload>
          }
          aggregate: {
            args: Prisma.ProjectInvestorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectInvestor>
          }
          groupBy: {
            args: Prisma.ProjectInvestorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectInvestorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectInvestorCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectInvestorCountAggregateOutputType> | number
          }
        }
      }
      Investment: {
        payload: Prisma.$InvestmentPayload<ExtArgs>
        fields: Prisma.InvestmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvestmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvestmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          findFirst: {
            args: Prisma.InvestmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvestmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          findMany: {
            args: Prisma.InvestmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>[]
          }
          create: {
            args: Prisma.InvestmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          createMany: {
            args: Prisma.InvestmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvestmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>[]
          }
          delete: {
            args: Prisma.InvestmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          update: {
            args: Prisma.InvestmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          deleteMany: {
            args: Prisma.InvestmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvestmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvestmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>[]
          }
          upsert: {
            args: Prisma.InvestmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          aggregate: {
            args: Prisma.InvestmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvestment>
          }
          groupBy: {
            args: Prisma.InvestmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvestmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvestmentCountArgs<ExtArgs>
            result: $Utils.Optional<InvestmentCountAggregateOutputType> | number
          }
        }
      }
      Milestone: {
        payload: Prisma.$MilestonePayload<ExtArgs>
        fields: Prisma.MilestoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MilestoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MilestoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          findFirst: {
            args: Prisma.MilestoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MilestoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          findMany: {
            args: Prisma.MilestoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          create: {
            args: Prisma.MilestoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          createMany: {
            args: Prisma.MilestoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MilestoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          delete: {
            args: Prisma.MilestoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          update: {
            args: Prisma.MilestoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          deleteMany: {
            args: Prisma.MilestoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MilestoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MilestoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          upsert: {
            args: Prisma.MilestoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          aggregate: {
            args: Prisma.MilestoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMilestone>
          }
          groupBy: {
            args: Prisma.MilestoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<MilestoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.MilestoneCountArgs<ExtArgs>
            result: $Utils.Optional<MilestoneCountAggregateOutputType> | number
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
    investor?: InvestorOmit
    project?: ProjectOmit
    projectMember?: ProjectMemberOmit
    projectInvestor?: ProjectInvestorOmit
    investment?: InvestmentOmit
    milestone?: MilestoneOmit
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
    projectMembers: number
    Project: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectMembers?: boolean | UserCountOutputTypeCountProjectMembersArgs
    Project?: boolean | UserCountOutputTypeCountProjectArgs
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
  export type UserCountOutputTypeCountProjectMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type InvestorCountOutputType
   */

  export type InvestorCountOutputType = {
    projectInvestors: number
    investments: number
  }

  export type InvestorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectInvestors?: boolean | InvestorCountOutputTypeCountProjectInvestorsArgs
    investments?: boolean | InvestorCountOutputTypeCountInvestmentsArgs
  }

  // Custom InputTypes
  /**
   * InvestorCountOutputType without action
   */
  export type InvestorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvestorCountOutputType
     */
    select?: InvestorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvestorCountOutputType without action
   */
  export type InvestorCountOutputTypeCountProjectInvestorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectInvestorWhereInput
  }

  /**
   * InvestorCountOutputType without action
   */
  export type InvestorCountOutputTypeCountInvestmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestmentWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    projectMembers: number
    projectInvestors: number
    investments: number
    milestones: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectMembers?: boolean | ProjectCountOutputTypeCountProjectMembersArgs
    projectInvestors?: boolean | ProjectCountOutputTypeCountProjectInvestorsArgs
    investments?: boolean | ProjectCountOutputTypeCountInvestmentsArgs
    milestones?: boolean | ProjectCountOutputTypeCountMilestonesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountProjectMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMemberWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountProjectInvestorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectInvestorWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountInvestmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestmentWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountMilestonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MilestoneWhereInput
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
    cgpa: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    cgpa: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    phone: string | null
    password: string | null
    name: string | null
    profile_picture: string | null
    university: string | null
    department: string | null
    year_of_study: string | null
    graduation_year: string | null
    cgpa: number | null
    student_id: string | null
    student_id_front: string | null
    student_id_back: string | null
    nid_front: string | null
    nid_back: string | null
    university_email: string | null
    date_of_birth: string | null
    address: string | null
    bio: string | null
    skills: string | null
    interests: string | null
    career_goals: string | null
    role: string | null
    isActivated: boolean | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    phone: string | null
    password: string | null
    name: string | null
    profile_picture: string | null
    university: string | null
    department: string | null
    year_of_study: string | null
    graduation_year: string | null
    cgpa: number | null
    student_id: string | null
    student_id_front: string | null
    student_id_back: string | null
    nid_front: string | null
    nid_back: string | null
    university_email: string | null
    date_of_birth: string | null
    address: string | null
    bio: string | null
    skills: string | null
    interests: string | null
    career_goals: string | null
    role: string | null
    isActivated: boolean | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    phone: number
    password: number
    name: number
    profile_picture: number
    university: number
    department: number
    year_of_study: number
    graduation_year: number
    cgpa: number
    student_id: number
    student_id_front: number
    student_id_back: number
    nid_front: number
    nid_back: number
    university_email: number
    date_of_birth: number
    address: number
    bio: number
    skills: number
    interests: number
    social_links: number
    career_goals: number
    role: number
    isActivated: number
    isVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    cgpa?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    cgpa?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    phone?: true
    password?: true
    name?: true
    profile_picture?: true
    university?: true
    department?: true
    year_of_study?: true
    graduation_year?: true
    cgpa?: true
    student_id?: true
    student_id_front?: true
    student_id_back?: true
    nid_front?: true
    nid_back?: true
    university_email?: true
    date_of_birth?: true
    address?: true
    bio?: true
    skills?: true
    interests?: true
    career_goals?: true
    role?: true
    isActivated?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    phone?: true
    password?: true
    name?: true
    profile_picture?: true
    university?: true
    department?: true
    year_of_study?: true
    graduation_year?: true
    cgpa?: true
    student_id?: true
    student_id_front?: true
    student_id_back?: true
    nid_front?: true
    nid_back?: true
    university_email?: true
    date_of_birth?: true
    address?: true
    bio?: true
    skills?: true
    interests?: true
    career_goals?: true
    role?: true
    isActivated?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    phone?: true
    password?: true
    name?: true
    profile_picture?: true
    university?: true
    department?: true
    year_of_study?: true
    graduation_year?: true
    cgpa?: true
    student_id?: true
    student_id_front?: true
    student_id_back?: true
    nid_front?: true
    nid_back?: true
    university_email?: true
    date_of_birth?: true
    address?: true
    bio?: true
    skills?: true
    interests?: true
    social_links?: true
    career_goals?: true
    role?: true
    isActivated?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
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
    phone: string
    password: string
    name: string | null
    profile_picture: string | null
    university: string | null
    department: string | null
    year_of_study: string | null
    graduation_year: string | null
    cgpa: number | null
    student_id: string | null
    student_id_front: string | null
    student_id_back: string | null
    nid_front: string | null
    nid_back: string | null
    university_email: string | null
    date_of_birth: string | null
    address: string | null
    bio: string | null
    skills: string | null
    interests: string | null
    social_links: JsonValue | null
    career_goals: string | null
    role: string
    isActivated: boolean
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
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
    phone?: boolean
    password?: boolean
    name?: boolean
    profile_picture?: boolean
    university?: boolean
    department?: boolean
    year_of_study?: boolean
    graduation_year?: boolean
    cgpa?: boolean
    student_id?: boolean
    student_id_front?: boolean
    student_id_back?: boolean
    nid_front?: boolean
    nid_back?: boolean
    university_email?: boolean
    date_of_birth?: boolean
    address?: boolean
    bio?: boolean
    skills?: boolean
    interests?: boolean
    social_links?: boolean
    career_goals?: boolean
    role?: boolean
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectMembers?: boolean | User$projectMembersArgs<ExtArgs>
    Project?: boolean | User$ProjectArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    password?: boolean
    name?: boolean
    profile_picture?: boolean
    university?: boolean
    department?: boolean
    year_of_study?: boolean
    graduation_year?: boolean
    cgpa?: boolean
    student_id?: boolean
    student_id_front?: boolean
    student_id_back?: boolean
    nid_front?: boolean
    nid_back?: boolean
    university_email?: boolean
    date_of_birth?: boolean
    address?: boolean
    bio?: boolean
    skills?: boolean
    interests?: boolean
    social_links?: boolean
    career_goals?: boolean
    role?: boolean
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    password?: boolean
    name?: boolean
    profile_picture?: boolean
    university?: boolean
    department?: boolean
    year_of_study?: boolean
    graduation_year?: boolean
    cgpa?: boolean
    student_id?: boolean
    student_id_front?: boolean
    student_id_back?: boolean
    nid_front?: boolean
    nid_back?: boolean
    university_email?: boolean
    date_of_birth?: boolean
    address?: boolean
    bio?: boolean
    skills?: boolean
    interests?: boolean
    social_links?: boolean
    career_goals?: boolean
    role?: boolean
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    phone?: boolean
    password?: boolean
    name?: boolean
    profile_picture?: boolean
    university?: boolean
    department?: boolean
    year_of_study?: boolean
    graduation_year?: boolean
    cgpa?: boolean
    student_id?: boolean
    student_id_front?: boolean
    student_id_back?: boolean
    nid_front?: boolean
    nid_back?: boolean
    university_email?: boolean
    date_of_birth?: boolean
    address?: boolean
    bio?: boolean
    skills?: boolean
    interests?: boolean
    social_links?: boolean
    career_goals?: boolean
    role?: boolean
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phone" | "password" | "name" | "profile_picture" | "university" | "department" | "year_of_study" | "graduation_year" | "cgpa" | "student_id" | "student_id_front" | "student_id_back" | "nid_front" | "nid_back" | "university_email" | "date_of_birth" | "address" | "bio" | "skills" | "interests" | "social_links" | "career_goals" | "role" | "isActivated" | "isVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectMembers?: boolean | User$projectMembersArgs<ExtArgs>
    Project?: boolean | User$ProjectArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      projectMembers: Prisma.$ProjectMemberPayload<ExtArgs>[]
      Project: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      phone: string
      password: string
      name: string | null
      profile_picture: string | null
      university: string | null
      department: string | null
      year_of_study: string | null
      graduation_year: string | null
      cgpa: number | null
      student_id: string | null
      student_id_front: string | null
      student_id_back: string | null
      nid_front: string | null
      nid_back: string | null
      university_email: string | null
      date_of_birth: string | null
      address: string | null
      bio: string | null
      skills: string | null
      interests: string | null
      social_links: Prisma.JsonValue | null
      career_goals: string | null
      role: string
      isActivated: boolean
      isVerified: boolean
      createdAt: Date
      updatedAt: Date
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
    projectMembers<T extends User$projectMembersArgs<ExtArgs> = {}>(args?: Subset<T, User$projectMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Project<T extends User$ProjectArgs<ExtArgs> = {}>(args?: Subset<T, User$ProjectArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly profile_picture: FieldRef<"User", 'String'>
    readonly university: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'String'>
    readonly year_of_study: FieldRef<"User", 'String'>
    readonly graduation_year: FieldRef<"User", 'String'>
    readonly cgpa: FieldRef<"User", 'Float'>
    readonly student_id: FieldRef<"User", 'String'>
    readonly student_id_front: FieldRef<"User", 'String'>
    readonly student_id_back: FieldRef<"User", 'String'>
    readonly nid_front: FieldRef<"User", 'String'>
    readonly nid_back: FieldRef<"User", 'String'>
    readonly university_email: FieldRef<"User", 'String'>
    readonly date_of_birth: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly skills: FieldRef<"User", 'String'>
    readonly interests: FieldRef<"User", 'String'>
    readonly social_links: FieldRef<"User", 'Json'>
    readonly career_goals: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActivated: FieldRef<"User", 'Boolean'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
   * User.projectMembers
   */
  export type User$projectMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    where?: ProjectMemberWhereInput
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    cursor?: ProjectMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * User.Project
   */
  export type User$ProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
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
   * Model Investor
   */

  export type AggregateInvestor = {
    _count: InvestorCountAggregateOutputType | null
    _avg: InvestorAvgAggregateOutputType | null
    _sum: InvestorSumAggregateOutputType | null
    _min: InvestorMinAggregateOutputType | null
    _max: InvestorMaxAggregateOutputType | null
  }

  export type InvestorAvgAggregateOutputType = {
    id: number | null
  }

  export type InvestorSumAggregateOutputType = {
    id: number | null
  }

  export type InvestorMinAggregateOutputType = {
    id: number | null
    email: string | null
    phone: string | null
    password: string | null
    name: string | null
    profile_picture: string | null
    company_name: string | null
    company_website: string | null
    company_description: string | null
    role: string | null
    isActivated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvestorMaxAggregateOutputType = {
    id: number | null
    email: string | null
    phone: string | null
    password: string | null
    name: string | null
    profile_picture: string | null
    company_name: string | null
    company_website: string | null
    company_description: string | null
    role: string | null
    isActivated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvestorCountAggregateOutputType = {
    id: number
    email: number
    phone: number
    password: number
    name: number
    profile_picture: number
    company_name: number
    company_website: number
    company_description: number
    role: number
    isActivated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvestorAvgAggregateInputType = {
    id?: true
  }

  export type InvestorSumAggregateInputType = {
    id?: true
  }

  export type InvestorMinAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    password?: true
    name?: true
    profile_picture?: true
    company_name?: true
    company_website?: true
    company_description?: true
    role?: true
    isActivated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvestorMaxAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    password?: true
    name?: true
    profile_picture?: true
    company_name?: true
    company_website?: true
    company_description?: true
    role?: true
    isActivated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvestorCountAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    password?: true
    name?: true
    profile_picture?: true
    company_name?: true
    company_website?: true
    company_description?: true
    role?: true
    isActivated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvestorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investor to aggregate.
     */
    where?: InvestorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investors to fetch.
     */
    orderBy?: InvestorOrderByWithRelationInput | InvestorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvestorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Investors
    **/
    _count?: true | InvestorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvestorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvestorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvestorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvestorMaxAggregateInputType
  }

  export type GetInvestorAggregateType<T extends InvestorAggregateArgs> = {
        [P in keyof T & keyof AggregateInvestor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvestor[P]>
      : GetScalarType<T[P], AggregateInvestor[P]>
  }




  export type InvestorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestorWhereInput
    orderBy?: InvestorOrderByWithAggregationInput | InvestorOrderByWithAggregationInput[]
    by: InvestorScalarFieldEnum[] | InvestorScalarFieldEnum
    having?: InvestorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvestorCountAggregateInputType | true
    _avg?: InvestorAvgAggregateInputType
    _sum?: InvestorSumAggregateInputType
    _min?: InvestorMinAggregateInputType
    _max?: InvestorMaxAggregateInputType
  }

  export type InvestorGroupByOutputType = {
    id: number
    email: string | null
    phone: string | null
    password: string
    name: string | null
    profile_picture: string | null
    company_name: string | null
    company_website: string | null
    company_description: string | null
    role: string
    isActivated: boolean
    createdAt: Date
    updatedAt: Date
    _count: InvestorCountAggregateOutputType | null
    _avg: InvestorAvgAggregateOutputType | null
    _sum: InvestorSumAggregateOutputType | null
    _min: InvestorMinAggregateOutputType | null
    _max: InvestorMaxAggregateOutputType | null
  }

  type GetInvestorGroupByPayload<T extends InvestorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvestorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvestorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvestorGroupByOutputType[P]>
            : GetScalarType<T[P], InvestorGroupByOutputType[P]>
        }
      >
    >


  export type InvestorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    name?: boolean
    profile_picture?: boolean
    company_name?: boolean
    company_website?: boolean
    company_description?: boolean
    role?: boolean
    isActivated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectInvestors?: boolean | Investor$projectInvestorsArgs<ExtArgs>
    investments?: boolean | Investor$investmentsArgs<ExtArgs>
    _count?: boolean | InvestorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investor"]>

  export type InvestorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    name?: boolean
    profile_picture?: boolean
    company_name?: boolean
    company_website?: boolean
    company_description?: boolean
    role?: boolean
    isActivated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["investor"]>

  export type InvestorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    name?: boolean
    profile_picture?: boolean
    company_name?: boolean
    company_website?: boolean
    company_description?: boolean
    role?: boolean
    isActivated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["investor"]>

  export type InvestorSelectScalar = {
    id?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    name?: boolean
    profile_picture?: boolean
    company_name?: boolean
    company_website?: boolean
    company_description?: boolean
    role?: boolean
    isActivated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvestorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "phone" | "password" | "name" | "profile_picture" | "company_name" | "company_website" | "company_description" | "role" | "isActivated" | "createdAt" | "updatedAt", ExtArgs["result"]["investor"]>
  export type InvestorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectInvestors?: boolean | Investor$projectInvestorsArgs<ExtArgs>
    investments?: boolean | Investor$investmentsArgs<ExtArgs>
    _count?: boolean | InvestorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InvestorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type InvestorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $InvestorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Investor"
    objects: {
      projectInvestors: Prisma.$ProjectInvestorPayload<ExtArgs>[]
      investments: Prisma.$InvestmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string | null
      phone: string | null
      password: string
      name: string | null
      profile_picture: string | null
      company_name: string | null
      company_website: string | null
      company_description: string | null
      role: string
      isActivated: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["investor"]>
    composites: {}
  }

  type InvestorGetPayload<S extends boolean | null | undefined | InvestorDefaultArgs> = $Result.GetResult<Prisma.$InvestorPayload, S>

  type InvestorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvestorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvestorCountAggregateInputType | true
    }

  export interface InvestorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Investor'], meta: { name: 'Investor' } }
    /**
     * Find zero or one Investor that matches the filter.
     * @param {InvestorFindUniqueArgs} args - Arguments to find a Investor
     * @example
     * // Get one Investor
     * const investor = await prisma.investor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvestorFindUniqueArgs>(args: SelectSubset<T, InvestorFindUniqueArgs<ExtArgs>>): Prisma__InvestorClient<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Investor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvestorFindUniqueOrThrowArgs} args - Arguments to find a Investor
     * @example
     * // Get one Investor
     * const investor = await prisma.investor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvestorFindUniqueOrThrowArgs>(args: SelectSubset<T, InvestorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvestorClient<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorFindFirstArgs} args - Arguments to find a Investor
     * @example
     * // Get one Investor
     * const investor = await prisma.investor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvestorFindFirstArgs>(args?: SelectSubset<T, InvestorFindFirstArgs<ExtArgs>>): Prisma__InvestorClient<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorFindFirstOrThrowArgs} args - Arguments to find a Investor
     * @example
     * // Get one Investor
     * const investor = await prisma.investor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvestorFindFirstOrThrowArgs>(args?: SelectSubset<T, InvestorFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvestorClient<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Investors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Investors
     * const investors = await prisma.investor.findMany()
     * 
     * // Get first 10 Investors
     * const investors = await prisma.investor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const investorWithIdOnly = await prisma.investor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvestorFindManyArgs>(args?: SelectSubset<T, InvestorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Investor.
     * @param {InvestorCreateArgs} args - Arguments to create a Investor.
     * @example
     * // Create one Investor
     * const Investor = await prisma.investor.create({
     *   data: {
     *     // ... data to create a Investor
     *   }
     * })
     * 
     */
    create<T extends InvestorCreateArgs>(args: SelectSubset<T, InvestorCreateArgs<ExtArgs>>): Prisma__InvestorClient<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Investors.
     * @param {InvestorCreateManyArgs} args - Arguments to create many Investors.
     * @example
     * // Create many Investors
     * const investor = await prisma.investor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvestorCreateManyArgs>(args?: SelectSubset<T, InvestorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Investors and returns the data saved in the database.
     * @param {InvestorCreateManyAndReturnArgs} args - Arguments to create many Investors.
     * @example
     * // Create many Investors
     * const investor = await prisma.investor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Investors and only return the `id`
     * const investorWithIdOnly = await prisma.investor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvestorCreateManyAndReturnArgs>(args?: SelectSubset<T, InvestorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Investor.
     * @param {InvestorDeleteArgs} args - Arguments to delete one Investor.
     * @example
     * // Delete one Investor
     * const Investor = await prisma.investor.delete({
     *   where: {
     *     // ... filter to delete one Investor
     *   }
     * })
     * 
     */
    delete<T extends InvestorDeleteArgs>(args: SelectSubset<T, InvestorDeleteArgs<ExtArgs>>): Prisma__InvestorClient<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Investor.
     * @param {InvestorUpdateArgs} args - Arguments to update one Investor.
     * @example
     * // Update one Investor
     * const investor = await prisma.investor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvestorUpdateArgs>(args: SelectSubset<T, InvestorUpdateArgs<ExtArgs>>): Prisma__InvestorClient<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Investors.
     * @param {InvestorDeleteManyArgs} args - Arguments to filter Investors to delete.
     * @example
     * // Delete a few Investors
     * const { count } = await prisma.investor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvestorDeleteManyArgs>(args?: SelectSubset<T, InvestorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Investors
     * const investor = await prisma.investor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvestorUpdateManyArgs>(args: SelectSubset<T, InvestorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investors and returns the data updated in the database.
     * @param {InvestorUpdateManyAndReturnArgs} args - Arguments to update many Investors.
     * @example
     * // Update many Investors
     * const investor = await prisma.investor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Investors and only return the `id`
     * const investorWithIdOnly = await prisma.investor.updateManyAndReturn({
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
    updateManyAndReturn<T extends InvestorUpdateManyAndReturnArgs>(args: SelectSubset<T, InvestorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Investor.
     * @param {InvestorUpsertArgs} args - Arguments to update or create a Investor.
     * @example
     * // Update or create a Investor
     * const investor = await prisma.investor.upsert({
     *   create: {
     *     // ... data to create a Investor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Investor we want to update
     *   }
     * })
     */
    upsert<T extends InvestorUpsertArgs>(args: SelectSubset<T, InvestorUpsertArgs<ExtArgs>>): Prisma__InvestorClient<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Investors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorCountArgs} args - Arguments to filter Investors to count.
     * @example
     * // Count the number of Investors
     * const count = await prisma.investor.count({
     *   where: {
     *     // ... the filter for the Investors we want to count
     *   }
     * })
    **/
    count<T extends InvestorCountArgs>(
      args?: Subset<T, InvestorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvestorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Investor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InvestorAggregateArgs>(args: Subset<T, InvestorAggregateArgs>): Prisma.PrismaPromise<GetInvestorAggregateType<T>>

    /**
     * Group by Investor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorGroupByArgs} args - Group by arguments.
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
      T extends InvestorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvestorGroupByArgs['orderBy'] }
        : { orderBy?: InvestorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InvestorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvestorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Investor model
   */
  readonly fields: InvestorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Investor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvestorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projectInvestors<T extends Investor$projectInvestorsArgs<ExtArgs> = {}>(args?: Subset<T, Investor$projectInvestorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    investments<T extends Investor$investmentsArgs<ExtArgs> = {}>(args?: Subset<T, Investor$investmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Investor model
   */
  interface InvestorFieldRefs {
    readonly id: FieldRef<"Investor", 'Int'>
    readonly email: FieldRef<"Investor", 'String'>
    readonly phone: FieldRef<"Investor", 'String'>
    readonly password: FieldRef<"Investor", 'String'>
    readonly name: FieldRef<"Investor", 'String'>
    readonly profile_picture: FieldRef<"Investor", 'String'>
    readonly company_name: FieldRef<"Investor", 'String'>
    readonly company_website: FieldRef<"Investor", 'String'>
    readonly company_description: FieldRef<"Investor", 'String'>
    readonly role: FieldRef<"Investor", 'String'>
    readonly isActivated: FieldRef<"Investor", 'Boolean'>
    readonly createdAt: FieldRef<"Investor", 'DateTime'>
    readonly updatedAt: FieldRef<"Investor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Investor findUnique
   */
  export type InvestorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null
    /**
     * Filter, which Investor to fetch.
     */
    where: InvestorWhereUniqueInput
  }

  /**
   * Investor findUniqueOrThrow
   */
  export type InvestorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null
    /**
     * Filter, which Investor to fetch.
     */
    where: InvestorWhereUniqueInput
  }

  /**
   * Investor findFirst
   */
  export type InvestorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null
    /**
     * Filter, which Investor to fetch.
     */
    where?: InvestorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investors to fetch.
     */
    orderBy?: InvestorOrderByWithRelationInput | InvestorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investors.
     */
    cursor?: InvestorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investors.
     */
    distinct?: InvestorScalarFieldEnum | InvestorScalarFieldEnum[]
  }

  /**
   * Investor findFirstOrThrow
   */
  export type InvestorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null
    /**
     * Filter, which Investor to fetch.
     */
    where?: InvestorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investors to fetch.
     */
    orderBy?: InvestorOrderByWithRelationInput | InvestorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investors.
     */
    cursor?: InvestorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investors.
     */
    distinct?: InvestorScalarFieldEnum | InvestorScalarFieldEnum[]
  }

  /**
   * Investor findMany
   */
  export type InvestorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null
    /**
     * Filter, which Investors to fetch.
     */
    where?: InvestorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investors to fetch.
     */
    orderBy?: InvestorOrderByWithRelationInput | InvestorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Investors.
     */
    cursor?: InvestorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investors.
     */
    skip?: number
    distinct?: InvestorScalarFieldEnum | InvestorScalarFieldEnum[]
  }

  /**
   * Investor create
   */
  export type InvestorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null
    /**
     * The data needed to create a Investor.
     */
    data: XOR<InvestorCreateInput, InvestorUncheckedCreateInput>
  }

  /**
   * Investor createMany
   */
  export type InvestorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Investors.
     */
    data: InvestorCreateManyInput | InvestorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Investor createManyAndReturn
   */
  export type InvestorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * The data used to create many Investors.
     */
    data: InvestorCreateManyInput | InvestorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Investor update
   */
  export type InvestorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null
    /**
     * The data needed to update a Investor.
     */
    data: XOR<InvestorUpdateInput, InvestorUncheckedUpdateInput>
    /**
     * Choose, which Investor to update.
     */
    where: InvestorWhereUniqueInput
  }

  /**
   * Investor updateMany
   */
  export type InvestorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Investors.
     */
    data: XOR<InvestorUpdateManyMutationInput, InvestorUncheckedUpdateManyInput>
    /**
     * Filter which Investors to update
     */
    where?: InvestorWhereInput
    /**
     * Limit how many Investors to update.
     */
    limit?: number
  }

  /**
   * Investor updateManyAndReturn
   */
  export type InvestorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * The data used to update Investors.
     */
    data: XOR<InvestorUpdateManyMutationInput, InvestorUncheckedUpdateManyInput>
    /**
     * Filter which Investors to update
     */
    where?: InvestorWhereInput
    /**
     * Limit how many Investors to update.
     */
    limit?: number
  }

  /**
   * Investor upsert
   */
  export type InvestorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null
    /**
     * The filter to search for the Investor to update in case it exists.
     */
    where: InvestorWhereUniqueInput
    /**
     * In case the Investor found by the `where` argument doesn't exist, create a new Investor with this data.
     */
    create: XOR<InvestorCreateInput, InvestorUncheckedCreateInput>
    /**
     * In case the Investor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvestorUpdateInput, InvestorUncheckedUpdateInput>
  }

  /**
   * Investor delete
   */
  export type InvestorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null
    /**
     * Filter which Investor to delete.
     */
    where: InvestorWhereUniqueInput
  }

  /**
   * Investor deleteMany
   */
  export type InvestorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investors to delete
     */
    where?: InvestorWhereInput
    /**
     * Limit how many Investors to delete.
     */
    limit?: number
  }

  /**
   * Investor.projectInvestors
   */
  export type Investor$projectInvestorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    where?: ProjectInvestorWhereInput
    orderBy?: ProjectInvestorOrderByWithRelationInput | ProjectInvestorOrderByWithRelationInput[]
    cursor?: ProjectInvestorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectInvestorScalarFieldEnum | ProjectInvestorScalarFieldEnum[]
  }

  /**
   * Investor.investments
   */
  export type Investor$investmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    where?: InvestmentWhereInput
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    cursor?: InvestmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Investor without action
   */
  export type InvestorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    budget: number | null
    raised_amount: number | null
  }

  export type ProjectSumAggregateOutputType = {
    id: number | null
    userId: number | null
    budget: number | null
    raised_amount: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    description: string | null
    category: string | null
    budget: number | null
    raised_amount: number | null
    status: string | null
    profile_picture: string | null
    cover_image: string | null
    pitch_video: string | null
    tags: string | null
    location: string | null
    start_date: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    description: string | null
    category: string | null
    budget: number | null
    raised_amount: number | null
    status: string | null
    profile_picture: string | null
    cover_image: string | null
    pitch_video: string | null
    tags: string | null
    location: string | null
    start_date: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    category: number
    budget: number
    raised_amount: number
    status: number
    profile_picture: number
    cover_image: number
    pitch_video: number
    documents: number
    tags: number
    location: number
    start_date: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    id?: true
    userId?: true
    budget?: true
    raised_amount?: true
  }

  export type ProjectSumAggregateInputType = {
    id?: true
    userId?: true
    budget?: true
    raised_amount?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    category?: true
    budget?: true
    raised_amount?: true
    status?: true
    profile_picture?: true
    cover_image?: true
    pitch_video?: true
    tags?: true
    location?: true
    start_date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    category?: true
    budget?: true
    raised_amount?: true
    status?: true
    profile_picture?: true
    cover_image?: true
    pitch_video?: true
    tags?: true
    location?: true
    start_date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    category?: true
    budget?: true
    raised_amount?: true
    status?: true
    profile_picture?: true
    cover_image?: true
    pitch_video?: true
    documents?: true
    tags?: true
    location?: true
    start_date?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: number
    userId: number
    title: string
    description: string
    category: string
    budget: number
    raised_amount: number | null
    status: string
    profile_picture: string | null
    cover_image: string | null
    pitch_video: string | null
    documents: string[]
    tags: string | null
    location: string | null
    start_date: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    budget?: boolean
    raised_amount?: boolean
    status?: boolean
    profile_picture?: boolean
    cover_image?: boolean
    pitch_video?: boolean
    documents?: boolean
    tags?: boolean
    location?: boolean
    start_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    projectMembers?: boolean | Project$projectMembersArgs<ExtArgs>
    projectInvestors?: boolean | Project$projectInvestorsArgs<ExtArgs>
    investments?: boolean | Project$investmentsArgs<ExtArgs>
    milestones?: boolean | Project$milestonesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    budget?: boolean
    raised_amount?: boolean
    status?: boolean
    profile_picture?: boolean
    cover_image?: boolean
    pitch_video?: boolean
    documents?: boolean
    tags?: boolean
    location?: boolean
    start_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    budget?: boolean
    raised_amount?: boolean
    status?: boolean
    profile_picture?: boolean
    cover_image?: boolean
    pitch_video?: boolean
    documents?: boolean
    tags?: boolean
    location?: boolean
    start_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    budget?: boolean
    raised_amount?: boolean
    status?: boolean
    profile_picture?: boolean
    cover_image?: boolean
    pitch_video?: boolean
    documents?: boolean
    tags?: boolean
    location?: boolean
    start_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "description" | "category" | "budget" | "raised_amount" | "status" | "profile_picture" | "cover_image" | "pitch_video" | "documents" | "tags" | "location" | "start_date" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    projectMembers?: boolean | Project$projectMembersArgs<ExtArgs>
    projectInvestors?: boolean | Project$projectInvestorsArgs<ExtArgs>
    investments?: boolean | Project$investmentsArgs<ExtArgs>
    milestones?: boolean | Project$milestonesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      projectMembers: Prisma.$ProjectMemberPayload<ExtArgs>[]
      projectInvestors: Prisma.$ProjectInvestorPayload<ExtArgs>[]
      investments: Prisma.$InvestmentPayload<ExtArgs>[]
      milestones: Prisma.$MilestonePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      title: string
      description: string
      category: string
      budget: number
      raised_amount: number | null
      status: string
      profile_picture: string | null
      cover_image: string | null
      pitch_video: string | null
      documents: string[]
      tags: string | null
      location: string | null
      start_date: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
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
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    projectMembers<T extends Project$projectMembersArgs<ExtArgs> = {}>(args?: Subset<T, Project$projectMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projectInvestors<T extends Project$projectInvestorsArgs<ExtArgs> = {}>(args?: Subset<T, Project$projectInvestorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    investments<T extends Project$investmentsArgs<ExtArgs> = {}>(args?: Subset<T, Project$investmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    milestones<T extends Project$milestonesArgs<ExtArgs> = {}>(args?: Subset<T, Project$milestonesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'Int'>
    readonly userId: FieldRef<"Project", 'Int'>
    readonly title: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly category: FieldRef<"Project", 'String'>
    readonly budget: FieldRef<"Project", 'Float'>
    readonly raised_amount: FieldRef<"Project", 'Float'>
    readonly status: FieldRef<"Project", 'String'>
    readonly profile_picture: FieldRef<"Project", 'String'>
    readonly cover_image: FieldRef<"Project", 'String'>
    readonly pitch_video: FieldRef<"Project", 'String'>
    readonly documents: FieldRef<"Project", 'String[]'>
    readonly tags: FieldRef<"Project", 'String'>
    readonly location: FieldRef<"Project", 'String'>
    readonly start_date: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.projectMembers
   */
  export type Project$projectMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    where?: ProjectMemberWhereInput
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    cursor?: ProjectMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * Project.projectInvestors
   */
  export type Project$projectInvestorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    where?: ProjectInvestorWhereInput
    orderBy?: ProjectInvestorOrderByWithRelationInput | ProjectInvestorOrderByWithRelationInput[]
    cursor?: ProjectInvestorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectInvestorScalarFieldEnum | ProjectInvestorScalarFieldEnum[]
  }

  /**
   * Project.investments
   */
  export type Project$investmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    where?: InvestmentWhereInput
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    cursor?: InvestmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Project.milestones
   */
  export type Project$milestonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    where?: MilestoneWhereInput
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    cursor?: MilestoneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectMember
   */

  export type AggregateProjectMember = {
    _count: ProjectMemberCountAggregateOutputType | null
    _avg: ProjectMemberAvgAggregateOutputType | null
    _sum: ProjectMemberSumAggregateOutputType | null
    _min: ProjectMemberMinAggregateOutputType | null
    _max: ProjectMemberMaxAggregateOutputType | null
  }

  export type ProjectMemberAvgAggregateOutputType = {
    id: number | null
    projectId: number | null
    userId: number | null
  }

  export type ProjectMemberSumAggregateOutputType = {
    id: number | null
    projectId: number | null
    userId: number | null
  }

  export type ProjectMemberMinAggregateOutputType = {
    id: number | null
    projectId: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMemberMaxAggregateOutputType = {
    id: number | null
    projectId: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMemberCountAggregateOutputType = {
    id: number
    projectId: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMemberAvgAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
  }

  export type ProjectMemberSumAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
  }

  export type ProjectMemberMinAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMemberMaxAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMemberCountAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMember to aggregate.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectMembers
    **/
    _count?: true | ProjectMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMemberMaxAggregateInputType
  }

  export type GetProjectMemberAggregateType<T extends ProjectMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectMember[P]>
      : GetScalarType<T[P], AggregateProjectMember[P]>
  }




  export type ProjectMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMemberWhereInput
    orderBy?: ProjectMemberOrderByWithAggregationInput | ProjectMemberOrderByWithAggregationInput[]
    by: ProjectMemberScalarFieldEnum[] | ProjectMemberScalarFieldEnum
    having?: ProjectMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectMemberCountAggregateInputType | true
    _avg?: ProjectMemberAvgAggregateInputType
    _sum?: ProjectMemberSumAggregateInputType
    _min?: ProjectMemberMinAggregateInputType
    _max?: ProjectMemberMaxAggregateInputType
  }

  export type ProjectMemberGroupByOutputType = {
    id: number
    projectId: number
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: ProjectMemberCountAggregateOutputType | null
    _avg: ProjectMemberAvgAggregateOutputType | null
    _sum: ProjectMemberSumAggregateOutputType | null
    _min: ProjectMemberMinAggregateOutputType | null
    _max: ProjectMemberMaxAggregateOutputType | null
  }

  type GetProjectMemberGroupByPayload<T extends ProjectMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectMemberGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectMemberGroupByOutputType[P]>
        }
      >
    >


  export type ProjectMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMember"]>

  export type ProjectMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMember"]>

  export type ProjectMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMember"]>

  export type ProjectMemberSelectScalar = {
    id?: boolean
    projectId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["projectMember"]>
  export type ProjectMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectMember"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      projectId: number
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectMember"]>
    composites: {}
  }

  type ProjectMemberGetPayload<S extends boolean | null | undefined | ProjectMemberDefaultArgs> = $Result.GetResult<Prisma.$ProjectMemberPayload, S>

  type ProjectMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectMemberCountAggregateInputType | true
    }

  export interface ProjectMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectMember'], meta: { name: 'ProjectMember' } }
    /**
     * Find zero or one ProjectMember that matches the filter.
     * @param {ProjectMemberFindUniqueArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectMemberFindUniqueArgs>(args: SelectSubset<T, ProjectMemberFindUniqueArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectMemberFindUniqueOrThrowArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberFindFirstArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectMemberFindFirstArgs>(args?: SelectSubset<T, ProjectMemberFindFirstArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberFindFirstOrThrowArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectMembers
     * const projectMembers = await prisma.projectMember.findMany()
     * 
     * // Get first 10 ProjectMembers
     * const projectMembers = await prisma.projectMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectMemberWithIdOnly = await prisma.projectMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectMemberFindManyArgs>(args?: SelectSubset<T, ProjectMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectMember.
     * @param {ProjectMemberCreateArgs} args - Arguments to create a ProjectMember.
     * @example
     * // Create one ProjectMember
     * const ProjectMember = await prisma.projectMember.create({
     *   data: {
     *     // ... data to create a ProjectMember
     *   }
     * })
     * 
     */
    create<T extends ProjectMemberCreateArgs>(args: SelectSubset<T, ProjectMemberCreateArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectMembers.
     * @param {ProjectMemberCreateManyArgs} args - Arguments to create many ProjectMembers.
     * @example
     * // Create many ProjectMembers
     * const projectMember = await prisma.projectMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectMemberCreateManyArgs>(args?: SelectSubset<T, ProjectMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectMembers and returns the data saved in the database.
     * @param {ProjectMemberCreateManyAndReturnArgs} args - Arguments to create many ProjectMembers.
     * @example
     * // Create many ProjectMembers
     * const projectMember = await prisma.projectMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectMembers and only return the `id`
     * const projectMemberWithIdOnly = await prisma.projectMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectMember.
     * @param {ProjectMemberDeleteArgs} args - Arguments to delete one ProjectMember.
     * @example
     * // Delete one ProjectMember
     * const ProjectMember = await prisma.projectMember.delete({
     *   where: {
     *     // ... filter to delete one ProjectMember
     *   }
     * })
     * 
     */
    delete<T extends ProjectMemberDeleteArgs>(args: SelectSubset<T, ProjectMemberDeleteArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectMember.
     * @param {ProjectMemberUpdateArgs} args - Arguments to update one ProjectMember.
     * @example
     * // Update one ProjectMember
     * const projectMember = await prisma.projectMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectMemberUpdateArgs>(args: SelectSubset<T, ProjectMemberUpdateArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectMembers.
     * @param {ProjectMemberDeleteManyArgs} args - Arguments to filter ProjectMembers to delete.
     * @example
     * // Delete a few ProjectMembers
     * const { count } = await prisma.projectMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectMemberDeleteManyArgs>(args?: SelectSubset<T, ProjectMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectMembers
     * const projectMember = await prisma.projectMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectMemberUpdateManyArgs>(args: SelectSubset<T, ProjectMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMembers and returns the data updated in the database.
     * @param {ProjectMemberUpdateManyAndReturnArgs} args - Arguments to update many ProjectMembers.
     * @example
     * // Update many ProjectMembers
     * const projectMember = await prisma.projectMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectMembers and only return the `id`
     * const projectMemberWithIdOnly = await prisma.projectMember.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectMember.
     * @param {ProjectMemberUpsertArgs} args - Arguments to update or create a ProjectMember.
     * @example
     * // Update or create a ProjectMember
     * const projectMember = await prisma.projectMember.upsert({
     *   create: {
     *     // ... data to create a ProjectMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectMember we want to update
     *   }
     * })
     */
    upsert<T extends ProjectMemberUpsertArgs>(args: SelectSubset<T, ProjectMemberUpsertArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberCountArgs} args - Arguments to filter ProjectMembers to count.
     * @example
     * // Count the number of ProjectMembers
     * const count = await prisma.projectMember.count({
     *   where: {
     *     // ... the filter for the ProjectMembers we want to count
     *   }
     * })
    **/
    count<T extends ProjectMemberCountArgs>(
      args?: Subset<T, ProjectMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectMemberAggregateArgs>(args: Subset<T, ProjectMemberAggregateArgs>): Prisma.PrismaPromise<GetProjectMemberAggregateType<T>>

    /**
     * Group by ProjectMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberGroupByArgs} args - Group by arguments.
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
      T extends ProjectMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectMemberGroupByArgs['orderBy'] }
        : { orderBy?: ProjectMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectMember model
   */
  readonly fields: ProjectMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProjectMember model
   */
  interface ProjectMemberFieldRefs {
    readonly id: FieldRef<"ProjectMember", 'Int'>
    readonly projectId: FieldRef<"ProjectMember", 'Int'>
    readonly userId: FieldRef<"ProjectMember", 'Int'>
    readonly createdAt: FieldRef<"ProjectMember", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectMember findUnique
   */
  export type ProjectMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember findUniqueOrThrow
   */
  export type ProjectMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember findFirst
   */
  export type ProjectMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMembers.
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMembers.
     */
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * ProjectMember findFirstOrThrow
   */
  export type ProjectMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMembers.
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMembers.
     */
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * ProjectMember findMany
   */
  export type ProjectMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMembers to fetch.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectMembers.
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * ProjectMember create
   */
  export type ProjectMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectMember.
     */
    data: XOR<ProjectMemberCreateInput, ProjectMemberUncheckedCreateInput>
  }

  /**
   * ProjectMember createMany
   */
  export type ProjectMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectMembers.
     */
    data: ProjectMemberCreateManyInput | ProjectMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectMember createManyAndReturn
   */
  export type ProjectMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectMembers.
     */
    data: ProjectMemberCreateManyInput | ProjectMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMember update
   */
  export type ProjectMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectMember.
     */
    data: XOR<ProjectMemberUpdateInput, ProjectMemberUncheckedUpdateInput>
    /**
     * Choose, which ProjectMember to update.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember updateMany
   */
  export type ProjectMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectMembers.
     */
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMembers to update
     */
    where?: ProjectMemberWhereInput
    /**
     * Limit how many ProjectMembers to update.
     */
    limit?: number
  }

  /**
   * ProjectMember updateManyAndReturn
   */
  export type ProjectMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * The data used to update ProjectMembers.
     */
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMembers to update
     */
    where?: ProjectMemberWhereInput
    /**
     * Limit how many ProjectMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMember upsert
   */
  export type ProjectMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectMember to update in case it exists.
     */
    where: ProjectMemberWhereUniqueInput
    /**
     * In case the ProjectMember found by the `where` argument doesn't exist, create a new ProjectMember with this data.
     */
    create: XOR<ProjectMemberCreateInput, ProjectMemberUncheckedCreateInput>
    /**
     * In case the ProjectMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectMemberUpdateInput, ProjectMemberUncheckedUpdateInput>
  }

  /**
   * ProjectMember delete
   */
  export type ProjectMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter which ProjectMember to delete.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember deleteMany
   */
  export type ProjectMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMembers to delete
     */
    where?: ProjectMemberWhereInput
    /**
     * Limit how many ProjectMembers to delete.
     */
    limit?: number
  }

  /**
   * ProjectMember without action
   */
  export type ProjectMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
  }


  /**
   * Model ProjectInvestor
   */

  export type AggregateProjectInvestor = {
    _count: ProjectInvestorCountAggregateOutputType | null
    _avg: ProjectInvestorAvgAggregateOutputType | null
    _sum: ProjectInvestorSumAggregateOutputType | null
    _min: ProjectInvestorMinAggregateOutputType | null
    _max: ProjectInvestorMaxAggregateOutputType | null
  }

  export type ProjectInvestorAvgAggregateOutputType = {
    id: number | null
    projectId: number | null
    investorId: number | null
  }

  export type ProjectInvestorSumAggregateOutputType = {
    id: number | null
    projectId: number | null
    investorId: number | null
  }

  export type ProjectInvestorMinAggregateOutputType = {
    id: number | null
    projectId: number | null
    investorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectInvestorMaxAggregateOutputType = {
    id: number | null
    projectId: number | null
    investorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectInvestorCountAggregateOutputType = {
    id: number
    projectId: number
    investorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectInvestorAvgAggregateInputType = {
    id?: true
    projectId?: true
    investorId?: true
  }

  export type ProjectInvestorSumAggregateInputType = {
    id?: true
    projectId?: true
    investorId?: true
  }

  export type ProjectInvestorMinAggregateInputType = {
    id?: true
    projectId?: true
    investorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectInvestorMaxAggregateInputType = {
    id?: true
    projectId?: true
    investorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectInvestorCountAggregateInputType = {
    id?: true
    projectId?: true
    investorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectInvestorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectInvestor to aggregate.
     */
    where?: ProjectInvestorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInvestors to fetch.
     */
    orderBy?: ProjectInvestorOrderByWithRelationInput | ProjectInvestorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectInvestorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInvestors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInvestors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectInvestors
    **/
    _count?: true | ProjectInvestorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectInvestorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectInvestorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectInvestorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectInvestorMaxAggregateInputType
  }

  export type GetProjectInvestorAggregateType<T extends ProjectInvestorAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectInvestor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectInvestor[P]>
      : GetScalarType<T[P], AggregateProjectInvestor[P]>
  }




  export type ProjectInvestorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectInvestorWhereInput
    orderBy?: ProjectInvestorOrderByWithAggregationInput | ProjectInvestorOrderByWithAggregationInput[]
    by: ProjectInvestorScalarFieldEnum[] | ProjectInvestorScalarFieldEnum
    having?: ProjectInvestorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectInvestorCountAggregateInputType | true
    _avg?: ProjectInvestorAvgAggregateInputType
    _sum?: ProjectInvestorSumAggregateInputType
    _min?: ProjectInvestorMinAggregateInputType
    _max?: ProjectInvestorMaxAggregateInputType
  }

  export type ProjectInvestorGroupByOutputType = {
    id: number
    projectId: number
    investorId: number
    createdAt: Date
    updatedAt: Date
    _count: ProjectInvestorCountAggregateOutputType | null
    _avg: ProjectInvestorAvgAggregateOutputType | null
    _sum: ProjectInvestorSumAggregateOutputType | null
    _min: ProjectInvestorMinAggregateOutputType | null
    _max: ProjectInvestorMaxAggregateOutputType | null
  }

  type GetProjectInvestorGroupByPayload<T extends ProjectInvestorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectInvestorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectInvestorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectInvestorGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectInvestorGroupByOutputType[P]>
        }
      >
    >


  export type ProjectInvestorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    investorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectInvestor"]>

  export type ProjectInvestorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    investorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectInvestor"]>

  export type ProjectInvestorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    investorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectInvestor"]>

  export type ProjectInvestorSelectScalar = {
    id?: boolean
    projectId?: boolean
    investorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectInvestorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "investorId" | "createdAt" | "updatedAt", ExtArgs["result"]["projectInvestor"]>
  export type ProjectInvestorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }
  export type ProjectInvestorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }
  export type ProjectInvestorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }

  export type $ProjectInvestorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectInvestor"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      investor: Prisma.$InvestorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      projectId: number
      investorId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectInvestor"]>
    composites: {}
  }

  type ProjectInvestorGetPayload<S extends boolean | null | undefined | ProjectInvestorDefaultArgs> = $Result.GetResult<Prisma.$ProjectInvestorPayload, S>

  type ProjectInvestorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectInvestorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectInvestorCountAggregateInputType | true
    }

  export interface ProjectInvestorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectInvestor'], meta: { name: 'ProjectInvestor' } }
    /**
     * Find zero or one ProjectInvestor that matches the filter.
     * @param {ProjectInvestorFindUniqueArgs} args - Arguments to find a ProjectInvestor
     * @example
     * // Get one ProjectInvestor
     * const projectInvestor = await prisma.projectInvestor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectInvestorFindUniqueArgs>(args: SelectSubset<T, ProjectInvestorFindUniqueArgs<ExtArgs>>): Prisma__ProjectInvestorClient<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectInvestor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectInvestorFindUniqueOrThrowArgs} args - Arguments to find a ProjectInvestor
     * @example
     * // Get one ProjectInvestor
     * const projectInvestor = await prisma.projectInvestor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectInvestorFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectInvestorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectInvestorClient<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectInvestor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvestorFindFirstArgs} args - Arguments to find a ProjectInvestor
     * @example
     * // Get one ProjectInvestor
     * const projectInvestor = await prisma.projectInvestor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectInvestorFindFirstArgs>(args?: SelectSubset<T, ProjectInvestorFindFirstArgs<ExtArgs>>): Prisma__ProjectInvestorClient<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectInvestor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvestorFindFirstOrThrowArgs} args - Arguments to find a ProjectInvestor
     * @example
     * // Get one ProjectInvestor
     * const projectInvestor = await prisma.projectInvestor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectInvestorFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectInvestorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectInvestorClient<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectInvestors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvestorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectInvestors
     * const projectInvestors = await prisma.projectInvestor.findMany()
     * 
     * // Get first 10 ProjectInvestors
     * const projectInvestors = await prisma.projectInvestor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectInvestorWithIdOnly = await prisma.projectInvestor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectInvestorFindManyArgs>(args?: SelectSubset<T, ProjectInvestorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectInvestor.
     * @param {ProjectInvestorCreateArgs} args - Arguments to create a ProjectInvestor.
     * @example
     * // Create one ProjectInvestor
     * const ProjectInvestor = await prisma.projectInvestor.create({
     *   data: {
     *     // ... data to create a ProjectInvestor
     *   }
     * })
     * 
     */
    create<T extends ProjectInvestorCreateArgs>(args: SelectSubset<T, ProjectInvestorCreateArgs<ExtArgs>>): Prisma__ProjectInvestorClient<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectInvestors.
     * @param {ProjectInvestorCreateManyArgs} args - Arguments to create many ProjectInvestors.
     * @example
     * // Create many ProjectInvestors
     * const projectInvestor = await prisma.projectInvestor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectInvestorCreateManyArgs>(args?: SelectSubset<T, ProjectInvestorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectInvestors and returns the data saved in the database.
     * @param {ProjectInvestorCreateManyAndReturnArgs} args - Arguments to create many ProjectInvestors.
     * @example
     * // Create many ProjectInvestors
     * const projectInvestor = await prisma.projectInvestor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectInvestors and only return the `id`
     * const projectInvestorWithIdOnly = await prisma.projectInvestor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectInvestorCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectInvestorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectInvestor.
     * @param {ProjectInvestorDeleteArgs} args - Arguments to delete one ProjectInvestor.
     * @example
     * // Delete one ProjectInvestor
     * const ProjectInvestor = await prisma.projectInvestor.delete({
     *   where: {
     *     // ... filter to delete one ProjectInvestor
     *   }
     * })
     * 
     */
    delete<T extends ProjectInvestorDeleteArgs>(args: SelectSubset<T, ProjectInvestorDeleteArgs<ExtArgs>>): Prisma__ProjectInvestorClient<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectInvestor.
     * @param {ProjectInvestorUpdateArgs} args - Arguments to update one ProjectInvestor.
     * @example
     * // Update one ProjectInvestor
     * const projectInvestor = await prisma.projectInvestor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectInvestorUpdateArgs>(args: SelectSubset<T, ProjectInvestorUpdateArgs<ExtArgs>>): Prisma__ProjectInvestorClient<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectInvestors.
     * @param {ProjectInvestorDeleteManyArgs} args - Arguments to filter ProjectInvestors to delete.
     * @example
     * // Delete a few ProjectInvestors
     * const { count } = await prisma.projectInvestor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectInvestorDeleteManyArgs>(args?: SelectSubset<T, ProjectInvestorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectInvestors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvestorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectInvestors
     * const projectInvestor = await prisma.projectInvestor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectInvestorUpdateManyArgs>(args: SelectSubset<T, ProjectInvestorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectInvestors and returns the data updated in the database.
     * @param {ProjectInvestorUpdateManyAndReturnArgs} args - Arguments to update many ProjectInvestors.
     * @example
     * // Update many ProjectInvestors
     * const projectInvestor = await prisma.projectInvestor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectInvestors and only return the `id`
     * const projectInvestorWithIdOnly = await prisma.projectInvestor.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectInvestorUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectInvestorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectInvestor.
     * @param {ProjectInvestorUpsertArgs} args - Arguments to update or create a ProjectInvestor.
     * @example
     * // Update or create a ProjectInvestor
     * const projectInvestor = await prisma.projectInvestor.upsert({
     *   create: {
     *     // ... data to create a ProjectInvestor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectInvestor we want to update
     *   }
     * })
     */
    upsert<T extends ProjectInvestorUpsertArgs>(args: SelectSubset<T, ProjectInvestorUpsertArgs<ExtArgs>>): Prisma__ProjectInvestorClient<$Result.GetResult<Prisma.$ProjectInvestorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectInvestors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvestorCountArgs} args - Arguments to filter ProjectInvestors to count.
     * @example
     * // Count the number of ProjectInvestors
     * const count = await prisma.projectInvestor.count({
     *   where: {
     *     // ... the filter for the ProjectInvestors we want to count
     *   }
     * })
    **/
    count<T extends ProjectInvestorCountArgs>(
      args?: Subset<T, ProjectInvestorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectInvestorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectInvestor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvestorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectInvestorAggregateArgs>(args: Subset<T, ProjectInvestorAggregateArgs>): Prisma.PrismaPromise<GetProjectInvestorAggregateType<T>>

    /**
     * Group by ProjectInvestor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvestorGroupByArgs} args - Group by arguments.
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
      T extends ProjectInvestorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectInvestorGroupByArgs['orderBy'] }
        : { orderBy?: ProjectInvestorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectInvestorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectInvestorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectInvestor model
   */
  readonly fields: ProjectInvestorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectInvestor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectInvestorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    investor<T extends InvestorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvestorDefaultArgs<ExtArgs>>): Prisma__InvestorClient<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProjectInvestor model
   */
  interface ProjectInvestorFieldRefs {
    readonly id: FieldRef<"ProjectInvestor", 'Int'>
    readonly projectId: FieldRef<"ProjectInvestor", 'Int'>
    readonly investorId: FieldRef<"ProjectInvestor", 'Int'>
    readonly createdAt: FieldRef<"ProjectInvestor", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectInvestor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectInvestor findUnique
   */
  export type ProjectInvestorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInvestor to fetch.
     */
    where: ProjectInvestorWhereUniqueInput
  }

  /**
   * ProjectInvestor findUniqueOrThrow
   */
  export type ProjectInvestorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInvestor to fetch.
     */
    where: ProjectInvestorWhereUniqueInput
  }

  /**
   * ProjectInvestor findFirst
   */
  export type ProjectInvestorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInvestor to fetch.
     */
    where?: ProjectInvestorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInvestors to fetch.
     */
    orderBy?: ProjectInvestorOrderByWithRelationInput | ProjectInvestorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectInvestors.
     */
    cursor?: ProjectInvestorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInvestors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInvestors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectInvestors.
     */
    distinct?: ProjectInvestorScalarFieldEnum | ProjectInvestorScalarFieldEnum[]
  }

  /**
   * ProjectInvestor findFirstOrThrow
   */
  export type ProjectInvestorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInvestor to fetch.
     */
    where?: ProjectInvestorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInvestors to fetch.
     */
    orderBy?: ProjectInvestorOrderByWithRelationInput | ProjectInvestorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectInvestors.
     */
    cursor?: ProjectInvestorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInvestors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInvestors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectInvestors.
     */
    distinct?: ProjectInvestorScalarFieldEnum | ProjectInvestorScalarFieldEnum[]
  }

  /**
   * ProjectInvestor findMany
   */
  export type ProjectInvestorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInvestors to fetch.
     */
    where?: ProjectInvestorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInvestors to fetch.
     */
    orderBy?: ProjectInvestorOrderByWithRelationInput | ProjectInvestorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectInvestors.
     */
    cursor?: ProjectInvestorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInvestors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInvestors.
     */
    skip?: number
    distinct?: ProjectInvestorScalarFieldEnum | ProjectInvestorScalarFieldEnum[]
  }

  /**
   * ProjectInvestor create
   */
  export type ProjectInvestorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectInvestor.
     */
    data: XOR<ProjectInvestorCreateInput, ProjectInvestorUncheckedCreateInput>
  }

  /**
   * ProjectInvestor createMany
   */
  export type ProjectInvestorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectInvestors.
     */
    data: ProjectInvestorCreateManyInput | ProjectInvestorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectInvestor createManyAndReturn
   */
  export type ProjectInvestorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectInvestors.
     */
    data: ProjectInvestorCreateManyInput | ProjectInvestorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectInvestor update
   */
  export type ProjectInvestorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectInvestor.
     */
    data: XOR<ProjectInvestorUpdateInput, ProjectInvestorUncheckedUpdateInput>
    /**
     * Choose, which ProjectInvestor to update.
     */
    where: ProjectInvestorWhereUniqueInput
  }

  /**
   * ProjectInvestor updateMany
   */
  export type ProjectInvestorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectInvestors.
     */
    data: XOR<ProjectInvestorUpdateManyMutationInput, ProjectInvestorUncheckedUpdateManyInput>
    /**
     * Filter which ProjectInvestors to update
     */
    where?: ProjectInvestorWhereInput
    /**
     * Limit how many ProjectInvestors to update.
     */
    limit?: number
  }

  /**
   * ProjectInvestor updateManyAndReturn
   */
  export type ProjectInvestorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * The data used to update ProjectInvestors.
     */
    data: XOR<ProjectInvestorUpdateManyMutationInput, ProjectInvestorUncheckedUpdateManyInput>
    /**
     * Filter which ProjectInvestors to update
     */
    where?: ProjectInvestorWhereInput
    /**
     * Limit how many ProjectInvestors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectInvestor upsert
   */
  export type ProjectInvestorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectInvestor to update in case it exists.
     */
    where: ProjectInvestorWhereUniqueInput
    /**
     * In case the ProjectInvestor found by the `where` argument doesn't exist, create a new ProjectInvestor with this data.
     */
    create: XOR<ProjectInvestorCreateInput, ProjectInvestorUncheckedCreateInput>
    /**
     * In case the ProjectInvestor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectInvestorUpdateInput, ProjectInvestorUncheckedUpdateInput>
  }

  /**
   * ProjectInvestor delete
   */
  export type ProjectInvestorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
    /**
     * Filter which ProjectInvestor to delete.
     */
    where: ProjectInvestorWhereUniqueInput
  }

  /**
   * ProjectInvestor deleteMany
   */
  export type ProjectInvestorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectInvestors to delete
     */
    where?: ProjectInvestorWhereInput
    /**
     * Limit how many ProjectInvestors to delete.
     */
    limit?: number
  }

  /**
   * ProjectInvestor without action
   */
  export type ProjectInvestorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvestor
     */
    select?: ProjectInvestorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvestor
     */
    omit?: ProjectInvestorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvestorInclude<ExtArgs> | null
  }


  /**
   * Model Investment
   */

  export type AggregateInvestment = {
    _count: InvestmentCountAggregateOutputType | null
    _avg: InvestmentAvgAggregateOutputType | null
    _sum: InvestmentSumAggregateOutputType | null
    _min: InvestmentMinAggregateOutputType | null
    _max: InvestmentMaxAggregateOutputType | null
  }

  export type InvestmentAvgAggregateOutputType = {
    id: number | null
    amount: number | null
    projectId: number | null
    investorId: number | null
  }

  export type InvestmentSumAggregateOutputType = {
    id: number | null
    amount: number | null
    projectId: number | null
    investorId: number | null
  }

  export type InvestmentMinAggregateOutputType = {
    id: number | null
    amount: number | null
    projectId: number | null
    investorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvestmentMaxAggregateOutputType = {
    id: number | null
    amount: number | null
    projectId: number | null
    investorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvestmentCountAggregateOutputType = {
    id: number
    amount: number
    projectId: number
    investorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvestmentAvgAggregateInputType = {
    id?: true
    amount?: true
    projectId?: true
    investorId?: true
  }

  export type InvestmentSumAggregateInputType = {
    id?: true
    amount?: true
    projectId?: true
    investorId?: true
  }

  export type InvestmentMinAggregateInputType = {
    id?: true
    amount?: true
    projectId?: true
    investorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvestmentMaxAggregateInputType = {
    id?: true
    amount?: true
    projectId?: true
    investorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvestmentCountAggregateInputType = {
    id?: true
    amount?: true
    projectId?: true
    investorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvestmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investment to aggregate.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Investments
    **/
    _count?: true | InvestmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvestmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvestmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvestmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvestmentMaxAggregateInputType
  }

  export type GetInvestmentAggregateType<T extends InvestmentAggregateArgs> = {
        [P in keyof T & keyof AggregateInvestment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvestment[P]>
      : GetScalarType<T[P], AggregateInvestment[P]>
  }




  export type InvestmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestmentWhereInput
    orderBy?: InvestmentOrderByWithAggregationInput | InvestmentOrderByWithAggregationInput[]
    by: InvestmentScalarFieldEnum[] | InvestmentScalarFieldEnum
    having?: InvestmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvestmentCountAggregateInputType | true
    _avg?: InvestmentAvgAggregateInputType
    _sum?: InvestmentSumAggregateInputType
    _min?: InvestmentMinAggregateInputType
    _max?: InvestmentMaxAggregateInputType
  }

  export type InvestmentGroupByOutputType = {
    id: number
    amount: number
    projectId: number
    investorId: number
    createdAt: Date
    updatedAt: Date
    _count: InvestmentCountAggregateOutputType | null
    _avg: InvestmentAvgAggregateOutputType | null
    _sum: InvestmentSumAggregateOutputType | null
    _min: InvestmentMinAggregateOutputType | null
    _max: InvestmentMaxAggregateOutputType | null
  }

  type GetInvestmentGroupByPayload<T extends InvestmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvestmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvestmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvestmentGroupByOutputType[P]>
            : GetScalarType<T[P], InvestmentGroupByOutputType[P]>
        }
      >
    >


  export type InvestmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    projectId?: boolean
    investorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investment"]>

  export type InvestmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    projectId?: boolean
    investorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investment"]>

  export type InvestmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    projectId?: boolean
    investorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investment"]>

  export type InvestmentSelectScalar = {
    id?: boolean
    amount?: boolean
    projectId?: boolean
    investorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvestmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "projectId" | "investorId" | "createdAt" | "updatedAt", ExtArgs["result"]["investment"]>
  export type InvestmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }
  export type InvestmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }
  export type InvestmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    investor?: boolean | InvestorDefaultArgs<ExtArgs>
  }

  export type $InvestmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Investment"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      investor: Prisma.$InvestorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      amount: number
      projectId: number
      investorId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["investment"]>
    composites: {}
  }

  type InvestmentGetPayload<S extends boolean | null | undefined | InvestmentDefaultArgs> = $Result.GetResult<Prisma.$InvestmentPayload, S>

  type InvestmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvestmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvestmentCountAggregateInputType | true
    }

  export interface InvestmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Investment'], meta: { name: 'Investment' } }
    /**
     * Find zero or one Investment that matches the filter.
     * @param {InvestmentFindUniqueArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvestmentFindUniqueArgs>(args: SelectSubset<T, InvestmentFindUniqueArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Investment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvestmentFindUniqueOrThrowArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvestmentFindUniqueOrThrowArgs>(args: SelectSubset<T, InvestmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentFindFirstArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvestmentFindFirstArgs>(args?: SelectSubset<T, InvestmentFindFirstArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentFindFirstOrThrowArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvestmentFindFirstOrThrowArgs>(args?: SelectSubset<T, InvestmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Investments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Investments
     * const investments = await prisma.investment.findMany()
     * 
     * // Get first 10 Investments
     * const investments = await prisma.investment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const investmentWithIdOnly = await prisma.investment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvestmentFindManyArgs>(args?: SelectSubset<T, InvestmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Investment.
     * @param {InvestmentCreateArgs} args - Arguments to create a Investment.
     * @example
     * // Create one Investment
     * const Investment = await prisma.investment.create({
     *   data: {
     *     // ... data to create a Investment
     *   }
     * })
     * 
     */
    create<T extends InvestmentCreateArgs>(args: SelectSubset<T, InvestmentCreateArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Investments.
     * @param {InvestmentCreateManyArgs} args - Arguments to create many Investments.
     * @example
     * // Create many Investments
     * const investment = await prisma.investment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvestmentCreateManyArgs>(args?: SelectSubset<T, InvestmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Investments and returns the data saved in the database.
     * @param {InvestmentCreateManyAndReturnArgs} args - Arguments to create many Investments.
     * @example
     * // Create many Investments
     * const investment = await prisma.investment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Investments and only return the `id`
     * const investmentWithIdOnly = await prisma.investment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvestmentCreateManyAndReturnArgs>(args?: SelectSubset<T, InvestmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Investment.
     * @param {InvestmentDeleteArgs} args - Arguments to delete one Investment.
     * @example
     * // Delete one Investment
     * const Investment = await prisma.investment.delete({
     *   where: {
     *     // ... filter to delete one Investment
     *   }
     * })
     * 
     */
    delete<T extends InvestmentDeleteArgs>(args: SelectSubset<T, InvestmentDeleteArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Investment.
     * @param {InvestmentUpdateArgs} args - Arguments to update one Investment.
     * @example
     * // Update one Investment
     * const investment = await prisma.investment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvestmentUpdateArgs>(args: SelectSubset<T, InvestmentUpdateArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Investments.
     * @param {InvestmentDeleteManyArgs} args - Arguments to filter Investments to delete.
     * @example
     * // Delete a few Investments
     * const { count } = await prisma.investment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvestmentDeleteManyArgs>(args?: SelectSubset<T, InvestmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Investments
     * const investment = await prisma.investment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvestmentUpdateManyArgs>(args: SelectSubset<T, InvestmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investments and returns the data updated in the database.
     * @param {InvestmentUpdateManyAndReturnArgs} args - Arguments to update many Investments.
     * @example
     * // Update many Investments
     * const investment = await prisma.investment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Investments and only return the `id`
     * const investmentWithIdOnly = await prisma.investment.updateManyAndReturn({
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
    updateManyAndReturn<T extends InvestmentUpdateManyAndReturnArgs>(args: SelectSubset<T, InvestmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Investment.
     * @param {InvestmentUpsertArgs} args - Arguments to update or create a Investment.
     * @example
     * // Update or create a Investment
     * const investment = await prisma.investment.upsert({
     *   create: {
     *     // ... data to create a Investment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Investment we want to update
     *   }
     * })
     */
    upsert<T extends InvestmentUpsertArgs>(args: SelectSubset<T, InvestmentUpsertArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Investments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentCountArgs} args - Arguments to filter Investments to count.
     * @example
     * // Count the number of Investments
     * const count = await prisma.investment.count({
     *   where: {
     *     // ... the filter for the Investments we want to count
     *   }
     * })
    **/
    count<T extends InvestmentCountArgs>(
      args?: Subset<T, InvestmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvestmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Investment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InvestmentAggregateArgs>(args: Subset<T, InvestmentAggregateArgs>): Prisma.PrismaPromise<GetInvestmentAggregateType<T>>

    /**
     * Group by Investment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentGroupByArgs} args - Group by arguments.
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
      T extends InvestmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvestmentGroupByArgs['orderBy'] }
        : { orderBy?: InvestmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InvestmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvestmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Investment model
   */
  readonly fields: InvestmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Investment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvestmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    investor<T extends InvestorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvestorDefaultArgs<ExtArgs>>): Prisma__InvestorClient<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Investment model
   */
  interface InvestmentFieldRefs {
    readonly id: FieldRef<"Investment", 'Int'>
    readonly amount: FieldRef<"Investment", 'Float'>
    readonly projectId: FieldRef<"Investment", 'Int'>
    readonly investorId: FieldRef<"Investment", 'Int'>
    readonly createdAt: FieldRef<"Investment", 'DateTime'>
    readonly updatedAt: FieldRef<"Investment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Investment findUnique
   */
  export type InvestmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment findUniqueOrThrow
   */
  export type InvestmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment findFirst
   */
  export type InvestmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investments.
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investments.
     */
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Investment findFirstOrThrow
   */
  export type InvestmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investments.
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investments.
     */
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Investment findMany
   */
  export type InvestmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investments to fetch.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Investments.
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Investment create
   */
  export type InvestmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Investment.
     */
    data: XOR<InvestmentCreateInput, InvestmentUncheckedCreateInput>
  }

  /**
   * Investment createMany
   */
  export type InvestmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Investments.
     */
    data: InvestmentCreateManyInput | InvestmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Investment createManyAndReturn
   */
  export type InvestmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * The data used to create many Investments.
     */
    data: InvestmentCreateManyInput | InvestmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Investment update
   */
  export type InvestmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Investment.
     */
    data: XOR<InvestmentUpdateInput, InvestmentUncheckedUpdateInput>
    /**
     * Choose, which Investment to update.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment updateMany
   */
  export type InvestmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Investments.
     */
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyInput>
    /**
     * Filter which Investments to update
     */
    where?: InvestmentWhereInput
    /**
     * Limit how many Investments to update.
     */
    limit?: number
  }

  /**
   * Investment updateManyAndReturn
   */
  export type InvestmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * The data used to update Investments.
     */
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyInput>
    /**
     * Filter which Investments to update
     */
    where?: InvestmentWhereInput
    /**
     * Limit how many Investments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Investment upsert
   */
  export type InvestmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Investment to update in case it exists.
     */
    where: InvestmentWhereUniqueInput
    /**
     * In case the Investment found by the `where` argument doesn't exist, create a new Investment with this data.
     */
    create: XOR<InvestmentCreateInput, InvestmentUncheckedCreateInput>
    /**
     * In case the Investment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvestmentUpdateInput, InvestmentUncheckedUpdateInput>
  }

  /**
   * Investment delete
   */
  export type InvestmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter which Investment to delete.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment deleteMany
   */
  export type InvestmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investments to delete
     */
    where?: InvestmentWhereInput
    /**
     * Limit how many Investments to delete.
     */
    limit?: number
  }

  /**
   * Investment without action
   */
  export type InvestmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
  }


  /**
   * Model Milestone
   */

  export type AggregateMilestone = {
    _count: MilestoneCountAggregateOutputType | null
    _avg: MilestoneAvgAggregateOutputType | null
    _sum: MilestoneSumAggregateOutputType | null
    _min: MilestoneMinAggregateOutputType | null
    _max: MilestoneMaxAggregateOutputType | null
  }

  export type MilestoneAvgAggregateOutputType = {
    id: number | null
    amount: number | null
    projectId: number | null
    progress: number | null
    raised_amount: number | null
  }

  export type MilestoneSumAggregateOutputType = {
    id: number | null
    amount: number | null
    projectId: number | null
    progress: number | null
    raised_amount: number | null
  }

  export type MilestoneMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    amount: number | null
    status: string | null
    projectId: number | null
    completedAt: string | null
    deadlineAt: string | null
    progress: number | null
    raised_amount: number | null
    plannedAt: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MilestoneMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    amount: number | null
    status: string | null
    projectId: number | null
    completedAt: string | null
    deadlineAt: string | null
    progress: number | null
    raised_amount: number | null
    plannedAt: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MilestoneCountAggregateOutputType = {
    id: number
    title: number
    description: number
    amount: number
    status: number
    projectId: number
    completedAt: number
    deadlineAt: number
    progress: number
    raised_amount: number
    plannedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MilestoneAvgAggregateInputType = {
    id?: true
    amount?: true
    projectId?: true
    progress?: true
    raised_amount?: true
  }

  export type MilestoneSumAggregateInputType = {
    id?: true
    amount?: true
    projectId?: true
    progress?: true
    raised_amount?: true
  }

  export type MilestoneMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    status?: true
    projectId?: true
    completedAt?: true
    deadlineAt?: true
    progress?: true
    raised_amount?: true
    plannedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MilestoneMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    status?: true
    projectId?: true
    completedAt?: true
    deadlineAt?: true
    progress?: true
    raised_amount?: true
    plannedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MilestoneCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    status?: true
    projectId?: true
    completedAt?: true
    deadlineAt?: true
    progress?: true
    raised_amount?: true
    plannedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MilestoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Milestone to aggregate.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Milestones
    **/
    _count?: true | MilestoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MilestoneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MilestoneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MilestoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MilestoneMaxAggregateInputType
  }

  export type GetMilestoneAggregateType<T extends MilestoneAggregateArgs> = {
        [P in keyof T & keyof AggregateMilestone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMilestone[P]>
      : GetScalarType<T[P], AggregateMilestone[P]>
  }




  export type MilestoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MilestoneWhereInput
    orderBy?: MilestoneOrderByWithAggregationInput | MilestoneOrderByWithAggregationInput[]
    by: MilestoneScalarFieldEnum[] | MilestoneScalarFieldEnum
    having?: MilestoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MilestoneCountAggregateInputType | true
    _avg?: MilestoneAvgAggregateInputType
    _sum?: MilestoneSumAggregateInputType
    _min?: MilestoneMinAggregateInputType
    _max?: MilestoneMaxAggregateInputType
  }

  export type MilestoneGroupByOutputType = {
    id: number
    title: string
    description: string
    amount: number
    status: string
    projectId: number
    completedAt: string | null
    deadlineAt: string | null
    progress: number | null
    raised_amount: number | null
    plannedAt: string | null
    createdAt: Date
    updatedAt: Date
    _count: MilestoneCountAggregateOutputType | null
    _avg: MilestoneAvgAggregateOutputType | null
    _sum: MilestoneSumAggregateOutputType | null
    _min: MilestoneMinAggregateOutputType | null
    _max: MilestoneMaxAggregateOutputType | null
  }

  type GetMilestoneGroupByPayload<T extends MilestoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MilestoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MilestoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MilestoneGroupByOutputType[P]>
            : GetScalarType<T[P], MilestoneGroupByOutputType[P]>
        }
      >
    >


  export type MilestoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    status?: boolean
    projectId?: boolean
    completedAt?: boolean
    deadlineAt?: boolean
    progress?: boolean
    raised_amount?: boolean
    plannedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    status?: boolean
    projectId?: boolean
    completedAt?: boolean
    deadlineAt?: boolean
    progress?: boolean
    raised_amount?: boolean
    plannedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    status?: boolean
    projectId?: boolean
    completedAt?: boolean
    deadlineAt?: boolean
    progress?: boolean
    raised_amount?: boolean
    plannedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    status?: boolean
    projectId?: boolean
    completedAt?: boolean
    deadlineAt?: boolean
    progress?: boolean
    raised_amount?: boolean
    plannedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MilestoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "amount" | "status" | "projectId" | "completedAt" | "deadlineAt" | "progress" | "raised_amount" | "plannedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["milestone"]>
  export type MilestoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type MilestoneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type MilestoneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $MilestonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Milestone"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      amount: number
      status: string
      projectId: number
      completedAt: string | null
      deadlineAt: string | null
      progress: number | null
      raised_amount: number | null
      plannedAt: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["milestone"]>
    composites: {}
  }

  type MilestoneGetPayload<S extends boolean | null | undefined | MilestoneDefaultArgs> = $Result.GetResult<Prisma.$MilestonePayload, S>

  type MilestoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MilestoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MilestoneCountAggregateInputType | true
    }

  export interface MilestoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Milestone'], meta: { name: 'Milestone' } }
    /**
     * Find zero or one Milestone that matches the filter.
     * @param {MilestoneFindUniqueArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MilestoneFindUniqueArgs>(args: SelectSubset<T, MilestoneFindUniqueArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Milestone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MilestoneFindUniqueOrThrowArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MilestoneFindUniqueOrThrowArgs>(args: SelectSubset<T, MilestoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Milestone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindFirstArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MilestoneFindFirstArgs>(args?: SelectSubset<T, MilestoneFindFirstArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Milestone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindFirstOrThrowArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MilestoneFindFirstOrThrowArgs>(args?: SelectSubset<T, MilestoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Milestones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Milestones
     * const milestones = await prisma.milestone.findMany()
     * 
     * // Get first 10 Milestones
     * const milestones = await prisma.milestone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const milestoneWithIdOnly = await prisma.milestone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MilestoneFindManyArgs>(args?: SelectSubset<T, MilestoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Milestone.
     * @param {MilestoneCreateArgs} args - Arguments to create a Milestone.
     * @example
     * // Create one Milestone
     * const Milestone = await prisma.milestone.create({
     *   data: {
     *     // ... data to create a Milestone
     *   }
     * })
     * 
     */
    create<T extends MilestoneCreateArgs>(args: SelectSubset<T, MilestoneCreateArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Milestones.
     * @param {MilestoneCreateManyArgs} args - Arguments to create many Milestones.
     * @example
     * // Create many Milestones
     * const milestone = await prisma.milestone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MilestoneCreateManyArgs>(args?: SelectSubset<T, MilestoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Milestones and returns the data saved in the database.
     * @param {MilestoneCreateManyAndReturnArgs} args - Arguments to create many Milestones.
     * @example
     * // Create many Milestones
     * const milestone = await prisma.milestone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Milestones and only return the `id`
     * const milestoneWithIdOnly = await prisma.milestone.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MilestoneCreateManyAndReturnArgs>(args?: SelectSubset<T, MilestoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Milestone.
     * @param {MilestoneDeleteArgs} args - Arguments to delete one Milestone.
     * @example
     * // Delete one Milestone
     * const Milestone = await prisma.milestone.delete({
     *   where: {
     *     // ... filter to delete one Milestone
     *   }
     * })
     * 
     */
    delete<T extends MilestoneDeleteArgs>(args: SelectSubset<T, MilestoneDeleteArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Milestone.
     * @param {MilestoneUpdateArgs} args - Arguments to update one Milestone.
     * @example
     * // Update one Milestone
     * const milestone = await prisma.milestone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MilestoneUpdateArgs>(args: SelectSubset<T, MilestoneUpdateArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Milestones.
     * @param {MilestoneDeleteManyArgs} args - Arguments to filter Milestones to delete.
     * @example
     * // Delete a few Milestones
     * const { count } = await prisma.milestone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MilestoneDeleteManyArgs>(args?: SelectSubset<T, MilestoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Milestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Milestones
     * const milestone = await prisma.milestone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MilestoneUpdateManyArgs>(args: SelectSubset<T, MilestoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Milestones and returns the data updated in the database.
     * @param {MilestoneUpdateManyAndReturnArgs} args - Arguments to update many Milestones.
     * @example
     * // Update many Milestones
     * const milestone = await prisma.milestone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Milestones and only return the `id`
     * const milestoneWithIdOnly = await prisma.milestone.updateManyAndReturn({
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
    updateManyAndReturn<T extends MilestoneUpdateManyAndReturnArgs>(args: SelectSubset<T, MilestoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Milestone.
     * @param {MilestoneUpsertArgs} args - Arguments to update or create a Milestone.
     * @example
     * // Update or create a Milestone
     * const milestone = await prisma.milestone.upsert({
     *   create: {
     *     // ... data to create a Milestone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Milestone we want to update
     *   }
     * })
     */
    upsert<T extends MilestoneUpsertArgs>(args: SelectSubset<T, MilestoneUpsertArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Milestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneCountArgs} args - Arguments to filter Milestones to count.
     * @example
     * // Count the number of Milestones
     * const count = await prisma.milestone.count({
     *   where: {
     *     // ... the filter for the Milestones we want to count
     *   }
     * })
    **/
    count<T extends MilestoneCountArgs>(
      args?: Subset<T, MilestoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MilestoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Milestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MilestoneAggregateArgs>(args: Subset<T, MilestoneAggregateArgs>): Prisma.PrismaPromise<GetMilestoneAggregateType<T>>

    /**
     * Group by Milestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneGroupByArgs} args - Group by arguments.
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
      T extends MilestoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MilestoneGroupByArgs['orderBy'] }
        : { orderBy?: MilestoneGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MilestoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMilestoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Milestone model
   */
  readonly fields: MilestoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Milestone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MilestoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Milestone model
   */
  interface MilestoneFieldRefs {
    readonly id: FieldRef<"Milestone", 'Int'>
    readonly title: FieldRef<"Milestone", 'String'>
    readonly description: FieldRef<"Milestone", 'String'>
    readonly amount: FieldRef<"Milestone", 'Float'>
    readonly status: FieldRef<"Milestone", 'String'>
    readonly projectId: FieldRef<"Milestone", 'Int'>
    readonly completedAt: FieldRef<"Milestone", 'String'>
    readonly deadlineAt: FieldRef<"Milestone", 'String'>
    readonly progress: FieldRef<"Milestone", 'Int'>
    readonly raised_amount: FieldRef<"Milestone", 'Float'>
    readonly plannedAt: FieldRef<"Milestone", 'String'>
    readonly createdAt: FieldRef<"Milestone", 'DateTime'>
    readonly updatedAt: FieldRef<"Milestone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Milestone findUnique
   */
  export type MilestoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone findUniqueOrThrow
   */
  export type MilestoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone findFirst
   */
  export type MilestoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Milestones.
     */
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone findFirstOrThrow
   */
  export type MilestoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Milestones.
     */
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone findMany
   */
  export type MilestoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestones to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone create
   */
  export type MilestoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The data needed to create a Milestone.
     */
    data: XOR<MilestoneCreateInput, MilestoneUncheckedCreateInput>
  }

  /**
   * Milestone createMany
   */
  export type MilestoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Milestones.
     */
    data: MilestoneCreateManyInput | MilestoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Milestone createManyAndReturn
   */
  export type MilestoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The data used to create many Milestones.
     */
    data: MilestoneCreateManyInput | MilestoneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Milestone update
   */
  export type MilestoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The data needed to update a Milestone.
     */
    data: XOR<MilestoneUpdateInput, MilestoneUncheckedUpdateInput>
    /**
     * Choose, which Milestone to update.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone updateMany
   */
  export type MilestoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Milestones.
     */
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyInput>
    /**
     * Filter which Milestones to update
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to update.
     */
    limit?: number
  }

  /**
   * Milestone updateManyAndReturn
   */
  export type MilestoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The data used to update Milestones.
     */
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyInput>
    /**
     * Filter which Milestones to update
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Milestone upsert
   */
  export type MilestoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The filter to search for the Milestone to update in case it exists.
     */
    where: MilestoneWhereUniqueInput
    /**
     * In case the Milestone found by the `where` argument doesn't exist, create a new Milestone with this data.
     */
    create: XOR<MilestoneCreateInput, MilestoneUncheckedCreateInput>
    /**
     * In case the Milestone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MilestoneUpdateInput, MilestoneUncheckedUpdateInput>
  }

  /**
   * Milestone delete
   */
  export type MilestoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter which Milestone to delete.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone deleteMany
   */
  export type MilestoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Milestones to delete
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to delete.
     */
    limit?: number
  }

  /**
   * Milestone without action
   */
  export type MilestoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
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
    phone: 'phone',
    password: 'password',
    name: 'name',
    profile_picture: 'profile_picture',
    university: 'university',
    department: 'department',
    year_of_study: 'year_of_study',
    graduation_year: 'graduation_year',
    cgpa: 'cgpa',
    student_id: 'student_id',
    student_id_front: 'student_id_front',
    student_id_back: 'student_id_back',
    nid_front: 'nid_front',
    nid_back: 'nid_back',
    university_email: 'university_email',
    date_of_birth: 'date_of_birth',
    address: 'address',
    bio: 'bio',
    skills: 'skills',
    interests: 'interests',
    social_links: 'social_links',
    career_goals: 'career_goals',
    role: 'role',
    isActivated: 'isActivated',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const InvestorScalarFieldEnum: {
    id: 'id',
    email: 'email',
    phone: 'phone',
    password: 'password',
    name: 'name',
    profile_picture: 'profile_picture',
    company_name: 'company_name',
    company_website: 'company_website',
    company_description: 'company_description',
    role: 'role',
    isActivated: 'isActivated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvestorScalarFieldEnum = (typeof InvestorScalarFieldEnum)[keyof typeof InvestorScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    category: 'category',
    budget: 'budget',
    raised_amount: 'raised_amount',
    status: 'status',
    profile_picture: 'profile_picture',
    cover_image: 'cover_image',
    pitch_video: 'pitch_video',
    documents: 'documents',
    tags: 'tags',
    location: 'location',
    start_date: 'start_date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectMemberScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectMemberScalarFieldEnum = (typeof ProjectMemberScalarFieldEnum)[keyof typeof ProjectMemberScalarFieldEnum]


  export const ProjectInvestorScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    investorId: 'investorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectInvestorScalarFieldEnum = (typeof ProjectInvestorScalarFieldEnum)[keyof typeof ProjectInvestorScalarFieldEnum]


  export const InvestmentScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    projectId: 'projectId',
    investorId: 'investorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvestmentScalarFieldEnum = (typeof InvestmentScalarFieldEnum)[keyof typeof InvestmentScalarFieldEnum]


  export const MilestoneScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    amount: 'amount',
    status: 'status',
    projectId: 'projectId',
    completedAt: 'completedAt',
    deadlineAt: 'deadlineAt',
    progress: 'progress',
    raised_amount: 'raised_amount',
    plannedAt: 'plannedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MilestoneScalarFieldEnum = (typeof MilestoneScalarFieldEnum)[keyof typeof MilestoneScalarFieldEnum]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    phone?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    profile_picture?: StringNullableFilter<"User"> | string | null
    university?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    year_of_study?: StringNullableFilter<"User"> | string | null
    graduation_year?: StringNullableFilter<"User"> | string | null
    cgpa?: FloatNullableFilter<"User"> | number | null
    student_id?: StringNullableFilter<"User"> | string | null
    student_id_front?: StringNullableFilter<"User"> | string | null
    student_id_back?: StringNullableFilter<"User"> | string | null
    nid_front?: StringNullableFilter<"User"> | string | null
    nid_back?: StringNullableFilter<"User"> | string | null
    university_email?: StringNullableFilter<"User"> | string | null
    date_of_birth?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    skills?: StringNullableFilter<"User"> | string | null
    interests?: StringNullableFilter<"User"> | string | null
    social_links?: JsonNullableFilter<"User">
    career_goals?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActivated?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projectMembers?: ProjectMemberListRelationFilter
    Project?: ProjectListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    profile_picture?: SortOrderInput | SortOrder
    university?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    year_of_study?: SortOrderInput | SortOrder
    graduation_year?: SortOrderInput | SortOrder
    cgpa?: SortOrderInput | SortOrder
    student_id?: SortOrderInput | SortOrder
    student_id_front?: SortOrderInput | SortOrder
    student_id_back?: SortOrderInput | SortOrder
    nid_front?: SortOrderInput | SortOrder
    nid_back?: SortOrderInput | SortOrder
    university_email?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    interests?: SortOrderInput | SortOrder
    social_links?: SortOrderInput | SortOrder
    career_goals?: SortOrderInput | SortOrder
    role?: SortOrder
    isActivated?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectMembers?: ProjectMemberOrderByRelationAggregateInput
    Project?: ProjectOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    phone?: string
    university_email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    profile_picture?: StringNullableFilter<"User"> | string | null
    university?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    year_of_study?: StringNullableFilter<"User"> | string | null
    graduation_year?: StringNullableFilter<"User"> | string | null
    cgpa?: FloatNullableFilter<"User"> | number | null
    student_id?: StringNullableFilter<"User"> | string | null
    student_id_front?: StringNullableFilter<"User"> | string | null
    student_id_back?: StringNullableFilter<"User"> | string | null
    nid_front?: StringNullableFilter<"User"> | string | null
    nid_back?: StringNullableFilter<"User"> | string | null
    date_of_birth?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    skills?: StringNullableFilter<"User"> | string | null
    interests?: StringNullableFilter<"User"> | string | null
    social_links?: JsonNullableFilter<"User">
    career_goals?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActivated?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projectMembers?: ProjectMemberListRelationFilter
    Project?: ProjectListRelationFilter
  }, "id" | "phone" | "university_email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    profile_picture?: SortOrderInput | SortOrder
    university?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    year_of_study?: SortOrderInput | SortOrder
    graduation_year?: SortOrderInput | SortOrder
    cgpa?: SortOrderInput | SortOrder
    student_id?: SortOrderInput | SortOrder
    student_id_front?: SortOrderInput | SortOrder
    student_id_back?: SortOrderInput | SortOrder
    nid_front?: SortOrderInput | SortOrder
    nid_back?: SortOrderInput | SortOrder
    university_email?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    interests?: SortOrderInput | SortOrder
    social_links?: SortOrderInput | SortOrder
    career_goals?: SortOrderInput | SortOrder
    role?: SortOrder
    isActivated?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    phone?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    profile_picture?: StringNullableWithAggregatesFilter<"User"> | string | null
    university?: StringNullableWithAggregatesFilter<"User"> | string | null
    department?: StringNullableWithAggregatesFilter<"User"> | string | null
    year_of_study?: StringNullableWithAggregatesFilter<"User"> | string | null
    graduation_year?: StringNullableWithAggregatesFilter<"User"> | string | null
    cgpa?: FloatNullableWithAggregatesFilter<"User"> | number | null
    student_id?: StringNullableWithAggregatesFilter<"User"> | string | null
    student_id_front?: StringNullableWithAggregatesFilter<"User"> | string | null
    student_id_back?: StringNullableWithAggregatesFilter<"User"> | string | null
    nid_front?: StringNullableWithAggregatesFilter<"User"> | string | null
    nid_back?: StringNullableWithAggregatesFilter<"User"> | string | null
    university_email?: StringNullableWithAggregatesFilter<"User"> | string | null
    date_of_birth?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    skills?: StringNullableWithAggregatesFilter<"User"> | string | null
    interests?: StringNullableWithAggregatesFilter<"User"> | string | null
    social_links?: JsonNullableWithAggregatesFilter<"User">
    career_goals?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    isActivated?: BoolWithAggregatesFilter<"User"> | boolean
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type InvestorWhereInput = {
    AND?: InvestorWhereInput | InvestorWhereInput[]
    OR?: InvestorWhereInput[]
    NOT?: InvestorWhereInput | InvestorWhereInput[]
    id?: IntFilter<"Investor"> | number
    email?: StringNullableFilter<"Investor"> | string | null
    phone?: StringNullableFilter<"Investor"> | string | null
    password?: StringFilter<"Investor"> | string
    name?: StringNullableFilter<"Investor"> | string | null
    profile_picture?: StringNullableFilter<"Investor"> | string | null
    company_name?: StringNullableFilter<"Investor"> | string | null
    company_website?: StringNullableFilter<"Investor"> | string | null
    company_description?: StringNullableFilter<"Investor"> | string | null
    role?: StringFilter<"Investor"> | string
    isActivated?: BoolFilter<"Investor"> | boolean
    createdAt?: DateTimeFilter<"Investor"> | Date | string
    updatedAt?: DateTimeFilter<"Investor"> | Date | string
    projectInvestors?: ProjectInvestorListRelationFilter
    investments?: InvestmentListRelationFilter
  }

  export type InvestorOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    profile_picture?: SortOrderInput | SortOrder
    company_name?: SortOrderInput | SortOrder
    company_website?: SortOrderInput | SortOrder
    company_description?: SortOrderInput | SortOrder
    role?: SortOrder
    isActivated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectInvestors?: ProjectInvestorOrderByRelationAggregateInput
    investments?: InvestmentOrderByRelationAggregateInput
  }

  export type InvestorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    phone?: string
    AND?: InvestorWhereInput | InvestorWhereInput[]
    OR?: InvestorWhereInput[]
    NOT?: InvestorWhereInput | InvestorWhereInput[]
    password?: StringFilter<"Investor"> | string
    name?: StringNullableFilter<"Investor"> | string | null
    profile_picture?: StringNullableFilter<"Investor"> | string | null
    company_name?: StringNullableFilter<"Investor"> | string | null
    company_website?: StringNullableFilter<"Investor"> | string | null
    company_description?: StringNullableFilter<"Investor"> | string | null
    role?: StringFilter<"Investor"> | string
    isActivated?: BoolFilter<"Investor"> | boolean
    createdAt?: DateTimeFilter<"Investor"> | Date | string
    updatedAt?: DateTimeFilter<"Investor"> | Date | string
    projectInvestors?: ProjectInvestorListRelationFilter
    investments?: InvestmentListRelationFilter
  }, "id" | "email" | "phone">

  export type InvestorOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    profile_picture?: SortOrderInput | SortOrder
    company_name?: SortOrderInput | SortOrder
    company_website?: SortOrderInput | SortOrder
    company_description?: SortOrderInput | SortOrder
    role?: SortOrder
    isActivated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvestorCountOrderByAggregateInput
    _avg?: InvestorAvgOrderByAggregateInput
    _max?: InvestorMaxOrderByAggregateInput
    _min?: InvestorMinOrderByAggregateInput
    _sum?: InvestorSumOrderByAggregateInput
  }

  export type InvestorScalarWhereWithAggregatesInput = {
    AND?: InvestorScalarWhereWithAggregatesInput | InvestorScalarWhereWithAggregatesInput[]
    OR?: InvestorScalarWhereWithAggregatesInput[]
    NOT?: InvestorScalarWhereWithAggregatesInput | InvestorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Investor"> | number
    email?: StringNullableWithAggregatesFilter<"Investor"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Investor"> | string | null
    password?: StringWithAggregatesFilter<"Investor"> | string
    name?: StringNullableWithAggregatesFilter<"Investor"> | string | null
    profile_picture?: StringNullableWithAggregatesFilter<"Investor"> | string | null
    company_name?: StringNullableWithAggregatesFilter<"Investor"> | string | null
    company_website?: StringNullableWithAggregatesFilter<"Investor"> | string | null
    company_description?: StringNullableWithAggregatesFilter<"Investor"> | string | null
    role?: StringWithAggregatesFilter<"Investor"> | string
    isActivated?: BoolWithAggregatesFilter<"Investor"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Investor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Investor"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: IntFilter<"Project"> | number
    userId?: IntFilter<"Project"> | number
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    category?: StringFilter<"Project"> | string
    budget?: FloatFilter<"Project"> | number
    raised_amount?: FloatNullableFilter<"Project"> | number | null
    status?: StringFilter<"Project"> | string
    profile_picture?: StringNullableFilter<"Project"> | string | null
    cover_image?: StringNullableFilter<"Project"> | string | null
    pitch_video?: StringNullableFilter<"Project"> | string | null
    documents?: StringNullableListFilter<"Project">
    tags?: StringNullableFilter<"Project"> | string | null
    location?: StringNullableFilter<"Project"> | string | null
    start_date?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    projectMembers?: ProjectMemberListRelationFilter
    projectInvestors?: ProjectInvestorListRelationFilter
    investments?: InvestmentListRelationFilter
    milestones?: MilestoneListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    budget?: SortOrder
    raised_amount?: SortOrderInput | SortOrder
    status?: SortOrder
    profile_picture?: SortOrderInput | SortOrder
    cover_image?: SortOrderInput | SortOrder
    pitch_video?: SortOrderInput | SortOrder
    documents?: SortOrder
    tags?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    start_date?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    projectMembers?: ProjectMemberOrderByRelationAggregateInput
    projectInvestors?: ProjectInvestorOrderByRelationAggregateInput
    investments?: InvestmentOrderByRelationAggregateInput
    milestones?: MilestoneOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    userId?: IntFilter<"Project"> | number
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    category?: StringFilter<"Project"> | string
    budget?: FloatFilter<"Project"> | number
    raised_amount?: FloatNullableFilter<"Project"> | number | null
    status?: StringFilter<"Project"> | string
    profile_picture?: StringNullableFilter<"Project"> | string | null
    cover_image?: StringNullableFilter<"Project"> | string | null
    pitch_video?: StringNullableFilter<"Project"> | string | null
    documents?: StringNullableListFilter<"Project">
    tags?: StringNullableFilter<"Project"> | string | null
    location?: StringNullableFilter<"Project"> | string | null
    start_date?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    projectMembers?: ProjectMemberListRelationFilter
    projectInvestors?: ProjectInvestorListRelationFilter
    investments?: InvestmentListRelationFilter
    milestones?: MilestoneListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    budget?: SortOrder
    raised_amount?: SortOrderInput | SortOrder
    status?: SortOrder
    profile_picture?: SortOrderInput | SortOrder
    cover_image?: SortOrderInput | SortOrder
    pitch_video?: SortOrderInput | SortOrder
    documents?: SortOrder
    tags?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    start_date?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Project"> | number
    userId?: IntWithAggregatesFilter<"Project"> | number
    title?: StringWithAggregatesFilter<"Project"> | string
    description?: StringWithAggregatesFilter<"Project"> | string
    category?: StringWithAggregatesFilter<"Project"> | string
    budget?: FloatWithAggregatesFilter<"Project"> | number
    raised_amount?: FloatNullableWithAggregatesFilter<"Project"> | number | null
    status?: StringWithAggregatesFilter<"Project"> | string
    profile_picture?: StringNullableWithAggregatesFilter<"Project"> | string | null
    cover_image?: StringNullableWithAggregatesFilter<"Project"> | string | null
    pitch_video?: StringNullableWithAggregatesFilter<"Project"> | string | null
    documents?: StringNullableListFilter<"Project">
    tags?: StringNullableWithAggregatesFilter<"Project"> | string | null
    location?: StringNullableWithAggregatesFilter<"Project"> | string | null
    start_date?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ProjectMemberWhereInput = {
    AND?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    OR?: ProjectMemberWhereInput[]
    NOT?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    id?: IntFilter<"ProjectMember"> | number
    projectId?: IntFilter<"ProjectMember"> | number
    userId?: IntFilter<"ProjectMember"> | number
    createdAt?: DateTimeFilter<"ProjectMember"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectMember"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProjectMemberOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ProjectMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    projectId_userId?: ProjectMemberProjectIdUserIdCompoundUniqueInput
    AND?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    OR?: ProjectMemberWhereInput[]
    NOT?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    projectId?: IntFilter<"ProjectMember"> | number
    userId?: IntFilter<"ProjectMember"> | number
    createdAt?: DateTimeFilter<"ProjectMember"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectMember"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "projectId_userId">

  export type ProjectMemberOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectMemberCountOrderByAggregateInput
    _avg?: ProjectMemberAvgOrderByAggregateInput
    _max?: ProjectMemberMaxOrderByAggregateInput
    _min?: ProjectMemberMinOrderByAggregateInput
    _sum?: ProjectMemberSumOrderByAggregateInput
  }

  export type ProjectMemberScalarWhereWithAggregatesInput = {
    AND?: ProjectMemberScalarWhereWithAggregatesInput | ProjectMemberScalarWhereWithAggregatesInput[]
    OR?: ProjectMemberScalarWhereWithAggregatesInput[]
    NOT?: ProjectMemberScalarWhereWithAggregatesInput | ProjectMemberScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProjectMember"> | number
    projectId?: IntWithAggregatesFilter<"ProjectMember"> | number
    userId?: IntWithAggregatesFilter<"ProjectMember"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProjectMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectMember"> | Date | string
  }

  export type ProjectInvestorWhereInput = {
    AND?: ProjectInvestorWhereInput | ProjectInvestorWhereInput[]
    OR?: ProjectInvestorWhereInput[]
    NOT?: ProjectInvestorWhereInput | ProjectInvestorWhereInput[]
    id?: IntFilter<"ProjectInvestor"> | number
    projectId?: IntFilter<"ProjectInvestor"> | number
    investorId?: IntFilter<"ProjectInvestor"> | number
    createdAt?: DateTimeFilter<"ProjectInvestor"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectInvestor"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    investor?: XOR<InvestorScalarRelationFilter, InvestorWhereInput>
  }

  export type ProjectInvestorOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    investor?: InvestorOrderByWithRelationInput
  }

  export type ProjectInvestorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    projectId_investorId?: ProjectInvestorProjectIdInvestorIdCompoundUniqueInput
    AND?: ProjectInvestorWhereInput | ProjectInvestorWhereInput[]
    OR?: ProjectInvestorWhereInput[]
    NOT?: ProjectInvestorWhereInput | ProjectInvestorWhereInput[]
    projectId?: IntFilter<"ProjectInvestor"> | number
    investorId?: IntFilter<"ProjectInvestor"> | number
    createdAt?: DateTimeFilter<"ProjectInvestor"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectInvestor"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    investor?: XOR<InvestorScalarRelationFilter, InvestorWhereInput>
  }, "id" | "projectId_investorId">

  export type ProjectInvestorOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectInvestorCountOrderByAggregateInput
    _avg?: ProjectInvestorAvgOrderByAggregateInput
    _max?: ProjectInvestorMaxOrderByAggregateInput
    _min?: ProjectInvestorMinOrderByAggregateInput
    _sum?: ProjectInvestorSumOrderByAggregateInput
  }

  export type ProjectInvestorScalarWhereWithAggregatesInput = {
    AND?: ProjectInvestorScalarWhereWithAggregatesInput | ProjectInvestorScalarWhereWithAggregatesInput[]
    OR?: ProjectInvestorScalarWhereWithAggregatesInput[]
    NOT?: ProjectInvestorScalarWhereWithAggregatesInput | ProjectInvestorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProjectInvestor"> | number
    projectId?: IntWithAggregatesFilter<"ProjectInvestor"> | number
    investorId?: IntWithAggregatesFilter<"ProjectInvestor"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProjectInvestor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectInvestor"> | Date | string
  }

  export type InvestmentWhereInput = {
    AND?: InvestmentWhereInput | InvestmentWhereInput[]
    OR?: InvestmentWhereInput[]
    NOT?: InvestmentWhereInput | InvestmentWhereInput[]
    id?: IntFilter<"Investment"> | number
    amount?: FloatFilter<"Investment"> | number
    projectId?: IntFilter<"Investment"> | number
    investorId?: IntFilter<"Investment"> | number
    createdAt?: DateTimeFilter<"Investment"> | Date | string
    updatedAt?: DateTimeFilter<"Investment"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    investor?: XOR<InvestorScalarRelationFilter, InvestorWhereInput>
  }

  export type InvestmentOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    investor?: InvestorOrderByWithRelationInput
  }

  export type InvestmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvestmentWhereInput | InvestmentWhereInput[]
    OR?: InvestmentWhereInput[]
    NOT?: InvestmentWhereInput | InvestmentWhereInput[]
    amount?: FloatFilter<"Investment"> | number
    projectId?: IntFilter<"Investment"> | number
    investorId?: IntFilter<"Investment"> | number
    createdAt?: DateTimeFilter<"Investment"> | Date | string
    updatedAt?: DateTimeFilter<"Investment"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    investor?: XOR<InvestorScalarRelationFilter, InvestorWhereInput>
  }, "id">

  export type InvestmentOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvestmentCountOrderByAggregateInput
    _avg?: InvestmentAvgOrderByAggregateInput
    _max?: InvestmentMaxOrderByAggregateInput
    _min?: InvestmentMinOrderByAggregateInput
    _sum?: InvestmentSumOrderByAggregateInput
  }

  export type InvestmentScalarWhereWithAggregatesInput = {
    AND?: InvestmentScalarWhereWithAggregatesInput | InvestmentScalarWhereWithAggregatesInput[]
    OR?: InvestmentScalarWhereWithAggregatesInput[]
    NOT?: InvestmentScalarWhereWithAggregatesInput | InvestmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Investment"> | number
    amount?: FloatWithAggregatesFilter<"Investment"> | number
    projectId?: IntWithAggregatesFilter<"Investment"> | number
    investorId?: IntWithAggregatesFilter<"Investment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Investment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Investment"> | Date | string
  }

  export type MilestoneWhereInput = {
    AND?: MilestoneWhereInput | MilestoneWhereInput[]
    OR?: MilestoneWhereInput[]
    NOT?: MilestoneWhereInput | MilestoneWhereInput[]
    id?: IntFilter<"Milestone"> | number
    title?: StringFilter<"Milestone"> | string
    description?: StringFilter<"Milestone"> | string
    amount?: FloatFilter<"Milestone"> | number
    status?: StringFilter<"Milestone"> | string
    projectId?: IntFilter<"Milestone"> | number
    completedAt?: StringNullableFilter<"Milestone"> | string | null
    deadlineAt?: StringNullableFilter<"Milestone"> | string | null
    progress?: IntNullableFilter<"Milestone"> | number | null
    raised_amount?: FloatNullableFilter<"Milestone"> | number | null
    plannedAt?: StringNullableFilter<"Milestone"> | string | null
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type MilestoneOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    projectId?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    deadlineAt?: SortOrderInput | SortOrder
    progress?: SortOrderInput | SortOrder
    raised_amount?: SortOrderInput | SortOrder
    plannedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type MilestoneWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MilestoneWhereInput | MilestoneWhereInput[]
    OR?: MilestoneWhereInput[]
    NOT?: MilestoneWhereInput | MilestoneWhereInput[]
    title?: StringFilter<"Milestone"> | string
    description?: StringFilter<"Milestone"> | string
    amount?: FloatFilter<"Milestone"> | number
    status?: StringFilter<"Milestone"> | string
    projectId?: IntFilter<"Milestone"> | number
    completedAt?: StringNullableFilter<"Milestone"> | string | null
    deadlineAt?: StringNullableFilter<"Milestone"> | string | null
    progress?: IntNullableFilter<"Milestone"> | number | null
    raised_amount?: FloatNullableFilter<"Milestone"> | number | null
    plannedAt?: StringNullableFilter<"Milestone"> | string | null
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type MilestoneOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    projectId?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    deadlineAt?: SortOrderInput | SortOrder
    progress?: SortOrderInput | SortOrder
    raised_amount?: SortOrderInput | SortOrder
    plannedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MilestoneCountOrderByAggregateInput
    _avg?: MilestoneAvgOrderByAggregateInput
    _max?: MilestoneMaxOrderByAggregateInput
    _min?: MilestoneMinOrderByAggregateInput
    _sum?: MilestoneSumOrderByAggregateInput
  }

  export type MilestoneScalarWhereWithAggregatesInput = {
    AND?: MilestoneScalarWhereWithAggregatesInput | MilestoneScalarWhereWithAggregatesInput[]
    OR?: MilestoneScalarWhereWithAggregatesInput[]
    NOT?: MilestoneScalarWhereWithAggregatesInput | MilestoneScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Milestone"> | number
    title?: StringWithAggregatesFilter<"Milestone"> | string
    description?: StringWithAggregatesFilter<"Milestone"> | string
    amount?: FloatWithAggregatesFilter<"Milestone"> | number
    status?: StringWithAggregatesFilter<"Milestone"> | string
    projectId?: IntWithAggregatesFilter<"Milestone"> | number
    completedAt?: StringNullableWithAggregatesFilter<"Milestone"> | string | null
    deadlineAt?: StringNullableWithAggregatesFilter<"Milestone"> | string | null
    progress?: IntNullableWithAggregatesFilter<"Milestone"> | number | null
    raised_amount?: FloatNullableWithAggregatesFilter<"Milestone"> | number | null
    plannedAt?: StringNullableWithAggregatesFilter<"Milestone"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
  }

  export type UserCreateInput = {
    phone: string
    password: string
    name?: string | null
    profile_picture?: string | null
    university?: string | null
    department?: string | null
    year_of_study?: string | null
    graduation_year?: string | null
    cgpa?: number | null
    student_id?: string | null
    student_id_front?: string | null
    student_id_back?: string | null
    nid_front?: string | null
    nid_back?: string | null
    university_email?: string | null
    date_of_birth?: string | null
    address?: string | null
    bio?: string | null
    skills?: string | null
    interests?: string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: string | null
    role?: string
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: ProjectMemberCreateNestedManyWithoutUserInput
    Project?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    phone: string
    password: string
    name?: string | null
    profile_picture?: string | null
    university?: string | null
    department?: string | null
    year_of_study?: string | null
    graduation_year?: string | null
    cgpa?: number | null
    student_id?: string | null
    student_id_front?: string | null
    student_id_back?: string | null
    nid_front?: string | null
    nid_back?: string | null
    university_email?: string | null
    date_of_birth?: string | null
    address?: string | null
    bio?: string | null
    skills?: string | null
    interests?: string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: string | null
    role?: string
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: ProjectMemberUncheckedCreateNestedManyWithoutUserInput
    Project?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    year_of_study?: NullableStringFieldUpdateOperationsInput | string | null
    graduation_year?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_front?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_back?: NullableStringFieldUpdateOperationsInput | string | null
    nid_front?: NullableStringFieldUpdateOperationsInput | string | null
    nid_back?: NullableStringFieldUpdateOperationsInput | string | null
    university_email?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: ProjectMemberUpdateManyWithoutUserNestedInput
    Project?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    year_of_study?: NullableStringFieldUpdateOperationsInput | string | null
    graduation_year?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_front?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_back?: NullableStringFieldUpdateOperationsInput | string | null
    nid_front?: NullableStringFieldUpdateOperationsInput | string | null
    nid_back?: NullableStringFieldUpdateOperationsInput | string | null
    university_email?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: ProjectMemberUncheckedUpdateManyWithoutUserNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    phone: string
    password: string
    name?: string | null
    profile_picture?: string | null
    university?: string | null
    department?: string | null
    year_of_study?: string | null
    graduation_year?: string | null
    cgpa?: number | null
    student_id?: string | null
    student_id_front?: string | null
    student_id_back?: string | null
    nid_front?: string | null
    nid_back?: string | null
    university_email?: string | null
    date_of_birth?: string | null
    address?: string | null
    bio?: string | null
    skills?: string | null
    interests?: string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: string | null
    role?: string
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    year_of_study?: NullableStringFieldUpdateOperationsInput | string | null
    graduation_year?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_front?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_back?: NullableStringFieldUpdateOperationsInput | string | null
    nid_front?: NullableStringFieldUpdateOperationsInput | string | null
    nid_back?: NullableStringFieldUpdateOperationsInput | string | null
    university_email?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    year_of_study?: NullableStringFieldUpdateOperationsInput | string | null
    graduation_year?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_front?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_back?: NullableStringFieldUpdateOperationsInput | string | null
    nid_front?: NullableStringFieldUpdateOperationsInput | string | null
    nid_back?: NullableStringFieldUpdateOperationsInput | string | null
    university_email?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestorCreateInput = {
    email?: string | null
    phone?: string | null
    password: string
    name?: string | null
    profile_picture?: string | null
    company_name?: string | null
    company_website?: string | null
    company_description?: string | null
    role?: string
    isActivated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projectInvestors?: ProjectInvestorCreateNestedManyWithoutInvestorInput
    investments?: InvestmentCreateNestedManyWithoutInvestorInput
  }

  export type InvestorUncheckedCreateInput = {
    id?: number
    email?: string | null
    phone?: string | null
    password: string
    name?: string | null
    profile_picture?: string | null
    company_name?: string | null
    company_website?: string | null
    company_description?: string | null
    role?: string
    isActivated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projectInvestors?: ProjectInvestorUncheckedCreateNestedManyWithoutInvestorInput
    investments?: InvestmentUncheckedCreateNestedManyWithoutInvestorInput
  }

  export type InvestorUpdateInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectInvestors?: ProjectInvestorUpdateManyWithoutInvestorNestedInput
    investments?: InvestmentUpdateManyWithoutInvestorNestedInput
  }

  export type InvestorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectInvestors?: ProjectInvestorUncheckedUpdateManyWithoutInvestorNestedInput
    investments?: InvestmentUncheckedUpdateManyWithoutInvestorNestedInput
  }

  export type InvestorCreateManyInput = {
    id?: number
    email?: string | null
    phone?: string | null
    password: string
    name?: string | null
    profile_picture?: string | null
    company_name?: string | null
    company_website?: string | null
    company_description?: string | null
    role?: string
    isActivated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestorUpdateManyMutationInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectInput
    projectMembers?: ProjectMemberCreateNestedManyWithoutProjectInput
    projectInvestors?: ProjectInvestorCreateNestedManyWithoutProjectInput
    investments?: InvestmentCreateNestedManyWithoutProjectInput
    milestones?: MilestoneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: number
    userId: number
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput
    projectInvestors?: ProjectInvestorUncheckedCreateNestedManyWithoutProjectInput
    investments?: InvestmentUncheckedCreateNestedManyWithoutProjectInput
    milestones?: MilestoneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectNestedInput
    projectMembers?: ProjectMemberUpdateManyWithoutProjectNestedInput
    projectInvestors?: ProjectInvestorUpdateManyWithoutProjectNestedInput
    investments?: InvestmentUpdateManyWithoutProjectNestedInput
    milestones?: MilestoneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput
    projectInvestors?: ProjectInvestorUncheckedUpdateManyWithoutProjectNestedInput
    investments?: InvestmentUncheckedUpdateManyWithoutProjectNestedInput
    milestones?: MilestoneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: number
    userId: number
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutProjectMembersInput
    user: UserCreateNestedOneWithoutProjectMembersInput
  }

  export type ProjectMemberUncheckedCreateInput = {
    id?: number
    projectId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMemberUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutProjectMembersNestedInput
    user?: UserUpdateOneRequiredWithoutProjectMembersNestedInput
  }

  export type ProjectMemberUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberCreateManyInput = {
    id?: number
    projectId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMemberUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectInvestorCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutProjectInvestorsInput
    investor: InvestorCreateNestedOneWithoutProjectInvestorsInput
  }

  export type ProjectInvestorUncheckedCreateInput = {
    id?: number
    projectId: number
    investorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectInvestorUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutProjectInvestorsNestedInput
    investor?: InvestorUpdateOneRequiredWithoutProjectInvestorsNestedInput
  }

  export type ProjectInvestorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    investorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectInvestorCreateManyInput = {
    id?: number
    projectId: number
    investorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectInvestorUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectInvestorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    investorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentCreateInput = {
    amount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutInvestmentsInput
    investor: InvestorCreateNestedOneWithoutInvestmentsInput
  }

  export type InvestmentUncheckedCreateInput = {
    id?: number
    amount: number
    projectId: number
    investorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestmentUpdateInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutInvestmentsNestedInput
    investor?: InvestorUpdateOneRequiredWithoutInvestmentsNestedInput
  }

  export type InvestmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    investorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentCreateManyInput = {
    id?: number
    amount: number
    projectId: number
    investorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestmentUpdateManyMutationInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    investorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneCreateInput = {
    title: string
    description: string
    amount: number
    status?: string
    completedAt?: string | null
    deadlineAt?: string | null
    progress?: number | null
    raised_amount?: number | null
    plannedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutMilestonesInput
  }

  export type MilestoneUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    amount: number
    status?: string
    projectId: number
    completedAt?: string | null
    deadlineAt?: string | null
    progress?: number | null
    raised_amount?: number | null
    plannedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    plannedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutMilestonesNestedInput
  }

  export type MilestoneUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    projectId?: IntFieldUpdateOperationsInput | number
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    plannedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneCreateManyInput = {
    id?: number
    title: string
    description: string
    amount: number
    status?: string
    projectId: number
    completedAt?: string | null
    deadlineAt?: string | null
    progress?: number | null
    raised_amount?: number | null
    plannedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    plannedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    projectId?: IntFieldUpdateOperationsInput | number
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    plannedAt?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type ProjectMemberListRelationFilter = {
    every?: ProjectMemberWhereInput
    some?: ProjectMemberWhereInput
    none?: ProjectMemberWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    name?: SortOrder
    profile_picture?: SortOrder
    university?: SortOrder
    department?: SortOrder
    year_of_study?: SortOrder
    graduation_year?: SortOrder
    cgpa?: SortOrder
    student_id?: SortOrder
    student_id_front?: SortOrder
    student_id_back?: SortOrder
    nid_front?: SortOrder
    nid_back?: SortOrder
    university_email?: SortOrder
    date_of_birth?: SortOrder
    address?: SortOrder
    bio?: SortOrder
    skills?: SortOrder
    interests?: SortOrder
    social_links?: SortOrder
    career_goals?: SortOrder
    role?: SortOrder
    isActivated?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    cgpa?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    name?: SortOrder
    profile_picture?: SortOrder
    university?: SortOrder
    department?: SortOrder
    year_of_study?: SortOrder
    graduation_year?: SortOrder
    cgpa?: SortOrder
    student_id?: SortOrder
    student_id_front?: SortOrder
    student_id_back?: SortOrder
    nid_front?: SortOrder
    nid_back?: SortOrder
    university_email?: SortOrder
    date_of_birth?: SortOrder
    address?: SortOrder
    bio?: SortOrder
    skills?: SortOrder
    interests?: SortOrder
    career_goals?: SortOrder
    role?: SortOrder
    isActivated?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    name?: SortOrder
    profile_picture?: SortOrder
    university?: SortOrder
    department?: SortOrder
    year_of_study?: SortOrder
    graduation_year?: SortOrder
    cgpa?: SortOrder
    student_id?: SortOrder
    student_id_front?: SortOrder
    student_id_back?: SortOrder
    nid_front?: SortOrder
    nid_back?: SortOrder
    university_email?: SortOrder
    date_of_birth?: SortOrder
    address?: SortOrder
    bio?: SortOrder
    skills?: SortOrder
    interests?: SortOrder
    career_goals?: SortOrder
    role?: SortOrder
    isActivated?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    cgpa?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type ProjectInvestorListRelationFilter = {
    every?: ProjectInvestorWhereInput
    some?: ProjectInvestorWhereInput
    none?: ProjectInvestorWhereInput
  }

  export type InvestmentListRelationFilter = {
    every?: InvestmentWhereInput
    some?: InvestmentWhereInput
    none?: InvestmentWhereInput
  }

  export type ProjectInvestorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvestmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvestorCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    name?: SortOrder
    profile_picture?: SortOrder
    company_name?: SortOrder
    company_website?: SortOrder
    company_description?: SortOrder
    role?: SortOrder
    isActivated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvestorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type InvestorMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    name?: SortOrder
    profile_picture?: SortOrder
    company_name?: SortOrder
    company_website?: SortOrder
    company_description?: SortOrder
    role?: SortOrder
    isActivated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvestorMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    name?: SortOrder
    profile_picture?: SortOrder
    company_name?: SortOrder
    company_website?: SortOrder
    company_description?: SortOrder
    role?: SortOrder
    isActivated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvestorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MilestoneListRelationFilter = {
    every?: MilestoneWhereInput
    some?: MilestoneWhereInput
    none?: MilestoneWhereInput
  }

  export type MilestoneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    budget?: SortOrder
    raised_amount?: SortOrder
    status?: SortOrder
    profile_picture?: SortOrder
    cover_image?: SortOrder
    pitch_video?: SortOrder
    documents?: SortOrder
    tags?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    budget?: SortOrder
    raised_amount?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    budget?: SortOrder
    raised_amount?: SortOrder
    status?: SortOrder
    profile_picture?: SortOrder
    cover_image?: SortOrder
    pitch_video?: SortOrder
    tags?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    budget?: SortOrder
    raised_amount?: SortOrder
    status?: SortOrder
    profile_picture?: SortOrder
    cover_image?: SortOrder
    pitch_video?: SortOrder
    tags?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    budget?: SortOrder
    raised_amount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectMemberProjectIdUserIdCompoundUniqueInput = {
    projectId: number
    userId: number
  }

  export type ProjectMemberCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMemberAvgOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMemberMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMemberSumOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
  }

  export type InvestorScalarRelationFilter = {
    is?: InvestorWhereInput
    isNot?: InvestorWhereInput
  }

  export type ProjectInvestorProjectIdInvestorIdCompoundUniqueInput = {
    projectId: number
    investorId: number
  }

  export type ProjectInvestorCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectInvestorAvgOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
  }

  export type ProjectInvestorMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectInvestorMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectInvestorSumOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
  }

  export type InvestmentCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvestmentAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
  }

  export type InvestmentMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvestmentMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvestmentSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    projectId?: SortOrder
    investorId?: SortOrder
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

  export type MilestoneCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    projectId?: SortOrder
    completedAt?: SortOrder
    deadlineAt?: SortOrder
    progress?: SortOrder
    raised_amount?: SortOrder
    plannedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilestoneAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    projectId?: SortOrder
    progress?: SortOrder
    raised_amount?: SortOrder
  }

  export type MilestoneMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    projectId?: SortOrder
    completedAt?: SortOrder
    deadlineAt?: SortOrder
    progress?: SortOrder
    raised_amount?: SortOrder
    plannedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilestoneMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    projectId?: SortOrder
    completedAt?: SortOrder
    deadlineAt?: SortOrder
    progress?: SortOrder
    raised_amount?: SortOrder
    plannedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilestoneSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    projectId?: SortOrder
    progress?: SortOrder
    raised_amount?: SortOrder
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

  export type ProjectMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutUserInput | ProjectMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutUserInput | ProjectMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutUserInput | ProjectMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutUserInput | ProjectMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutUserInput | ProjectMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutUserInput | ProjectMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectInvestorCreateNestedManyWithoutInvestorInput = {
    create?: XOR<ProjectInvestorCreateWithoutInvestorInput, ProjectInvestorUncheckedCreateWithoutInvestorInput> | ProjectInvestorCreateWithoutInvestorInput[] | ProjectInvestorUncheckedCreateWithoutInvestorInput[]
    connectOrCreate?: ProjectInvestorCreateOrConnectWithoutInvestorInput | ProjectInvestorCreateOrConnectWithoutInvestorInput[]
    createMany?: ProjectInvestorCreateManyInvestorInputEnvelope
    connect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
  }

  export type InvestmentCreateNestedManyWithoutInvestorInput = {
    create?: XOR<InvestmentCreateWithoutInvestorInput, InvestmentUncheckedCreateWithoutInvestorInput> | InvestmentCreateWithoutInvestorInput[] | InvestmentUncheckedCreateWithoutInvestorInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutInvestorInput | InvestmentCreateOrConnectWithoutInvestorInput[]
    createMany?: InvestmentCreateManyInvestorInputEnvelope
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
  }

  export type ProjectInvestorUncheckedCreateNestedManyWithoutInvestorInput = {
    create?: XOR<ProjectInvestorCreateWithoutInvestorInput, ProjectInvestorUncheckedCreateWithoutInvestorInput> | ProjectInvestorCreateWithoutInvestorInput[] | ProjectInvestorUncheckedCreateWithoutInvestorInput[]
    connectOrCreate?: ProjectInvestorCreateOrConnectWithoutInvestorInput | ProjectInvestorCreateOrConnectWithoutInvestorInput[]
    createMany?: ProjectInvestorCreateManyInvestorInputEnvelope
    connect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
  }

  export type InvestmentUncheckedCreateNestedManyWithoutInvestorInput = {
    create?: XOR<InvestmentCreateWithoutInvestorInput, InvestmentUncheckedCreateWithoutInvestorInput> | InvestmentCreateWithoutInvestorInput[] | InvestmentUncheckedCreateWithoutInvestorInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutInvestorInput | InvestmentCreateOrConnectWithoutInvestorInput[]
    createMany?: InvestmentCreateManyInvestorInputEnvelope
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
  }

  export type ProjectInvestorUpdateManyWithoutInvestorNestedInput = {
    create?: XOR<ProjectInvestorCreateWithoutInvestorInput, ProjectInvestorUncheckedCreateWithoutInvestorInput> | ProjectInvestorCreateWithoutInvestorInput[] | ProjectInvestorUncheckedCreateWithoutInvestorInput[]
    connectOrCreate?: ProjectInvestorCreateOrConnectWithoutInvestorInput | ProjectInvestorCreateOrConnectWithoutInvestorInput[]
    upsert?: ProjectInvestorUpsertWithWhereUniqueWithoutInvestorInput | ProjectInvestorUpsertWithWhereUniqueWithoutInvestorInput[]
    createMany?: ProjectInvestorCreateManyInvestorInputEnvelope
    set?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    disconnect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    delete?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    connect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    update?: ProjectInvestorUpdateWithWhereUniqueWithoutInvestorInput | ProjectInvestorUpdateWithWhereUniqueWithoutInvestorInput[]
    updateMany?: ProjectInvestorUpdateManyWithWhereWithoutInvestorInput | ProjectInvestorUpdateManyWithWhereWithoutInvestorInput[]
    deleteMany?: ProjectInvestorScalarWhereInput | ProjectInvestorScalarWhereInput[]
  }

  export type InvestmentUpdateManyWithoutInvestorNestedInput = {
    create?: XOR<InvestmentCreateWithoutInvestorInput, InvestmentUncheckedCreateWithoutInvestorInput> | InvestmentCreateWithoutInvestorInput[] | InvestmentUncheckedCreateWithoutInvestorInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutInvestorInput | InvestmentCreateOrConnectWithoutInvestorInput[]
    upsert?: InvestmentUpsertWithWhereUniqueWithoutInvestorInput | InvestmentUpsertWithWhereUniqueWithoutInvestorInput[]
    createMany?: InvestmentCreateManyInvestorInputEnvelope
    set?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    disconnect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    delete?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    update?: InvestmentUpdateWithWhereUniqueWithoutInvestorInput | InvestmentUpdateWithWhereUniqueWithoutInvestorInput[]
    updateMany?: InvestmentUpdateManyWithWhereWithoutInvestorInput | InvestmentUpdateManyWithWhereWithoutInvestorInput[]
    deleteMany?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
  }

  export type ProjectInvestorUncheckedUpdateManyWithoutInvestorNestedInput = {
    create?: XOR<ProjectInvestorCreateWithoutInvestorInput, ProjectInvestorUncheckedCreateWithoutInvestorInput> | ProjectInvestorCreateWithoutInvestorInput[] | ProjectInvestorUncheckedCreateWithoutInvestorInput[]
    connectOrCreate?: ProjectInvestorCreateOrConnectWithoutInvestorInput | ProjectInvestorCreateOrConnectWithoutInvestorInput[]
    upsert?: ProjectInvestorUpsertWithWhereUniqueWithoutInvestorInput | ProjectInvestorUpsertWithWhereUniqueWithoutInvestorInput[]
    createMany?: ProjectInvestorCreateManyInvestorInputEnvelope
    set?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    disconnect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    delete?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    connect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    update?: ProjectInvestorUpdateWithWhereUniqueWithoutInvestorInput | ProjectInvestorUpdateWithWhereUniqueWithoutInvestorInput[]
    updateMany?: ProjectInvestorUpdateManyWithWhereWithoutInvestorInput | ProjectInvestorUpdateManyWithWhereWithoutInvestorInput[]
    deleteMany?: ProjectInvestorScalarWhereInput | ProjectInvestorScalarWhereInput[]
  }

  export type InvestmentUncheckedUpdateManyWithoutInvestorNestedInput = {
    create?: XOR<InvestmentCreateWithoutInvestorInput, InvestmentUncheckedCreateWithoutInvestorInput> | InvestmentCreateWithoutInvestorInput[] | InvestmentUncheckedCreateWithoutInvestorInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutInvestorInput | InvestmentCreateOrConnectWithoutInvestorInput[]
    upsert?: InvestmentUpsertWithWhereUniqueWithoutInvestorInput | InvestmentUpsertWithWhereUniqueWithoutInvestorInput[]
    createMany?: InvestmentCreateManyInvestorInputEnvelope
    set?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    disconnect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    delete?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    update?: InvestmentUpdateWithWhereUniqueWithoutInvestorInput | InvestmentUpdateWithWhereUniqueWithoutInvestorInput[]
    updateMany?: InvestmentUpdateManyWithWhereWithoutInvestorInput | InvestmentUpdateManyWithWhereWithoutInvestorInput[]
    deleteMany?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
  }

  export type ProjectCreatedocumentsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutProjectInput = {
    create?: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectMemberCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type ProjectInvestorCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectInvestorCreateWithoutProjectInput, ProjectInvestorUncheckedCreateWithoutProjectInput> | ProjectInvestorCreateWithoutProjectInput[] | ProjectInvestorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectInvestorCreateOrConnectWithoutProjectInput | ProjectInvestorCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectInvestorCreateManyProjectInputEnvelope
    connect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
  }

  export type InvestmentCreateNestedManyWithoutProjectInput = {
    create?: XOR<InvestmentCreateWithoutProjectInput, InvestmentUncheckedCreateWithoutProjectInput> | InvestmentCreateWithoutProjectInput[] | InvestmentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutProjectInput | InvestmentCreateOrConnectWithoutProjectInput[]
    createMany?: InvestmentCreateManyProjectInputEnvelope
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
  }

  export type MilestoneCreateNestedManyWithoutProjectInput = {
    create?: XOR<MilestoneCreateWithoutProjectInput, MilestoneUncheckedCreateWithoutProjectInput> | MilestoneCreateWithoutProjectInput[] | MilestoneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutProjectInput | MilestoneCreateOrConnectWithoutProjectInput[]
    createMany?: MilestoneCreateManyProjectInputEnvelope
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
  }

  export type ProjectMemberUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type ProjectInvestorUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectInvestorCreateWithoutProjectInput, ProjectInvestorUncheckedCreateWithoutProjectInput> | ProjectInvestorCreateWithoutProjectInput[] | ProjectInvestorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectInvestorCreateOrConnectWithoutProjectInput | ProjectInvestorCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectInvestorCreateManyProjectInputEnvelope
    connect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
  }

  export type InvestmentUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<InvestmentCreateWithoutProjectInput, InvestmentUncheckedCreateWithoutProjectInput> | InvestmentCreateWithoutProjectInput[] | InvestmentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutProjectInput | InvestmentCreateOrConnectWithoutProjectInput[]
    createMany?: InvestmentCreateManyProjectInputEnvelope
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
  }

  export type MilestoneUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<MilestoneCreateWithoutProjectInput, MilestoneUncheckedCreateWithoutProjectInput> | MilestoneCreateWithoutProjectInput[] | MilestoneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutProjectInput | MilestoneCreateOrConnectWithoutProjectInput[]
    createMany?: MilestoneCreateManyProjectInputEnvelope
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdatedocumentsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutProjectNestedInput = {
    create?: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectInput
    upsert?: UserUpsertWithoutProjectInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectInput, UserUpdateWithoutProjectInput>, UserUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectMemberUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutProjectInput | ProjectMemberUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutProjectInput | ProjectMemberUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutProjectInput | ProjectMemberUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type ProjectInvestorUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectInvestorCreateWithoutProjectInput, ProjectInvestorUncheckedCreateWithoutProjectInput> | ProjectInvestorCreateWithoutProjectInput[] | ProjectInvestorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectInvestorCreateOrConnectWithoutProjectInput | ProjectInvestorCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectInvestorUpsertWithWhereUniqueWithoutProjectInput | ProjectInvestorUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectInvestorCreateManyProjectInputEnvelope
    set?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    disconnect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    delete?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    connect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    update?: ProjectInvestorUpdateWithWhereUniqueWithoutProjectInput | ProjectInvestorUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectInvestorUpdateManyWithWhereWithoutProjectInput | ProjectInvestorUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectInvestorScalarWhereInput | ProjectInvestorScalarWhereInput[]
  }

  export type InvestmentUpdateManyWithoutProjectNestedInput = {
    create?: XOR<InvestmentCreateWithoutProjectInput, InvestmentUncheckedCreateWithoutProjectInput> | InvestmentCreateWithoutProjectInput[] | InvestmentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutProjectInput | InvestmentCreateOrConnectWithoutProjectInput[]
    upsert?: InvestmentUpsertWithWhereUniqueWithoutProjectInput | InvestmentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: InvestmentCreateManyProjectInputEnvelope
    set?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    disconnect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    delete?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    update?: InvestmentUpdateWithWhereUniqueWithoutProjectInput | InvestmentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: InvestmentUpdateManyWithWhereWithoutProjectInput | InvestmentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
  }

  export type MilestoneUpdateManyWithoutProjectNestedInput = {
    create?: XOR<MilestoneCreateWithoutProjectInput, MilestoneUncheckedCreateWithoutProjectInput> | MilestoneCreateWithoutProjectInput[] | MilestoneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutProjectInput | MilestoneCreateOrConnectWithoutProjectInput[]
    upsert?: MilestoneUpsertWithWhereUniqueWithoutProjectInput | MilestoneUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: MilestoneCreateManyProjectInputEnvelope
    set?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    disconnect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    delete?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    update?: MilestoneUpdateWithWhereUniqueWithoutProjectInput | MilestoneUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: MilestoneUpdateManyWithWhereWithoutProjectInput | MilestoneUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
  }

  export type ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutProjectInput | ProjectMemberUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutProjectInput | ProjectMemberUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutProjectInput | ProjectMemberUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type ProjectInvestorUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectInvestorCreateWithoutProjectInput, ProjectInvestorUncheckedCreateWithoutProjectInput> | ProjectInvestorCreateWithoutProjectInput[] | ProjectInvestorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectInvestorCreateOrConnectWithoutProjectInput | ProjectInvestorCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectInvestorUpsertWithWhereUniqueWithoutProjectInput | ProjectInvestorUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectInvestorCreateManyProjectInputEnvelope
    set?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    disconnect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    delete?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    connect?: ProjectInvestorWhereUniqueInput | ProjectInvestorWhereUniqueInput[]
    update?: ProjectInvestorUpdateWithWhereUniqueWithoutProjectInput | ProjectInvestorUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectInvestorUpdateManyWithWhereWithoutProjectInput | ProjectInvestorUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectInvestorScalarWhereInput | ProjectInvestorScalarWhereInput[]
  }

  export type InvestmentUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<InvestmentCreateWithoutProjectInput, InvestmentUncheckedCreateWithoutProjectInput> | InvestmentCreateWithoutProjectInput[] | InvestmentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutProjectInput | InvestmentCreateOrConnectWithoutProjectInput[]
    upsert?: InvestmentUpsertWithWhereUniqueWithoutProjectInput | InvestmentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: InvestmentCreateManyProjectInputEnvelope
    set?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    disconnect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    delete?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    update?: InvestmentUpdateWithWhereUniqueWithoutProjectInput | InvestmentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: InvestmentUpdateManyWithWhereWithoutProjectInput | InvestmentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
  }

  export type MilestoneUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<MilestoneCreateWithoutProjectInput, MilestoneUncheckedCreateWithoutProjectInput> | MilestoneCreateWithoutProjectInput[] | MilestoneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutProjectInput | MilestoneCreateOrConnectWithoutProjectInput[]
    upsert?: MilestoneUpsertWithWhereUniqueWithoutProjectInput | MilestoneUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: MilestoneCreateManyProjectInputEnvelope
    set?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    disconnect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    delete?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    update?: MilestoneUpdateWithWhereUniqueWithoutProjectInput | MilestoneUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: MilestoneUpdateManyWithWhereWithoutProjectInput | MilestoneUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutProjectMembersInput = {
    create?: XOR<ProjectCreateWithoutProjectMembersInput, ProjectUncheckedCreateWithoutProjectMembersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectMembersInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProjectMembersInput = {
    create?: XOR<UserCreateWithoutProjectMembersInput, UserUncheckedCreateWithoutProjectMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectMembersInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutProjectMembersNestedInput = {
    create?: XOR<ProjectCreateWithoutProjectMembersInput, ProjectUncheckedCreateWithoutProjectMembersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectMembersInput
    upsert?: ProjectUpsertWithoutProjectMembersInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutProjectMembersInput, ProjectUpdateWithoutProjectMembersInput>, ProjectUncheckedUpdateWithoutProjectMembersInput>
  }

  export type UserUpdateOneRequiredWithoutProjectMembersNestedInput = {
    create?: XOR<UserCreateWithoutProjectMembersInput, UserUncheckedCreateWithoutProjectMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectMembersInput
    upsert?: UserUpsertWithoutProjectMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectMembersInput, UserUpdateWithoutProjectMembersInput>, UserUncheckedUpdateWithoutProjectMembersInput>
  }

  export type ProjectCreateNestedOneWithoutProjectInvestorsInput = {
    create?: XOR<ProjectCreateWithoutProjectInvestorsInput, ProjectUncheckedCreateWithoutProjectInvestorsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectInvestorsInput
    connect?: ProjectWhereUniqueInput
  }

  export type InvestorCreateNestedOneWithoutProjectInvestorsInput = {
    create?: XOR<InvestorCreateWithoutProjectInvestorsInput, InvestorUncheckedCreateWithoutProjectInvestorsInput>
    connectOrCreate?: InvestorCreateOrConnectWithoutProjectInvestorsInput
    connect?: InvestorWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutProjectInvestorsNestedInput = {
    create?: XOR<ProjectCreateWithoutProjectInvestorsInput, ProjectUncheckedCreateWithoutProjectInvestorsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectInvestorsInput
    upsert?: ProjectUpsertWithoutProjectInvestorsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutProjectInvestorsInput, ProjectUpdateWithoutProjectInvestorsInput>, ProjectUncheckedUpdateWithoutProjectInvestorsInput>
  }

  export type InvestorUpdateOneRequiredWithoutProjectInvestorsNestedInput = {
    create?: XOR<InvestorCreateWithoutProjectInvestorsInput, InvestorUncheckedCreateWithoutProjectInvestorsInput>
    connectOrCreate?: InvestorCreateOrConnectWithoutProjectInvestorsInput
    upsert?: InvestorUpsertWithoutProjectInvestorsInput
    connect?: InvestorWhereUniqueInput
    update?: XOR<XOR<InvestorUpdateToOneWithWhereWithoutProjectInvestorsInput, InvestorUpdateWithoutProjectInvestorsInput>, InvestorUncheckedUpdateWithoutProjectInvestorsInput>
  }

  export type ProjectCreateNestedOneWithoutInvestmentsInput = {
    create?: XOR<ProjectCreateWithoutInvestmentsInput, ProjectUncheckedCreateWithoutInvestmentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInvestmentsInput
    connect?: ProjectWhereUniqueInput
  }

  export type InvestorCreateNestedOneWithoutInvestmentsInput = {
    create?: XOR<InvestorCreateWithoutInvestmentsInput, InvestorUncheckedCreateWithoutInvestmentsInput>
    connectOrCreate?: InvestorCreateOrConnectWithoutInvestmentsInput
    connect?: InvestorWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutInvestmentsNestedInput = {
    create?: XOR<ProjectCreateWithoutInvestmentsInput, ProjectUncheckedCreateWithoutInvestmentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInvestmentsInput
    upsert?: ProjectUpsertWithoutInvestmentsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutInvestmentsInput, ProjectUpdateWithoutInvestmentsInput>, ProjectUncheckedUpdateWithoutInvestmentsInput>
  }

  export type InvestorUpdateOneRequiredWithoutInvestmentsNestedInput = {
    create?: XOR<InvestorCreateWithoutInvestmentsInput, InvestorUncheckedCreateWithoutInvestmentsInput>
    connectOrCreate?: InvestorCreateOrConnectWithoutInvestmentsInput
    upsert?: InvestorUpsertWithoutInvestmentsInput
    connect?: InvestorWhereUniqueInput
    update?: XOR<XOR<InvestorUpdateToOneWithWhereWithoutInvestmentsInput, InvestorUpdateWithoutInvestmentsInput>, InvestorUncheckedUpdateWithoutInvestmentsInput>
  }

  export type ProjectCreateNestedOneWithoutMilestonesInput = {
    create?: XOR<ProjectCreateWithoutMilestonesInput, ProjectUncheckedCreateWithoutMilestonesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMilestonesInput
    connect?: ProjectWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutMilestonesNestedInput = {
    create?: XOR<ProjectCreateWithoutMilestonesInput, ProjectUncheckedCreateWithoutMilestonesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMilestonesInput
    upsert?: ProjectUpsertWithoutMilestonesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutMilestonesInput, ProjectUpdateWithoutMilestonesInput>, ProjectUncheckedUpdateWithoutMilestonesInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type ProjectMemberCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutProjectMembersInput
  }

  export type ProjectMemberUncheckedCreateWithoutUserInput = {
    id?: number
    projectId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMemberCreateOrConnectWithoutUserInput = {
    where: ProjectMemberWhereUniqueInput
    create: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput>
  }

  export type ProjectMemberCreateManyUserInputEnvelope = {
    data: ProjectMemberCreateManyUserInput | ProjectMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutUserInput = {
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: ProjectMemberCreateNestedManyWithoutProjectInput
    projectInvestors?: ProjectInvestorCreateNestedManyWithoutProjectInput
    investments?: InvestmentCreateNestedManyWithoutProjectInput
    milestones?: MilestoneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput
    projectInvestors?: ProjectInvestorUncheckedCreateNestedManyWithoutProjectInput
    investments?: InvestmentUncheckedCreateNestedManyWithoutProjectInput
    milestones?: MilestoneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectMemberWhereUniqueInput
    update: XOR<ProjectMemberUpdateWithoutUserInput, ProjectMemberUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput>
  }

  export type ProjectMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectMemberWhereUniqueInput
    data: XOR<ProjectMemberUpdateWithoutUserInput, ProjectMemberUncheckedUpdateWithoutUserInput>
  }

  export type ProjectMemberUpdateManyWithWhereWithoutUserInput = {
    where: ProjectMemberScalarWhereInput
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectMemberScalarWhereInput = {
    AND?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
    OR?: ProjectMemberScalarWhereInput[]
    NOT?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
    id?: IntFilter<"ProjectMember"> | number
    projectId?: IntFilter<"ProjectMember"> | number
    userId?: IntFilter<"ProjectMember"> | number
    createdAt?: DateTimeFilter<"ProjectMember"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectMember"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: IntFilter<"Project"> | number
    userId?: IntFilter<"Project"> | number
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    category?: StringFilter<"Project"> | string
    budget?: FloatFilter<"Project"> | number
    raised_amount?: FloatNullableFilter<"Project"> | number | null
    status?: StringFilter<"Project"> | string
    profile_picture?: StringNullableFilter<"Project"> | string | null
    cover_image?: StringNullableFilter<"Project"> | string | null
    pitch_video?: StringNullableFilter<"Project"> | string | null
    documents?: StringNullableListFilter<"Project">
    tags?: StringNullableFilter<"Project"> | string | null
    location?: StringNullableFilter<"Project"> | string | null
    start_date?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type ProjectInvestorCreateWithoutInvestorInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutProjectInvestorsInput
  }

  export type ProjectInvestorUncheckedCreateWithoutInvestorInput = {
    id?: number
    projectId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectInvestorCreateOrConnectWithoutInvestorInput = {
    where: ProjectInvestorWhereUniqueInput
    create: XOR<ProjectInvestorCreateWithoutInvestorInput, ProjectInvestorUncheckedCreateWithoutInvestorInput>
  }

  export type ProjectInvestorCreateManyInvestorInputEnvelope = {
    data: ProjectInvestorCreateManyInvestorInput | ProjectInvestorCreateManyInvestorInput[]
    skipDuplicates?: boolean
  }

  export type InvestmentCreateWithoutInvestorInput = {
    amount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutInvestmentsInput
  }

  export type InvestmentUncheckedCreateWithoutInvestorInput = {
    id?: number
    amount: number
    projectId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestmentCreateOrConnectWithoutInvestorInput = {
    where: InvestmentWhereUniqueInput
    create: XOR<InvestmentCreateWithoutInvestorInput, InvestmentUncheckedCreateWithoutInvestorInput>
  }

  export type InvestmentCreateManyInvestorInputEnvelope = {
    data: InvestmentCreateManyInvestorInput | InvestmentCreateManyInvestorInput[]
    skipDuplicates?: boolean
  }

  export type ProjectInvestorUpsertWithWhereUniqueWithoutInvestorInput = {
    where: ProjectInvestorWhereUniqueInput
    update: XOR<ProjectInvestorUpdateWithoutInvestorInput, ProjectInvestorUncheckedUpdateWithoutInvestorInput>
    create: XOR<ProjectInvestorCreateWithoutInvestorInput, ProjectInvestorUncheckedCreateWithoutInvestorInput>
  }

  export type ProjectInvestorUpdateWithWhereUniqueWithoutInvestorInput = {
    where: ProjectInvestorWhereUniqueInput
    data: XOR<ProjectInvestorUpdateWithoutInvestorInput, ProjectInvestorUncheckedUpdateWithoutInvestorInput>
  }

  export type ProjectInvestorUpdateManyWithWhereWithoutInvestorInput = {
    where: ProjectInvestorScalarWhereInput
    data: XOR<ProjectInvestorUpdateManyMutationInput, ProjectInvestorUncheckedUpdateManyWithoutInvestorInput>
  }

  export type ProjectInvestorScalarWhereInput = {
    AND?: ProjectInvestorScalarWhereInput | ProjectInvestorScalarWhereInput[]
    OR?: ProjectInvestorScalarWhereInput[]
    NOT?: ProjectInvestorScalarWhereInput | ProjectInvestorScalarWhereInput[]
    id?: IntFilter<"ProjectInvestor"> | number
    projectId?: IntFilter<"ProjectInvestor"> | number
    investorId?: IntFilter<"ProjectInvestor"> | number
    createdAt?: DateTimeFilter<"ProjectInvestor"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectInvestor"> | Date | string
  }

  export type InvestmentUpsertWithWhereUniqueWithoutInvestorInput = {
    where: InvestmentWhereUniqueInput
    update: XOR<InvestmentUpdateWithoutInvestorInput, InvestmentUncheckedUpdateWithoutInvestorInput>
    create: XOR<InvestmentCreateWithoutInvestorInput, InvestmentUncheckedCreateWithoutInvestorInput>
  }

  export type InvestmentUpdateWithWhereUniqueWithoutInvestorInput = {
    where: InvestmentWhereUniqueInput
    data: XOR<InvestmentUpdateWithoutInvestorInput, InvestmentUncheckedUpdateWithoutInvestorInput>
  }

  export type InvestmentUpdateManyWithWhereWithoutInvestorInput = {
    where: InvestmentScalarWhereInput
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyWithoutInvestorInput>
  }

  export type InvestmentScalarWhereInput = {
    AND?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
    OR?: InvestmentScalarWhereInput[]
    NOT?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
    id?: IntFilter<"Investment"> | number
    amount?: FloatFilter<"Investment"> | number
    projectId?: IntFilter<"Investment"> | number
    investorId?: IntFilter<"Investment"> | number
    createdAt?: DateTimeFilter<"Investment"> | Date | string
    updatedAt?: DateTimeFilter<"Investment"> | Date | string
  }

  export type UserCreateWithoutProjectInput = {
    phone: string
    password: string
    name?: string | null
    profile_picture?: string | null
    university?: string | null
    department?: string | null
    year_of_study?: string | null
    graduation_year?: string | null
    cgpa?: number | null
    student_id?: string | null
    student_id_front?: string | null
    student_id_back?: string | null
    nid_front?: string | null
    nid_back?: string | null
    university_email?: string | null
    date_of_birth?: string | null
    address?: string | null
    bio?: string | null
    skills?: string | null
    interests?: string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: string | null
    role?: string
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: ProjectMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectInput = {
    id?: number
    phone: string
    password: string
    name?: string | null
    profile_picture?: string | null
    university?: string | null
    department?: string | null
    year_of_study?: string | null
    graduation_year?: string | null
    cgpa?: number | null
    student_id?: string | null
    student_id_front?: string | null
    student_id_back?: string | null
    nid_front?: string | null
    nid_back?: string | null
    university_email?: string | null
    date_of_birth?: string | null
    address?: string | null
    bio?: string | null
    skills?: string | null
    interests?: string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: string | null
    role?: string
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: ProjectMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMemberCreateWithoutProjectInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectMembersInput
  }

  export type ProjectMemberUncheckedCreateWithoutProjectInput = {
    id?: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMemberCreateOrConnectWithoutProjectInput = {
    where: ProjectMemberWhereUniqueInput
    create: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMemberCreateManyProjectInputEnvelope = {
    data: ProjectMemberCreateManyProjectInput | ProjectMemberCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectInvestorCreateWithoutProjectInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    investor: InvestorCreateNestedOneWithoutProjectInvestorsInput
  }

  export type ProjectInvestorUncheckedCreateWithoutProjectInput = {
    id?: number
    investorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectInvestorCreateOrConnectWithoutProjectInput = {
    where: ProjectInvestorWhereUniqueInput
    create: XOR<ProjectInvestorCreateWithoutProjectInput, ProjectInvestorUncheckedCreateWithoutProjectInput>
  }

  export type ProjectInvestorCreateManyProjectInputEnvelope = {
    data: ProjectInvestorCreateManyProjectInput | ProjectInvestorCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type InvestmentCreateWithoutProjectInput = {
    amount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    investor: InvestorCreateNestedOneWithoutInvestmentsInput
  }

  export type InvestmentUncheckedCreateWithoutProjectInput = {
    id?: number
    amount: number
    investorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestmentCreateOrConnectWithoutProjectInput = {
    where: InvestmentWhereUniqueInput
    create: XOR<InvestmentCreateWithoutProjectInput, InvestmentUncheckedCreateWithoutProjectInput>
  }

  export type InvestmentCreateManyProjectInputEnvelope = {
    data: InvestmentCreateManyProjectInput | InvestmentCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type MilestoneCreateWithoutProjectInput = {
    title: string
    description: string
    amount: number
    status?: string
    completedAt?: string | null
    deadlineAt?: string | null
    progress?: number | null
    raised_amount?: number | null
    plannedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneUncheckedCreateWithoutProjectInput = {
    id?: number
    title: string
    description: string
    amount: number
    status?: string
    completedAt?: string | null
    deadlineAt?: string | null
    progress?: number | null
    raised_amount?: number | null
    plannedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneCreateOrConnectWithoutProjectInput = {
    where: MilestoneWhereUniqueInput
    create: XOR<MilestoneCreateWithoutProjectInput, MilestoneUncheckedCreateWithoutProjectInput>
  }

  export type MilestoneCreateManyProjectInputEnvelope = {
    data: MilestoneCreateManyProjectInput | MilestoneCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectInput = {
    update: XOR<UserUpdateWithoutProjectInput, UserUncheckedUpdateWithoutProjectInput>
    create: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectInput, UserUncheckedUpdateWithoutProjectInput>
  }

  export type UserUpdateWithoutProjectInput = {
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    year_of_study?: NullableStringFieldUpdateOperationsInput | string | null
    graduation_year?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_front?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_back?: NullableStringFieldUpdateOperationsInput | string | null
    nid_front?: NullableStringFieldUpdateOperationsInput | string | null
    nid_back?: NullableStringFieldUpdateOperationsInput | string | null
    university_email?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: ProjectMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    year_of_study?: NullableStringFieldUpdateOperationsInput | string | null
    graduation_year?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_front?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_back?: NullableStringFieldUpdateOperationsInput | string | null
    nid_front?: NullableStringFieldUpdateOperationsInput | string | null
    nid_back?: NullableStringFieldUpdateOperationsInput | string | null
    university_email?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: ProjectMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectMemberUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectMemberWhereUniqueInput
    update: XOR<ProjectMemberUpdateWithoutProjectInput, ProjectMemberUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMemberUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectMemberWhereUniqueInput
    data: XOR<ProjectMemberUpdateWithoutProjectInput, ProjectMemberUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectMemberUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectMemberScalarWhereInput
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectInvestorUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectInvestorWhereUniqueInput
    update: XOR<ProjectInvestorUpdateWithoutProjectInput, ProjectInvestorUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectInvestorCreateWithoutProjectInput, ProjectInvestorUncheckedCreateWithoutProjectInput>
  }

  export type ProjectInvestorUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectInvestorWhereUniqueInput
    data: XOR<ProjectInvestorUpdateWithoutProjectInput, ProjectInvestorUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectInvestorUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectInvestorScalarWhereInput
    data: XOR<ProjectInvestorUpdateManyMutationInput, ProjectInvestorUncheckedUpdateManyWithoutProjectInput>
  }

  export type InvestmentUpsertWithWhereUniqueWithoutProjectInput = {
    where: InvestmentWhereUniqueInput
    update: XOR<InvestmentUpdateWithoutProjectInput, InvestmentUncheckedUpdateWithoutProjectInput>
    create: XOR<InvestmentCreateWithoutProjectInput, InvestmentUncheckedCreateWithoutProjectInput>
  }

  export type InvestmentUpdateWithWhereUniqueWithoutProjectInput = {
    where: InvestmentWhereUniqueInput
    data: XOR<InvestmentUpdateWithoutProjectInput, InvestmentUncheckedUpdateWithoutProjectInput>
  }

  export type InvestmentUpdateManyWithWhereWithoutProjectInput = {
    where: InvestmentScalarWhereInput
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyWithoutProjectInput>
  }

  export type MilestoneUpsertWithWhereUniqueWithoutProjectInput = {
    where: MilestoneWhereUniqueInput
    update: XOR<MilestoneUpdateWithoutProjectInput, MilestoneUncheckedUpdateWithoutProjectInput>
    create: XOR<MilestoneCreateWithoutProjectInput, MilestoneUncheckedCreateWithoutProjectInput>
  }

  export type MilestoneUpdateWithWhereUniqueWithoutProjectInput = {
    where: MilestoneWhereUniqueInput
    data: XOR<MilestoneUpdateWithoutProjectInput, MilestoneUncheckedUpdateWithoutProjectInput>
  }

  export type MilestoneUpdateManyWithWhereWithoutProjectInput = {
    where: MilestoneScalarWhereInput
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyWithoutProjectInput>
  }

  export type MilestoneScalarWhereInput = {
    AND?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
    OR?: MilestoneScalarWhereInput[]
    NOT?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
    id?: IntFilter<"Milestone"> | number
    title?: StringFilter<"Milestone"> | string
    description?: StringFilter<"Milestone"> | string
    amount?: FloatFilter<"Milestone"> | number
    status?: StringFilter<"Milestone"> | string
    projectId?: IntFilter<"Milestone"> | number
    completedAt?: StringNullableFilter<"Milestone"> | string | null
    deadlineAt?: StringNullableFilter<"Milestone"> | string | null
    progress?: IntNullableFilter<"Milestone"> | number | null
    raised_amount?: FloatNullableFilter<"Milestone"> | number | null
    plannedAt?: StringNullableFilter<"Milestone"> | string | null
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
  }

  export type ProjectCreateWithoutProjectMembersInput = {
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectInput
    projectInvestors?: ProjectInvestorCreateNestedManyWithoutProjectInput
    investments?: InvestmentCreateNestedManyWithoutProjectInput
    milestones?: MilestoneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutProjectMembersInput = {
    id?: number
    userId: number
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectInvestors?: ProjectInvestorUncheckedCreateNestedManyWithoutProjectInput
    investments?: InvestmentUncheckedCreateNestedManyWithoutProjectInput
    milestones?: MilestoneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutProjectMembersInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutProjectMembersInput, ProjectUncheckedCreateWithoutProjectMembersInput>
  }

  export type UserCreateWithoutProjectMembersInput = {
    phone: string
    password: string
    name?: string | null
    profile_picture?: string | null
    university?: string | null
    department?: string | null
    year_of_study?: string | null
    graduation_year?: string | null
    cgpa?: number | null
    student_id?: string | null
    student_id_front?: string | null
    student_id_back?: string | null
    nid_front?: string | null
    nid_back?: string | null
    university_email?: string | null
    date_of_birth?: string | null
    address?: string | null
    bio?: string | null
    skills?: string | null
    interests?: string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: string | null
    role?: string
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Project?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectMembersInput = {
    id?: number
    phone: string
    password: string
    name?: string | null
    profile_picture?: string | null
    university?: string | null
    department?: string | null
    year_of_study?: string | null
    graduation_year?: string | null
    cgpa?: number | null
    student_id?: string | null
    student_id_front?: string | null
    student_id_back?: string | null
    nid_front?: string | null
    nid_back?: string | null
    university_email?: string | null
    date_of_birth?: string | null
    address?: string | null
    bio?: string | null
    skills?: string | null
    interests?: string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: string | null
    role?: string
    isActivated?: boolean
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Project?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectMembersInput, UserUncheckedCreateWithoutProjectMembersInput>
  }

  export type ProjectUpsertWithoutProjectMembersInput = {
    update: XOR<ProjectUpdateWithoutProjectMembersInput, ProjectUncheckedUpdateWithoutProjectMembersInput>
    create: XOR<ProjectCreateWithoutProjectMembersInput, ProjectUncheckedCreateWithoutProjectMembersInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutProjectMembersInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutProjectMembersInput, ProjectUncheckedUpdateWithoutProjectMembersInput>
  }

  export type ProjectUpdateWithoutProjectMembersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectNestedInput
    projectInvestors?: ProjectInvestorUpdateManyWithoutProjectNestedInput
    investments?: InvestmentUpdateManyWithoutProjectNestedInput
    milestones?: MilestoneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutProjectMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectInvestors?: ProjectInvestorUncheckedUpdateManyWithoutProjectNestedInput
    investments?: InvestmentUncheckedUpdateManyWithoutProjectNestedInput
    milestones?: MilestoneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutProjectMembersInput = {
    update: XOR<UserUpdateWithoutProjectMembersInput, UserUncheckedUpdateWithoutProjectMembersInput>
    create: XOR<UserCreateWithoutProjectMembersInput, UserUncheckedCreateWithoutProjectMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectMembersInput, UserUncheckedUpdateWithoutProjectMembersInput>
  }

  export type UserUpdateWithoutProjectMembersInput = {
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    year_of_study?: NullableStringFieldUpdateOperationsInput | string | null
    graduation_year?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_front?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_back?: NullableStringFieldUpdateOperationsInput | string | null
    nid_front?: NullableStringFieldUpdateOperationsInput | string | null
    nid_back?: NullableStringFieldUpdateOperationsInput | string | null
    university_email?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Project?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    year_of_study?: NullableStringFieldUpdateOperationsInput | string | null
    graduation_year?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_front?: NullableStringFieldUpdateOperationsInput | string | null
    student_id_back?: NullableStringFieldUpdateOperationsInput | string | null
    nid_front?: NullableStringFieldUpdateOperationsInput | string | null
    nid_back?: NullableStringFieldUpdateOperationsInput | string | null
    university_email?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableJsonNullValueInput | InputJsonValue
    career_goals?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Project?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectCreateWithoutProjectInvestorsInput = {
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectInput
    projectMembers?: ProjectMemberCreateNestedManyWithoutProjectInput
    investments?: InvestmentCreateNestedManyWithoutProjectInput
    milestones?: MilestoneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutProjectInvestorsInput = {
    id?: number
    userId: number
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput
    investments?: InvestmentUncheckedCreateNestedManyWithoutProjectInput
    milestones?: MilestoneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutProjectInvestorsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutProjectInvestorsInput, ProjectUncheckedCreateWithoutProjectInvestorsInput>
  }

  export type InvestorCreateWithoutProjectInvestorsInput = {
    email?: string | null
    phone?: string | null
    password: string
    name?: string | null
    profile_picture?: string | null
    company_name?: string | null
    company_website?: string | null
    company_description?: string | null
    role?: string
    isActivated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    investments?: InvestmentCreateNestedManyWithoutInvestorInput
  }

  export type InvestorUncheckedCreateWithoutProjectInvestorsInput = {
    id?: number
    email?: string | null
    phone?: string | null
    password: string
    name?: string | null
    profile_picture?: string | null
    company_name?: string | null
    company_website?: string | null
    company_description?: string | null
    role?: string
    isActivated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    investments?: InvestmentUncheckedCreateNestedManyWithoutInvestorInput
  }

  export type InvestorCreateOrConnectWithoutProjectInvestorsInput = {
    where: InvestorWhereUniqueInput
    create: XOR<InvestorCreateWithoutProjectInvestorsInput, InvestorUncheckedCreateWithoutProjectInvestorsInput>
  }

  export type ProjectUpsertWithoutProjectInvestorsInput = {
    update: XOR<ProjectUpdateWithoutProjectInvestorsInput, ProjectUncheckedUpdateWithoutProjectInvestorsInput>
    create: XOR<ProjectCreateWithoutProjectInvestorsInput, ProjectUncheckedCreateWithoutProjectInvestorsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutProjectInvestorsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutProjectInvestorsInput, ProjectUncheckedUpdateWithoutProjectInvestorsInput>
  }

  export type ProjectUpdateWithoutProjectInvestorsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectNestedInput
    projectMembers?: ProjectMemberUpdateManyWithoutProjectNestedInput
    investments?: InvestmentUpdateManyWithoutProjectNestedInput
    milestones?: MilestoneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutProjectInvestorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput
    investments?: InvestmentUncheckedUpdateManyWithoutProjectNestedInput
    milestones?: MilestoneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type InvestorUpsertWithoutProjectInvestorsInput = {
    update: XOR<InvestorUpdateWithoutProjectInvestorsInput, InvestorUncheckedUpdateWithoutProjectInvestorsInput>
    create: XOR<InvestorCreateWithoutProjectInvestorsInput, InvestorUncheckedCreateWithoutProjectInvestorsInput>
    where?: InvestorWhereInput
  }

  export type InvestorUpdateToOneWithWhereWithoutProjectInvestorsInput = {
    where?: InvestorWhereInput
    data: XOR<InvestorUpdateWithoutProjectInvestorsInput, InvestorUncheckedUpdateWithoutProjectInvestorsInput>
  }

  export type InvestorUpdateWithoutProjectInvestorsInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: InvestmentUpdateManyWithoutInvestorNestedInput
  }

  export type InvestorUncheckedUpdateWithoutProjectInvestorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: InvestmentUncheckedUpdateManyWithoutInvestorNestedInput
  }

  export type ProjectCreateWithoutInvestmentsInput = {
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectInput
    projectMembers?: ProjectMemberCreateNestedManyWithoutProjectInput
    projectInvestors?: ProjectInvestorCreateNestedManyWithoutProjectInput
    milestones?: MilestoneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutInvestmentsInput = {
    id?: number
    userId: number
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput
    projectInvestors?: ProjectInvestorUncheckedCreateNestedManyWithoutProjectInput
    milestones?: MilestoneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutInvestmentsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutInvestmentsInput, ProjectUncheckedCreateWithoutInvestmentsInput>
  }

  export type InvestorCreateWithoutInvestmentsInput = {
    email?: string | null
    phone?: string | null
    password: string
    name?: string | null
    profile_picture?: string | null
    company_name?: string | null
    company_website?: string | null
    company_description?: string | null
    role?: string
    isActivated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projectInvestors?: ProjectInvestorCreateNestedManyWithoutInvestorInput
  }

  export type InvestorUncheckedCreateWithoutInvestmentsInput = {
    id?: number
    email?: string | null
    phone?: string | null
    password: string
    name?: string | null
    profile_picture?: string | null
    company_name?: string | null
    company_website?: string | null
    company_description?: string | null
    role?: string
    isActivated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projectInvestors?: ProjectInvestorUncheckedCreateNestedManyWithoutInvestorInput
  }

  export type InvestorCreateOrConnectWithoutInvestmentsInput = {
    where: InvestorWhereUniqueInput
    create: XOR<InvestorCreateWithoutInvestmentsInput, InvestorUncheckedCreateWithoutInvestmentsInput>
  }

  export type ProjectUpsertWithoutInvestmentsInput = {
    update: XOR<ProjectUpdateWithoutInvestmentsInput, ProjectUncheckedUpdateWithoutInvestmentsInput>
    create: XOR<ProjectCreateWithoutInvestmentsInput, ProjectUncheckedCreateWithoutInvestmentsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutInvestmentsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutInvestmentsInput, ProjectUncheckedUpdateWithoutInvestmentsInput>
  }

  export type ProjectUpdateWithoutInvestmentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectNestedInput
    projectMembers?: ProjectMemberUpdateManyWithoutProjectNestedInput
    projectInvestors?: ProjectInvestorUpdateManyWithoutProjectNestedInput
    milestones?: MilestoneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutInvestmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput
    projectInvestors?: ProjectInvestorUncheckedUpdateManyWithoutProjectNestedInput
    milestones?: MilestoneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type InvestorUpsertWithoutInvestmentsInput = {
    update: XOR<InvestorUpdateWithoutInvestmentsInput, InvestorUncheckedUpdateWithoutInvestmentsInput>
    create: XOR<InvestorCreateWithoutInvestmentsInput, InvestorUncheckedCreateWithoutInvestmentsInput>
    where?: InvestorWhereInput
  }

  export type InvestorUpdateToOneWithWhereWithoutInvestmentsInput = {
    where?: InvestorWhereInput
    data: XOR<InvestorUpdateWithoutInvestmentsInput, InvestorUncheckedUpdateWithoutInvestmentsInput>
  }

  export type InvestorUpdateWithoutInvestmentsInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectInvestors?: ProjectInvestorUpdateManyWithoutInvestorNestedInput
  }

  export type InvestorUncheckedUpdateWithoutInvestmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    company_website?: NullableStringFieldUpdateOperationsInput | string | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectInvestors?: ProjectInvestorUncheckedUpdateManyWithoutInvestorNestedInput
  }

  export type ProjectCreateWithoutMilestonesInput = {
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectInput
    projectMembers?: ProjectMemberCreateNestedManyWithoutProjectInput
    projectInvestors?: ProjectInvestorCreateNestedManyWithoutProjectInput
    investments?: InvestmentCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutMilestonesInput = {
    id?: number
    userId: number
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput
    projectInvestors?: ProjectInvestorUncheckedCreateNestedManyWithoutProjectInput
    investments?: InvestmentUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutMilestonesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutMilestonesInput, ProjectUncheckedCreateWithoutMilestonesInput>
  }

  export type ProjectUpsertWithoutMilestonesInput = {
    update: XOR<ProjectUpdateWithoutMilestonesInput, ProjectUncheckedUpdateWithoutMilestonesInput>
    create: XOR<ProjectCreateWithoutMilestonesInput, ProjectUncheckedCreateWithoutMilestonesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutMilestonesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutMilestonesInput, ProjectUncheckedUpdateWithoutMilestonesInput>
  }

  export type ProjectUpdateWithoutMilestonesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectNestedInput
    projectMembers?: ProjectMemberUpdateManyWithoutProjectNestedInput
    projectInvestors?: ProjectInvestorUpdateManyWithoutProjectNestedInput
    investments?: InvestmentUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutMilestonesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput
    projectInvestors?: ProjectInvestorUncheckedUpdateManyWithoutProjectNestedInput
    investments?: InvestmentUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectMemberCreateManyUserInput = {
    id?: number
    projectId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateManyUserInput = {
    id?: number
    title: string
    description: string
    category: string
    budget: number
    raised_amount?: number | null
    status?: string
    profile_picture?: string | null
    cover_image?: string | null
    pitch_video?: string | null
    documents?: ProjectCreatedocumentsInput | string[]
    tags?: string | null
    location?: string | null
    start_date?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMemberUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutProjectMembersNestedInput
  }

  export type ProjectMemberUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: ProjectMemberUpdateManyWithoutProjectNestedInput
    projectInvestors?: ProjectInvestorUpdateManyWithoutProjectNestedInput
    investments?: InvestmentUpdateManyWithoutProjectNestedInput
    milestones?: MilestoneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput
    projectInvestors?: ProjectInvestorUncheckedUpdateManyWithoutProjectNestedInput
    investments?: InvestmentUncheckedUpdateManyWithoutProjectNestedInput
    milestones?: MilestoneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    budget?: FloatFieldUpdateOperationsInput | number
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    pitch_video?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: ProjectUpdatedocumentsInput | string[]
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectInvestorCreateManyInvestorInput = {
    id?: number
    projectId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestmentCreateManyInvestorInput = {
    id?: number
    amount: number
    projectId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectInvestorUpdateWithoutInvestorInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutProjectInvestorsNestedInput
  }

  export type ProjectInvestorUncheckedUpdateWithoutInvestorInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectInvestorUncheckedUpdateManyWithoutInvestorInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUpdateWithoutInvestorInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutInvestmentsNestedInput
  }

  export type InvestmentUncheckedUpdateWithoutInvestorInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUncheckedUpdateManyWithoutInvestorInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberCreateManyProjectInput = {
    id?: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectInvestorCreateManyProjectInput = {
    id?: number
    investorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestmentCreateManyProjectInput = {
    id?: number
    amount: number
    investorId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneCreateManyProjectInput = {
    id?: number
    title: string
    description: string
    amount: number
    status?: string
    completedAt?: string | null
    deadlineAt?: string | null
    progress?: number | null
    raised_amount?: number | null
    plannedAt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMemberUpdateWithoutProjectInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectMembersNestedInput
  }

  export type ProjectMemberUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectInvestorUpdateWithoutProjectInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investor?: InvestorUpdateOneRequiredWithoutProjectInvestorsNestedInput
  }

  export type ProjectInvestorUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    investorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectInvestorUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    investorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUpdateWithoutProjectInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investor?: InvestorUpdateOneRequiredWithoutInvestmentsNestedInput
  }

  export type InvestmentUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    investorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    investorId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUpdateWithoutProjectInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    plannedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    plannedAt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    raised_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    plannedAt?: NullableStringFieldUpdateOperationsInput | string | null
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