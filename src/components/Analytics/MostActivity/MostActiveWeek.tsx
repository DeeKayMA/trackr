"use client";

import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { startOfWeek, endOfWeek, format, getISOWeek, getISOWeekYear } from "date-fns";

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
      const counts: Record<string, { count: number; start: Date; end: Date }> = {};

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

      const most = counts[maxKey];
      setMostActive({
        week: maxKey,
        count: most.count,
        startDate: format(most.start, "MMM d"),
        endDate: format(most.end, "MMM d"),
      });

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
        <Badge className="bg-blue-200 text-primary-950">
          🔥 {mostActive.count} Applications
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">
          {mostActive.startDate} – {mostActive.endDate}
        </div>
      </CardContent>
    </Card>
  );
};
