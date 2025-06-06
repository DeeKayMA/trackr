"use client";

import { StatCard } from "@/components/Global/StatCard/StatCard";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import { useRefreshStore } from "@/lib/store/useRefreshStore";

export const TotalInterviewsCard = () => {

  const { refresh } = useRefreshStore();

  // const countToday = 12
  const [countToday, setCountToday] = useState<number>(0);
  const [countLastMonth, setCountLastMonth] = useState<number>(0);
  const countDiff = countToday - countLastMonth;

    // Fetch today's total interviews
  useEffect(() => {
  const fetchInterviewCounts = async () => {
    const today = new Date();
    // const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of last month

    // Fetch total count (today)
    const { count: totalCount, error: totalError } = await supabaseBrowser
      .from("Job Applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "Interview");

    // Fetch count from last month
    const { count: lastMonthCount, error: lastMonthError } = await supabaseBrowser
      .from("Job Applications")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfLastMonth.toISOString())
      .lte("created_at", endOfLastMonth.toISOString())
      .eq("status", "Interview");

    if (totalError || lastMonthError) {
      console.error("Error fetching counts", totalError || lastMonthError);
      return;
    }

    setCountToday(totalCount || 0);
    setCountLastMonth(lastMonthCount || 0);
  };

  fetchInterviewCounts();
}, [refresh]);



const percentageChange = ((countToday - countLastMonth) / countLastMonth) * 100;

  // Check percentage change and then update trending 
  let trending: "up" | "down" | "new" | "flat" = "flat";
  if (percentageChange > 0) trending = "up";
  else if (percentageChange < 0) trending = "down";
  else if ( percentageChange === 0 && countToday > 0 ) trending = "new";

  return (
      <StatCard
        statName={"Interviews"}
        statDescription={"All time"}
        trending={trending}
        percentage={trending === "flat" ? 0: percentageChange}
        count={countToday}
        countDiff={countDiff}
      />
  );
};
