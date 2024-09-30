'use client';
import React, { useState } from 'react';
import BaseForm from '../BaseForm/BaseForm';
import { useAddTransactionMutation } from 'src/generated/graphql';

const TransactionForm: React.FC = () => {
  const [addTransaction, { loading, error }] = useAddTransactionMutation();
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await addTransaction({
        variables: {
          transactionInput: { amount, date, description }
        }
      });
      console.log('Transaction Successful:');
      // Handle successful signup (e.g., store token, redirect user)
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  const TransactionProps = {
    className: '',
    formInfo: {
      title: 'Add Transaction',
      fields: [
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'Enter Amount',
          value: amount,
          required: true,
          onChange: (e: any) => setAmount(Number(e.target.value)),
        },
        {
          label: 'category',
          type: 'text',
          name: 'category',
          placeholder: 'Enter category', // make this a dropdown / chip
          value: category,
          required: true,
          onChange: (e: any) => setCategory(e.target.value),
        },
        {
          label: 'Description',
          type: 'text',
          name: 'description',
          placeholder: 'Enter your description',
          value: description,
          required: true,
          onChange: (e: any) => setDescription(e.target.value),
        },
        {
          label: 'Date',
          type: 'date',
          name: 'date',
          placeholder: 'Enter transaction date',
          value: date,
          onChange: (e: any) => setDate(e.target.value),
        }
      ],
    },
    submitButton: {
      text: 'Create Transaction',
      onClick: handleSubmit,
    }
  }

  return (
    <BaseForm {...TransactionProps}/>
  );
};

export default TransactionForm;