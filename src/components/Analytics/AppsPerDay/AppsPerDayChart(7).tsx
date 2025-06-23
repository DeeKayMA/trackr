"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

export const AppsPerDayChart7 = ({ className }: AppsPerDayChartProps) => {
  const [chartData, setChartData] = useState<
    { date: string; applications: number }[]
  >([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const { refresh, setRefresh } = useRefreshStore();

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

      const now = new Date(); // local time
      now.setHours(0, 0, 0, 0); // midnight today

      const thisWeekStart = new Date(now);
      thisWeekStart.setDate(thisWeekStart.getDate() - 6);

      // Fetch this week's data
      const { data, error: fetchError } = await supabaseBrowser
        .from("Job Applications")
        .select("date_applied")
        .eq("user_id", user.id)
        .gte("date_applied", thisWeekStart.toISOString())
        .lte("date_applied", new Date().toISOString());

      if (fetchError || !data) {
        console.error("Error fetching this week's data:", fetchError);
        return;
      }

      const formatDateKey = (d: Date) =>
        d.toLocaleDateString(undefined, {
          weekday: "short",
          day: "numeric",
          month: "short",
        });

      const dayMap = new Map<string, number>();
      for (let i = 0; i < 7; i++) {
        const day = new Date(thisWeekStart);
        day.setDate(thisWeekStart.getDate() + i);
        dayMap.set(formatDateKey(day), 0);
      }

      for (const { date_applied } of data) {
        const utcDate = new Date(date_applied);
        const localDate = new Date(
          utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
        );
        const label = formatDateKey(localDate);
        if (dayMap.has(label)) {
          dayMap.set(label, (dayMap.get(label) || 0) + 1);
        }
      }

      const chart = Array.from(dayMap.entries()).map(
        ([date, applications]) => ({
          date,
          applications,
        })
      );

      setStartDate(thisWeekStart);
      setEndDate(now);
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
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle>Daily Applications (7 Days)</CardTitle>
        <CardDescription>
          Your daily applications over the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const [weekday] = value.replace(",", "").split(" ");
                return weekday.charAt(0).toUpperCase();
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="applications"
              type="monotone"
              fill="var(--color-applications)"
              fillOpacity={0.4}
              stroke="var(--color-applications)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="text-muted-foreground flex items-center gap-2 leading-none">
            {startDate.toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
            })}{" - "}
            {endDate.toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
            })}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
