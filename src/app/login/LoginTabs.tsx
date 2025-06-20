'use client'

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type LoginTabsProps = {
  loginForm: React.ReactNode;
  signupForm: React.ReactNode;
};

export default function LoginTabs({ loginForm, signupForm }: LoginTabsProps) {
  const searchParams = useSearchParams();

  const initialTab = useMemo(() => {
    const tab = searchParams.get('tab');
    return tab === 'signup' ? 'signup' : 'login';
  }, [searchParams]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/dashboard">
          <span className="justify-center align-center flex text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-400 dark:to-purple-500">
            Jobora
          </span>
        </Link>

        <Tabs defaultValue={initialTab} className="w-[400px]">
          <TabsList className="w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">{loginForm}</TabsContent>
          <TabsContent value="signup">{signupForm}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
