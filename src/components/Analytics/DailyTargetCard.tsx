"use client";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useUserStore } from "@/lib/store/useUserStore";
import { useState, useEffect } from "react";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

type StreakCardProps = {
  className: string;
};

export const DailyTargetCard = ({ className }: StreakCardProps) => {
  const dailyGoal = useUserStore((state) => state.dailyGoal);
  const goal = Number(dailyGoal);
  const [count, setCount] = useState(0);
  const { refresh, setRefresh } = useRefreshStore();


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
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

      const { count, error: countError } = await supabaseBrowser
        .from("Job Applications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("date_applied", startOfDay)
        .lte("date_applied", endOfDay);

      if (countError) {
        console.error("Error fetching today's applications:", countError);
        return;
      }

      setCount(count || 0);
      setRefresh(false)
    };

    fetchCount();
  }, [refresh]);

  const goalReached = count >= goal;
  

  

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Daily Target</CardTitle>
        <Badge className={ goalReached? "bg-lime-200 text-primary-950 border": "bg-amber-200/50 text-priamry-950 "}>
          {goalReached ? " 🏆 Goal Achieved" : "🔥 Keep Going"}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <div className="text-3xl font-bold">
          {count} <span className="text-muted-foreground text-lg">/ {goal}</span>
        </div>
        
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {goalReached
            ? "Great job! You've hit your target today 🎉"
            : `You're ${goal - count} away from your target`}
        </p>
      </CardFooter>
    </Card>
  );
};
