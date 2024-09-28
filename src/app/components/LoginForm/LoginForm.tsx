'use client';
import { useState } from 'react';
import { useLoginMutation } from 'src/generated/graphql';
import { useAuth } from 'src/hooks/useAuth';
import BaseForm from '../BaseForm/BaseForm';

const LoginForm = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useLoginMutation();
  const loginHook = useAuth().login; //should refactor this a bit later.

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      // Store the token in localStorage or a secure cookie
      loginHook(data?.login);
      // Redirect to dashboard or update app state
      alert (`Logged in successfully + ${data?.login.user?.name}`);
    } catch (err) {
      alert(`Login error: ${err}`);
    }
  };
  
  const loginFormProps = {
    className,
    formInfo: {
      title: 'Login',
      fields: [
        {
          label: 'Email',
          type: 'email',
          name: 'email',
          placeholder: 'Enter your email',
          value: email,
          onChange: (e: any) => setEmail(e.target.value),
        },
        {
          label: 'Password',
          type: 'password',
          name: 'password',
          placeholder: 'Enter your password',
          value: password,
          onChange: (e: any) => setPassword(e.target.value),
        },
      ],
    },
    submitButton: {
      text: 'Login',
      onClick: handleSubmit,  
    },
    secondaryButton: {
      text: 'Create an account',
      onClick: () => {
        window.location.href = '/auth/signup'
      },
    }
  }
  return (
    // <div className={`bg-white p-6 ${className}`}>
    //   <div className="max-w-md mx-auto">
    //     <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in</h2>
    //     <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
    //       <form className="space-y-4" onSubmit={handleSubmit}>
    //         <div>
    //           <TextInput
    //             id="email"
    //             name="email"
    //             labelCopy="Email Address"
    //             type="email"
    //             autoComplete="email"
    //             required={true}
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //         </div>
    //         <div>
    //           <TextInput
    //             id="password"
    //             name="password"
    //             labelCopy="Password"
    //             type="password"
    //             autoComplete="current-password"
    //             required={true}
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </div>
    //         <div>
    //           <button
    //             type="submit"
    //             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //           >
    //             Sign in
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <BaseForm {...loginFormProps} />
  );
}
export default LoginForm;