'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Dashboard from './dashboard/page';


export default function Home() {
  console.log('router is ready');
  return (
    <div className="min-h-screen bg-gray-50">
    <main className="py-10">
      <Dashboard />
    </main>
  </div>
  );
}