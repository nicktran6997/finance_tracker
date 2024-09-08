// DEPRECATED
// export const resolvers = {
//   Query: {
//     getUser: async (_: any, { id }: { id: string }, { prisma }: { prisma: any }) => {
//       return prisma.user.findUnique({
//         where: { id: parseInt(id) },
//         include: { transactions: true },
//       });
//     },
//     getTransactions: async (_: any, { userId }: { userId: string }, { prisma }: { prisma: any }) => {
//       return prisma.transaction.findMany({
//         where: { userId: parseInt(userId) },
//       });
//     },
//   },
//   Mutation: {
//     createUser: async (_: any, { name, email }: { name: string, email: string }, { prisma }: { prisma: any }) => {
//       return prisma.user.create({
//         data: { name, email },
//       });
//     },
//     addTransaction: async (_: any, { amount, description, date, userId }: { amount: number, description: string, date: Date, userId: string }, { prisma }: { prisma: any }) => {
//       return prisma.transaction.create({
//         data: {
//           amount,
//           description,
//           date,
//           user: { connect: { id: parseInt(userId) } },
//         },
//       });
//     },
//   },
//   User: {
//     transactions: async (parent: any, _: any, { prisma }: { prisma: any }) => {
//       return prisma.transaction.findMany({
//         where: { userId: parent.id },
//       });
//     },
//   },
//   Transaction: {
//     user: async (parent: any, _: any, { prisma }: { prisma: any }) => {
//       return prisma.user.findUnique({
//         where: { id: parent.userId },
//       });
//     },
//   },
// };
