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
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

type AppsPerWeekChartProps = {
  className: string;
};

export const AppsPerDayChart30 = ({ className }: AppsPerWeekChartProps) => {
  const [chartData, setChartData] = useState<{ date: string; applications: number }[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const { refresh, setRefresh } = useRefreshStore();

  useEffect(() => {
    const fetchDailyCount = async () => {

      const now = new Date(); // local time
      now.setHours(0, 0, 0, 0); // midnight today

      const thirtyDayStart = new Date(now);
      thirtyDayStart.setDate(thirtyDayStart.getDate() - 29);

      // Fetch last 30 days data
      const { data, error: fetchError } = await supabaseBrowser
        .from("Job Applications")
        .select("date_applied")
        .gte("date_applied", thirtyDayStart.toISOString())
        .lte("date_applied", new Date().toISOString());

      if (fetchError || !data) {
        console.error("Error fetching data from last 30 days", fetchError);
        return;
      }

      const formatDateKey = (d: Date) =>
        d.toLocaleDateString(undefined, {
          weekday: "short",
          day: "numeric",
          month: "short",
        });

      const dayMap = new Map<string, number>();
      for (let i = 0; i < 30; i++) {
        const day = new Date(thirtyDayStart);
        day.setDate(thirtyDayStart.getDate() + i);
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

      setStartDate(thirtyDayStart);
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
        <CardTitle>Daily Applications (30 Days)</CardTitle>
        <CardDescription>
          Your daily applications over the past month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 20, right: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const [, day, month] = value.replace(",", "").split(" ");
                return `${day} ${month}`;
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





