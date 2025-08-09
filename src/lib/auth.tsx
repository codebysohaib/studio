"use client";

import type { User as AppUser } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { app } from './firebase';
import { Loader2 } from 'lucide-react';

const auth = getAuth(app);
const adminEmail = "mughalsohaib240@gmail.com";

interface AuthContextType {
  user: AppUser | null;
  loginWithGoogle: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const appUser = formatUser(firebaseUser);
        setUser(appUser);
        if (window.location.pathname === '/') {
          router.replace('/dashboard');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);
  
  const formatUser = (firebaseUser: FirebaseUser): AppUser => {
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'User',
      email: firebaseUser.email || '',
      role: firebaseUser.email === adminEmail ? 'admin' : 'student',
      avatar: firebaseUser.photoURL || `https://placehold.co/100x100.png`
    }
  }


  const loginWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const appUser = formatUser(result.user);
      setUser(appUser);
      router.push('/dashboard');
    } catch (error) {
      console.error("Authentication Error:", error);
      setUser(null);
    } finally {
        setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
        await signOut(auth);
        setUser(null);
        router.push('/');
    } catch(error) {
        console.error("Sign Out Error:", error);
    } finally {
        setLoading(false);
    }
  };
  
    if (loading) {
        return (
          <div className="flex min-h-screen items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        );
    }


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
