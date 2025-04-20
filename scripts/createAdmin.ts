const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('demo1234', 10);

  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@demo.fr',
      name: 'Mike Admin',
      passwordHash,
    },
  });

  console.log('Admin créé :', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
