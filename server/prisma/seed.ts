import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.patient.count();
  if (count > 0) {
    console.log("Patients already seeded.");
    return;
  }

  await prisma.patient.createMany({
    data: [
      {
        firstName: "Alice",
        lastName: "Smith",
        dob: new Date("1980-04-12"),
      },
      {
        firstName: "Bob",
        lastName: "Johnson",
        dob: new Date("1975-08-30"),
      },
      {
        firstName: "Carol",
        lastName: "Williams",
        dob: new Date("1990-01-20"),
      },
    ],
  });

  console.log("Seeded 3 patients.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
