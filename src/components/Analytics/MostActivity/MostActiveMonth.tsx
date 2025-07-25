"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type StreakCardProps = {
  className: string;
};

export const MostActiveMonth = ({ className }: StreakCardProps) => {
  const [mostActive, setMostActive] = useState<{
    monthKey: string;
    count: number;
    formatted: string;
  }>({
    monthKey: "",
    count: 0,
    formatted: "",
  });

  const [loading, setLoading] = useState(true);
  const { refresh, setRefresh } = useRefreshStore();

  useEffect(() => {
    const getMostActiveMonth = async () => {
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
        .select("date_applied, status")
        .eq("user_id", user.id)
        .eq("status", "Applied")
        .not("date_applied", "is", null);

      if (appError || !data) {
        console.error("Error fetching applications:", appError);
        return;
      }

      // Group by month (YYYY-MM)
      const counts: Record<string, number> = {};

      data.forEach((entry) => {
        if (entry.date_applied) {
          const date = new Date(entry.date_applied);
          const key = format(date, "yyyy-MM");
          counts[key] = (counts[key] || 0) + 1;
        }
      });

      // Find the month with the most applications
      let maxKey = "";
      let maxCount = 0;

      for (const key in counts) {
        if (counts[key] > maxCount) {
          maxKey = key;
          maxCount = counts[key];
        }
      }

      const formatted = maxKey
        ? format(new Date(`${maxKey}-01`), "MMMM yyyy")
        : "";

      setMostActive({ monthKey: maxKey, count: maxCount, formatted });
      setLoading(false);
      setRefresh(false);
    };

    getMostActiveMonth();
  }, [refresh]);

  if (loading) {
    return <Skeleton className="h-[180px] w-full rounded-xl" />;
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Most Active Month</CardTitle>
        <Badge className="bg-sky-200/50 dark:bg-sky-700/50 text-primary-950">
          🔥 {mostActive.count} Applications
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">
          {mostActive.formatted || (
            <span className="text-sm font-medium text-muted-foreground mt-4">
              Could be this month?
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
