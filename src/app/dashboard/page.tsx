'use client';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useAuth } from 'src/hooks/useAuth';

import { TransactionsTable } from 'src/app/components/TransactionsTable';
import LoginForm from 'src/app/components/LoginForm/LoginForm';

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      transactions {
        id
        amount
        description
        date
      }
    }
  }
`;

const GET_TRANSACTIONS = gql`
  query GetTransactions($userId: ID!) {
    getTransactions(userId: $userId) {
      id
      amount
      description
      date
    }
  }
`

const Dashboard: React.FC = (props: any) => {
  let { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { userId: "2360ea69-1f6a-46c1-b34c-5475d7b69c2d" },
  });
  let content;
  if (loading) content = <p>Loading...</p>;
  if (error) {
    console.log('error has occurred: ', error);
    data = {
      getTransactions: [{
        id: '1',
        userId: 1,
        amount: 100,
        description: 'test',
        date: new Date('2023-01-01'),
        category: 'test',
      }]
    }
  }
  console.log('data: ', data);
  if (data) {
    content = (
      <TransactionsTable transactions={ data.getTransactions } setTransactions={ () => {} } />
    );
  }

  const { isLoggedIn } = useAuth();

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to FinanceTracker</h1>
          <p className="text-xl text-gray-600">
            Track your finances, manage your budget, and achieve your financial goals.
          </p>
          { content }
        </div>
      { isLoggedIn ? (
        <div className="md:mt-0 mt-8">
          Logged In!
        </div>
        ) : <LoginForm className="md:mt-0 mt-8" /> 
      }
    </div>
  </div>
  )
}

export default Dashboard;