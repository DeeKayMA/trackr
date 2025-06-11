"use client";

import Header from "@/components/Header/Header";
import { TempCard } from "@/components/temp/TempCard";
import { useEffect } from "react";
import { loadUserProfile } from "@/lib/helpers/loadUserProfile";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { StreakCard } from "@/components/Analytics/Streaks/StreakCard";
import { DailyTargetCard } from "@/components/Analytics/Targets/DailyTargetCard";
import { WeeklyTargetCard } from "@/components/Analytics/Targets/WeeklyTargetCard";
import { AppsPerDayChart7 } from "@/components/Analytics/AppsPerDay/AppsPerDayChart(7)";
import { StatusBreakdownChart } from "@/components/Analytics/BreakdownCharts/StatusBreakdownChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BriefcaseBusiness, ChartColumnIncreasing, CircleUser } from "lucide-react";

export default function Dashboard() {
  const { refresh, setRefresh } = useRefreshStore();

useEffect(() => {
  const fetchAndSet = async () => {
    await loadUserProfile();
    if (refresh) {
      setRefresh(false);
    }
  };
  
  fetchAndSet();
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

      </div>
    </div>
  );
}
