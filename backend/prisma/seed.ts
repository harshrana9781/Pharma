import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateMedicines = () => {
  const medicines = [];
  const categories = ['Pain Relief', 'Antibiotics', 'Vitamins', 'Allergy', 'Digestive', 'Heart Health'];
  const companies = ['Pfizer', 'Novartis', 'Roche', 'Merck', 'Sanofi', 'GSK'];

  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    
    // Generate dates: Mfg within last 12 months, Exp within next 12-36 months
    const now = new Date();
    const mfgDate = new Date(now.getFullYear(), now.getMonth() - Math.floor(Math.random() * 12), now.getDate() - Math.floor(Math.random() * 28));
    const expDate = new Date(now.getFullYear() + 1 + Math.floor(Math.random() * 3), now.getMonth(), now.getDate());

    medicines.push({
      name: `Pharma-${category} ${Math.floor(Math.random() * 500)}mg`,
      description: `High-quality ${category.toLowerCase()} medicine manufactured by ${company}. Clinically tested and verified.`,
      price: parseFloat(((Math.random() * 45) + 5).toFixed(2)),
      stock: Math.floor(Math.random() * 1000) + 100,
      mfgDate: mfgDate,
      expDate: expDate,
    });
  }
  return medicines;
};

async function main() {
  console.log('Clearing existing products...');
  await prisma.product.deleteMany({});
  
  console.log('Seeding 50 medicines...');
  const medicines = generateMedicines();
  
  const created = await prisma.product.createMany({
    data: medicines,
  });
  
  console.log(`Successfully seeded ${created.count} medicines!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
