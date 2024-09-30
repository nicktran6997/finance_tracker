'use client';
import React from 'react';
import LoginForm from 'src/app/components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="form-container">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;