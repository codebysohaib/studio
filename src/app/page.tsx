"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { BookOpenCheck, Loader2, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { signInWithEmailLink, sendSignInLink, loading, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [isLinkSent, setIsLinkSent] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
      return;
    }

    const emailFromStorage = window.localStorage.getItem('emailForSignIn');
    if (searchParams.has('apiKey') && emailFromStorage) {
      signInWithEmailLink(emailFromStorage, window.location.href);
    }
  }, [user, router, searchParams, signInWithEmailLink]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
        toast({ title: "Email is required", variant: "destructive" });
        return;
    }
    await sendSignInLink(email);
    setIsLinkSent(true);
  };
  
  if (loading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <BookOpenCheck className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground font-headline">LearnBox</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your academic resource hub.</p>
        
        {isLinkSent ? (
            <div className="mt-10 text-center bg-accent/20 border border-primary/20 p-6 rounded-lg">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground">Check your inbox</h2>
                <p className="mt-2 text-muted-foreground">
                    A sign-in link has been sent to <span className="font-bold text-foreground">{email}</span>. Click the link to log in.
                </p>
                 <p className="mt-4 text-xs text-muted-foreground">
                    You can close this tab.
                </p>
            </div>
        ) : (
            <form onSubmit={handleSignIn} className="mt-10">
              <div className="flex flex-col gap-4">
                <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-center"
                />
                <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full"
                >
                    {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                    <Mail className="mr-2 h-5 w-5" />
                    )}
                    Send Sign-In Link
                </Button>
              </div>
            </form>
        )}

        <p className="mt-12 text-sm text-muted-foreground">
          Access is restricted to approved class members.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Developed by Sohaib
        </p>
      </div>
    </div>
  );
}
