'use client'

import Header from "../../../components/Header/Header";
import { Job, columns } from "./columns";
import { DataTable } from "./data-table";
import { supabase } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";




export default function Jobs() {

  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
      .from("Job Applications")
      .select()

      if(error) {
        setError('Could not fetch jobs')
        setJobs(null)
        console.log(error)
      }

      if (data){
        setJobs(data as Job[]);
        setError(null)
      }
    }

    fetchJobs()

  }, [])


  return (
    <div className="flex flex-col flex-1">
      <Header title="Jobs"/>
      {error && (

        <div className=" w-full flex flex-col items-center jusstify-center gap-4 mt-10">
          <h1 className="font-bold text-2xl">Opps we had an error:</h1>
          <p className="text-red-500">{error}</p>
          <p>Please try again later</p>
        </div>
        
        )}
      {jobs && (
        <div data-orientation="horizontal" 
        className="container mx-auto flex w-full flex-col justify-start gap-6 p-4" >

        <DataTable columns={columns} data={jobs ?? []} />

      </div>
      )}
      
    </div>
  );
}
