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

type LongestStreakCardProps = {
  className: string;
};

export const LongestStreakCard = ({ className }: LongestStreakCardProps) => {
  const [longestStreak, setLongestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
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

      const { data, error: appError } = await supabaseBrowser
        .from("Job Applications")
        .select("date_applied")
        .eq("user_id", user.id)
        .order("date_applied", { ascending: false });

      if (appError || !data) {
        console.error("Error fetching applications:", appError);
        return;
      }

      const uniqueDays = Array.from(
        new Set(
          data.map(
            (entry) => new Date(entry.date_applied).toISOString().split("T")[0]
          )
        )
      ).sort();

      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];
      const appliedToday = uniqueDays.includes(todayStr);
      setAppliedToday(appliedToday);

      // Count streak (excluding today if not applied)
      let current = new Date();
      if (!appliedToday) current.setDate(current.getDate() - 1); // start from yesterday

      let currentStreakCount = 0;
      for (let i = 0; i < 365; i++) {
        const dateStr = current.toISOString().split("T")[0];
        if (uniqueDays.includes(dateStr)) {
          currentStreakCount++;
          current.setDate(current.getDate() - 1);
        } else {
          break;
        }
      }

      setCurrentStreak(currentStreakCount);

      let maxStreak = 0;
      let tempStreak = 0;
      let previousDate: Date | null = null;


      for (const dateStr of uniqueDays){
        const currentDate = new Date(dateStr);

        if (previousDate === null){
            tempStreak = 1;
        } else {
            const daysDiff = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);

            if(daysDiff === 1) {
                //Consecutive day so increment temp streak 
                tempStreak++
            } else {
                // Gap in days so check higest between max streak and temp streak 
                maxStreak = Math.max(maxStreak, tempStreak);
                tempStreak = 1;
            }
        }
        previousDate = currentDate;
      }

      maxStreak = Math.max(maxStreak, tempStreak);

      setLongestStreak(maxStreak);
      setLoading(false);
      setRefresh(false);
    };

    getStreak();
  }, [refresh]);

    const isPersonalBest = currentStreak > 0 && currentStreak === longestStreak;

    const badgeLabel = isPersonalBest
    ? "🏆 Personal Best"
    : longestStreak > 0
    ? "🔥 Keep Going"
    : "🎯 Start Tracking";

  const badgeClass = isPersonalBest
    ? "bg-lime-200 text-primary-950"
    : longestStreak > 0
    ? "bg-amber-200 text-primary-950"
    : "bg-gray-200 text-primary-950";

  if (loading) {
    return <Skeleton className="h-[180px] w-full rounded-xl" />;
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Longest Streak
        </CardTitle>
        <Badge className={badgeClass}>{badgeLabel}</Badge>
      </CardHeader>

      {/* <CardContent>
        <div className="text-3xl font-bold">
          {longestStreak} <span className="text-muted-foreground text-lg">days</span>
        </div>
      </CardContent> */}

       <CardContent>
        <div className="text-3xl font-bold">
          {longestStreak} <span className="text-muted-foreground text-lg">{longestStreak === 1 ? 'day': 'days'}</span>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {isPersonalBest
            ? `You're at your personal best! Keep it up! 🔥`
            : longestStreak > 0
            ? `Your record is ${longestStreak} ${longestStreak === 1 ? 'day': 'days'}. Current streak: ${currentStreak} ${currentStreak === 1 ? 'day': 'days'}`
            : "Start applying daily to build your streak! 💼"}
        </p>
      </CardFooter>
    </Card>
  );
};
