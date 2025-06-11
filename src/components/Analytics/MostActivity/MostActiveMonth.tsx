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
import { format } from "date-fns";

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
        .select("date_applied")
        .eq("user_id", user.id);

      if (appError || !data) {
        console.error("Error fetching applications:", appError);
        return;
      }

      // Group by month (YYYY-MM)
      const counts: Record<string, number> = {};

      data.forEach((entry) => {
        const date = new Date(entry.date_applied);
        const key = format(date, "yyyy-MM");
        counts[key] = (counts[key] || 0) + 1;
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

      const formatted = maxKey ? format(new Date(`${maxKey}-01`), "MMMM yyyy") : "";

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
        <Badge className="bg-blue-200 text-primary-950">
          🔥 {mostActive.count} Applications
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">
          {mostActive.formatted || "No data"}
        </div>
      </CardContent>
    </Card>
  );
};
