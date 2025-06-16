"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/Theme/ModeToggle";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type LandingHeaderProps = {
    className: string;
}

export default function LandingHeader({className}: LandingHeaderProps) {

  return (
    <header className={`${className} w-full flex rounded-2xl max-w-3xl p-2 bg-[var(--background)] justify-between gap-1 lg:gap-2 border-b items-center`}>
      <Link href="/" className="">
        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-300 dark:to-purple-500">
          Jobora
        </span>
      </Link>
      <div className="flex items-center gap-2">

        <ModeToggle />
        <Link href="/login">
          <Button className="text-white font-semibold bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-colors duration-200">
            Start Tracking Jobs
          </Button>
        </Link>
      </div>
    </header>
  );
}
