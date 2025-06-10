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
import { Badge } from "../ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type StreakCardProps = {
  className: string;
};

export const CurrentOffersCard = ({ className }: StreakCardProps) => {
  const [count, setCount] = useState(0);
  const { refresh, setRefresh } = useRefreshStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {

      const { count, error: countError } = await supabaseBrowser
        .from("Job Applications")
        .select("*", { count: "exact" })
        .eq("status", "Offer");

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

  if (loading) {
    return <Skeleton className="h-[180px] w-full rounded-xl" />;
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Current Offers
        </CardTitle>
        <Badge className={ count > 0 ? "bg-lime-200 text-primary-950 border": "bg-amber-200/50 text-priamry-950 "}>
          {count === 0 ? "💪 Stay strong": "🔥 Keep going"}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">{count}</div>
      </CardContent>
      {/* <CardFooter>
        <p className="text-sm text-muted-foreground">
          {count > 0 ? "Congrats, you did it 🏆" : "Stay strong 💪"}
        </p>
      </CardFooter> */}
    </Card>
  );
};
