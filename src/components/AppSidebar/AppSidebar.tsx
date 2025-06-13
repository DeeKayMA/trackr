"use client";

import {
  Book,
  LayoutDashboardIcon,
  BriefcaseBusiness,
  ChartColumnIncreasing,
  Home,
  Crosshair,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { useRefreshUserDetailsStore } from "@/lib/store/useRefreshUserDetailsStore";

// Menu items.
const menuItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
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

// Menu items.
// const proMenuItems = [
//   {
//     title: "AI Recruiter",
//     url: "/dashboard/AI",
//     icon: Home,
//   },
//   {
//     title: "Job Board",
//     url: "/dashboard/listings",
//     icon: BriefcaseBusiness,
//   },
// ];

export default function AppSidebar() {
  const pathname = usePathname();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const { refresh, setRefresh } = useRefreshUserDetailsStore();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabaseBrowser.auth.getSession();

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

  console.log(userInfo);

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-2.5"
            >
              <Link href="/dashboard">
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent
                bg-gradient-to-r from-purple-500 to-purple-700 
                dark:from-purple-300 dark:to-purple-500 
      ">
                  Jobora
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? "bg-primary hover:bg-primary text-primary-foreground hover:text-primary-foreground"
                          : ""
                      }
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Pro features - future development */}
        {/* Check if user is a pro user, then show content. Block user from seeing pro pages if not pro user  */}
        {/* <SidebarGroup>
          <SidebarGroupLabel>Pro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {proMenuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild 
                  className={isActive ? "bg-primary hover:bg-primary text-primary-foreground hover:text-primary-foreground" : ""}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )})}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
    </Sidebar>
  );
}
