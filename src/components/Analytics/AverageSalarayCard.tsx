"use client";

import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import { useRefreshStore } from "@/lib/store/useRefreshStore";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { PoundSterling } from "lucide-react";

export const AverageSalaryCard = () => {

  const { refresh } = useRefreshStore();

  // const countToday = 12
  const [countToday, setCountToday] = useState<number>(0);
  const [countLastMonth, setCountLastMonth] = useState<number>(0);
  const countDiff = countToday - countLastMonth;


    // Fetch today's total applications
  useEffect(() => {
  const fetchAverageSalary = async () => {
    const today = new Date();
    // const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of last month

    // Fetch total count (today)
    const { count: totalCount, error: totalError } = await supabaseBrowser
      .from("Job Applications")
      .select("*", { count: "exact", head: true });

    // Fetch count from last month
    const { count: lastMonthCount, error: lastMonthError } = await supabaseBrowser
      .from("Job Applications")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfLastMonth.toISOString())
      .lte("created_at", endOfLastMonth.toISOString());

    if (totalError || lastMonthError) {
      console.error("Error fetching counts", totalError || lastMonthError);
      return;
    }

    setCountToday(totalCount || 0);
    setCountLastMonth(lastMonthCount || 0);
  };

  fetchAverageSalary();
}, [refresh]);



const percentageChange = ((countToday - countLastMonth) / countLastMonth) * 100;

  // Check percentage change and then update trending 
  let trending: "up" | "down" | "new" | "salary" |"flat" = "flat";
  if (percentageChange > 0) trending = "up";
  else if (percentageChange < 0) trending = "down";
  else if ( percentageChange === 0 && countToday > 0 ) trending = "new";

  return (
    <div>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Average Salary</CardTitle>
          <CardDescription>Description</CardDescription>
          {/* <CardAction>
            <Badge className="bg-lime-200 text-lime-950">
                  <PoundSterling /> GBP
            </Badge>
          </CardAction> */}
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold tabular-nums">£XXX,XXX</p>
        </CardContent>
      </Card>
    </div>
  );
};
