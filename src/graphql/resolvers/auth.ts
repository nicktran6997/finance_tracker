/**
 * Provides resolvers for the GraphQL authentication mutations.
 * 
 * The `signup` mutation creates a new user with the provided email, password, and name.
 * The `login` mutation authenticates a user with the provided email and password, and returns a JWT token.
 */
// src/graphql/resolvers/auth.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable not set');
}

export const authResolvers = {
  Mutation: {
    signup: async (_: any, { input }: { input: { email: string; password: string; name: string } }) => {
      const { email, password, name } = input;
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          passwordHash: hashedPassword
        },
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET as string);
      return { token, user };
    },
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('No user found with this email');
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);
      return { token, user };
    },
    /**
     * Handles the "Forgot Password" functionality.
     * 
     * @param {any} _ - Unused parent argument
     * @param {Object} args - The arguments passed to the resolver
     * @param {string} args.email - The email address of the user requesting a password reset
     * @returns {Object} An object containing a success message
     * @throws {Error} If no user is found with the provided email
     */
    forgotPassword: async (_: any, { email }: { email: string }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('No user found with this email');
      }

      // Generate a password reset token
      const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET as string, { expiresIn: '1h' });

      // Update user with reset token and expiration
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExpiry: new Date(Date.now() + 3600000) // 1 hour from now
        },
      });

      // TODO: Send email with reset token link

      return { message: 'Password reset email sent' };
    }  },
};