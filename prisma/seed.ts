// import { PrismaClient } from "../lib/generated/prisma";

// const prisma = new PrismaClient();

// async function main() {
//   const user = await prisma.user.upsert({
//     where: { email: "test@test.com" },
//     update: {},
//     create: {
//       email: "test@test.com",
//       name: "Test User",
//       phone: "+1234567890",
//       password: `$2y$12$GBfcgD6XwaMferSOdYGiduw3Awuo95QAPhxFE0oNJ.Ds8qj3pzEZy`,
//     },
//   });
//   console.log({ user });
// }
// main()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
