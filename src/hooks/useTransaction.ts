
import { useState } from 'react';
import { useAddTransactionMutation } from '../generated/graphql';

interface Transaction {
  amount: number;
  description: string;
  date: string;
  categoryId?: string;
  userId: string;
}

export const useTransaction = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [addTransaction] = useAddTransactionMutation();

  const createTransaction = async (transactionData: Transaction) => {
    try {
      // Update local state
      setTransaction(transactionData);

      // Save to backend
      const response = await addTransaction({
        variables: { transactionInput: transactionData },
      });

      if (response.data?.addTransaction) {
        // Handle successful transaction
        console.log('Transaction created successfully');
        return response.data.addTransaction;
      } else {
        throw new Error('Failed to create transaction');
      }
    } catch (error) {
      // Handle error
      console.error('Error creating transaction:', error);
      // Reset local state if backend save fails
      setTransaction(null);
      throw error;
    }
  };

  return {
    transaction,
    createTransaction,
  };
};
