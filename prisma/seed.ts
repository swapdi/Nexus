import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const freeTrial = await prisma.plan.upsert({
    where: { name: 'Free Tier' },
    update: {},
    create: {
      name: 'Free Tier',
      features: ['ADD_NOTES', 'EDIT_NOTES', 'VIEW_NOTES']
    }
  });

  const individualPlan = await prisma.plan.upsert({
    where: { name: 'Premium Tier' },
    update: {},
    create: {
      name: 'Premium Tier',
      features: ['ADD_NOTES', 'EDIT_NOTES', 'VIEW_NOTES', 'SPECIAL_FEATURE']
    }
  });

  console.log({ freeTrial, individualPlan });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
