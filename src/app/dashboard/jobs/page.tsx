"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import { Job, columns } from "./columns";
import { DataTable } from "./data-table";

export default function Jobs() {
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const { refresh, setRefresh } = useRefreshStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabaseBrowser
        .from("Job Applications")
        .select();  
       
      if (error) {
        setError("Could not fetch jobs");
        setJobs(null);
        console.log(error);
      } else if (data) {
        setJobs(data as Job[]);
        setError(null);
      }

       setLoading(false);
       setRefresh(false);
    };

    fetchJobs();
  }, [refresh]);

  if (loading) {
    return (
      <div className="flex flex-col flex-1">
        <div className=" w-full mx-4 h-full flex flex-col items-center jusstify-center gap-4 mt-10">
          <Skeleton className="h-full w-full rounded-xl p-4 my-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {error && (
        <div className=" w-full flex flex-col items-center jusstify-center gap-4 mt-10">
          <h1 className="font-bold text-2xl">Opps we had an error:</h1>
          <p className="text-red-500">{error}</p>
          <p>Please try again later</p>
        </div>
      )}
      {jobs && (
        <div
          data-orientation="horizontal"
          className="container mx-auto flex w-full flex-col justify-start gap-6 p-4"
        >
          <DataTable columns={columns} data={jobs ?? []} />
        </div>
      )}
    </div>
  );
}
