// /* eslint-disable no-var */
// import { Pool } from "pg";

// declare global {
//   var pgPool: Pool | undefined;
// }

// const isLocal = process.env.NODE_ENV === "development";

// const pool =
//   global.pgPool ||
//   new Pool({
//     connectionString: process.env.DATABASE_URL,
//     max: 5,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//     ssl: isLocal
//       ? false
//       : {
//           rejectUnauthorized: false,
//         },
//   });

// if (process.env.NODE_ENV !== "production") global.pgPool = pool;

// export default pool;
