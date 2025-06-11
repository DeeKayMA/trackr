
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


export const description = "A pie chart showing the job type breakdown of all the users applications"

// Full-Time, Part-Time, Contract, Internship, Freelance, Other

const chartConfig = {
  count: {
    label: "Count",
  },
   "Full-time": {
    label: "Full-time",
    color: "var(--chart-2)",
  },
  "Part-time": {
    label: "Part-time",
    color: "var(--chart-3)",
  },
  Contract: {
    label: "Contract",
    color: "var(--chart-4)",
  },
  Internship: {
    label: "Internship",
    color: "var(--color-violet-500)",
  },
  Freelance: {
    label: "Freelance",
    color: "var(--chart-1)",
  },
  Other: {
    label: "Other",
    color: "var(--color-gray-300)",
  },
  "": {
    label: "N/A",
    color: "var(--color-purple-500)",
  },
} satisfies ChartConfig


type JobTypeBreakdownChartProps = {
  className: string;
};

export const JobTypeBreakdownChart = ({ className }: JobTypeBreakdownChartProps) => {

  const [loading, setLoading] = useState(true);
  const { refresh, setRefresh } = useRefreshStore();
  const [chartData, setChartData] = useState<{ job_type: string; count: number; fill: string }[]>([]);


  useEffect(()=> {
    const fetchJobTypeCount =  async() => {

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
        .select("job_type")
        .eq("user_id", user.id)

      if (error || !data) {
        console.error("Error fetching statuses:", error);
        return;
      }

      const jobTypeCounts: Record<string, number> = {};

      for (const { job_type } of data) {
        if (job_type in jobTypeCounts) {
          jobTypeCounts[job_type]++;
        } else {
          jobTypeCounts[job_type] = 1;
        }
      }

      const chartData = Object.entries(jobTypeCounts).map(([job_type, count]) => {
        const config = chartConfig[job_type as keyof typeof chartConfig];

        return {
          job_type,
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

    fetchJobTypeCount()

  },[refresh])

  if (loading) {
    return <Skeleton className="h-[420px] w-full rounded-xl" />;
  }

    return(
        <Card className={`flex flex-col ${className}`}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Job Type</CardTitle>
        <CardDescription>Breakdown of applicationa by Job Type</CardDescription>
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
                nameKey="job_type"
                isAnimationActive={true}
                animationBegin={300} 
                cx="50%"
                cy="50%"
                outerRadius={100}
              />
            <ChartLegend
              content={<ChartLegendContent nameKey="job_type" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center mt-4"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
    )
}