"use client";

import {
  BriefcaseBusiness,
  ChartColumnIncreasing,
  Home
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useRefreshUserDetailsStore } from "@/lib/store/useRefreshUserDetailsStore";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import NavUser from "../NavUser/NavUser";

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

      // Set email immediately
      setUserInfo((prev) => ({
        ...prev,
        email: user.email || "",
      }));

      // Check if account details exist
      const { data: accountData, error: accountError } = await supabaseBrowser
        .from("Account Details")
        .select("username, profile_img")
        .eq("user_id", user.id)
        .maybeSingle(); // 👈 safer than .single()

      if (accountError) {
        console.error("Error fetching account details:", accountError);
        return;
      }

      // Only update if profile is set
      if (accountData) {
        setUserInfo((prev) => ({
          ...prev,
          name: accountData.username || "",
          avatar: accountData.profile_img || null,
        }));
      }

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
                <span
                  className="text-xl font-bold tracking-tight bg-clip-text text-transparent
                bg-gradient-to-r from-purple-500 to-purple-700 
                dark:from-purple-300 dark:to-purple-500 
      "
                >
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
