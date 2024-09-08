'use client'

import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apolloClient';
import { AuthProvider } from 'src/context/AuthContext';

//components
import TopNavBar from './components/TopNavbar/TopNavbar';
import './styles/globals.css'
// import TransactionsTable from './components/TransactionsTable';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <header>{/* Your header content */}</header>
          <TopNavBar />
          <ApolloProvider client={client}>
            <main className="flex-grow">
              { children }
            </main>
          </ApolloProvider>
          <footer>{/* Your footer content */}</footer>
        </AuthProvider>
      </body>
    </html>
  );
}