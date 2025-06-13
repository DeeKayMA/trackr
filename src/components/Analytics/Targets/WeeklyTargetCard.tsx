"use client";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useUserStore } from "@/lib/store/useUserStore";
import { useState, useEffect } from "react";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../../ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type StreakCardProps = {
  className: string;
};

export const WeeklyTargetCard = ({ className }: StreakCardProps) => {
  const weeklyGoal = useUserStore((state) => state.weeklyGoal);
  const goal = Number(weeklyGoal);
  const [count, setCount] = useState(0);
  const { refresh, setRefresh } = useRefreshStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      const {
        data: { user },
        error,
      } = await supabaseBrowser.auth.getUser();

      if (error || !user) {
        console.error("Failed to get user:", error);
        return;
      }

      const today = new Date();
      const day = today.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day; // Adjust if today is Sunday

      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() + diffToMonday);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const getUTCISOString = (date: Date) => new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

      const startOfWeekISO = getUTCISOString(startOfWeek);
      const endOfWeekISO = getUTCISOString(endOfWeek);

      const { count, error: countError } = await supabaseBrowser
        .from("Job Applications")
        .select("", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("date_applied", startOfWeekISO)
        .lte("date_applied", endOfWeekISO);

      if (countError) {
        console.error("Error fetching today's applications:", countError);
        return;
      }

      setCount(count || 0);
      setLoading(false);
      setRefresh(false);
    };

    fetchCount();
  }, [refresh]);

  const goalReached = count >= goal;

  if (loading) {
    return <Skeleton className="h-[180px] w-full rounded-xl" />;
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Weekly Target</CardTitle>
        <Badge
          className={
            goalReached
              ? "bg-lime-300/50 dark:bg-lime-600/50 text-primary-950 border"
              : "bg-amber-200/50 dark:bg-amber-600/50 text-priamry-950 "
          }
        >
          {goalReached ? " 🏆 Goal Achieved" : count===0? "📋 Get Applying" : "🔥 Keep Going"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {count}{" "}
          <span className="text-muted-foreground text-lg">/ {goal}</span>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {goalReached
            ? "Great job! You hit your weekly target 🎉"
            : `You're ${goal - count} away from hitting your weekly target`}
        </p>
      </CardFooter>
    </Card>
  );
};
