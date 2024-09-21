'use client';
import React, { useState } from 'react';
import { useSignupMutation } from 'src/generated/graphql';
import TextInput from '../TextInput/TextInput';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');

  const [signup, { loading, error }] = useSignupMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(email, password, name, teamName);
      const { data } = await signup({
        variables: {
          input: { email, password, name }
        }
      });
      console.log('Signup successful:', data);
      // Handle successful signup (e.g., store token, redirect user)
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <TextInput
          id="email"
          name="email"
          labelCopy="Email Address"
          type="email"
          autoComplete="email"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextInput
          id="password"
          name="password"
          labelCopy="Password"
          type="password"
          autoComplete="current-password"
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <TextInput
          id="name"
          name="name"
          labelCopy="Name"
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextInput
          id="teamName"
          name="teamName"
          labelCopy="Team Name"
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;