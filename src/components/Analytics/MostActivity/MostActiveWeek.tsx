"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import {
  endOfWeek,
  format,
  getISOWeek,
  getISOWeekYear,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";

type StreakCardProps = {
  className: string;
};

export const MostActiveWeek = ({ className }: StreakCardProps) => {
  const [mostActive, setMostActive] = useState<{
    week: string;
    count: number;
    startDate: string;
    endDate: string;
  }>({
    week: "",
    count: 0,
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(true);
  const { refresh, setRefresh } = useRefreshStore();

  useEffect(() => {
    const getMostActiveWeek = async () => {
      const {
        data: { user },
        error,
      } = await supabaseBrowser.auth.getUser();

      if (!user || error) {
        console.error("User fetch error", error);
        return;
      }

      const { data, error: appError } = await supabaseBrowser
        .from("Job Applications")
        .select("date_applied")
        .eq("user_id", user.id);

      if (appError || !data) {
        console.error("Error fetching applications:", appError);
        return;
      }

      // Group by ISO week number
      const counts: Record<string, { count: number; start: Date; end: Date }> =
        {};

      data.forEach((entry) => {
        const date = new Date(entry.date_applied);
        const weekNum = getISOWeek(date);
        const year = getISOWeekYear(date);
        const key = `${year}-W${weekNum}`;

        const start = startOfWeek(date, { weekStartsOn: 1 });
        const end = endOfWeek(date, { weekStartsOn: 1 });

        if (!counts[key]) {
          counts[key] = { count: 0, start, end };
        }
        counts[key].count += 1;
      });

      // Find the week with the max applications
      let maxKey = "";
      let maxCount = 0;

      for (const key in counts) {
        if (counts[key].count > maxCount) {
          maxKey = key;
          maxCount = counts[key].count;
        }
      }

      // const most = counts[maxKey];
      // setMostActive({
      //   week: maxKey,
      //   count: most.count,
      //   startDate: format(most.start, "MMM d"),
      //   endDate: format(most.end, "MMM d"),
      // });

      if (!maxKey) {
        setMostActive({
          week: "",
          count: 0,
          startDate: "",
          endDate: "",
        });
      } else {
        const most = counts[maxKey];
        setMostActive({
          week: maxKey,
          count: most.count,
          startDate: format(most.start, "MMM d"),
          endDate: format(most.end, "MMM d"),
        });
      }

      setLoading(false);
      setRefresh(false);
    };

    getMostActiveWeek();
  }, [refresh]);

  if (loading) {
    return <Skeleton className="h-[180px] w-full rounded-xl" />;
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Most Active Week</CardTitle>
        <Badge className="bg-sky-200/50 dark:bg-sky-700/50 text-primary-950">
          🔥 {mostActive.count} Applications
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">
          {mostActive.startDate && mostActive.endDate
            ? `${mostActive.startDate} - ${mostActive.endDate}`
            : <span className="text-sm font-medium text-muted-foreground mt-4">Could be this week?</span>}
        </div>
      </CardContent>
    </Card>
  );
};
