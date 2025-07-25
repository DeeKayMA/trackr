"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/supabase";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [recoveryMode, setRecoveryMode] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash && hash.includes("access_token")) {
      const url = new URL(window.location.href.replace("#", "?"));
      const access_token = url.searchParams.get("access_token");
      const refresh_token = url.searchParams.get("refresh_token");

      if (access_token && refresh_token) {
        supabase.auth
          .setSession({ access_token, refresh_token })
          .then(({ error }) => {
            if (error) {
              setStatus("Failed to restore session. Try the reset link again.");
            } else {
              setRecoveryMode(true);
              setStatus("Enter your new password below.");
            }
          });
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setStatus(`${error.message}`);
    } else {
      setStatus("Password updated. Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/dashboard">
          <span
            className=" justify-center align-center flex text-3xl font-bold tracking-tight bg-clip-text text-transparent
                bg-gradient-to-r from-purple-500 to-purple-700 
                dark:from-purple-400 dark:to-purple-500 ">
            Jobora
          </span>
        </Link>

        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Reset Password</CardTitle>
              <CardDescription>Enter your new password below</CardDescription>
            </CardHeader>
            <CardContent>
              {recoveryMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="password">New Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Update Password
                    </Button>
                  </div>
                </form>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  {status ?? "Preparing password reset..."}
                </p>
              )}
              {status && recoveryMode && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  {status}
                </p>
              )}
            </CardContent>
          </Card>

          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            Problems? <a href="/forgot-password">Try again</a> or{" "}
            <a href="/login">log in</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
