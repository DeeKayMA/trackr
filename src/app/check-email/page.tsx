'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const emailProviders = [
  {
    name: 'Gmail',
    url: 'https://mail.google.com/mail/u/0',
  },
  {
    name: 'Outlook',
    url: 'https://outlook.live.com/mail/',
  },
  {
    name: 'Yahoo',
    url: 'https://mail.yahoo.com/',
  },
  {
    name: 'iCloud',
    url: 'https://www.icloud.com/mail/',
  },
  {
    name: 'ProtonMail',
    url: 'https://mail.proton.me/',
  },
]

export default function CheckEmailPage() {
  return (
    <div className="max-w-md mx-auto mt-16 p-6 text-center gap-4 flex flex-col">
      <Link href="/dashboard">
          <span
            className=" justify-center align-center flex text-3xl font-bold tracking-tight bg-clip-text text-transparent
                bg-gradient-to-r from-purple-500 to-purple-700 
                dark:from-purple-400 dark:to-purple-500 ">
            Jobora
          </span>
        </Link>
      <h1 className="text-2xl font-bold">Check your email</h1>
      <p className="mt-2 text-muted-foreground">
        We&apos;ve sent a confirmation link to your inbox.
      </p>

      <div className="mt-6 grid gap-3">
        {emailProviders.map((provider) => (
          <Button
            key={provider.name}
            asChild
            variant="outline"
            className="w-full"
          >
            <Link href={provider.url} target="_blank" rel="noopener noreferrer">
              Open {provider.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
