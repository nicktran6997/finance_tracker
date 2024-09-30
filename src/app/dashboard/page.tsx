'use client';
import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useAuth } from 'src/hooks/useAuth';

import { TransactionsTable } from 'src/app/components/TransactionsTable';
import LoginForm from 'src/app/components/LoginForm/LoginForm';
import BaseModal from 'src/app/components/BaseModal/BaseModal';
import TransactionForm from 'src/app/components/TransactionForm/TransactionForm';

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
      id
      amount
      description
      date
    }
  }
`

const Dashboard: React.FC = (props: any) => {
  let { loading, error, data } = useQuery(GET_TRANSACTIONS);
  let [ isModalOpen, setIsModalOpen ] = useState(false)
  let content;
  if (loading) content = <p>Loading...</p>;
  if (error) {
    console.log('error has occurred: ', error);
    data = {
      getTransactions: []
    }
  }
  if (data) {
    content = (
      <TransactionsTable transactions={ data.getTransactions } />
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
          Open Signup Form
          </button>
          <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <TransactionForm />
          </BaseModal>
        </div>
        ) : <LoginForm className="md:mt-0 mt-8" /> 
      }
    </div>
  </div>
  )
}

export default Dashboard;