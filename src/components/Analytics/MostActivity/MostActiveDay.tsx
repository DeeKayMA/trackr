"use client";

import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type StreakCardProps = {
  className: string;
};

export const MostActiveDay = ({ className }: StreakCardProps) => {
  const [mostActive, setMostActive] = useState<{ date: string; count: number }>(
    {
      date: "",
      count: 0,
    }
  );
  const [loading, setLoading] = useState(true);
  const { refresh, setRefresh } = useRefreshStore();

  useEffect(() => {
    const getMostActiveDay = async () => {
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

      // Group by date and count applications
      const counts: Record<string, number> = {};
      data.forEach((entry) => {
        const date = new Date(entry.date_applied).toISOString().split("T")[0];
        counts[date] = (counts[date] || 0) + 1;
      });

      // Find the most active day
      let maxDate = "";
      let maxCount = 0;
      for (const date in counts) {
        if (counts[date] > maxCount) {
          maxCount = counts[date];
          maxDate = date;
        }
      }

      setMostActive({ date: maxDate, count: maxCount });
      setLoading(false);
      setRefresh(false);
    };

    getMostActiveDay();
  }, [refresh]);

  if (loading) {
    return <Skeleton className="h-[180px] w-full rounded-xl" />;
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Most Active Day</CardTitle>
        <Badge className="bg-blue-200 text-primary-950">
          🔥 {mostActive.count} Applications
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">
          {mostActive.date
            ? new Date(mostActive.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "No data"}
        </div>
      </CardContent>
    </Card>
  );
};
