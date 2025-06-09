"use client";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { useRefreshStore } from "@/lib/store/useRefreshStore";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartConfig = {
  applications: {
    label: "Applications",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type AppsPerDayChartProps = {
  className: string;
};

export const AppsPerDayChart = ({ className }: AppsPerDayChartProps) => {
  const [chartData, setChartData] = useState<
    { date: string; applications: number }[]
  >([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const { refresh, setRefresh } = useRefreshStore();
  const [trendingUp, setTrendingUp] = useState(false);
  const [trendPercentage, setTrendPercentage] = useState(0);

  useEffect(() => {
    const fetchDailyCount = async () => {
      const {
        data: { user },
        error,
      } = await supabaseBrowser.auth.getUser();

      if (error || !user) {
        console.error("Failed to get user:", error);
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 6);

      const { data, error: fetchError } = await supabaseBrowser
        .from("Job Applications")
        .select("date_applied")
        .eq("user_id", user.id)
        .gte("date_applied", startDate.toISOString())
        .lte("date_applied", new Date().toISOString());

      if (fetchError || !data) {
        console.error(
          "Error fetching this week's daily application count:",
          fetchError
        );
        return;
      }

      const dayMap = new Map<string, number>();

      // Fill map with 0 counts first to maintain order
      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        const label = day.toLocaleDateString("en-UK", { weekday: "long" });
        dayMap.set(label, 0);
      }

      // Count applications per day
      for (const { date_applied } of data) {
        const date = new Date(date_applied);
        const label = date.toLocaleDateString("en-UK", { weekday: "long" });
        if (dayMap.has(label)) {
          dayMap.set(label, (dayMap.get(label) || 0) + 1);
        }
      }

      // Convert to chart format
      const chart = Array.from(dayMap.entries()).map(
        ([date, applications]) => ({
          date,
          applications,
        })
      );

      //COMPATING THE WEEKLY TREND 
      const thisWeekTotal = data.length;

      const lastWeekStart = new Date(startDate);
      lastWeekStart.setDate(startDate.getDate() - 7);
      lastWeekStart.setHours(0, 0, 0, 0);

      const lastWeekEnd = new Date(startDate);
      lastWeekEnd.setDate(startDate.getDate() - 1);
      lastWeekEnd.setHours(23, 59, 59, 999);

      // Fetch last week data
      const { data: lastWeekData, error: lastWeekError } = await supabaseBrowser
        .from("Job Applications")
        .select("date_applied")
        .eq("user_id", user.id)
        .gte("date_applied", lastWeekStart.toISOString())
        .lte("date_applied", lastWeekEnd.toISOString());

      if (lastWeekError) {
        console.error("Error fetching last week's data:", lastWeekError);
        return;
      }

      const lastWeekTotal = lastWeekData?.length || 0;

      // Compare
      if (lastWeekTotal === 0 && thisWeekTotal > 0) {
        setTrendingUp(true);
        setTrendPercentage(100);
      } else if (thisWeekTotal === 0) {
        setTrendingUp(false);
        setTrendPercentage(100);
      } else {
        const difference = thisWeekTotal - lastWeekTotal;
        const percentageChange = Math.round((Math.abs(difference) / lastWeekTotal) * 100);
        setTrendingUp(difference >= 0);
        setTrendPercentage(percentageChange);
      }

      setStartDate(startDate);
      setEndDate(today);
      setChartData(chart);
      setLoading(false);
      setRefresh(false);
    };

    fetchDailyCount();
  }, [refresh]);

  if (loading) {
    return <Skeleton className="h-[405px] w-full rounded-xl" />;
  }

  return (
    <Card className={`${className} `}>
      <CardHeader>
        <CardTitle>Applications Per Day</CardTitle>
        <CardDescription>
          Total applications for the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="applications"
              type="natural"
              fill="var(--color-applications)"
              fillOpacity={0.4}
              stroke="var(--color-applications)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending {trendingUp ? "up" : "down"} by {trendPercentage}% from
              last week{" "}
              {trendingUp ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {startDate.toLocaleDateString("en-UK", {
                day: "numeric",
                month: "short",
              })}{" "}
              -{" "}
              {endDate.toLocaleDateString("en-UK", {
                day: "numeric",
                month: "short",
              })}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
