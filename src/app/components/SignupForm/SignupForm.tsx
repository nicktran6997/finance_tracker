'use client';
import React, { useState } from 'react';
import { useSignupMutation } from 'src/generated/graphql';
import TextInput from '../TextInput/TextInput';
import BaseForm from '../BaseForm/BaseForm';

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
  const SignupProps = {
    className: '',
    formInfo: {
      title: 'Signup',
      fields: [
        {
          label: 'Name',
          type: 'text',
          name: 'name',
          placeholder: 'Enter your name',
          value: name,
          required: true,
          onChange: (e: any) => setName(e.target.value),
        },
        {
          label: 'Email',
          type: 'email',
          name: 'email',
          placeholder: 'Enter your email',
          value: email,
          required: true,
          onChange: (e: any) => setEmail(e.target.value),
        },
        {
          label: 'Password',
          type: 'password',
          name: 'password',
          placeholder: 'Enter your password',
          value: password,
          required: true,
          onChange: (e: any) => setPassword(e.target.value),
        },
        {
          label: 'Team Name',
          type: 'text',
          name: 'teamName',
          placeholder: 'Enter your team name',
          value: teamName,
          onChange: (e: any) => setTeamName(e.target.value),
        }
      ],
    },
    submitButton: {
      text: 'Create an account',
      onClick: handleSubmit,
    }
    }
  return (
    // <form onSubmit={handleSubmit} className="space-y-4">
    //   <div>
    //     <TextInput
    //       id="email"
    //       name="email"
    //       labelCopy="Email Address"
    //       type="email"
    //       autoComplete="email"
    //       required={true}
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <TextInput
    //       id="password"
    //       name="password"
    //       labelCopy="Password"
    //       type="password"
    //       autoComplete="current-password"
    //       required={true}
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <TextInput
    //       id="name"
    //       name="name"
    //       labelCopy="Name"
    //       required={true}
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <TextInput
    //       id="teamName"
    //       name="teamName"
    //       labelCopy="Team Name"
    //       type="text"
    //       value={teamName}
    //       onChange={(e) => setTeamName(e.target.value)}
    //     />
    //   </div>
    //   <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    //     Sign Up
    //   </button>
    // </form>
    <BaseForm {...SignupProps}/>
  );
};

export default SignupForm;