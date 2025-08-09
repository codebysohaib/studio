
"use client";

import type { User as AppUser } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getUsers } from './data';

const ADMIN_EMAIL = "mughalsohaib240@gmail.com";
const ADMIN_PASS = "@sohaibofficial66";

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password?: string) => Promise<boolean>;
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
    // Check for a logged-in user in localStorage on initial load
    try {
      const storedUser = window.localStorage.getItem('learnbox-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Could not parse user from localStorage", error)
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    setLoading(true);
    try {
      let loggedInUser: AppUser | null = null;
      if (email === ADMIN_EMAIL) {
        if (password === ADMIN_PASS) {
          loggedInUser = { id: 'admin-user', name: 'Sohaib Mughal', email: ADMIN_EMAIL, role: 'admin', avatar: 'https://placehold.co/100x100.png' };
        }
      } else {
         loggedInUser = { id: email, name: email.split('@')[0], email: email, role: 'student', avatar: 'https://placehold.co/100x100.png' };
      }

      if (loggedInUser) {
        setUser(loggedInUser);
        window.localStorage.setItem('learnbox-user', JSON.stringify(loggedInUser));
        toast({ title: "Login Successful", description: `Welcome, ${loggedInUser.name}!`});
        
        // This is a mock of adding user to a list on login
        const existingUsers = await getUsers();
        const userExists = existingUsers.some(u => u.email === loggedInUser.email);
        if(!userExists) {
            // In a real app, this would be a database call
            console.log("Adding new user to mock user list:", loggedInUser.email);
        }

        router.push('/dashboard');
        return true;
      }

      return false;

    } catch (error) {
      console.error("Login error", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setUser(null);
    window.localStorage.removeItem('learnbox-user');
    router.push('/');
    setLoading(false);
  };
  
    if (loading) {
      return (
          <div className="flex min-h-screen items-center justify-center bg-background">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      );
    }


  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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
