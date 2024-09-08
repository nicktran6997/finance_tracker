'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import 'src/app/styles/customTailwind.css';
import { useAuth } from 'src/hooks/useAuth';


const TopNavbar = (props: any) => {
  const { isLoggedIn, logout } = useAuth();
  
  useEffect(() => {
    console.log('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="nav-link text-xl font-bold">
          FinanceTracker
        </Link>
        <div className="flex space-x-4">
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link href="/transactions" className="nav-link">
            Transactions
          </Link>
          <Link href="/reports" className="nav-link">
            Reports
          </Link>
        </div>
        <div className="flex space-x-4">
          <button className="nav-button">
            Notifications
          </button>
          { isLoggedIn ? (
            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          ) : (
            <div>
              <Link href="/auth/login" className="nav-link">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;