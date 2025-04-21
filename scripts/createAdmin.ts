const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@demo.fr';
  const password = 'demo1234';
  const name = 'Mike Admin';

  // Vérifier si l'utilisateur existe déjà
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log(`Un utilisateur avec l'email ${email} existe déjà :`, existingAdmin);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.create({
    data: {
      email,
      name,
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
