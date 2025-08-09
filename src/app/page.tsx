
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { BookOpenCheck, Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "mughalsohaib240@gmail.com";

export default function LoginPage() {
  const { login, loading, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setShowPassword(newEmail === ADMIN_EMAIL);
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
        toast({ title: "Email is required", variant: "destructive" });
        return;
    }
    const success = await login(email, password);
    if (!success) {
      toast({ title: "Login Failed", description: "Invalid credentials.", variant: "destructive" });
    }
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
        
        <form onSubmit={handleSignIn} className="mt-10">
          <div className="flex flex-col gap-4">
            <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                required
                className="h-12 text-center"
            />
            {showPassword && (
                 <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 text-center"
                />
            )}
            <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full"
            >
                {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                <LogIn className="mr-2 h-5 w-5" />
                )}
                Continue
            </Button>
          </div>
        </form>
       
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
