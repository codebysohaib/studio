"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { BookOpenCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { loginWithGoogle, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

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
        <div className="mt-10">
          <Button
            onClick={loginWithGoogle}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.7 0 265.9c0-43.2 12.8-83.3 35.6-117.9h-1.8C13.4 180.2 0 221.7 0 265.9c0 101.4 82.5 183.9 184.9 183.9 44.4 0 86.2-16.7 118-44.9 20.3 15.1 47.7 24.3 78.2 24.3 50.8 0 92.5-41.7 92.5-92.5 0-14-3.7-27.2-10-38.6zM244 177.1c-3.1-6.1-8-11.4-14.3-15.4-2.5-1.6-5.1-2.9-7.9-4-10.9-4.2-22.6-6.3-34.8-6.3-43.2 0-78.3 35.1-78.3 78.3s35.1 78.3 78.3 78.3c12.2 0 23.9-2.1 34.8-6.3 2.8-1.1 5.4-2.4 7.9-4 6.3-4 11.2-9.3 14.3-15.4 3.1-6.1 4.7-12.9 4.7-20.1s-1.6-14-4.7-20.1zm-86.2 66.8c-20.1 0-36.3-16.2-36.3-36.3s16.2-36.3 36.3-36.3 36.3 16.2 36.3 36.3-16.2 36.3-36.3-36.3z"></path>
              </svg>
            )}
            Sign in with Google
          </Button>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          Access is restricted to approved class members.
        </p>
      </div>
    </div>
  );
}
