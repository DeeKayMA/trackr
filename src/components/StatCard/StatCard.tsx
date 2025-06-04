"use client";

import { TrendingUp, TrendingDown, MoveRight } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

type StatCardProps = {
  trending: string;
  percentage: number;
  count: number;
  statName: string;
  statDescription: string | null;
  countDiff: number;
};

export const StatCard = ({
  trending,
  percentage,
  count,
  statName,
  statDescription,
  countDiff
}: StatCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{statName}</CardTitle>
          <CardDescription>{statDescription}</CardDescription>
          <CardAction>
            {trending === "new" ? (
              <div>
                <Badge className="bg-lime-200 text-lime-950">
                  <TrendingUp />New Growth
                </Badge>
              </div>
            ) :trending === "up" ? (
              <div>
                <Badge className="bg-lime-200 text-lime-950">
                  <TrendingUp />+{percentage.toFixed(2)}%
                </Badge>
              </div>
            ) : trending === "down" ? (
              <div>
                <Badge className="bg-rose-200 text-rose-950">
                  <TrendingDown />{percentage.toFixed(2)}%
                </Badge>
              </div>
            ) : trending === "flat" ? (
              <div>
                <Badge className="bg-gray-200 text-gray-950" >
                  <MoveRight />
                  {percentage.toFixed(2)}%
                </Badge>
              </div>
            ) : null}
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold tabular-nums">{count}</p>

          {/* <p className="text-sm text-muted-foreground mt-2">
            {trending === "new" ? (
              <span>New growth</span>
            ) : trending === "up" ? (
              <span>Up {countDiff} </span>
            ) : trending === "down" ? (
              <span>Down {Math.abs(countDiff)} </span>
            ) : trending === "flat" ? (<span>No change </span>) 
            :null}
            since last month
          </p> */}

          
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {trending === "new" ? (
              <span>New growth</span>
            ) : trending === "up" ? (
              <span>Up {countDiff} </span>
            ) : trending === "down" ? (
              <span>Down {Math.abs(countDiff)} </span>
            ) : trending === "flat" ? (<span>No change </span>) 
            :null}
            since last month
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
