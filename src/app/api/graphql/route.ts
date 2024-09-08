// Library
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Schema
import { resolvers } from 'src/graphql/resolvers/index';
import { createContext } from 'src/graphql/context';
const typeDefs = loadSchemaSync('src/graphql/schema.graphql', {
  loaders: [new GraphQLFileLoader()]
});


const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const contextData = await createContext({ req, res });
    if (token) {
      try {
        const jwtSecret = process.env.JWT_SECRET;
        if (jwtSecret) {
          const decoded = jwt.verify(token, jwtSecret) as { userId: string };
          const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
          return { ...contextData, user };
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    }
    
    return {
      ...contextData,
      user: null // or { id: '' } if you want to provide a default user
    };
  },
});

export { handler as GET, handler as POST };
export const config = {
  api: {
    bodyParser: false,
  },
};