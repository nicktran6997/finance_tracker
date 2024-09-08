//DEPRECATED

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

export const withAuthProtection = ((WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { isLoggedIn, isLoading } = useAuth();
    const router = useRouter();

    /**
     * Redirects the user to the login page if they are not logged in and the component is loading.
     * This effect should be used in a component that requires the user to be authenticated.
     */
    useEffect(() => { 
      if (!isLoading && !isLoggedIn) {
        router.replace('/login');
      }
    }, [isLoggedIn, isLoading, router]);

    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    if (!isLoggedIn) {
      return null;
    }

    return (<WrappedComponent {...props} />);

  };
});