
"use client"
import { TrendingUp } from "lucide-react"
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
export const description = "A simple pie chart"
const chartData = [
  { status: "saved", count: 10, fill: "var(--color-saved)" },
  { status: "applied", count: 50, fill: "var(--color-applied)" },
  { status: "interview", count: 2, fill: "var(--color-interview)" },
  { status: "offer", count: 1, fill: "var(--color-offer)" },
  { status: "rejected", count: 10, fill: "var(--color-rejected)" },
  { status: "withdrawn", count: 2, fill: "var(--color-withdrawn)" },
]
const chartConfig = {
  count: {
    label: "Count",
  },
   saved: {
    label: "Saved",
    color: "var(--color-gray-500)",
  },
  applied: {
    label: "Appled",
    color: "var(--color-blue-500)",
  },
  interview: {
    label: "Interview",
    color: "var(--color-yellow-500)",
  },
  offer: {
    label: "Offer",
    color: "var(--color-green-500)",
  },
  rejected: {
    label: "Rejected",
    color: "var(--color-red-500)",
  },
  withdrawn: {
    label: "Withdrawn",
    color: "var(--color-red-700)",
  },
} satisfies ChartConfig


type StatusBreakdownChartProps = {
  className: string;
};

export const StatusBreakdownChart = ({ className }: StatusBreakdownChartProps) => {
    return(
        <Card className={`flex flex-col ${className}`}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Status</CardTitle>
        <CardDescription>All time status breakdown</CardDescription>
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
            <Pie data={chartData} dataKey="count" nameKey="status" />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
    )
}