require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const NUM_TRANSACTIONS = 10000; // Adjust this number as needed

// Helper function to generate a random date in the past year
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Helper function to generate a random transaction description
function randomDescription() {
  const actions = ['Purchase at', 'Payment to', 'Transfer to', 'Withdrawal from'];
  const places = ['Grocery Store', 'Restaurant', 'Gas Station', 'Online Shop', 'Department Store'];
  return `${actions[Math.floor(Math.random() * actions.length)]} ${places[Math.floor(Math.random() * places.length)]}`;
}

async function main() {
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate());

  const transactionsData = []
  for (let i = 0; i < NUM_TRANSACTIONS; i++) {
    transactionsData.push( {
      amount: parseFloat((Math.random() * 1000).toFixed(2)), // Random amount between 0 and 1000
      description: randomDescription(),
      date: randomDate(startDate, endDate),
      categoryId: process.env.DUMMY_CATEGORY_ID,
      userId: process.env.DUMMY_USER_ID
    })
  }

  await prisma.transaction.createMany({
    data: transactionsData
  });

  console.log(`Created ${NUM_TRANSACTIONS} dummy transactions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
