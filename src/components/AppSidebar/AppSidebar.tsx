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
import { useRefreshStore } from "@/lib/store/useRefreshStore";

// Menu items.
const items = [
  {
    title: "Home",
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
  // {
  //   title: "Resources",
  //   url: "/dashboard/resources",
  //   icon: Book,
  // },
];

export default function AppSidebar() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const { refresh, setRefresh } = useRefreshStore();

  useEffect(() => {
  const fetchUser = async () => {
    const { data: { session }, error: sessionError } = await supabaseBrowser.auth.getSession();

    if (sessionError) {
      console.error("Session error:", sessionError);
      return;
    }

    const user = session?.user;
    if (!user) return;

    // Fetch from Account Details
    const { data, error } = await supabaseBrowser
      .from("Account Details")
      .select("username, profile_img")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching account details:", error);
      return;
    }

    setUserInfo({
      name: data?.username || "",
      email: user.email || "",
      avatar: data?.profile_img || null,
    });

    setRefresh(false); 

  };

  

  fetchUser();
}, [refresh]);


console.log(userInfo)

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
