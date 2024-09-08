// src/graphql/resolvers/user.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, { user }: { user: any}) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      return prisma.user.findUnique({ where: { id: user.id } });
    },
  },
};