// src/graphql/resolvers/transactions.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface AddTransactionInput {
  amount: number;
  description: string;
  date: Date;
}

interface ResolverContext {
  user: { id: string } | null;
}
export const transactionResolvers = {
  Query: {
    getTransactions: async (_: unknown, __: unknown, { user }: { user: { id: string } | null }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      return prisma.transaction.findMany({
        where: { userId: user.id },
        orderBy: { date: 'desc' },
      });
    },
  },
  Mutation: {
    addTransaction: async (_: unknown, input: { transactionInput: AddTransactionInput }, { user }: ResolverContext) => {
      const { amount, description, date } = input.transactionInput;
      if (!user) {
        throw new Error('Not authenticated');
      }
      return prisma.transaction.create({
        data: {
          amount,
          description,
          date: new Date(date),
          userId: user.id
        },
      });
    },
    // Add other transaction-related mutations here
  },
};