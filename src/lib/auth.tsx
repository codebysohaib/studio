"use client";

import type { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

// For demonstration, we'll use a hardcoded user.
// In a real app, you'd get this from your auth provider.
const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@classroom.central',
  role: 'admin',
  avatar: 'https://placehold.co/100x100.png'
};

// To test student view, change role to 'student' and uncomment
/*
const mockUser: User = {
  id: '2',
  name: 'Student User',
  email: 'student@classroom.central',
  role: 'student',
  avatar: 'https://placehold.co/100x100.png'
};
*/

interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would check for an active session here.
    // For this mock, we'll check a value in localStorage.
    const session = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
    if (session) {
      setUser(mockUser);
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      setUser(mockUser);
      setLoading(false);
      router.push('/dashboard');
    }, 500);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    setLoading(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
