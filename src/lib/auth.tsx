"use client";

import type { User as AppUser } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut, User as FirebaseUser, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink as firebaseSignInWithEmailLink } from "firebase/auth";
import { app } from './firebase';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const auth = getAuth(app);
const adminEmail = "mughalsohaib240@gmail.com";

interface AuthContextType {
  user: AppUser | null;
  sendSignInLink: (email: string) => Promise<void>;
  signInWithEmailLink: (email: string, url: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const appUser = formatUser(firebaseUser);
        setUser(appUser);
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
      name: firebaseUser.displayName || firebaseUser.email || 'User',
      email: firebaseUser.email || '',
      role: firebaseUser.email === adminEmail ? 'admin' : 'student',
      avatar: firebaseUser.photoURL || `https://placehold.co/100x100.png`
    }
  }

  const sendSignInLink = async (email: string) => {
    setLoading(true);
    const actionCodeSettings = {
        url: window.location.origin,
        handleCodeInApp: true,
    };
    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        toast({ title: "Sign-in link sent", description: "Check your email for the sign-in link."});
    } catch (error: any) {
        console.error("Send Link Error:", error);
        toast({ title: "Error sending link", description: error.message, variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

  const signInWithEmailLink = async (email: string, url: string) => {
    setLoading(true);
    if (isSignInWithEmailLink(auth, url)) {
        try {
            const result = await firebaseSignInWithEmailLink(auth, email, url);
            window.localStorage.removeItem('emailForSignIn');
            const appUser = formatUser(result.user);
            setUser(appUser);
            router.push('/dashboard');
        } catch(error: any) {
            console.error("Sign In Error:", error);
            toast({ title: "Sign-in failed", description: "The sign-in link may be invalid or expired.", variant: "destructive" });
            router.push('/');
        } finally {
            setLoading(false);
        }
    }
  }


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
  
    if (loading && !user) {
        const emailFromStorage = typeof window !== 'undefined' ? window.localStorage.getItem('emailForSignIn') : null;
        const isSignInAttempt = typeof window !== 'undefined' ? isSignInWithEmailLink(auth, window.location.href) : false;

        if (!isSignInAttempt || !emailFromStorage) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-background">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            );
        }
    }


  return (
    <AuthContext.Provider value={{ user, sendSignInLink, signInWithEmailLink, logout, loading }}>
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
