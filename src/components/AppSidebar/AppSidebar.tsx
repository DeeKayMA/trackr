'use client'

import {
  Book,
  LayoutDashboardIcon,
  BriefcaseBusiness,
  ChartColumnIncreasing,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";


import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import NavUser from "../NavUser/NavUser";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Jobs",
    url: "/dashboard/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Resources",
    url: "/dashboard/resources",
    icon: Book,
  },
];

export default function AppSidebar() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabaseBrowser.auth.getSession();
      if (session?.user) {
        setUserInfo({
          name:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            "",
          email: session.user.email || "",
          avatar: session.user.user_metadata?.avatar_url || "/globe.svg",
        });
      }
    };
    fetchUser();
  }, []);



  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">

                {/* <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Crosshair className="size-4" />
                </div> */}
                <span className="text-base font-semibold">Trackr </span>

              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <NavUser
          user={userInfo}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
