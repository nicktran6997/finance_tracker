// src/graphql/resolvers/index.ts
import { authResolvers } from './auth';
import { userResolvers } from './users';
import { transactionResolvers } from './transactions';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
};