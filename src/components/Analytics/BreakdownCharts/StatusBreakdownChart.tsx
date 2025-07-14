"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

export const description =
  "A pie chart showing the stus breakdown of all the users applications";

const chartConfig = {
  count: {
    label: "Count",
  },
  Saved: {
    label: "Saved",
    color: "var(--color-gray-300)",
  },
  Applied: {
    label: "Applied",
    color: "var(--color-blue-500)",
  },
  Interview: {
    label: "Interview",
    color: "var(--color-yellow-500)",
  },
  Offer: {
    label: "Offer",
    color: "var(--color-green-500)",
  },
  Rejected: {
    label: "Rejected",
    color: "var(--color-red-500)",
  },
  Withdrawn: {
    label: "Withdrawn",
    color: "var(--color-slate-700)",
  },
  Archived: {
    label: "Withdrawn",
    color: "var(--color-slate-400)",
  },
} satisfies ChartConfig;

type StatusBreakdownChartProps = {
  className: string;
};

export const StatusBreakdownChart = ({
  className,
}: StatusBreakdownChartProps) => {
  const [loading, setLoading] = useState(true);
  const { refresh, setRefresh } = useRefreshStore();
  const [chartData, setChartData] = useState<
    { status: string; count: number; fill: string }[]
  >([]);

  useEffect(() => {
    const fetchStatusCount = async () => {
      const {
        data: { user },
        error,
      } = await supabaseBrowser.auth.getUser();

      if (error || !user) {
        console.error("Failed to get user:", error);
        return;
      }

      const { data, error: fetchError } = await supabaseBrowser
        .from("Job Applications")
        .select("status")
        .eq("user_id", user.id);

      if (fetchError || !data) {
        console.error("Error fetching statuses:", fetchError);
        return;
      }

      const statusCounts: Record<string, number> = {};

      for (const { status } of data) {
        if (status in statusCounts) {
          statusCounts[status]++;
        } else {
          statusCounts[status] = 1;
        }
      }

      const chartData = Object.entries(statusCounts).map(([status, count]) => {
        const config = chartConfig[status as keyof typeof chartConfig];

        return {
          status,
          count,
          fill:
            typeof config === "object" && "color" in config
              ? config.color
              : "var(--color-gray-300)",
        };
      });

      setChartData(chartData);
      setLoading(false);
      setRefresh(false);
    };

    fetchStatusCount();
  }, [refresh]);

  if (loading) {
    return <Skeleton className="h-[420px] w-full rounded-xl" />;
  }

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Application Status</CardTitle>
        <CardDescription>Breakdown of applications by status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 align-center">
        {chartData.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center w-full">
            <p className="text-primary text-lg font-semibold">Nothing to show yet</p>
            <p className="text-muted-foreground">Add a few jobs, we&apos;ll make it pretty.</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[320px]"
          >
            <PieChart className="flex gap-20">
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                isAnimationActive={true}
                animationBegin={300}
                cx="50%"
                cy="50%"
                outerRadius={120}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center mt-4"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
