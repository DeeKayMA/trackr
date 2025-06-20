
"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useRefreshStore } from "@/lib/store/useRefreshStore"
import { supabaseBrowser } from "@/lib/supabase/supabase"
import { useEffect, useState } from "react"
import { Pie, PieChart } from "recharts"


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

      if (fetchError || !data) {
        console.error("Error fetching statuses:", fetchError);
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
    return <Skeleton className="h-[420px] w-full rounded-xl" />;
  }

    return(
        <Card className={`flex flex-col ${className}`}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Work Model</CardTitle>
        <CardDescription>Breakdown of applications by work model</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 align-center">
        {chartData.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center w-full">
            <p className="text-primary text-lg font-semibold">Still nothing to show</p>
            <p className="text-muted-foreground">You sure you’re not just here for the vibes?</p>
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
        )}
        
      </CardContent>
    </Card>
    )
}