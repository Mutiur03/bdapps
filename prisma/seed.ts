import prisma from "@/lib/prisma";

async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { name: "Technology" },
      { name: "Health" },
      { name: "Finance" },
      { name: "Education" },
      { name: "Entertainment" },
    ],
    skipDuplicates: true,
  });
  const fund = await prisma.fund.upsert({
    where: {
      name: "Main Fund",
    },
    update: {},
    create: {
      name: "Main Fund",
    },
  });
  console.log({ categories });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
