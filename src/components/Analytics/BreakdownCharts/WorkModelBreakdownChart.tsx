
"use client"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowser } from "@/lib/supabase/supabase"


export const description = "A pie chart showing the work model breakdown of all the users applications"

const chartConfig = {
  count: {
    label: "N/A",
  },
   "On-site": {
    label: "On-site",
    color: "var(--chart-1)",
  },
  Remote: {
    label: "Remote",
    color: "var(--chart-2)",
  },
  Hybrid: {
    label: "Hybrid",
    color: "var(--chart-3)",
  },
  "": {
    label: "N/A",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig


type WorkModelBreakdownChartProps = {
  className: string;
};

export const WorkModelBreakdownChart = ({ className }: WorkModelBreakdownChartProps) => {

  const [loading, setLoading] = useState(true);
  const { refresh, setRefresh } = useRefreshStore();
  const [chartData, setChartData] = useState<{ work_model: string; count: number; fill: string }[]>([]);


  useEffect(()=> {
    const fetchWorkModelCount =  async() => {

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
        .select("work_model")
        .eq("user_id", user.id)

      if (error || !data) {
        console.error("Error fetching statuses:", error);
        return;
      }

      const workModelCounts: Record<string, number> = {};

      for (const { work_model } of data) {
        if (work_model in workModelCounts) {
          workModelCounts[work_model]++;
        } else {
          workModelCounts[work_model] = 1;
        }
      }

      const chartData = Object.entries(workModelCounts).map(([work_model, count]) => {
        const config = chartConfig[work_model as keyof typeof chartConfig];

        return {
          work_model,
          count,
          fill:
            typeof config === "object" && "color" in config
              ? config.color
              : "var(--color-gray-300)",
        };
      });

      
      setChartData(chartData);
      setLoading(false)
      setRefresh(false);

    }

    fetchWorkModelCount()

  },[refresh])

  if (loading) {
    return <Skeleton className="h-[405px] w-full rounded-xl" />;
  }

    return(
        <Card className={`flex flex-col ${className}`}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Work Model</CardTitle>
        <CardDescription>All time work model breakdown</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 align-center">
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
                nameKey="work_model"
                isAnimationActive={true}
                animationBegin={300} 
                cx="50%"
                cy="50%"
                outerRadius={120}
              />
            <ChartLegend
              content={<ChartLegendContent nameKey="work_model" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center mt-4"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
    )
}