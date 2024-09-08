// Save this as testConnection.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
  try {
    // Attempt to query the database
    const result = await prisma.$queryRaw`SELECT 1+1 AS result`
    console.log('Successfully connected to the database.')
    console.log('Test query result:', result)
  } catch (error) {
    console.error('Failed to connect to the database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()