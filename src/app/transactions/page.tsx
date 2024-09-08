'use client'

import React, { useState } from 'react';
import { Button } from '@headlessui/react';
import { TransactionsTable, Transaction } from '../components/TransactionsTable';
import { useTransaction } from 'src/hooks/useTransaction';

import 'src/app/styles/customTailwind.css';

//TODO: Add a hook to handle setting transactions so it properly saves into the db
const Transactions: React.FC = () => {
  const { transaction, createTransaction } = useTransaction();
  const [isModified, setIsModified] = useState(false);

  const handleAddRow = () => {
    //TODO: implement proper add transactions here
    const newTransaction: Transaction = {
      date: new Date().toISOString(),
      userId: '2360ea69-1f6a-46c1-b34c-5475d7b69c2d',
      description: 'test',
      amount: 600
    };
    createTransaction(newTransaction);
    console.log(newTransaction);
    setIsModified(true);
  };

  const handleSave = () => {
    // Implement save logic here
    // console.log('Saving transactions:', transactions);
    setIsModified(false);
  };

  return (
    <div className='transactions-page'>
      <div className='header'>Transaction Manager</div>
      <div className='subheader'>Manage your transactions</div>
      <div className ='transactions-table-wrapper'>
        {/* <TransactionsTable transactions={ transactions } setTransactions={ setTransactions } /> */}
        <Button
          type="button"
          onClick={ handleAddRow }
          className=""
          style={{ marginTop: '1rem' }}
        >
          Add Row
        </Button>
        <Button
          type="button"
          onClick={ handleSave }
          disabled={ !isModified }
          className="primary-button"
          style={{ marginTop: '1rem', marginLeft: '1rem' }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Transactions;
