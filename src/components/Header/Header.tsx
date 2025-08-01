'use client'


import { ModeToggle } from "@/components/Theme/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AddJobDialog = dynamic(() => import("@/components/CRUD/AddJobDialog/AddJobDialog"), {
  ssr: false,
});

export default function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

    useEffect(() => {
      
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  const titleMap: Record<string, string> = {
    "/dashboard": "Home",
    "/dashboard/jobs": "Jobs",
     "/dashboard/analytics": "Analytics",
    "/dashboard/account": "Account",
    "/dashboard/resources": "Resources",
  };

  const title = titleMap[pathname] ?? "Jobora";

  return (
    <header className=" sticky top-0 z-50 bg-[var(--background)] space-between group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
      <ModeToggle/>
        <AddJobDialog />
      
    </header>
  );
}