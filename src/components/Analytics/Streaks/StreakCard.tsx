"use client";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useState, useEffect } from "react";
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

export const StreakCard = ({ className }: StreakCardProps) => {
  const [streak, setStreak] = useState(0);
  const [appliedToday, setAppliedToday] = useState(false);
  const { refresh, setRefresh } = useRefreshStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStreak = async () => {
      const {
        data: { user },
        error,
      } = await supabaseBrowser.auth.getUser();

      if (!user || error) {
        console.error("User fetch error", error);
        return;
      }

      // Get local start and end of today
      const now = new Date();
 

      // Fetch all recent applications (up to 365)
      const { data, error: appError } = await supabaseBrowser
        .from("Job Applications")
        .select("date_applied")
        .eq("user_id", user.id)
        .order("date_applied", { ascending: false })
        .limit(365);

      if (appError || !data) {
        console.error("Error fetching applications:", appError);
        return;
      }

      // Map all applications to date strings (local)
      const localDateStrings = data.map((entry) => {
        const local = new Date(entry.date_applied);
        const y = local.getFullYear();
        const m = String(local.getMonth() + 1).padStart(2, "0");
        const d = String(local.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
      });

      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      const uniqueDays = Array.from(new Set(localDateStrings));
      const hasAppliedToday = uniqueDays.includes(todayStr);
      setAppliedToday(hasAppliedToday);

      // Count streak backwards from today (or yesterday)
      let current = new Date();
      if (!hasAppliedToday) current.setDate(current.getDate() - 1);

      let streakCount = 0;
      for (let i = 0; i < 365; i++) {
        const dateStr = current.toISOString().split("T")[0];
        if (uniqueDays.includes(dateStr)) {
          streakCount++;
          current.setDate(current.getDate() - 1);
        } else {
          break;
        }
      }

      setStreak(streakCount);
      setLoading(false);
      setRefresh(false);
    };

    getStreak();
  }, [refresh]);

  const badgeLabel =
    appliedToday && streak > 0
      ? "🔥 Streak Active"
      : !appliedToday && streak > 0
      ? "⚠️ Don't lose it!"
      : "🛌 Get Started";

  const badgeClass =
    appliedToday && streak > 0
      ? "bg-lime-300/50 dark:bg-lime-600/50 text-primary-950"
      : !appliedToday && streak > 0
      ? "bg-amber-200/50 dark:bg-amber-600/50 text-primary-950"
      : "bg-red-200/50 dark:bg-red-400/50 text-primary-950";

  if (loading) {
    return <Skeleton className="h-[180px] w-full rounded-xl" />;
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
        <Badge className={badgeClass}>{badgeLabel}</Badge>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">
          {streak} <span className="text-muted-foreground text-lg">days</span>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {appliedToday && streak > 0
            ? `You're on a ${streak}-day streak! 🎯`
            : !appliedToday && streak > 0
            ? `Apply today to keep your ${streak}-day streak alive! 🔥`
            : "Start your streak today 💼"}
        </p>
      </CardFooter>
    </Card>
  );
};
