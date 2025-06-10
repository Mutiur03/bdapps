import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetAllSequences() {
  // Tables and their current max IDs (from your output)
  const tables = [
    { name: "Category", max: 5 },
    { name: "Fund", max: 1 },
    { name: "User", max: 3 },
    { name: "Project", max: 3 },
    { name: "Admin", max: 1 },
    { name: "ProjectMember", max: 3 },
    { name: "ProjectInvestor", max: 0 }, // null was shown, default to 0
    { name: "Investor", max: 4 },
    { name: "Investment", max: 11 },
    { name: "Milestone", max: 2 },
    { name: "Documents", max: 4 },
    { name: "Message", max: 10 },
  ];

  for (const table of tables) {
    try {
      // Calculate next ID (max + 1)
      const nextId = (table.max || 0) + 1;

      // Reset the sequence
      await prisma.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"${table.name}"', 'id'), $1, true)`,
        nextId
      );

      console.log(`Reset sequence for ${table.name} to ${nextId}`);
    } catch (error) {
      console.error(`Error resetting ${table.name}:`, error.message);
    }
  }
}

resetAllSequences()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
