"use client";

import type { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

// For demonstration, we'll use a hardcoded user.
// In a real app, you'd get this from your auth provider.
const mockUser: User = {
  id: '1',
  name: 'Sohaib Mughal',
  email: 'mughalsohaib240@gmail.com',
  role: 'admin',
  avatar: 'https://placehold.co/100x100.png'
};

const studentUser: User = {
  id: '2',
  name: 'Student User',
  email: 'student@classroom.central',
  role: 'student',
  avatar: 'https://placehold.co/100x100.png'
};


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
    const userRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;

    if (session) {
        if(userRole === 'admin') {
            setUser(mockUser);
        } else {
            setUser(studentUser);
        }
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = () => {
    setLoading(true);
    // Simulate API call and user role detection
    setTimeout(() => {
      // In a real app, you'd get the user from your auth provider.
      // Here we simulate it. For demo purposes, we log in the admin.
      // To test student, change mockUser to studentUser
      const loggedInUser = mockUser; 
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', loggedInUser.role);
      setUser(loggedInUser);
      setLoading(false);
      router.push('/dashboard');
    }, 500);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
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
