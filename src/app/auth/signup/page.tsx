
'use client';
import React from 'react';
import SignupForm from 'src/app/components/SignupForm/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="form-container">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">Sign Up</h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
