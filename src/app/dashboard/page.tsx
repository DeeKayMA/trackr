"use client";

import Header from "@/components/Header/Header";
import { TempCard } from "@/components/temp/TempCard";
import { useEffect } from "react";
import { loadUserProfile } from "@/lib/helpers/loadUserProfile";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { StreakCard } from "@/components/Analytics/StreakCard";
import { DailyTargetCard } from "@/components/Analytics/DailyTargetCard";
import { WeeklyTargetCard } from "@/components/Analytics/WeeklyTargetCard";
import { AppsPerDayChart7 } from "@/components/Analytics/AppsPerDay/AppsPerDayChart(7)";
import { StatusBreakdownChart } from "@/components/Analytics/BreakdownCharts/StatusBreakdownChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BriefcaseBusiness, ChartColumnIncreasing, CircleUser } from "lucide-react";

export default function Dashboard() {
  const { refresh, setRefresh } = useRefreshStore();

  useEffect(() => {
    // Run on initlal load
    loadUserProfile();
  }, []);

  useEffect(() => {
    // Run whenever refresh becomes true
    if (refresh) {
      const fetchAndSet = async () => {
        await loadUserProfile();
        setRefresh(false);
      };
      fetchAndSet();
    }
  }, [refresh]);


  return (
    <div className="flex flex-col w-full">
      <Header title="Home" />
      <div className=" flex flex-col gap-4 px-4 py-8 lg:px-6 max-w-7xl mx-auto w-full">
        {/* Stat Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-3 gap-4">
          <StreakCard className="" />
          <DailyTargetCard className="" />
          <WeeklyTargetCard className="" />
        </section>

        {/* Mini Charts */}
        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          <AppsPerDayChart7 className=""/>
          <StatusBreakdownChart className=""/>
        </section>

        {/* Gamified XP & Badges Charts */}
        {/* <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TempCard cardName="XP progress" className="" />
          <TempCard cardName="Badges" className="" />
        </section> */}

        {/* Call to Action */}
        {/* <section className="">
          <TempCard
            cardName="Subscribe to Jobora AI"
            className=""
          />
        </section> */}

        {/* Quick Navigation  */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[200px] lg:h-[60px]">

          <Link href="/dashboard/jobs"><Button className="h-full w-full bg-blue-500 hover:bg-blue-600"><BriefcaseBusiness/> Jobs</Button></Link>
          <Link href="/dashboard/analytics"><Button className="h-full w-full bg-green-500 hover:bg-green-600"><ChartColumnIncreasing/> Analytics</Button></Link>
          <Link href="/dashboard/account"><Button className="h-full w-full bg-amber-500 hover:bg-amber-600"><CircleUser/> Account</Button></Link>

        </section>
      </div>
    </div>
  );
}
